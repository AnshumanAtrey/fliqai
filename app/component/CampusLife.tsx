import React from 'react';
import Image from 'next/image';

const CampusLife = () => {
  return (
    <div className="w-full  py-20 mb-10">
      <div className="w-[90%] mx-auto">
        <h2 className="text-[32px] font-bold text-light-text dark:text-dark-text mb-10">Campus Life</h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Image (40%) */}
          <div className="w-full lg:w-[370px] h-[450px] relative">
            <div className="w-full h-full relative">
              <Image
                src="/Campus-life.png"
                alt="Students on ASU campus"
                fill
                className="object-cover"
                style={{ border: '1px solid black', boxShadow: '4px 4px 0 0 #000' }}
              />
            </div>
          </div>
          
          {/* Right Section - Details (60%) */}
          <div className="w-full lg:w-[70%] bg-light-bg dark:bg-dark-tertiary border-[1px] border-black p-6" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            <div className="space-y-[12px]">
              <div className="flex justify-between items-center pb-2 ">
                <span className="text-light-p dark:text-dark-text text-[20px]">Baldwin City Population</span>
                <span className="text-light-text dark:text-dark-text  text-[20px] font-bold">4,526</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 ">
                <span className="text-light-p dark:text-dark-text text-[20px]">Nearest Metropolitan Area</span>
                <span className="text-light-text dark:text-dark-text  text-[20px] font-bold">Kansas City</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 ">
                <span className="text-light-p dark:text-dark-text text-[20px]">Freshman Housing Guarantee</span>
                <span className="text-light-text dark:text-dark-text  text-[20px] font-bold text-right">College offers housing to students</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 ">
                <span className="text-light-p dark:text-dark-text text-[20px]">Students in College Housing</span>
                <span className="text-light-text dark:text-dark-text  text-[20px] font-bold">81% of all students</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 ">
                <span className="text-light-p dark:text-dark-text text-[20px]">Athletic Conferences</span>
                <span className="text-light-text dark:text-dark-text  text-[20px] font-bold text-right">National Association of Intercollegiate Athletics</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 ">
                <span className="text-light-p dark:text-dark-text text-[20px]">Mascot</span>
                <span className="text-light-text dark:text-dark-text  text-[20px] font-bold">Wildcat</span>
              </div>
              
              <div className="flex justify-between items-center pb-2 ">
                <span className="text-light-p dark:text-dark-text text-[20px]">Sororities</span>
                <span className="text-light-text dark:text-dark-text  text-[20px] font-bold">29% of women participate</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-light-p dark:text-dark-text text-[20px]">Fraternities</span>
                <span className="text-light-text dark:text-dark-text  text-[20px] font-bold">38% of men participate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusLife;
