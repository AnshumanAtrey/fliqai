'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function StudentProfile() {
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
          <span className={`${textColor} font-outfit text-sm`}>← Back to Discovery</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 border border-black bg-white rounded"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Student Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`${textColor} font-outfit text-4xl font-bold mb-2`}>Jonathan Hopkins</h1>
            <p className={`${textColor} font-outfit text-lg mb-4`}>Class 12</p>
            
            {/* Stats */}
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <div className={`${textColor} font-outfit text-2xl font-bold`}>38</div>
                <div className={`${textColor} font-outfit text-sm`}>Essays</div>
              </div>
              <div className="text-center">
                <div className={`${textColor} font-outfit text-2xl font-bold`}>11</div>
                <div className={`${textColor} font-outfit text-sm`}>Colleges</div>
              </div>
              <div className="text-center">
                <div className={`${textColor} font-outfit text-2xl font-bold`}>5</div>
                <div className={`${textColor} font-outfit text-sm`}>Awards</div>
              </div>
              <div className="text-center">
                <div className={`${textColor} font-outfit text-2xl font-bold`}>10</div>
                <div className={`${textColor} font-outfit text-sm`}>Activities</div>
              </div>
              <div className="text-center">
                <div className={`${textColor} font-outfit text-2xl font-bold`}>8</div>
                <div className={`${textColor} font-outfit text-sm`}>AP/IBs</div>
              </div>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full border border-black overflow-hidden bg-gray-200">
            <Image
              src="/Ellipse 2.png"
              alt="Jonathan Hopkins"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Personal Information Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h2 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Personal Information</h2>
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`${textColor} font-outfit text-sm font-medium`}>Name</label>
                  <div className={`${textColor} font-outfit text-base mt-1`}>Jonathan Hopkins</div>
                </div>
                <div>
                  <label className={`${textColor} font-outfit text-sm font-medium`}>Age</label>
                  <div className={`${textColor} font-outfit text-base mt-1`}>17</div>
                </div>
                <div>
                  <label className={`${textColor} font-outfit text-sm font-medium`}>Grade</label>
                  <div className={`${textColor} font-outfit text-base mt-1`}>12</div>
                </div>
                <div>
                  <label className={`${textColor} font-outfit text-sm font-medium`}>School</label>
                  <div className={`${textColor} font-outfit text-base mt-1`}>Delhi Public School</div>
                </div>
                <div>
                  <label className={`${textColor} font-outfit text-sm font-medium`}>Location</label>
                  <div className={`${textColor} font-outfit text-base mt-1`}>New Delhi, India</div>
                </div>
                <div>
                  <label className={`${textColor} font-outfit text-sm font-medium`}>Intended Major</label>
                  <div className={`${textColor} font-outfit text-base mt-1`}>Computer Science</div>
                </div>
              </div>
            </div>
            <div className="w-48 h-64 border border-black bg-gray-200 overflow-hidden">
              <Image
                src="/Ellipse 2.png"
                alt="Student Photo"
                width={192}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Academic Results Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h2 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Academic Results</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className={`${textColor} font-outfit text-lg font-semibold mb-3`}>Test Scores</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`${textColor} font-outfit`}>SAT</span>
                  <span className={`${textColor} font-outfit font-semibold`}>1580</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${textColor} font-outfit`}>ACT</span>
                  <span className={`${textColor} font-outfit font-semibold`}>35</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${textColor} font-outfit`}>TOEFL</span>
                  <span className={`${textColor} font-outfit font-semibold`}>118</span>
                </div>
              </div>
            </div>
            <div className="w-64 h-48 border border-black bg-gray-100 flex items-center justify-center">
              <span className={`${textColor} font-outfit text-sm`}>Grade Chart Placeholder</span>
            </div>
          </div>
        </div>

        {/* Scholarships & Awards Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h2 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Scholarships & Awards</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Presidential Scholarship</h4>
              <p className="font-outfit text-sm text-gray-600">Full tuition coverage for academic excellence</p>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Science Olympiad Gold</h4>
              <p className="font-outfit text-sm text-gray-600">National level competition winner</p>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Community Service Award</h4>
              <p className="font-outfit text-sm text-gray-600">500+ hours of volunteer work</p>
            </div>
          </div>
        </div>

        {/* Extracurriculars Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h2 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Extracurriculars</h2>
          <div className="flex gap-8">
            <div className="w-64 h-64 border border-black bg-white flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 flex items-center justify-center">
                <span className="font-outfit font-semibold">Activity Chart</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h4 className={`${textColor} font-outfit font-semibold`}>Debate Team Captain</h4>
                  <p className={`${textColor} font-outfit text-sm`}>Led team to state championships, 3 years experience</p>
                </div>
                <div>
                  <h4 className={`${textColor} font-outfit font-semibold`}>Robotics Club President</h4>
                  <p className={`${textColor} font-outfit text-sm`}>Organized competitions and mentored junior members</p>
                </div>
                <div>
                  <h4 className={`${textColor} font-outfit font-semibold`}>Volunteer Tutor</h4>
                  <p className={`${textColor} font-outfit text-sm`}>Mathematics and Science tutoring for underprivileged students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Essays Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h2 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Essays</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Personal Statement</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">My journey through computer science and how it shaped my worldview...</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Read More</button>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Why This College</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">The innovative research opportunities and collaborative environment...</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Read More</button>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Extracurricular Essay</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">Leading the debate team taught me the power of persuasive communication...</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Read More</button>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Diversity Essay</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">Growing up in a multicultural environment has given me unique perspectives...</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Read More</button>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Challenge Essay</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">Overcoming my fear of public speaking through debate competitions...</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Read More</button>
            </div>
            <div className="border border-black p-4 bg-white">
              <h4 className="font-outfit font-semibold mb-2">Future Goals</h4>
              <p className="font-outfit text-sm text-gray-600 mb-3">My vision for using technology to solve environmental challenges...</p>
              <button className="bg-[#FF9169] border border-black px-3 py-1 text-sm font-outfit">Read More</button>
            </div>
          </div>
        </div>

        {/* Exam Deadlines Section */}
        <div className={`${cardBg} border border-black p-6 mb-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h2 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Exam Deadlines</h2>
          <div className="grid grid-cols-7 gap-2">
            {/* Calendar Grid */}
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="border border-gray-300 p-2 h-16 bg-white">
                <div className="text-xs font-outfit">{i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Q&A QR Section */}
        <div className={`${cardBg} border border-black p-6`} style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h2 className={`${textColor} font-outfit text-2xl font-bold mb-4`}>Q&A QR</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-black bg-white">
              <span className="font-outfit">What are your career aspirations?</span>
              <div className="w-12 h-12 border border-black bg-gray-200 flex items-center justify-center">
                <span className="text-xs">QR</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border border-black bg-white">
              <span className="font-outfit">How do you handle academic pressure?</span>
              <div className="w-12 h-12 border border-black bg-gray-200 flex items-center justify-center">
                <span className="text-xs">QR</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border border-black bg-white">
              <span className="font-outfit">What makes you unique as a candidate?</span>
              <div className="w-12 h-12 border border-black bg-gray-200 flex items-center justify-center">
                <span className="text-xs">QR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
