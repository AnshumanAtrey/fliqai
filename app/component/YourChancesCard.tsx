'use client';

import React from 'react';
import Image from 'next/image';

const YourChancesCard = () => {
  return (
    <div className="bg-white border-2 border-black p-6 mt-14 mx-auto max-w-6xl w-full" style={{ boxShadow: '4px 4px 0 0 #000' }}>
      <h2 className="text-2xl font-bold text-black mb-6">Your Chances</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First Column - Profile */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-black">
              <Image
                src="/profile-pic-1.jpg"
                alt="Profile"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="font-bold">Your Profile</h3>
              <p className="text-sm text-gray-600">View your profile</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">GPA</span>
              <span className="font-medium">3.4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">SAT</span>
              <span className="font-medium">1200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">ACT</span>
              <span className="font-medium">-</span>
            </div>
          </div>
        </div>

        {/* Second Column - Chances */}
        <div className="space-y-4">
          <h3 className="font-bold">Your Chances</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Reach</span>
                <span>3</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Target</span>
                <span>4</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Safety</span>
                <span>3</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Column - Action Buttons */}
        <div className="space-y-4">
          <h3 className="font-bold">Enhance Your Profile</h3>
          <div className="space-y-3">
            <button className="w-full bg-[#FF9169] text-black py-2 px-4 font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors text-left"
              style={{ boxShadow: '4px 4px 0 0 #000' }}>
              Improve your test scores
            </button>
            <button className="w-full bg-[#FF9169] text-black py-2 px-4 font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors text-left"
              style={{ boxShadow: '4px 4px 0 0 #000' }}>
              Improve your academics
            </button>
            <button className="w-full bg-[#FF9169] text-black py-2 px-4 font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors text-left"
              style={{ boxShadow: '4px 4px 0 0 #000' }}>
              Improve your extracurriculars
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourChancesCard;
