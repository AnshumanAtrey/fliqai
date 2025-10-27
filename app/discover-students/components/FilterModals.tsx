import React from 'react';

interface FilterModalsProps {
  // GPA Filter
  showGPAFilter: boolean;
  setShowGPAFilter: (show: boolean) => void;
  gpaMin: number;
  gpaMax: number;
  onGPAChange: (min: number, max: number) => void;
  
  // SAT Filter
  showSATFilter: boolean;
  setShowSATFilter: (show: boolean) => void;
  satMin: number;
  satMax: number;
  onSATChange: (min: number, max: number) => void;
  
  // Major Filter
  showMajorFilter: boolean;
  setShowMajorFilter: (show: boolean) => void;
  selectedMajors: string[];
  onMajorToggle: (major: string) => void;
  
  // Background Filter
  showBackgroundFilter: boolean;
  setShowBackgroundFilter: (show: boolean) => void;
  selectedBackgrounds: string[];
  onBackgroundToggle: (background: string) => void;
  
  // Countries Filter
  showCountriesFilter: boolean;
  setShowCountriesFilter: (show: boolean) => void;
  selectedCountries: string[];
  onCountryToggle: (country: string) => void;
  
  // Sort Filter
  showSortFilter: boolean;
  setShowSortFilter: (show: boolean) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  
  // Apply/Reset
  onApply: () => void;
  onReset: () => void;
}

