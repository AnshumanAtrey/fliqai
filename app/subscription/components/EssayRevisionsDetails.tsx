import React from 'react';
import Image from 'next/image';
import { TickIcon } from './TickIcon';

export const EssayRevisionsDetails = () => {
  return (
    <div className="flex flex-col gap-[26px] p-6 flex-1 bg-light-bg dark:bg-dark-secondary border border-solid border-black">
      <div className="text-5xl">📝</div>
      
      <div className="flex flex-col gap-1">
        <h3 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Essay Revisions</h3>
        <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">
          Get expert feedback on your drafts and refine your essays to stand out in admissions.
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-[11px] py-3 bg-[#ff9068] border border-solid border-black">
        <Image src="/Coins.svg" alt="Coins" width={28} height={15} />
        <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-text text-base">15 credits per revision</span>
      </div>
      
      <hr className="w-full h-px bg-black border-0" />
      
      <div className="flex flex-col gap-4">
        <h4 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-lg">What you&apos;ll access</h4>
        <ul className="flex flex-col gap-4 list-none p-0 m-0">
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Detailed line-by-line feedback on structure & clarity</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Suggestions to highlight personal achievements and experiences</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Grammar, style, and tone improvements</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Tips to better align essays with university expectations</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Course catalogue & information</p>
          </li>
          <li className="flex gap-2 items-start">
            <TickIcon />
            <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Actionable revision roadmap for your next draft</p>
          </li>
        </ul>
      </div>
    </div>
  );
};