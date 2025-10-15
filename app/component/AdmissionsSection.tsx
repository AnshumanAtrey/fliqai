import React from 'react';
import Image from 'next/image';

interface UniversityProps {
  university: {
    name: string;
    stats: {
      acceptanceRate: number;
      students: number;
      international: number;
    };
  };
}

const AdmissionsSection = ({ university }: UniversityProps) => {
  return (
    <div className="w-[90%] mx-auto py-20 border-b-[1px] border-light-text dark:border-dark-text">
      <h2 className="text-[32px] font-bold text-light-text dark:text-dark-text mb-10">Admissions</h2>
      
      <div className="flex flex-col md:flex-row gap-6 h-full md:h-46">
        {/* Left Section - Info Card */}
        <div className="flex-[2] bg-light-bg dark:bg-dark-tertiary border-[1px] border-black p-6" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <div>
            <div className="flex justify-between items-center py-2 ">
              <span className="text-light-p dark:text-dark-text text-[20px]">Entrance Difficulty</span>
              <span className="text-light-text dark:text-dark-text font-bold text-[20px]">Moderate</span>
            </div>
            
            <div className="flex justify-between items-center py-2 ">
              <span className="text-light-p dark:text-dark-text text-[20px]">Overall Admission Rate</span>
              <span className="text-light-text dark:text-dark-text font-bold text-[20px]">{university.stats.acceptanceRate}% of applicants admitted</span>
            </div>
            
            <div className="flex justify-between items-center py-2 ">
              <span className="text-light-p dark:text-dark-text text-[20px]">Early Action Offered</span>
              <div className="flex items-center">
                <span className="text-green-600 font-bold text-xl mr-2">✓</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">Yes</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2 ">
              <span className="text-light-p dark:text-dark-text text-[20px]">Early Decision Offered</span>
              <div className="flex items-center">
                <span className="text-red-600 font-bold text-xl mr-2">✗</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">No</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-light-p dark:text-dark-text text-[20px]">Regular Admissions Deadline</span>
              <span className="text-light-text dark:text-dark-text font-bold text-[20px]">May 1</span>
            </div>
          </div>
        </div>
        
        {/* Middle Section - Single Image */}
        <div className="flex-1 bg-white border-[1px] border-black overflow-hidden" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <Image 
            src="/Admisson-section-1.png" 
            alt="Arizona State University Campus" 
            width={500}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Section - Two Images Stacked */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex-1 bg-white border-[1px] border-black overflow-hidden" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            <Image 
              src="/Admisson-section-2.png" 
              alt="ASU Campus" 
              width={500}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 bg-white border-[1px] border-black overflow-hidden" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            <Image 
              src="/Admisson-section-3.png" 
              alt="ASU Students" 
              width={500}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsSection;
