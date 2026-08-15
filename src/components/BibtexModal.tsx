import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';
import { Paper } from '../types';

interface BibtexModalProps {
  papers: Paper[];
  isOpen: boolean;
  onClose: () => void;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({
  papers,
  isOpen,
  onClose,
}) => {
  const [format, setFormat] = useState<'bibtex' | 'apa'>('bibtex');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const savedPapers = papers.filter((p) => p.isSaved);

  const bibtexContent = savedPapers
    .map((p) => {
      const citeKey = `${p.authors.split(',')[0].trim().toLowerCase()}${p.year}`;
      return `@article{${citeKey},
  title = {${p.title}},
  author = {${p.authors}},
  journal = {${p.journal}},
  year = {${p.year}},
  doi = {${p.doi}}
}`;
    })
    .join('\n\n');

  const apaContent = savedPapers
    .map((p) => `${p.authors} (${p.year}). ${p.title}. ${p.journal}. https://doi.org/${p.doi}`)
    .join('\n\n');

  const exportText = format === 'bibtex' ? bibtexContent : apaContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = format === 'bibtex' ? 'references.bib' : 'references.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-zinc-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
              <Download className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Export Citations
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                {savedPapers.length} saved papers in library
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

        {/* Format Selector */}
        <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setFormat('bibtex')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                format === 'bibtex' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              BibTeX (.bib)
            </button>
            <button
              onClick={() => setFormat('apa')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                format === 'apa' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              APA Format (.txt)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-xl transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code / Text Preview */}
        <div className="p-4 bg-zinc-900 text-zinc-100 text-xs font-mono max-h-72 overflow-y-auto leading-relaxed">
          <pre className="whitespace-pre-wrap">{exportText || '// No saved papers in library.'}</pre>
        </div>
      </div>
    </div>
  );
};
