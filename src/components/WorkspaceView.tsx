import React, { useState } from 'react';
import {
  Plus,
  Search,
  Sparkles,
  ArrowRight,
  GitCompare,
  SearchCheck,
  FileText,
  MoreVertical,
  RotateCw,
  Eye,
  MessageSquare,
  Trash2,
  Share2,
} from 'lucide-react';
import { Paper } from '../types';

interface WorkspaceViewProps {
  papers: Paper[];
  savedPapersCount: number;
  caseStudiesCount: number;
  draftReviewsCount: number;
  onOpenUpload: () => void;
  onOpenLitReview: () => void;
  onOpenCompare: () => void;
  onOpenResearchGaps: () => void;
  onSelectPaper: (paper: Paper) => void;
  onOpenChat: (paper: Paper) => void;
  onDeletePaper: (paperId: string) => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  papers,
  savedPapersCount,
  caseStudiesCount,
  draftReviewsCount,
  onOpenUpload,
  onOpenLitReview,
  onOpenCompare,
  onOpenResearchGaps,
  onSelectPaper,
  onOpenChat,
  onDeletePaper,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuPaperId, setActiveMenuPaperId] = useState<string | null>(null);

  const filteredDocs = papers.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.authors.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="workspace-view-container" className="flex flex-col min-h-full px-4 pt-3 pb-24 max-w-md mx-auto w-full">
      {/* Top Header */}
      <div id="workspace-header" className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
          My Workspace
        </h1>
        <button
          id="workspace-add-doc-btn"
          onClick={onOpenUpload}
          className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          title="Add or upload document"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input Box */}
      <div id="workspace-search-container" className="relative mb-5">
        <div className="flex items-center w-full bg-zinc-100/90 focus-within:bg-white border border-zinc-200 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/10 rounded-2xl px-3.5 py-2.5 transition-all shadow-2xs">
          <Search className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
          <input
            id="workspace-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within your documents..."
            className="w-full bg-transparent text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* 3 Metric Stat Boxes */}
      <div id="workspace-stats-row" className="grid grid-cols-3 gap-2.5 mb-6">
        {/* Stat 1: Saved Papers */}
        <div className="bg-white border border-zinc-200/90 rounded-2xl p-3 text-center shadow-2xs">
          <span className="text-2xl font-black text-zinc-900 block leading-tight">
            {savedPapersCount || 12}
          </span>
          <span className="text-[11.5px] font-medium text-zinc-500 block mt-0.5 leading-snug">
            Saved<br />Papers
          </span>
        </div>

        {/* Stat 2: Case Studies */}
        <div className="bg-white border border-zinc-200/90 rounded-2xl p-3 text-center shadow-2xs">
          <span className="text-2xl font-black text-zinc-900 block leading-tight">
            {caseStudiesCount || 4}
          </span>
          <span className="text-[11.5px] font-medium text-zinc-500 block mt-0.5 leading-snug">
            Case<br />Studies
          </span>
        </div>

        {/* Stat 3: Draft Reviews */}
        <div className="bg-white border border-zinc-200/90 rounded-2xl p-3 text-center shadow-2xs">
          <span className="text-2xl font-black text-zinc-900 block leading-tight">
            {draftReviewsCount || 2}
          </span>
          <span className="text-[11.5px] font-medium text-zinc-500 block mt-0.5 leading-snug">
            Draft<br />Reviews
          </span>
        </div>
      </div>

      {/* Quick Actions Header */}
      <div className="mb-2">
        <h2 className="text-base font-extrabold text-zinc-900 tracking-tight">
          Quick Actions
        </h2>
      </div>

      {/* Quick Action 1: Generate Literature Review (Dark card) */}
      <div className="flex flex-col gap-2.5 mb-6">
        <button
          id="quick-action-gen-lit-review"
          onClick={onOpenLitReview}
          className="w-full flex items-center justify-between p-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-2xl transition-all active:scale-[0.99] shadow-xs"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-[14px] font-bold text-left">
              Generate Literature Review
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Quick Action 2: Compare Selected Papers */}
        <button
          id="quick-action-compare-papers"
          onClick={onOpenCompare}
          className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-900 transition-all active:scale-[0.99] shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <GitCompare className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-[14px] font-bold text-left">
              Compare Selected Papers
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400" />
        </button>

        {/* Quick Action 3: Find Research Gaps */}
        <button
          id="quick-action-find-gaps"
          onClick={onOpenResearchGaps}
          className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-900 transition-all active:scale-[0.99] shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <SearchCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="text-[14px] font-bold text-left">
              Find Research Gaps
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      {/* Recent Documents Section */}
      <div id="workspace-recent-documents" className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-zinc-900 tracking-tight">
            Recent Documents
          </h2>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            View All
          </button>
        </div>

        {/* Document Cards */}
        {filteredDocs.map((doc) => {
          const isProcessing = doc.status === 'Processing';
          const isMenuOpen = activeMenuPaperId === doc.id;

          return (
            <div
              key={doc.id}
              id={`workspace-doc-${doc.id}`}
              className="relative bg-white border border-emerald-300/80 rounded-2xl p-3.5 shadow-xs transition-all hover:border-emerald-400"
            >
              <div className="flex items-start gap-3">
                {/* Icon Box */}
                <div className="w-9 h-9 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    onClick={() => onSelectPaper(doc)}
                    className="text-[14.5px] font-bold text-zinc-900 leading-snug cursor-pointer hover:text-zinc-700 transition-colors truncate"
                  >
                    {doc.title}
                  </h3>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5 truncate">
                    {doc.authors}, {doc.year}
                  </div>

                  {/* Status & Date added */}
                  <div className="flex items-center gap-3 mt-2.5 text-xs">
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-1 text-zinc-600 font-semibold bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full">
                        <RotateCw className="w-3 h-3 text-zinc-500 animate-spin" />
                        <span>Processing</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Analyzed</span>
                      </span>
                    )}
                    <span className="text-zinc-400 font-medium">
                      Added {doc.dateAdded || '2d ago'}
                    </span>
                  </div>
                </div>

                {/* 3-Dot Menu Button */}
                <div className="relative shrink-0">
                  <button
                    id={`doc-menu-btn-${doc.id}`}
                    onClick={() => setActiveMenuPaperId(isMenuOpen ? null : doc.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Context Dropdown */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-zinc-200 rounded-xl shadow-xl z-30 p-1 text-xs">
                      <button
                        onClick={() => {
                          onSelectPaper(doc);
                          setActiveMenuPaperId(null);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-50 flex items-center gap-2 text-zinc-800 font-medium"
                      >
                        <Eye className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Analyze Details</span>
                      </button>
                      <button
                        onClick={() => {
                          onOpenChat(doc);
                          setActiveMenuPaperId(null);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-zinc-50 flex items-center gap-2 text-zinc-800 font-medium"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                        <span>Chat with Paper</span>
                      </button>
                      <div className="h-px bg-zinc-100 my-1" />
                      <button
                        onClick={() => {
                          onDeletePaper(doc.id);
                          setActiveMenuPaperId(null);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-50 flex items-center gap-2 text-red-600 font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
