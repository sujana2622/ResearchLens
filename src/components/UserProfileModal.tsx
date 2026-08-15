import React from 'react';
import {
  X,
  User,
  Shield,
  Sparkles,
  BookOpen,
  CheckCircle,
  Database,
  Key,
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPapersCount: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  savedPapersCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
              <User className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Researcher Profile
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                Preferences & AI Intelligence Settings
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

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* User Card */}
          <div className="flex items-center gap-3.5 p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-black shrink-0">
              DR
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">Dr. Elena Rostova</h3>
              <p className="text-xs text-zinc-500 font-medium">Principal AI Research Scientist</p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Enterprise Research Edition</span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <span className="text-lg font-black text-zinc-900 block">{savedPapersCount}</span>
              <span className="text-[11px] text-zinc-500 font-medium">Library Citations</span>
            </div>
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
              <span className="text-lg font-black text-emerald-700 block">Gemini 2.5</span>
              <span className="text-[11px] text-zinc-500 font-medium">Model Engine</span>
            </div>
          </div>

          {/* AI Settings Info */}
          <div className="p-3.5 bg-white border border-zinc-200 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-800">Automated Literature Synthesizer</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-800">Citation Formats</span>
              <span className="text-zinc-600">BibTeX, APA 7th, IEEE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-800">Domain Grounding</span>
              <span className="text-zinc-600">PubMed, IEEE, arXiv</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
