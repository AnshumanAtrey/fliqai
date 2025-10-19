'use client';

type TabType = 'general' | 'credits' | 'preferences';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="flex flex-row sm:flex-row w-full border border-light-text dark:border-dark-text" style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}>
      <button
        onClick={() => setActiveTab('general')}
        className={`flex justify-center items-center gap-2.5 py-3 px-4 sm:px-6 flex-1 font-outfit text-base sm:text-lg font-medium border-t sm:border-t-0 sm:border-l border-light-text dark:border-dark-text transition-colors ${activeTab === 'general'
            ? 'bg-[#FF9269] text-white'
            : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text hover:bg-[#FF9269] hover:text-white'
          }`}
      >
        General
      </button>
      <button
        onClick={() => setActiveTab('credits')}
        className={`flex justify-center items-center gap-2.5 py-3 px-4 sm:px-6 flex-1 font-outfit text-base sm:text-lg font-medium border-t sm:border-t-0 sm:border-l border-light-text dark:border-dark-text transition-colors ${activeTab === 'credits'
            ? 'bg-[#FF9269] text-white'
            : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text hover:bg-[#FF9269] hover:text-white'
          }`}
      >
        Credits
      </button>
      <button
        onClick={() => setActiveTab('preferences')}
        className={`flex justify-center items-center gap-2.5 py-3 px-4 sm:px-6 flex-1 font-outfit text-base sm:text-lg font-medium border-t sm:border-t-0 sm:border-l border-light-text dark:border-dark-text transition-colors ${activeTab === 'preferences'
            ? 'bg-[#FF9269] text-white'
            : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text hover:bg-[#FF9269] hover:text-white'
          }`}
      >
        Preferences
      </button>
    </div>
  );
}