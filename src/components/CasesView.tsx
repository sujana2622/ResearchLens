import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  DollarSign,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CaseStudy } from '../types';

interface CasesViewProps {
  caseStudies: CaseStudy[];
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export const CasesView: React.FC<CasesViewProps> = ({
  caseStudies,
  onSelectCaseStudy,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const domains = ['All', 'Healthcare & Public Sector', 'Hospital Operations', 'Financial Technology', 'Clinical Decision Support'];

  const filteredCases = caseStudies.filter((cs) => {
    const matchesDomain = selectedDomain === 'All' || cs.domain.toLowerCase().includes(selectedDomain.toLowerCase());
    const matchesSearch =
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div id="cases-view-container" className="flex flex-col min-h-full px-4 pt-3 pb-24 max-w-md mx-auto w-full">
      {/* Top Header */}
      <div id="cases-header" className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="w-6 h-6 text-zinc-900" />
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
            Case Studies
          </h1>
        </div>
        <p className="text-xs text-zinc-600 font-normal">
          Real-world enterprise & clinical AI deployments with measured ROI metrics.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="relative mb-3">
        <div className="flex items-center w-full bg-zinc-100/90 border border-zinc-200 rounded-2xl px-3.5 py-2.5 shadow-2xs">
          <Search className="w-4 h-4 text-zinc-400 mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organizations, metrics, tech..."
            className="w-full bg-transparent text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Domain Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {domains.map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 transition-colors ${
              selectedDomain === dom
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Case Studies List */}
      <div className="flex flex-col gap-3.5">
        {filteredCases.map((cs) => (
          <div
            key={cs.id}
            id={`case-card-${cs.id}`}
            onClick={() => onSelectCaseStudy(cs)}
            className="bg-white border border-zinc-200 hover:border-emerald-400 rounded-2xl p-4 transition-all shadow-xs cursor-pointer group"
          >
            {/* Header: Organization & Year */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold tracking-wide uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {cs.domain}
              </span>
              <span className="text-xs font-semibold text-zinc-500">
                {cs.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-[15.5px] font-bold text-zinc-900 leading-snug mb-1 group-hover:text-emerald-900 transition-colors">
              {cs.title}
            </h3>

            {/* Org */}
            <div className="text-xs font-semibold text-zinc-600 mb-2.5">
              {cs.organization}
            </div>

            {/* Summary */}
            <p className="text-[13px] text-zinc-600 leading-relaxed line-clamp-2 mb-3">
              {cs.summary}
            </p>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-3 gap-2 bg-zinc-50 rounded-xl p-2.5 border border-zinc-100 mb-3">
              {cs.impactMetrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <span className="text-sm font-black text-emerald-700 block">
                    {metric.value}
                  </span>
                  <span className="text-[10.5px] font-medium text-zinc-500 block truncate">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech stack badges */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                {cs.techStack.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
