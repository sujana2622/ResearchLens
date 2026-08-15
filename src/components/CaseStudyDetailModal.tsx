import React from 'react';
import {
  X,
  Building2,
  TrendingUp,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { CaseStudy, Paper } from '../types';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  allPapers: Paper[];
  onSelectPaper: (paper: Paper) => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  caseStudy,
  isOpen,
  onClose,
  allPapers,
  onSelectPaper,
}) => {
  if (!isOpen || !caseStudy) return null;

  const linkedPapers = allPapers.filter((p) =>
    caseStudy.linkedPaperIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {caseStudy.domain}
              </span>
              <h2 className="text-base font-bold text-zinc-900 mt-1">
                {caseStudy.organization}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <h1 className="text-lg font-black text-zinc-900 leading-snug">
            {caseStudy.title}
          </h1>

          {/* Impact Metrics Banner */}
          <div className="grid grid-cols-3 gap-2.5 bg-emerald-50/50 border border-emerald-200 rounded-2xl p-3.5">
            {caseStudy.impactMetrics.map((m, i) => (
              <div key={i} className="text-center">
                <span className="text-lg font-black text-emerald-700 block">
                  {m.value}
                </span>
                <span className="text-xs font-bold text-zinc-900 block mt-0.5">
                  {m.label}
                </span>
                <span className="text-[11px] text-zinc-500 block mt-0.5">
                  {m.detail}
                </span>
              </div>
            ))}
          </div>

          {/* The Problem */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
              Business & Clinical Challenge
            </h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>

          {/* The Solution */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
              Implemented AI Architecture
            </h3>
            <p className="text-xs text-zinc-700 leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>

          {/* Tech Stack & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {caseStudy.techStack.map((tech, i) => (
                  <span key={i} className="text-[11px] font-semibold bg-white text-zinc-700 border border-zinc-200 px-2.5 py-1 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                Deployment Timeline
              </span>
              <p className="text-xs text-zinc-700 font-medium">
                {caseStudy.timeline}
              </p>
            </div>
          </div>

          {/* Linked Research Papers */}
          {linkedPapers.length > 0 && (
            <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2.5">
                Foundational Research Papers
              </span>
              <div className="space-y-2">
                {linkedPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => {
                      onClose();
                      onSelectPaper(paper);
                    }}
                    className="p-3 bg-zinc-50 hover:bg-zinc-100 rounded-xl border border-zinc-200 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-zinc-900 truncate group-hover:text-emerald-700">
                        {paper.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 truncate">
                        {paper.authors} ({paper.year})
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-700 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
