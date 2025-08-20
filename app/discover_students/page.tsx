"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../component/header";

const SearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const FilterIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
  </svg>
);

const LeftArrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
  </svg>
);

const RightArrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

const MoonIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

const SunIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

export default function DiscoverStudents() {
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bg = theme === 'dark' ? '/bg-black.svg' : '/bg-white.svg';
      document.body.style.backgroundImage = `url('${bg}')`;
      document.body.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundSize = 'auto';
      document.body.style.backgroundColor = theme === 'dark' ? '#0F0D0E' : '#FFFBF1';
    }
  }, [theme]);

  const bgColor = theme === 'dark' ? 'bg-[#0F0D0E]' : 'bg-[#FFFBF1]';
  const textColor = theme === 'dark' ? 'text-[#FFFBF1]' : 'text-[#5D5237]';
  const cardBg = theme === 'dark' ? 'bg-[#231F20]' : 'bg-[#FFFFFF]';

  const students = [
    {
      id: 1,
      name: "Jordan Hughes",
      stats: "38 Essays | 11 Colleges | 5 Awards | 10 Activities | 10 GLAs | 8 AP/IBs",
      description: "Economics & Political Science student at Stanford University | 500K in Scholarships | Profile includes Research and Summer Research Email Templates",
      background: "African American male student from USA",
      interests: "Computer Science, Artificial Intelligence, Robotics",
      sat: "1580",
      gpa: "4.8",
      uwGpa: "4.5",
      profileImage: "/profile.png",
      colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
      sticker: "/sticker1.png",
      hasSticker: true
    },
    {
      id: 2,
      name: "Sofia Martinez",
      stats: "25 Essays | 8 Colleges | 3 Awards | 7 Activities | 4 GLAs | 5 AP/IBs",
      description: "Biology & Environmental Studies student at UC Berkeley | 300K in Scholarships | Profile includes Personal Statement and Research Proposal Templates",
      background: "Hispanic female student from Mexico",
      interests: "Environmental Science, Sustainability, Renewable Energy",
      sat: "1560",
      gpa: "4.2",
      uwGpa: "4.0",
      profileImage: "/profile.png",
      colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
      hasSticker: false
    },
    {
      id: 3,
      name: "Mei Wong",
      stats: "30 Essays | 12 Colleges | 6 Awards | 9 Activities | 5 GLAs | 7 AP/IBs",
      description: "Business Administration student at Harvard University | 700K in Scholarships | Profile includes Cover Letter and Internship Guide",
      background: "Asian American female student from Canada",
      interests: "Business, Finance, Marketing",
      sat: "1590",
      gpa: "4.6",
      uwGpa: "4.3",
      profileImage: "/profile.png",
      colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
      hasSticker: false
    },
    {
      id: 4,
      name: "Liam Johnson",
      stats: "40 Essays | 15 Colleges | 8 Awards | 12 Activities | 6 GLAs | 9 AP/IBs",
      description: "Physics & Astronomy student at MIT | 1M in Scholarships | Profile includes Research Paper and Conference Presentation Guidelines",
      background: "Caucasian male student from Australia",
      interests: "Physics, Astronomy, Mathematics",
      sat: "1600",
      gpa: "4.9",
      uwGpa: "4.6",
      profileImage: "/profile.png",
      colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
      sticker: "/sticker2.png",
      hasSticker: true
    }
  ];

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Header */}
      <Header />

      {/* Theme Toggle Button */}
      <button
        aria-label="Toggle theme"
        className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg p-4 bg-[#FFFBF1] dark:bg-[#231F20] border border-[#FF9269] hover:scale-110 transition-transform"
        style={{ boxShadow: '0 2px 16px 0 #0002' }}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? SunIcon : MoonIcon}
      </button>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${textColor}`}>
            Get the inside <span className="underline decoration-[#FF9269]">scoop</span>
          </h1>
          <p className={`text-lg ${textColor} max-w-2xl mx-auto`}>
            Want to know what a winning uni application looks like? These students nailed it, 
            and now it&apos;s your turn. Dive in and learn from the best.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="text-[#FF9269]">
                {SearchIcon}
              </div>
            </div>
            <input
              type="text"
              placeholder="Search by name, university, or another keyword"
              className={`w-full pl-12 pr-4 py-4 ${theme === 'dark' ? 'bg-[#231F20] text-[#FFFBF1]' : 'bg-white text-[#5D5237]'} border border-black focus:outline-none focus:ring-2 focus:ring-[#FF9269]`}
            />
          </div>

          {/* Filter and Sort Buttons */}
          <div className="flex gap-4 mb-6">
            <button className={`flex items-center gap-2 px-4 py-2 ${textColor} border border-black card hover:opacity-90 transition-opacity`}>
              {FilterIcon}
              <span>Filter</span>
            </button>
            <button className={`flex items-center gap-2 px-4 py-2 ${textColor} border border-black card hover:opacity-90 transition-opacity`}>
              <span>Sort</span>
            </button>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-6">
            <span className={`text-sm ${textColor}`}>
              Showing 500+ students - Page 1 of 19
            </span>
            <div className="flex gap-2">
              <button className="w-8 h-8 bg-[#FF9269] text-white flex items-center justify-center font-bold">
                1
              </button>
              <button className={`w-8 h-8 ${cardBg} ${textColor} border border-black flex items-center justify-center hover:bg-[#FF9269] hover:text-white transition-colors`}>
                2
              </button>
            </div>
          </div>
        </div>

        {/* Student Cards */}
        <div className="space-y-6">
          {students.map((student, index) => (
            <div key={student.id} className={`${cardBg} border border-black card p-6 relative`}>
              {/* Sticker Overlay */}
              {student.hasSticker && student.sticker && (
                <div className="absolute top-4 right-4 z-10">
                  <Image
                    src={student.sticker}
                    alt="Achievement Sticker"
                    width={80}
                    height={80}
                    className="drop-shadow-lg"
                  />
                </div>
              )}

              <div className="flex gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-black">
                    <Image
                      src={student.profileImage}
                      alt={student.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${textColor} mb-1`}>
                        {student.name}
                      </h3>
                      <p className={`text-sm ${textColor} opacity-80 mb-3`}>
                        {student.stats}
                      </p>
                    </div>
                    <button 
                      className="px-4 py-2 bg-[#FF9269] text-black font-medium hover:opacity-90 transition-opacity"
                      style={{border: '1px solid #000'}}
                    >
                      View {student.name.split(' ')[0]}&apos;s Profile
                    </button>
                  </div>

                  <p className={`${textColor} mb-4 text-sm leading-relaxed`}>
                    {student.description}
                  </p>

                  <div className="flex justify-between">
                    {/* Left Side - Colleges */}
                    <div>
                      <p className={`text-xs ${textColor} opacity-70 mb-2`}>Accepted to</p>
                      <div className="flex gap-2 items-center mb-4">
                        {student.colleges.map((college, idx) => (
                          <div key={idx} className="w-8 h-8 bg-white rounded border border-black flex items-center justify-center">
                            <Image
                              src={college}
                              alt="College"
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                        ))}
                        <span className={`text-xs ${textColor} opacity-70 ml-2`}>+5 more</span>
                      </div>
                    </div>

                    {/* Right Side - Stats */}
                    <div className="text-right">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                        <div>
                          <p className={`text-xs ${textColor} opacity-70`}>Background:</p>
                          <p className={`${textColor} font-medium`}>{student.background}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${textColor} opacity-70`}>Academic Interests:</p>
                          <p className={`${textColor} font-medium`}>{student.interests}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${textColor} opacity-70`}>SAT:</p>
                          <p className={`${textColor} font-medium`}>{student.sat}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${textColor} opacity-70`}>GPA (W):</p>
                          <p className={`${textColor} font-medium`}>{student.gpa}</p>
                        </div>
                        <div>
                          <p className={`text-xs ${textColor} opacity-70`}>GPA (UW):</p>
                          <p className={`${textColor} font-medium`}>{student.uwGpa}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-4">
          <span className={`text-sm ${textColor}`}>Page 1 of 19</span>
          <div className="flex gap-2">
            <button className={`w-8 h-8 ${cardBg} ${textColor} border border-black flex items-center justify-center hover:bg-[#FF9269] hover:text-white transition-colors`}>
              {LeftArrowIcon}
            </button>
            <button className="w-8 h-8 bg-[#FF9269] text-white flex items-center justify-center font-bold">
              1
            </button>
            <button className={`w-8 h-8 ${cardBg} ${textColor} border border-black flex items-center justify-center hover:bg-[#FF9269] hover:text-white transition-colors`}>
              {RightArrowIcon}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}