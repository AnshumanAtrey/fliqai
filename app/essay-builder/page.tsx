"use client";

import React, { useState } from 'react';
import { DotPatternBackground } from '../component/DotPatternBackground';
import { EssayInputSection } from "./components/EssayInputSection";
import { EssayStyleSection } from "./components/EssayStyleSection";
import { HeaderSection } from "./components/HeaderSection";
import { PersonalityTraitsSection } from "./components/PersonalityTraitsSection";
import { StrengthsGapsSection } from "./components/StrengthsGapsSection";
import { ActionableSuggestionsSection } from "./components/ActionableSuggestionsSection";
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
      if (result.success && result.data) {
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
                <HeaderSection />

                {/* Main Content Container - Responsive Flexbox Layout */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-8 lg:mt-16 lg:items-start">
                  
                  {/* Left Section - Essay Input */}
                  <div className="w-full lg:w-1/2 xl:w-3/5 lg:sticky lg:top-6">
                    <EssayInputSection onAnalyze={handleAnalyzeEssay} isAnalyzing={isAnalyzing} />
                  </div>

                  {/* Right Section - Analysis */}
                  <div className="w-full lg:w-1/2 xl:w-2/5 p-4 sm:p-6 bg-light-bg dark:bg-dark-secondary border border-black dark:border-dark-text" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                    
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
                    <div className="mt-16 sm:mt-20 w-full">
                      <EssayStyleSection
                        essayData={analysisData ? {
                          narrative: analysisData.essayStyle.segments.find(s => s.label.toLowerCase().includes('narrative') || s.label.toLowerCase().includes('personal'))?.value || 0,
                          reflection: analysisData.essayStyle.segments.find(s => s.label.toLowerCase().includes('reflection') && !s.label.toLowerCase().includes('narrative'))?.value || 0,
                          impact: analysisData.essayStyle.segments.find(s => s.label.toLowerCase().includes('impact'))?.value || 0,
                          academics: analysisData.essayStyle.segments.find(s => s.label.toLowerCase().includes('academic'))?.value || 0,
                          voice: analysisData.essayStyle.segments.find(s => s.label.toLowerCase().includes('voice') || s.label.toLowerCase().includes('style') || s.label.toLowerCase().includes('creative') || s.label.toLowerCase().includes('professional'))?.value || 0
                        } : undefined}
                      />
                    </div>
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