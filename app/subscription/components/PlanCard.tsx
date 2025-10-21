import React from 'react';
import Image from 'next/image';

interface PaymentPlan {
  planId: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  popular?: boolean;
  selected?: boolean;
  packageType: 'student_profiles' | 'essay_revisions' | 'combo_package';
  category?: string;
  profilesUnlocked?: number;
  revisionsUnlocked?: number;
}

interface PlanCardProps {
  plan: PaymentPlan;
  onSelect: (plan: PaymentPlan) => void;
  isSelected?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelect, isSelected = false }) => {
  const isStudentProfile = plan.packageType === 'student_profiles';
  const profilesCount = plan.profilesUnlocked || Math.floor(plan.credits / 10);
  const revisionsCount = plan.revisionsUnlocked || Math.floor(plan.credits / 15);
  const isPopular = plan.popular;

  return (
    <div
      className={`flex flex-col gap-6 p-2 flex-1 bg-light-bg dark:bg-dark-secondary border border-solid border-black relative ${isSelected ? 'shadow-[0px_0px_0px_2px_#ff9068]' : ''
        }`}
    >


      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <Image src="/Coins.svg" alt="Coins" width={20} height={11} />
          <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-[28px] leading-[42px]">
            {plan.credits}
          </div>
        </div>
        <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-base">CREDITS</div>
      </div>

      <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-light-text dark:text-dark-text text-sm">
        <span className="font-medium">Unlock </span>
        <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">
          {isStudentProfile ? `${profilesCount} profiles` : `${revisionsCount} revisions`}
        </span>
      </p>

      <button
        onClick={() => onSelect(plan)}
        className={`flex px-6 py-3 justify-center items-center gap-2.5 self-stretch border border-solid border-black shadow-[2px_2px_0px_0px_#000000] transition-colors ${isSelected ? 'bg-[#FF9269] hover:bg-[#ff8050]' : 'bg-[#FF9169] hover:bg-[#ff8050]'
          }`}
      >
        <span className="text-light-text font-outfit text-sm font-semibold leading-normal whitespace-nowrap">
          {isSelected ? 'Selected' : `Select for ₹${plan.price.toLocaleString('en-IN')}`}
        </span>
      </button>
    </div>
  );
};