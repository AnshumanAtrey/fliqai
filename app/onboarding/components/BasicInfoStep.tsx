"use client";
import { useState, useEffect } from 'react';

interface BasicInfoStepProps {
  data: Record<string, any>;
  updateData: (section: string, data: Record<string, any>) => void;
  theme: 'light' | 'dark';
  onNext?: () => void;
  onBack?: () => void;
}

export default function BasicInfoStep({ data, updateData, onNext }: BasicInfoStepProps) {
  const [formData, setFormData] = useState({
    grade: '',
    graduationYear: '',
    ...data.basicInfo
  });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    updateData('basicInfo', formData);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: Record<string, any>) => ({
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 font-outfit text-light-text dark:text-dark-text">
            What grade are you in right now?
          </h1>
          <p className="text-base font-outfit text-light-p dark:text-dark-text">
            Select one
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { value: '9th (Freshman)', label: '9th (Freshman)' },
            { value: '10th (Sophomore)', label: '10th (Sophomore)' },
            { value: '11th (Junior)', label: '11th (Junior)' },
            { value: '12th (Senior)', label: '12th (Senior)' },
            { value: 'Other', label: 'Other' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
                <div className={`w-5 h-5 rounded-full border-2 border-light-text dark:border-dark-text ${
                  formData.grade === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
                }`}>
                  {formData.grade === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                  )}
                </div>
              </div>
              <span className="text-base font-outfit text-light-text dark:text-dark-text flex-1">
                {option.label}
              </span>
            </label>
          ))}
        </div>

        {formData.grade && (
          <button
            onClick={handleNext}
            className="w-full bg-[#FF9269] text-white px-6 py-4 text-base font-outfit font-medium hover:bg-[#e5825a] transition-colors border border-light-text dark:border-dark-text"
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-outfit text-light-text dark:text-dark-text">
          When will you graduate high school?
        </h1>
        <p className="text-base font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: '2025', label: '2025' },
          { value: '2026', label: '2026' },
          { value: '2027', label: '2027' },
          { value: '2028', label: '2028' },
          { value: 'Other', label: 'Other' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
              <div className={`w-5 h-5 rounded-full border-2 border-light-text dark:border-dark-text ${
                formData.graduationYear === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.graduationYear === option.value && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                )}
              </div>
            </div>
            <span className="text-base font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="flex-1 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-6 py-4 text-base font-outfit font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-light-text dark:border-dark-text"
          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
        >
          Back
        </button>
        {formData.graduationYear && (
          <button
            onClick={handleNext}
            className="flex-1 bg-[#FF9269] text-white px-6 py-4 text-base font-outfit font-medium hover:bg-[#e5825a] transition-colors border border-light-text dark:border-dark-text"
            style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}