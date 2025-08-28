'use client';

import { useState } from 'react';
import Image from 'next/image';

// NOTE: Ensure you have the 'Outfit' and 'Figtree' fonts configured in your project.
// NOTE: All image paths like '/college_profile.png' assume the images are in the '/public' directory.

// Helper component for the main orange CTA buttons
const CtaButton = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <button
    className={`w-full border border-black bg-[#FF9169] py-2 px-4 font-outfit text-sm font-semibold text-black shadow-[2px_2px_0_0_#000] transition-transform hover:translate-y-px hover:shadow-[1px_1px_0_0_#000] ${className}`}
  >
    {children}
  </button>
);

// Helper component for the donut charts in the Roadmap
const DonutChart = ({ data, size = 250 }: { data: { name: string; value: number; color: string }[]; size?: number }) => {
  const conicGradient = data.reduce((acc, segment) => {
    const end = acc.lastAngle + (segment.value / 100) * 360;
    acc.str += `, ${segment.color} ${acc.lastAngle}deg ${end}deg`;
    acc.lastAngle = end;
    return acc;
  }, { str: '', lastAngle: 0 }).str.substring(2);

  return (
    <div
      className="relative rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `conic-gradient(${conicGradient})`,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-8">
        {data.map((segment) => (
          <div
            key={segment.name}
            className="border border-black bg-white px-2 py-0.5 font-outfit text-xs font-semibold shadow-[2px_2px_0_0_#000]"
          >
            {segment.name} - {segment.value}%
          </div>
        ))}
      </div>
    </div>
  );
};

