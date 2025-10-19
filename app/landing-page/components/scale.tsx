'use client';

import React from 'react';

const scaleStats = [
  {
    big: '3,000+',
    label: 'COLLEGES',
    desc: 'All in one place, find your match'
  },
  {
    big: '18,000+',
    label: 'PROFILES',
    desc: 'Successful admit data analysed'
  },
  {
    big: '100,000+',
    label: 'ESSAYS',
    desc: 'Proven essays you can actually learn from'
  },
  {
    big: '4x',
    label: 'TIME SAVED',
    desc: 'Save time by following proven paths'
  },
];

export default function ScaleOfFliqSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-[#FAF6F2] py-10 md:py-[80px] px-4 md:px-[100px]">
      {/* Headings */}
      <h2 className="text-[#191919] font-outfit text-2xl md:text-[40px] font-bold leading-[110%] capitalize text-center mb-2">
        Scale Of Fliq
      </h2>
      <p className="font-outfit text-base md:text-[18px] font-normal leading-[150%] text-center text-[#191919b3] mb-8 md:mb-[68px] px-4">
        See where we&apos;re headed
      </p>

      {/* Stat Boxes */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-[40px] justify-center w-full max-w-[1320px]">
        {scaleStats.map((item) => (
          <div
            key={item.label}
            className="bg-[#F3EAE1] rounded-[24px] flex flex-col p-[24px] md:p-[30px] items-start gap-12 md:gap-[80px] flex-1 min-w-[230px] md:max-w-[300px]"
          >
            <div className="flex flex-col items-start gap-0 w-full">
              <div className="text-[#191919] font-outfit text-3xl md:text-[40px] font-medium leading-[48px] md:leading-[60px] mb-[2px] text-left">
                {item.big}
              </div>
              <div className="text-[#191919]/50 font-outfit text-sm md:text-[16px] font-semibold leading-[20px] md:leading-[24px] tracking-[.04em] uppercase text-left">
                {item.label}
              </div>
            </div>
            <div className="mt-[-20px] text-[#191919] font-outfit text-base md:text-[18px] font-normal leading-[24px] md:leading-[27px] text-left w-full">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}