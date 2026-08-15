import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Download,
  Copy,
  Check,
  Layers,
  ArrowRight,
  Loader2,
  FileCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Paper, LitReview } from '../types';
import { generateLitReview } from '../services/geminiService';

interface LitReviewModalProps {
  papers: Paper[];
  isOpen: boolean;
  onClose: () => void;
}

export const LitReviewModal: React.FC<LitReviewModalProps> = ({
  papers,
  isOpen,
  onClose,
}) => {
  const [topic, setTopic] = useState('AI in Healthcare Fraud & Anomaly Detection');
  const [isGenerating, setIsGenerating] = useState(false);
  const [review, setReview] = useState<LitReview | null>(null);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateLitReview(topic, papers);
      setReview(generated);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyBibtex = () => {
    if (!review) return;
    navigator.clipboard.writeText(review.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const handleCopyMarkdown = () => {
    if (!review) return;
    const md = `# ${review.title}
Date: ${review.createdAt}
Topic: ${review.query}

## Executive Summary
${review.executiveSummary}

## Thematic Clusters
${review.thematicClusters
  .map(
    (c) => `### ${c.theme}
${c.synthesis}
Included Papers: ${c.papers.join(', ')}`
  )
  .join('\n\n')}

## Comparative Synthesis
${review.comparativeAnalysis}

## Identified Research Gaps
${review.gapsIdentified.map((g) => `- ${g}`).join('\n')}

## References (BibTeX)
\`\`\`bibtex
${review.bibtex}
\`\`\`
`;
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Generate Literature Review
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                Multi-paper thematic synthesis & comparative evidence analysis.
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Topic Configuration */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-3">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Research Focus / Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Graph Neural Networks for Fraud Detection"
              className="w-full bg-white border border-zinc-300 focus:border-zinc-500 rounded-xl px-3.5 py-2 text-sm text-zinc-900 focus:outline-hidden"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-zinc-500 font-medium">
                Synthesizing {papers.length} workspace papers
              </span>
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-xs"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{review ? 'Regenerate Review' : 'Synthesize Review'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Review Output */}
          {review && (
            <div className="space-y-4 animate-in fade-in">
              {/* Header card with export actions */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <div>
                  <h3 className="font-extrabold text-zinc-900 text-lg">
                    {review.title}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Generated on {review.createdAt} • {review.papersIncluded.length} papers
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMarkdown}
                    className="flex items-center gap-1 text-xs font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200 transition-colors"
                  >
                    {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMd ? 'Copied MD' : 'Copy MD'}</span>
                  </button>
                  <button
                    onClick={handleCopyBibtex}
                    className="flex items-center gap-1 text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{copiedBibtex ? 'Copied BibTeX' : 'BibTeX'}</span>
                  </button>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                  Executive Synthesis
                </h4>
                <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                  {review.executiveSummary}
                </p>
              </div>

              {/* Thematic Clusters */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Thematic Clusters & Methodologies
                </h4>
                {review.thematicClusters.map((cluster, ci) => (
                  <div key={ci} className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
                    <h5 className="font-bold text-zinc-900 text-sm mb-1.5 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <span>{cluster.theme}</span>
                    </h5>
                    <p className="text-xs text-zinc-700 leading-relaxed mb-3">
                      {cluster.synthesis}
                    </p>
                    <div className="pt-2 border-t border-zinc-100 flex flex-wrap gap-1.5">
                      {cluster.papers.map((pTitle, pi) => (
                        <span key={pi} className="text-[11px] font-semibold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md">
                          {pTitle}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparative Analysis */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Comparative Analysis
                </h4>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {review.comparativeAnalysis}
                </p>
              </div>

              {/* Gaps */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                  Gaps & Future Directions
                </h4>
                <ul className="space-y-1.5">
                  {review.gapsIdentified.map((gap, gi) => (
                    <li key={gi} className="text-xs text-zinc-700 leading-relaxed pl-2 border-l-2 border-amber-400">
                      {gap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
