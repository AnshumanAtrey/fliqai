'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CaseStudyCard = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-tertiary border-2 border-black p-6 mt-14 mx-auto max-w-6xl w-full mb-14" style={{ boxShadow: '4px 4px 0 0 #000' }}>
      <div className="flex flex-col md:flex-row items-center ">
        <div className="md:w-3/5 space-y-4 py-2 px-9">
          <h3 className="text-2xl font-bold text-light-text dark:text-dark-text leading-tight ">Worried about your weak test <br/>scores?We think this could help.</h3>
          <p className="text-light-p dark:text-dark-text text-lg leading-relaxed ">
            Jordan had the same problem as you when he was <br/> applying for Princeton. See what he did <br/>during his gap year to compensate for his <br/>comparatively weaker academic performance to <br/>strengthen his application and get in.
          </p>
          <Link 
            href=""
            target="_blank"
            className="inline-block bg-[#FF9169] text-light-text py-2 px-2 font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors"
            style={{ boxShadow: '4px 4px 0 0 #000' }}
          >
            Read case study
          </Link>
        </div>
        <div className="md:flex-1 w-full flex justify-end">
          <div className="relative w-[350px] h-[350px] overflow-hidden border-2 border-black -mr-2">
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
  );
};

export default CaseStudyCard;
