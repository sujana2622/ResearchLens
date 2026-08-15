import React from 'react';
import { Home, FlaskConical, Building2, Bookmark } from 'lucide-react';

export type TabType = 'home' | 'workspace' | 'cases' | 'library' | 'search' | 'paper-analysis';

interface NavigationProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  savedCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
}) => {
  const isHomeActive = currentTab === 'home' || currentTab === 'search' || currentTab === 'paper-analysis';
  const isWorkspaceActive = currentTab === 'workspace';
  const isCasesActive = currentTab === 'cases';
  const isLibraryActive = currentTab === 'library';

  return (
    <nav
      id="bottom-navigation-bar"
      className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200/80 px-4 py-2 shadow-sm transition-all"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {/* Home */}
        <button
          id="nav-tab-home"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isHomeActive
              ? 'text-zinc-950 font-semibold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isHomeActive ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600'
            }`}
          >
            <Home className="w-5 h-5" strokeWidth={isHomeActive ? 2.5 : 2} />
          </div>
          <span className="text-xs mt-1 font-medium tracking-tight">Home</span>
        </button>

        {/* Workspace */}
        <button
          id="nav-tab-workspace"
          onClick={() => onSelectTab('workspace')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isWorkspaceActive
              ? 'text-zinc-950 font-semibold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isWorkspaceActive ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600'
            }`}
          >
            <FlaskConical className="w-5 h-5" strokeWidth={isWorkspaceActive ? 2.5 : 2} />
          </div>
          <span className="text-xs mt-1 font-medium tracking-tight">Workspace</span>
        </button>

        {/* Cases */}
        <button
          id="nav-tab-cases"
          onClick={() => onSelectTab('cases')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isCasesActive
              ? 'text-zinc-950 font-semibold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isCasesActive ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600'
            }`}
          >
            <Building2 className="w-5 h-5" strokeWidth={isCasesActive ? 2.5 : 2} />
          </div>
          <span className="text-xs mt-1 font-medium tracking-tight">Cases</span>
        </button>

        {/* Library */}
        <button
          id="nav-tab-library"
          onClick={() => onSelectTab('library')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
            isLibraryActive
              ? 'text-zinc-950 font-semibold'
              : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-colors ${
              isLibraryActive ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-600'
            }`}
          >
            <Bookmark className="w-5 h-5" strokeWidth={isLibraryActive ? 2.5 : 2} />
          </div>
          <span className="text-xs mt-1 font-medium tracking-tight">Library</span>
          {savedCount > 0 && (
            <span className="absolute top-1 right-5 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
