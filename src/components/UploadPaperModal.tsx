import React, { useState } from 'react';
import {
  X,
  Upload,
  FileText,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { Paper } from '../types';
import { extractUploadedPaper } from '../services/geminiService';

interface UploadPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaperAdded: (paper: Paper) => void;
}

export const UploadPaperModal: React.FC<UploadPaperModalProps> = ({
  isOpen,
  onClose,
  onPaperAdded,
}) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setText(content || '');
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !title.trim()) return;

    setIsProcessing(true);
    try {
      const paper = await extractUploadedPaper(text || title, title, authors);
      onPaperAdded(paper);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
              <Upload className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Add / Ingest Research Paper
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                Upload or paste paper text for instant AI extraction & analysis.
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files?.[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-emerald-500 bg-emerald-50/50'
                : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50'
            }`}
            onClick={() => document.getElementById('paper-file-input')?.click()}
          >
            <input
              id="paper-file-input"
              type="file"
              accept=".txt,.md,.pdf,.json"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <FileText className="w-6 h-6 text-zinc-400 mx-auto mb-1.5" />
            <p className="text-xs font-bold text-zinc-700">
              Drag and drop text/PDF file here, or browse
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Supports .txt, .pdf, or paste below
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">
              Paper Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Graph Neural Networks for Fraud Detection"
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">
              Authors
            </label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              placeholder="e.g. A. Smith, J. Doe et al."
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">
              Abstract or Paper Excerpt
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste paper abstract, methods, or full text here..."
              className="w-full bg-zinc-50 border border-zinc-200 focus:border-zinc-400 rounded-xl p-3 text-xs text-zinc-900 focus:outline-hidden leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || (!title.trim() && !text.trim())}
              className="bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-xs"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span>Extracting Metadata...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Analyze & Ingest</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
