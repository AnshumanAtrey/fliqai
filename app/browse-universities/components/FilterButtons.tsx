import { ChevronDownIcon } from '../assets/ChevronDownIcon';

interface FilterButtonsProps {
  selectedCountry: string;
  showCountriesFilter: boolean;
  showSortFilter: boolean;
  setShowCountriesFilter: (show: boolean) => void;
  setShowSortFilter: (show: boolean) => void;
}

export function FilterButtons({ 
  selectedCountry, 
  showCountriesFilter, 
  showSortFilter, 
  setShowCountriesFilter, 
  setShowSortFilter 
}: FilterButtonsProps) {
  return (
    <div className="relative mb-6 w-full">
      {/* Mobile: Horizontal scrollable, Desktop: Normal flex */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide sm:overflow-visible pb-1">
        {/* Country Filter */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              setShowCountriesFilter(!showCountriesFilter);
              setShowSortFilter(false);
            }}
            className={`flex py-2 sm:py-3 px-3 sm:px-4 justify-center items-center gap-2 border border-black whitespace-nowrap ${selectedCountry ? 'bg-accent' : 'bg-light-secondary dark:bg-dark-secondary'} cursor-pointer`}
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <span className="text-black font-outfit text-sm sm:text-base font-medium">
              Countries {selectedCountry ? `(${selectedCountry === 'US' ? 'United States' : selectedCountry === 'UK' ? 'United Kingdom' : selectedCountry})` : ''}
            </span>
            <ChevronDownIcon />
          </button>
        </div>

        {/* Sort Filter */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              setShowSortFilter(!showSortFilter);
              setShowCountriesFilter(false);
            }}
            className="flex py-2 sm:py-3 px-3 sm:px-4 justify-center items-center gap-2 border border-black bg-light-secondary dark:bg-dark-secondary cursor-pointer whitespace-nowrap"
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <span className="text-black font-outfit text-sm sm:text-base font-medium">Sort by</span>
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </div>
  );
}