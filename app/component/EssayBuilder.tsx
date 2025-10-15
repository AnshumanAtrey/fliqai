"use client";

import React, { useEffect, useRef, useState } from 'react';
import { DotPatternBackground } from './DotPatternBackground';
import { ActionableSuggestionsSection } from "./essay-builder/ActionableSuggestionsSection";
import { EssayInputSection } from "./essay-builder/EssayInputSection";
import { EssayStyleSection } from "./essay-builder/EssayStyleSection";
import { HeaderSection } from "./essay-builder/HeaderSection";
import { StrengthsGapsSection } from "./essay-builder/StrengthsGapsSection";
import { SuggestionsSection } from "./essay-builder/SuggestionsSection";
import { useAuth } from '../../lib/hooks/useAuth';

// Types for chart data
type ChartSegment = {
  label: string;
  value: number;
  color: string;
};

type ChartData = {
  segments: ChartSegment[];
};

// Analysis data types
interface StrengthsGap {
  category: string;
  percentage: number;
  color: string;
}

interface ActionableSuggestion {
  suggestion: string;
  category: string;
}

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

// Data for Essay Analysis
const essayData: ChartData = {
  segments: [
    { label: 'Narrative Reflection - 50%', value: 50, color: '#FF9269' },
    { label: 'Voice/Style - 10%', value: 10, color: '#FFF3ED' },
    { label: 'Reflection - 20%', value: 20, color: '#FFC3A9' },
    { label: 'Academics - 10%', value: 10, color: '#FF9269' },
    { label: 'Impact - 10%', value: 10, color: '#FFE3D4' }
  ]
};

// Label component for chart annotations
const Label = ({ text, position }: { text: string; position: string }) => (
  <div
    className={`absolute border-[1px] text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-tertiary border-black px-2 py-1 text-sm font-medium ${position}`}
    style={{ boxShadow: '2px 2px 0 0 #000' }}
  >
    {text}
  </div>
);

