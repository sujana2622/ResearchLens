import React, { useState } from 'react';
import { X, GitCompare, Check, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Paper } from '../types';

interface ComparePapersModalProps {
  papers: Paper[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPaper: (paper: Paper) => void;
}

export const ComparePapersModal: React.FC<ComparePapersModalProps> = ({
  papers,
  isOpen,
  onClose,
  onSelectPaper,
}) => {
  const [selectedPaperIds, setSelectedPaperIds] = useState<string[]>(() =>
    papers.slice(0, 2).map((p) => p.id)
  );

  if (!isOpen) return null;

  const togglePaper = (id: string) => {
    if (selectedPaperIds.includes(id)) {
      if (selectedPaperIds.length > 1) {
        setSelectedPaperIds(selectedPaperIds.filter((pId) => pId !== id));
      }
    } else {
      if (selectedPaperIds.length < 3) {
        setSelectedPaperIds([...selectedPaperIds, id]);
      }
    }
  };

  const compared = papers.filter((p) => selectedPaperIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Paper Comparison Matrix
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                Select 2-3 papers to compare objectives, algorithms, datasets, and benchmark metrics.
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

        {/* Paper selector pills */}
        <div className="px-5 py-3 border-b border-zinc-100 bg-white flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-zinc-500 shrink-0">Selected ({selectedPaperIds.length}/3):</span>
          {papers.map((p) => {
            const isSelected = selectedPaperIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => togglePaper(p.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                <span className="max-w-[150px] truncate">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Header Row of papers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compared.map((paper) => (
              <div
                key={paper.id}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {paper.domain}
                  </span>
                  <h3 className="font-bold text-zinc-900 text-sm mt-2 line-clamp-2">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    {paper.authors} ({paper.year})
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectPaper(paper);
                  }}
                  className="mt-3 text-xs font-bold text-zinc-900 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>View full analysis</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Section 1: Problem & Objective */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
              Research Problem & Objective
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {compared.map((p) => (
                <div key={p.id} className="text-xs leading-relaxed space-y-2">
                  <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-100">
                    <span className="font-bold text-zinc-800 block mb-1">Problem:</span>
                    <p className="text-zinc-600">{p.analysis.researchProblem}</p>
                  </div>
                  <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-100">
                    <span className="font-bold text-zinc-800 block mb-1">Objective:</span>
                    <p className="text-zinc-600">{p.analysis.objective}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Methodologies & Algorithms */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
              Algorithms & Methods
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {compared.map((p) => (
                <div key={p.id} className="flex flex-wrap gap-1.5">
                  {p.analysis.algorithms.map((a, i) => (
                    <span
                      key={i}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                        a.role === 'Proposed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                      }`}
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Datasets */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
              Dataset Evaluation
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {compared.map((p) => (
                <div key={p.id} className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs">
                  <span className="font-bold text-zinc-900 block mb-1">{p.analysis.dataset.name}</span>
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-zinc-200/60">
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Records</span>
                      <span className="font-bold text-zinc-800">{p.analysis.dataset.records}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Features</span>
                      <span className="font-bold text-zinc-800">{p.analysis.dataset.features}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Key Results */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
              Empirical Performance
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {compared.map((p) => (
                <div key={p.id} className="space-y-1.5">
                  {p.analysis.results.map((r, ri) => (
                    <div key={ri} className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-200/60 text-xs flex justify-between">
                      <span className="font-medium text-zinc-700">{r.metric}</span>
                      <span className="font-extrabold text-emerald-800">{r.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
