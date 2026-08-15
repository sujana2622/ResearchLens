import React, { useState, useEffect } from 'react';
import { initialPapers, initialCaseStudies, sampleResearchBrief } from './data/mockData';
import { Paper, CaseStudy, ResearchBrief, TabType } from './types';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { PaperAnalysisView } from './components/PaperAnalysisView';
import { WorkspaceView } from './components/WorkspaceView';
import { CasesView } from './components/CasesView';
import { LibraryView } from './components/LibraryView';

// Modals
import { ChatWithPaperModal } from './components/ChatWithPaperModal';
import { ComparePapersModal } from './components/ComparePapersModal';
import { LitReviewModal } from './components/LitReviewModal';
import { ResearchGapsModal } from './components/ResearchGapsModal';
import { UploadPaperModal } from './components/UploadPaperModal';
import { ResearchBriefModal } from './components/ResearchBriefModal';
import { CaseStudyDetailModal } from './components/CaseStudyDetailModal';
import { BibtexModal } from './components/BibtexModal';
import { UserProfileModal } from './components/UserProfileModal';

import { generateResearchBrief } from './services/geminiService';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [papers, setPapers] = useState<Paper[]>(initialPapers);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [searchQuery, setSearchQuery] = useState<string>('AI-based healthcare fraud detection');
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Research Brief
  const [researchBrief, setResearchBrief] = useState<ResearchBrief>(sampleResearchBrief);
  const [isLoadingBrief, setIsLoadingBrief] = useState<boolean>(false);

  // Modals state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isLitReviewOpen, setIsLitReviewOpen] = useState<boolean>(false);
  const [isResearchGapsOpen, setIsResearchGapsOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState<boolean>(false);
  const [isBibtexModalOpen, setIsBibtexModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Device display mode (Mobile Frame vs Fluid Responsive)
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);

  // Load custom brief when search query changes significantly
  const handleExecuteSearch = async (queryText: string) => {
    setSearchQuery(queryText);
    setSelectedPaper(null);
    setActiveTab('search');
    setIsLoadingBrief(true);
    try {
      const newBrief = await generateResearchBrief(queryText, papers);
      setResearchBrief(newBrief);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingBrief(false);
    }
  };

  // Toggle saved / bookmark
  const handleToggleBookmark = (paperId: string) => {
    setPapers((prev) =>
      prev.map((p) => (p.id === paperId ? { ...p, isSaved: !p.isSaved } : p))
    );
    if (selectedPaper && selectedPaper.id === paperId) {
      setSelectedPaper((prev) => (prev ? { ...prev, isSaved: !prev.isSaved } : null));
    }
  };

  // Delete paper from workspace
  const handleDeletePaper = (paperId: string) => {
    setPapers((prev) => prev.filter((p) => p.id !== paperId));
    if (selectedPaper?.id === paperId) {
      setSelectedPaper(null);
    }
  };

  // Add newly uploaded paper
  const handlePaperAdded = (newPaper: Paper) => {
    setPapers((prev) => [newPaper, ...prev]);
    setSelectedPaper(newPaper);
    setActiveTab('search');
  };

  const savedCount = papers.filter((p) => p.isSaved).length;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-900 flex flex-col items-center justify-start antialiased font-sans">
      {/* Top Device Frame Toggle Bar (for previewing exact mobile fidelity) */}
      <div className="w-full bg-zinc-950 border-b border-zinc-800/80 px-4 py-2 flex items-center justify-between text-xs text-zinc-400 select-none z-40">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-zinc-200">ResearchLens</span>
          <span className="hidden sm:inline text-zinc-500 font-mono text-[11px]">v2.5 (Gemini-Powered)</span>
        </div>
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
          <button
            onClick={() => setIsDeviceFrame(false)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              !isDeviceFrame ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Adaptive Responsive</span>
          </button>
          <button
            onClick={() => setIsDeviceFrame(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              isDeviceFrame ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile Frame</span>
          </button>
        </div>
      </div>

      {/* Main Canvas / Screen Wrapper */}
      <div
        className={`w-full flex-1 flex justify-center ${
          isDeviceFrame ? 'py-6 px-2' : 'p-0'
        }`}
      >
        <div
          className={`w-full bg-white relative flex flex-col transition-all overflow-y-auto ${
            isDeviceFrame
              ? 'max-w-[420px] min-h-[844px] rounded-[40px] shadow-2xl border-8 border-zinc-800 ring-1 ring-zinc-700/50'
              : 'max-w-xl min-h-[calc(100vh-45px)] border-x border-zinc-200 shadow-sm'
          }`}
        >
          {/* Active Screen Rendering */}
          <main className="flex-1 flex flex-col">
            {/* View 1: Paper Analysis Details */}
            {selectedPaper ? (
              <PaperAnalysisView
                paper={selectedPaper}
                onBack={() => setSelectedPaper(null)}
                onOpenChat={() => setIsChatOpen(true)}
                onToggleBookmark={handleToggleBookmark}
              />
            ) : (
              <>
                {/* View 2: Home */}
                {activeTab === 'home' && (
                  <HomeView
                    onSearch={(q) => handleExecuteSearch(q)}
                    onOpenAction={(action) => {
                      if (action === 'search') setActiveTab('search');
                      if (action === 'cases') setActiveTab('cases');
                      if (action === 'lit-reviews') setIsLitReviewOpen(true);
                      if (action === 'research-gaps') setIsResearchGapsOpen(true);
                    }}
                    onSelectRecentQuery={(q) => handleExecuteSearch(q)}
                    onOpenProfile={() => setIsProfileModalOpen(true)}
                  />
                )}

                {/* View 3: Search */}
                {activeTab === 'search' && (
                  <SearchView
                    query={searchQuery}
                    onQueryChange={setSearchQuery}
                    onBack={() => setActiveTab('home')}
                    researchBrief={researchBrief}
                    papers={papers}
                    onSelectPaper={(p) => setSelectedPaper(p)}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenFullBrief={() => setIsBriefModalOpen(true)}
                    isLoadingBrief={isLoadingBrief}
                  />
                )}

                {/* View 4: Workspace */}
                {activeTab === 'workspace' && (
                  <WorkspaceView
                    papers={papers}
                    savedPapersCount={savedCount}
                    caseStudiesCount={caseStudies.length}
                    draftReviewsCount={2}
                    onOpenUpload={() => setIsUploadOpen(true)}
                    onOpenLitReview={() => setIsLitReviewOpen(true)}
                    onOpenCompare={() => setIsCompareOpen(true)}
                    onOpenResearchGaps={() => setIsResearchGapsOpen(true)}
                    onSelectPaper={(p) => setSelectedPaper(p)}
                    onOpenChat={(p) => {
                      setSelectedPaper(p);
                      setIsChatOpen(true);
                    }}
                    onDeletePaper={handleDeletePaper}
                  />
                )}

                {/* View 5: Cases */}
                {activeTab === 'cases' && (
                  <CasesView
                    caseStudies={caseStudies}
                    onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)}
                  />
                )}

                {/* View 6: Library */}
                {activeTab === 'library' && (
                  <LibraryView
                    papers={papers}
                    onSelectPaper={(p) => setSelectedPaper(p)}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenBibtexModal={() => setIsBibtexModalOpen(true)}
                  />
                )}
              </>
            )}
          </main>

          {/* Persistent Bottom Navigation Bar */}
          <Navigation
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setSelectedPaper(null);
              setActiveTab(tab);
            }}
          />
        </div>
      </div>

      {/* Global Interactive Modals */}
      {selectedPaper && (
        <ChatWithPaperModal
          paper={selectedPaper}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      <ComparePapersModal
        papers={papers}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onSelectPaper={(p) => setSelectedPaper(p)}
      />

      <LitReviewModal
        papers={papers}
        isOpen={isLitReviewOpen}
        onClose={() => setIsLitReviewOpen(false)}
      />

      <ResearchGapsModal
        isOpen={isResearchGapsOpen}
        onClose={() => setIsResearchGapsOpen(false)}
        onExploreTopic={(t) => handleExecuteSearch(t)}
      />

      <UploadPaperModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onPaperAdded={handlePaperAdded}
      />

      <ResearchBriefModal
        brief={researchBrief}
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
      />

      <CaseStudyDetailModal
        caseStudy={selectedCaseStudy}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        allPapers={papers}
        onSelectPaper={(p) => {
          setSelectedCaseStudy(null);
          setSelectedPaper(p);
        }}
      />

      <BibtexModal
        papers={papers}
        isOpen={isBibtexModalOpen}
        onClose={() => setIsBibtexModalOpen(false)}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        savedPapersCount={savedCount}
      />
    </div>
  );
}
