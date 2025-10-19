'use client';

import React from 'react';

type RingSegment = {
  percentage: number;
  color: string;
  label: string;
  labelColor?: string;
};

type DynamicRingChartProps = {
  data: RingSegment[];
  size?: number;
  strokeWidth?: number;
  labelRadius?: number;
  centerLabel?: string;
  centerLabelSize?: number;
};

const DynamicRingChart: React.FC<DynamicRingChartProps> = ({
  data,
  size = 400,
  strokeWidth = 30,
  labelRadius = 150,
  centerLabel,
  centerLabelSize = 24,
}) => {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  let accumulatedPercentage = 0;

  // Calculate the total percentage to normalize the data
  const totalPercentage = data.reduce((sum, segment) => sum + segment.percentage, 0);
  const normalizedData = totalPercentage > 100 
    ? data.map(segment => ({
        ...segment,
        percentage: (segment.percentage / totalPercentage) * 100
      }))
    : data;

  // Generate path data for each segment
  const segments = normalizedData.map((segment) => {
    const startPercentage = accumulatedPercentage;
    const endPercentage = startPercentage + segment.percentage;
    
    // Calculate start and end points on the circle
    const startX = center + radius * Math.cos(2 * Math.PI * startPercentage / 100 - Math.PI / 2);
    const startY = center + radius * Math.sin(2 * Math.PI * startPercentage / 100 - Math.PI / 2);
    const endX = center + radius * Math.cos(2 * Math.PI * endPercentage / 100 - Math.PI / 2);
    const endY = center + radius * Math.sin(2 * Math.PI * endPercentage / 100 - Math.PI / 2);
    
    // Calculate large arc flag (1 if angle > 180 degrees, 0 otherwise)
    const largeArcFlag = segment.percentage > 50 ? 1 : 0;
    
    // Calculate label position
    const midPercentage = (startPercentage + endPercentage) / 2;
    const labelX = center + (radius * labelRadius) * Math.cos(2 * Math.PI * midPercentage / 100 - Math.PI / 2);
    const labelY = center + (radius * labelRadius) * Math.sin(2 * Math.PI * midPercentage / 100 - Math.PI / 2);
    
    // Update accumulated percentage for next segment
    accumulatedPercentage = endPercentage;
    
    return {
      path: `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      label: {
        x: labelX,
        y: labelY,
        text: `${Math.round(segment.percentage)}%`,
        color: segment.labelColor || '#000',
      },
      color: segment.color,
      labelText: segment.label,
    };
  });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
        />
        
        {/* Segments */}
        {segments.map((segment, index) => (
          <g key={index}>
            <path
              d={segment.path}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <text
              x={segment.label.x}
              y={segment.label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={segment.label.color}
              fontSize={centerLabelSize * 0.4}
              fontWeight="bold"
            >
              {segment.label.text}
            </text>
          </g>
        ))}
        
        {/* Center label */}
        {centerLabel && (
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={centerLabelSize}
            fontWeight="bold"
            fill="#333"
          >
            {centerLabel}
          </text>
        )}
      </svg>
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {segments.map((segment, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-sm">
              {segment.labelText} ({segment.label.text})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicRingChart;
