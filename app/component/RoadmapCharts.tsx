'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// interface ChartDataItem {
//   name: string;
//   value: number;
//   color: string;
// }

interface LabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

interface LegendProps {
  payload?: ReadonlyArray<{
    value?: string;
    color?: string;
  }>;
}

const COLORS = {
  personalProjects: '#3B82F6',    // Blue
  extracurricular: '#10B981',     // Green
  testScores: '#F59E0B',         // Yellow
  academics: '#EF4444',          // Red
  background: '#FFFFFF',
  text: '#1F2937',
  border: '#E5E7EB',
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

const chartTitles = {
  asu: 'ASU Student Profile',
  user: 'Your Profile'
};

const renderCustomizedLabel = (props: LabelProps) => {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent = 0 } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderLegend = (props: LegendProps) => {
  const { payload = [] } = props;
  
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: { value?: string; color?: string }, index: number) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color || '#000' }}
          />
          <span className="text-sm text-gray-700">
            {entry.value || ''}
          </span>
        </div>
      ))}
    </div>
  );
};



const RoadmapCharts = () => {
  const renderChart = (data: typeof asuStudentData, title: string) => {
    return (
      <div className="w-full h-full">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
          <h3 className="text-lg font-semibold text-center mb-6 text-gray-800">{title}</h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
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
                <Legend content={renderLegend} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="w-full md:w-1/2">
          {renderChart(asuStudentData, chartTitles.asu)}
        </div>
        <div className="w-full md:w-1/2">
          {renderChart(userProfileData, chartTitles.user)}
        </div>
      </div>
    </div>
  );
};

export default RoadmapCharts;
