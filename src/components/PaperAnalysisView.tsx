import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  Flag,
  Cpu,
  Database,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { Paper } from '../types';

interface PaperAnalysisViewProps {
  paper: Paper;
  onBack: () => void;
  onOpenChat: () => void;
  onToggleBookmark: (paperId: string) => void;
}

export const PaperAnalysisView: React.FC<PaperAnalysisViewProps> = ({
  paper,
  onBack,
  onOpenChat,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'methodology' | 'results' | 'takeaways'>('methodology');
  const [isAbstractExpanded, setIsAbstractExpanded] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState(false);

  const handleCopyDoi = () => {
    navigator.clipboard.writeText(paper.doi);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  return (
    <div id="paper-analysis-view-container" className="flex flex-col min-h-full px-4 pt-3 pb-24 max-w-md mx-auto w-full relative">
      {/* Top Header */}
      <div id="paper-analysis-header" className="flex items-center justify-between mb-4">
        <button
          id="paper-analysis-back-btn"
          onClick={onBack}
          className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 active:scale-95 transition-all"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-zinc-900 tracking-tight">
          Paper Analysis
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleBookmark(paper.id)}
            className={`p-2 rounded-xl transition-colors ${
              paper.isSaved ? 'text-zinc-900 bg-zinc-100' : 'text-zinc-500 hover:bg-zinc-100'
            }`}
            title="Bookmark paper"
          >
            <Bookmark className="w-5 h-5" fill={paper.isSaved ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: paper.title, url: window.location.href }).catch(() => {});
              } else {
                handleCopyDoi();
              }
            }}
            className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Top Overview Card (Mint Border Accent) */}
      <div
        id="paper-main-card"
        className="bg-white border border-emerald-300 rounded-2xl p-4 mb-4 shadow-xs"
      >
        <h1 className="text-lg font-bold text-zinc-900 leading-snug mb-1.5">
          {paper.title}
        </h1>

        <div className="text-xs text-zinc-600 font-medium mb-3 flex flex-wrap items-center gap-1.5">
          <span>{paper.authors}</span>
          <span>•</span>
          <span>{paper.year}</span>
          <span>•</span>
          <button
            onClick={handleCopyDoi}
            className="inline-flex items-center gap-1 text-emerald-700 hover:underline font-semibold"
          >
            <span>DOI: {paper.doi}</span>
            {copiedDoi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-zinc-400" />}
          </button>
        </div>

        {/* Abstract Inner Box */}
        <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3 text-[13px] text-zinc-700 leading-relaxed font-normal">
          <p className={isAbstractExpanded ? '' : 'line-clamp-3'}>
            {paper.abstract}
          </p>
          <button
            id="toggle-abstract-btn"
            onClick={() => setIsAbstractExpanded(!isAbstractExpanded)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-2"
          >
            <span>{isAbstractExpanded ? 'Collapse abstract' : 'Read full abstract'}</span>
            {isAbstractExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div id="paper-analysis-tabs" className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
        {(['summary', 'methodology', 'results', 'takeaways'] as const).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab.charAt(0).toUpperCase() + tab.slice(1);
          return (
            <button
              key={tab}
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Methodology / AI-EXTRACTED ANALYSIS (Default matching Screenshot) */}
      {activeTab === 'methodology' && (
        <div id="tab-content-methodology" className="flex flex-col gap-3.5">
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-zinc-700 uppercase mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI-EXTRACTED ANALYSIS</span>
          </div>

          {/* 1. Research Problem */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-zinc-900 font-bold text-[14.5px]">
              <Search className="w-4 h-4 text-zinc-600" />
              <span>Research Problem</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-zinc-700">
              {paper.analysis.researchProblem}
            </p>
          </div>

          {/* 2. Objective */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-zinc-900 font-bold text-[14.5px]">
              <Flag className="w-4 h-4 text-zinc-600" />
              <span>Objective</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-zinc-700">
              {paper.analysis.objective}
            </p>
          </div>

          {/* 3. Algorithms Used */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 text-zinc-900 font-bold text-[14.5px]">
              <Cpu className="w-4 h-4 text-zinc-600" />
              <span>Algorithms Used</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {paper.analysis.algorithms.map((alg, i) => (
                <span
                  key={i}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                    alg.role === 'Proposed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                      : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                  }`}
                >
                  {alg.name}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Dataset */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-zinc-900 font-bold text-[14.5px]">
              <Database className="w-4 h-4 text-zinc-600" />
              <span>Dataset</span>
            </div>
            <p className="text-[13.5px] font-medium text-zinc-800 mb-3">
              {paper.analysis.dataset.name}
            </p>
            {paper.analysis.dataset.description && (
              <p className="text-xs text-zinc-600 mb-3 leading-relaxed">
                {paper.analysis.dataset.description}
              </p>
            )}
            <div className="h-px bg-zinc-100 w-full mb-3" />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-500 block">Records</span>
                <span className="font-bold text-zinc-900 text-sm">
                  {paper.analysis.dataset.records}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Features</span>
                <span className="font-bold text-zinc-900 text-sm">
                  {paper.analysis.dataset.features}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Summary */}
      {activeTab === 'summary' && (
        <div id="tab-content-summary" className="flex flex-col gap-3.5">
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h3 className="font-bold text-zinc-900 text-sm mb-3">Key Contributions</h3>
            <ul className="space-y-2.5">
              {paper.analysis.summaryBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13.5px] text-zinc-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h3 className="font-bold text-zinc-900 text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Acknowledged Limitations</span>
            </h3>
            <ul className="space-y-2">
              {paper.analysis.limitations.map((lim, idx) => (
                <li key={idx} className="text-xs text-zinc-600 leading-relaxed pl-2 border-l-2 border-amber-300">
                  {lim}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Results */}
      {activeTab === 'results' && (
        <div id="tab-content-results" className="flex flex-col gap-3.5">
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-3 font-bold text-zinc-900 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Benchmark Performance</span>
            </div>
            <div className="space-y-3">
              {paper.analysis.results.map((res, idx) => (
                <div key={idx} className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-zinc-600">{res.metric}</span>
                    <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {res.value}
                    </span>
                  </div>
                  {res.comparisonBaseline && (
                    <div className="text-xs text-zinc-500">
                      Baseline: <span className="font-medium text-zinc-700">{res.comparisonBaseline}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Takeaways */}
      {activeTab === 'takeaways' && (
        <div id="tab-content-takeaways" className="flex flex-col gap-3.5">
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h3 className="font-bold text-zinc-900 text-sm mb-3">Practical Implications</h3>
            <div className="space-y-3">
              {paper.analysis.takeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-zinc-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p>{takeaway}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button: Chat with Paper (Bottom Right matching Screenshot) */}
      <div className="fixed bottom-20 right-5 z-30 max-w-md mx-auto">
        <button
          id="chat-with-paper-floating-btn"
          onClick={onOpenChat}
          className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat with Paper</span>
        </button>
      </div>
    </div>
  );
};
