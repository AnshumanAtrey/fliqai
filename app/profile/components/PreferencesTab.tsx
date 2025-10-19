'use client';

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
    basicInfo?: {
      currentGrade?: string;
      graduationYear?: string;
    };
    academics?: {
      gpa?: string;
    };
    [key: string]: unknown;
  };
}

interface PreferencesTabProps {
  userProfile: UserProfile;
  onOpenPreferencesModal: () => void;
}

export function PreferencesTab({ userProfile, onOpenPreferencesModal }: PreferencesTabProps) {
  // Helper function to safely access nested properties
  const getNestedValue = (obj: unknown, path: string): string => {
    const value = path.split('.').reduce((current: unknown, key: string) => {
      return current && typeof current === 'object' && key in current
        ? (current as Record<string, unknown>)[key]
        : undefined;
    }, obj);
    return typeof value === 'string' ? value : '';
  };

  return (
    <div className="text-center py-6 sm:py-8 px-4 sm:px-0">
      <div className="max-w-md mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text mb-4">Onboarding Preferences</h3>
        <p className="text-sm sm:text-base text-light-p dark:text-dark-text mb-6 sm:mb-8">
          Update your academic preferences, interests, and goals that help us provide better recommendations.
        </p>

        {userProfile?.preferences && (
          <div className="text-left mb-6 bg-light-secondary dark:bg-dark-tertiary p-4 border border-black" style={{ boxShadow: '2px 2px 0 0 #000' }}>
            <h4 className="font-bold mb-2 text-sm sm:text-base">Current Status:</h4>
            <p className="text-xs sm:text-sm">Grade: {getNestedValue(userProfile, 'preferences.basicInfo.currentGrade') || 'Not set'}</p>
            <p className="text-xs sm:text-sm">GPA: {getNestedValue(userProfile, 'preferences.academics.gpa') || 'Not set'}</p>
            <p className="text-xs sm:text-sm">Graduation Year: {getNestedValue(userProfile, 'preferences.basicInfo.graduationYear') || 'Not set'}</p>
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={onOpenPreferencesModal}
            className="px-4 sm:px-6 py-3 bg-[#FF9169] border border-black text-light-text dark:text-dark-text font-medium hover:bg-[#ff7b4d] transition-colors text-sm sm:text-base w-full sm:w-auto"
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            Edit Preferences
          </button>
        </div>
      </div>
    </div>
  );
}