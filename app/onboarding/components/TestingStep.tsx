"use client";
import { useState, useEffect } from 'react';

interface TestingStepProps {
  data: Record<string, unknown>;
  updateData: (section: string, data: Record<string, unknown>) => void;
  theme: 'light' | 'dark';
  onNext?: () => void;
  onBack?: () => void;
  registerInternalBack?: (hasBack: boolean, backHandler: (() => void) | null) => void;
}

export default function TestingStep({ data, updateData, onNext, registerInternalBack }: TestingStepProps) {
  const [formData, setFormData] = useState({
    standardizedTests: [] as string[],
    satScore: '',
    actScore: '',
    ...(data.testing || {})
  });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    updateData('testing', formData);
  }, [formData]);

  // Register internal back state with parent
  useEffect(() => {
    if (registerInternalBack) {
      const hasBack = currentQuestion > 1;
      const backHandler = hasBack ? handleBack : null;
      registerInternalBack(hasBack, backHandler);
    }
  }, [currentQuestion, registerInternalBack]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTestChange = (test: string) => {
    setFormData((prev) => {
      const currentTests = ((prev as Record<string, unknown>).standardizedTests as string[]) || [];
      const updatedTests = currentTests.includes(test)
        ? currentTests.filter((t: string) => t !== test)
        : [...currentTests, test];

      return {
        ...prev,
        standardizedTests: updatedTests
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion === 1 && formData.standardizedTests && formData.standardizedTests.length > 0) {
      setCurrentQuestion(2);
    } else if (currentQuestion === 2 && formData.satScore) {
      setCurrentQuestion(3);
    } else if (currentQuestion === 3 && formData.actScore && onNext) {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestion1 = () => (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-outfit text-light-text dark:text-dark-text">
          Have you taken any standardized tests?
        </h1>
        <p className="text-base font-outfit text-light-p dark:text-dark-text">
          Check all that apply
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'SAT', label: 'SAT' },
          { value: 'ACT', label: 'ACT' },
          { value: 'PSAT', label: 'PSAT' },
          { value: 'AP Exams', label: 'AP Exams' },
          { value: 'None yet', label: 'None yet' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="checkbox"
                checked={formData.standardizedTests?.includes(option.value) || false}
                onChange={() => handleTestChange(option.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${formData.standardizedTests?.includes(option.value) ? 'bg-[#FF9269]' : 'bg-transparent'
                }`}>
                {formData.standardizedTests?.includes(option.value) && (
                  <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-base md:text-lg font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {formData.standardizedTests && formData.standardizedTests.length > 0 && (
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
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-outfit text-light-text dark:text-dark-text">
          What&apos;s your highest SAT score (if any)?
        </h1>
        <p className="text-base font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: '1500+', label: '1500+' },
          { value: '1400–1490', label: '1400–1490' },
          { value: '1300–1390', label: '1300–1390' },
          { value: '1200–1290', label: '1200–1290' },
          { value: 'Below 1200', label: 'Below 1200' },
          { value: "Haven't taken yet", label: "Haven't taken yet" }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="satScore"
                value={option.value}
                checked={formData.satScore === option.value}
                onChange={(e) => handleInputChange('satScore', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${formData.satScore === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
                }`}>
                {formData.satScore === option.value && (
                  <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-base md:text-lg font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {formData.satScore && (
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

  const renderQuestion3 = () => (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-outfit text-light-text dark:text-dark-text">
          What&apos;s your highest ACT score (if any)?
        </h1>
        <p className="text-base font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: '33–36', label: '33–36' },
          { value: '30–32', label: '30–32' },
          { value: '27–29', label: '27–29' },
          { value: '24–26', label: '24–26' },
          { value: 'Below 24', label: 'Below 24' },
          { value: "Haven't taken yet", label: "Haven't taken yet" }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="actScore"
                value={option.value}
                checked={formData.actScore === option.value}
                onChange={(e) => handleInputChange('actScore', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${formData.actScore === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
                }`}>
                {formData.actScore === option.value && (
                  <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-base md:text-lg font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {formData.actScore && (
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

  return (
    <div>
      {currentQuestion === 1 && renderQuestion1()}
      {currentQuestion === 2 && renderQuestion2()}
      {currentQuestion === 3 && renderQuestion3()}
    </div>
  );
}