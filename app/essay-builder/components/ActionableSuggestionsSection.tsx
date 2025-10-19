import React from 'react';

interface ActionableSuggestionsSectionProps {
  analysisData: {
    actionableSuggestions: {
      suggestion: string;
      category: string;
    }[];
  } | null;
  isAnalyzing: boolean;
}

export const ActionableSuggestionsSection: React.FC<ActionableSuggestionsSectionProps> = ({ 
  analysisData, 
  isAnalyzing 
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full mt-16 sm:mt-20">
        <h2 className="font-['Outfit'] text-xl sm:text-2xl font-semibold leading-tight text-light-text dark:text-dark-text">
          Actionable Suggestions
        </h2>
        <p className="font-['Outfit'] text-sm sm:text-base font-normal leading-relaxed text-light-p dark:text-dark-text">
          Here&apos;s a few suggestions we have that will strengthen your essay.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full mt-6">
        {analysisData ? (
          analysisData.actionableSuggestions.map((suggestion, index) => (
            <div key={index} className="flex flex-col gap-4 p-4 sm:p-6 w-full bg-light-secondary dark:bg-dark-tertiary border border-black dark:border-dark-text">
              <p className="font-['Outfit'] text-sm sm:text-lg font-normal leading-relaxed text-light-text dark:text-dark-text">
                {suggestion.suggestion}
              </p>
              <div className="flex px-3 py-1 gap-2 justify-center items-center w-fit bg-[#ffc3a9] border border-black dark:border-dark-text">
                <span className="font-['Outfit'] text-xs sm:text-sm font-normal text-light-text whitespace-nowrap">
                  To improve: {suggestion.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-24 sm:h-32 bg-light-secondary dark:bg-dark-tertiary border border-black dark:border-dark-text">
            <span className="font-['Outfit'] text-sm sm:text-base text-light-p dark:text-dark-text text-center px-4">
              {isAnalyzing ? 'Generating suggestions...' : 'Submit your essay to see actionable suggestions'}
            </span>
          </div>
        )}
      </div>
    </>
  );
};