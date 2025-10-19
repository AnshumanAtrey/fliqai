'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

// Import mentor images
import Profile1 from '../assets/people/1c62e107e82d51a928798e52d7507e65d3fd60dd.jpg';
import Profile2 from '../assets/people/1db2b8ad88ae181ad62d4c2c53de3b6f0bc2279e.jpg';
import Profile3 from '../assets/people/784543ad44da90e1e39548e0ccd382944f64d3e7.jpg';
import Profile4 from '../assets/people/975c971c8e833cc283b0d8f59b29527980768250.jpg';
import Profile5 from '../assets/people/9787d0f030304efcd62fdcabaff5958bc3b6ea84.jpg';
import Profile6 from '../assets/people/f23eb893348f59a0eef3df0739393d997b419cfd.jpg';

const mentors = [
  // Top left
  { name: 'Allison Griffith', desc: 'CompSci Major @ Harvard', img: Profile1, style: 'top-[64px] left-[48px]' },
  { name: 'Vikash Kumar', desc: 'CompSci Major @ Bath', img: Profile3, style: 'top-[400px] -left-[36px]' },
  { name: 'James Medley', desc: 'Art Major @ Stanford', img: Profile5, style: 'bottom-[52px] left-[56px]' },
  // Top right
  { name: 'Jason Akimofori', desc: 'Physics Major @ UCL', img: Profile2, style: 'top-[64px] right-[48px]' },
  { name: 'Alex Dawkes', desc: 'Business Major @ Oxford', img: Profile4, style: 'top-[380px] right-[180px]' },
  { name: 'Tim McLovin', desc: 'Literature Major @ Harvard', img: Profile6, style: 'bottom-[52px] right-[56px]' },
];

// Only 4 images for mobile
const mobileMentors = [
  { name: 'Allison Griffith', desc: 'CompSci Major @ Harvard', img: Profile1 },
  { name: 'Jason Akimofori', desc: 'Physics Major @ UCL', img: Profile2 },
  { name: 'Vikash Kumar', desc: 'CompSci Major @ Bath', img: Profile3 },
  { name: 'Alex Dawkes', desc: 'Business Major @ Oxford', img: Profile4 },
];

