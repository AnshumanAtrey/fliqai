"use client";
import React, { useState } from 'react';
import Header from '../component/header';

// Coin SVG Component
const CoinIcon = ({ className = "w-[45px] h-[33px]" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="33" viewBox="0 0 46 33" fill="none" className={className}>
    <path d="M33.5 9.29437V8.25C33.5 3.5475 26.4069 0 17 0C7.59313 0 0.5 3.5475 0.5 8.25V15.75C0.5 19.6669 5.42188 22.7794 12.5 23.7113V24.75C12.5 29.4525 19.5931 33 29 33C38.4069 33 45.5 29.4525 45.5 24.75V17.25C45.5 13.3687 40.7337 10.2525 33.5 9.29437ZM42.5 17.25C42.5 19.7288 36.7269 22.5 29 22.5C28.3006 22.5 27.6069 22.4756 26.9225 22.4306C30.9669 20.9569 33.5 18.5625 33.5 15.75V12.3263C39.1006 13.1606 42.5 15.4256 42.5 17.25ZM12.5 20.6719V16.2113C13.9921 16.4057 15.4953 16.5021 17 16.5C18.5047 16.5021 20.0079 16.4057 21.5 16.2113V20.6719C20.0101 20.892 18.506 21.0016 17 21C15.494 21.0016 13.9899 20.892 12.5 20.6719ZM30.5 13.1119V15.75C30.5 17.3231 28.1731 19.0125 24.5 20.0381V15.6562C26.9206 15.0694 28.97 14.1956 30.5 13.1119ZM17 3C24.7269 3 30.5 5.77125 30.5 8.25C30.5 10.7288 24.7269 13.5 17 13.5C9.27312 13.5 3.5 10.7288 3.5 8.25C3.5 5.77125 9.27312 3 17 3ZM3.5 15.75V13.1119C5.03 14.1956 7.07938 15.0694 9.5 15.6562V20.0381C5.82687 19.0125 3.5 17.3231 3.5 15.75ZM15.5 24.75V23.9681C15.9931 23.9869 16.4919 24 17 24C17.7275 24 18.4381 23.9756 19.1356 23.9344C19.9105 24.2118 20.6998 24.4471 21.5 24.6394V29.0381C17.8269 28.0125 15.5 26.3231 15.5 24.75ZM24.5 29.6719V25.2C25.9916 25.4005 27.495 25.5007 29 25.5C30.5047 25.5021 32.0079 25.4057 33.5 25.2113V29.6719C30.5159 30.1094 27.4841 30.1094 24.5 29.6719ZM36.5 29.0381V24.6562C38.9206 24.0694 40.97 23.1956 42.5 22.1119V24.75C42.5 26.3231 40.1731 28.0125 36.5 29.0381Z" fill="black"/>
  </svg>
);

// Tick SVG Component
const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 aspect-square flex-shrink-0">
    <path d="M21.7969 7.54597L9.79687 19.546C9.69236 19.6509 9.56816 19.7341 9.43142 19.7909C9.29467 19.8476 9.14806 19.8769 9 19.8769C8.85193 19.8769 8.70532 19.8476 8.56858 19.7909C8.43183 19.7341 8.30764 19.6509 8.20312 19.546L2.95312 14.296C2.84848 14.1913 2.76547 14.0671 2.70883 13.9304C2.6522 13.7936 2.62305 13.6471 2.62305 13.4991C2.62305 13.3511 2.6522 13.2046 2.70883 13.0678C2.76547 12.9311 2.84848 12.8069 2.95312 12.7022C3.05777 12.5976 3.182 12.5146 3.31873 12.4579C3.45546 12.4013 3.60201 12.3721 3.75 12.3721C3.89799 12.3721 4.04454 12.4013 4.18126 12.4579C4.31799 12.5146 4.44223 12.5976 4.54687 12.7022L9.00094 17.1563L20.205 5.9541C20.4163 5.74276 20.703 5.62402 21.0019 5.62402C21.3008 5.62402 21.5874 5.74276 21.7987 5.9541C22.0101 6.16544 22.1288 6.45209 22.1288 6.75098C22.1288 7.04986 22.0101 7.33651 21.7987 7.54785L21.7969 7.54597Z" fill="#FF9169"/>
  </svg>
);

