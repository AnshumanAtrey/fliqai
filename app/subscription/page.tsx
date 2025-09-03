"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../component/header';


// Tick SVG Component
const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 aspect-square flex-shrink-0">
    <path d="M21.7969 7.54597L9.79687 19.546C9.69236 19.6509 9.56816 19.7341 9.43142 19.7909C9.29467 19.8476 9.14806 19.8769 9 19.8769C8.85193 19.8769 8.70532 19.8476 8.56858 19.7909C8.43183 19.7341 8.30764 19.6509 8.20312 19.546L2.95312 14.296C2.84848 14.1913 2.76547 14.0671 2.70883 13.9304C2.6522 13.7936 2.62305 13.6471 2.62305 13.4991C2.62305 13.3511 2.6522 13.2046 2.70883 13.0678C2.76547 12.9311 2.84848 12.8069 2.95312 12.7022C3.05777 12.5976 3.182 12.5146 3.31873 12.4579C3.45546 12.4013 3.60201 12.3721 3.75 12.3721C3.89799 12.3721 4.04454 12.4013 4.18126 12.4579C4.31799 12.5146 4.44223 12.5976 4.54687 12.7022L9.00094 17.1563L20.205 5.9541C20.4163 5.74276 20.703 5.62402 21.0019 5.62402C21.3008 5.62402 21.5874 5.74276 21.7987 5.9541C22.0101 6.16544 22.1288 6.45209 22.1288 6.75098C22.1288 7.04986 22.0101 7.33651 21.7987 7.54785L21.7969 7.54597Z" fill="#FF9169"/>
  </svg>
);

