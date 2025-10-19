import React from 'react';
import Image from 'next/image';
import { TickIcon } from './TickIcon';

export const StudentProfilesDetails = () => {
  return (
    <div className="flex flex-col gap-[26px] p-6 flex-1 bg-light-bg dark:bg-dark-secondary border border-solid border-black">
      {/* Profile Images */}
      <div className="flex -space-x-2">
        <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-white"></div>
        <div className="w-12 h-12 bg-gray-400 rounded-full border-2 border-white"></div>
        <div className="w-12 h-12 bg-gray-500 rounded-full border-2 border-white"></div>
        <div className="w-12 h-12 bg-gray-600 rounded-full border-2 border-white"></div>
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Student Profiles</h3>
        <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">
          Draw inspiration with details from top admits from your university
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-[11px] py-3 bg-[#ff9068] border border-solid border-black">
        <Image src="/Coins.svg" alt="Coins" width={28} height={15} />
        <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-text text-base">10 credits per profile</span>
      </div>
      
      <hr className="w-full h-px bg-black border-0" />
      
      <div className="flex flex-col gap-4">
        <h4 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-lg">What you&apos;ll access</h4>
        <ul className="flex flex-col gap-4 list-none p-0 m-0">
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Their test scores and dates taken</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Their Essays</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Personally answered Q&A&apos;s</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Scholarships & Awards they achieved</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Their extracurricular activities</p>
          </li>
        </ul>
      </div>
    </div>
  );
};