export default function SubscriptionPage() {
  const [selectedCredits, setSelectedCredits] = useState(25);

  const creditOptions = [
    { credits: 5, price: 4.99 },
    { credits: 10, price: 9.99 },
    { credits: 25, price: 19.99, highlighted: true },
    { credits: 50, price: 34.99 },
    { credits: 100, price: 59.99 },
    { credits: 150, price: 84.99 },
    { credits: 200, price: 109.99 },
    { credits: 300, price: 149.99 }
  ];

  const calculateSavings = (credits: number, price: number) => {
    const basePrice = credits * 1; // $1 per credit as base
    const savings = ((basePrice - price) / basePrice * 100).toFixed(0);
    return savings;
  };

  return (
    <div className="min-h-screen bg-[#FFFBF1]">
      <Header />
      <div className="max-w-7xl mx-auto p-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Section - What we offer */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-black font-outfit text-lg font-semibold leading-[150%] mb-6">What we offer:</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student Profiles Section */}
              <div className="bg-white border-2 border-black rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <div className="flex -space-x-2 mr-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white aspect-square flex-shrink-0"></div>
                    <div className="w-12 h-12 rounded-full bg-gray-400 border-2 border-white aspect-square flex-shrink-0"></div>
                    <div className="w-12 h-12 rounded-full bg-gray-500 border-2 border-white aspect-square flex-shrink-0"></div>
                    <div className="w-12 h-12 rounded-full bg-gray-600 border-2 border-white aspect-square flex-shrink-0"></div>
                  </div>
                </div>
                
                <h3 className="text-black font-outfit text-2xl font-bold leading-normal mb-2">Student Profiles</h3>
                <p className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] mb-4">
                  Draw inspiration from detailed profiles from top admits from your university
                </p>
                
                <div className="bg-[#FF9169] border border-black text-black px-4 py-2 inline-flex items-center mb-6">
                  <CoinIcon className="w-5 h-4 mr-2" />
                  <span className="text-black font-outfit text-base font-medium leading-[150%]">5 credits per profile</span>
                </div>
                
                <div className="border-t border-black mb-6"></div>
                
                <div>
                  <h4 className="text-black font-outfit text-lg font-bold leading-[150%] mb-3">What you&apos;ll see</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Their test scores and dates taken</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">What you will get</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Personally answered Q&amp;As</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Scholarships & Awards they achieved</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Their extracurricular activities</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Essay Revisions Section */}
              <div className="bg-white border-2 border-black rounded-lg p-6 min-h-[600px]">
                <div className="flex items-start mb-4">
                  <div className="flex -space-x-2 mr-4">
                    <div className="w-12 h-12 rounded-full bg-blue-300 border-2 border-white aspect-square flex-shrink-0"></div>
                    <div className="w-12 h-12 rounded-full bg-green-300 border-2 border-white aspect-square flex-shrink-0"></div>
                    <div className="w-12 h-12 rounded-full bg-yellow-300 border-2 border-white aspect-square flex-shrink-0"></div>
                    <div className="w-12 h-12 rounded-full bg-purple-300 border-2 border-white aspect-square flex-shrink-0"></div>
                  </div>
                </div>
                
                <h3 className="text-black font-outfit text-2xl font-bold leading-normal mb-2">Essay Revisions</h3>
                <p className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] mb-4">
                  Get expert feedback on your drafts and refine your essays to stand out in admissions.
                </p>
                
                <div className="bg-[#FF9169] border border-black text-black px-4 py-2 inline-flex items-center mb-6">
                  <CoinIcon className="w-5 h-4 mr-2" />
                  <span className="text-black font-outfit text-base font-medium leading-[150%]">15 credits per revision</span>
                </div>
                
                <div className="border-t border-black mb-6"></div>
                
                <div>
                  <h4 className="text-black font-outfit text-lg font-bold leading-[150%] mb-3">What you&apos;ll get</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Detailed line-by-line feedback on structure & clarity</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Suggestions to highlight personal achievements and experiences</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Grammar, style, and tone improvements</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Tips to better align essays with university expectations</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Course catalogue & information</span>
                    </div>
                    <div className="flex items-center">
                      <TickIcon />
                      <span className="text-[#5D5237] font-outfit text-lg font-normal leading-[150%] ml-2">Actionable revision roadmap for your next draft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Buy Credits */}
          <div className="lg:col-span-1">
            <h2 className="text-black font-outfit text-lg font-semibold leading-[150%] mb-6">Buy Credits:</h2>
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              {creditOptions.slice(0, 4).map((option) => (
                <button
                  key={option.credits}
                  onClick={() => setSelectedCredits(option.credits)}
                  className={`w-[90px] h-[90px] p-2 flex flex-col justify-center items-center gap-1 border border-black transition-all ${
                    option.highlighted 
                      ? 'bg-[#FF9169] shadow-[4px_4px_0_0_#000]' 
                      : selectedCredits === option.credits
                      ? 'bg-[#FF9169] shadow-[4px_4px_0_0_#000]'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <CoinIcon className="w-[35px] h-[25px] flex-shrink-0" />
                  <div className="text-black font-outfit text-sm font-bold leading-[150%]">{option.credits} Credits</div>
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {creditOptions.slice(4).map((option) => (
                <button
                  key={option.credits}
                  onClick={() => setSelectedCredits(option.credits)}
                  className={`w-[90px] h-[90px] p-2 flex flex-col justify-center items-center gap-1 border border-black transition-all ${
                    option.highlighted 
                      ? 'bg-[#FF9169] shadow-[4px_4px_0_0_#000]' 
                      : selectedCredits === option.credits
                      ? 'bg-[#FF9169] shadow-[4px_4px_0_0_#000]'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <CoinIcon className="w-[35px] h-[25px] flex-shrink-0" />
                  <div className="text-black font-outfit text-sm font-bold leading-[150%]">{option.credits} Credits</div>
                </button>
              ))}
            </div>

            <div className="flex w-full max-w-2xl p-[10px] justify-between items-center border border-black bg-white">
              <span className="text-black font-outfit text-lg font-bold leading-[150%] mr-6">
                Total: ${creditOptions.find(opt => opt.credits === selectedCredits)?.price} (You saved 
                <span className="text-[#10A95B] font-outfit text-lg font-bold leading-[150%]">
                  {calculateSavings(
                    selectedCredits, 
                    creditOptions.find(opt => opt.credits === selectedCredits)?.price || 0
                  )}%
                </span>)
              </span>
              <button className="flex py-2 px-6 justify-center items-center gap-[10px] border border-black bg-[#FF9169] shadow-[2px_2px_0_0_#000] hover:bg-[#FF8A67] transition-colors">
                <span className="text-black font-outfit text-base font-medium leading-normal">Buy now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}