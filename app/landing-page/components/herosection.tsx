import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import heroImage from '../assets/hero.png';

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="flex py-10 md:py-20 px-4 md:px-10 bg-[#FAF6F2] overflow-hidden ">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-32 max-w-[1440px] mx-auto w-full">
        {/* Left content - Centered on mobile */}
        <div className="flex flex-col items-center md:items-start gap-8 md:gap-12 w-full md:w-auto md:mb-8">
          {/* First text box */}
          <div className="flex w-full md:w-[555px] flex-col items-center md:items-start gap-5 md:gap-12">
            {/* Tag */}
            <div className="flex py-1.5 px-4 md:py-2 md:px-6 gap-2 justify-center items-center rounded-full bg-[#F3EAE1]">
              <span className="text-[#191919] font-outfit text-[12px] md:text-base font-medium leading-[15px] md:leading-normal text-center">
                Data-Driven Admissions — Built on Real Admit Profiles
              </span>
            </div>

            {/* Heading */}
            <h1 className="w-full md:w-[555px] text-[#191919] font-outfit text-[32px] md:text-5xl font-bold leading-[35.2px] md:leading-[110%] capitalize text-center md:text-start">
              Personalized Playbooks to Your Dream School
            </h1>

            {/* Description */}
            <p className="w-full md:w-[517px] text-[rgba(25,25,25,0.7)] md:text-[#191919] font-outfit text-[16px] md:text-lg font-normal md:font-medium leading-[24px] md:leading-[150%] text-center md:text-left">
              Fliq turns thousands of successful applications into insights. Compare yourself. Learn patterns that worked. Follow a clear roadmap built from admit data.
            </p>
          </div>

          {/* Buttons - Reversed order on mobile */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-auto">
            {/* Secondary Button - Shows first on mobile */}
            <button 
              onClick={() => router.push('/discover-students')}
              className="flex py-3 px-4 md:px-6 md:py-4 gap-2.5 justify-center items-center rounded-xl md:rounded-xl bg-white hover:bg-gray-50 transition-colors border border-gray-200 w-full md:w-auto order-2 md:order-1"
            >
              <span className="text-[#191919] font-outfit text-[14px] md:text-base font-medium leading-[17.64px] md:leading-normal whitespace-nowrap">
                View Free Profile
              </span>
            </button>

            {/* Primary Button - Shows second on mobile */}
            {/* <button 
              onClick={() => router.push('/signup')}
              className="flex py-3 px-4 md:px-8 md:py-4 gap-2.5 justify-center items-center rounded-xl md:rounded-xl border border-[#191919] bg-[#191919] hover:bg-[#333333] transition-colors w-full md:w-auto order-1 md:order-2"
            >
              <span className="text-white font-outfit text-[14px] md:text-base font-medium leading-[17.64px] md:leading-normal whitespace-nowrap">
                Get your playbook
              </span>
            </button> */}
          </div>
        </div>

        {/* Right image - Shows after buttons on mobile */}
        <div className="flex-shrink-0 w-full md:w-auto order-3 md:py-8">
          <Image
            src={heroImage}
            alt="Hero"
            width={777.6}
            height={584.82}
            className="object-cover rounded-2xl shadow-sm w-full h-auto md:w-[777.6px]"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;