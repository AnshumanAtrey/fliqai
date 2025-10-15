"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../component/header';
import { DotPatternBackground } from '../component/DotPatternBackground';
import StripeProvider from '../../components/StripeProvider';
import { PaymentForm } from '../../components/PaymentForm';
import { PaymentSuccessModal } from '../../components/PaymentSuccessModal';
import { usePayment } from '../../lib/hooks/usePayment';
import { useCredits } from '../../lib/hooks/useCredits';
import { useAuth } from '../../lib/hooks/useAuth';
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';

// Tick SVG Component
const TickIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 aspect-square flex-shrink-0">
    <path d="M21.7969 7.54597L9.79687 19.546C9.69236 19.6509 9.56816 19.7341 9.43142 19.7909C9.29467 19.8476 9.14806 19.8769 9 19.8769C8.85193 19.8769 8.70532 19.8476 8.56858 19.7909C8.43183 19.7341 8.30764 19.6509 8.20312 19.546L2.95312 14.296C2.84848 14.1913 2.76547 14.0671 2.70883 13.9304C2.6522 13.7936 2.62305 13.6471 2.62305 13.4991C2.62305 13.3511 2.6522 13.2046 2.70883 13.0678C2.76547 12.9311 2.84848 12.8069 2.95312 12.7022C3.05777 12.5976 3.182 12.5146 3.31873 12.4579C3.45546 12.4013 3.60201 12.3721 3.75 12.3721C3.89799 12.3721 4.04454 12.4013 4.18126 12.4579C4.31799 12.5146 4.44223 12.5976 4.54687 12.7022L9.00094 17.1563L20.205 5.9541C20.4163 5.74276 20.703 5.62402 21.0019 5.62402C21.3008 5.62402 21.5874 5.74276 21.7987 5.9541C22.0101 6.16544 22.1288 6.45209 22.1288 6.75098C22.1288 7.04986 22.0101 7.33651 21.7987 7.54785L21.7969 7.54597Z" fill="#FF9169"/>
  </svg>
);

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

