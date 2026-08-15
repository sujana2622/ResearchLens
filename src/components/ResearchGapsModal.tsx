import React, { useState } from 'react';
import {
  X,
  Lightbulb,
  ArrowRight,
  Filter,
  AlertCircle,
  TrendingUp,
  Search,
} from 'lucide-react';
import { sampleResearchGaps } from '../data/mockData';
import { ResearchGapItem } from '../types';

interface ResearchGapsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreTopic?: (topic: string) => void;
}

export const ResearchGapsModal: React.FC<ResearchGapsModalProps> = ({
  isOpen,
  onClose,
  onExploreTopic,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Methodological', 'Data Scarcity', 'Application', 'Empirical'];

  const filteredGaps = sampleResearchGaps.filter((g) =>
    selectedCategory === 'All' ? true : g.category === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Discovered Research Gaps
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                AI-identified blindspots, open scientific questions, and high-impact opportunities.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-5 py-2.5 border-b border-zinc-100 bg-white flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gaps List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredGaps.map((gap) => (
            <div
              key={gap.id}
              className="bg-white border border-zinc-200 hover:border-emerald-300 rounded-2xl p-4 shadow-xs transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {gap.category}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    gap.difficulty === 'High'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : gap.difficulty === 'Medium'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}
                >
                  {gap.difficulty} Complexity
                </span>
              </div>

              <h3 className="text-[15px] font-bold text-zinc-900 leading-snug mb-2">
                {gap.title}
              </h3>

              <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-700 leading-relaxed mb-3">
                <span className="font-bold text-zinc-900 block mb-1">Current Research Limitation:</span>
                {gap.description}
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed mb-3">
                <span className="font-bold text-emerald-950 block mb-1">Research Opportunity:</span>
                {gap.opportunity}
              </div>

              {onExploreTopic && (
                <button
                  onClick={() => {
                    onClose();
                    onExploreTopic(gap.title);
                  }}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Literature on this Gap</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
