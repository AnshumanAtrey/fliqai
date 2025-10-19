import React from 'react';

interface PersonalityTraitsSectionProps {
  analysisData: {
    personalityTraits: string[];
  } | null;
  isAnalyzing: boolean;
}

export const PersonalityTraitsSection: React.FC<PersonalityTraitsSectionProps> = ({ 
  analysisData, 
  isAnalyzing 
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="font-['Outfit'] text-xl sm:text-2xl font-semibold leading-tight text-light-text dark:text-dark-text">
          How an Adcom officer might read this essay
        </h2>
        <p className="font-['Outfit'] text-sm sm:text-base font-normal leading-relaxed text-light-p dark:text-dark-text">
          These are the characteristics an admissions officer might perceive
          you to have based on your current essay draft.
        </p>
      </div>
      {analysisData ? (
        <div className="flex flex-wrap gap-2 w-full">
          {analysisData.personalityTraits.map((trait, index) => (
            <div key={index} className="flex px-3 py-1 justify-center items-center bg-[#ffc3a9] border border-black dark:border-dark-text">
              <span className="font-['Outfit'] text-sm font-normal text-light-text whitespace-nowrap">
                {trait}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          <div className="text-light-p dark:text-dark-text font-['Outfit'] text-sm sm:text-base">
            {isAnalyzing ? 'Analyzing your essay...' : 'Submit your essay to see personality traits analysis'}
          </div>
        </div>
      )}
    </div>
  );
};