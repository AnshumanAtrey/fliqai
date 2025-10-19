'use client';

import React from 'react';
import Image from 'next/image';

// Import all person images
import L1 from '../assets/persons/L1.png';
import L2 from '../assets/persons/L2.png';
import L3 from '../assets/persons/L3.png';
import R1 from '../assets/persons/R1.png';
import R2 from '../assets/persons/R2.png';
import R3 from '../assets/persons/R3.png';

const PersonsSection = () => {
  return (
    <section className="w-full py-10 md:py-20 bg-white">
      <div className="flex w-full px-4 md:px-[92px] pt-10 md:pt-[120px] pb-10 md:pb-[120px] flex-col items-center mx-auto">
        {/* Heading Container */}
        <div className="flex flex-col items-center w-full md:w-[546px] mb-6 md:mb-[24px] px-4">
          <h2 className="text-[#191919] text-center font-outfit text-2xl md:text-[40px] font-bold leading-[110%] capitalize mb-4 md:mb-[16px]">
            How the college game feels vs how it feels with fliq
          </h2>
          <p className="self-stretch text-black text-opacity-70 text-center font-outfit text-base md:text-[18px] font-normal leading-[150%]">
            this is your unfair advantage.
          </p>
        </div>
        
        {/* Section Labels */}
        <div className="flex gap-8 md:gap-[200px] mb-8 md:mb-[80px] mt-10 md:mt-[120px] w-full justify-center px-4">
          <h3 className="text-black text-center font-outfit text-base md:text-[18px] font-medium leading-[150%] w-[120px] md:w-[200px]">
            Without Fliq
          </h3>
          <h3 className="text-black text-center font-outfit text-base md:text-[18px] font-medium leading-[150%] w-[120px] md:w-[200px]">
            With Fliq
          </h3>
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col gap-6 md:gap-[48px] w-full max-w-[1384px]">
          {/* Row 1 */}
          <div className="flex gap-8 md:gap-[200px] w-full justify-center px-4">
            {/* Without Fliq Box */}
            <div className="flex flex-col items-center gap-3 md:gap-[24px]">
              <div className="relative w-[140px] h-[189px] md:w-[200px] md:h-[270px] aspect-[20/27]">
                <Image 
                  src={L1} 
                  alt="Person 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-[8px]">
                <h4 className="text-black text-center font-outfit text-base md:text-[24px] font-semibold leading-[150%]">
                  expensive guidance
                </h4>
                <p className="text-black text-opacity-70 text-center font-outfit text-xs md:text-[13px] font-normal leading-[150%] max-w-[140px] md:max-w-[200px]">
                  You pay for counselling advice that sounds smart but looks the same for everyone
                </p>
              </div>
            </div>
            
            {/* With Fliq Box */}
            <div className="flex flex-col items-center gap-3 md:gap-[24px]">
              <div className="relative w-[140px] h-[189px] md:w-[200px] md:h-[270px] aspect-[20/27]">
                <Image 
                  src={R1} 
                  alt="Person 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-[8px]">
                <h4 className="text-black text-center font-outfit text-base md:text-[24px] font-semibold leading-[150%]">
                  Personalized Strategy
                </h4>
                <p className="text-black text-opacity-70 text-center font-outfit text-xs md:text-[13px] font-normal leading-[150%] max-w-[140px] md:max-w-[200px]">
                  Tailored approach based on your unique profile and goals
                </p>
              </div>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="flex gap-8 md:gap-[200px] w-full justify-center px-4">
            {/* Without Fliq Box */}
            <div className="flex flex-col items-center gap-3 md:gap-[24px]">
              <div className="relative w-[140px] h-[189px] md:w-[200px] md:h-[270px] aspect-[20/27]">
                <Image 
                  src={L2} 
                  alt="Person 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-[8px]">
                <h4 className="text-black text-center font-outfit text-base md:text-[24px] font-semibold leading-[150%]">
                  Generic Templates
                </h4>
                <p className="text-black text-opacity-70 text-center font-outfit text-xs md:text-[13px] font-normal leading-[150%] max-w-[140px] md:max-w-[200px]">
                  Essays and applications that blend in with thousands of others
                </p>
              </div>
            </div>
            
            {/* With Fliq Box */}
            <div className="flex flex-col items-center gap-3 md:gap-[24px]">
              <div className="relative w-[140px] h-[189px] md:w-[200px] md:h-[270px] aspect-[20/27]">
                <Image 
                  src={R2} 
                  alt="Person 4"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-[8px]">
                <h4 className="text-black text-center font-outfit text-base md:text-[24px] font-semibold leading-[150%]">
                  Standout Applications
                </h4>
                <p className="text-black text-opacity-70 text-center font-outfit text-xs md:text-[13px] font-normal leading-[150%] max-w-[140px] md:max-w-[200px]">
                  Unique narratives that showcase your authentic story
                </p>
              </div>
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="flex gap-8 md:gap-[200px] w-full justify-center px-4">
            {/* Without Fliq Box */}
            <div className="flex flex-col items-center gap-3 md:gap-[24px]">
              <div className="relative w-[140px] h-[189px] md:w-[200px] md:h-[270px] aspect-[20/27]">
                <Image 
                  src={L3} 
                  alt="Person 5"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-[8px]">
                <h4 className="text-black text-center font-outfit text-base md:text-[24px] font-semibold leading-[150%]">
                  Unclear Pathways
                </h4>
                <p className="text-black text-opacity-70 text-center font-outfit text-xs md:text-[13px] font-normal leading-[150%] max-w-[140px] md:max-w-[200px]">
                  Confusion about which colleges match your profile and interests
                </p>
              </div>
            </div>
            
            {/* With Fliq Box */}
            <div className="flex flex-col items-center gap-3 md:gap-[24px]">
              <div className="relative w-[140px] h-[189px] md:w-[200px] md:h-[270px] aspect-[20/27]">
                <Image 
                  src={R3} 
                  alt="Person 6"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center gap-[8px]">
                <h4 className="text-black text-center font-outfit text-base md:text-[24px] font-semibold leading-[150%]">
                  Clear Direction
                </h4>
                <p className="text-black text-opacity-70 text-center font-outfit text-xs md:text-[13px] font-normal leading-[150%] max-w-[140px] md:max-w-[200px]">
                  Data-driven insights to find your best-fit universities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonsSection;