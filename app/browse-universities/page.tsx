'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '../component/header';

export default function BrowseUniversities() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const bgColor = theme === 'light' ? 'bg-[#FFFBF1]' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-black' : 'text-white';

  const universities = [
    {
      id: 1,
      name: "University of Bath",
      location: "Bath, United Kingdom",
      ranking: "#5 QS World Rankings",
      image: "/college_profile.png",
      qsRank: "QS Overall Rank",
      quote: "The University of Bath gave me more than a degree. It gave me a community that challenged me, supported me, and helped me make a real impact.",
      author: "Jia Yongming, Class of 2020",
      authorImage: "/Ellipse 2.png",
      chartData: [85, 70, 90, 95]
    },
    {
      id: 2,
      name: "Harvard University",
      location: "Cambridge, USA",
      ranking: "#5 QS World Rankings",
      image: "/college_profile.png",
      qsRank: "QS Overall Rank",
      quote: "Studying at Harvard opened doors I never knew existed. The rigorous academics and incredible network have been invaluable for my future.",
      author: "Sarah Chen, Class of 2019",
      authorImage: "/Ellipse 2.png",
      chartData: [95, 85, 75, 98]
    },
    {
      id: 3,
      name: "MIT",
      location: "Massachusetts, USA",
      ranking: "#1 QS World Rankings",
      image: "/college_profile.png",
      qsRank: "QS Overall Rank",
      quote: "The diverse environment at MIT helped me grow personally and professionally. The innovation mindset here is truly extraordinary.",
      author: "Alex Rodriguez, Class of 2021",
      authorImage: "/Ellipse 2.png",
      chartData: [90, 80, 95, 85]
    },
    {
      id: 4,
      name: "University of Oxford",
      location: "Oxford, United Kingdom",
      ranking: "#4 QS World Rankings",
      image: "/college_profile.png",
      qsRank: "QS Overall Rank",
      quote: "Oxford taught me to think critically and approach problems from multiple perspectives. It's not just about academics.",
      author: "Emma Thompson, Class of 2018",
      authorImage: "/Ellipse 2.png",
      chartData: [88, 92, 78, 90]
    },
    {
      id: 5,
      name: "ETH Zurich",
      location: "Zurich, Switzerland",
      ranking: "#7 QS World Rankings",
      image: "/college_profile.png",
      qsRank: "QS Overall Rank",
      quote: "At ETH, the focus isn't just on learning. It's on applying what you learn to solve real-world problems and make a difference.",
      author: "Marco Silva, Class of 2020",
      authorImage: "/Ellipse 2.png",
      chartData: [92, 75, 88, 94]
    }
  ];

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className={`${textColor} font-outfit text-5xl font-bold mb-2`}>
            Find your type of university
          </h1>
          {/* SVG Underline */}
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="226" height="13" viewBox="0 0 226 13" fill="none">
              <path d="M225.891 4.72036C225.823 4.48139 225.739 4.2823 225.643 4.13456C225.612 4.08361 225.579 4.04005 225.545 4.00437C225.5 3.95897 225.455 3.91987 225.409 3.88721C225.297 3.8091 225.213 3.77002 225.133 3.73096C224.529 3.52267 224.005 3.47061 223.458 3.37948L221.839 3.21024L218.611 2.98895L212.169 2.75459L199.289 2.5333L173.524 2.40311H147.763H105.783C91.789 2.40311 77.7954 2.40311 63.8065 2.52027H58.7676C58.993 2.22328 59.2352 2.03825 59.4835 1.97353C64.5223 0.268133 60.5455 -0.239583 45.4945 0.0988921C42.2195 0.177002 38.748 0.0988921 35.4029 0.0988921C27.6505 0.0338008 14.6113 0.0988921 6.78403 0.0988921C5.60036 0.0988921 4.40264 0.176981 3.19089 0.281127C2.58267 0.281127 1.97446 0.385291 1.31946 0.502455H1.07618L0.795461 0.606584C0.72925 0.629962 0.663625 0.664766 0.598962 0.710752H0.556856L0.477321 0.788859C0.424204 0.863046 0.372654 0.945633 0.322928 1.03621C0.25876 1.16329 0.201959 1.31696 0.154499 1.49186C0.0563016 1.84676 0.00212548 2.2807 0.00010511 2.72857C-0.00293245 3.25316 0.0599499 3.76427 0.177893 4.17362C0.224792 4.31712 0.276482 4.44788 0.33228 4.56415L0.421174 4.72036L0.481997 4.79847L0.608321 4.91563C0.720943 4.98663 0.83499 5.03883 0.949855 5.07188C1.29139 5.17603 1.5955 5.21506 1.88557 5.25411C4.35118 5.55353 6.80275 5.61861 9.23561 5.6837L14.9575 5.82692L13.4416 5.91806L12.2205 6.04825H10.7561V6.51689H10.6392L10.4988 6.64708C10.4348 6.71742 10.3748 6.81395 10.321 6.93348C10.2125 7.16396 10.1298 7.47547 10.0824 7.83175C10.0448 8.13226 10.0323 8.45277 10.0461 8.76871C10.0599 9.08464 10.0995 9.3876 10.162 9.65429L10.4286 10.4874H10.9947V10.7088C10.9947 10.852 10.9947 10.7088 10.9947 10.7869H11.0181H11.1632L11.5047 10.7088L12.2018 10.6046H12.3515C47.511 11.5289 82.6658 10.865 117.858 10.4484H126.003C125.199 10.7088 124.74 10.9952 124.679 11.3206C124.399 12.7917 138.345 12.7917 146.547 12.8568L166.234 13H176.059C177.7 13 179.344 13 180.991 13C181.814 13 182.638 13 183.47 12.8828C183.887 12.8828 184.298 12.8047 184.738 12.7136L185.094 12.6225L185.22 12.5574H185.323C185.407 12.2319 185.37 13.1041 185.875 11.1904C185.871 10.5351 185.838 9.88368 185.777 9.25073L199.845 9.18562L212.707 9.04243L219.144 8.87319L222.373 8.69096L223.996 8.52171C224.267 8.52171 224.539 8.44361 224.824 8.3655C224.996 8.3364 225.166 8.27108 225.334 8.17019H225.404L225.507 8.05303C225.619 7.92379 225.717 7.71776 225.793 7.45421C226.12 7.44119 225.984 4.08247 225.891 4.72036Z" fill="#FF9169"/>
            </svg>
          </div>
          <p className={`${textColor} text-center font-outfit text-lg font-normal leading-[160%] mb-8 max-w-2xl mx-auto`}>
            Big names, serene location, killer societies - whatever you’re looking for, we’ve got a uni for that. Browse by course, location, or pure vibes, your call.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative w-[1094px] h-20 mx-auto">
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
              placeholder="Search universities"
              className="w-full h-20 shrink-0 border border-black bg-[#FFFBF1] pl-[90px] pr-5 outline-none font-outfit text-lg font-medium leading-normal"
              style={{
                boxShadow: '4px 4px 0 0 #000',
                fontSize: '18px',
                color: '#000000'
              }}
            />
          </div>
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
                Showing 500+ Universities - Page 1 of 19
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

        {/* University Cards */}
        <div className="space-y-6">
          {universities.map((university) => (
            <div key={university.id} className="w-[1094px] h-[395px] flex-shrink-0 border border-black bg-[#FFFBF1] relative mx-auto" style={{ boxShadow: '4px 4px 0 0 #000' }}>
              <div className="flex h-full p-6 gap-6">
                {/* Left - University Image */}
                <div className="flex-shrink-0 relative">
                  <div className="w-[345px] h-[347px] border border-black overflow-hidden">
                    <Image
                      src={university.image}
                      alt={university.name}
                      width={345}
                      height={347}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Match Percentage Badge - Inside Image */}
                  <div className="absolute bottom-4 left-4 inline-flex py-2 px-4 justify-center items-center gap-2.5 border border-black bg-[#FFFBF1]" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    <span className="text-black font-outfit text-base font-normal leading-normal">72% Overall Match</span>
                  </div>
                </div>

                {/* Middle - University Info and Chart */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* University Name */}
                    <h3 className="text-black font-outfit text-[32px] font-bold leading-normal mb-2">{university.name}</h3>
                    
                    {/* Location and Ranking */}
                    <p className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] mb-2">{university.location}</p>
                    <p className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] mb-8">{university.ranking}</p>
                  </div>

                  {/* Bar Chart Container - Aligned to bottom */}
                  <div className="flex w-[236px] justify-between items-end self-start">
                    {university.chartData.map((value, index) => {
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
                </div>

                {/* Right - Quote Section */}
                <div className="flex flex-col w-[280px]">
                  <div className="inline-flex py-4 px-6 flex-col justify-center items-end gap-4 border border-black bg-white flex-1" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    <p className="text-[#5D5237] text-right font-outfit text-base font-normal leading-[140%]">
                      &quot;{university.quote}&quot;
                    </p>
                    
                    {/* Divider Line */}
                    <div className="w-full h-px bg-[#5D5237]"></div>
                    
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

                  {/* Find out more button */}
                  <button
                    className="mt-4 inline-flex py-3 px-6 justify-center items-center gap-2.5 border border-black bg-[#FF9169] w-full"
                    style={{ boxShadow: '2px 2px 0 0 #000' }}
                    aria-label={`Find out more about ${university.name}`}
                    onClick={() => {
                      // Navigate to appropriate profile based on university location
                      if (university.location.includes('USA') || university.location.includes('Massachusetts') || university.location.includes('Cambridge, USA')) {
                        window.location.href = '/us-university-profile';
                      } else {
                        window.location.href = '/university-profile';
                      }
                    }}
                  >
                    <span className="text-black font-outfit text-base font-medium leading-normal">Find out more</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
