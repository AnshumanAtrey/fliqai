import React, { useEffect, useRef } from 'react';

const ReadinessRingSection = () => {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  // Data for Average ASU Student
  const asuData = {
    segments: [
      { label: 'Academics - 38%', value: 38, color: '#80CAFF' },
      { label: 'Personal Projects - 18%', value: 18, color: '#FFAFA3' },
      { label: 'Extracurriculars - 15%', value: 15, color: '#FFD966' },
      { label: 'Test Scores - 35%', value: 35, color: '#85E0A3' }
    ]
  };

  // Data for You
  const youData = {
    segments: [
      { label: 'Academics - 32%', value: 32, color: '#80CAFF' },
      { label: 'Personal Projects - 9%', value: 9, color: '#FFAFA3' },
      { label: 'Extracurriculars - 8%', value: 8, color: '#FFD966' },
      { label: 'Test Scores - 55%', value: 55, color: '#85E0A3' }
    ]
  };

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
    <div style={{ margin: '56px' }}>
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-light-text dark:text-dark-text mb-4">Readiness Ring</h2>
        <p className="text-light-p dark:text-dark-text text-base leading-relaxed max-w-2xl">
          Based on 192 students who got into ASU with similar backgrounds this<br />
          is how we think you match ASU
        </p>
      </div>

      <div className="flex items-center justify-center gap-20">
        {/* Average ASU Student Chart */}
        <div className="flex flex-col items-center text-black">
          <div className="relative w-[400px] h-[400px] mb-4">
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
          <h3 className="text-xl font-bold text-light-p dark:text-dark-text">Average ASU Student</h3>
        </div>

        {/* VS Text */}
        <div className="text-2xl font-bold text-light-text dark:text-dark-text">
          VS
        </div>

        {/* You Chart */}
        <div className="flex flex-col items-center text-black">
          <div className="relative w-[400px] h-[400px] mb-4">
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
    </div>
  );
};

export default ReadinessRingSection;