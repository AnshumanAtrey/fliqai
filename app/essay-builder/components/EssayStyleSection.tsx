"use client";
import React, { useEffect, useRef } from 'react';

interface EssayStyleSectionProps {
  essayData?: {
    narrative?: number;
    reflection?: number;
    impact?: number;
    academics?: number;
    voice?: number;
  };
}

interface ChartDataItem {
  title: string;
  value: number;
  color: string;
}

export const EssayStyleSection = ({ essayData }: EssayStyleSectionProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Check if we have any data
  const hasData = essayData && Object.values(essayData).some(val => val > 0);

  const data = essayData || {
    narrative: 0,
    reflection: 0,
    impact: 0,
    academics: 0,
    voice: 0
  };

  // Convert data to chart format
  const chartData: ChartDataItem[] = [
    { title: "Narrative Reflection", value: data.narrative || 0, color: "#FF9269" },
    { title: "Reflection", value: data.reflection || 0, color: "#FFB399" },
    { title: "Impact", value: data.impact || 0, color: "#FFC9B9" },
    { title: "Academics", value: data.academics || 0, color: "#FFDDD9" },
    { title: "Voice/Style", value: data.voice || 0, color: "#FFF3ED" }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const centerX = 350;
    const centerY = 350;
    const outerRadius = 250;
    const innerRadius = 150;

    // Clear existing content
    svg.innerHTML = `
      <defs>
        <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="0" flood-color="#000" flood-opacity="1"/>
        </filter>
      </defs>
    `;

    // Calculate total
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    
    // Sort data by value (largest first)
    const sortedData = [...chartData].sort((a, b) => b.value - a.value);

    let currentAngle = -90; // Start from top

    sortedData.forEach((item) => {
      if (item.value === 0) return; // Skip zero values
      
      const sliceAngle = (item.value / total) * 360;
      const middleAngle = currentAngle + (sliceAngle / 2);

      // Create donut slice path
      const path = createDonutSlice(
        centerX, centerY, outerRadius, innerRadius,
        currentAngle, currentAngle + sliceAngle, item.color
      );
      svg.appendChild(path);

      // Create label with proper positioning
      createLabel(svg, item, middleAngle, centerX, centerY, outerRadius, innerRadius);

      currentAngle += sliceAngle;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Create donut slice path
  const createDonutSlice = (
    cx: number, cy: number, outerRadius: number, innerRadius: number,
    startAngle: number, endAngle: number, color: string
  ) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    const startRadians = (startAngle * Math.PI) / 180;
    const endRadians = (endAngle * Math.PI) / 180;
    
    const x1 = cx + outerRadius * Math.cos(startRadians);
    const y1 = cy + outerRadius * Math.sin(startRadians);
    const x2 = cx + outerRadius * Math.cos(endRadians);
    const y2 = cy + outerRadius * Math.sin(endRadians);
    const x3 = cx + innerRadius * Math.cos(endRadians);
    const y3 = cy + innerRadius * Math.sin(endRadians);
    const x4 = cx + innerRadius * Math.cos(startRadians);
    const y4 = cy + innerRadius * Math.sin(startRadians);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${x1} ${y1}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', color);
    path.setAttribute('stroke', '#000');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('class', 'donut-slice');
    path.style.filter = 'drop-shadow(2px 2px 0 #000)';
    
    return path;
  };

  // Create label with proper positioning
  const createLabel = (
    svg: SVGSVGElement, item: ChartDataItem, angle: number,
    centerX: number, centerY: number, outerRadius: number, innerRadius: number
  ) => {
    const angleRadians = (angle * Math.PI) / 180;
    
    // Position on the donut ring, slightly offset for better readability
    const labelRadius = (outerRadius + innerRadius) / 2;
    let labelX = centerX + labelRadius * Math.cos(angleRadians);
    let labelY = centerY + labelRadius * Math.sin(angleRadians);
    
    // Adjust positioning based on angle for better text placement
    const adjustmentFactor = 30;
    if (angle > -45 && angle < 45) { // Right side
      labelX += adjustmentFactor;
    } else if (angle > 135 || angle < -135) { // Left side
      labelX -= adjustmentFactor;
    }
    
    // Slight upward adjustment for all labels
    labelY -= 15;
    
    // Create foreignObject for HTML content
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    const boxWidth = 220;
    const boxHeight = 55;
    
    foreignObject.setAttribute('width', boxWidth.toString());
    foreignObject.setAttribute('height', boxHeight.toString());
    foreignObject.setAttribute('x', (labelX - boxWidth / 2).toString());
    foreignObject.setAttribute('y', (labelY - boxHeight / 2).toString());
    foreignObject.setAttribute('overflow', 'visible');
    
    // Create HTML content
    const div = document.createElement('div');
    div.style.cssText = `
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      pointer-events: none;
    `;
    
    const label = document.createElement('span');
    label.style.cssText = `
      background: white;
      padding: 10px 16px;
      border: 2px solid #000;
      box-shadow: 3px 3px 0 #000;
      font-size: 15px;
      font-weight: 600;
      color: #000;
      white-space: nowrap;
      font-family: 'Outfit', sans-serif;
      line-height: 1.3;
    `;
    label.textContent = `${item.title} (${item.value}%)`;
    
    div.appendChild(label);
    foreignObject.appendChild(div);
    svg.appendChild(foreignObject);
  };

  return (
    <>
      {/* Title and Description - Match other sections */}
      <div className="flex flex-col gap-2 w-full mt-16 sm:mt-20">
        <h2 className="font-['Outfit'] text-xl sm:text-2xl font-semibold leading-tight text-light-text dark:text-dark-text">
          Essay Style
        </h2>
        <p className="font-['Outfit'] text-sm sm:text-base font-normal leading-relaxed text-light-p dark:text-dark-text">
          A graphical analysis of the style of your current essay.
        </p>
      </div>
      
      {/* Conditional rendering based on data availability */}
      {!hasData ? (
        // Placeholder when no data - Match other sections
        <div className="flex justify-center items-center w-full h-24 sm:h-32 mt-6 bg-light-secondary dark:bg-dark-tertiary border border-black dark:border-dark-text">
          <span className="font-['Outfit'] text-sm sm:text-base text-light-p dark:text-dark-text text-center px-4">
            Submit your essay to see essay style
          </span>
        </div>
      ) : (
        <>
          {/* Responsive Donut Chart - Made bigger and removed legend */}
          <div className="flex items-center justify-center w-full mt-6 mb-6">
            <div className="w-full aspect-square">
              <svg 
                ref={svgRef}
                viewBox="0 0 700 700"
                className="w-full h-full"
                style={{ maxWidth: '600px', maxHeight: '600px' }}
              >
              </svg>
            </div>
          </div>
        </>
      )}
    </>
  );
};