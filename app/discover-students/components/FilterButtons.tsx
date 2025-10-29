import { ChevronDownIcon } from '../assets/ChevronDownIcon';

interface FilterButtonsProps {
  // Filter states
  showGPAFilter: boolean;
  showSATFilter: boolean;
  showMajorFilter: boolean;
  showBackgroundFilter: boolean;
  showCountriesFilter: boolean;
  showSortFilter: boolean;
  
  // Filter setters
  setShowGPAFilter: (show: boolean) => void;
  setShowSATFilter: (show: boolean) => void;
  setShowMajorFilter: (show: boolean) => void;
  setShowBackgroundFilter: (show: boolean) => void;
  setShowCountriesFilter: (show: boolean) => void;
  setShowSortFilter: (show: boolean) => void;
  
  // Filter values for display
  gpaMin: number;
  gpaMax: number;
  satMin: number;
  satMax: number;
  selectedMajors: string[];
  selectedBackgrounds: string[];
  selectedCountries: string[];
}

export function FilterButtons({ 
  showGPAFilter,
  showSATFilter,
  showMajorFilter,
  showBackgroundFilter,
  showCountriesFilter,
  showSortFilter,
  setShowGPAFilter,
  setShowSATFilter,
  setShowMajorFilter,
  setShowBackgroundFilter,
  setShowCountriesFilter,
  setShowSortFilter,
  gpaMin,
  gpaMax,
  satMin,
  satMax,
  selectedMajors,
  selectedBackgrounds,
  selectedCountries
}: FilterButtonsProps) {
  
  const closeAllFilters = () => {
    setShowGPAFilter(false);
    setShowSATFilter(false);
    setShowMajorFilter(false);
    setShowBackgroundFilter(false);
    setShowCountriesFilter(false);
    setShowSortFilter(false);
  };

  return (
    <div className="relative mb-6 w-full">
      {/* Mobile: Horizontal scrollable, Desktop: Normal flex */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide sm:overflow-visible pb-1">
        {/* GPA Filter */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              closeAllFilters();
              setShowGPAFilter(!showGPAFilter);
            }}
            className={`flex py-2 sm:py-3 px-3 sm:px-4 justify-center items-center gap-2 border border-black whitespace-nowrap ${
              gpaMin !== 2.5 || gpaMax !== 3.5 ? 'bg-accent' : 'bg-light-secondary dark:bg-dark-secondary'
            } cursor-pointer`}
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <span className="text-black font-outfit text-sm sm:text-base font-medium">
              GPA {gpaMin !== 2.5 || gpaMax !== 3.5 ? `(${gpaMin}-${gpaMax})` : ''}
            </span>
            <ChevronDownIcon />
          </button>
        </div>

        {/* SAT Filter */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              closeAllFilters();
              setShowSATFilter(!showSATFilter);
            }}
            className={`flex py-2 sm:py-3 px-3 sm:px-4 justify-center items-center gap-2 border border-black whitespace-nowrap ${
              satMin !== 1200 || satMax !== 1600 ? 'bg-accent' : 'bg-light-secondary dark:bg-dark-secondary'
            } cursor-pointer`}
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <span className="text-black font-outfit text-sm sm:text-base font-medium">
              SAT {satMin !== 1200 || satMax !== 1600 ? `(${satMin}-${satMax})` : ''}
            </span>
            <ChevronDownIcon />
          </button>
        </div>

        {/* Major Filter */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              closeAllFilters();
              setShowMajorFilter(!showMajorFilter);
            }}
            className={`flex py-2 sm:py-3 px-3 sm:px-4 justify-center items-center gap-2 border border-black whitespace-nowrap ${
              selectedMajors.length > 0 ? 'bg-accent' : 'bg-light-secondary dark:bg-dark-secondary'
            } cursor-pointer`}
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <span className="text-black font-outfit text-sm sm:text-base font-medium">
              Major {selectedMajors.length > 0 ? `(${selectedMajors.length} selected)` : ''}
            </span>
            <ChevronDownIcon />
          </button>
        </div>

        {/* Background Filter */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              closeAllFilters();
              setShowBackgroundFilter(!showBackgroundFilter);
            }}
            className={`flex py-2 sm:py-3 px-3 sm:px-4 justify-center items-center gap-2 border border-black whitespace-nowrap ${
              selectedBackgrounds.length > 0 ? 'bg-accent' : 'bg-light-secondary dark:bg-dark-secondary'
            } cursor-pointer`}
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <span className="text-black font-outfit text-sm sm:text-base font-medium">
              Background {selectedBackgrounds.length > 0 ? `(${selectedBackgrounds[0]})` : ''}
            </span>
            <ChevronDownIcon />
          </button>
        </div>

        {/* Countries Filter */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              closeAllFilters();
              setShowCountriesFilter(!showCountriesFilter);
            }}
            className={`flex py-2 sm:py-3 px-3 sm:px-4 justify-center items-center gap-2 border border-black whitespace-nowrap ${
              selectedCountries.length > 0 ? 'bg-accent' : 'bg-light-secondary dark:bg-dark-secondary'
            } cursor-pointer`}
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <span className="text-black font-outfit text-sm sm:text-base font-medium">
              Countries {selectedCountries.length > 0 ? `(${selectedCountries.length} selected)` : ''}
            </span>
            <ChevronDownIcon />
          </button>
        </div>

        {/* Sort Filter */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              closeAllFilters();
              setShowSortFilter(!showSortFilter);
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