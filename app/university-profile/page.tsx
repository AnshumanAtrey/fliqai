'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function UniversityProfile() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const bgColor = theme === 'light' ? 'bg-[#FFFBF1]' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-black' : 'text-white';
  const cardBg = theme === 'light' ? 'bg-[#FFFBF1]' : 'bg-gray-800';

  return (
    <div className={`min-h-screen ${bgColor}`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-black">
        <div className="flex items-center gap-4">
          <Image src="/back.svg" alt="Back" width={24} height={24} />
          <span className={`${textColor} font-outfit text-sm`}>← Back to Browse Universities</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 border border-black bg-white rounded"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* University Header */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className={`${textColor} font-outfit text-3xl font-bold mb-2`}>University of Bath</h1>
              <p className={`${textColor} font-outfit text-lg mb-4`}>Bath, United Kingdom</p>
              <p className={`${textColor} font-outfit text-lg font-semibold mb-4`}>#5 QS World Rankings</p>
            </div>
            
            {/* Stats Chart */}
            <div className="w-64">
              <div className="flex items-end gap-2 h-24">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-green-400 border border-black" style={{ height: '85%' }}></div>
                  <span className="text-xs font-outfit mt-1">Accept</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-red-400 border border-black" style={{ height: '70%' }}></div>
                  <span className="text-xs font-outfit mt-1">Tuition</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-yellow-400 border border-black" style={{ height: '90%' }}></div>
                  <span className="text-xs font-outfit mt-1">Living</span>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-green-500 border border-black" style={{ height: '95%' }}></div>
                  <span className="text-xs font-outfit mt-1">Salary</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className={`${cardBg} border border-black mb-6 relative overflow-hidden`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div className="h-80 relative">
            <Image
              src="/bath.png"
              alt="University of Bath Campus"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="font-outfit text-4xl font-bold mb-4">UNIVERSITY OF BATH</h2>
                <p className="font-outfit text-xl">Why this is the University of Bath</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why This University Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Why this is the University of Bath</h3>
          <p className={`${textColor} font-outfit text-base leading-relaxed`}>
            The University of Bath is a leading UK university known for its excellence in research, teaching, and student experience. 
            Located in the beautiful city of Bath, a UNESCO World Heritage site, the university offers a unique blend of academic 
            rigor and stunning surroundings. With strong industry connections and outstanding graduate employment rates, Bath 
            provides students with exceptional opportunities for personal and professional development.
          </p>
        </div>

        {/* General Information Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>General Information</h3>
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="w-full h-48 border border-black bg-gray-200 mb-4">
                <div className="w-full h-full bg-green-100 flex items-center justify-center">
                  <span className={`${textColor} font-outfit text-sm`}>Map of Bath, UK</span>
                </div>
              </div>
            </div>
            <div className="w-64">
              <h4 className={`${textColor} font-outfit text-lg font-semibold mb-2`}>University of Bath</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className={`${textColor} font-outfit font-semibold`}>Founded:</span>
                  <span className={`${textColor} font-outfit ml-2`}>1966</span>
                </div>
                <div>
                  <span className={`${textColor} font-outfit font-semibold`}>Students:</span>
                  <span className={`${textColor} font-outfit ml-2`}>18,857</span>
                </div>
                <div>
                  <span className={`${textColor} font-outfit font-semibold`}>Location:</span>
                  <span className={`${textColor} font-outfit ml-2`}>Bath, UK</span>
                </div>
              </div>
              <button className="w-full mt-4 bg-[#FF9169] border border-black py-2 px-4 font-outfit text-sm font-semibold" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                Visit Website
              </button>
              <button className="w-full mt-2 bg-[#FF9169] border border-black py-2 px-4 font-outfit text-sm font-semibold" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Courses Recommended Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Courses Recommended for You</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Computer Science</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">BSc (Hons) - 3 years</p>
              <p className="font-outfit text-sm mb-3">Develop cutting-edge software and systems with our industry-leading program.</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Learn More</button>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Engineering</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">MEng - 4 years</p>
              <p className="font-outfit text-sm mb-3">World-class engineering education with strong industry partnerships.</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Learn More</button>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Business</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">BSc (Hons) - 3 years</p>
              <p className="font-outfit text-sm mb-3">Comprehensive business education with global perspective.</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Learn More</button>
            </div>
          </div>
        </div>

        {/* Student Life Stories Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Student Life Stories</h3>
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="w-48 h-32 border border-black bg-gray-200 overflow-hidden">
                <Image
                  src="/Ellipse 2.png"
                  alt="Student Story"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className={`${textColor} font-outfit text-lg font-semibold mb-2`}>Why we love studying in Bath</h4>
                <p className={`${textColor} font-outfit text-sm mb-3`}>
                  &quot;Bath offers the perfect combination of academic excellence and quality of life. The campus is beautiful, 
                  the city is historic, and the opportunities are endless.&quot;
                </p>
                <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Read More</button>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-48 h-32 border border-black bg-gray-200 overflow-hidden">
                <Image
                  src="/bath.png"
                  alt="Campus Life"
                  width={192}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className={`${textColor} font-outfit text-lg font-semibold mb-2`}>What we love about our studies here</h4>
                <p className={`${textColor} font-outfit text-sm mb-3`}>
                  &quot;The teaching quality is exceptional, and the support from faculty is incredible. Every day brings new 
                  challenges and opportunities to grow.&quot;
                </p>
                <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Read More</button>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Courses Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Campus Courses</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border border-black bg-white overflow-hidden">
              <div className="h-32 bg-gray-200">
                <Image
                  src="/bath.png"
                  alt="Course"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-outfit font-semibold text-sm mb-1">Computer Science</h4>
                <p className="font-outfit text-xs text-gray-600 mb-2">BSc (Hons)</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Apply</button>
              </div>
            </div>
            <div className="border border-black bg-white overflow-hidden">
              <div className="h-32 bg-gray-200">
                <Image
                  src="/bath.png"
                  alt="Course"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-outfit font-semibold text-sm mb-1">Mechanical Engineering</h4>
                <p className="font-outfit text-xs text-gray-600 mb-2">MEng</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Apply</button>
              </div>
            </div>
            <div className="border border-black bg-white overflow-hidden">
              <div className="h-32 bg-gray-200">
                <Image
                  src="/bath.png"
                  alt="Course"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-outfit font-semibold text-sm mb-1">Business Administration</h4>
                <p className="font-outfit text-xs text-gray-600 mb-2">BSc (Hons)</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Apply</button>
              </div>
            </div>
            <div className="border border-black bg-white overflow-hidden">
              <div className="h-32 bg-gray-200">
                <Image
                  src="/bath.png"
                  alt="Course"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-outfit font-semibold text-sm mb-1">Architecture</h4>
                <p className="font-outfit text-xs text-gray-600 mb-2">BA (Hons)</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Apply</button>
              </div>
            </div>
            <div className="border border-black bg-white overflow-hidden">
              <div className="h-32 bg-gray-200">
                <Image
                  src="/bath.png"
                  alt="Course"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-outfit font-semibold text-sm mb-1">Psychology</h4>
                <p className="font-outfit text-xs text-gray-600 mb-2">BSc (Hons)</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Apply</button>
              </div>
            </div>
            <div className="border border-black bg-white overflow-hidden">
              <div className="h-32 bg-gray-200">
                <Image
                  src="/bath.png"
                  alt="Course"
                  width={200}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-outfit font-semibold text-sm mb-1">Mathematics</h4>
                <p className="font-outfit text-xs text-gray-600 mb-2">BSc (Hons)</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Apply</button>
              </div>
            </div>
          </div>
          <button className="w-full bg-[#FF9169] border border-black py-2 px-4 font-outfit text-sm font-semibold" style={{ boxShadow: '2px 2px 0 0 #000' }}>
            View All Courses
          </button>
        </div>

        {/* Student Support Section */}
        <div className={`${cardBg} border border-black p-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Student Support</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-4">
              <div className="w-24 h-16 border border-black bg-gray-200 overflow-hidden">
                <Image
                  src="/Ellipse 2.png"
                  alt="Academic Support"
                  width={96}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className={`${textColor} font-outfit font-semibold text-sm mb-1`}>Academic Support</h4>
                <p className={`${textColor} font-outfit text-xs mb-2`}>Personal tutors and study skills support</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Learn More</button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 h-16 border border-black bg-gray-200 overflow-hidden">
                <Image
                  src="/Ellipse 2.png"
                  alt="Wellbeing Support"
                  width={96}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className={`${textColor} font-outfit font-semibold text-sm mb-1`}>Wellbeing Support</h4>
                <p className={`${textColor} font-outfit text-xs mb-2`}>Mental health and counseling services</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Learn More</button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 h-16 border border-black bg-gray-200 overflow-hidden">
                <Image
                  src="/Ellipse 2.png"
                  alt="Career Support"
                  width={96}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className={`${textColor} font-outfit font-semibold text-sm mb-1`}>Career Support</h4>
                <p className={`${textColor} font-outfit text-xs mb-2`}>Career guidance and placement assistance</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Learn More</button>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-24 h-16 border border-black bg-gray-200 overflow-hidden">
                <Image
                  src="/Ellipse 2.png"
                  alt="International Support"
                  width={96}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className={`${textColor} font-outfit font-semibold text-sm mb-1`}>International Support</h4>
                <p className={`${textColor} font-outfit text-xs mb-2`}>Support for international students</p>
                <button className="bg-[#FF9169] border border-black px-2 py-1 text-xs font-outfit">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
