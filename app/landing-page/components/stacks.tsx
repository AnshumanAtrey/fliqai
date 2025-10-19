'use client';

import React from 'react';
import Image from 'next/image';
import { ContainerScroll, StackingCard } from '@/app/landing-page/components/stacking-cards';

// Import images
import Stack1 from '../assets/stack1.png';
import HarvardLogo from '../assets/logos/harvard.svg';
import CaltechLogo from '../assets/logos/caltech.png';
import MitLogo from '../assets/logos/mit.svg';

const stackData = [
  {
    id: 1,
    image: Stack1,
    title: "Data Driven Playbooks",
    description: "Our algorithm analyzes your profile against thousands of data points to find universities that align with your academic and personal goals."
  },
  {
    id: 2,
    image: HarvardLogo,
    title: "Strategic Application Planning",
    description: "Create a customized roadmap with milestone tracking to ensure every component of your application is optimized and submitted on time."
  },
  {
    id: 3,
    image: CaltechLogo,
    title: "Data-Driven Essay Guidance",
    description: "Transform your experiences into compelling narratives with AI-powered feedback and successful essay examples from admitted students."
  },
  {
    id: 4,
    image: MitLogo,
    title: "Real-Time Admission Insights",
    description: "Access live admission statistics and adjust your strategy based on current trends and acceptance rates."
  }
];

const StacksSection = () => {
  return (
    <section className="w-full py-10 md:py-20 bg-white">
      <div className="flex flex-col items-center px-4 md:px-[92px] mx-auto max-w-[1440px]">
        {/* Section Header */}
        <h2 className="w-full md:w-[387px] text-[#191919] text-center font-outfit text-2xl md:text-[40px] font-bold leading-[110%] capitalize mb-4 md:mb-6 mx-auto">
          Getting to Know Fliq
        </h2>
        <p className="w-full text-[#5D5237] text-center font-outfit text-base md:text-[18px] font-medium leading-[150%] mb-10 md:mb-[80px] max-w-[700px] mx-auto px-4">
          Fliq turns admit data into step-by-step playbooks that help you apply smarter
        </p>

        {/* Stacked Cards with Animation */}
        <ContainerScroll className="min-h-[150vh] w-full">
          {stackData.map((item, index) => (
            <StackingCard
              key={item.id}
              index={index}
              baseTop={80}
              className="flex flex-col md:flex-row gap-8 md:gap-[120px] w-full items-start mb-8 md:mb-[64px]"
            >
              {/* Card Left */}
              <div className="w-full md:w-[585.6px] h-[280px] md:h-[432px] flex-shrink-0 rounded-[28px] bg-[#F3EAE1] flex items-center justify-center shadow-lg">
                <div className="w-[90%] h-[90%] md:w-[561.68px] md:h-[408.92px] rounded-[19.2px] bg-[#FFFBF1] overflow-hidden">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    width={561.68}
                    height={408.92}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Card Right */}
              <div className="flex flex-col items-center justify-center flex-grow self-stretch rounded-lg bg-white px-4">
                <h3 className="self-stretch text-[#191919] font-outfit text-xl md:text-[32px] font-semibold leading-[150%] mb-3 md:mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-[#5D5237] font-outfit text-base md:text-[18px] font-normal leading-[150%] max-w-[500px] text-center">
                  {item.description}
                </p>
              </div>
            </StackingCard>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
};

export default StacksSection;
