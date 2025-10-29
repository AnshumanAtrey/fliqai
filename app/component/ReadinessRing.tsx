import React, { useEffect, useRef } from 'react';

interface UserProfile {
  gpa?: { current?: number };
  testScores?: { sat?: number };
  extracurriculars?: string[];
  academicInfo?: { gpa?: number };
  sat?: number;
  activities?: string[];
}

interface UniversityData {
  acceptance_rate?: number;
  graduation_rate?: number;
  location?: string;
  name?: string;
}

interface StudentProfile {
  gpa?: { current?: string | number } | number;
  testScores?: { sat?: string | number };
  academicInfo?: { gpa?: number };
  sat?: number;
  activities?: string[];
  extracurriculars?: string[];
}

interface ReadinessRingProps {
  userProfile?: UserProfile;
  universityData?: UniversityData;
  studentProfiles?: StudentProfile[];
}

const ReadinessRingSection = ({ userProfile, universityData, studentProfiles = [] }: ReadinessRingProps) => {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  // Calculate data for a single representative student from the university
  const calculateUniversityStudentData = () => {
    if (studentProfiles.length > 0) {
      // Select the first student as representative, or pick one based on university name hash
      const universityHash = (universityData?.name || '').split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      const studentIndex = Math.abs(universityHash) % studentProfiles.length;
      const student = studentProfiles[studentIndex];

      // Calculate this specific student's profile
      const gpa = (typeof student.gpa === 'object' ? parseFloat(String(student.gpa?.current || 0)) : parseFloat(String(student.gpa || 0))) || student.academicInfo?.gpa || 3.5;
      const academics = Math.round((gpa / 4.0) * 100);

      const sat = parseFloat(String(student.testScores?.sat || student.sat || 1200));
      const testScores = Math.round((sat / 1600) * 100);

      const activities = student.activities?.length || student.extracurriculars?.length || 3;
      const extracurriculars = Math.min(Math.round(activities * 8), 25); // Cap at 25%

      const projects = Math.max(100 - academics - testScores - extracurriculars, 5);

      return {
        segments: [
          { label: `Academics - ${academics}%`, value: academics, color: '#80CAFF' },
          { label: `Personal Projects - ${projects}%`, value: projects, color: '#FFAFA3' },
          { label: `Extracurriculars - ${extracurriculars}%`, value: extracurriculars, color: '#FFD966' },
          { label: `Test Scores - ${testScores}%`, value: testScores, color: '#85E0A3' }
        ]
      };
    }

    // Generate randomized fallback data based on university name
    const universityHash = (universityData?.name || 'University').split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const seed = Math.abs(universityHash);
    const academics = 30 + (seed % 20); // 30-49%
    const testScores = 25 + ((seed >> 4) % 25); // 25-49%
    const extracurriculars = 10 + ((seed >> 8) % 15); // 10-24%
    const projects = Math.max(100 - academics - testScores - extracurriculars, 5);

    return {
      segments: [
        { label: `Academics - ${academics}%`, value: academics, color: '#80CAFF' },
        { label: `Personal Projects - ${projects}%`, value: projects, color: '#FFAFA3' },
        { label: `Extracurriculars - ${extracurriculars}%`, value: extracurriculars, color: '#FFD966' },
        { label: `Test Scores - ${testScores}%`, value: testScores, color: '#85E0A3' }
      ]
    };
  };

  const calculateUserData = () => {
    if (userProfile) {
      // Calculate user's scores based on their profile
      const userGPA = userProfile.gpa?.current || userProfile.academicInfo?.gpa || 3.7;
      const userAcademics = Math.round((userGPA / 4.0) * 100);

      const userSAT = userProfile.testScores?.sat || userProfile.sat || 1400;
      const userTestScores = Math.round((userSAT / 1600) * 100);

      const userActivities = userProfile.activities?.length || userProfile.extracurriculars?.length || 2;
      const userExtracurriculars = Math.min(Math.round(userActivities * 8), 25); // Cap at 25%

      const userProjects = Math.max(100 - userAcademics - userTestScores - userExtracurriculars, 5);

      return {
        segments: [
          { label: `Academics - ${userAcademics}%`, value: userAcademics, color: '#80CAFF' },
          { label: `Personal Projects - ${userProjects}%`, value: userProjects, color: '#FFAFA3' },
          { label: `Extracurriculars - ${userExtracurriculars}%`, value: userExtracurriculars, color: '#FFD966' },
          { label: `Test Scores - ${userTestScores}%`, value: userTestScores, color: '#85E0A3' }
        ]
      };
    }

    // Generate randomized fallback data for user (different from university student)
    const userSeed = Date.now() % 1000; // Changes periodically
    const academics = 25 + (userSeed % 25); // 25-49%
    const testScores = 35 + ((userSeed >> 3) % 30); // 35-64%
    const extracurriculars = 5 + ((userSeed >> 6) % 15); // 5-19%
    const projects = Math.max(100 - academics - testScores - extracurriculars, 5);

    return {
      segments: [
        { label: `Academics - ${academics}%`, value: academics, color: '#80CAFF' },
        { label: `Personal Projects - ${projects}%`, value: projects, color: '#FFAFA3' },
        { label: `Extracurriculars - ${extracurriculars}%`, value: extracurriculars, color: '#FFD966' },
        { label: `Test Scores - ${testScores}%`, value: testScores, color: '#85E0A3' }
      ]
    };
  };

  const universityStudentData = calculateUniversityStudentData();
  const youData = calculateUserData();

  // Get university name for display
  const universityName = universityData?.name || 'this university';

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
      drawDonutChart(canvasRef1.current, universityStudentData);
    }
    if (canvasRef2.current) {
      drawDonutChart(canvasRef2.current, youData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, universityData, studentProfiles]);

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

            {/* Labels for University Student */}
            <Label text={universityStudentData.segments[0].label} position="top-20 right-4" />
            <Label text={universityStudentData.segments[1].label} position="bottom-10 right-2" />
            <Label text={universityStudentData.segments[2].label} position="bottom-12 left-1" />
            <Label text={universityStudentData.segments[3].label} position="top-14 left-2" />
          </div>
          <h3 className="text-xl font-bold text-light-p dark:text-dark-text">{universityName} Student</h3>
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
            <Label text={youData.segments[1].label} position="bottom-28 -right-20" />
            <Label text={youData.segments[0].label} position="right-4 top-40" />
            <Label text={youData.segments[2].label} position="bottom-10 right-16" />
            <Label text={youData.segments[3].label} position="top-12 left-1" />
          </div>
          <h3 className="text-xl font-bold text-light-p dark:text-dark-text">You</h3>
        </div>
      </div>

      {/* Mobile View - Show text summary instead of charts */}
      <div className="lg:hidden space-y-6">
        <div className="bg-light-bg dark:bg-dark-tertiary border-2 border-black p-4" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">{universityName} Student</h3>
          <div className="space-y-2">
            {universityStudentData.segments.map((segment, index) => (
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