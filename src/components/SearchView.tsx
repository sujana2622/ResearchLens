import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Bookmark,
  BarChart2,
  FileText,
  Briefcase,
  X,
  Check,
} from 'lucide-react';
import { Paper, ResearchBrief } from '../types';

interface SearchViewProps {
  query: string;
  onQueryChange: (q: string) => void;
  onBack: () => void;
  researchBrief: ResearchBrief;
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  onToggleBookmark: (paperId: string) => void;
  onOpenFullBrief: () => void;
  isLoadingBrief?: boolean;
}

export const SearchView: React.FC<SearchViewProps> = ({
  query,
  onQueryChange,
  onBack,
  researchBrief,
  papers,
  onSelectPaper,
  onToggleBookmark,
  onOpenFullBrief,
  isLoadingBrief,
}) => {
  const [isBriefExpanded, setIsBriefExpanded] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [openAccessOnly, setOpenAccessOnly] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>('All');

  const [activeDropdown, setActiveDropdown] = useState<'year' | 'domain' | 'type' | null>(null);

  // Filter papers
  const filteredPapers = papers.filter((paper) => {
    if (selectedYear !== 'All' && paper.year.toString() !== selectedYear) return false;
    if (selectedDomain !== 'All' && !paper.domain.toLowerCase().includes(selectedDomain.toLowerCase())) return false;
    if (openAccessOnly && !paper.isOpenAccess) return false;
    if (selectedType !== 'All' && paper.type !== selectedType) return false;
    return true;
  });

  return (
    <div id="search-view-container" className="flex flex-col min-h-full px-4 pt-3 pb-24 max-w-md mx-auto w-full">
      {/* Top Header & Search Bar */}
      <div id="search-top-bar" className="flex items-center gap-2 mb-3">
        <button
          id="search-back-btn"
          onClick={onBack}
          className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 active:scale-95 transition-all shrink-0"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 flex items-center bg-zinc-100/90 border border-zinc-200 focus-within:border-zinc-400 focus-within:bg-white rounded-2xl px-3 py-2 transition-all">
          <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
          <input
            id="search-query-input"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search papers, methods, topics..."
            className="w-full bg-transparent text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              className="text-zinc-400 hover:text-zinc-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          id="search-filter-icon-btn"
          onClick={() => setActiveDropdown(activeDropdown ? null : 'domain')}
          className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
            activeDropdown || openAccessOnly || selectedYear !== 'All' || selectedDomain !== 'All'
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
          }`}
          title="Filter options"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* AI Research Brief Card (Mint Accent) */}
      <div
        id="ai-research-brief-card"
        className="mb-4 bg-white border border-emerald-300 rounded-2xl p-4 shadow-xs transition-all"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>AI Research Brief</span>
          </div>
          <button
            id="toggle-brief-btn"
            onClick={() => setIsBriefExpanded(!isBriefExpanded)}
            className="text-zinc-400 hover:text-zinc-600 p-1 transition-transform"
          >
            {isBriefExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {isBriefExpanded && (
          <>
            <p className="text-[13.5px] leading-relaxed text-zinc-700 mb-3 font-normal">
              {isLoadingBrief ? (
                <span className="inline-flex items-center gap-2 text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Synthesizing empirical research brief with Gemini...
                </span>
              ) : (
                researchBrief.summary
              )}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-600 mb-3">
              <div className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-zinc-500" />
                <span>{researchBrief.paperCount} Papers</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                <span>{researchBrief.caseCount} Cases</span>
              </div>
            </div>

            <button
              id="view-full-brief-btn"
              onClick={onOpenFullBrief}
              className="w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl py-2.5 px-4 text-[13.5px] font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.99] shadow-xs"
            >
              <span>View Full Research Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Filter Chips Horizontal Row */}
      <div id="filter-chips-row" className="relative flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {/* Year Filter */}
        <div className="relative shrink-0">
          <button
            id="filter-chip-year"
            onClick={() => setActiveDropdown(activeDropdown === 'year' ? null : 'year')}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              selectedYear !== 'All'
                ? 'bg-zinc-900 text-white border-zinc-900 font-semibold'
                : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <span>{selectedYear === 'All' ? 'Year' : `Year: ${selectedYear}`}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {activeDropdown === 'year' && (
            <div className="absolute left-0 mt-1.5 w-32 bg-white border border-zinc-200 rounded-xl shadow-lg z-30 p-1 text-xs">
              {['All', '2024', '2023', '2022', '2020', '2017'].map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                    selectedYear === year ? 'bg-zinc-100 font-bold text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  <span>{year}</span>
                  {selectedYear === year && <Check className="w-3 h-3 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Domain Filter */}
        <div className="relative shrink-0">
          <button
            id="filter-chip-domain"
            onClick={() => setActiveDropdown(activeDropdown === 'domain' ? null : 'domain')}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              selectedDomain !== 'All'
                ? 'bg-zinc-900 text-white border-zinc-900 font-semibold'
                : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <span>{selectedDomain === 'All' ? 'Domain' : selectedDomain}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {activeDropdown === 'domain' && (
            <div className="absolute left-0 mt-1.5 w-44 bg-white border border-zinc-200 rounded-xl shadow-lg z-30 p-1 text-xs">
              {['All', 'Healthcare AI', 'Graph Machine Learning', 'Natural Language Processing', 'Deep Learning'].map(
                (domain) => (
                  <button
                    key={domain}
                    onClick={() => {
                      setSelectedDomain(domain);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      selectedDomain === domain ? 'bg-zinc-100 font-bold text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
                    }`}
                  >
                    <span>{domain}</span>
                    {selectedDomain === domain && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* Open Access Toggle */}
        <button
          id="filter-chip-open-access"
          onClick={() => setOpenAccessOnly(!openAccessOnly)}
          className={`shrink-0 flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
            openAccessOnly
              ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
              : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
          }`}
        >
          <span>Open Access</span>
          {openAccessOnly && <Check className="w-3 h-3 ml-0.5" />}
        </button>

        {/* Type Filter */}
        <div className="relative shrink-0">
          <button
            id="filter-chip-type"
            onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              selectedType !== 'All'
                ? 'bg-zinc-900 text-white border-zinc-900 font-semibold'
                : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <span>{selectedType === 'All' ? 'Type' : selectedType}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>

          {activeDropdown === 'type' && (
            <div className="absolute right-0 mt-1.5 w-32 bg-white border border-zinc-200 rounded-xl shadow-lg z-30 p-1 text-xs">
              {['All', 'Journal', 'Conference', 'Preprint', 'Review'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                    selectedType === type ? 'bg-zinc-100 font-bold text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  <span>{type}</span>
                  {selectedType === type && <Check className="w-3 h-3 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Paper Result Cards List */}
      <div id="search-paper-results-list" className="flex flex-col gap-3.5">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            id={`paper-card-${paper.id}`}
            className="bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-4 transition-all shadow-xs"
          >
            {/* Header: Match Score, Year, Bookmark */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  {paper.matchScore || 95}% Match
                </span>
                <span className="text-xs font-semibold text-zinc-500">
                  {paper.year}
                </span>
              </div>
              <button
                id={`bookmark-btn-${paper.id}`}
                onClick={() => onToggleBookmark(paper.id)}
                className={`p-1 rounded-md transition-colors ${
                  paper.isSaved
                    ? 'text-zinc-900 bg-zinc-100'
                    : 'text-zinc-400 hover:text-zinc-700'
                }`}
                title={paper.isSaved ? 'Saved in library' : 'Save to library'}
              >
                <Bookmark
                  className="w-4 h-4"
                  fill={paper.isSaved ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            {/* Title */}
            <h3
              onClick={() => onSelectPaper(paper)}
              className="text-[15.5px] font-bold text-zinc-900 leading-snug mb-1 cursor-pointer hover:text-zinc-700 transition-colors"
            >
              {paper.title}
            </h3>

            {/* Authors */}
            <div className="text-xs text-zinc-500 font-medium mb-2.5">
              {paper.authors}
            </div>

            {/* Abstract snippet */}
            <p className="text-[13px] leading-relaxed text-zinc-600 font-normal line-clamp-3 mb-3">
              {paper.abstract}
            </p>

            <div className="h-px bg-zinc-100 w-full mb-3" />

            {/* Footer: Journal + Analyze button */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-zinc-500 font-medium truncate max-w-[200px]">
                {paper.journal}
              </span>
              <button
                id={`analyze-paper-btn-${paper.id}`}
                onClick={() => onSelectPaper(paper)}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white hover:bg-emerald-50 border border-emerald-500/80 rounded-lg px-3 py-1.5 transition-colors shrink-0 shadow-2xs"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Analyze</span>
              </button>
            </div>
          </div>
        ))}

        {filteredPapers.length === 0 && (
          <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
            <p className="text-sm font-semibold text-zinc-700">No papers matched your filters.</p>
            <button
              onClick={() => {
                setSelectedYear('All');
                setSelectedDomain('All');
                setOpenAccessOnly(false);
                setSelectedType('All');
              }}
              className="mt-2 text-xs font-bold text-zinc-900 underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
