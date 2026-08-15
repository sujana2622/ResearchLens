import React, { useState } from 'react';
import {
  BookOpen,
  User,
  Search,
  FileText,
  Briefcase,
  Lightbulb,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface HomeViewProps {
  onSearch: (query: string) => void;
  onOpenAction: (action: 'search' | 'cases' | 'lit-reviews' | 'research-gaps') => void;
  onSelectRecentQuery: (query: string) => void;
  onOpenProfile: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSearch,
  onOpenAction,
  onSelectRecentQuery,
  onOpenProfile,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleSearchClick = () => {
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    } else {
      onSearch('AI-based healthcare fraud detection');
    }
  };

  return (
    <div id="home-view-container" className="flex flex-col min-h-full px-5 pt-4 pb-20 max-w-md mx-auto w-full">
      {/* Top Header */}
      <header id="home-header" className="flex items-center justify-between py-2 mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-zinc-900 stroke-[2.5]" />
          <span className="text-xl font-extrabold tracking-tight text-zinc-950">
            ResearchLens
          </span>
        </div>
        <button
          id="user-profile-button"
          onClick={onOpenProfile}
          className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 flex items-center justify-center text-zinc-700 transition-colors shadow-xs"
          title="User Account"
        >
          <User className="w-5 h-5 text-zinc-600" />
        </button>
      </header>

      {/* Main Title & Subtitle */}
      <div id="home-hero-section" className="mb-6">
        <h1 className="text-[28px] leading-[1.2] font-extrabold text-zinc-900 tracking-tight mb-3">
          Research Intelligence
          <br />
          at Your Fingertips
        </h1>
        <p className="text-[15px] leading-relaxed text-zinc-600 font-normal">
          Find, understand, and compare research papers and case studies in minutes.
        </p>
      </div>

      {/* Search Input Box */}
      <div id="home-search-container" className="relative mb-7">
        <div className="flex items-center w-full bg-zinc-100/90 hover:bg-zinc-100 focus-within:bg-white border border-zinc-200 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-900/10 rounded-2xl px-4 py-3.5 transition-all shadow-2xs">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            id="home-search-input"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Ask a research question (e.g., "AI in health...'
            className="w-full bg-transparent text-[15px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="text-xs text-zinc-400 hover:text-zinc-600 ml-2 px-1"
            >
              Clear
            </button>
          )}
          <button
            id="home-search-submit-btn"
            onClick={handleSearchClick}
            className="ml-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-3 py-1.5 text-xs font-semibold shrink-0 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* 4 Quick Action Cards Grid (2x2) */}
      <div id="home-quick-actions-grid" className="grid grid-cols-2 gap-3.5 mb-8">
        {/* Search Papers */}
        <button
          id="action-search-papers"
          onClick={() => onOpenAction('search')}
          className="flex flex-col items-start p-4 bg-zinc-50/80 hover:bg-zinc-100/80 border border-zinc-200/80 rounded-2xl text-left transition-all active:scale-[0.98] shadow-xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center mb-3 text-zinc-800 group-hover:border-zinc-300 shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[14.5px] font-bold text-zinc-900 tracking-tight">
            Search Papers
          </span>
        </button>

        {/* Case Studies */}
        <button
          id="action-case-studies"
          onClick={() => onOpenAction('cases')}
          className="flex flex-col items-start p-4 bg-zinc-50/80 hover:bg-zinc-100/80 border border-zinc-200/80 rounded-2xl text-left transition-all active:scale-[0.98] shadow-xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center mb-3 text-zinc-800 group-hover:border-zinc-300 shadow-2xs">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-[14.5px] font-bold text-zinc-900 tracking-tight">
            Case Studies
          </span>
        </button>

        {/* Lit Reviews */}
        <button
          id="action-lit-reviews"
          onClick={() => onOpenAction('lit-reviews')}
          className="flex flex-col items-start p-4 bg-zinc-50/80 hover:bg-zinc-100/80 border border-zinc-200/80 rounded-2xl text-left transition-all active:scale-[0.98] shadow-xs group"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center mb-3 text-zinc-800 group-hover:border-zinc-300 shadow-2xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[14.5px] font-bold text-zinc-900 tracking-tight">
            Lit Reviews
          </span>
        </button>

        {/* Research Gaps */}
        <button
          id="action-research-gaps"
          onClick={() => onOpenAction('research-gaps')}
          className="flex flex-col items-start p-4 bg-zinc-50/80 hover:bg-zinc-100/80 border border-emerald-300/80 rounded-2xl text-left transition-all active:scale-[0.98] shadow-xs group relative overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-emerald-300/80 flex items-center justify-center mb-3 text-emerald-600 group-hover:border-emerald-400 shadow-2xs">
            <Lightbulb className="w-5 h-5" />
          </div>
          <span className="text-[14.5px] font-bold text-zinc-900 tracking-tight">
            Research Gaps
          </span>
        </button>
      </div>

      {/* Your Recent Research */}
      <div id="home-recent-research-section" className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
            Your Recent Research
          </h2>
          <span className="text-xs font-semibold text-zinc-400">Recent Queries</span>
        </div>

        {/* Recent Item 1 */}
        <button
          id="recent-research-item-1"
          onClick={() => onSelectRecentQuery('LLMs in Diagnostic Medicine')}
          className="flex items-start gap-3.5 p-3.5 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-2xl text-left transition-all active:scale-[0.99] shadow-2xs group"
        >
          <div className="p-2 rounded-xl bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200/80 transition-colors shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14.5px] font-bold text-zinc-900 truncate">
              LLMs in Diagnostic Medicine
            </div>
            <div className="text-xs text-zinc-500 font-medium mt-0.5">
              Viewed 2 hours ago • 14 Papers
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all mt-1" />
        </button>

        {/* Recent Item 2 */}
        <button
          id="recent-research-item-2"
          onClick={() => onSelectRecentQuery('Generated Summary: Blockchain Security')}
          className="flex items-start gap-3.5 p-3.5 bg-white hover:bg-zinc-50 border border-emerald-300 rounded-2xl text-left transition-all active:scale-[0.99] shadow-2xs group"
        >
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14.5px] font-bold text-zinc-900 truncate">
              Generated Summary: Blockchain Security
            </div>
            <div className="text-xs text-zinc-500 font-medium mt-0.5">
              Saved yesterday • AI Synthesis
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all mt-1" />
        </button>

        {/* Recent Item 3 */}
        <button
          id="recent-research-item-3"
          onClick={() => onSelectRecentQuery('AI-based healthcare fraud detection')}
          className="flex items-start gap-3.5 p-3.5 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-2xl text-left transition-all active:scale-[0.99] shadow-2xs group"
        >
          <div className="p-2 rounded-xl bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200/80 transition-colors shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14.5px] font-bold text-zinc-900 truncate">
              AI-based healthcare fraud detection
            </div>
            <div className="text-xs text-zinc-500 font-medium mt-0.5">
              Viewed 30 mins ago • 24 Papers
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all mt-1" />
        </button>
      </div>
    </div>
  );
};
