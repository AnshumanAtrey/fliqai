"use client";
import { useState, useEffect } from 'react';

interface PreferencesStepProps {
  data: Record<string, unknown>;
  updateData: (section: string, data: Record<string, unknown>) => void;
  theme: 'light' | 'dark';
  onNext?: () => void;
  onBack?: () => void;
  registerInternalBack?: (hasBack: boolean, backHandler: (() => void) | null) => void;
}

export default function PreferencesStep({ data, updateData, onNext, registerInternalBack }: PreferencesStepProps) {
  const [formData, setFormData] = useState({
    collegeTypes: [] as string[],
    mostImportant: '',
    specialCircumstances: '',
    otherCircumstances: '',
    ...(data.preferences || {})
  });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    updateData('preferences', formData);
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

  const handleMultiSelectChange = (field: string, value: string) => {
    setFormData((prev) => {
      const currentValues = ((prev as Record<string, unknown>)[field] as string[]) || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [field]: updatedValues
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion === 1 && formData.collegeTypes && formData.collegeTypes.length > 0) {
      setCurrentQuestion(2);
    } else if (currentQuestion === 2 && formData.mostImportant) {
      setCurrentQuestion(3);
    } else if (currentQuestion === 3 && formData.specialCircumstances && onNext) {
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
          What types of colleges interest you most?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Check all that apply
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'Large universities', label: 'Large universities' },
          { value: 'Small liberal arts colleges', label: 'Small liberal arts colleges' },
          { value: 'Public/state schools', label: 'Public/state schools' },
          { value: 'Private schools', label: 'Private schools' },
          { value: 'Highly selective (Ivy/Top 20)', label: 'Highly selective (Ivy/Top 20)' },
          { value: 'Specialized (art, tech, etc.)', label: 'Specialized (art, tech, etc.)' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="checkbox"
                checked={formData.collegeTypes?.includes(option.value) || false}
                onChange={() => handleMultiSelectChange('collegeTypes', option.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${formData.collegeTypes?.includes(option.value) ? 'bg-[#FF9269]' : 'bg-transparent'
                }`}>
                {formData.collegeTypes?.includes(option.value) && (
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

      {formData.collegeTypes && formData.collegeTypes.length > 0 && (
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
          Which is most important to you?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'Academic reputation', label: 'Academic reputation' },
          { value: 'Cost/financial aid', label: 'Cost/financial aid' },
          { value: 'Location', label: 'Location' },
          { value: 'Campus life', label: 'Campus life' },
          { value: 'Size of school', label: 'Size of school' },
          { value: 'Major availability', label: 'Major availability' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="mostImportant"
                value={option.value}
                checked={formData.mostImportant === option.value}
                onChange={(e) => handleInputChange('mostImportant', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${formData.mostImportant === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
                }`}>
                {formData.mostImportant === option.value && (
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

      {formData.mostImportant && (
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
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-outfit text-light-text dark:text-dark-text">
          Do you have any special circumstances or priorities we should know?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'First-generation college student', label: 'First-generation college student' },
          { value: 'Legacy at a school', label: 'Legacy at a school' },
          { value: 'Recruited athlete', label: 'Recruited athlete' },
          { value: 'National awards', label: 'National awards' },
          { value: 'Other', label: 'Other' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="specialCircumstances"
                value={option.value}
                checked={formData.specialCircumstances === option.value}
                onChange={(e) => handleInputChange('specialCircumstances', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 border-light-text dark:border-dark-text ${formData.specialCircumstances === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
                }`}>
                {formData.specialCircumstances === option.value && (
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

      {formData.specialCircumstances === 'Other' && (
        <div className="mb-8">
          <textarea
            placeholder="Please describe your special circumstances..."
            className="w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text placeholder-gray-400 font-outfit resize-none"
            rows={3}
            value={formData.otherCircumstances || ''}
            onChange={(e) => handleInputChange('otherCircumstances', e.target.value)}
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          />
        </div>
      )}

      {formData.specialCircumstances && (
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
    <div className="flex flex-col items-center justify-center min-h-[500px] px-4">
      {currentQuestion === 1 && renderQuestion1()}
      {currentQuestion === 2 && renderQuestion2()}
      {currentQuestion === 3 && renderQuestion3()}
    </div>
  );
}