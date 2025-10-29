"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DotPatternBackground } from '../component/DotPatternBackground';
import { EssayInputSection } from "./components/EssayInputSection";
import { EssayStyleSection } from "./components/EssayStyleSection";
import { HeaderSection } from "./components/HeaderSection";
import { PersonalityTraitsSection } from "./components/PersonalityTraitsSection";
import { StrengthsGapsSection } from "./components/StrengthsGapsSection";
import { ActionableSuggestionsSection } from "./components/ActionableSuggestionsSection";
import { StudentProfilesSection } from "./components/StudentProfilesSection";
import Header from '../component/header';
import { useAuth } from '../../lib/hooks/useAuth';
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';

// Analysis data types
interface EssayStyleData {
  label: string;
  value: number;
  color: string;
}

interface EssayStyleChartData {
  segments: EssayStyleData[];
}

interface EssayAnalysis {
  personalityTraits: string[];
  strengthsAndGaps: {
    category: string;
    percentage: number;
  }[];
  actionableSuggestions: {
    suggestion: string;
    category: string;
  }[];
  essayStyle: EssayStyleChartData;
  overallScore?: number;
  wordCount?: number;
}

const EssayBuilderPage = () => {
  const { refreshToken } = useAuth();
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState<EssayAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // API call to analyze essay
  const handleAnalyzeEssay = async (essay: string, prompt: string) => {
    setIsAnalyzing(true);

    try {
      // Get auth token from the auth context
      let token = null;
      try {
        token = await refreshToken();
      } catch {
        console.warn('Could not get auth token, proceeding without authentication for development');
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/essay/analyze`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ essay, prompt })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze essay');
      }

      const result = await response.json();
      console.log('📊 API Response:', result);

      if (result.success && result.data) {
        // Ensure essayStyle has the correct structure
        if (result.data.essayStyle && !result.data.essayStyle.segments) {
          console.warn('⚠️ essayStyle missing segments, using fallback structure');
          result.data.essayStyle = {
            segments: [
              { label: "Personal", value: 35, color: "#FF6B35" },
              { label: "Creative", value: 25, color: "#F7931E" },
              { label: "Academics", value: 10, color: "#FF9269" },
              { label: "Professional", value: 30, color: "#FFD23F" }
            ]
          };
        }
        console.log('✅ Setting analysis data:', result.data);
        setAnalysisData(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Essay analysis error:', err);

      // For demo purposes, use sample data if API fails
      const sampleData: EssayAnalysis = {
        personalityTraits: ["Resilience", "Leadership", "Curiosity", "Motivated", "Collaboration", "Impact", "Empathy", "Authenticity"],
        strengthsAndGaps: [
          { category: "Curiosity", percentage: 91 },
          { category: "Creativity", percentage: 32 },
          { category: "Adaptability", percentage: 48 },
          { category: "Collaboration", percentage: 75 }
        ],
        actionableSuggestions: [
          { suggestion: "Try using more personal anecdotes and reflective thoughts to make your essay sound authentic", category: "Authenticity" },
          { suggestion: "Cut 50 or so words from paragraph 2 to improve flow.", category: "Grammar" },
          { suggestion: "Your essay ends abruptly, try tying the conclusion back to your opening scene.", category: "Structure" },
          { suggestion: "Reconnect your story back to your chosen career goals.", category: "Reflection" }
        ],
        essayStyle: {
          segments: [
            { label: "Personal", value: 35, color: "#FF6B35" },
            { label: "Creative", value: 25, color: "#F7931E" },
            { label: "Academics", value: 10, color: "#FF9269" },
            { label: "Professional", value: 30, color: "#FFD23F" }
          ]
        },
        overallScore: 78,
        wordCount: essay.trim().split(/\s+/).length
      };
      setAnalysisData(sampleData);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-dot">
      <Header />
      <main>
        <div className="relative">
          <DotPatternBackground>
            <div className="w-full text-black">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Back to Dashboard Button */}
                <div className="mb-6">
                  <button 
                    className="flex items-center gap-2 text-light-text dark:text-dark-text hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => router.push('/discover-students')}
                  >
                    <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_d_1_332)">
                        <rect width="30" height="29" fill="#FF9169" />
                        <rect x="0.5" y="0.5" width="29" height="28" stroke="black" />
                        <path d="M17.5 8.75C17.6989 8.75006 17.8896 8.82908 18.0303 8.96973C18.1709 9.11037 18.2499 9.30112 18.25 9.5C18.25 9.69886 18.1708 9.8896 18.0303 10.0303V10.0312L13.5605 14.5L18.0303 18.9688V18.9697C18.0998 19.0393 18.1557 19.122 18.1934 19.2129C18.231 19.3038 18.25 19.4016 18.25 19.5C18.25 19.5984 18.231 19.6962 18.1934 19.7871C18.1557 19.8781 18.0999 19.9606 18.0303 20.0303C17.9606 20.0999 17.8781 20.1557 17.7871 20.1934C17.6962 20.231 17.5984 20.25 17.5 20.25C17.4016 20.25 17.3038 20.231 17.2129 20.1934C17.122 20.1557 17.0393 20.0998 16.9697 20.0303L11.9697 15.0303C11.9002 14.9607 11.8453 14.878 11.8076 14.7871C11.7699 14.6961 11.75 14.5986 11.75 14.5C11.75 14.4014 11.7699 14.3039 11.8076 14.2129C11.8453 14.122 11.9002 14.0393 11.9697 13.9697L16.9697 8.96973C17.1104 8.82917 17.3011 8.75 17.5 8.75Z" fill="black" stroke="black" strokeWidth="0.5" />
                      </g>
                      <defs>
                        <filter id="filter0_d_1_332" x="0" y="0" width="32" height="31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset dx="2" dy="2" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_332" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_332" result="shape" />
                        </filter>
                      </defs>
                    </svg>
                    <span className="font-outfit text-sm">Back to Dashboard</span>
                  </button>
                </div>
                
                <HeaderSection />

                {/* Main Content Container - Responsive Flexbox Layout */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-8 lg:mt-16 lg:items-start">

                  {/* Left Section - Essay Input */}
                  <div className="w-full lg:w-1/2 xl:w-3/5 lg:sticky lg:top-6">
                    <EssayInputSection onAnalyze={handleAnalyzeEssay} isAnalyzing={isAnalyzing} />
                  </div>

                  {/* Right Section Container */}
                  <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col gap-4 lg:gap-6">
                    {/* Essay Analysis Section */}
                    <div className="p-4 sm:p-6 bg-light-bg dark:bg-dark-secondary border border-black dark:border-dark-text" style={{ boxShadow: '4px 4px 0 0 #000' }}>

                      {/* Personality Traits Section */}
                      <PersonalityTraitsSection
                        analysisData={analysisData}
                        isAnalyzing={isAnalyzing}
                      />

                      {/* Strengths and Gaps Section */}
                      <StrengthsGapsSection
                        analysisData={analysisData}
                        isAnalyzing={isAnalyzing}
                      />

                      {/* Actionable Suggestions Section */}
                      <ActionableSuggestionsSection
                        analysisData={analysisData}
                        isAnalyzing={isAnalyzing}
                      />

                      {/* Essay Style Section - Dynamic Donut Chart */}
                      <EssayStyleSection
                        essayData={analysisData?.essayStyle?.segments}
                        isAnalyzing={isAnalyzing}
                      />
                    </div>

                    {/* Student Profiles Section - Separate div in right column */}
                    <StudentProfilesSection />
                  </div>
                </div>
              </div>
            </div>
          </DotPatternBackground>
        </div>
      </main>
    </div>
  );
};

export default withAuthProtection(EssayBuilderPage, {
  requireAuth: true,
  requireProfile: false
});