const EssayBuilder = () => {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const { refreshToken } = useAuth();
  const [analysisData, setAnalysisData] = useState<EssayAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // API call to analyze essay
  const handleAnalyzeEssay = async (essay: string, prompt: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Get auth token from the auth context
      let token = null;
      try {
        token = await refreshToken();
      } catch (authError) {
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
      setError(err instanceof Error ? err.message : 'Failed to analyze essay');
      
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

  const drawDonutChart = (canvas: HTMLCanvasElement, data: ChartData) => {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = 180;
    const innerRadius = 90;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentAngle = -Math.PI / 2; // Start from top
    const total = data.segments.reduce((sum: number, segment: ChartSegment) => sum + segment.value, 0);

    data.segments.forEach((segment: ChartSegment) => {
      const sliceAngle = (segment.value / total) * 2 * Math.PI;

      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();

      currentAngle += sliceAngle;
    });
  };

  useEffect(() => {
    if (canvasRef1.current) {
      const chartData = analysisData?.essayStyle || essayData;
      drawDonutChart(canvasRef1.current, chartData);
    }
  }, [analysisData]);
  return (
    <div className="relative">
      <DotPatternBackground>
        <div className="w-screen min-h-screen text-black">
          <div className="bg-[url('/essay-builder.png')] bg-cover bg-[50%_50%] w-[1440px] h-[2424px] relative mx-auto" style={{ overflow: 'visible' }}>
            <HeaderSection />

            {/* Main Content Container */}
            <div className="absolute top-[300px] max-h-[2400px] left-0 right-0 flex justify-between gap-[10px] px-[30px]">
              {/* Left Section - Essay Input */}
              <EssayInputSection onAnalyze={handleAnalyzeEssay} isAnalyzing={isAnalyzing} />

              {/* Right Section - Analysis */}
              <div className="w-[572px] h-[2100px] mb-[20px] mr-[20px] p-[24px] bg-light-bg dark:bg-dark-secondary border-[1px] border-black dark:border-dark-text" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                <div className="flex w-[477px] flex-col gap-[24px] items-start flex-nowrap">
                  <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]">
                    <span className="h-[30px] self-stretch shrink-0 basis-auto font-['Outfit'] text-[24px] font-semibold leading-[30px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[2]">
                      How an Adcom officer might read this essay{" "}
                    </span>
                    <span className="flex w-[477px] h-[48px] justify-start items-start self-stretch shrink-0 font-['Outfit'] text-[16px] font-normal leading-[24px] text-light-p dark:text-dark-text relative text-left z-[3]">
                      These are the characteristics an admissions officer might perceive
                      you to have based on your current essay draft.
                    </span>
                  </div>
                  {analysisData ? (
                    <div className="flex flex-wrap gap-[8px] max-w-[500px]">
                      {analysisData.personalityTraits.map((trait, index) => (
                        <div key={index} className="flex pt-[4px] pr-[16px] pb-[4px] pl-[16px] gap-[8px] justify-center items-center flex-nowrap bg-[#ffc3a9] border-solid border border-[#000] dark:border-dark-text">
                          <span className="font-['Outfit'] text-[15px] font-normal leading-[22.5px] text-light-text whitespace-nowrap">
                            {trait}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex w-[443px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[4]">
                      <div className="text-light-p dark:text-dark-text font-['Outfit'] text-[16px]">
                        {isAnalyzing ? 'Analyzing your essay...' : 'Submit your essay to see personality traits analysis'}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex w-[504px] flex-col gap-[16px] items-start flex-nowrap relative z-[23] mt-[82px] mr-0 mb-0 ml-0">
                  <div className="flex w-[477px] flex-col gap-[4px] items-start shrink-0 flex-nowrap relative z-[24]">
                    <span className="h-[30px] self-stretch shrink-0 basis-auto font-['Outfit'] text-[24px] font-semibold leading-[30px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[25]">
                      Strengths and gaps of your current essay
                    </span>
                    <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Outfit'] text-[16px] font-normal leading-[24px] text-light-p dark:text-dark-text relative text-left whitespace-nowrap z-[26]">
                      Here are some metrics which we feel your essay is strong/weak in.
                    </span>
                  </div>
                  <div className="flex pt-[32px] pr-0 pb-[32px] pl-0 gap-[32px] justify-center items-end self-stretch shrink-0 flex-wrap bg-light-secondary dark:bg-dark-tertiary border-solid border border-[#000] dark:border-dark-text relative z-[27]">
                    {analysisData ? (
                      analysisData.strengthsAndGaps.map((item, index) => {
                        // Calculate height based on percentage (max height 200px)
                        const height = (item.percentage / 100) * 200;
                        // Color based on percentage: high (>70) = orange, medium (40-70) = light orange, low (<40) = very light
                        const bgColor = item.percentage >= 70 ? '#ff9269' : item.percentage >= 40 ? '#ffc3a9' : '#ffe3d4';
                        
                        return (
                          <div key={index} className="flex w-[50px] flex-col gap-[16px] items-center shrink-0 flex-nowrap relative">
                            <div className="flex flex-col gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative">
                              <span className="h-[18px] self-stretch shrink-0 basis-auto font-['Outfit'] text-[14px] font-semibold leading-[17.64px] text-light-text dark:text-dark-text relative text-center whitespace-nowrap">
                                {item.percentage}%
                              </span>
                              <div 
                                className="self-stretch shrink-0 border-solid border border-[#000] dark:border-dark-text relative"
                                style={{ 
                                  height: `${height}px`,
                                  backgroundColor: bgColor,
                                  minHeight: '20px' 
                                }}
                              />
                            </div>
                            <span className="h-[18px] shrink-0 basis-auto font-['Outfit'] text-[14px] font-medium leading-[17.64px] text-light-text dark:text-dark-text relative text-center whitespace-nowrap">
                              {item.category}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex justify-center items-center w-full h-[200px]">
                        <span className="font-['Outfit'] text-[16px] text-light-p dark:text-dark-text">
                          {isAnalyzing ? 'Analyzing strengths and gaps...' : 'Submit your essay to see analysis'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex w-[477px] flex-col gap-[8px] items-start flex-nowrap relative z-[48] mt-[80px] mr-0 mb-0 ml-0">
                  <span className="h-[30px] self-stretch shrink-0 basis-auto font-['Outfit'] text-[24px] font-semibold leading-[30px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[49]">
                    Actionable Suggestions
                  </span>
                  <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Outfit'] text-[16px] font-normal leading-[24px] text-light-p dark:text-dark-text relative text-left whitespace-nowrap z-50">
                    Here’s a few suggestions we have that will strengthen your essay.
                  </span>
                </div>
                <div className="flex w-[504px] flex-col gap-[16px] items-start flex-nowrap relative z-[51] mt-[25px] mr-0 mb-0 ml-0">
                  {analysisData ? (
                    analysisData.actionableSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[16px] justify-center items-start self-stretch shrink-0 flex-nowrap bg-light-secondary dark:bg-dark-tertiary border-solid border border-[#000] dark:border-dark-text relative">
                        <span className="flex justify-start items-start self-stretch shrink-0 font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left">
                          {suggestion.suggestion}
                        </span>
                        <div className="flex pt-[4px] pr-[16px] pb-[4px] pl-[16px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#ffc3a9] border-solid border border-[#000] dark:border-dark-text relative">
                          <span className="font-['Outfit'] text-[15px] font-normal leading-[22.5px] text-light-text whitespace-nowrap">
                            To improve: {suggestion.category}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center w-full h-[100px] bg-light-secondary dark:bg-dark-tertiary border-solid border border-[#000] dark:border-dark-text">
                      <span className="font-['Outfit'] text-[16px] text-light-p dark:text-dark-text">
                        {isAnalyzing ? 'Generating suggestions...' : 'Submit your essay to see actionable suggestions'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex w-[477px] flex-col gap-[8px] items-start flex-nowrap relative z-[68] mt-[76px] mr-0 mb-0 ml-0">
                  <span className="h-[30px] self-stretch shrink-0 basis-auto font-['Outfit'] text-[24px] font-semibold leading-[30px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[69]">
                    Essay Style
                  </span>
                  <span className="h-[24px] self-stretch shrink-0 basis-auto font-['Outfit'] text-[16px] font-normal leading-[24px] text-light-p dark:text-dark-text relative text-left whitespace-nowrap z-[70]">
                    A graphical analysis of the style of your current essay.
                  </span>
                </div>
                <div className="flex flex-col items-center text-black">
                  <div className="relative w-[420px] h-[420px] mb-4">
                    <canvas
                      ref={canvasRef1}
                      width={420}
                      height={420}
                      className="w-full h-full"
                    ></canvas>

                    {/* Custom labels for the chart segments */}
                    <Label text="Voice/Style - 10%" position="top-10 left-4" />
                    <Label text="Narrative Reflection - 50%" position="top-10 right-4" />
                    <Label text="Academics - 10%" position="bottom-28 -left-10" />
                    <Label text="Reflection - 20%" position="top-36 -left-10" />
                    <Label text="Impact - 10%" position="bottom-5 transform translate-x-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DotPatternBackground >
    </div>
    );
};

export default EssayBuilder;