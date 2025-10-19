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

// Import components
import { StudentProfilesDetails } from './components/StudentProfilesDetails';
import { EssayRevisionsDetails } from './components/EssayRevisionsDetails';
import { QuestionnaireSection } from './components/QuestionnaireSection';
import { PlanCard } from './components/PlanCard';

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
  const { fetchPlans } = usePayment();

  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<{
    planName: string;
    amount: number;
    creditsAdded?: number;
    newBalance?: number;
    plan?: { description?: string }
  } | null>(null);
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
  const [questionnaireData, setQuestionnaireData] = useState({
    colleges: '1',
    deadline: 'In several months'
  });
  const [recommendedPlan, setRecommendedPlan] = useState<PaymentPlan | null>(null);

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

  const handlePaymentSuccess = (result: {
    paymentIntent?: string | object;
    creditsAdded: number;
    newBalance: number;
    plan: Partial<PaymentPlan> & { credits?: number; price?: number; name?: string };
  }) => {
    setShowPaymentForm(false);
    // Transform the result to match the success modal expectations
    const successResult = {
      planName: result.plan.description || result.plan.name || 'Plan',
      amount: result.plan.price || 0,
      creditsAdded: result.creditsAdded,
      newBalance: result.newBalance,
      plan: { description: result.plan.description }
    };
    setSuccessData(successResult);
    setShowSuccessModal(true);
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    setSelectedPlan(null);
  };

  const handleQuestionnaireSubmit = () => {
    // Simple recommendation logic based on questionnaire
    // Recommend 100 credits plan (popular choice)
    const recommended = plans.find(p => p.credits === 100 && p.packageType === 'student_profiles') || plans[1];
    setRecommendedPlan(recommended);
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

        {/* Main Container - Responsive Layout */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

          {/* Desktop Layout: Side by side */}
          <div className="hidden lg:flex gap-6">
            {/* Left Section - 52% - What we offer */}
            <div className="flex-[0_0_52%] flex flex-col gap-6">
              <h2 className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-lg tracking-[0] leading-[27px]">
                What we offer:
              </h2>

              {/* Two columns: Student Profiles + Essay Revisions */}
              <div className="flex gap-4">
                <StudentProfilesDetails />
                <EssayRevisionsDetails />
              </div>

              {/* Questionnaire Section */}
              <QuestionnaireSection onOpenQuestionnaire={() => setShowQuestionnaireModal(true)} />
            </div>

            {/* Right Section - 45% - Credit Cards */}
            <div className="flex-[0_0_45%] flex flex-col gap-8">
              {/* Student Profiles Section */}
              <div className="flex flex-col gap-4">
                <h2 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Student Profiles</h2>

                <div className="flex gap-2">
                  {studentProfilePlans.map((plan) => (
                    <PlanCard key={plan.planId} plan={plan} onSelect={handlePlanSelect} />
                  ))}
                </div>
              </div>

              {/* Separator Line */}
              <div className="w-full h-px bg-black"></div>

              {/* Essay Revisions Section */}
              <div className="flex flex-col gap-4">
                <h2 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Essay Revisions</h2>

                <div className="flex gap-2">
                  {essayRevisionPlans.map((plan) => (
                    <PlanCard key={plan.planId} plan={plan} onSelect={handlePlanSelect} />
                  ))}
                </div>
              </div>

              {/* Separator Line */}
              <div className="w-full h-px bg-black"></div>

              {/* Total and Buy Section */}
              <div className="flex items-center justify-between p-2.5 bg-light-bg dark:bg-dark-secondary border border-solid border-black">
                <p className="[font-family:'Outfit-Bold',Helvetica] text-base">
                  <span className="font-bold text-black">Total: </span>
                  <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-p dark:text-dark-text">₹6299 (You saved</span>
                  <span className="font-bold text-[#10a95b]"> 10%</span>
                  <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-p dark:text-dark-text">)</span>
                </p>
                <button className="inline-flex items-center justify-center px-4 py-2 bg-[#ff9068] border border-solid border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150">
                  <div className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-sm text-black">Buy now</div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Layout: Stacked vertically */}
          <div className="lg:hidden flex flex-col gap-6">
            {/* What we offer section */}
            <h2 className="[font-family:'Outfit-SemiBold',Helvetica] font-semibold text-light-text dark:text-dark-text text-lg tracking-[0] leading-[27px]">
              What we offer:
            </h2>

            {/* Student Profiles Details */}
            <StudentProfilesDetails />

            {/* Essay Revisions Details */}
            <EssayRevisionsDetails />

            {/* Questionnaire Section */}
            <QuestionnaireSection onOpenQuestionnaire={() => setShowQuestionnaireModal(true)} />

            {/* Student Profiles Plans */}
            <div className="flex flex-col gap-4">
              <h2 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Student Profiles</h2>

              <div className="flex flex-col sm:flex-row gap-3">
                {studentProfilePlans.map((plan) => (
                  <PlanCard key={plan.planId} plan={plan} onSelect={handlePlanSelect} />
                ))}
              </div>
            </div>

            {/* Separator Line */}
            <div className="w-full h-px bg-black"></div>

            {/* Essay Revisions Plans */}
            <div className="flex flex-col gap-4">
              <h2 className="[font-family:'Outfit-Bold',Helvetica] font-bold text-light-text dark:text-dark-text text-2xl">Essay Revisions</h2>

              <div className="flex flex-col sm:flex-row gap-3">
                {essayRevisionPlans.map((plan) => (
                  <PlanCard key={plan.planId} plan={plan} onSelect={handlePlanSelect} />
                ))}
              </div>
            </div>

            {/* Separator Line */}
            <div className="w-full h-px bg-black"></div>

            {/* Total and Buy Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-light-bg dark:bg-dark-secondary border border-solid border-black">
              <p className="[font-family:'Outfit-Bold',Helvetica] text-base sm:text-lg">
                <span className="font-bold text-black">Total: </span>
                <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-p dark:text-dark-text">₹6299 (You saved</span>
                <span className="font-bold text-[#10a95b]"> 10%</span>
                <span className="[font-family:'Outfit-Medium',Helvetica] font-medium text-light-p dark:text-dark-text">)</span>
              </p>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-[#ff9068] border border-solid border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150 w-full sm:w-auto">
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

        {/* Questionnaire Modal */}
        {showQuestionnaireModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-light-bg dark:bg-dark-secondary border border-black w-full max-w-md p-8 relative shadow-[4px_4px_0px_#000000]">
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowQuestionnaireModal(false);
                  setRecommendedPlan(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-[#FF9269] border border-black hover:bg-[#ff8050] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-outfit font-bold text-xl text-light-text dark:text-dark-text mb-2">
                    Unsure which plan is right for you?
                  </h3>
                  <p className="font-outfit text-sm text-light-p dark:text-dark-text">
                    Fill in the fields below and let us recommend a package to suit your needs
                  </p>
                </div>

                {!recommendedPlan ? (
                  <>
                    {/* Question 1 */}
                    <div className="flex flex-col gap-2">
                      <label className="font-outfit font-medium text-sm text-light-text dark:text-dark-text">
                        How many colleges do you plan to apply to?
                      </label>
                      <select
                        value={questionnaireData.colleges}
                        onChange={(e) => setQuestionnaireData({ ...questionnaireData, colleges: e.target.value })}
                        className="w-full p-3 border border-black bg-light-bg dark:bg-dark-tertiary text-light-text dark:text-dark-text font-outfit appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23000' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center'
                        }}
                      >
                        <option value="1">1</option>
                        <option value="2-3">2-3</option>
                        <option value="4-5">4-5</option>
                        <option value="6+">6+</option>
                      </select>
                    </div>

                    {/* Question 2 */}
                    <div className="flex flex-col gap-2">
                      <label className="font-outfit font-medium text-sm text-light-text dark:text-dark-text">
                        When is the deadline for your application?
                      </label>
                      <select
                        value={questionnaireData.deadline}
                        onChange={(e) => setQuestionnaireData({ ...questionnaireData, deadline: e.target.value })}
                        className="w-full p-3 border border-black bg-light-bg dark:bg-dark-tertiary text-light-text dark:text-dark-text font-outfit appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23000' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center'
                        }}
                      >
                        <option value="In several months">In several months</option>
                        <option value="In a few weeks">In a few weeks</option>
                        <option value="Less than a week">Less than a week</option>
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleQuestionnaireSubmit}
                      className="w-full py-3 bg-[#FF9269] border border-black text-light-text font-outfit font-semibold shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                      Get Recommendation
                    </button>
                  </>
                ) : (
                  <>
                    {/* Recommendation */}
                    <div className="flex flex-col gap-4">
                      <p className="font-outfit font-semibold text-sm text-light-text dark:text-dark-text">
                        Our recommendation:
                      </p>

                      <div className="border-2 border-[#FF9269] p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Image src="/Coins.svg" alt="Coins" width={24} height={13} />
                          <span className="font-outfit font-bold text-3xl text-light-text dark:text-dark-text">
                            {recommendedPlan.credits}
                          </span>
                        </div>
                        <p className="font-outfit font-semibold text-sm text-light-text dark:text-dark-text">
                          CREDITS
                        </p>
                        <p className="font-outfit text-sm text-light-text dark:text-dark-text">
                          <span className="font-medium">Unlock </span>
                          <span className="font-bold">{recommendedPlan.profilesUnlocked || 10} profiles</span>
                          {recommendedPlan.revisionsUnlocked && (
                            <span> / <span className="font-bold">{recommendedPlan.revisionsUnlocked} revisions</span></span>
                          )}
                        </p>

                        <button
                          onClick={() => {
                            handlePlanSelect(recommendedPlan);
                            setShowQuestionnaireModal(false);
                          }}
                          className="w-full py-3 bg-[#FF9269] border border-black text-light-text font-outfit font-semibold shadow-[2px_2px_0px_#000000] hover:bg-[#ff8050] transition-colors"
                        >
                          Select
                        </button>
                      </div>

                      <p className="font-outfit text-xs text-light-p dark:text-dark-text leading-relaxed">
                        This package is ideal for a student who knows which university they want to get into and have a lot of time for your next draft
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
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
