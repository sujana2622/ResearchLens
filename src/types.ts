export type TabType = 'home' | 'search' | 'workspace' | 'cases' | 'library';

export interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  doi: string;
  matchScore?: number; // e.g. 98%
  journal: string;
  abstract: string;
  domain: string;
  isOpenAccess: boolean;
  type: 'Journal' | 'Conference' | 'Preprint' | 'Review';
  isSaved?: boolean;
  status?: 'Analyzed' | 'Processing' | 'Draft';
  dateAdded?: string;
  analysis: {
    researchProblem: string;
    objective: string;
    algorithms: {
      name: string;
      role: 'Baseline' | 'Proposed' | 'Standard' | 'Comparison';
    }[];
    dataset: {
      name: string;
      records: string;
      features: string;
      description?: string;
    };
    summaryBullets: string[];
    results: {
      metric: string;
      value: string;
      comparisonBaseline?: string;
    }[];
    takeaways: string[];
    limitations: string[];
  };
}

export interface CaseStudy {
  id: string;
  title: string;
  organization: string;
  year: number;
  domain: string;
  summary: string;
  problem: string;
  solution: string;
  impactMetrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  techStack: string[];
  timeline: string;
  linkedPaperIds: string[];
}

export interface ResearchBrief {
  query: string;
  summary: string;
  paperCount: number;
  caseCount: number;
  keyFindings: string[];
  consensusLevel: 'High' | 'Moderate' | 'Emerging';
  topMethodologies: string[];
  openQuestions: string[];
}

export interface LitReview {
  id: string;
  title: string;
  query: string;
  createdAt: string;
  papersIncluded: string[];
  executiveSummary: string;
  thematicClusters: {
    theme: string;
    papers: string[];
    synthesis: string;
  }[];
  comparativeAnalysis: string;
  gapsIdentified: string[];
  bibtex: string;
}

export interface ResearchGapItem {
  id: string;
  title: string;
  category: 'Methodological' | 'Empirical' | 'Data Scarcity' | 'Application';
  description: string;
  opportunity: string;
  relevantPaperIds: string[];
  difficulty: 'Low' | 'Medium' | 'High';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citationQuotes?: {
    section: string;
    quote: string;
  }[];
}
