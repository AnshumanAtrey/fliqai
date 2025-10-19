'use client';

import Image from 'next/image';

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

interface ProfileHeaderProps {
  userProfile: UserProfile;
}

export function ProfileHeader({ userProfile }: ProfileHeaderProps) {
  return (
    <div className="w-full bg-light-bg dark:bg-dark-secondary border border-black p-4 sm:p-6 lg:p-8 mb-4 lg:mb-0" style={{ boxShadow: '4px 4px 0 0 #000' }}>
      <div className="flex flex-col items-center">
        {/* Profile Avatar */}
        <div className="relative mb-4 sm:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-black overflow-hidden">
            <Image
              src={userProfile.avatar}
              alt={userProfile.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-light-bg dark:bg-dark-tertiary border border-black flex items-center justify-center" style={{ boxShadow: '2px 2px 0 0 #000' }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Name and Subtitle */}
        <h1 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text mb-1 sm:mb-2 text-center">{userProfile.name}</h1>
        <p className="text-sm sm:text-base text-light-p dark:text-dark-text mb-6 sm:mb-8 text-center">Account & Settings</p>

        {/* Stats - Always in Row */}
        <div className="flex justify-center gap-3 sm:gap-6 lg:gap-8 w-full">
          <div className="text-center flex-1 max-w-[100px] sm:max-w-none">
            <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-light-text dark:text-dark-text mb-1">{userProfile.stats.universitiesBrowsed}</div>
            <div className="text-xs sm:text-sm text-light-p dark:text-dark-text leading-tight">
              Universities<br />Browsed
            </div>
          </div>
          <div className="text-center flex-1 max-w-[100px] sm:max-w-none">
            <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-light-text dark:text-dark-text mb-1">{userProfile.stats.studentProfilesViewed}</div>
            <div className="text-xs sm:text-sm text-light-p dark:text-dark-text leading-tight">
              Student Profiles<br />Viewed
            </div>
          </div>
          <div className="text-center flex-1 max-w-[100px] sm:max-w-none">
            <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-light-text dark:text-dark-text mb-1">{userProfile.stats.essaysViewed}</div>
            <div className="text-xs sm:text-sm text-light-p dark:text-dark-text leading-tight">
              Essays<br />Viewed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}