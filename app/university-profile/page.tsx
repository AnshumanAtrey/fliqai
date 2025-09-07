'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../component/header';
import StudentSupportSection from '../component/StudentSupportSection';
import RoadmapCharts from '../component/RoadmapCharts';
import HollowPieCharts from '../component/HollowPieCharts';
import ReadinessRing from '../component/ReadinessRing';
import DynamicRingChart from '../component/DynamicRingChart';

type University = {
  id: number;
  name: string;
  location: string;
  ranking: string;
  image: string;
  qsRank: string;
  quote: string;
  author: string;
  authorImage: string;
  matchPercentage: number;
  chartData: number[];
  about: string;
  programs: string[];
  stats: {
    students: number;
    international: number;
    acceptanceRate: number;
  };
  matchBreakdown: {
    academics: number;
    extracurriculars: number;
    preferences: number;
    requirements: number;
  };
};

export default function UniversityProfile() {
  useEffect(() => {
    // Add custom radio button styles
    const style = document.createElement('style');
    style.textContent = `
      .custom-radio {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #D1D5DB;
        border-radius: 50%;
        margin-right: 8px;
        position: relative;
        vertical-align: middle;
        flex-shrink: 0;
      }
      
      .custom-radio::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #FF9169;
        opacity: 0;
        transition: opacity 0.2s;
      }
      
      input[type="radio"] {
        display: none;
      }
      
      input[type="radio"]:checked + .custom-radio {
        border-color: #FF9169;
      }
      
      input[type="radio"]:checked + .custom-radio::after {
        opacity: 1;
      }
      
      .radio-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-bottom: 8px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up the style element when component unmounts
      document.head.removeChild(style);
    };
  }, []);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<'collegeInfo' | 'roadmap'>('collegeInfo');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const bgColor = theme === 'light' ? 'bg-[#FFFBF1]' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-black' : 'text-white';

  // Mock data for the university
  const university: University = {
    id: 1,
    name: "University of Bath",
    location: "Bath, United Kingdom",
    ranking: "#5 QS World Rankings",
    image: "/college_profile.png",
    qsRank: "QS Overall Rank",
    quote: "The University of Bath gave me more than a degree. It gave me a community that challenged me, supported me, and helped me make a real impact.",
    author: "Jia Yongming, Class of 2020",
    authorImage: "/Ellipse 2.png",
    matchPercentage: 72,
    chartData: [85, 70, 90, 95], // Added missing chartData
    about: "The University of Bath is a public research university in Bath, Somerset, United Kingdom. It received its royal charter in 1966, making it one of the newer universities in the UK. The university is particularly well known for its physical sciences, engineering, mathematics, and technology-related disciplines.",
    programs: [
      "Computer Science",
      "Mechanical Engineering",
      "Business Administration",
      "Psychology",
      "Architecture"
    ],
    stats: {
      students: 18000,
      international: 30,
      acceptanceRate: 20
    },
    matchBreakdown: {
      academics: 85,
      extracurriculars: 70,
      preferences: 90,
      requirements: 95
    }
  };

  const universities: University[] = [university]; // Convert to array for mapping

  return (
    <div className={`min-h-screen ${bgColor} pb-10`}>
      {/* Header */}
      <Header />

      {/* Back to Student Catalogue */}
      <div className="px-[90px] pt-12 ">
        <button className="flex items-center gap-2 text-[#5D5237] hover:opacity-80 transition-opacity">
          <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1_332)">
              <rect width="30" height="29" fill="#FF9169" />
              <rect x="0.5" y="0.5" width="29" height="28" stroke="black" />
              <path d="M17.5 8.75C17.6989 8.75006 17.8896 8.82908 18.0303 8.96973C18.1709 9.11037 18.2499 9.30112 18.25 9.5C18.25 9.69886 18.1708 9.8896 18.0303 10.0303V10.0312L13.5605 14.5L18.0303 18.9688V18.9697C18.0998 19.0393 18.1557 19.122 18.1934 19.2129C18.231 19.3038 18.25 19.4016 18.25 19.5C18.25 19.5984 18.231 19.6962 18.1934 19.7871C18.1557 19.8781 18.0999 19.9606 18.0303 20.0303C17.9606 20.0999 17.8781 20.1557 17.7871 20.1934C17.6962 20.231 17.5984 20.25 17.5 20.25C17.4016 20.25 17.3038 20.231 17.2129 20.1934C17.122 20.1557 17.0393 20.0998 16.9697 20.0303L11.9697 15.0303C11.9002 14.9607 11.8453 14.878 11.8076 14.7871C11.7699 14.6961 11.75 14.5986 11.75 14.5C11.75 14.4014 11.7699 14.3039 11.8076 14.2129C11.8453 14.122 11.9002 14.0393 11.9697 13.9697L16.9697 8.96973C17.1104 8.82917 17.3011 8.75 17.5 8.75Z" fill="black" stroke="black" strokeWidth="0.5" />
            </g>
            <defs>
              <filter id="filter0_d_1_332" x="0" y="0" width="32" height="31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="2" dy="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_332" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_332" result="shape" />
              </filter>
            </defs>
          </svg>

          <span className="font-outfit text-sm">Back to Student Catalogue</span>
        </button>
      </div>
      <div className="w-[1292px] h-full mx-auto border-2 border-black mt-10" style={{ boxShadow: '4px 4px 0 0 #000' }}>
        {/* University cards  */}
        <div className="space-y-6 mx-auto">
          {universities.map((university) => (
            <div key={university.id} className="w-full min-h-[395px] relative" style={{ borderBottom: '1px solid black' }}>
              {/* Overall Match Badge - Top Right Corner */}
              <div className="absolute top-4 right-4 inline-flex py-2 px-4 justify-center items-center gap-2.5 border border-black bg-[#FFFBF1] z-10" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                <span className="text-black font-outfit text-base font-normal leading-normal">{university.matchPercentage}% Overall Match</span>
              </div>
              
              <div className="flex h-full p-6 gap-6">
                {/* Left - University Image */}
                <div className="flex-shrink-0">
                  <div className="w-[345px] h-full border border-black overflow-hidden">
                    <Image
                      src={university.image}
                      alt={university.name}
                      width={345}
                      height={347}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right Side - Split into two sections */}
                <div className="flex-1 flex flex-col">
                  {/* Top Section - University Info */}
                  <div className="border-b border-black pb-6 mb-6">
                    <div>
                      {/* University Name */}
                      <h3 className="text-black font-outfit text-[32px] font-bold leading-normal mb-2">{university.name}</h3>

                      {/* Location and Ranking */}
                      <p className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] mb-2">{university.location}</p>
                      <p className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%]">{university.ranking}</p>
                    </div>
                  </div>

                  {/* Bottom Section - Bar Chart and Quote */}
                  <div className="flex flex-1 justify-between gap-[290px]">
                    {/* Bar Chart */}
                    <div className="flex w-[236px] justify-between items-end">
                      {university.chartData.map((value: number, index: number) => {
                        const colors = ['#32D583', '#F97066', '#FDB022', '#32D583'];
                        const labels = ['Academics', 'Finances', 'Location', 'Culture'];
                        const height = Math.max(30, (value / 100) * 120);
                        return (
                          <div key={index} className="flex flex-col items-center gap-2">
                            {/* Percentage Label with color matching graph */}
                            <span
                              className="text-center font-bold text-sm leading-normal"
                              style={{
                                color: colors[index],
                                fontFamily: 'Figtree',
                                fontSize: '14px'
                              }}
                            >
                              {value}%
                            </span>
                            {/* Bar */}
                            <div
                              className="w-12 border border-black"
                              style={{
                                height: `${height}px`,
                                backgroundColor: colors[index],
                                boxShadow: '2px 2px 0 0 #000'
                              }}
                            ></div>
                            {/* Category Label */}
                            <span
                              className="text-center font-medium leading-[140%]"
                              style={{
                                color: '#000',
                                fontFamily: 'Outfit',
                                fontSize: '12px'
                              }}
                            >
                              {labels[index]}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quote Section */}
                    <div className="flex-1">
                      <div className="h-full w-[350px] py-4 px-6 flex flex-col justify-between border border-black bg-white" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                        <p className="text-[#5D5237] text-right font-outfit text-base font-normal leading-[140%]">
                          &quot;{university.quote}&quot;
                        </p>

                        {/* Divider Line */}
                        <div className="w-full h-px bg-[#5D5237] my-4"></div>

                        {/* Author Info */}
                        <div className="flex items-center gap-3 self-end">
                          <div className="flex flex-col items-end">
                            <span className="text-[#EF622F] text-right font-outfit text-sm font-medium leading-[120%]">
                              {university.author}
                            </span>
                          </div>
                          <div className="w-10 h-10 aspect-square rounded-full overflow-hidden border border-black">
                            <Image
                              src={university.authorImage}
                              alt={university.author}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Buttons and Content */}
        <div className="container mx-auto px-[90px] py-8 w-[452px] my-10">
          {/* Toggle Buttons */}
          <div className="flex mb-8 border border-black" style={{ boxShadow: '2px 2px 0 0 #000' }} >
            <button
              onClick={() => setActiveTab('collegeInfo')}
              className={`px-6 py-3 text-lg font-medium border-b-2 transition-colors ${activeTab === 'collegeInfo'
                ? 'border-[#EF622F] text-black bg-[#EF622F]'
                : 'border-transparent text-[#5D5237] hover:border-gray-300'
                }`}
            >
              College Info
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-6 py-3 text-lg font-medium border-b-2 transition-colors ${activeTab === 'roadmap'
                ? 'border-[#EF622F] text-black bg-[#EF622F]'
                : 'border-transparent text-[#5D5237] hover:border-gray-300'
                }`}
            >
              Roadmap
            </button>
          </div>
        </div>
        <div className="relative">
          {activeTab === 'collegeInfo' ? (
            <div className="relative">
              <div className="w-[90%] h-full mx-auto relative" style={{ borderBottom: "1px solid black" }}>
                <Image
                  src="/bath_Profile.png"
                  alt="University of Bath"
                  width={1286}
                  height={374}
                  className="w-full h-full object-fill"
                />
                {/* Guide Card Overlay */}
                <div className="relative top-[-160px] bottom-8 right-8 w-[585px] h-[262px] bg-white border-2 border-black p-6 text-center flex flex-col justify-center gap-6 z-10 mx-auto" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-black pb-4">Want to join the University of Bath?</h3>
                    <p className="text-sm text-[#5D5237] mt-1">Built from patterns across hundreds of students who got in. This roadmap shows what actually gets attention and how to make it work for you</p>
                  </div>
                  <button
                    className="w-full py-2.5 bg-[#FF9169] text-black hover:bg-black hover:text-[#FF9169] font-medium text-sm border border-black mt-4"
                    style={{ boxShadow: '2px 2px 0 0 #000' }}
                  >
                    View Full Guide
                  </button>
                </div>
              </div>
              <div className="w-[90%] h-full mx-auto relative p-8 pb-10" style={{ borderBottom: "1px solid black" }}>
                <h1 className="text-2xl font-bold text-black py-14">General Information</h1>
                <div className="flex flex-row gap-20 w-full mt-8 bg-white border-2 border-black p-6 justify-between">
                  {/* Map Section */}
                  <div className="w-[60%]">
                    <div className="border-2 border-black" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                      <Image
                        src="/map.png"
                        alt="University of Bath Location"
                        width={600}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="w-[30%] pl-8 my-auto flex flex-col justify-between gap-8">
                    <div className="h-full flex flex-col justify-between">
                      <div className="mb-10">
                        <h2 className="text-3xl text-black font-bold mb-4">University of Bath</h2>
                        <p className="text-black mb-8">
                          University of Bath, Claverton Down campus, Bath, BA2 7AY
                        </p>
                      </div>
                      <p className="text-black mb-8 font-bold">Contact</p>
                      <div className="space-y-4 w-min">
                        <button
                          className="group block w-full py-3 px-6 bg-[#FF9169] text-black hover:bg-black hover:text-[#FF9169] text-start font-medium border-2 border-black transition-colors flex flex-row items-center gap-2"
                          style={{ boxShadow: '2px 2px 0 0 #000' }}
                        >
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-[#FF9169]">
                            <path d="M7.52002 0.689941C6.185 0.689941 4.87996 1.08582 3.76992 1.82752C2.65989 2.56922 1.79473 3.62343 1.28384 4.85683C0.772944 6.09023 0.639272 7.44743 0.899722 8.7568C1.16017 10.0662 1.80305 11.2689 2.74705 12.2129C3.69106 13.1569 4.89379 13.7998 6.20316 14.0602C7.51253 14.3207 8.86973 14.187 10.1031 13.6761C11.3365 13.1652 12.3907 12.3001 13.1324 11.19C13.8741 10.08 14.27 8.77497 14.27 7.43994C14.268 5.65034 13.5562 3.9346 12.2908 2.66916C11.0254 1.40372 9.30962 0.691927 7.52002 0.689941ZM12.7156 6.68994H10.7425C10.6434 5.21917 10.1852 3.79511 9.40815 2.54244C10.2773 2.87904 11.0415 3.44037 11.6226 4.16907C12.2037 4.89777 12.5809 5.7677 12.7156 6.68994ZM7.52002 12.3774C6.93502 11.7018 5.99127 10.3068 5.8044 8.18994H9.23815C9.14478 9.35787 8.77849 10.4876 8.16877 11.4881C7.97696 11.8016 7.75999 12.099 7.52002 12.3774ZM5.8044 6.68994C5.89776 5.52201 6.26405 4.39232 6.87377 3.39182C7.06479 3.07837 7.28091 2.78094 7.52002 2.50244C8.10502 3.17807 9.04877 4.57307 9.23565 6.68994H5.8044ZM5.6319 2.54244C4.85484 3.79511 4.39668 5.21917 4.29752 6.68994H2.3244C2.45915 5.7677 2.83636 4.89777 3.41747 4.16907C3.99858 3.44037 4.76276 2.87904 5.6319 2.54244ZM2.3244 8.18994H4.29752C4.39668 9.66072 4.85484 11.0848 5.6319 12.3374C4.76276 12.0008 3.99858 11.4395 3.41747 10.7108C2.83636 9.98212 2.45915 9.11219 2.3244 8.18994ZM9.40815 12.3374C10.1852 11.0848 10.6434 9.66072 10.7425 8.18994H12.7156C12.5809 9.11219 12.2037 9.98212 11.6226 10.7108C11.0415 11.4395 10.2773 12.0008 9.40815 12.3374Z" fill="currentColor"/>
                          </svg>
                          Visit website
                        </button>

                        <button
                          className="group block w-full py-3 px-6 bg-[#FF9169] text-black hover:bg-black hover:text-[#FF9169] text-start font-medium border-2 border-black transition-colors flex flex-row items-center gap-2"
                          style={{ boxShadow: '2px 2px 0 0 #000' }}
                        >
                          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-[#FF9169]">
                            <path d="M13.02 0.189941H1.02002C0.821107 0.189941 0.630342 0.268959 0.489689 0.409611C0.349037 0.550264 0.27002 0.741029 0.27002 0.939941V9.43994C0.27002 9.77146 0.401716 10.0894 0.636136 10.3238C0.870557 10.5582 1.1885 10.6899 1.52002 10.6899H12.52C12.8515 10.6899 13.1695 10.5582 13.4039 10.3238C13.6383 10.0894 13.77 9.77146 13.77 9.43994V0.939941C13.77 0.741029 13.691 0.550264 13.5503 0.409611C13.4097 0.268959 13.2189 0.189941 13.02 0.189941ZM7.02002 5.42244L2.94814 1.68994H11.0919L7.02002 5.42244ZM4.81939 5.43994L1.77002 8.23494V2.64494L4.81939 5.43994ZM5.92939 6.45744L6.51314 6.99307C6.65148 7.11991 6.83234 7.19028 7.02002 7.19028C7.2077 7.19028 7.38856 7.11991 7.52689 6.99307L8.11064 6.45744L11.0919 9.18994H2.94814L5.92939 6.45744ZM9.22064 5.43994L12.27 2.64494V8.23494L9.22064 5.43994Z" fill="currentColor"/>
                          </svg>
                          admissions@bath.ac.uk
                        </button>

                        <button
                          className="group block w-full py-3 px-6 bg-[#FF9169] text-black hover:bg-black hover:text-[#FF9169] text-start font-medium border-2 border-black transition-colors flex flex-row items-center gap-2"
                          style={{ boxShadow: '2px 2px 0 0 #000' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-[#FF9169]">
                            <path d="M12.52 9.11491L9.5769 7.79554L9.56565 7.79054C9.37434 7.70806 9.16542 7.67486 8.95797 7.69397C8.75052 7.71307 8.55117 7.78388 8.37815 7.89991C8.3539 7.91615 8.33053 7.93367 8.30815 7.95241L6.91377 9.13991C6.10127 8.69929 5.2619 7.86679 4.82065 7.06429L6.0119 5.64804C6.03105 5.62518 6.04879 5.60118 6.06502 5.57616C6.17801 5.40376 6.24661 5.20609 6.26471 5.00075C6.28281 4.79542 6.24986 4.5888 6.16877 4.39929C6.16685 4.39566 6.16518 4.3919 6.16377 4.38804L4.84502 1.43991C4.73678 1.19336 4.55203 0.988216 4.31812 0.854829C4.08422 0.721443 3.81358 0.666905 3.54627 0.699286C2.63901 0.818469 1.80614 1.26383 1.20324 1.9522C0.600328 2.64056 0.268606 3.52485 0.270024 4.43991C0.270024 9.54054 4.4194 13.6899 9.52002 13.6899C10.4351 13.6913 11.3194 13.3596 12.0077 12.7567C12.6961 12.1538 13.1415 11.3209 13.2606 10.4137C13.293 10.1464 13.2385 9.87572 13.1051 9.64181C12.9717 9.40791 12.7666 9.22316 12.52 9.11491ZM9.52002 12.1899C7.46536 12.1874 5.49556 11.3701 4.04269 9.91725C2.58982 8.46438 1.77251 6.49458 1.77002 4.43991C1.76859 3.9221 1.94439 3.41938 2.2682 3.0153C2.59201 2.61122 3.04434 2.3301 3.55002 2.21866L4.72627 4.84366L3.52877 6.26991C3.50942 6.29298 3.49147 6.31719 3.47502 6.34241C3.35699 6.52276 3.2876 6.73056 3.27358 6.94564C3.25956 7.16072 3.3014 7.37577 3.39502 7.56991C3.98377 8.77491 5.1969 9.97991 6.4144 10.5699C6.60984 10.6626 6.82597 10.7029 7.04167 10.687C7.25738 10.6712 7.46527 10.5996 7.64502 10.4793C7.66919 10.463 7.69236 10.4452 7.7144 10.4262L9.11627 9.23429L11.7413 10.4099C11.6298 10.9156 11.3487 11.3679 10.9446 11.6917C10.5406 12.0155 10.0378 12.1913 9.52002 12.1899Z" fill="currentColor"/>
                          </svg>
                          01225 385985
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {/* Courses Recommended For You Section */}
          {activeTab === 'collegeInfo' ? (
            <div className="w-[90%] mx-auto py-10" style={{ borderBottom: "1px solid black" }}>
              <h2 className="text-2xl font-bold text-black mb-6">Courses Recommended For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 text-black gap-6">
                {/* Course Card 1 */}
                <div className="bg-white border-2 border-black p-4" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                  <div className="flex items-center mb-4">
                    <div className="flex -space-x-1 rounded-full overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">BSc Computer Science</h3>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm">4.8 (23)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Learn the fundamentals of computer science and software development with our comprehensive program.
                  </p>
                </div>

                {/* Course Card 2 */}
                <div className="bg-white border-2 border-black p-4" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                  <div className="flex items-center mb-4">
                    <div className="flex -space-x-1 rounded-full overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">MSc Data Science</h3>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm">4.6 (18)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Master data analysis, machine learning, and big data technologies in this advanced program.
                  </p>
                </div>

                {/* Course Card 3 */}
                <div className="bg-white border-2 border-black p-4" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                  <div className="flex items-center mb-4">
                    <div className="flex -space-x-1 rounded-full overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                      <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" width={24} height={24} className="inline-block size-6 rounded-full ring-2 ring-gray-900 outline -outline-offset-1 outline-white/10" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">BEng Mechanical Engineering</h3>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm">4.7 (15)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Develop skills in mechanical systems design, analysis, and manufacturing processes.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          {activeTab === 'roadmap' && (
            <div className="p-8">
              <ReadinessRing />
            </div>
          )}

          {/* Student Life Guides Section */}
          {activeTab === 'collegeInfo' && (
            <div className="w-[90%] mx-auto pt-10 py-20 " style={{ borderBottom: "1px solid black" }}>
              <h2 className="text-2xl font-bold text-black mb-8">Student Life Guides</h2>
              <div className="bg-white border-2 border-black" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                {/* First Guide Card - Text Left, Image Right */}
                <div className="p-6 mb-8 flex flex-col md:flex-row items-center" style={{ borderBottom: "1px solid black" }}>
                  <div className="md:w-1/2 md:pr-6 mb-6 md:mb-0 text-black">
                    <h3 className="text-xl font-bold mb-3">What&apos;s it like to live in South West? Check out our region guide</h3>
                    <p className=" mb-4 ">
                      The South West of England is made up of seven counties, with rural areas surrounding key student cities – from Plymouth and Bournemouth up to Bath, Bristol and Cheltenham & Gloucester.
                    </p>
                    <button className="bg-[#FF9169] text-black px-6 py-2 border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                      Read Article
                    </button>
                  </div>
                  <div className="md:w-1/2 p-4">
                    <div className="relative w-full aspect-square border-[1px] border-black">
                      <Image
                        src="/map2.png"
                        alt="map"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Second Guide Card - Image Left, Text Right */}
                <div className="p-6 flex flex-col md:flex-row-reverse items-center" style={{ borderBottom: "1px solid black" }}>
                  <div className="md:w-1/2 md:pl-6 mb-6 md:mb-0 text-black">
                    <h3 className="text-xl font-bold mb-3">What&apos;s it like to live in South West? Check out our region guide</h3>
                    <p className=" mb-4">
                      The University’s campus is set in rural grounds overlooking the city of Bath and is one of the safest campus sites in the UK. You don&apos;t have to walk far to reach the facilities on campus and you can easily travel between the campus and the city either by foot, bike, bus or car.
                    </p>
                    <button className="bg-[#FF9169] text-black px-6 py-2 border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                      Read Article
                    </button>
                  </div>
                  <div className="md:w-1/2 p-4">
                    <div className="relative w-full aspect-square border-[1px] border-black">
                      <Image
                        src="/college_profile.png"
                        alt="campus life"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex items-center gap-6">
                  <button className="bg-[#FF9169] text-black px-8 py-3 text-lg font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors flex items-center gap-2" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Book an open day
                  </button>
                  <p className="text-gray-600">Visit the University of Bath to see what it&apos;s like on campus</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collegeInfo' && (
            <>
              {/* Browse Courses Section */}
              <div className="w-[90%] mx-auto py-10 text-black" style={{borderBottom:"1px solid black"}}>
                <h2 className="text-2xl font-bold text-black mb-6">Browse courses</h2>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Filters Sidebar */}
                  <div className="w-full md:w-1/4">
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-4">Filter by</h3>
                      
                      {/* Degree Type Filter */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Degree Type</h4>
                        <div className="space-y-2">
                          {['Undergraduate', 'Postgraduate'].map((type) => (
                            <label key={type} className="radio-label">
                              <input 
                                type="radio" 
                                name="degreeType" 
                                defaultChecked={type === 'Undergraduate'}
                              />
                              <span className="custom-radio"></span>
                              <span className="text-black ml-1">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Mode of Study Filter */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Mode of Study</h4>
                        <div className="space-y-2">
                          {['Full-time', 'Part-time', 'Distance Learning'].map((mode) => (
                            <label key={mode} className="radio-label">
                              <input 
                                type="radio" 
                                name="studyMode" 
                                defaultChecked={mode === 'Full-time'}
                              />
                              <span className="custom-radio"></span>
                              <span className="text-black ml-1">{mode}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Courses Grid */}
                  <div className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white border-2 border-black p-2" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                          <div className="relative w-full h-64 border-2 border-black mb-3 bg-gray-200">
                            <Image 
                              src={`/bath_profile.png`}
                              alt={`Course ${item}`} 
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-bold text-lg mb-1 mt-2">
                            {[
                              'Computer Science', 
                              'Business Administration', 
                              'Mechanical Engineering',
                              'Data Science',
                              'Architecture',
                              'Biomedical Sciences'
                            ][item - 1]}
                          </h3>
                          <div className="flex gap-1 text-sm text-gray-600">
                            <p className="text-sm text-gray-600 mb-2">
                              {['BSc', 'MBA', 'BEng', 'MSc', 'BArch', 'BSc'][item - 1]}
                            </p>
                            <span>{['3 years', '2 years', '4 years', '1 year', '5 years', '3 years'][item - 1]}</span>
                            <span>•</span>
                            <span>Full-time</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* View More Button */}
                    <div className="mt-10 mb-8 text-center">
                      <button className="bg-[#FF9169] text-black flex flex-row justify-between items-center gap-2 px-8 py-3 text-lg mt-4 font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors group" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                        <svg className="absolute top-0 left-0 transition-opacity duration-300 group-hover:opacity-0 group-hover:fill-[#FF9169]" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.938 1.21338V9.33838C11.938 9.58702 11.8392 9.82548 11.6634 10.0013C11.4876 10.1771 11.2491 10.2759 11.0005 10.2759C10.7518 10.2759 10.5134 10.1771 10.3375 10.0013C10.1617 9.82548 10.063 9.58702 10.063 9.33838V3.479L1.66374 11.8767C1.48762 12.0528 1.24874 12.1517 0.999673 12.1517C0.750601 12.1517 0.511731 12.0528 0.335611 11.8767C0.15949 11.7005 0.0605469 11.4617 0.0605469 11.2126C0.0605469 10.9635 0.15949 10.7247 0.335611 10.5485L8.73483 2.15088H2.87545C2.62681 2.15088 2.38836 2.05211 2.21254 1.87629C2.03673 1.70048 1.93795 1.46202 1.93795 1.21338C1.93795 0.964738 2.03673 0.726282 2.21254 0.550466C2.38836 0.374651 2.62681 0.275879 2.87545 0.275879H11.0005C11.2491 0.275879 11.4876 0.374651 11.6634 0.550466C11.8392 0.726282 11.938 0.964738 11.938 1.21338Z" fill="currentColor"/>
                        </svg>
                        Show all 182 options
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Student Support Section */}
              <div className="w-[90%] mx-auto py-10">
                <h2 className="text-3xl text-black font-bold mb-8">Student Support</h2>
                <StudentSupportSection />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
