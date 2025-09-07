'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';

const COLORS = {
  academics: '#87CEEB',     // Light blue
  testScores: '#90EE90',    // Light green
  extracurricular: '#F0E68C', // Yellow/golden
  personalProjects: '#F0A0A0', // Light pink/coral
};

const asuStudentData = [
  { name: 'Academics', value: 48, color: COLORS.academics },
  { name: 'Test Scores', value: 35, color: COLORS.testScores },
  { name: 'Extracurriculars', value: 15, color: COLORS.extracurricular },
  { name: 'Personal Projects', value: 8, color: COLORS.personalProjects },
];

const userProfileData = [
  { name: 'Test Scores', value: 55, color: COLORS.testScores },
  { name: 'Academics', value: 32, color: COLORS.academics },
  { name: 'Personal Projects', value: 9, color: COLORS.personalProjects },
  { name: 'Extracurriculars', value: 8, color: COLORS.extracurricular },
];

const ReadinessRing = () => {
  const renderCustomizedLabel = ({
    cx = 0,
    cy = 0,
    midAngle = 0,
    innerRadius = 0,
    outerRadius = 0,
    percent = 0,
    name = ''
  }: {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
    name?: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);
    const isRightSide = Math.cos(-midAngle * RADIAN) > 0;
    const label = `${name}: ${(percent * 100).toFixed(0)}%`;

    return (
      <text
        x={x}
        y={y}
        fill="#111827"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {label.length > 15 ? name.split(' ')[0] : label}
      </text>
    );
  };

  const renderChart = (data: typeof asuStudentData, title: string) => (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={100}
              outerRadius={160}
              paddingAngle={1}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="#fff"
                  strokeWidth={3}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <h3 className="text-xl font-bold mt-6 text-gray-900">{title}</h3>
      <div className="mt-6 w-full max-w-md">
        <div className="grid grid-cols-2 gap-4">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-start">
              <div 
                className="w-5 h-5 rounded-full mt-1 mr-2 flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{entry.name}</p>
                <p className="text-2xl font-bold" style={{ color: entry.color }}>
                  {entry.value}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">Readiness Ring</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on 192 students who got into ASU with similar backgrounds, this is how you compare
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {renderChart(asuStudentData, 'Average ASU Student')}
        
        <div className="hidden lg:flex items-center justify-center">
          <span className="text-5xl font-black text-gray-800 bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center">
            VS
          </span>
        </div>
        
        <div className="lg:hidden my-6 w-full flex justify-center">
          <span className="text-3xl font-bold text-gray-800 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
            VS
          </span>
        </div>
        
        {renderChart(userProfileData, 'Your Profile')}
      </div>
    </div>
  );
};

export default ReadinessRing;
