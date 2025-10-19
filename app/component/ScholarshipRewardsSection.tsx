import React, { useEffect, useRef } from 'react';


const ScholarshipsAwardsSection = () => {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  // Data for Average ASU Student
  const asuData = {
    segments: [
      { label: 'Tier 1 (Local) - 12%', value: 12, color: '#80CAFF' },
      { label: 'Tier 2 (State) - 28%', value: 28, color: '#85E0A3' },
      { label: 'Tier 3 (National) - 36%', value: 36, color: '#FFD966' },
      { label: 'Tier 4 (International) - 24%', value: 24, color: '#FFAFA3' }
    ]
  };

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
      drawDonutChart(canvasRef1.current, asuData);
    }
    if (canvasRef2.current) {
      drawDonutChart(canvasRef2.current, asuData);
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
            
            {/* Labels for ASU Student */}
            <Label text="Tier 1 (Local) - 12%" position="top-10 right-4" />
            <Label text="Tier 2 (State) - 28%" position="bottom-28 -right-1" />
            <Label text="Tier 3 (National) - 36%" position="bottom-12 left-1" />
            <Label text="Tier 4 (International) - 24%" position="top-14 left-1" />
          </div>
        </div>


        {/* Right Section - Info Card */}
        <div className="w-full lg:flex-[0_0_45%] lg:w-[45%] h-auto lg:h-full border-[1px] p-4 sm:p-6 border-black bg-light-bg dark:bg-dark-tertiary mt-6 lg:mt-0" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          {/* Light bulb icon */}
          <div className="mb-6 ">
            <span className="text-6xl ">💡</span>
          </div>
          
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 leading-tight">
            Most admits at this university have a National (Tier 3) scholarship
          </h3>
          
          <p className="text-light-p dark:text-dark-text leading-relaxed">
            It&apos;s recommended that you at least have a state level (Tier 2) scholarship/award for best chance of admission
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipsAwardsSection;