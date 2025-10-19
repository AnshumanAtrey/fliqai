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

interface GeneralTabProps {
  userProfile: UserProfile;
  onEditClick: (field: string, currentValue: string) => void;
  onSignOut: () => void;
}

export function GeneralTab({ userProfile, onEditClick, onSignOut }: GeneralTabProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Profile Fields */}
      <div className="flex flex-col gap-4 w-full">
        {/* Name Field */}
        <div className="flex items-start justify-between w-full py-3 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-outfit text-light-p dark:text-dark-text mb-1">Name</div>
            <div className="text-lg sm:text-xl font-outfit font-semibold text-light-text dark:text-dark-text">
              {userProfile.name}
            </div>
          </div>
          <button
            onClick={() => onEditClick('name', userProfile.name)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-light-bg dark:bg-dark-bg border border-black hover:bg-[#FF9269] hover:text-white transition-colors ml-4 flex-shrink-0"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Username Field */}
        <div className="flex items-start justify-between w-full py-3 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-outfit text-light-p dark:text-dark-text mb-1">username</div>
            <div className="text-lg sm:text-xl font-outfit font-semibold text-light-text dark:text-dark-text">
              {userProfile.username}
            </div>
          </div>
          <button
            onClick={() => onEditClick('username', userProfile.username)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-light-bg dark:bg-dark-bg border border-black hover:bg-[#FF9269] hover:text-white transition-colors ml-4 flex-shrink-0"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Password Field */}
        <div className="flex items-start justify-between w-full py-3 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-outfit text-light-p dark:text-dark-text mb-1">password</div>
            <div className="text-lg sm:text-xl font-outfit font-semibold text-light-text dark:text-dark-text">
              ••••••••••••
            </div>
          </div>
          <button
            onClick={() => onEditClick('password', '')}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-light-bg dark:bg-dark-bg border border-black hover:bg-[#FF9269] hover:text-white transition-colors ml-4 flex-shrink-0"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Email Field */}
        <div className="flex items-start justify-between w-full py-3 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-outfit text-light-p dark:text-dark-text mb-1">Email</div>
            <div className="text-lg sm:text-xl font-outfit font-semibold text-light-text dark:text-dark-text break-all">
              {userProfile.email}
            </div>
          </div>
          <button
            onClick={() => onEditClick('email', userProfile.email)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-light-bg dark:bg-dark-bg border border-black hover:bg-[#FF9269] hover:text-white transition-colors ml-4 flex-shrink-0"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Phone Field */}
        <div className="flex items-start justify-between w-full py-3 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-outfit text-light-p dark:text-dark-text mb-1">Phone</div>
            <div className="text-lg sm:text-xl font-outfit font-semibold text-light-text dark:text-dark-text">
              {userProfile.phone}
            </div>
          </div>
          <button
            onClick={() => onEditClick('phone', userProfile.phone)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-light-bg dark:bg-dark-bg border border-black hover:bg-[#FF9269] hover:text-white transition-colors ml-4 flex-shrink-0"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Status Field */}
        <div className="flex items-start justify-between w-full py-3 border-b border-gray-200">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-outfit text-light-p dark:text-dark-text mb-1">Status</div>
            <div className="text-lg sm:text-xl font-outfit font-semibold text-light-text dark:text-dark-text">
              {userProfile.status}
            </div>
          </div>
          <button
            onClick={() => onEditClick('status', userProfile.status)}
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-light-bg dark:bg-dark-bg border border-black hover:bg-[#FF9269] hover:text-white transition-colors ml-4 flex-shrink-0"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 w-full mt-6 sm:mt-8 px-4 sm:px-0">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-outfit text-light-text dark:text-dark-text">
          <button className="hover:opacity-70 transition-opacity underline">Terms & Conditions</button>
          <button className="hover:opacity-70 transition-opacity underline">Privacy Policy</button>
          <button className="hover:opacity-70 transition-opacity underline">Support</button>
          <button className="hover:opacity-70 transition-opacity underline">Contact</button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onSignOut}
            className="px-4 sm:px-6 py-3 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text text-light-text dark:text-dark-text hover:bg-[#FF9269] hover:text-white transition-colors font-outfit font-medium w-full sm:w-auto"
            style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
          >
            Log Out
          </button>
          <button className="px-4 sm:px-6 py-3 bg-[#FF9269] border border-light-text dark:border-dark-text text-white hover:bg-[#ff7b4d] transition-colors font-outfit font-medium w-full sm:w-auto" style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}>
            Confirm Details
          </button>
        </div>
      </div>
    </div>
  );
}