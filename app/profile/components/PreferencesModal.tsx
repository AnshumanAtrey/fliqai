'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
  stats: {
    universitiesBrowsed: number;
    studentProfilesViewed: number;
    essaysViewed: number;
  };
  credits: number;
  subscriptionStatus?: string;
  subscriptionActive?: boolean;
  preferences?: {
    academics?: {
      gpa?: string;
      apCourses?: string[];
      favoriteSubjects?: string[];
    };
    basicInfo?: {
      currentGrade?: string;
    };
    testing?: {
      satScore?: string;
      actScore?: string;
      apScores?: Array<{ subject: string; score: string }>;
    };
    activitiesAndInterests?: {
      extracurriculars?: string[];
      careerInterests?: string[];
      hobbies?: string[];
    };
    preferences?: {
      collegePreferences?: {
        location?: string;
        size?: string;
        type?: string;
      };
    };
    dreamSchools?: {
      targetUniversities?: string[];
      majorInterests?: string[];
    };
  };
}

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
}

export function PreferencesModal({ isOpen, onClose, userProfile }: PreferencesModalProps) {
  const router = useRouter();
  const [preferencesSection, setPreferencesSection] = useState<string>('academics');

  if (!isOpen) return null;

  // Helper function to safely access nested properties
  const getNestedValue = (obj: unknown, path: string): unknown => {
    return path.split('.').reduce((current: unknown, key: string) => {
      return current && typeof current === 'object' && key in current 
        ? (current as Record<string, unknown>)[key] 
        : undefined;
    }, obj);
  };

  // Helper function to safely get array values
  const getArrayValue = (value: unknown): string[] => {
    return Array.isArray(value) ? value : [];
  };

  // Helper function to safely get string values
  const getStringValue = (value: unknown): string => {
    return typeof value === 'string' ? value : '';
  };

  const handleRetakeOnboarding = () => {
    onClose();
    router.push('/onboarding');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-light-bg dark:bg-dark-secondary border border-black p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" style={{ boxShadow: '4px 4px 0 0 #000' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
            Edit Onboarding Preferences
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#FF9169] border border-black flex items-center justify-center hover:bg-[#ff7b4d] transition-colors"
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Section Selector */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {['academics', 'testing', 'activitiesInterests', 'preferences', 'dreamSchools'].map((section) => (
              <button
                key={section}
                onClick={() => setPreferencesSection(section)}
                className={`px-4 py-2 border border-black text-sm font-medium transition-colors ${preferencesSection === section
                    ? 'bg-[#FF9169] text-light-text dark:text-dark-text'
                    : 'bg-light-secondary dark:bg-dark-tertiary text-light-text dark:text-dark-text hover:bg-[#ffa982]'
                  }`}
                style={{ boxShadow: '2px 2px 0 0 #000' }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-6 max-h-80 overflow-y-auto">
          {preferencesSection === 'academics' && (
            <div className="text-left space-y-4">
              <h4 className="font-bold mb-3">Academic Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">GPA</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getStringValue(getNestedValue(userProfile, 'preferences.academics.gpa')) || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Current Grade</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getStringValue(getNestedValue(userProfile, 'preferences.basicInfo.currentGrade')) || 'Not set'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">AP Courses</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getArrayValue(getNestedValue(userProfile, 'preferences.academics.apCourses')).join(', ') || 'None selected'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Favorite Subjects</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getArrayValue(getNestedValue(userProfile, 'preferences.academics.favoriteSubjects')).join(', ') || 'None selected'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {preferencesSection === 'testing' && (
            <div className="text-left space-y-4">
              <h4 className="font-bold mb-3">Test Scores</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">SAT Score</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getStringValue(getNestedValue(userProfile, 'preferences.testing.satScore')) || 'Not taken'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ACT Score</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getStringValue(getNestedValue(userProfile, 'preferences.testing.actScore')) || 'Not taken'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">AP Exam Scores</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {(() => {
                      const apScores = getNestedValue(userProfile, 'preferences.testing.apScores');
                      if (Array.isArray(apScores) && apScores.length > 0) {
                        return apScores.map((score: unknown) => {
                          if (score && typeof score === 'object' && 'subject' in score && 'score' in score) {
                            const scoreObj = score as { subject: string; score: string };
                            return `${scoreObj.subject}: ${scoreObj.score}`;
                          }
                          return '';
                        }).filter(Boolean).join(', ');
                      }
                      return 'None reported';
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {preferencesSection === 'activitiesInterests' && (
            <div className="text-left space-y-4">
              <h4 className="font-bold mb-3">Activities & Interests</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Extracurricular Activities</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getArrayValue(getNestedValue(userProfile, 'preferences.activitiesAndInterests.extracurriculars')).join(', ') || 'None selected'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Career Interests</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getArrayValue(getNestedValue(userProfile, 'preferences.activitiesAndInterests.careerInterests')).join(', ') || 'None selected'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hobbies</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getArrayValue(getNestedValue(userProfile, 'preferences.activitiesAndInterests.hobbies')).join(', ') || 'None selected'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {preferencesSection === 'preferences' && (
            <div className="text-left space-y-4">
              <h4 className="font-bold mb-3">College Preferences</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Location</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getStringValue(getNestedValue(userProfile, 'preferences.preferences.collegePreferences.location')) || 'No preference'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">College Size</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getStringValue(getNestedValue(userProfile, 'preferences.preferences.collegePreferences.size')) || 'No preference'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">College Type</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getStringValue(getNestedValue(userProfile, 'preferences.preferences.collegePreferences.type')) || 'No preference'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {preferencesSection === 'dreamSchools' && (
            <div className="text-left space-y-4">
              <h4 className="font-bold mb-3">Dream Schools</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Target Universities</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {(() => {
                      const targetUniversities = getArrayValue(getNestedValue(userProfile, 'preferences.dreamSchools.targetUniversities'));
                      return targetUniversities.length > 0 ? targetUniversities.join(', ') : 'No dream schools selected';
                    })()}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Major Interests</label>
                  <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                    {getArrayValue(getNestedValue(userProfile, 'preferences.dreamSchools.majorInterests')).join(', ') || 'No majors selected'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!['academics', 'testing', 'activitiesInterests', 'preferences', 'dreamSchools'].includes(preferencesSection) && (
            <div className="text-center py-8">
              <p className="text-light-p dark:text-dark-text text-sm">
                Select a section above to view your preferences data.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-300 pt-4 mt-6">
          <p className="text-light-p dark:text-dark-text text-sm mb-4 text-center">
            To update your preferences, re-take the onboarding questionnaire.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleRetakeOnboarding}
              className="px-6 py-3 bg-[#FF9169] border border-black text-light-text dark:text-dark-text font-medium hover:bg-[#ff7b4d] transition-colors"
              style={{ boxShadow: '2px 2px 0 0 #000' }}
            >
              Re-take Onboarding
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-light-secondary dark:bg-dark-tertiary border border-black text-light-text dark:text-dark-text font-medium hover:bg-gray-200 transition-colors"
              style={{ boxShadow: '2px 2px 0 0 #000' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}