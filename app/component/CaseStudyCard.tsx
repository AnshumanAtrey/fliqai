'use client';

import React from 'react';
import Image from 'next/image';

interface CaseStudyCardProps {
  redirectUrl?: string;
}

const CaseStudyCard = ({ redirectUrl }: CaseStudyCardProps) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-[80px] max-w-7xl mx-auto">
      <div className="bg-light-bg dark:bg-dark-tertiary border-2 border-black p-6 w-full" style={{ boxShadow: '4px 4px 0 0 #000' }}>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/5 space-y-4 py-2 px-4 sm:px-6 md:px-9">
            <h3 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text leading-tight">Worried about your weak test <br/>scores?We think this could help.</h3>
            <p className="text-light-p dark:text-dark-text text-base sm:text-lg leading-relaxed">
              Jordan had the same problem as you when he was <br/> applying for Princeton. See what he did <br/>during his gap year to compensate for his <br/>comparatively weaker academic performance to <br/>strengthen his application and get in.
            </p>
            <button
              onClick={() => {
                if (redirectUrl) {
                  window.open(redirectUrl, '_blank');
                } else {
                  alert('University profile link not available');
                }
              }}
              className="inline-block bg-[#FF9169] text-light-text py-2 px-2 font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors"
              style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
              Read case study
            </button>
          </div>
          <div className="w-full md:flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] h-[280px] sm:h-[350px] overflow-hidden border-2 border-black md:-mr-2">
              <Image
                src="/profile-pic-1.jpg"
                alt="Student celebrating graduation"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