export default function ShareGotYouInSection() {
  return (
    <section className="relative w-full bg-[#FAF6F2] min-h-[600px] md:min-h-[900px] pb-10 md:pb-[100px] flex justify-center overflow-visible">
      {/* Floating mentor images - only on desktop, positioned absolutely */}
      <div className="hidden md:block">
        {mentors.map((m, i) => (
          <FloatingMentorCard key={m.name} {...m} delay={i * 0.45} isAbsolute={true} />
        ))}
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 max-w-[1120px] flex flex-col items-center">
        {/* Heading */}
        <div className="mt-10 md:mt-[80px] mb-6 md:mb-7 w-full max-w-[728px] mx-auto">
          <h2 className="text-[#191919] font-outfit text-2xl md:text-[36px] font-bold mb-2 text-center leading-[110%]">
            Share What Got You In
          </h2>
          <p className="text-[#5D5237] font-outfit text-base md:text-[18px] font-medium leading-[150%] text-center mx-auto max-w-[560px] px-4">
            Upload your admit strategy on Fliq. Earn for your insights. Make college admissions easier for the next wave of students.
          </p>
        </div>

        {/* Center Content */}
        <div className="flex flex-col md:flex-row items-stretch justify-center w-full gap-6 md:gap-[36px]">
          {/* Left: Info stack */}
          <div className="flex flex-col justify-between w-full md:w-[340px] min-h-auto md:min-h-[426px] gap-[10px] flex-shrink-0">
            <FeatureCard
              icon="💵"
              title="Earn Income"
              desc="Top 30% of mentors make over $35/week by sharing their admit insights!"
            />
            <FeatureCard
              icon="⚡"
              title="Super Quick"
              desc="Set up your profile, share your insights and start earning instantly"
            />
            <FeatureCard
              icon="🔒"
              title="Privacy Guaranteed"
              desc="Edit or hide your profile anytime. We keep your privacy first"
            />
          </div>

          {/* Right: Testimonial */}
          <div className="flex flex-col justify-between bg-[#F3EAE1] rounded-[12px] px-4 md:px-6 py-4 md:py-6 w-full md:w-[386.667px] min-h-auto md:min-h-[426px] flex-shrink-0 shadow-[0_2px_16px_0_rgba(0,0,0,0.02)]">
            <p className="text-black/70 font-outfit text-base md:text-[18px] font-normal leading-[150%] mb-4 md:mb-7">
              &quot;Listing my experiences on Fliq was a no brainer. Not only did it help my finances as a college student on a relatively tight budget, but I felt so happy knowing I was helping so many struggling college applicants in need. As an indian high school grad who explored international study options, I can comfortably say I&apos;m glad I&apos;ll never use college counselling again. Fliq is everything I dreamed of and I&apos;m so happy to be able to play my part in making applying for college more fun for the next generation.&quot;
            </p>
            <div className="w-full md:w-[338.667px] h-px bg-[#191919] my-1" />
            <div className="flex gap-4 items-center pt-3">
              <Image src={Profile1} alt="Aisha Khan" width={56} height={56}
                className="rounded-full w-[56px] h-[56px] object-cover border border-[#e2dcd2]" />
              <div className="flex flex-col">
                <div className="text-[#191919] font-outfit text-base md:text-[18px] font-semibold leading-[150%]">
                  Aisha Khan
                </div>
                <div className="text-[#191919] font-outfit text-sm md:text-[16px] font-normal leading-[150%]">
                  Junior Year Student
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 md:mt-12 flex justify-center w-full mb-12 md:mb-0">
          <button className="px-6 py-4 rounded-xl bg-[#191919] border border-[#191919] text-white font-outfit text-base font-medium hover:bg-[#333] transition-colors w-full md:w-auto">
            Upload your profile
          </button>
        </div>

        {/* Mobile mentor images - Grid layout below button with same styling as desktop */}
        <div className="md:hidden grid grid-cols-2 gap-4 w-full max-w-[343px] mx-auto">
          {mobileMentors.map((m, i) => (
            <div key={`mobile-${m.name}`} className="w-full h-[150px]">
              <div 
                className="relative w-full h-full"
                style={{
                  borderRadius: 12,
                  animationDelay: `${i * 0.45}s`
                }}
              >
                <div className="relative w-full h-full rounded-[12px] float-animate shadow-md overflow-hidden bg-gradient-to-b from-transparent to-black">
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={180}
                    height={225}
                    className="object-cover w-full h-full"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 rounded-[12px]"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, #000 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                  {/* Text */}
                  <div className="absolute bottom-2 left-0 w-full px-2">
                    <div className="text-white font-outfit text-[12px] font-semibold leading-[16px] drop-shadow">
                      {m.name}
                    </div>
                    <div className="text-white font-outfit text-[10px] font-normal opacity-95 leading-[14px]">
                      {m.desc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Float keyframes style */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-18px);}
        }
        .float-animate {
          animation: float 7.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

function FloatingMentorCard({ img, name, desc, style = '', delay = 0, isAbsolute = true }: {
  img: StaticImageData;
  name: string;
  desc: string;
  style?: string;
  delay?: number;
  isAbsolute?: boolean;
}) {
  return (
    <div
      className={`${isAbsolute ? 'absolute' : 'relative'} ${isAbsolute ? style : ''} w-full md:w-[180px] h-[150px] md:h-[225px] ${isAbsolute ? 'z-0' : 'z-10'}`}
      style={{
        opacity: isAbsolute ? 0.7 : 1,
        borderRadius: 12,
        animationDelay: `${delay}s`
      }}
    >
      <div className="relative w-full h-full rounded-[12px] float-animate shadow-md overflow-hidden bg-gradient-to-b from-transparent to-black">
        <Image
          src={img}
          alt={name}
          width={180}
          height={225}
          className="object-cover w-full h-full"
        />
        {/* Overlay */}
        <div className="absolute inset-0 rounded-[12px]"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, #000 100%)',
            pointerEvents: 'none'
          }}
        />
        {/* Text */}
        <div className="absolute bottom-2 md:bottom-4 left-0 w-full px-2 md:px-4">
          <div className="text-white font-outfit text-[12px] md:text-[15px] font-semibold leading-[16px] md:leading-[20px] drop-shadow">
            {name}
          </div>
          <div className="text-white font-outfit text-[10px] md:text-xs font-normal opacity-95 leading-[14px] md:leading-[17px]">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

// FeatureInfoCard
function FeatureCard({ icon, title, desc }: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-start gap-[12px] w-full px-4 md:px-6 py-3 md:py-4 rounded-[12px] bg-[#F4EAE1]">
      <span className="flex items-center justify-center text-2xl w-8 h-8" style={{width:"32px",height:"32px"}}>{icon}</span>
      <div className="w-full text-[#191919] font-outfit text-lg md:text-[20px] font-medium leading-[150%]">
        {title}
      </div>
      <div className="w-full text-black/70 font-outfit text-base md:text-[18px] font-normal leading-[150%]">
        {desc}
      </div>
    </div>
  );
}
