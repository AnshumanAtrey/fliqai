"use client";
import { useState, useEffect } from 'react';

interface AcademicPerformanceStepProps {
  data: Record<string, unknown>;
  updateData: (section: string, data: Record<string, unknown>) => void;
  theme: 'light' | 'dark';
  onNext?: () => void;
  onBack?: () => void;
  registerInternalBack?: (hasBack: boolean, backHandler: (() => void) | null) => void;
}

export default function AcademicPerformanceStep({ data, updateData, onNext, registerInternalBack }: AcademicPerformanceStepProps) {
  const [formData, setFormData] = useState({
    gpa: '',
    courseRigor: '',
    advancedCourses: [] as string[],
    ...(data.academicPerformance || {})
  });
  const [currentQuestion, setCurrentQuestion] = useState(1);

  useEffect(() => {
    updateData('academicPerformance', formData);
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

  const handleAdvancedCoursesChange = (course: string) => {
    setFormData((prev) => {
      const currentCourses = (prev.advancedCourses as string[]) || [];
      const updatedCourses = currentCourses.includes(course)
        ? currentCourses.filter((c: string) => c !== course)
        : [...currentCourses, course];
      
      return {
        ...prev,
        advancedCourses: updatedCourses
      };
    });
  };

  const handleNext = () => {
    if (currentQuestion === 1 && formData.gpa) {
      setCurrentQuestion(2);
    } else if (currentQuestion === 2 && formData.courseRigor) {
      setCurrentQuestion(3);
    } else if (currentQuestion === 3 && formData.advancedCourses && formData.advancedCourses.length > 0 && onNext) {
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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 font-outfit text-light-text dark:text-dark-text">
          What&apos;s your current GPA?
        </h1>
        <p className="text-sm sm:text-base font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {[
          { value: '4.0+ (unweighted)', label: '4.0+ (unweighted)' },
          { value: '3.5–3.9', label: '3.5–3.9' },
          { value: '3.0–3.4', label: '3.0–3.4' },
          { value: '2.5–2.9', label: '2.5–2.9' },
          { value: 'Below 2.5', label: 'Below 2.5' }
        ].map((option) => (
          <label
            key={option.value}
            className="flex items-center w-full p-3 sm:p-4 border border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-bg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <div className="flex items-center justify-center mr-3 sm:mr-4">
              <input
                type="radio"
                name="gpa"
                value={option.value}
                checked={formData.gpa === option.value}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${
                formData.gpa === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.gpa === option.value && (
                  <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm sm:text-base lg:text-lg font-outfit text-light-text dark:text-dark-text flex-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>

      {formData.gpa && (
        <button
          onClick={handleNext}
          className="w-full bg-[#FF9269] text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-outfit font-medium hover:bg-[#e5825a] transition-colors border border-light-text dark:border-dark-text"
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
          How rigorous are your courses?
        </h1>
        <p className="text-base font-outfit text-light-p dark:text-dark-text">
          Select one
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'Mostly standard/regular courses', label: 'Mostly standard / college prep' },
          { value: 'Mix of Honors/AP/IB', label: 'Mix of Honors/AP/IB' },
          { value: 'Primarily advanced courses', label: 'Mostly AP/IB/Dual Enrollment' },
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
                name="courseRigor"
                value={option.value}
                checked={formData.courseRigor === option.value}
                onChange={(e) => handleInputChange('courseRigor', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${
                formData.courseRigor === option.value ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.courseRigor === option.value && (
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

      {formData.courseRigor && (
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
          Which advanced courses have you taken or are taking?
        </h1>
        <p className="text-base font-outfit text-light-p dark:text-dark-text">
          Check all that apply
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { value: 'AP', label: 'AP' },
          { value: 'IB', label: 'IB' },
          { value: 'Honors', label: 'Honors' },
          { value: 'Dual Enrollment / College Classes', label: 'Dual Enrollment / College Classes' },
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
                checked={formData.advancedCourses?.includes(option.value) || false}
                onChange={() => handleAdvancedCoursesChange(option.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 border-2 border-light-text dark:border-dark-text ${
                formData.advancedCourses?.includes(option.value) ? 'bg-[#FF9269]' : 'bg-transparent'
              }`}>
                {formData.advancedCourses?.includes(option.value) && (
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

      {formData.advancedCourses && formData.advancedCourses.length > 0 && (
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