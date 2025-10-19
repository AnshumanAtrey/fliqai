"use client";
import { useState, useEffect } from 'react';

interface BasicInfoStepProps {
  data: Record<string, unknown>;
  updateData: (section: string, data: Record<string, unknown>) => void;
  theme: 'light' | 'dark';
  onNext?: () => void;
  onBack?: () => void;
  registerInternalBack?: (hasBack: boolean, backHandler: (() => void) | null) => void;
}

export default function BasicInfoStep({ data, updateData, onNext, registerInternalBack }: BasicInfoStepProps) {
  const [formData, setFormData] = useState({
    grade: '',
    graduationYear: '',
    ...(data.basicInfo || {})
  });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    updateData('basicInfo', formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Register internal back state with parent
  useEffect(() => {
    if (registerInternalBack) {
      const hasBack = currentQuestion > 1;
      const backHandler = hasBack ? handleBack : null;
      registerInternalBack(hasBack, backHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, registerInternalBack]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion === 1 && formData.grade) {
      setCurrentQuestion(2);
    } else if (currentQuestion === 2 && formData.graduationYear && onNext) {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentQuestion === 2) {
      setCurrentQuestion(1);
    }
  };

  if (currentQuestion === 1) {
    return (
      <div>
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 font-outfit text-light-text dark:text-dark-text">
            What grade are you in right now?
          </h1>
          <p className="text-sm sm:text-base font-outfit text-light-p dark:text-dark-text">
            Select one
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {[
            { value: '9th (Freshman)', label: '9th (Freshman)' },
            { value: '10th (Sophomore)', label: '10th (Sophomore)' },
            { value: '11th (Junior)', label: '11th (Junior)' },
            { value: '12th (Senior)', label: '12th (Senior)' },
            { value: 'Other', label: 'Other' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center w-full p-3 sm:p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
            >
              <div className="flex items-center justify-center mr-3">
                <input
                  type="radio"
                  name="grade"
                  value={option.value}
                  checked={formData.grade === option.value}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${
                  formData.grade === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
                }`}>
                  {formData.grade === option.value && (
                    <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm sm:text-base font-outfit text-light-text dark:text-dark-text flex-1">
                {option.label}
              </span>
            </label>
          ))}
        </div>

        {formData.grade && (
          <button
            onClick={handleNext}
            className="w-full bg-[#FF9269] text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-outfit font-medium hover:bg-[#e5825a] transition-colors border border-light-text dark:border-dark-text"
            style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}
          >
            Continue
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 font-outfit text-light-text dark:text-dark-text">
          When will you graduate high school?
        </h1>
        <p className="text-sm sm:text-base font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {[
          { value: '2025', label: '2025' },
          { value: '2026', label: '2026' },
          { value: '2027', label: '2027' },
          { value: '2028', label: '2028' },
          { value: 'Other', label: 'Other' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-3 sm:p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-3">
              <input
                type="radio"
                name="graduationYear"
                value={option.value}
                checked={formData.graduationYear === option.value}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${
                formData.graduationYear === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.graduationYear === option.value && (
                  <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm sm:text-base font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {formData.graduationYear && (
        <button
          onClick={handleNext}
          className="w-full bg-[#FF9269] text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-outfit font-medium hover:bg-[#e5825a] transition-colors border border-light-text dark:border-dark-text"
          style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}
        >
          Continue
        </button>
      )}
    </div>
  );
}