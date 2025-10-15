import React from 'react';

export const EssayStyleSection = () => {
  const essayStyleData = [
    { label: "Narrative Reflection", percentage: 50, position: { top: 56, left: 290 } },
    { label: "Impact", percentage: 10, position: { top: 380, left: 106 } },
    { label: "Reflection", percentage: 20, position: { top: 277, left: 21 } },
    { label: "Academics", percentage: 10, position: { top: 83, left: 0 } },
    { label: "Voice/Style", percentage: 10, position: { top: 0, left: 91 } },
  ];

  return (
    <div className="absolute w-[501px] h-[412px] top-[1570px] left-7">
      <div className="w-[202px] h-[202px] top-[99px] left-40 rounded-[101px] absolute border border-solid border-black" />
      <div className="w-[400px] h-[400px] top-0 left-[61px] rounded-[200px] absolute border border-solid border-black" />
      
      {/* Vector lines would be imported as SVG components */}
      <div className="absolute w-px h-[99px] top-0 left-[260px] bg-black" />
      <div className="absolute w-[190px] h-[361px] top-[38px] left-[71px] border-l border-black" />

      {essayStyleData.map((item, index) => (
        <div
          key={index}
          className="inline-flex items-center justify-center gap-2.5 px-3 py-1.5 absolute bg-white border border-solid border-black"
          style={{
            top: `${item.position.top}px`,
            left: `${item.position.left}px`,
          }}
        >
          <div className="font-medium text-black">
            {item.label} - {item.percentage}%
          </div>
        </div>
      ))}
    </div>
  );
};
