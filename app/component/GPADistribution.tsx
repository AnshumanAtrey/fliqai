import React, { useEffect, useRef, useMemo } from 'react';

interface GPADistributionProps {
  admissionsData?: unknown; // We'll define this more specifically if we find GPA data in the schema
}

export const GPADistribution: React.FC<GPADistributionProps> = ({ admissionsData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // For now, we'll use the default data since I don't see specific GPA distribution 
  // data in the provided schema. This can be updated when that data is available.
  const gpaData = useMemo(() => [
    { label: '4.00 GPA & Above', value: 4, color: '#80CAFF' },
    { label: '3.75-3.99 GPA', value: 24, color: '#85E0A3' },
    { label: '3.50-3.74 GPA', value: 21, color: '#FFD966' },
    { label: '3.25-3.49 GPA', value: 13, color: '#FFAFA3' },
    { label: '3.00-3.24 GPA', value: 15, color: '#FFC470' },
    { label: '<2.99 GPA', value: 24, color: '#D9B8FF' }
  ], [admissionsData]); // Added admissionsData as dependency for future use

  interface GpaDataItem {
    label: string;
    value: number;
    color: string;
  }

  const drawDonutChart = (canvas: HTMLCanvasElement, data: GpaDataItem[]) => {
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
    const total = data.reduce((sum: number, item: GpaDataItem) => sum + item.value, 0);
    
    data.forEach((item: GpaDataItem) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      currentAngle += sliceAngle;
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawDonutChart(canvasRef.current, gpaData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gpaData]);

  const Label = ({ text, position }: { text: string; position: string }) => (
    <div 
      className={`absolute border-[1px] text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-tertiary border-black px-2 py-1 text-sm font-medium ${position}`}
      style={{ boxShadow: '2px 2px 0 0 #000' }}
    >
      {text}
    </div>
  );

  return (
    <div className="w-full px-4 sm:w-[90%] mx-auto py-10" style={{ borderBottom: '1px solid black' }}>
      <h2 className="font-bold text-light-text dark:text-dark-text text-xl sm:text-2xl lg:text-[32px] mb-6 sm:mb-10 mt-4">Grade Point Average Of Enrolled Freshmen</h2>
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
        {/* Chart Section - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex flex-col items-center text-light-text dark:text-dark-text">
          <div className="relative w-[400px] h-[400px] mb-4">
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={400}
              className="w-full h-full"
            ></canvas>
            
            {/* Labels for chart */}
            <Label text="4.00 GPA & Above" position="top-5 right-[45px]" />
            <Label text="3.75-3.99 GPA" position="top-20 right-2" />
            <Label text="3.50-3.74 GPA" position="bottom-20 right-1" />
            <Label text="3.25-3.49 GPA" position="bottom-10 left-10" />
            <Label text="3.00-3.24 GPA" position="bottom-[150px] left-[-20px]" />
            <Label text="<2.99 GPA" position="top-14 left-10" />
          </div>
        </div>

        
        {/* Legend Card - Full width on mobile, 2/5 on desktop */}
        <div className="w-full lg:w-2/5">
          <div className="border-[1px] border-black p-4 sm:p-6 bg-light-bg dark:bg-dark-tertiary" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            <div className="space-y-3 sm:space-y-4">
              {gpaData.map((item, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="w-5 h-5 sm:w-6 sm:h-6 border-[1px] border-black flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1 text-light-p dark:text-dark-text font-medium text-sm sm:text-base lg:text-[20px]">
                    {item.label}
                  </div>
                  <div className="text-light-text dark:text-dark-text font-bold text-sm sm:text-base">
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPADistribution;
