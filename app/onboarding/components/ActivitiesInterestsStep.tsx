"use client";
import { useState, useEffect } from 'react';

interface ActivitiesInterestsStepProps {
  data: Record<string, any>;
  updateData: (section: string, data: Record<string, any>) => void;
  theme: 'light' | 'dark';
  onNext?: () => void;
  onBack?: () => void;
}

export default function ActivitiesInterestsStep({ data, updateData, onNext }: ActivitiesInterestsStepProps) {
  const [formData, setFormData] = useState({
    extracurriculars: [],
    hoursPerWeek: '',
    leadershipPositions: '',
    interestedMajors: [],
    ...data.activitiesInterests
  });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    updateData('activitiesInterests', formData);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: Record<string, any>) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (field: string, value: string) => {
    setFormData((prev: Record<string, any>) => {
      const currentValues = prev[field] || [];
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
    if (currentQuestion === 1 && formData.extracurriculars && formData.extracurriculars.length > 0) {
      setCurrentQuestion(2);
    } else if (currentQuestion === 2 && formData.hoursPerWeek) {
      setCurrentQuestion(3);
    } else if (currentQuestion === 3 && formData.leadershipPositions) {
      setCurrentQuestion(4);
    } else if (currentQuestion === 4 && formData.interestedMajors && formData.interestedMajors.length > 0 && onNext) {
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
          Which best describes your top extracurriculars?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Check all that apply
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'Academic clubs (Science Olympiad, Debate, Math Team)', label: 'Academic clubs (Science Olympiad, Debate, Math Team)' },
          { value: 'Sports/Athletics', label: 'Sports/Athletics' },
          { value: 'Arts/Music/Theatre', label: 'Arts/Music/Theatre' },
          { value: 'Community Service/Volunteering', label: 'Community Service/Volunteering' },
          { value: 'Jobs/Internships', label: 'Jobs/Internships' },
          { value: 'Research/Independent Projects', label: 'Research/Independent Projects' },
          { value: 'Other', label: 'Other' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="checkbox"
                checked={formData.extracurriculars?.includes(option.value) || false}
                onChange={() => handleMultiSelectChange('extracurriculars', option.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${
                formData.extracurriculars?.includes(option.value) ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.extracurriculars?.includes(option.value) && (
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

      {formData.extracurriculars && formData.extracurriculars.length > 0 && (
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
          How many hours per week do you spend on your main extracurricular(s)?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: '0–3 hours', label: '0–3 hours' },
          { value: '4–6 hours', label: '4–6 hours' },
          { value: '7–10 hours', label: '7–10 hours' },
          { value: '11+ hours', label: '11+ hours' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="hoursPerWeek"
                value={option.value}
                checked={formData.hoursPerWeek === option.value}
                onChange={(e) => handleInputChange('hoursPerWeek', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 border-light-text dark:border-dark-text ${
                formData.hoursPerWeek === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.hoursPerWeek === option.value && (
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
        {formData.hoursPerWeek && (
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
          Do you hold leadership positions?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'Yes, multiple', label: 'Yes, multiple' },
          { value: 'Yes, one', label: 'Yes, one' },
          { value: 'Not yet', label: 'Not yet' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="radio"
                name="leadershipPositions"
                value={option.value}
                checked={formData.leadershipPositions === option.value}
                onChange={(e) => handleInputChange('leadershipPositions', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 border-light-text dark:border-dark-text ${
                formData.leadershipPositions === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.leadershipPositions === option.value && (
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
        {formData.leadershipPositions && (
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

  const renderQuestion4 = () => (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-outfit text-light-text dark:text-dark-text">
          What areas/majors are you most interested in?
        </h1>
        <p className="text-base md:text-lg font-outfit text-light-p dark:text-dark-text">
          Check all that apply
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'STEM (Engineering, Computer Science, Math)', label: 'STEM (Engineering, Computer Science, Math)' },
          { value: 'Health/Medicine', label: 'Health/Medicine' },
          { value: 'Business/Economics', label: 'Business/Economics' },
          { value: 'Social Sciences', label: 'Social Sciences' },
          { value: 'Arts/Humanities', label: 'Arts/Humanities' },
          { value: 'Undecided', label: 'Undecided' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-4">
              <input
                type="checkbox"
                checked={formData.interestedMajors?.includes(option.value) || false}
                onChange={() => handleMultiSelectChange('interestedMajors', option.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${
                formData.interestedMajors?.includes(option.value) ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.interestedMajors?.includes(option.value) && (
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

      <div className="flex gap-4">
        <button
          onClick={handleBack}
          className="flex-1 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text px-6 py-4 text-base md:text-lg font-outfit font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-light-text dark:border-dark-text"
          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
        >
          Back
        </button>
        {formData.interestedMajors && formData.interestedMajors.length > 0 && (
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
      {currentQuestion === 4 && renderQuestion4()}
    </div>
  );
}