// Main University Profile Component
export default function USUniversityProfile() {
  const [activeTab, setActiveTab] = useState<'college' | 'roadmap'>('college');
  
  const readinessData = {
    average: [
      { name: 'Personal Projects', value: 8, color: '#F97066' },
      { name: 'Extracurriculars', value: 15, color: '#FDB022' },
      { name: 'Academics', value: 48, color: '#66B2F9' },
      { name: 'Test Scores', value: 35, color: '#32D583' },
    ],
    you: [
      { name: 'Personal Projects', value: 9, color: '#F97066' },
      { name: 'Extracurriculars', value: 8, color: '#FDB022' },
      { name: 'Academics', value: 32, color: '#66B2F9' },
      { name: 'Test Scores', value: 55, color: '#32D583' },
    ]
  };

  const extracurriculars = [
    { name: 'Leadership', image: '/leadership.png', status: 'Exceptional', met: true },
    { name: 'Research', image: '/research.png', status: 'Below Average', met: false },
    { name: 'Awards / Competitions', image: '/awards.png', status: 'Above Average', met: true },
    { name: 'Teamwork', image: '/teamwork.png', status: 'Above Average', met: true },
    { name: 'Creative Arts', image: '/creative-arts.png', status: 'Exceptional', met: true },
    { name: 'Athletics', image: '/athletics.png', status: 'Below Average', met: false },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF1] p-4 font-outfit sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-4">
          <Image src="/back.svg" alt="Back Arrow" width={24} height={24} />
          <span className="font-outfit text-sm text-black">← Back to Browse Universities</span>
        </div>

        <div className="border border-black bg-[#FFFBF1] p-6 shadow-[4px_4px_0_0_#000]">
          
          <div className="relative flex flex-col gap-8 lg:flex-row">
            <Image 
              src="/college_profile.png" 
              alt="University Campus" 
              width={385} height={385} 
              className="h-[385px] w-[385px] shrink-0 border border-black object-cover"
            />

            <div className="flex-1">
                <div className="absolute top-0 right-0 border border-black bg-white py-2 px-4 shadow-[2px_2px_0_0_#000]">
                    <p className="text-center font-outfit text-base font-medium leading-[140%] text-black">72% Overall Match</p>
                </div>
                
                <h1 className="font-outfit text-3xl font-bold text-black">Arizona State University</h1>
                <p className="mt-2 font-outfit text-lg leading-[150%] text-[#5D5237]">Tempe, Arizona, USA | #174 QS World Rankings</p>
                <div className="my-4 h-[1px] w-full bg-black"></div>

                <div className="flex flex-col items-start gap-6 md:flex-row md:justify-between">
                    <div>
                        <p className="mb-4 font-outfit text-lg font-medium leading-[150%] text-[#5D5237]">Estimated Fit Breakdown:</p>
                        <div className="flex h-32 w-[280px] items-end justify-between gap-4">
                            {[
                                { label: 'Academics', height: '93%', color: '#32D583' },
                                { label: 'Finances', height: '39%', color: '#F97066' },
                                { label: 'Location', height: '68%', color: '#FDB022' },
                                { label: 'Culture', height: '91%', color: '#32D583' },
                            ].map(bar => (
                                <div key={bar.label} className="flex h-full w-1/4 flex-col items-center justify-end gap-2">
                                <p className="font-figtree text-sm font-bold" style={{color: bar.color}}>{bar.height}</p>
                                <div className="w-full border border-black shadow-[2px_2px_0_0_#000]" style={{ height: bar.height, background: bar.color }}></div>
                                <p className="font-outfit text-xs text-[#5D5237]">{bar.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex h-fit w-full flex-col justify-center gap-4 border border-black bg-white p-6 shadow-[2px_2px_0_0_#000] md:w-[360px]">
                        <p className="font-outfit text-base leading-[140%] text-[#5D5237] text-right">
                        “Arizona State University gave me more than a degree. It gave me a community that challenged me, inspired me, and prepared me to make a real impact”
                        </p>
                        <div className="h-[1px] w-full bg-black"></div>
                        <div className="flex items-center justify-end gap-3">
                        <div className="text-right">
                            <p className="font-outfit text-sm font-semibold leading-[120%] text-[#FF9169]">David Kim</p>
                            <p className="font-outfit text-xs text-[#5D5237]">BSc Business, Class of 2025</p>
                        </div>
                        <Image src="/image.png" alt="David Kim" width={40} height={40} className="rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="my-8 h-[1px] w-full bg-black"></div>

          <div className="mx-auto flex w-fit border border-black shadow-[2px_2px_0_0_#000]">
            <button
              onClick={() => setActiveTab('college')}
              className={`py-3 px-6 text-center font-outfit text-lg transition-colors ${activeTab === 'college' ? 'bg-[#FF9169] text-black' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              College Info
            </button>
            <div className="w-[1px] bg-black"></div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`py-3 px-6 text-center font-outfit text-lg transition-colors ${activeTab === 'roadmap' ? 'bg-[#FF9169] text-black' : 'bg-white text-black hover:bg-gray-100'}`}
            >
              Roadmap
            </button>
          </div>

          <div className="mt-8">
            {activeTab === 'college' && <CollegeInfo />}
            {activeTab === 'roadmap' && <RoadmapInfo readinessData={readinessData} extracurriculars={extracurriculars}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

// College Info Tab Content
const CollegeInfo = () => (
    <div className="space-y-12">
        {/* Hero Section */}
        <div className="relative h-[638px] w-full">
        <Image
            src="/college_hero.png" // Placeholder for the large college image
            alt="ASU campus hero"
            fill
            className="border border-black object-cover"
        />
        <div className="absolute bottom-0 left-1/2 w-11/12 max-w-4xl -translate-x-1/2 translate-y-1/2 border border-black bg-white p-8 text-center shadow-[4px_4px_0_0_#000]">
            <h2 className="mb-4 font-outfit text-3xl font-bold text-black">Want to join Arizona State University?</h2>
            <p className="mb-6 font-outfit text-lg leading-[150%] text-[#5D5237]">
            Built from patterns across hundreds of students who got in. This roadmap shows what actually gets attention and how to make it work for you.
            </p>
            <CtaButton className="mx-auto max-w-xs !text-base">Guide me in</CtaButton>
        </div>
        </div>

        <div className="pt-24">
        <div className="my-8 h-[1px] w-full bg-black"></div>
        
        {/* General Information Section */}
        <h2 className="mb-6 font-outfit text-3xl font-bold text-black">General Information</h2>
        <div className="flex flex-col gap-6 border border-black bg-white p-6 shadow-[2px_2px_0_0_#000] lg:flex-row">
            <div className="h-[507px] w-full border border-black lg:w-[677px]">
            <Image src="/map.png" alt="Map of ASU" width={677} height={507} className="h-full w-full object-cover"/>
            </div>
            <div className="flex flex-1 flex-col">
            <h3 className="font-outfit text-3xl font-bold text-black">Arizona State University</h3>
            <p className="mt-2 mb-6 font-outfit text-lg leading-[150%] text-[#5D5237]">1151 S Forest Ave, Tempe, AZ, USA</p>
            <h4 className="mb-4 font-outfit text-xl font-bold leading-[150%] text-black">Contact</h4>
            <div className="space-y-3">
                <CtaButton>Visit Website</CtaButton>
                <CtaButton>customerservice@asu.edu</CtaButton>
                <CtaButton>+1 855-278-5080</CtaButton>
            </div>
            </div>
        </div>
        </div>
    </div>
);

// Roadmap Tab Content
const RoadmapInfo = ({ readinessData, extracurriculars }: { readinessData: { average: { name: string; value: number; color: string }[]; you: { name: string; value: number; color: string }[] }, extracurriculars: { name: string; image: string; status: string; met: boolean }[] }) => (
    <div className="space-y-12">
        {/* Readiness Ring */}
        <section>
            <h2 className="font-outfit text-3xl font-bold text-black">Readiness Ring</h2>
            <p className="mt-2 mb-6 font-outfit text-lg text-[#5D5237]">Based on 192 students who got into ASU with similar backgrounds this is how we think you match ASU</p>
            <div className="flex flex-col items-center justify-center gap-12 border border-black bg-white p-8 shadow-[2px_2px_0_0_#000] md:flex-row">
                <div className="flex flex-col items-center gap-4">
                    <DonutChart data={readinessData.average} />
                    <p className="font-outfit font-semibold">Average ASU Student</p>
                </div>
                <p className="text-2xl font-bold">VS</p>
                 <div className="flex flex-col items-center gap-4">
                    <DonutChart data={readinessData.you} />
                    <p className="font-outfit font-semibold">You</p>
                </div>
            </div>
        </section>
        
        {/* Academics Section */}
        <section>
            <h2 className="mb-6 font-outfit text-3xl font-bold text-black">Academics</h2>
            <div className="flex flex-col gap-6 border border-black bg-white p-6 shadow-[2px_2px_0_0_#000] md:flex-row">
                <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                            <span className="font-medium">Avg GPA Requirement</span>
                            <div className="h-6 flex-1 border border-black bg-[#F97066]"></div>
                            <span className="font-bold">3.92</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <span className="font-medium">Your GPA</span>
                            <div className="h-6 flex-1 border border-black bg-[#FDB022]" style={{width: '95%'}}></div>
                            <span className="font-bold">3.71</span>
                        </div>
                    </div>
                     <div>
                        <h3 className="my-4 font-bold">Required Subjects (Your Grade)</h3>
                        <div className="space-y-2">
                            {[{s:'AP Calc', g:'A*'}, {s:'AP Physics', g:'A'}, {s:'AP Maths', g:'B'}, {s:'AP Statistics', g:'A*'}, {s:'Physics', g:'C'}].map(sub => (
                                <div key={sub.s} className="flex justify-between"><p>{sub.s}</p><p className="font-bold">{sub.g}</p></div>
                            ))}
                            <div className="flex justify-between text-red-600"><p>AP Biology</p><p className="font-bold">Not Done</p></div>
                        </div>
                    </div>
                </div>
                 <div className="w-full space-y-3 border border-black bg-gray-50 p-4 md:w-64">
                    <p className="font-bold">AP Computer Science is common among admits - consider adding it.</p>
                    <p className="text-sm text-gray-600">Draw inspiration from how Sofia closed a 0.15 GPA gap</p>
                    <CtaButton className="!text-xs !py-1">Read case study</CtaButton>
                </div>
            </div>
        </section>

        {/* Extracurriculars Section */}
        <section>
            <h2 className="mb-6 font-outfit text-3xl font-bold text-black">Extracurriculars</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {extracurriculars.map(item => (
                <div key={item.name} className={`border bg-white ${item.met ? 'border-black' : 'border-red-500'}`}>
                   <div className="relative h-48">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                   </div>
                   <div className="p-4">
                        <h3 className="flex items-center gap-2 font-bold text-lg">{item.name} {item.met ? '✅' : '❌'}</h3>
                        <p className={`font-semibold ${item.met ? 'text-green-600' : 'text-red-600'}`}>{item.status}</p>
                   </div>
                </div>
              ))}
            </div>
        </section>

         {/* Proof Bank */}
        <section>
            <h2 className="font-outfit text-3xl font-bold text-black">Proof Bank</h2>
             <p className="mt-2 mb-6 font-outfit text-lg text-[#5D5237]">Here are some achievements by admits at this university you can draw inspiration from.</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                    { name: 'Varun Srinivasan', major: 'Business', year: 2023, img: '/proof1.png' },
                    { name: 'Jason Medley', major: 'Computer Science', year: 2024, img: '/proof2.png' },
                    { name: 'Maddie Carter', major: 'Biology', year: 2021, img: '/proof3.png' },
                ].map(prof => (
                    <div key={prof.name} className="border border-black bg-white">
                        <div className="relative h-64">
                             <Image src={prof.img} alt={prof.name} fill className="object-cover" />
                        </div>
                        <div className="space-y-3 p-4">
                            <h3 className="text-xl font-bold">{prof.name}</h3>
                            <p className="text-gray-600">Admitted in {prof.year}, {prof.major}</p>
                            <CtaButton>Full student profile</CtaButton>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
);

