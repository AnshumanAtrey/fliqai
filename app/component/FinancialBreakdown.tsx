'use client';

import React, { useRef, useEffect, useState } from 'react';

interface FinancialData {
  quickStats?: {
    selectedState?: string;
    costofattendance?: string;
    'tuition&fees'?: string;
    'room&board'?: string;
    'books&supplies'?: string;
    otherexpenses?: string;
    // Out-of-state specific fields (if they exist)
    'out-of-state-costofattendance'?: string;
    'out-of-state-tuition&fees'?: string;
  };
}

interface FinancialBreakdownProps {
  financialData?: FinancialData;
}

const FinancialBreakdown: React.FC<FinancialBreakdownProps> = ({ financialData }) => {
  const [selectedState, setSelectedState] = useState<'in-state' | 'out-of-state'>('in-state');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Helper function to parse currency strings
  const parseCurrency = (value?: string): number => {
    if (!value) return 0;
    return parseInt(value.replace(/[^0-9]/g, '')) || 0;
  };

  // Get financial data based on selected state
  const getFinancialData = () => {
    const baseData = financialData?.quickStats;
    
    if (selectedState === 'out-of-state') {
      // For out-of-state, use out-of-state specific data if available, otherwise calculate
      const outOfStateTuition = parseCurrency(baseData?.['out-of-state-tuition&fees']) || 
                               (parseCurrency(baseData?.['tuition&fees']) * 2.5) || // Typical multiplier for out-of-state
                               30000; // Default out-of-state tuition
      
      const outOfStateCostOfAttendance = parseCurrency(baseData?.['out-of-state-costofattendance']) ||
                                        (outOfStateTuition + parseCurrency(baseData?.['room&board'] || '16091') + 
                                         parseCurrency(baseData?.['books&supplies'] || '1320') + 
                                         parseCurrency(baseData?.otherexpenses || '3736'));
      
      return {
        costOfAttendance: outOfStateCostOfAttendance,
        tuitionFees: outOfStateTuition,
        roomBoard: parseCurrency(baseData?.['room&board']) || 16091,
        booksSupplies: parseCurrency(baseData?.['books&supplies']) || 1320,
        otherExpenses: parseCurrency(baseData?.otherexpenses) || 3736
      };
    } else {
      // In-state data
      return {
        costOfAttendance: parseCurrency(baseData?.costofattendance) || 33198,
        tuitionFees: parseCurrency(baseData?.['tuition&fees']) || 12051,
        roomBoard: parseCurrency(baseData?.['room&board']) || 16091,
        booksSupplies: parseCurrency(baseData?.['books&supplies']) || 1320,
        otherExpenses: parseCurrency(baseData?.otherexpenses) || 3736
      };
    }
  };

  const { costOfAttendance, tuitionFees, roomBoard, booksSupplies, otherExpenses } = getFinancialData();

  // Calculate percentages for chart
  const total = tuitionFees + roomBoard + booksSupplies + otherExpenses;
  const tuitionPercent = Math.round((tuitionFees / total) * 100);
  const roomPercent = Math.round((roomBoard / total) * 100);
  const booksPercent = Math.round((booksSupplies / total) * 100);
  const otherPercent = Math.round((otherExpenses / total) * 100);

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
      
      // Data for the chart using dynamic values
      const data = [
        { label: 'Tuition & Fees', value: tuitionPercent, color: '#80CAFF' },
        { label: 'Room & Board', value: roomPercent, color: '#85E0A3' },
        { label: 'Books & Supplies', value: booksPercent, color: '#FFD966' },
        { label: 'Other Expenses', value: otherPercent, color: '#FFAFA3' },
      ];
      
      let currentAngle = -Math.PI / 2; // Start from top
      const chartTotal = data.reduce((sum, item) => sum + item.value, 0);
      
      data.forEach((item) => {
        const sliceAngle = (item.value / chartTotal) * 2 * Math.PI;
        
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
  }, [tuitionPercent, roomPercent, booksPercent, otherPercent, selectedState]);

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
            <button 
              onClick={() => setSelectedState('in-state')}
              className={`font-semibold py-2 px-4 border-[1px] border-black ${
                selectedState === 'in-state' 
                  ? 'bg-[#FF9169] text-black' 
                  : 'bg-transparent text-light-text dark:text-dark-text'
              }`} 
              style={{ boxShadow: '2px 2px 0 0 #000' }}
            >
              In-state
            </button>
            <button 
              onClick={() => setSelectedState('out-of-state')}
              className={`font-semibold py-2 px-4 border-[1px] border-black ${
                selectedState === 'out-of-state' 
                  ? 'bg-[#FF9169] text-black' 
                  : 'bg-transparent text-light-text dark:text-dark-text'
              }`}
            >
              Out-of-state
            </button>
          </div>
          

          {/* Cost Items */}
          <div>
            <div className="flex justify-between items-center py-3 border-b-[1px] border-black">
              <span className="text-light-text dark:text-dark-text text-[20px]">
                Cost of attendance {selectedState === 'out-of-state' ? '(Out-of-state)' : '(In-state)'}
              </span>
              <span className="text-light-text dark:text-dark-text font-bold text-[20px]">
                ${costOfAttendance.toLocaleString()}
              </span>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-light-text dark:text-dark-text text-[20px]">Tuition & Fees</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">
                  ${tuitionFees.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-light-text dark:text-dark-text text-[20px]">Room & Board</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">
                  ${roomBoard.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-light-text dark:text-dark-text text-[20px]">Books and Supplies</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">
                  ${booksSupplies.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-light-text dark:text-dark-text text-[20px]">Other Expenses</span>
                <span className="text-light-text dark:text-dark-text font-bold text-[20px]">
                  ${otherExpenses.toLocaleString()}
                </span>
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
            <Label text={`Tuition & Fees - ${tuitionPercent}%`} position="top-[100px] right-2" />
            <Label text={`Room & Board - ${roomPercent}%`} position="bottom-20 left-0" />
            <Label text={`Other Expenses - ${otherPercent}%`} position="top-[30px] left-[30px]" />
            <Label text={`Books & Supplies - ${booksPercent}%`} position="top-[100px] left-[-40px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialBreakdown;