function SubscriptionPage() {
  const { user } = useAuth();
  const { credits } = useCredits();
  const { fetchPlans, plans: apiPlans } = usePayment();
  
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const [plans, setPlans] = useState<PaymentPlan[]>([]);

  // Default plans (fallback) - matching backend structure
  const defaultPlans: PaymentPlan[] = [
    // Student Profiles
    {
      planId: 'student_profiles_50',
      credits: 50,
      price: 3499,
      currency: 'inr',
      description: '50 Credits - Student Profiles',
      packageType: 'student_profiles',
      profilesUnlocked: 5
    },
    {
      planId: 'student_profiles_100',
      credits: 100,
      price: 5999,
      currency: 'inr',
      description: '100 Credits - Student Profiles',
      popular: true,
      packageType: 'student_profiles',
      profilesUnlocked: 10
    },
    {
      planId: 'student_profiles_200',
      credits: 200,
      price: 10499,
      currency: 'inr',
      description: '200 Credits - Student Profiles',
      packageType: 'student_profiles',
      profilesUnlocked: 20
    },
    // Essay Revisions
    {
      planId: 'essay_revisions_50',
      credits: 50,
      price: 2499,
      currency: 'inr',
      description: '50 Credits - Essay Revisions',
      packageType: 'essay_revisions',
      revisionsUnlocked: 10
    },
    {
      planId: 'essay_revisions_100',
      credits: 100,
      price: 4499,
      currency: 'inr',
      description: '100 Credits - Essay Revisions',
      packageType: 'essay_revisions',
      revisionsUnlocked: 25
    },
    {
      planId: 'essay_revisions_200',
      credits: 200,
      price: 6499,
      currency: 'inr',
      description: '200 Credits - Essay Revisions',
      packageType: 'essay_revisions',
      revisionsUnlocked: 35
    }
  ];

  useEffect(() => {
    // Try to fetch plans from API, fall back to defaults
    const loadPlans = async () => {
      try {
        const fetchedPlans = await fetchPlans();
        
        if (fetchedPlans && fetchedPlans.length > 0) {
          setPlans(fetchedPlans);
        } else {
          setPlans(defaultPlans);
        }
      } catch (error) {
        console.error('Failed to fetch plans:', error);
        setPlans(defaultPlans);
      }
    };

    loadPlans();
  }, [fetchPlans]);

  const handlePlanSelect = (plan: PaymentPlan) => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = (result: any) => {
    setShowPaymentForm(false);
    setSuccessData(result);
    setShowSuccessModal(true);
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    setSelectedPlan(null);
  };

  const calculateSavings = (credits: number, price: number) => {
    const basePrice = credits * 1; // $1 per credit as base
    const savings = ((basePrice - price) / basePrice * 100).toFixed(0);
    return savings;
  };

  // Filter plans by package type
  const studentProfilePlans = plans.filter(p => p.packageType === 'student_profiles').slice(0, 3);
  const essayRevisionPlans = plans.filter(p => p.packageType === 'essay_revisions').slice(0, 3);
  
  console.log('All plans:', plans);
  console.log('Student profile plans:', studentProfilePlans);
  console.log('Essay revision plans:', essayRevisionPlans);

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <DotPatternBackground>
        <div className="min-h-screen">
          <Header />
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="text-center bg-white border border-black p-8 shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]">
              <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
              <p className="text-gray-600 mb-6">Please log in to purchase credits</p>
              <div className="flex gap-4 justify-center">
                <a 
                  href="/login"
                  className="px-6 py-3 border border-black hover:bg-gray-50 transition-colors font-medium"
                >
                  Login
                </a>
                <a 
                  href="/signup"
                  className="px-6 py-3 bg-[#FF9269] text-white border border-black hover:bg-[#e5825a] transition-colors font-medium shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </DotPatternBackground>
    );
  }

  return (
    <DotPatternBackground>
    <div className="min-h-screen">
      <Header />
      
      {/* Main Container - 55% + 45% flex row */}
      <div className="flex w-full max-w-7xl mx-auto p-6 pt-20 gap-8">
        
        {/* Left Section - 55% - What we offer */}
        <div className="flex-[0_0_55%] flex flex-col gap-6">
          <h2 className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-lg tracking-[0] leading-[27px]">
            What we offer:
          </h2>
          
          {/* Two columns: Student Profiles + Essay Revisions */}
          <div className="flex gap-4">
            {/* Student Profiles Details - Column 1 */}
            <div className="flex flex-col gap-[26px] p-6 flex-1 bg-light-bg dark:bg-dark-secondary border border-solid border-black">
              {/* Profile Images */}
              <div className="flex -space-x-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 bg-gray-400 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 bg-gray-500 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 bg-gray-600 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="flex flex-col gap-1">
                <h3 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Student Profiles</h3>
                <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">
                  Draw inspiration with details from top admits from your university
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-[11px] py-3 bg-[#ff9068] border border-solid border-black">
                <Image src="/Coins.svg" alt="Coins" width={28} height={15} />
                <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-text text-base">10 credits per profile</span>
              </div>
              
              <hr className="w-full h-px bg-black border-0" />
              
              <div className="flex flex-col gap-4">
                <h4 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-lg">What you&apos;ll access</h4>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Their test scores and dates taken</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Their Essays</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Personally answered Q&A&apos;s</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Scholarships & Awards they achieved</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Their extracurricular activities</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Essay Revisions Details - Column 2 */}
            <div className="flex flex-col gap-[26px] p-6 flex-1 bg-light-bg dark:bg-dark-secondary border border-solid border-black">
              <div className="text-5xl">📝</div>
              
              <div className="flex flex-col gap-1">
                <h3 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Essay Revisions</h3>
                <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">
                  Get expert feedback on your drafts and refine your essays to stand out in admissions.
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-[11px] py-3 bg-[#ff9068] border border-solid border-black">
                <Image src="/Coins.svg" alt="Coins" width={28} height={15} />
                <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-text text-base">15 credits per revision</span>
              </div>
              
              <hr className="w-full h-px bg-black border-0" />
              
              <div className="flex flex-col gap-4">
                <h4 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-lg">What you&apos;ll access</h4>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Detailed line-by-line feedback on structure & clarity</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Suggestions to highlight personal achievements and experiences</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Grammar, style, and tone improvements</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Tips to better align essays with university expectations</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Course catalogue & information</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <TickIcon />
                    <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">Actionable revision roadmap for your next draft</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Questionnaire Section */}
          <div className="flex flex-col gap-8 p-6 max-w-md bg-light-bg dark:bg-dark-secondary border border-solid border-black">
            <div className="flex flex-col gap-4">
              <p className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-xl">
                Unsure which package to pick?
              </p>
              <p className="[font-family:'Outfit-Regular',Helvetica] font-normal text-light-p dark:text-dark-text text-lg leading-[27px]">
                We get it. We&apos;ve compiled a 2 min questionnaire that might help you decide which one to go for.
              </p>
            </div>
            <button className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#ff9068] border border-solid border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150">
              <span className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-base">Take Questionnaire</span>
            </button>
          </div>
        </div>

        {/* Right Section - 45% - Credit Cards */}
        <div className="flex-[0_0_45%] flex flex-col gap-8">
          {/* Student Profiles Section */}
          <div className="flex flex-col gap-4">
            <h2 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Student Profiles</h2>
            
            <div className="flex gap-3">
              {studentProfilePlans.map((plan, index) => {
                const profilesCount = plan.profilesUnlocked || Math.floor(plan.credits / 10); // Use API data or fallback
                const isPopular = plan.popular;
                
                return (
                  <div 
                    key={plan.planId}
                    className={`flex flex-col gap-8 p-3 flex-1 bg-light-bg dark:bg-dark-secondary border border-solid border-black ${
                      isPopular ? 'shadow-[0px_0px_0px_2px_#ff9068] relative' : ''
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FF9269] text-white px-3 py-1 text-sm font-medium border border-black">
                        POPULAR
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                        <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-[32px] leading-[48px]">
                          {plan.credits}
                        </div>
                      </div>
                      <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-base">CREDITS</div>
                    </div>
                    
                    <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-light-text dark:text-dark-text text-base">
                      <span className="font-medium">Unlock </span>
                      <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">{profilesCount} profiles</span>
                    </p>
                    
                    <button 
                      onClick={() => handlePlanSelect(plan)}
                      className={`flex px-6 py-3 justify-center items-center gap-2.5 self-stretch border border-solid border-black shadow-[2px_2px_0px_0px_#000000] transition-colors ${
                        plan.selected ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#FF9169] hover:bg-[#ff8050]'
                      }`}
                      disabled={plan.selected}
                    >
                      <span className="text-light-text font-outfit text-base font-semibold leading-normal whitespace-nowrap">
                        {plan.selected ? 'Selected' : `Select for ₹${plan.price.toLocaleString('en-IN')}`}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Separator Line */}
          <div className="w-full h-px bg-black"></div>

          {/* Essay Revisions Section */}
          <div className="flex flex-col gap-4">
            <h2 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Essay Revisions</h2>
            
            <div className="flex gap-3">
              {essayRevisionPlans.map((plan, index) => {
                const revisionsCount = plan.revisionsUnlocked || Math.floor(plan.credits / 15); // Use API data or fallback
                
                return (
                  <div 
                    key={plan.planId}
                    className="flex flex-col gap-8 p-3 flex-1 bg-light-bg dark:bg-dark-secondary border border-solid border-black"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                        <div className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-[32px] leading-[48px]">
                          {plan.credits}
                        </div>
                      </div>
                      <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-base">CREDITS</div>
                    </div>
                    
                    <p className="[font-family:'Outfit-Medium',Helvetica] font-normal text-light-text dark:text-dark-text text-base">
                      <span className="font-medium">Unlock </span>
                      <span className="[font-family:'Outfit-Bold',Helvetica] font-bold">{revisionsCount} revisions</span>
                    </p>
                    
                    <button 
                      onClick={() => handlePlanSelect(plan)}
                      className={`flex px-6 py-3 justify-center items-center gap-2.5 self-stretch border border-solid border-black shadow-[2px_2px_0px_0px_#000000] transition-colors ${
                        plan.selected ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#FF9169] hover:bg-[#ff7a4d]'
                      }`}
                      disabled={plan.selected}
                    >
                      <span className="text-light-text font-outfit text-base font-semibold leading-normal whitespace-nowrap">
                        {plan.selected ? 'Selected' : `Select for ₹${plan.price.toLocaleString('en-IN')}`}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Separator Line */}
          <div className="w-full h-px bg-black"></div>

          {/* Total and Buy Section */}
          <div className="flex items-center justify-between p-2.5 bg-light-bg dark:bg-dark-secondary border border-solid border-black">
            <p className="[font-family:'Outfit-Bold',Helvetica] text-lg">
              <span className="font-bold text-black">Total: </span>
              <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-p dark:text-dark-text">₹6299 (You saved</span>
              <span className="font-bold text-[#10a95b]"> 10%</span>
              <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-p dark:text-dark-text">)</span>
            </p>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-[#ff9068] border border-solid border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150">
              <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-base text-black">Buy now</div>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentForm && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <PaymentForm
              plan={selectedPlan}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </div>
        </div>
      )}

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        creditsAdded={successData?.creditsAdded || 0}
        newBalance={successData?.newBalance || 0}
        planDescription={successData?.plan?.description || ''}
      />
    </div>
    </DotPatternBackground>
  );
}

// Wrap the page with Stripe provider
function SubscriptionPageWithStripe() {
  return (
    <StripeProvider>
      <SubscriptionPage />
    </StripeProvider>
  );
}

export default withAuthProtection(SubscriptionPageWithStripe, {
  requireAuth: true,
  requireProfile: true
});
