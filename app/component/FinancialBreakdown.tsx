'use client';

import React, { useRef, useEffect } from 'react';

interface UniversityProps {
  university: {
    name: string;
    stats: {
      acceptanceRate: number;
      students: number;
      international: number;
    };
  };
}

const FinancialBreakdown = ({ university }: UniversityProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawDonutChart = (canvas: HTMLCanvasElement) => {
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const outerRadius = 180;
      const innerRadius = 90;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Data for the chart
      const data = [
        { label: 'Tuition & Fees', value: 36, color: '#80CAFF' },
        { label: 'Room & Board', value: 48, color: '#85E0A3' },
        { label: 'Books & Supplies', value: 4, color: '#FFD966' },
        { label: 'Other Expenses', value: 11, color: '#FFAFA3' },
      ];
      
      let currentAngle = -Math.PI / 2; // Start from top
      const total = data.reduce((sum, item) => sum + item.value, 0);
      
      data.forEach((item) => {
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

    if (canvasRef.current) {
      drawDonutChart(canvasRef.current);
    }
  }, []);

  const Label = ({ text, position }: { text: string; position: string }) => (
    <div 
      className={`absolute border-2 h-[43px] items-center justify-center bg-light-bg dark:bg-dark-tertiary text-light-text dark:text-dark-text border-black px-4 py-[10px] text-xs font-medium ${position}`}
      style={{ boxShadow: '2px 2px 0 0 #000' }}
    >
      {text}
    </div>
  );

  return (
    <div className="w-[90%] mx-auto py-20 border-b-[1px] border-light-text dark:border-dark-text">
      <h2 className="text-[32px] font-bold text-light-text dark:text-dark-text ">Financial Breakdown</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Cost Breakdown */}
        <div className="flex-1 bg-light-bg dark:bg-dark-tertiary border-[1px] border-black p-6 h-[400px] mt-[60px]" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          {/* Toggle Buttons */}
          <div className="flex mb-6">
            <button className="bg-[#FF9169] text-black font-semibold py-2 px-4 border-[1px] border-black" style={{ boxShadow: '2px 2px 0 0 #000' }}>
              In-state
            </button>
            <p className="text-light-text dark:text-dark-text font-semibold py-2 px-4">Out-of-state</p>
          </div>
          

          {/* Cost Items */}
          <div>
            <div className="flex justify-between items-center py-3 border-b-[1px] border-black">
              <span className="text-light-text dark:text-dark-text text-[20px]">Cost of attendance</span>
              <span className="text-light-text dark:text-dark-text font-bold text-[20px]">$33,198</span>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-light-text dark:text-dark-text text-[20px]">Tuition & Fees</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">$12,051</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-light-text dark:text-dark-text text-[20px]">Room & Board</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">$16,091</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-light-text dark:text-dark-text text-[20px]">Books and Supplies</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">$1,320</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-light-text dark:text-dark-text text-[20px]">Other Expenses</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">$3,736</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-light-p dark:text-dark-text mt-6">
            *All values are estimates based on publicly available data and subject to change.
          </p>
        </div>

        {/* Right Section - Doughnut Chart */}
        <div className="flex-1 p-6 relative" >
          <div className="relative w-full h-[400px] md:h-auto text-black">
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={400}
              className="w-full h-full"
            ></canvas>
            
            {/* Labels */}
            <Label text="Tuition & Fees - 36%" position="top-[100px] right-2" />
            <Label text="Room & Board - 48%" position="bottom-20 left-0" />
            <Label text="Other Expenses - 11%" position="top-[30px] left-[30px]" />
            <Label text="Books & Supplies - 4%" position="top-[100px] left-[-40px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialBreakdown;
