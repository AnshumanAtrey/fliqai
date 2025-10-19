import React from 'react';

interface QuestionnaireSectionProps {
  onOpenQuestionnaire: () => void;
}

export const QuestionnaireSection: React.FC<QuestionnaireSectionProps> = ({ onOpenQuestionnaire }) => {
  return (
    <div className="flex flex-col gap-8 p-6 w-full lg:max-w-md bg-light-bg dark:bg-dark-secondary border border-solid border-black">
      <div className="flex flex-col gap-4">
        <p className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-xl">
          Unsure which package to pick?
        </p>
        <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">
          We get it. We&apos;ve compiled a 2 min questionnaire that might help you decide which one to go for.
        </p>
      </div>
      <button 
        onClick={onOpenQuestionnaire}
        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#ff9068] border border-solid border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150"
      >
        <span className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-base">Take Questionnaire</span>
      </button>
    </div>
  );
};