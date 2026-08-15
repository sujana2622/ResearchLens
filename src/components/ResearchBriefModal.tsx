import React from 'react';
import {
  X,
  Sparkles,
  FileText,
  Briefcase,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { ResearchBrief } from '../types';

interface ResearchBriefModalProps {
  brief: ResearchBrief;
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchBriefModal: React.FC<ResearchBriefModalProps> = ({
  brief,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Full AI Research Brief
              </h2>
              <p className="text-xs text-zinc-500 font-medium truncate max-w-sm">
                Topic: "{brief.query}"
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Executive Overview */}
          <div className="bg-emerald-50/50 border border-emerald-300 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Synthesis Overview
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-200">
                Consensus: {brief.consensusLevel}
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-zinc-800 font-normal">
              {brief.summary}
            </p>
            <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-emerald-200 text-xs font-semibold text-emerald-900">
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>{brief.paperCount} Peer-Reviewed Papers</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{brief.caseCount} Enterprise Deployments</span>
              </div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Key Empirical Findings</span>
            </h3>
            <div className="space-y-2.5">
              {brief.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dominant Methodologies */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-zinc-600" />
              <span>Leading Methodologies in Literature</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {brief.topMethodologies.map((method, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold bg-zinc-100 text-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Open Questions */}
          <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Open Research Questions</span>
            </h3>
            <ul className="space-y-2">
              {brief.openQuestions.map((q, idx) => (
                <li key={idx} className="text-xs text-zinc-700 leading-relaxed pl-2 border-l-2 border-amber-400">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
