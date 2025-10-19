import React from 'react';

interface StrengthsGapsSectionProps {
  analysisData: {
    strengthsAndGaps: {
      category: string;
      percentage: number;
    }[];
  } | null;
  isAnalyzing: boolean;
}

export const StrengthsGapsSection: React.FC<StrengthsGapsSectionProps> = ({ 
  analysisData, 
  isAnalyzing 
}) => {
  return (
    <div className="flex flex-col gap-4 w-full mt-16 sm:mt-20">
      <div className="flex flex-col gap-1 w-full">
        <h2 className="font-['Outfit'] text-xl sm:text-2xl font-semibold leading-tight text-light-text dark:text-dark-text">
          Strengths and gaps of your current essay
        </h2>
        <p className="font-['Outfit'] text-sm sm:text-base font-normal leading-relaxed text-light-p dark:text-dark-text">
          Here are some metrics which we feel your essay is strong/weak in.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 sm:gap-8 justify-center items-end w-full p-6 sm:p-8 bg-light-secondary dark:bg-dark-tertiary border border-black dark:border-dark-text">
        {analysisData ? (
          analysisData.strengthsAndGaps.map((item, index) => {
            // Calculate height based on percentage (responsive max height)
            const height = (item.percentage / 100) * 150; // Reduced for mobile
            // Color based on percentage: high (>70) = orange, medium (40-70) = light orange, low (<40) = very light
            const bgColor = item.percentage >= 70 ? '#ff9269' : item.percentage >= 40 ? '#ffc3a9' : '#ffe3d4';

            return (
              <div key={index} className="flex flex-col gap-3 items-center min-w-[60px] sm:min-w-[80px]">
                <div className="flex flex-col gap-2 items-center w-full">
                  <span className="font-['Outfit'] text-xs sm:text-sm font-semibold text-light-text dark:text-dark-text text-center">
                    {item.percentage}%
                  </span>
                  <div
                    className="w-full border border-black dark:border-dark-text"
                    style={{
                      height: `${Math.max(height, 20)}px`,
                      backgroundColor: bgColor,
                      minHeight: '20px'
                    }}
                  />
                </div>
                <span className="font-['Outfit'] text-xs sm:text-sm font-medium text-light-text dark:text-dark-text text-center break-words">
                  {item.category}
                </span>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center w-full h-32 sm:h-48">
            <span className="font-['Outfit'] text-sm sm:text-base text-light-p dark:text-dark-text text-center">
              {isAnalyzing ? 'Analyzing strengths and gaps...' : 'Submit your essay to see analysis'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};