"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/hooks/useAuth';
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';
import { DotPatternBackground } from '../component/DotPatternBackground';
import Image from 'next/image';

// Step Components
import BasicInfoStep from './components/BasicInfoStep';
import AcademicPerformanceStep from './components/AcademicPerformanceStep';
import TestingStep from './components/TestingStep';
import ActivitiesInterestsStep from './components/ActivitiesInterestsStep';
import PreferencesStep from './components/PreferencesStep';
import DreamSchoolsStep from './components/DreamSchoolsStep';

interface OnboardingFormData {
  basicInfo: Record<string, any>;
  academicPerformance: Record<string, any>;
  testing: Record<string, any>;
  activitiesInterests: Record<string, any>;
  preferences: Record<string, any>;
  dreamSchools: Record<string, any>;
}

const STEPS = [
  { id: 1, name: 'Basic Info', component: BasicInfoStep, icon: '/onboarding/user.svg' },
  { id: 2, name: 'Academic Performance', component: AcademicPerformanceStep, icon: '/onboarding/medal-military.svg' },
  { id: 3, name: 'Testing', component: TestingStep, icon: '/onboarding/file-text.svg' },
  { id: 4, name: 'Activities & Interests', component: ActivitiesInterestsStep, icon: '/onboarding/compass.svg' },
  { id: 5, name: 'Preferences', component: PreferencesStep, icon: '/onboarding/sliders-horizontal.svg' },
  { id: 6, name: 'Dream School', component: DreamSchoolsStep, icon: '/onboarding/graduation-cap.svg' }
];

function OnboardingPage() {
  const router = useRouter();
  const { user, loading, refreshToken } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    basicInfo: {},
    academicPerformance: {},
    testing: {},
    activitiesInterests: {},
    preferences: {},
    dreamSchools: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const updateFormData = useCallback((section: string, data: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      [section as keyof OnboardingFormData]: { ...prev[section as keyof OnboardingFormData], ...data }
    }));
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Get user token for authentication
      const token = await refreshToken();

      // Debug: Log form data to see what we have
      console.log('Form data before transformation:', formData);
      console.log('Original basicInfo:', formData.basicInfo);
      console.log('Original grade:', formData.basicInfo?.grade);

      // Helper function to map frontend GPA values to backend expected values
      const mapGPAValue = (frontendGPA: string): string => {
        switch (frontendGPA) {
          case '4.0+ (unweighted)': return '4.0+ (unweighted)';
          case '3.5–3.9': return '3.5–3.9';
          case '3.0–3.4': return '3.0–3.4';
          case '2.5–2.9': return '2.5–2.9';
          case 'Below 2.5': return 'Below 2.5';
          default: return '3.5–3.9'; // Default fallback
        }
      };

      // Helper function to map frontend test values to backend expected values
      const mapTestValues = (frontendTests: string[]): string[] => {
        if (!frontendTests || frontendTests.length === 0) return ['None'];

        return frontendTests.map(test => {
          switch (test) {
            case 'SAT': return 'SAT';
            case 'ACT': return 'ACT';
            case 'PSAT': return 'PSAT';
            case 'AP': return 'AP';
            case 'AP Exams': return 'AP';
            default: return 'None';
          }
        });
      };

      // Helper function to map frontend activities to backend expected values
      const mapActivities = (frontendActivities: string[]): string[] => {
        if (!frontendActivities || frontendActivities.length === 0) return ['Other'];

        return frontendActivities.map(activity => {
          // Direct mapping based on frontend values to backend expected values
          switch (activity) {
            case 'Academic clubs (Science Olympiad, Debate, Math Team)':
              return 'Academic clubs (Science Olympiad, Debate, Math Team)';
            case 'Sports/Athletics':
              return 'Athletic teams';
            case 'Arts/Music/Theatre':
              return 'Drama/Theater';
            case 'Community Service/Volunteering':
              return 'Community service/volunteering';
            case 'Jobs/Internships':
              return 'Part-time job';
            case 'Research/Independent Projects':
              return 'Independent research projects';
            case 'Other':
              return 'Other';
            default:
              return 'Other';
          }
        });
      };

      // Transform our form data to match the backend schema
      const profileData = {
        basicInfo: {
          grade: formData.basicInfo?.grade === 'Other' ? '12th (Senior)' : (formData.basicInfo?.grade || '12th (Senior)'),
          graduationYear: formData.basicInfo?.graduationYear === 'Other' ? '2026' : (formData.basicInfo?.graduationYear || '2026')
        },
        academics: {
          currentGPA: mapGPAValue(formData.academicPerformance?.gpa || ''),
          courseRigor: 'Mix of Honors/AP/IB', // Default
          advancedCourses: ['AP'] // Default
        },
        testing: {
          standardizedTests: mapTestValues(formData.testing?.standardizedTests || []),
          satScore: (() => {
            const satScore = formData.testing?.satScore;
            if (!satScore) return 'Not taken';
            // Map frontend values to backend expected values
            switch (satScore) {
              case '1500+': return '1500+';
              case '1400–1490': return '1400-1490';
              case '1300–1390': return '1300-1390';
              case '1200–1290': return '1200-1290';
              case 'Below 1200': return 'Below 1200';
              case "Haven't taken yet": return "Haven't taken yet";
              default: return 'Not taken';
            }
          })(),
          actScore: (() => {
            const actScore = formData.testing?.actScore;
            if (!actScore) return 'Not taken';
            // Map frontend values to backend expected values
            switch (actScore) {
              case '33–36': return '33-36';
              case '30–32': return '30-32';
              case '27–29': return '27-29';
              case '24–26': return '24-26';
              case 'Below 24': return 'Below 24';
              case "Haven't taken yet": return "Haven't taken yet";
              default: return 'Not taken';
            }
          })()
        },
        activitiesAndInterests: {
          topExtracurriculars: mapActivities(formData.activitiesInterests?.extracurriculars),
          hoursPerWeek: (() => {
            const hours = formData.activitiesInterests?.hoursPerWeek;
            if (!hours) return '4-6';
            // Map frontend values to backend expected values
            switch (hours) {
              case '0–3 hours':
                return '0-3';
              case '4–6 hours':
                return '4-6';
              case '7–10 hours':
                return '7-10';
              case '11+ hours':
                return '11+';
              default:
                return '4-6';
            }
          })(),
          leadershipPositions: (() => {
            const leadership = formData.activitiesInterests?.leadershipPositions;
            if (!leadership) return 'none';
            // Map frontend values to backend expected values
            switch (leadership) {
              case 'Yes, multiple':
                return 'multiple';
              case 'Yes, one':
                return 'one';
              case 'Not yet':
                return 'none';
              default:
                return 'none';
            }
          })(),
          interestedMajors: formData.activitiesInterests?.interestedMajors?.map((major: string) => {
            // Direct mapping based on frontend values to backend expected values
            switch (major) {
              case 'STEM (Engineering, Computer Science, Math)':
                return 'stem';
              case 'Health/Medicine':
                return 'health';
              case 'Business/Economics':
                return 'business';
              case 'Social Sciences':
                return 'social';
              case 'Arts/Humanities':
                return 'arts';
              case 'Undecided':
                return 'undecided';
              default:
                return 'undecided'; // fallback
            }
          }) || ['undecided']
        },
        preferences: {
          collegeTypes: formData.preferences?.collegeTypes?.map((type: string) => {
            // Direct mapping based on frontend values to backend expected values
            switch (type) {
              case 'Large universities':
                return 'large';
              case 'Small liberal arts colleges':
                return 'small';
              case 'Public/state schools':
                return 'public';
              case 'Private schools':
                return 'private';
              case 'Highly selective (Ivy/Top 20)':
                return 'selective';
              case 'Specialized (art, tech, etc.)':
                return 'specialized';
              default:
                return 'public'; // fallback
            }
          }) || ['public'],
          mostImportant: (() => {
            const importance = formData.preferences?.mostImportant;
            // Direct mapping based on frontend values to backend expected values
            switch (importance) {
              case 'Academic reputation':
                return 'Academic reputation';
              case 'Cost/financial aid':
                return 'Cost and financial aid';
              case 'Location':
                return 'Location and setting';
              case 'Campus life':
                return 'Campus culture and fit';
              case 'Size of school':
                return 'Size of school';
              case 'Major availability':
                return 'Specific programs/majors';
              default:
                return 'Academic reputation';
            }
          })(),
          specialCircumstances: {
            isFirstGeneration: formData.preferences?.specialCircumstances === 'First-generation college student',
            hasLegacy: formData.preferences?.specialCircumstances === 'Legacy at a school',
            isRecruitedAthlete: formData.preferences?.specialCircumstances === 'Recruited athlete',
            hasNationalAwards: formData.preferences?.specialCircumstances === 'National awards',
            otherCircumstances: formData.preferences?.specialCircumstances === 'Other' ? (formData.preferences?.otherCircumstances || 'Other circumstances') : ''
          }
        },
        dreamSchools: {
          hasDreamSchools: formData.dreamSchools?.hasDreamSchools || 'Open to suggestions',
          dreamSchoolsList: Array.isArray(formData.dreamSchools?.dreamSchoolsList)
            ? formData.dreamSchools.dreamSchoolsList.join(', ')
            : formData.dreamSchools?.dreamSchoolsList || '',
          searchStage: formData.dreamSchools?.searchStage || 'Just starting',
          annualBudget: formData.dreamSchools?.annualBudget || '₹10 – ₹20 lakh per year'
        }
      };

      // Debug: Log transformed data
      console.log('Transformed profile data:', profileData);
      console.log('Transformed basicInfo:', profileData.basicInfo);
      console.log('Transformed grade:', profileData.basicInfo.grade);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/profile/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to main application after successful onboarding
        router.push('/discover-students');
      } else {
        setError(result.message || 'Failed to complete profile setup');
        console.error('Profile completion failed:', result);
        console.error('Detailed validation errors:', result.errors);

        // Log each validation error in detail
        if (result.errors && Array.isArray(result.errors)) {
          result.errors.forEach((error: any, index: number) => {
            console.error(`Validation Error ${index + 1}:`, error);
            if (error.path) console.error(`  Field path: ${error.path}`);
            if (error.message) console.error(`  Message: ${error.message}`);
            if (error.value !== undefined) console.error(`  Received value: ${JSON.stringify(error.value)}`);
          });
        }
      }
    } catch (err) {
      console.error('Profile completion error:', err);
      setError('An error occurred while setting up your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF1]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9269]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const CurrentStepComponent = useMemo(() => STEPS[currentStep - 1]?.component, [currentStep]);

  return (
    <DotPatternBackground>
      <div className="min-h-screen flex flex-col">
        {/* Main Content Container - Figma spacing: padding 126px 242px 330px 242px, gap 22px */}
        <div className="flex-1 inline-flex flex-col items-center pt-[126px] px-4 sm:px-8 md:px-16 lg:px-60 xl:px-80 2xl:px-[242px] pb-[330px] gap-[22px]">
          {/* Header with Logo */}
          <Image
            src="/fliq-logo.svg"
            alt="FLIQ Logo"
            width={80}
            height={32}
            priority
          />
          <div className="flex gap-[22px] w-full max-w-none">

            {/* Left Sidebar - Step Navigation */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text p-6" style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}>
                <div className="space-y-[22px]">
                  {STEPS.map((step, index) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;

                    return (
                      <div key={step.id} className="relative flex items-center">
                        {/* Step Circle */}
                        <div className={`w-12 h-12 border-2 border-light-text dark:border-dark-text flex items-center justify-center flex-shrink-0 ${isActive
                          ? 'bg-[#FF9269] text-white'
                          : isCompleted
                            ? 'bg-[#FF9269] text-white'
                            : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text'
                          }`} style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}>
                          <Image
                            src={step.icon}
                            alt={step.name}
                            width={24}
                            height={24}
                            className={isActive || isCompleted ? 'filter brightness-0 invert' : ''}
                          />
                        </div>

                        {/* Step Info */}
                        <div className="ml-4 flex-1">
                          <div className={`text-base font-outfit font-semibold ${isActive ? 'text-light-text dark:text-dark-text' : isCompleted ? 'text-light-text dark:text-dark-text' : 'text-gray-400'
                            }`}>
                            {step.id}. {step.name}
                          </div>
                        </div>

                        {/* Connecting Line */}
                        {index < STEPS.length - 1 && (
                          <div className="absolute left-6 top-[70px] w-0.5 h-[22px] bg-gray-300"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Content Area - Fixed width like Figma */}
            <div className="w-[600px] flex-shrink-0">
              <div className="bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text min-h-[500px] flex flex-col" style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}>

                {/* Back Button */}
                {currentStep > 1 && (
                  <div className="p-6 pb-0">
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-light-text dark:text-dark-text border border-light-text dark:border-dark-text px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-outfit font-medium"
                      style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to previous question
                    </button>
                  </div>
                )}

                {/* Step Content - Proper padding and spacing */}
                <div className="flex-1 p-8">
                  {CurrentStepComponent && (
                    <CurrentStepComponent
                      data={formData}
                      updateData={updateFormData}
                      theme="light"
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}
                </div>

                {/* Footer with Continue Button */}
                <div className="p-6 pt-0 flex items-center justify-between">
                  <div className="text-light-text dark:text-dark-text text-sm font-outfit">
                    Step {currentStep} of {STEPS.length}
                  </div>

                  {/* Final Submit Button - Only show on last step */}
                  {currentStep === STEPS.length && (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-[#FF9269] text-white px-6 py-3 text-base font-outfit font-medium hover:bg-[#e5825a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-light-text dark:border-dark-text"
                      style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Complete Profile'}
                    </button>
                  )}
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mx-6 mb-6 p-4 bg-red-100 border border-red-400 text-red-700 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DotPatternBackground>
  );
}

export default withAuthProtection(OnboardingPage, {
  requireAuth: true,
  requireProfile: false // Onboarding page should be accessible to users without completed profile
});