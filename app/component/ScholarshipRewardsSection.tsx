import React, { useEffect, useRef } from 'react';

interface ScholarshipsAwardsSectionProps {
  studentProfiles?: any[];
  universityData?: any;
}

const ScholarshipsAwardsSection = ({ studentProfiles = [], universityData }: ScholarshipsAwardsSectionProps) => {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  // Calculate dynamic scholarship data from student profiles
  const calculateScholarshipData = () => {
    if (studentProfiles.length > 0) {
      // Analyze student profiles to determine scholarship tiers
      const scholarshipCounts = {
        tier1: 0, // Local
        tier2: 0, // State  
        tier3: 0, // National
        tier4: 0  // International
      };

      studentProfiles.forEach(student => {
        // Analyze student's achievements to determine scholarship tier
        const gpa = student.gpa?.current || student.academicInfo?.gpa || 3.5;
        const testScore = student.testScores?.sat || student.sat || 1200;
        const activities = student.activities?.length || student.extracurriculars?.length || 3;
        const awards = student.awards?.length || student.achievements?.length || 1;

        // Calculate scholarship tier based on profile strength
        const profileStrength = (gpa / 4.0) * 0.4 + (testScore / 1600) * 0.3 + (Math.min(activities, 10) / 10) * 0.2 + (Math.min(awards, 5) / 5) * 0.1;

        if (profileStrength >= 0.85) {
          scholarshipCounts.tier4++; // International
        } else if (profileStrength >= 0.7) {
          scholarshipCounts.tier3++; // National
        } else if (profileStrength >= 0.55) {
          scholarshipCounts.tier2++; // State
        } else {
          scholarshipCounts.tier1++; // Local
        }
      });

      const total = studentProfiles.length;
      const tier1Pct = Math.round((scholarshipCounts.tier1 / total) * 100);
      const tier2Pct = Math.round((scholarshipCounts.tier2 / total) * 100);
      const tier3Pct = Math.round((scholarshipCounts.tier3 / total) * 100);
      const tier4Pct = Math.round((scholarshipCounts.tier4 / total) * 100);

      return {
        segments: [
          { label: `Tier 1 (Local) - ${tier1Pct}%`, value: tier1Pct, color: '#80CAFF' },
          { label: `Tier 2 (State) - ${tier2Pct}%`, value: tier2Pct, color: '#85E0A3' },
          { label: `Tier 3 (National) - ${tier3Pct}%`, value: tier3Pct, color: '#FFD966' },
          { label: `Tier 4 (International) - ${tier4Pct}%`, value: tier4Pct, color: '#FFAFA3' }
        ],
        mostCommonTier: tier3Pct >= Math.max(tier1Pct, tier2Pct, tier4Pct) ? 'National (Tier 3)' :
                       tier2Pct >= Math.max(tier1Pct, tier3Pct, tier4Pct) ? 'State (Tier 2)' :
                       tier4Pct >= Math.max(tier1Pct, tier2Pct, tier3Pct) ? 'International (Tier 4)' : 'Local (Tier 1)',
        recommendedTier: tier3Pct >= 30 ? 'state level (Tier 2)' : 'local level (Tier 1)'
      };
    }

    // Fallback to default data
    return {
      segments: [
        { label: 'Tier 1 (Local) - 12%', value: 12, color: '#80CAFF' },
        { label: 'Tier 2 (State) - 28%', value: 28, color: '#85E0A3' },
        { label: 'Tier 3 (National) - 36%', value: 36, color: '#FFD966' },
        { label: 'Tier 4 (International) - 24%', value: 24, color: '#FFAFA3' }
      ],
      mostCommonTier: 'National (Tier 3)',
      recommendedTier: 'state level (Tier 2)'
    };
  };

  const scholarshipData = calculateScholarshipData();
  const universityName = universityData?.name || 'this university';

  interface ChartSegment {
  label: string;
  value: number;
  color: string;
}

interface ChartData {
  segments: ChartSegment[];
}

const drawDonutChart = (canvas: HTMLCanvasElement, data: ChartData) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Exit if context is not available
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = 180;
    const innerRadius = 90;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let currentAngle = -Math.PI / 2; // Start from top
    const total = data.segments.reduce((sum, segment) => sum + segment.value, 0);
    
    data.segments.forEach((segment) => {
      const sliceAngle = (segment.value / total) * 2 * Math.PI;
      
      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      currentAngle += sliceAngle;
    });
  };

  useEffect(() => {
    if (canvasRef1.current) {
      drawDonutChart(canvasRef1.current, scholarshipData);
    }
    if (canvasRef2.current) {
      drawDonutChart(canvasRef2.current, scholarshipData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentProfiles, universityData]);

  const Label = ({ text, position }: { text: string; position: string }) => (
    <div 
      className={`absolute border-2 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-tertiary border-black px-2 py-1 text-sm font-medium ${position}`}
      style={{ boxShadow: '2px 2px 0 0 #000' }}
    >
      {text}
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-[80px] max-w-7xl mx-auto border-b-[1px] border-light-text dark:border-dark-text">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-4">Scholarships & Rewards</h2>
        <p className="text-light-p dark:text-dark-text text-base leading-relaxed w-full sm:w-3/4 lg:w-1/2">
        Here’s how admits at this university rank in terms of scholarships and awards on average
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 p-4 sm:p-6 lg:p-10">
        {/* Average ASU Student Chart */}
        <div className="flex flex-col items-center text-black">
          <div className="relative w-full max-w-[320px] sm:max-w-[420px] h-[320px] sm:h-[420px] mb-4">
            <canvas 
              ref={canvasRef1} 
              width={420} 
              height={420}
              className="w-full h-full"
            ></canvas>
            
            {/* Dynamic Labels */}
            <Label text={scholarshipData.segments[0].label} position="top-10 right-4" />
            <Label text={scholarshipData.segments[1].label} position="bottom-28 -right-1" />
            <Label text={scholarshipData.segments[2].label} position="bottom-12 left-1" />
            <Label text={scholarshipData.segments[3].label} position="top-14 left-1" />
          </div>
        </div>


        {/* Right Section - Info Card */}
        <div className="w-full lg:flex-[0_0_45%] lg:w-[45%] h-auto lg:h-full border-[1px] p-4 sm:p-6 border-black bg-light-bg dark:bg-dark-tertiary mt-6 lg:mt-0" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          {/* Light bulb icon */}
          <div className="mb-6 ">
            <span className="text-6xl ">💡</span>
          </div>
          
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 leading-tight">
            Most admits at {universityName} have a {scholarshipData.mostCommonTier} scholarship
          </h3>
          
          <p className="text-light-p dark:text-dark-text leading-relaxed">
            It&apos;s recommended that you at least have a {scholarshipData.recommendedTier} scholarship/award for best chance of admission
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsAwardsSection;