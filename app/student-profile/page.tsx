"use client";

import Image from "next/image";
import Header from "../component/header";
import ExamTimeline from "@/components/ExamTimeline";
import ExtracurricularsDashboard from "@/components/ExtracurricularsDashboard";
import AwardsSection from "@/components/AwardsSection";
import EssaysSection from "@/components/EssaysSection";
import QuestionsAnswersSection from "@/components/QuestionsAnswersSection";

export default function StudentProfile() {
  return (
    <div className="min-h-screen bg-[#FFFBF1] pb-4">
      {/* Header with Navigation */}
      <Header />

      {/* Back to Student Catalogue */}
      <div className="px-[90px] pt-12 pb-2">
        <button className="flex items-center gap-2 text-[#5D5237] hover:opacity-80 transition-opacity">
        <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_1_332)">
          <rect width="30" height="29" fill="#FF9169"/>
          <rect x="0.5" y="0.5" width="29" height="28" stroke="black"/>
          <path d="M17.5 8.75C17.6989 8.75006 17.8896 8.82908 18.0303 8.96973C18.1709 9.11037 18.2499 9.30112 18.25 9.5C18.25 9.69886 18.1708 9.8896 18.0303 10.0303V10.0312L13.5605 14.5L18.0303 18.9688V18.9697C18.0998 19.0393 18.1557 19.122 18.1934 19.2129C18.231 19.3038 18.25 19.4016 18.25 19.5C18.25 19.5984 18.231 19.6962 18.1934 19.7871C18.1557 19.8781 18.0999 19.9606 18.0303 20.0303C17.9606 20.0999 17.8781 20.1557 17.7871 20.1934C17.6962 20.231 17.5984 20.25 17.5 20.25C17.4016 20.25 17.3038 20.231 17.2129 20.1934C17.122 20.1557 17.0393 20.0998 16.9697 20.0303L11.9697 15.0303C11.9002 14.9607 11.8453 14.878 11.8076 14.7871C11.7699 14.6961 11.75 14.5986 11.75 14.5C11.75 14.4014 11.7699 14.3039 11.8076 14.2129C11.8453 14.122 11.9002 14.0393 11.9697 13.9697L16.9697 8.96973C17.1104 8.82917 17.3011 8.75 17.5 8.75Z" fill="black" stroke="black" stroke-width="0.5"/>
          </g>
          <defs>
          <filter id="filter0_d_1_332" x="0" y="0" width="32" height="31" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="2" dy="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_332"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_332" result="shape"/>
          </filter>
          </defs>
        </svg>

          <span className="font-outfit text-sm">Back to Student Catalogue</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 border-2 border-black">
        {/* University Header */}
        <div className="mb-8 flex justify-center">
          <div className="w-full h-[374px]">
            <Image 
              src="/bath_profile.png" 
              alt="University of Bath" 
              width={1286} 
              height={374} 
              className="w-full h-full object-fill"
              priority
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white border-2 border-black p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Section - Text Content */}
            <div className="flex-1">
              <div className="space-y-6">
                {/* Name and University */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 font-outfit mb-2">Rebecca Reeves</h1>
                  <p className="text-lg text-gray-600">University of Bath &bull; Class of 2027</p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#FFC3A9] text-[#000] text-sm font-medium px-4 py-1.5 border border-black flex items-center">
                    International Student
                  </span>
                  <span className="bg-[#FFC3A9] text-[#000] text-sm font-medium px-4 py-1.5 border border-black flex items-center">
                    Low Income
                  </span>
                  <span className="bg-[#FFC3A9] text-[#000] text-sm font-medium px-4 py-1.5 border border-black flex items-center">
                    Recruited Athlete
                  </span>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <h3 className="font-outfit font-semibold text-gray-900 text-lg">About Me</h3>
                  <p className="text-gray-600 leading-relaxed">
                    I&apos;m a first-year Computer Science student at the University of Bath with a passion for AI and machine learning. 
                    I love solving complex problems and building applications that make a difference. In my free time, I contribute 
                    to open-source projects and mentor aspiring developers.
                  </p>
                </div>

                {/* University Admissions */}
                <div className="pt-2">
                  <h3 className="font-outfit font-semibold text-gray-900 text-lg mb-3">University Admissions</h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    {[
                      { id: 'mit', src: '/mit.png', alt: 'MIT', width: 32, height: 32 },
                      { id: 'harvard', src: '/harvard.png', alt: 'Harvard', width: 32, height: 32 },
                      { id: 'stanford', src: '/college.png', alt: 'Stanford', width: 32, height: 32 },
                      { id: 'bath', src: '/bath.png', alt: 'University of Bath', width: 64, height: 64 }
                    ].map((uni) => (
                      <div key={uni.id} className="w-12 h-12 bg-white overflow-hidden flex items-center justify-center">
                        <Image 
                          src={uni.src} 
                          alt={uni.alt}
                          width={uni.width} 
                          height={uni.height} 
                          className="object-contain"
                        />
                      </div>
                    ))}
                    <span className="text-gray-400 text-sm font-medium">+5 more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Profile Photo */}
            <div className="lg:w-80 flex-shrink-0 flex items-center justify-center">
              <div className="relative w-full max-w-[455px] h-[455px] overflow-hidden border-2 border-black">
                <Image
                  src="/profile-pic-1.jpg"
                  alt="Rebecca Reeves"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Full Width */}
        <div className="mt-8 pt-6 border-t-2 mb-16 ">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {[
              { value: '5', label: 'Awards' },
              { value: '10', label: 'Activities' },
              { value: '10', label: 'Q&As' },
              { value: '8', label: 'AP/IBs' }
            ].map((stat, index) => (
              <div key={index} className="bg-[#FFE3D4] border-2 border-black p-4 h-[150px] flex flex-col justify-center items-center gap-2">
                <div className="text-4xl font-bold text-[#000] font-outfit">{stat.value}</div>
                <div className="text-[#000] text-xl font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Academics Section */}
        <div className="bg-white border-2 border-black p-8 mb-12">
          <h2 className="font-outfit text-3xl font-bold text-black p-8 mb-12">Academics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Personal Information */}
            <div className="bg-[#FFC3A9] p-6 border-2 border-black text-[#000]">
              <h3 className="font-outfit font-bold text-lg mb-4 pb-2 border-b-2 border-black">Personal Information</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Race:</span>
                  <span className="font-bold">African American</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Gender:</span>
                  <span className="font-bold">Female</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">School Type:</span>
                  <span className="font-bold">Private</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Legacy:</span>
                  <span className="font-bold">No</span>
                </div>
              </div>
            </div>
            
            {/* Rebecca's Grades */}
            <div className="bg-[#FFE3D4] p-6 border-2 border-black text-[#000]">
              <h3 className="font-outfit font-bold text-lg mb-6 pb-2 border-b-2 border-black">Rebecca&apos;s Grades</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Calc</span>
                  <span className="font-semibold">B</span>
                </div>
                <div className="flex justify-between">
                  <span>Biology</span>
                  <span className="font-semibold">A</span>
                </div>
                <div className="flex justify-between">
                  <span>Chemistry</span>
                  <span className="font-semibold">A</span>
                </div>
                <div className="flex justify-between">
                  <span>History</span>
                  <span className="font-semibold">B</span>
                </div>
                <div className="flex justify-between">
                  <span>SAT</span>
                  <span className="font-semibold">1400</span>
                </div>
              </div>
            </div>

            {/* GPA Information */}
            <div className="space-y-4">
              {/* Average GPA */}
              <div className="bg-[#FFE3D4] p-4 border-2 border-black text-[#000]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Average GPA</span>
                  <span className="font-bold">3.71</span>
                </div>
                <div className="w-full bg-gray-200 h-4 border border-black">
                  <div className="bg-gray-400 h-full" style={{ width: '74.2%' }}></div>
                </div>
              </div>
              {/* Rebecca's GPA */}
              <div className="bg-[#FFE3D4] p-4 border-2 border-black text-[#000]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Rebecca&apos;s GPA</span>
                  <span className="font-bold">3.92</span>
                </div>
                <div className="w-full bg-gray-200 h-4 border border-black">
                  <div className="bg-[#FF8C42] h-full" style={{ width: '78.4%' }}></div>
                </div>
              </div>
              {/* GPA Comparison */}
              <div className="bg-[#FFE3D4] p-4 border-2 border-black text-[#000]">
                <p className="text-sm">
                  <span className="font-bold">Rebecca&apos;s GPA is higher</span> than the average GPA of admits at this uni
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Timeline Section */}
        <div className="mt-12 mb-16">
          <ExamTimeline />
        </div>

        {/* Extracurriculars Dashboard */}
        <div className="mt-12 mb-16">
          <ExtracurricularsDashboard />
        </div>

        {/* Awards Section */}
        <div className="mt-12">
          <AwardsSection />
        </div>

        {/* Essays Section */}
        <div className="mt-12">
          <EssaysSection />
        </div>

        {/* Questions & Answers Section */}
        <div className="mt-12">
          <QuestionsAnswersSection />
        </div>
      </main>
    </div>
  );
}