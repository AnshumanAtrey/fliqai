"use client";
import { useState, useEffect } from 'react';

interface DreamSchoolsStepProps {
  data: Record<string, any>;
  updateData: (section: string, data: Record<string, any>) => void;
  theme: 'light' | 'dark';
  onNext?: () => void;
  onBack?: () => void;
}

export default function DreamSchoolsStep({ data, updateData, onNext }: DreamSchoolsStepProps) {
  const [formData, setFormData] = useState({
    hasDreamSchools: '',
    dreamSchoolsList: '',
    searchStage: '',
    annualBudget: '',
    ...data.dreamSchools
  });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    updateData('dreamSchools', formData);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: Record<string, any>) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion === 1 && formData.hasDreamSchools) {
      setCurrentQuestion(2);
    } else if (currentQuestion === 2 && formData.searchStage) {
      setCurrentQuestion(3);
    } else if (currentQuestion === 3 && formData.annualBudget && onNext) {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestion1 = () => (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-outfit text-light-text dark:text-dark-text">
          Do you already have "dream schools" in mind?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'Yes', label: 'Yes (list them)' },
          { value: 'Not yet', label: 'Not yet' },
          { value: 'Open to suggestions', label: 'Open to suggestions' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="hasDreamSchools"
                value={option.value}
                checked={formData.hasDreamSchools === option.value}
                onChange={(e) => handleInputChange('hasDreamSchools', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 border-light-text dark:border-dark-text ${
                formData.hasDreamSchools === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.hasDreamSchools === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                )}
              </div>
            </div>
            <span className="text-base md:text-lg font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {formData.hasDreamSchools === 'Yes' && (
        <div className="mb-8">
          <label className="block text-base font-outfit font-medium text-light-text dark:text-dark-text mb-2">
            List your dream schools (one per line):
          </label>
          <textarea
            placeholder="Harvard University&#10;Stanford University&#10;MIT"
            className="w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text placeholder-gray-400 font-outfit resize-none"
            rows={5}
            value={formData.dreamSchoolsList || ''}
            onChange={(e) => handleInputChange('dreamSchoolsList', e.target.value)}
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          />
        </div>
      )}

      {formData.hasDreamSchools && (
        <button
          onClick={handleNext}
          className="w-full bg-[#FF9269] text-white px-6 py-4 text-base md:text-lg font-outfit font-medium hover:bg-[#e5825a] transition-colors border border-light-text dark:border-dark-text"
          style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}
        >
          Continue
        </button>
      )}
    </div>
  );

  const renderQuestion2 = () => (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-outfit text-light-text dark:text-dark-text">
          How would you describe your current college search stage?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'Just starting', label: 'Just starting' },
          { value: 'Have a rough list', label: 'Have a rough list' },
          { value: 'Actively preparing applications', label: 'Actively preparing applications' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="searchStage"
                value={option.value}
                checked={formData.searchStage === option.value}
                onChange={(e) => handleInputChange('searchStage', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 border-light-text dark:border-dark-text ${
                formData.searchStage === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.searchStage === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                )}
              </div>
            </div>
            <span className="text-base md:text-lg font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="flex-1 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-6 py-4 text-base md:text-lg font-outfit font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-light-text dark:border-dark-text"
          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
        >
          Back
        </button>
        {formData.searchStage && (
          <button
            onClick={handleNext}
            className="flex-1 bg-[#FF9269] text-white px-6 py-4 text-base md:text-lg font-outfit font-medium hover:bg-[#e5825a] transition-colors border border-light-text dark:border-dark-text"
            style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );

  const renderQuestion3 = () => (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-outfit text-light-text dark:text-dark-text">
          What is your estimated annual budget for college tuition & fees?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: '₹0 – ₹5 lakh per year', label: '₹0 – ₹5 lakh per year' },
          { value: '₹5 – ₹10 lakh per year', label: '₹5 – ₹10 lakh per year' },
          { value: '₹10 – ₹20 lakh per year', label: '₹10 – ₹20 lakh per year' },
          { value: '₹20 – ₹35 lakh per year', label: '₹20 – ₹35 lakh per year' },
          { value: '₹35 lakh+ per year', label: '₹35 lakh+ per year' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="annualBudget"
                value={option.value}
                checked={formData.annualBudget === option.value}
                onChange={(e) => handleInputChange('annualBudget', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 border-light-text dark:border-dark-text ${
                formData.annualBudget === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.annualBudget === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                )}
              </div>
            </div>
            <span className="text-base md:text-lg font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="flex-1 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-6 py-4 text-base md:text-lg font-outfit font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-light-text dark:border-dark-text"
          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
        >
          Back
        </button>
        {formData.annualBudget && (
          <button
            onClick={handleNext}
            className="flex-1 bg-[#FF9269] text-white px-6 py-4 text-base md:text-lg font-outfit font-medium hover:bg-[#e5825a] transition-colors border border-light-text dark:border-dark-text"
            style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-4">
      {currentQuestion === 1 && renderQuestion1()}
      {currentQuestion === 2 && renderQuestion2()}
      {currentQuestion === 3 && renderQuestion3()}
    </div>
  );
}