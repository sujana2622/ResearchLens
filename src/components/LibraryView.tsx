import React, { useState } from 'react';
import {
  Bookmark,
  Search,
  Download,
  FolderOpen,
  BarChart2,
  Trash2,
  Copy,
  Check,
  FileText,
  Sparkles,
} from 'lucide-react';
import { Paper } from '../types';

interface LibraryViewProps {
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  onToggleBookmark: (paperId: string) => void;
  onOpenBibtexModal: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  papers,
  onSelectPaper,
  onToggleBookmark,
  onOpenBibtexModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const savedPapers = papers.filter((p) => p.isSaved);

  const tags = ['All', 'Healthcare AI', 'NLP', 'Deep Learning', 'Transformers'];

  const filteredPapers = savedPapers.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.journal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || p.domain.toLowerCase().includes(selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  return (
    <div id="library-view-container" className="flex flex-col min-h-full px-4 pt-3 pb-24 max-w-md mx-auto w-full">
      {/* Top Header */}
      <div id="library-header" className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-zinc-900" fill="currentColor" />
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
            Library
          </h1>
        </div>
        <button
          id="export-citations-btn"
          onClick={onOpenBibtexModal}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export BibTeX</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <div className="flex items-center w-full bg-zinc-100/90 border border-zinc-200 rounded-2xl px-3.5 py-2.5 shadow-2xs">
          <Search className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved papers, authors, journals..."
            className="w-full bg-transparent text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Tag Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 transition-colors ${
              selectedTag === tag
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Paper List */}
      <div className="flex flex-col gap-3">
        {filteredPapers.map((paper) => (
          <div
            key={paper.id}
            id={`library-paper-${paper.id}`}
            className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-xs hover:border-zinc-300 transition-all"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md">
                {paper.domain}
              </span>
              <button
                onClick={() => onToggleBookmark(paper.id)}
                className="text-zinc-900 hover:text-red-600 transition-colors p-1"
                title="Remove from bookmarks"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>

            <h3
              onClick={() => onSelectPaper(paper)}
              className="text-[15px] font-bold text-zinc-900 leading-snug cursor-pointer hover:text-zinc-700 transition-colors mb-1"
            >
              {paper.title}
            </h3>

            <div className="text-xs text-zinc-500 font-medium mb-3">
              {paper.authors} • {paper.year}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
              <span className="text-zinc-500 font-medium truncate max-w-[180px]">
                {paper.journal}
              </span>
              <button
                onClick={() => onSelectPaper(paper)}
                className="flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors"
              >
                <BarChart2 className="w-3.5 h-3.5" />
                <span>Analyze</span>
              </button>
            </div>
          </div>
        ))}

        {filteredPapers.length === 0 && (
          <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-zinc-200">
            <Bookmark className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-700">No saved papers found.</p>
            <p className="text-xs text-zinc-500 mt-1">
              Bookmark papers from Search or Workspace to build your reading collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
