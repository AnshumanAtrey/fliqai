import React from 'react';
import Image from 'next/image';

interface TestScoresSectionProps {
  redirectUrl?: string;
}

export const TestScoresSection = ({ redirectUrl }: TestScoresSectionProps) => {
  const testScores = [
    { subject: "Calc", avgScore: "B+", yourScore: "A-" },
    { subject: "Biology", avgScore: "A-", yourScore: "B+" },
    { subject: "Chemistry", avgScore: "B", yourScore: "A" },
    { subject: "History", avgScore: "B-", yourScore: "B" },
    { subject: "Physics", avgScore: "C+", yourScore: "B+" },
    { subject: "Literature", avgScore: "A-", yourScore: "A" },
  ];

  const getScoreColor = (score: string) => {
    if (score.startsWith("A")) return "text-green-600";
    if (score.startsWith("B")) return "text-blue-500";
    if (score.startsWith("C")) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreLetter = (score: string) => {
    return score.charAt(0);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-[80px] max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-6 sm:mb-10">Test Scores</h2>
      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 text-light-text dark:text-dark-text">
        {/* Left Section - 65% */}
        <div className="w-full lg:flex-[0_0_55%] bg-light-bg dark:bg-dark-tertiary border-2 lg:border-4 border-black p-4 sm:p-6" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          {/* Test Scores Table */}
          <div className="mb-6">
            <div className="flex justify-between items-center pb-4 border-b-2 border-black mb-6">
              <span className="text-lg font-semibold">Avg Scores</span>
              <span className="text-lg font-semibold">Your Score</span>
            </div>
            
            {testScores.map((test, index) => (
              <div key={index} className="flex justify-between items-center py-3 sm:py-4">
                <div className="flex items-center gap-4 sm:gap-8 md:gap-16 lg:gap-[200px] text-light-text dark:text-dark-text">
                  <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(test.avgScore)}text-light-text dark:text-dark-text flex-shrink-0`}>
                    {getScoreLetter(test.avgScore)}
                  </span>
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-light-p dark:text-dark-text">{test.subject}</span>
                </div>
                <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(test.yourScore)} flex-shrink-0`}>
                  {getScoreLetter(test.yourScore)}
                </span>
              </div>
            ))}
            
            <p className="mt-8 text-light-p dark:text-dark-text text-base leading-relaxed">
              You have scored higher than the average on 3 subjects and lower on two. This puts you in a good position to get in.
            </p>
          </div>
        </div>

        {/* Right Section - 30% */}
        <div className="w-full lg:flex-[0_0_40%] bg-light-bg dark:bg-dark-tertiary h-auto lg:h-full border-2 lg:border-4 border-black p-4 sm:p-6 mt-6 lg:mt-0" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          {/* Profile Images */}
          <div className="flex -space-x-2 mb-6">
            <div className="w-14 h-14 rounded-full overflow-hidden z-10 border-[1px] border-black">
              <Image
                src="/Profile-pic-2.jpg"
                alt="Josh"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-14 h-14 rounded-full overflow-hidden z-10 border-[1px] border-black ">
              <Image
                src="/Profile-pic-3.jpg"
                alt="Lily"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 leading-tight">Turn 3 Months Into +50 Points</h3>
          
          {/* Case Study Content */}
          <div className="mb-8">
            <p className="text-light-p dark:text-dark-text text-sm leading-relaxed">
              Learn the study patterns used by Josh and Lily that allowed them to boost their scores quickly and secure their place.
            </p>
          </div>

          {/* Read Case Study Button */}
          <div className="flex justify-start">
            <button 
              onClick={() => {
                if (redirectUrl) {
                  window.open(redirectUrl, '_blank');
                } else {
                  alert('University profile link not available');
                }
              }}
              className="bg-[#FF9169] hover:bg-black text-black hover:text-[#FF9169] font-semibold px-6 py-3 border-2 border-black transition-colors" 
              style={{ boxShadow: '3px 3px 0 0 #000' }}
            >
              Read case study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestScoresSection;