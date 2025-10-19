'use client';

import React from 'react';

// SVG tick icon
const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none" className="inline-block align-middle" style={{width:"19.5px", height:"14.25px"}}>
    <path d="M19.3789 0.75C19.7441 0.750021 20.0943 0.895111 20.3525 1.15332C20.6107 1.41154 20.7559 1.76178 20.7559 2.12695C20.7559 2.49213 20.6107 2.84236 20.3525 3.10059L20.1758 3.27734L20.1738 3.27539L8.35059 15.0986C8.22293 15.2267 8.07126 15.3281 7.9043 15.3975C7.73716 15.4669 7.55792 15.5029 7.37695 15.5029C7.19598 15.5029 7.01674 15.4669 6.84961 15.3975C6.72424 15.3454 6.60735 15.2754 6.50293 15.1895L6.40332 15.0986L1.15332 9.84863C1.02552 9.72082 0.923682 9.56932 0.854492 9.40234C0.785294 9.23528 0.75 9.05582 0.75 8.875C0.75001 8.6942 0.785304 8.51469 0.854492 8.34766C0.923688 8.18071 1.02554 8.02915 1.15332 7.90137C1.28112 7.77358 1.43265 7.67173 1.59961 7.60254C1.76667 7.53334 1.94613 7.49805 2.12695 7.49805C2.30778 7.49805 2.48724 7.53334 2.6543 7.60254C2.82126 7.67173 2.97279 7.77358 3.10059 7.90137L7.37793 12.1787L18.4053 1.15332C18.6635 0.895116 19.0137 0.75 19.3789 0.75Z" fill="#FF9269" stroke="#FF9269" strokeWidth="0.5"/>
  </svg>
);

const timelineSteps = [
  {
    circle: "Today",
    box: {
      title: "You finally stop guessing",
      bullets: [
        "Real admit odds (%) pulled from thousands of admits",
        "Benchmark: you vs the students who actually got in"
      ]
    }
  },
  {
    circle: "1 Month",
    box: {
      title: "You know the playbook, school by school",
      bullets: [
        "Side by side profiles shows essays, EC’s, timelines that got results",
        "You see what each target school expects – no more blind prep"
      ]
    }
  },
  {
    circle: "3 Months",
    box: {
      title: "Essays shaped by proven admit strategies",
      bullets: [
        "A clear blueprint on steps admits actually took, so nothing feels random"
      ]
    }
  }
];

export default function ClarityHitsSection() {
  return (
    <section className="w-full flex justify-center items-center bg-[#FAF6F2] py-16 md:py-[200px] px-4 md:px-[200px]">
      <div className="relative w-full max-w-[1200px] flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-[#191919] text-center font-outfit text-2xl md:text-[40px] font-bold leading-[110%] capitalize mb-3 md:mb-4 mx-auto w-full md:w-[546px]">
          How Fast Clarity Hits With Fliq
        </h2>
        <p className="w-full text-[#191919b3] text-center font-outfit text-base md:text-[18px] font-normal leading-[150%] mb-10 md:mb-[100px] px-4">
          Here&apos;s how fast things change once you see the data
        </p>

        {/* Timeline */}
        <div className="relative w-full max-w-[1020px] flex flex-col items-center mx-auto">
          {/* Timeline dots/circles - hidden on mobile, shown as vertical on mobile */}
          <div className="hidden md:flex relative w-full items-center justify-between mb-[60px] z-10">
            {/* Orange dotted line centered under the circles */}
            <div className="absolute left-[105px] right-[105px] top-1/2 -translate-y-1/2 z-0 flex items-center justify-between pointer-events-none">
              <div className="w-full h-[2px] border-b-2 border-dotted border-[#FF9269]"></div>
            </div>
            
            {timelineSteps.map((item) => (
              <div key={item.circle} className="flex flex-col items-center min-w-[210px] relative">
                <div className="flex px-4 py-2 rounded-full bg-[#F3EAE1] justify-center items-center mb-2">
                  <span className="text-[#191919] text-center font-outfit text-[20px] font-medium leading-[150%]">
                    {item.circle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline card boxes */}
          <div className="relative w-full flex flex-col md:flex-row justify-between items-start gap-6 md:gap-[40px]">
            {timelineSteps.map((item) => (
              <div key={item.circle}
                   className="bg-[#F3EAE1] rounded-[24px] flex flex-col items-center px-6 md:px-8 py-5 md:py-6 gap-4 md:gap-6 w-full md:min-w-[320px] md:max-w-[330px] shadow"
              >
                {/* Mobile timeline label */}
                <div className="md:hidden flex px-4 py-2 rounded-full bg-white justify-center items-center">
                  <span className="text-[#191919] text-center font-outfit text-base font-medium leading-[150%]">
                    {item.circle}
                  </span>
                </div>
                
                <div className="w-full text-[#191919] text-center font-outfit text-xl md:text-[24px] font-semibold mb-2 leading-[150%]">
                  {item.box.title}
                </div>
                <ul className="flex flex-col w-full gap-3 md:gap-4 items-start justify-center">
                  {item.box.bullets.map((bullet: string, bIdx: number) => (
                    <li key={bIdx} className="flex flex-row items-center gap-2 text-[#191919] font-outfit text-base md:text-[18px] font-normal leading-[150%]">
                      <span className="flex items-center justify-center min-w-[19.5px] mr-2"><TickIcon /></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}