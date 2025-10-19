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
  preferences?: Record<string, unknown>;
}

interface CreditsTabProps {
  userProfile: UserProfile;
}

export function CreditsTab({ userProfile }: CreditsTabProps) {
  return (
    <div className="text-center py-6 sm:py-8 px-4 sm:px-0">
      <div className="max-w-md mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text mb-6 sm:mb-8">You have:</h3>

        <div className="bg-light-secondary dark:bg-dark-tertiary border border-black p-6 sm:p-8 mb-6 sm:mb-8" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-6 sm:h-6">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor" />
            </svg>
            <span className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text">{userProfile.credits}</span>
          </div>
          <div className="text-light-text dark:text-dark-text font-medium text-sm sm:text-base">CREDITS</div>
        </div>

        <div className="text-left mb-6 sm:mb-8">
          <div className="text-light-text dark:text-dark-text font-medium mb-4 text-sm sm:text-base">This gives you access to:</div>
          <div className="space-y-2 text-light-p dark:text-dark-text text-sm sm:text-base">
            <div>Unlock 5 profiles or</div>
            <div>Unlock 3 revisions</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="flex-1 py-3 bg-light-secondary dark:bg-dark-tertiary border border-black text-light-text dark:text-dark-text hover:bg-[#FF9169] transition-colors text-sm sm:text-base font-medium" style={{ boxShadow: '2px 2px 0 0 #000' }}>
            Use credits
          </button>
          <button className="flex-1 py-3 bg-[#FF9169] border border-black text-light-text dark:text-dark-text hover:bg-[#ff7b4d] transition-colors text-sm sm:text-base font-medium" style={{ boxShadow: '2px 2px 0 0 #000' }}>
            Buy more credits
          </button>
        </div>
      </div>
    </div>
  );
}