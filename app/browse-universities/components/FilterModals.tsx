import { CloseIcon } from '../assets/CloseIcon';

interface FilterModalsProps {
  showCountriesFilter: boolean;
  showSortFilter: boolean;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  setShowCountriesFilter: (show: boolean) => void;
  setShowSortFilter: (show: boolean) => void;
}

export function FilterModals({
  showCountriesFilter,
  showSortFilter,
  selectedCountry,
  setSelectedCountry,
  setShowCountriesFilter,
  setShowSortFilter
}: FilterModalsProps) {
  return (
    <>
      {/* Countries Filter Modal */}
      {showCountriesFilter && (
        <>
          {/* Mobile: Full screen overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" onClick={() => setShowCountriesFilter(false)}></div>
          
          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm sm:absolute sm:top-full sm:left-4 sm:transform-none sm:translate-x-0 sm:translate-y-0 sm:mt-2 sm:w-80 bg-light-bg dark:bg-dark-secondary border border-black p-4 sm:p-6" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-outfit font-semibold text-base sm:text-lg text-black">Select Countries</h3>
              <button onClick={() => setShowCountriesFilter(false)} className="w-8 h-8 flex items-center justify-center bg-accent border border-black">
                <CloseIcon />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search countries"
              className="w-full p-2 border border-black mb-4 font-outfit text-sm sm:text-base"
            />

            <div className="space-y-2 mb-4">
              {[
                { name: 'United Kingdom', flag: '🇬🇧', value: 'UK', available: true },
                { name: 'United States', flag: '🇺🇸', value: 'US', available: true },
                { name: 'Australia', flag: '🇦🇺', value: 'AU', available: false },
                { name: 'Canada', flag: '🇨🇦', value: 'CA', available: false },
                { name: 'Germany', flag: '🇩🇪', value: 'DE', available: false }
              ].map((country) => (
                <label key={country.name} className={`flex items-center gap-2 ${country.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                  <input
                    type="checkbox"
                    checked={selectedCountry === country.value}
                    onChange={() => country.available && setSelectedCountry(selectedCountry === country.value ? '' : country.value)}
                    disabled={!country.available}
                    className="w-4 h-4 sm:w-5 sm:h-5 accent-[#FF9269]"
                  />
                  <span className="text-lg sm:text-xl">{country.flag}</span>
                  <span className="font-outfit text-xs sm:text-sm text-black">
                    {country.name} {!country.available && '(Coming Soon)'}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCountry('')}
                className="flex-1 py-2 border border-black bg-light-secondary font-outfit font-medium text-sm sm:text-base"
              >
                Reset
              </button>
              <button
                onClick={() => setShowCountriesFilter(false)}
                className="flex-1 py-2 border border-black bg-accent font-outfit font-semibold text-sm sm:text-base"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}

      {/* Sort Filter Modal */}
      {showSortFilter && (
        <>
          {/* Mobile: Full screen overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" onClick={() => setShowSortFilter(false)}></div>
          
          {/* Modal Content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm sm:absolute sm:top-full sm:left-4 sm:transform-none sm:translate-x-0 sm:translate-y-0 sm:mt-2 sm:w-80 bg-light-bg dark:bg-dark-secondary border border-black p-4 sm:p-6" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-outfit font-semibold text-base sm:text-lg text-black">Sort by</h3>
              <button onClick={() => setShowSortFilter(false)} className="w-8 h-8 flex items-center justify-center bg-accent border border-black">
                <CloseIcon />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { value: 'ranking', label: 'University Ranking' },
                { value: 'acceptance_rate', label: 'Acceptance Rate' },
                { value: 'location', label: 'Location' },
                { value: 'alphabetical', label: 'Alphabetical' }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    className="w-4 h-4 sm:w-5 sm:h-5 accent-[#FF9269]"
                  />
                  <span className="font-outfit text-xs sm:text-sm text-black">{option.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowSortFilter(false)}
                className="flex-1 py-2 border border-black bg-light-secondary font-outfit font-medium text-sm sm:text-base"
              >
                Reset
              </button>
              <button
                onClick={() => setShowSortFilter(false)}
                className="flex-1 py-2 border border-black bg-accent font-outfit font-semibold text-sm sm:text-base"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}