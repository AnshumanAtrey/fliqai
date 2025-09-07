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
    // {theme === "dark"}
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
          <h1 style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: 'Outfit',
            fontSize: '48px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            marginBottom: '16px'
          }}>
            Get in the <span className="relative inline-block">scoop
              <svg 
                className="absolute -bottom-2 left-0 animate-pulse" 
                width="166" 
                height="13" 
                viewBox="0 0 166 13" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: '166px',
                  height: '13px',
                  flexShrink: 0
                }}
              >
                <path 
                  d="M2 11C55.3333 2.33333 162 -2.8 164 11" 
                  stroke="#FF9169" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  fill="#FF9169"
                />
              </svg>
            </span>
          </h1>
          <p style={{
            color: '#000',
            textAlign: 'center',
            fontFamily: 'Outfit',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '160%',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Want to know what a winning uni application looks like? These students nailed it, 
            and now it&apos;s your turn. Dive in and learn from the best.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-6 w-[1094px] h-20 mx-auto">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-[73px] h-[73px] shrink-0 flex items-center justify-center border border-black bg-[#FF9169]">
                <svg width="26.028" height="26.028" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" className="w-[26.028px] h-[26.028px] shrink-0">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search by name, university, or another keyword"
              className="w-full h-20 shrink-0 border border-black bg-[#FFFBF1] pl-[90px] pr-5 outline-none font-outfit text-lg font-medium leading-normal"
              style={{ 
                boxShadow: '4px 4px 0 0 #000',
                fontSize: '18px',
                color: '#000000'
              }}
            />
          </div>

          {/* Filter and Sort Buttons */}
          <div className="flex gap-6 mb-6 w-[1094px] mx-auto justify-start">
            <button className="flex py-3 px-4 justify-center items-center gap-2 border border-black bg-[#FFFBF1] cursor-pointer" style={{ boxShadow: '4px 4px 0 0 #000' }}>
              <svg width="25.997" height="24" viewBox="0 0 24 24" className="w-[25.997px] h-6 shrink-0 fill-black">
                <path d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
              <span className="text-black font-outfit text-lg font-medium leading-normal">Filter</span>
            </button>
            <button className="flex py-3 px-4 justify-center items-center gap-2 border border-black bg-[#FFFBF1] cursor-pointer" style={{ boxShadow: '4px 4px 0 0 #000' }}>
              <svg width="25.997" height="24" viewBox="0 0 24 24" className="w-[25.997px] h-6 shrink-0 fill-black">
                <path d="M3 6h18M7 12h10m-7 6h4" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span className="text-black font-outfit text-lg font-medium leading-normal">Sort</span>
            </button>
          </div>

          {/* Results Info */}
          <div className="flex justify-end items-center mb-6 w-[1094px] mx-auto">
            <div className="flex items-center gap-4">
              <span style={{
                color: '#000',
                fontFamily: 'Outfit',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '150%'
              }}>
                Showing 500+ students - Page 1 of 19
              </span>
              <div className="flex items-center gap-2">
                <button className="inline-flex py-[9px] px-3 items-center gap-[10px] border border-black bg-[#FF9169]" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" className="w-[6px] h-[11px] aspect-[6/11]">
                    <path d="M5.85349 10.146C5.89994 10.1925 5.93678 10.2476 5.96192 10.3083C5.98706 10.369 6 10.4341 6 10.4997C6 10.5654 5.98706 10.6305 5.96192 10.6912C5.93678 10.7519 5.89994 10.807 5.85349 10.8535C5.80704 10.8999 5.75189 10.9368 5.6912 10.9619C5.63051 10.9871 5.56547 11 5.49978 11C5.43409 11 5.36904 10.9871 5.30835 10.9619C5.24766 10.9368 5.19252 10.8999 5.14607 10.8535L0.146627 5.85373C0.100144 5.8073 0.0632687 5.75216 0.0381093 5.69146C0.01295 5.63076 0 5.5657 0 5.5C0 5.4343 0.01295 5.36924 0.0381093 5.30854C0.0632687 5.24784 0.100144 5.1927 0.146627 5.14627L5.14607 0.146521C5.23988 0.052705 5.36711 -2.61535e-09 5.49978 0C5.63244 2.61535e-09 5.75968 0.052705 5.85349 0.146521C5.9473 0.240336 6 0.367577 6 0.500253C6 0.632928 5.9473 0.760169 5.85349 0.853985L1.20713 5.5L5.85349 10.146Z" fill="#000"/>
                  </svg>
                </button>
                <button className="inline-flex py-[9px] px-3 items-center gap-[10px] border border-black bg-[#FF9169]" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none" className="w-[6px] h-[11px] aspect-[6/11]">
                    <path d="M6.36314 5.85373L1.3637 10.8535C1.31725 10.8999 1.2621 10.9368 1.20141 10.9619C1.14072 10.9871 1.07568 11 1.00999 11C0.944298 11 0.879251 10.9871 0.818561 10.9619C0.757871 10.9368 0.702727 10.8999 0.656277 10.8535C0.609827 10.807 0.572981 10.7519 0.547843 10.6912C0.522704 10.6305 0.509766 10.5654 0.509766 10.4997C0.509766 10.4341 0.522704 10.369 0.547843 10.3083C0.572981 10.2476 0.609827 10.1925 0.656277 10.146L5.30263 5.5L0.656277 0.853985C0.562467 0.760169 0.509766 0.632928 0.509766 0.500253C0.509766 0.367577 0.562467 0.240336 0.656277 0.146521C0.750087 0.052705 0.877321 9.88508e-10 1.00999 0C1.14265 -9.88508e-10 1.26989 0.052705 1.3637 0.146521L6.36314 5.14627C6.40962 5.1927 6.4465 5.24784 6.47166 5.30854C6.49682 5.36924 6.50977 5.4343 6.50977 5.5C6.50977 5.5657 6.49682 5.63076 6.47166 5.69146C6.4465 5.75216 6.40962 5.8073 6.36314 5.85373Z" fill="#000"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Cards */}
        <div className="space-y-6">
          {students.map((student, index) => (
            <div 
              key={student.id} 
              className="w-[1094px] h-[391px] shrink-0 border border-black bg-[#FFFBF1] p-6 relative mx-auto cursor-pointer hover:shadow-lg transition-shadow" 
              style={{ boxShadow: '4px 4px 0 0 #000' }}
              onClick={() => window.location.href = '/student-profile'}
            >
              {/* Sticker Overlay */}
              {student.hasSticker && student.sticker && (
                <div className="absolute bottom-2 -right-16 z-10" style={{
                  width: '200px',
                  height: '200px',
                  transform: 'rotate(7.08deg)',
                  filter: 'drop-shadow(1.6px 1.6px 0 #000)'
                }}>
                  <Image
                    src={student.sticker}
                    alt="Achievement Sticker"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="flex gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0 -mt-2">
                  <div className="w-20 h-20 shrink-0 aspect-square rounded-[80px] border border-black overflow-hidden" style={{ background: 'url(/Ellipse\ 2.png) lightgray 50% / cover no-repeat, #D9D9D9' }}>
                    <Image
                      src="/Ellipse 2.png"
                      alt={student.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 style={{
                        color: '#000',
                        fontFamily: 'Outfit',
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                        marginBottom: '8px'
                      }}>
                        {student.name}
                      </h3>
                      <p className="w-[663px]" style={{
                        color: '#5D5237',
                        fontFamily: 'Outfit',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '150%',
                        marginBottom: '12px'
                      }}>
                        {student.stats.replace('GLAs', 'Q&As')}
                      </p>
                      {/* Divider line below stats */}
                      <div className="w-full h-px bg-black mb-3"></div>
                    </div>
                    <button className="flex w-[234px] py-3 px-[10px] justify-center items-center gap-[10px] border border-black bg-[#FF9169]" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                      <span style={{
                        color: '#000',
                        fontFamily: 'Outfit',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal'
                      }}>
                        View {student.name.split(' ')[0]}&apos;s Profile
                      </span>
                    </button>
                  </div>

                  <div className="flex">
                    {/* Left Side - Description */}
                    <div className="flex-1 pr-8">
                      <p style={{
                        color: '#000',
                        fontFamily: 'Outfit',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '150%',
                        marginBottom: '16px',
                        textAlign: 'left'
                      }}>
                        {student.description}
                      </p>
                      
                      {/* Colleges Section */}
                      <div>
                        <p style={{
                          color: '#5D5237',
                          fontFamily: 'Outfit',
                          fontSize: '14px',
                          fontWeight: 400,
                          marginBottom: '8px'
                        }}>Accepted to</p>
                        <div className="inline-flex items-center gap-2 mb-4">
                          {/* First Logo */}
                          <div className="w-[50px] h-[50px] aspect-square bg-white border border-black flex items-center justify-center">
                            <Image
                              src="/mit.png"
                              alt="MIT"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          {/* Harvard Logo - SVG */}
                          <div className="w-[41.468px] h-[49.521px] shrink-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="50" viewBox="0 0 42 50" fill="none">
                              <path d="M0.318604 0.266602H41.787V15.9748C41.787 23.1633 39.1287 38.4455 21.2123 49.7874C21.2123 49.7874 1.80721 41.6404 0.318604 15.9748V0.266602Z" fill="#A51C30"/>
                            </svg>
                          </div>
                          {/* Third Logo */}
                          <div className="w-[50px] h-[50px] aspect-square" style={{ background: 'url(/college.png) lightgray 50% / contain no-repeat' }}></div>
                          {/* Fourth Logo */}
                          <div className="w-[142px] h-20 shrink-0 aspect-[71/40] flex items-center justify-center" style={{ opacity: 0.8 }}>
                            <Image
                              src="/bath.png"
                              alt="Bath"
                              width={142}
                              height={80}
                              className="object-contain"
                            />
                          </div>
                          <span style={{
                            color: '#5D5237',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '150%',
                            marginLeft: '8px'
                          }}>+5 more</span>
                        </div>
                      </div>
                    </div>
                    
                    
                    {/* Right Side - Background Info */}
                    <div className="flex-1">
                      <div className="space-y-1 text-left">
                        <div>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '150%'
                          }}>Background: </span>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '150%'
                          }}>African American male student from USA</span>
                        </div>
                        <div>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '150%'
                          }}>Academic Interests: </span>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '150%'
                          }}>{student.interests}</span>
                        </div>
                        <div>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '150%'
                          }}>SAT: </span>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '150%'
                          }}>{student.sat}</span>
                        </div>
                        <div>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '150%'
                          }}>GPA (W): </span>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '150%'
                          }}>{student.gpa}</span>
                        </div>
                        <div>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: '150%'
                          }}>GPA (UW): </span>
                          <span style={{
                            color: '#000',
                            fontFamily: 'Outfit',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '150%'
                          }}>{student.uwGpa}</span>
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
          <span style={{
            color: '#000',
            fontFamily: 'Outfit',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '150%'
          }}>Page 1 of 19</span>
          <div className="flex gap-2">
            <button className="inline-flex py-[9px] px-3 items-center gap-[10px] border border-black bg-[#FF9169]" style={{ boxShadow: '2px 2px 0 0 #000' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" className="w-[6px] h-[11px] aspect-[6/11]">
                <path d="M5.85349 10.146C5.89994 10.1925 5.93678 10.2476 5.96192 10.3083C5.98706 10.369 6 10.4341 6 10.4997C6 10.5654 5.98706 10.6305 5.96192 10.6912C5.93678 10.7519 5.89994 10.807 5.85349 10.8535C5.80704 10.8999 5.75189 10.9368 5.6912 10.9619C5.63051 10.9871 5.56547 11 5.49978 11C5.43409 11 5.36904 10.9871 5.30835 10.9619C5.24766 10.9368 5.19252 10.8999 5.14607 10.8535L0.146627 5.85373C0.100144 5.8073 0.0632687 5.75216 0.0381093 5.69146C0.01295 5.63076 0 5.5657 0 5.5C0 5.4343 0.01295 5.36924 0.0381093 5.30854C0.0632687 5.24784 0.100144 5.1927 0.146627 5.14627L5.14607 0.146521C5.23988 0.052705 5.36711 -2.61535e-09 5.49978 0C5.63244 2.61535e-09 5.75968 0.052705 5.85349 0.146521C5.9473 0.240336 6 0.367577 6 0.500253C6 0.632928 5.9473 0.760169 5.85349 0.853985L1.20713 5.5L5.85349 10.146Z" fill="#000"/>
              </svg>
            </button>
            <button className="inline-flex py-[9px] px-3 items-center gap-[10px] border border-black bg-[#FF9169]" style={{ boxShadow: '2px 2px 0 0 #000' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none" className="w-[6px] h-[11px] aspect-[6/11]">
                <path d="M6.36314 5.85373L1.3637 10.8535C1.31725 10.8999 1.2621 10.9368 1.20141 10.9619C1.14072 10.9871 1.07568 11 1.00999 11C0.944298 11 0.879251 10.9871 0.818561 10.9619C0.757871 10.9368 0.702727 10.8999 0.656277 10.8535C0.609827 10.807 0.572981 10.7519 0.547843 10.6912C0.522704 10.6305 0.509766 10.5654 0.509766 10.4997C0.509766 10.4341 0.522704 10.369 0.547843 10.3083C0.572981 10.2476 0.609827 10.1925 0.656277 10.146L5.30263 5.5L0.656277 0.853985C0.562467 0.760169 0.509766 0.632928 0.509766 0.500253C0.509766 0.367577 0.562467 0.240336 0.656277 0.146521C0.750087 0.052705 0.877321 9.88508e-10 1.00999 0C1.14265 -9.88508e-10 1.26989 0.052705 1.3637 0.146521L6.36314 5.14627C6.40962 5.1927 6.4465 5.24784 6.47166 5.30854C6.49682 5.36924 6.50977 5.4343 6.50977 5.5C6.50977 5.5657 6.49682 5.63076 6.47166 5.69146C6.4465 5.75216 6.40962 5.8073 6.36314 5.85373Z" fill="#000"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}