export const FilterModals: React.FC<FilterModalsProps> = ({
  showGPAFilter,
  setShowGPAFilter,
  gpaMin,
  gpaMax,
  onGPAChange,
  showSATFilter,
  setShowSATFilter,
  satMin,
  satMax,
  onSATChange,
  showMajorFilter,
  setShowMajorFilter,
  selectedMajors,
  onMajorToggle,
  showBackgroundFilter,
  setShowBackgroundFilter,
  selectedBackgrounds,
  onBackgroundToggle,
  showCountriesFilter,
  setShowCountriesFilter,
  selectedCountries,
  onCountryToggle,
  showSortFilter,
  setShowSortFilter,
  sortBy,
  onSortChange,
  onApply,
  onReset
}) => {
  const majors = [
    'Computer Science', 'Engineering', 'Business', 'Biology', 'Chemistry',
    'Physics', 'Mathematics', 'Economics', 'Political Science', 'Psychology',
    'Environmental Science', 'Art', 'Music', 'Literature', 'History'
  ];

  const backgrounds = [
    'African American', 'Hispanic', 'Asian American', 'Caucasian',
    'Native American', 'Pacific Islander', 'International'
  ];

  const countries = [
    { name: 'United Kingdom', flag: '🇬🇧', available: true },
    { name: 'United States', flag: '🇺🇸', available: true },
    { name: 'Australia', flag: '🇦🇺', available: false },
    { name: 'India', flag: '🇮🇳', available: false },
    { name: 'Spain', flag: '🇪🇸', available: false },
    { name: 'Canada', flag: '🇨🇦', available: false }
  ];

  return (
    <>
      {/* GPA Filter Modal */}
      {showGPAFilter && (
        <div className="absolute top-full left-0 mt-2 bg-light-bg dark:bg-dark-secondary border border-black p-6 z-50 w-80" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-outfit font-semibold text-lg text-black">GPA Range</h3>
            <button onClick={() => setShowGPAFilter(false)} className="w-8 h-8 flex items-center justify-center bg-accent border border-black">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-outfit text-sm text-black">{gpaMin}GPA</span>
              <span className="font-outfit text-sm text-black">{gpaMax}GPA</span>
            </div>
            <input
              type="range"
              min="2.5"
              max="4.0"
              step="0.1"
              value={gpaMin}
              onChange={(e) => onGPAChange(parseFloat(e.target.value), gpaMax)}
              className="w-full accent-[#FF9269]"
            />
            <input
              type="range"
              min="2.5"
              max="4.0"
              step="0.1"
              value={gpaMax}
              onChange={(e) => onGPAChange(gpaMin, parseFloat(e.target.value))}
              className="w-full accent-[#FF9269] mt-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="flex-1 py-2 border border-black bg-light-secondary font-outfit font-medium"
            >
              Reset
            </button>
            <button
              onClick={() => { onApply(); setShowGPAFilter(false); }}
              className="flex-1 py-2 border border-black bg-accent font-outfit font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* SAT Filter Modal */}
      {showSATFilter && (
        <div className="absolute top-full left-0 mt-2 bg-light-bg dark:bg-dark-secondary border border-black p-6 z-50 w-80" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-outfit font-semibold text-lg text-black">SAT Range</h3>
            <button onClick={() => setShowSATFilter(false)} className="w-8 h-8 flex items-center justify-center bg-accent border border-black">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-outfit text-sm text-black">{satMin}</span>
              <span className="font-outfit text-sm text-black">{satMax}</span>
            </div>
            <input
              type="range"
              min="400"
              max="1600"
              step="10"
              value={satMin}
              onChange={(e) => onSATChange(parseInt(e.target.value), satMax)}
              className="w-full accent-[#FF9269]"
            />
            <input
              type="range"
              min="400"
              max="1600"
              step="10"
              value={satMax}
              onChange={(e) => onSATChange(satMin, parseInt(e.target.value))}
              className="w-full accent-[#FF9269] mt-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="flex-1 py-2 border border-black bg-light-secondary font-outfit font-medium"
            >
              Reset
            </button>
            <button
              onClick={() => { onApply(); setShowSATFilter(false); }}
              className="flex-1 py-2 border border-black bg-accent font-outfit font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Major Filter Modal */}
      {showMajorFilter && (
        <div className="absolute top-full left-0 mt-2 bg-light-bg dark:bg-dark-secondary border border-black p-6 z-50 w-96 max-h-96 overflow-y-auto" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-outfit font-semibold text-lg text-black">Select Majors</h3>
            <button onClick={() => setShowMajorFilter(false)} className="w-8 h-8 flex items-center justify-center bg-accent border border-black">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {majors.map((major) => (
              <label key={major} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMajors.includes(major)}
                  onChange={() => onMajorToggle(major)}
                  className="w-5 h-5 accent-[#FF9269]"
                />
                <span className="font-outfit text-sm text-black">{major}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="flex-1 py-2 border border-black bg-light-secondary font-outfit font-medium"
            >
              Reset
            </button>
            <button
              onClick={() => { onApply(); setShowMajorFilter(false); }}
              className="flex-1 py-2 border border-black bg-accent font-outfit font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Background Filter Modal */}
      {showBackgroundFilter && (
        <div className="absolute top-full left-0 mt-2 bg-light-bg dark:bg-dark-secondary border border-black p-6 z-50 w-80" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-outfit font-semibold text-lg text-black">Select Background</h3>
            <button onClick={() => setShowBackgroundFilter(false)} className="w-8 h-8 flex items-center justify-center bg-accent border border-black">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {backgrounds.map((background) => (
              <label key={background} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="background"
                  checked={selectedBackgrounds.includes(background)}
                  onChange={() => onBackgroundToggle(background)}
                  className="w-5 h-5 accent-[#FF9269]"
                />
                <span className="font-outfit text-sm text-black">{background}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="flex-1 py-2 border border-black bg-light-secondary font-outfit font-medium"
            >
              Reset
            </button>
            <button
              onClick={() => { onApply(); setShowBackgroundFilter(false); }}
              className="flex-1 py-2 border border-black bg-accent font-outfit font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Countries Filter Modal */}
      {showCountriesFilter && (
        <div className="absolute top-full left-0 mt-2 bg-light-bg dark:bg-dark-secondary border border-black p-6 z-50 w-80" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-outfit font-semibold text-lg text-black">Select Countries</h3>
            <button onClick={() => setShowCountriesFilter(false)} className="w-8 h-8 flex items-center justify-center bg-accent border border-black">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <input
            type="text"
            placeholder="Search countries"
            className="w-full p-2 border border-black mb-4 font-outfit"
          />

          <div className="space-y-2 mb-4">
            {countries.map((country) => (
              <label key={country.name} className={`flex items-center gap-2 ${country.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                <input
                  type="checkbox"
                  checked={selectedCountries.includes(country.name)}
                  onChange={() => country.available && onCountryToggle(country.name)}
                  disabled={!country.available}
                  className="w-5 h-5 accent-[#FF9269]"
                />
                <span className="text-xl">{country.flag}</span>
                <span className="font-outfit text-sm text-black">
                  {country.name} {!country.available && '(Coming Soon)'}
                </span>
              </label>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="flex-1 py-2 border border-black bg-light-secondary font-outfit font-medium"
            >
              Reset
            </button>
            <button
              onClick={() => { onApply(); setShowCountriesFilter(false); }}
              className="flex-1 py-2 border border-black bg-accent font-outfit font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Sort Filter Modal */}
      {showSortFilter && (
        <div className="absolute top-full left-0 mt-2 bg-light-bg dark:bg-dark-secondary border border-black p-6 z-50 w-80" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-outfit font-semibold text-lg text-black">Sort by</h3>
            <button onClick={() => setShowSortFilter(false)} className="w-8 h-8 flex items-center justify-center bg-accent border border-black">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="space-y-2 mb-4">
            {[
              { value: 'most_essays', label: 'Most essays' },
              { value: 'highest_sat', label: 'Highest SAT' },
              { value: 'highest_gpa', label: 'Highest GPA' },
              { value: 'most_universities', label: 'Number of universities admitted to' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === option.value}
                  onChange={() => onSortChange(option.value)}
                  className="w-5 h-5 accent-[#FF9269]"
                />
                <span className="font-outfit text-sm text-black">{option.label}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onReset}
              className="flex-1 py-2 border border-black bg-light-secondary font-outfit font-medium"
            >
              Reset
            </button>
            <button
              onClick={() => { onApply(); setShowSortFilter(false); }}
              className="flex-1 py-2 border border-black bg-accent font-outfit font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </>
  );
};