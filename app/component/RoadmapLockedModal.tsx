"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface RoadmapLockedModalProps {
    onUnlock: () => void;
    isUnlocking: boolean;
    userCredits?: number;
    universityName?: string;
}

export const RoadmapLockedModal: React.FC<RoadmapLockedModalProps> = ({
    onUnlock,
    isUnlocking,
    userCredits = 0,
    universityName = "this university"
}) => {
    const router = useRouter();
    const hasEnoughCredits = userCredits >= 10; // Roadmap costs 10 credits

    return (
        <div className="flex items-center justify-center py-8">
            <div
                className="bg-white dark:bg-dark-secondary border-2 border-black p-6 max-w-sm w-full relative"
                style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
                {/* Lock Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center bg-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-black dark:text-dark-text text-center mb-2">
                    Roadmap Locked 🔒
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-dark-text text-center mb-4">
                    This is a premium roadmap for {universityName}.<br />
                    {hasEnoughCredits ? 'You have enough credits to unlock it!' : 'Get more credits to unlock it.'}
                </p>

                {/* Credits Box */}
                <div className="bg-white dark:bg-dark-tertiary border-2 border-black p-4 mb-4" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="2" />
                            <path d="M12 6V12L16 14" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="text-3xl font-bold text-black dark:text-dark-text">10</span>
                    </div>
                    <p className="text-center text-xs font-semibold text-black dark:text-dark-text uppercase tracking-wide">
                        CREDITS
                    </p>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                    <p className="text-xs font-semibold text-black dark:text-dark-text mb-2">
                        Get Access to {universityName}&apos;s:
                    </p>
                    <ul className="space-y-1.5">
                        {[
                            'student admission profiles',
                            'academic requirements breakdown',
                            'extracurricular patterns',
                            'test score distributions',
                            'timeline strategies'
                        ].map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-gray-700 dark:text-dark-text">
                                <span className="text-[#FF9169] mt-0.5 text-sm">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Current Credits Display */}
                <div className="bg-gray-50 dark:bg-dark-bg border border-gray-300 dark:border-dark-text p-2 mb-4 text-center">
                    <p className="text-xs text-gray-600 dark:text-dark-text">
                        Your Credits: <span className="font-bold text-black dark:text-dark-text">{userCredits}</span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                    {!hasEnoughCredits && (
                        <div className="bg-red-50 border-2 border-red-500 p-3 text-center mb-2" style={{ boxShadow: '2px 2px 0 0 #dc2626' }}>
                            <p className="text-xs text-red-700 font-semibold">
                                ⚠️ Insufficient credits
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                                You have {userCredits} credits but need 10
                            </p>
                        </div>
                    )}

                    <button
                        onClick={hasEnoughCredits ? onUnlock : () => router.push('/subscription')}
                        disabled={isUnlocking}
                        className="w-full px-4 py-2.5 bg-[#FF9169] text-white border-2 border-black font-semibold text-sm hover:bg-[#ff7b4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ boxShadow: '2px 2px 0 0 #000' }}
                    >
                        {isUnlocking ? 'Unlocking...' : hasEnoughCredits ? 'Unlock Roadmap' : 'Buy More Credits'}
                    </button>

                    <button
                        onClick={() => router.back()}
                        className="w-full px-4 py-2.5 bg-white dark:bg-dark-tertiary text-black dark:text-dark-text border-2 border-black font-semibold text-sm hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                        style={{ boxShadow: '2px 2px 0 0 #000' }}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};