import React, { useEffect, useRef } from 'react';

interface ReadinessRingProps {
  userProfile?: any;
  universityData?: any;
  studentProfiles?: any[];
}

const ReadinessRingSection = ({ userProfile, universityData, studentProfiles = [] }: ReadinessRingProps) => {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  // Calculate dynamic data based on props
  const calculateAverageStudentData = () => {
    if (studentProfiles.length > 0) {
      // Calculate averages from actual student profiles
      const avgAcademics = studentProfiles.reduce((sum, student) => {
        const gpa = student.gpa?.current || student.academicInfo?.gpa || 3.5;
        return sum + (gpa / 4.0 * 100);
      }, 0) / studentProfiles.length;

      const avgTestScores = studentProfiles.reduce((sum, student) => {
        const sat = student.testScores?.sat || student.sat || 1200;
        return sum + (sat / 1600 * 100);
      }, 0) / studentProfiles.length;

      const avgExtracurriculars = studentProfiles.reduce((sum, student) => {
        const activities = student.activities?.length || student.extracurriculars?.length || 3;
        return sum + Math.min(activities * 10, 100);
      }, 0) / studentProfiles.length;

      const avgProjects = 100 - avgAcademics - avgTestScores - avgExtracurriculars;

      return {
        segments: [
          { label: `Academics - ${Math.round(avgAcademics)}%`, value: Math.round(avgAcademics), color: '#80CAFF' },
          { label: `Personal Projects - ${Math.round(Math.max(avgProjects, 5))}%`, value: Math.round(Math.max(avgProjects, 5)), color: '#FFAFA3' },
          { label: `Extracurriculars - ${Math.round(avgExtracurriculars)}%`, value: Math.round(avgExtracurriculars), color: '#FFD966' },
          { label: `Test Scores - ${Math.round(avgTestScores)}%`, value: Math.round(avgTestScores), color: '#85E0A3' }
        ]
      };
    }

    // Fallback to default data
    return {
      segments: [
        { label: 'Academics - 38%', value: 38, color: '#80CAFF' },
        { label: 'Personal Projects - 18%', value: 18, color: '#FFAFA3' },
        { label: 'Extracurriculars - 15%', value: 15, color: '#FFD966' },
        { label: 'Test Scores - 35%', value: 35, color: '#85E0A3' }
      ]
    };
  };

  const calculateUserData = () => {
    if (userProfile) {
      // Calculate user's scores based on their profile
      const userGPA = userProfile.gpa?.current || userProfile.academicInfo?.gpa || 3.7;
      const userAcademics = (userGPA / 4.0) * 100;

      const userSAT = userProfile.testScores?.sat || userProfile.sat || 1400;
      const userTestScores = (userSAT / 1600) * 100;

      const userActivities = userProfile.activities?.length || userProfile.extracurriculars?.length || 2;
      const userExtracurriculars = Math.min(userActivities * 12, 100);

      const userProjects = Math.max(100 - userAcademics - userTestScores - userExtracurriculars, 5);

      return {
        segments: [
          { label: `Academics - ${Math.round(userAcademics)}%`, value: Math.round(userAcademics), color: '#80CAFF' },
          { label: `Personal Projects - ${Math.round(userProjects)}%`, value: Math.round(userProjects), color: '#FFAFA3' },
          { label: `Extracurriculars - ${Math.round(userExtracurriculars)}%`, value: Math.round(userExtracurriculars), color: '#FFD966' },
          { label: `Test Scores - ${Math.round(userTestScores)}%`, value: Math.round(userTestScores), color: '#85E0A3' }
        ]
      };
    }

    // Fallback to default data
    return {
      segments: [
        { label: 'Academics - 32%', value: 32, color: '#80CAFF' },
        { label: 'Personal Projects - 9%', value: 9, color: '#FFAFA3' },
        { label: 'Extracurriculars - 8%', value: 8, color: '#FFD966' },
        { label: 'Test Scores - 55%', value: 55, color: '#85E0A3' }
      ]
    };
  };

  const asuData = calculateAverageStudentData();
  const youData = calculateUserData();

  // Get university name for display
  const universityName = universityData?.name || 'ASU';

  const drawDonutChart = (canvas: HTMLCanvasElement, data: { segments: Array<{ label: string; value: number; color: string }> }) => {
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
      drawDonutChart(canvasRef1.current, asuData);
    }
    if (canvasRef2.current) {
      drawDonutChart(canvasRef2.current, youData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Label = ({ text, position }: { text: string; position: string }) => (
    <div 
      className={`absolute border-2 text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-tertiary border-black px-2 py-1 text-sm font-medium ${position}`}
      style={{ boxShadow: '2px 2px 0 0 #000' }}
    >
      {text}
    </div>
  );

  return (
    <div className="px-4 sm:px-8 lg:px-14 py-8 sm:py-10 lg:py-14">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-[32px] font-bold text-light-text dark:text-dark-text mb-3 sm:mb-4">Readiness Ring</h2>
        <p className="text-light-p dark:text-dark-text text-sm sm:text-base leading-relaxed max-w-2xl">
          Based on {studentProfiles.length || 192} students who got into {universityName} with similar backgrounds this
          is how we think you match {universityName}
        </p>
      </div>

      <div className="hidden lg:flex items-center justify-center gap-20">
        {/* Average ASU Student Chart - Desktop Only */}
        <div className="flex flex-col items-center text-black">
          <div className="relative w-[350px] h-[350px] xl:w-[400px] xl:h-[400px] mb-4">
            <canvas 
              ref={canvasRef1} 
              width={400} 
              height={400}
              className="w-full h-full"
            ></canvas>
            
            {/* Labels for ASU Student */}
            <Label text="Academics - 38%" position="top-20 right-4" />
            <Label text="Personal Projects - 18%" position="bottom-10 right-2" />
            <Label text="Extracurriculars - 15%" position="bottom-12 left-1" />
            <Label text="Test Scores - 35%" position="top-14 left-2" />
          </div>
          <h3 className="text-xl font-bold text-light-p dark:text-dark-text">Average {universityName} Student</h3>
        </div>

        {/* VS Text */}
        <div className="text-2xl font-bold text-light-text dark:text-dark-text">
          VS
        </div>

        {/* You Chart - Desktop Only */}
        <div className="flex flex-col items-center text-black">
          <div className="relative w-[350px] h-[350px] xl:w-[400px] xl:h-[400px] mb-4">
            <canvas 
              ref={canvasRef2} 
              width={400} 
              height={400}
              className="w-full h-full"
            ></canvas>
            
            {/* Labels for You */}
            <Label text="Personal Projects - 9%" position="bottom-28 -right-20" />
            <Label text="Academics - 32%" position="right-4 top-40" />
            <Label text="Extracurriculars - 8%" position="bottom-10 right-16" />
            <Label text="Test Scores - 55%" position="top-12 left-1" />
          </div>
          <h3 className="text-xl font-bold text-light-p dark:text-dark-text">You</h3>
        </div>
      </div>

      {/* Mobile View - Show text summary instead of charts */}
      <div className="lg:hidden space-y-6">
        <div className="bg-light-bg dark:bg-dark-tertiary border-2 border-black p-4" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">Average {universityName} Student</h3>
          <div className="space-y-2">
            {asuData.segments.map((segment, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-4 h-4 border border-black" style={{ backgroundColor: segment.color }}></div>
                <span className="text-sm text-light-p dark:text-dark-text">{segment.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-lg font-bold text-light-text dark:text-dark-text">VS</div>

        <div className="bg-light-bg dark:bg-dark-tertiary border-2 border-black p-4" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">You</h3>
          <div className="space-y-2">
            {youData.segments.map((segment, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-4 h-4 border border-black" style={{ backgroundColor: segment.color }}></div>
                <span className="text-sm text-light-p dark:text-dark-text">{segment.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadinessRingSection;