import { SearchIcon } from '../assets/SearchIcon';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchBar({ searchTerm, setSearchTerm, onSubmit }: SearchBarProps) {
  return (
    <div className="mb-6 sm:mb-8">
      {/* Search Bar */}
      <div className="relative w-full h-16 sm:h-20 bg-light-secondary dark:bg-dark-secondary">
        <div className="absolute left-1 sm:left-[4px] top-1/2 transform -translate-y-1/2 z-10">
          <div className="w-14 h-14 sm:w-[73px] sm:h-[73px] shrink-0 flex items-center justify-center border border-light-text dark:border-dark-text bg-accent">
            <SearchIcon />
          </div>
        </div>
        <input
          type="text"
          placeholder="Search universities by name..."
          className="w-full h-16 sm:h-20 shrink-0 border border-light-text dark:border-dark-text bg-light-secondary dark:bg-dark-secondary pl-16 sm:pl-[90px] pr-4 sm:pr-5 outline-none font-outfit text-base sm:text-lg font-medium leading-normal text-light-text dark:text-dark-text"
          style={{
            boxShadow: '4px 4px 0 0 #000'
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSubmit(e);
            }
          }}
        />
      </div>
    </div>
  );
}