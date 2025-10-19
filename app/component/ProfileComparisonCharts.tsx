'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

const COLORS = {
  personalProjects: '#3B82F6',    // Blue
  extracurricular: '#10B981',     // Green
  testScores: '#F59E0B',         // Yellow
  academics: '#EF4444',          // Red
};

const asuStudentData = [
  { name: 'Personal Projects', value: 10, color: COLORS.personalProjects },
  { name: 'Extracurricular', value: 20, color: COLORS.extracurricular },
  { name: 'Test Scores', value: 30, color: COLORS.testScores },
  { name: 'Academics', value: 40, color: COLORS.academics },
];

const userProfileData = [
  { name: 'Personal Projects', value: 30, color: COLORS.personalProjects },
  { name: 'Extracurricular', value: 15, color: COLORS.extracurricular },
  { name: 'Test Scores', value: 25, color: COLORS.testScores },
  { name: 'Academics', value: 30, color: COLORS.academics },
];

const ProfileComparisonCharts = () => {
  const renderCustomizedLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    outerRadius = 0,
    percent = 0,
    name = ''
  }: Partial<PieLabelRenderProps> & { percent?: number; name?: string }) => {
    const RADIAN = Math.PI / 180;
    const radius = Number(outerRadius || 0) * 1.4;
    const x = Number(cx || 0) + radius * Math.cos(-Number(midAngle || 0) * RADIAN);
    const y = Number(cy || 0) + radius * Math.sin(-Number(midAngle || 0) * RADIAN);
    const isRightSide = Math.cos(-Number(midAngle || 0) * RADIAN) > 0;

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="#6B7280"
          textAnchor={isRightSide ? 'start' : 'end'}
          dominantBaseline="central"
          className="text-xs"
        >
          {name}
        </text>
        <text
          x={x + (isRightSide ? 4 : -4)}
          y={y}
          fill="#111827"
          textAnchor={isRightSide ? 'start' : 'end'}
          dominantBaseline="central"
          className="text-xs font-semibold"
        >
          {`${(Number(percent || 0) * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  const renderChart = (data: typeof asuStudentData, title: string) => (
    <div className="w-full h-full">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
        <h3 className="text-lg font-semibold text-center mb-6 text-gray-800">{title}</h3>
        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={2}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="w-full md:w-1/2">
          {renderChart(asuStudentData, 'ASU Student Profile')}
        </div>
        <div className="w-full md:w-1/2">
          {renderChart(userProfileData, 'Your Profile')}
        </div>
      </div>
    </div>
  );
};

export default ProfileComparisonCharts;
