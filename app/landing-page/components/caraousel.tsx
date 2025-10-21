'use client';

import React from 'react';
import Image from 'next/image';

// Import all logos except Whitelogo.svg
import bathLogo from '../assets/logos/bath.png';
import bostonLogo from '../assets/logos/boston.png';
import caltechLogo from '../assets/logos/caltech.png';
import cornellLogo from '../assets/logos/cornell.png';
import harvardLogo from '../assets/logos/harvard.svg';
import imperialLogo from '../assets/logos/imperial.svg';
import mitLogo from '../assets/logos/mit.svg';
import oxfordLogo from '../assets/logos/oxford.png';
import uclLogo from '../assets/logos/ucl.png';

const Carousel = () => {
  // Duplicate logos for infinite scroll effect
  const logos = [
    bathLogo,
    bostonLogo, 
    caltechLogo,
    cornellLogo,
    harvardLogo,
    imperialLogo,
    mitLogo,
    oxfordLogo,
    uclLogo
  ];
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos]; // Quadrupled for smooth infinite scroll

  return (
    <section className="py-8 md:py-16 bg-[#FAF6F2]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        {/* Carousel container */}
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {/* Title */}
          <h2 className="text-[#191919] font-outfit text-base md:text-lg font-normal leading-[150%]">
            Featuring 3000+ universities
          </h2>
          
          {/* Carousel track */}
          <div className="relative w-full overflow-hidden h-[80px] md:h-[120px]">
            <div className="flex animate-infinite-scroll">
              {duplicatedLogos.map((logo, index) => (
                <div key={index} className="flex-shrink-0 mx-2 md:mx-4 w-[120px] h-[60px] md:w-[180px] md:h-[100px]">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image 
                      src={logo} 
                      alt={`University logo ${index + 1}`}
                      width={100}
                      height={50}
                      className="object-contain max-w-full max-h-full md:w-[160px] md:h-[80px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 100s linear infinite;
          display: flex;
          align-items: center;
          width: max-content;
        }
      `}</style>
    </section>
  );
};

export default Carousel;