export default function SubscriptionPage() {
  const [selectedCredits, setSelectedCredits] = useState(25);
  
  // theme: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  // Set background SVG and colors
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bg = theme === 'dark' ? '/bg-black.svg' : '/bg-white.svg';
      document.body.style.backgroundImage = `url('${bg}')`;
      document.body.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundSize = 'auto';
      document.body.style.backgroundColor = theme === 'dark' ? '#0F0D0E' : '#FFFBF1';
    }
  }, [theme]);

  const creditOptions = [
    { credits: 5, price: 4.99 },
    { credits: 10, price: 9.99 },
    { credits: 25, price: 19.99, highlighted: true },
    { credits: 50, price: 34.99 },
    { credits: 100, price: 59.99 },
    { credits: 150, price: 84.99 },
    { credits: 200, price: 109.99 },
    { credits: 300, price: 149.99 }
  ];

  const calculateSavings = (credits: number, price: number) => {
    const basePrice = credits * 1; // $1 per credit as base
    const savings = ((basePrice - price) / basePrice * 100).toFixed(0);
    return savings;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Main Container - 55% + 45% flex row */}
      <div className="flex w-full max-w-7xl mx-auto p-6 pt-20 gap-8">
        
        {/* Left Section - 55% - What we offer */}
        <div className="flex-[0_0_55%] flex flex-col gap-6">
          <h2 className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-lg tracking-[0] leading-[27px]">
            What we offer:
          </h2>
          
          {/* Two columns: Student Profiles + Essay Revisions */}
          <div className="flex gap-4">
            {/* Student Profiles Details - Column 1 */}
            <div className="flex flex-col gap-[26px] p-6 flex-1 bg-white border border-solid border-black">
              {/* Profile Images */}
              <div className="flex -space-x-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 bg-gray-400 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 bg-gray-500 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 bg-gray-600 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="flex flex-col gap-1">
                <h3 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-2xl">Student Profiles</h3>
                <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">
                  Draw inspiration with details from top admits from your university
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-[11px] py-3 bg-[#ff9068] border border-solid border-black">
                <Image src="/Coins.svg" alt="Coins" width={28} height={15} />
                <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-black text-base">10 credits per profile</span>
              </div>
              
              <hr className="w-full h-px bg-black border-0" />
              
              <div className="flex flex-col gap-4">
                <h4 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-lg">What you'll access</h4>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Their test scores and dates taken</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Their Essays</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Personally answered Q&A's</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Scholarships & Awards they achieved</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Their extracurricular activities</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Essay Revisions Details - Column 2 */}
            <div className="flex flex-col gap-[26px] p-6 flex-1 bg-white border border-solid border-black">
              <div className="text-5xl">📝</div>
              
              <div className="flex flex-col gap-1">
                <h3 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-2xl">Essay Revisions</h3>
                <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">
                  Get expert feedback on your drafts and refine your essays to stand out in admissions.
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-[11px] py-3 bg-[#ff9068] border border-solid border-black">
                <Image src="/Coins.svg" alt="Coins" width={28} height={15} />
                <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-black text-base">15 credits per revision</span>
              </div>
              
              <hr className="w-full h-px bg-black border-0" />
              
              <div className="flex flex-col gap-4">
                <h4 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-lg">What you'll access</h4>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Detailed line-by-line feedback on structure & clarity</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Suggestions to highlight personal achievements and experiences</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Grammar, style, and tone improvements</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Tips to better align essays with university expectations</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Course catalogue & information</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">Actionable revision roadmap for your next draft</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Questionnaire Section */}
          <div className="flex flex-col gap-8 p-6 max-w-md bg-white border border-solid border-black">
            <div className="flex flex-col gap-4">
              <p className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-xl">
                Unsure which package to pick?
              </p>
              <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-lg leading-[27px]">
                We get it. We've compiled a 2 min questionnaire that might help you decide which one to go for.
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#ff9068] border border-solid border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150">
              <span className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-base">Take Questionnaire</span>
            </button>
          </div>
        </div>

        {/* Right Section - 45% - Credit Cards */}
        <div className="flex-[0_0_45%] flex flex-col gap-8">
          {/* Student Profiles Section */}
          <div className="flex flex-col gap-4">
            <h2 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-2xl">Student Profiles</h2>
            
            <div className="flex gap-3">
              {/* 50 Credits Card */}
              <div className="flex flex-col gap-8 p-3 flex-1 bg-white border border-solid border-black">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                    <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-[32px] leading-[48px]">50</div>
                  </div>
                  <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-base">CREDITS</div>
                </div>
                <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-black text-base">
                  <span className="font-medium">Unlock </span>
                  <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">5 profiles</span>
                </p>
                <button className="flex px-6 py-3 justify-center items-center gap-2.5 self-stretch bg-[#FF9169] border border-solid border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ff8050] transition-colors">
                  <span className="text-black font-outfit text-base font-semibold leading-normal whitespace-nowrap">Select for ₹3499</span>
                </button>
              </div>

              {/* 100 Credits Card - Selected */}
              <div className="flex flex-col gap-8 p-3 flex-1 bg-white border border-solid border-black shadow-[0px_0px_0px_2px_#ff9068] relative">
                <div className="absolute top-2 right-2 w-5 h-5">
                  <svg className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                    <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-[32px] leading-[48px]">100</div>
                  </div>
                  <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-base">CREDITS</div>
                </div>
                <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-black text-base">
                  <span className="font-medium">Unlock </span>
                  <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">10 profiles</span>
                </p>
                <button className="flex px-6 py-3 justify-center items-center gap-2.5 self-stretch bg-[#FF9169] border border-solid border-black shadow-[2px_2px_0px_0px_#000000]">
                  <span className="text-black font-outfit text-base font-semibold leading-normal whitespace-nowrap">Selected</span>
                </button>
              </div>

              {/* 200 Credits Card */}
              <div className="flex flex-col gap-8 p-3 flex-1 bg-white border border-solid border-black">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                    <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-[32px] leading-[48px]">200</div>
                  </div>
                  <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-base">CREDITS</div>
                </div>
                <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-black text-base">
                  <span className="font-medium">Unlock </span>
                  <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">20 profiles</span>
                </p>
                <button className="flex px-6 py-3 justify-center items-center gap-2.5 self-stretch bg-[#FF9169] border border-solid border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ff8050] transition-colors">
                  <span className="text-black font-outfit text-base font-semibold leading-normal whitespace-nowrap">Select for ₹10499</span>
                </button>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="w-full h-px bg-black"></div>

          {/* Essay Revisions Section */}
          <div className="flex flex-col gap-4">
            <h2 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-2xl">Essay Revisions</h2>
            
            <div className="flex gap-3">
              {/* 50 Credits Card */}
              <div className="flex flex-col gap-8 p-3 flex-1 bg-white border border-solid border-black">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                    <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-[32px] leading-[48px]">50</div>
                  </div>
                  <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-base">CREDITS</div>
                </div>
                <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-black text-base">
                  <span className="font-medium">Unlock </span>
                  <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">10 revisions</span>
                </p>
                <button className="flex px-6 py-3 justify-center items-center gap-2.5 self-stretch bg-[#FF9169] border border-solid border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ff7a4d] transition-colors">
                  <span className="text-black font-outfit text-base font-semibold leading-normal whitespace-nowrap">Select for ₹2499</span>
                </button>
              </div>

              {/* 100 Credits Card */}
              <div className="flex flex-col gap-8 p-3 flex-1 bg-white border border-solid border-black">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                    <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-[32px] leading-[48px]">100</div>
                  </div>
                  <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-base">CREDITS</div>
                </div>
                <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-black text-base">
                  <span className="font-medium">Unlock </span>
                  <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">25 revisions</span>
                </p>
                <button className="flex px-6 py-3 justify-center items-center gap-2.5 self-stretch bg-[#FF9169] border border-solid border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ff7a4d] transition-colors">
                  <span className="text-black font-outfit text-base font-semibold leading-normal whitespace-nowrap">Select for ₹4999</span>
                </button>
              </div>

              {/* 200 Credits Card */}
              <div className="flex flex-col gap-8 p-3 flex-1 bg-white border border-solid border-black">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                    <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-black text-[32px] leading-[48px]">200</div>
                  </div>
                  <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-base">CREDITS</div>
                </div>
                <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-black text-base">
                  <span className="font-medium">Unlock </span>
                  <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">35 revisions</span>
                </p>
                <button className="flex px-6 py-3 justify-center items-center gap-2.5 self-stretch bg-[#FF9169] border border-solid border-black shadow-[2px_2px_0px_0px_#000000] hover:bg-[#ff7a4d] transition-colors">
                  <span className="text-black font-outfit text-base font-semibold leading-normal whitespace-nowrap">Select for ₹6499</span>
                </button>
              </div>
            </div>
          </div>

          {/* Separator Line */}
          <div className="w-full h-px bg-black"></div>

          {/* Total and Buy Section */}
          <div className="flex items-center justify-between p-2.5 bg-white border border-solid border-black">
            <p className="[font-family:'Outfit-Bold',Helvetica] text-lg">
              <span className="font-bold text-black">Total: </span>
              <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-[#5d5237]">₹6299 (You saved</span>
              <span className="font-bold text-[#10a95b]"> 10%</span>
              <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-[#5d5237]">)</span>
            </p>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-[#ff9068] border border-solid border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150">
              <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-base text-black">Buy now</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
