import React from 'react';

const AcademicsSection = () => {
  // GPA values (out of 4.0)
  const avgGPARequirement = 3.92;
  const yourGPA = 3.71;
  const completionPercentage = 76; // 76% completion
  
  // Calculate widths as percentages
  const avgGPAWidth = (avgGPARequirement / 4.0) * 100;
  const yourGPAWidth = (yourGPA / 4.0) * 100;

  const subjects = [
    { name: "AP Calc", grade: "A*" },
    { name: "Ap Physics", grade: "A" },
    { name: "Ap Maths", grade: "B" },
    { name: "AP Statistics", grade: "A*" },
    { name: "Physics", grade: "C" },
    { name: "Ap Biology", grade: "Not Done", isNotDone: true },
    { name: "Ap Computer Science", grade: "Not Done", isNotDone: true }
  ];

  const getGradeColor = (grade: string) => {
    if (grade === "A*") return "text-green-600 font-bold";
    if (grade === "A") return "text-green-500 font-bold";
    if (grade === "B") return "text-blue-500 font-bold";
    if (grade === "C") return "text-orange-500 font-bold";
    return "text-red-500";
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pt-20 pb-20 border-b-[1px] border-t-[1px] border-light-text dark:border-dark-text " style={{ margin: '56px' }}>
      <h2 className="text-[32px] font-bold text-light-text dark:text-dark-text mb-10">Academics</h2>
      
      <div className="flex gap-14">
        {/* Left Section - 60% */}
        <div className="flex-[0_0_60%] bg-light-bg dark:bg-dark-tertiary border-2 border-black p-10" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          {/* GPA Section */}
          <div className="mb-8">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-light-text dark:text-dark-text font-medium w-[180px]">Avg GPA Requirement</span>
                <div className="flex-1 max-w-[400px] h-10 mx-4 relative">
                  <div 
                    className="bg-[#FF9169] h-full border-2 border-black"
                    style={{ width: `${avgGPAWidth}%`, boxShadow: '2px 2px 0 0 #000' }}
                  ></div>
                </div>
                <span className="font-bold text-light-p dark:text-dark-text ml-2">3.92</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-light-text dark:text-dark-text font-medium w-[180px]">Your GPA</span>
                <div className="flex-1 max-w-[400px] h-10 mx-4 relative">
                  <div 
                    className="bg-[#FFD966] h-full border-2 border-black"
                    style={{ width: `${yourGPAWidth}%`, boxShadow: '2px 2px 0 0 #000' }}
                  ></div>
                </div>
                <span className="font-bold text-light-p dark:text-dark-text ml-2">3.71</span>
              </div>
            </div>
          </div>

          {/* Required Subjects Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-light-p dark:text-dark-text mb-4">Required Subjects (Your Grade)</h3>
            <div className="space-y-3">
              {subjects.map((subject, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-light-text dark:text-dark-text font-medium">{subject.name}</span>
                  <span className={subject.isNotDone ? "text-red-500 font-medium" : getGradeColor(subject.grade)}>
                    {subject.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Progress */}
          <div className="mt-6">
            <div className="flex items-center">
              <div className="h-6 relative" style={{ width: `${completionPercentage}%`, maxWidth: '400px' }}>
                <div 
                  className="bg-green-400 h-full border-2 border-black w-full"
                  style={{ boxShadow: '2px 2px 0 0 #000' }}
                ></div>
              </div>
              <span className="font-bold text-light-p dark:text-dark-text ml-2 whitespace-nowrap">{completionPercentage}% Completed</span>
            </div>
          </div>
        </div>

        {/* Right Section - 35% */}
        <div className="flex-[0_0_35%] h-[300px] bg-light-bg dark:bg-dark-tertiary border-2 border-black p-6" style={{ boxShadow: '4px 4px 0 0 #000' }}>
          {/* Profile Image */}
          <div className="flex justify-start mb-6">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img 
                src="/profile-pic-1.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Case Study Content */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4 leading-tight">
              AP Computer Science is common among admits - consider adding it.
            </h3>
            <p className="text-light-p dark:text-dark-text text-sm leading-relaxed mb-6">
              Draw inspiration from how Sofia closed a 0.15 GPA gap
            </p>
          </div>

          {/* Read Case Study Button */}
          <div className="flex justify-start">
            <button className="bg-[#FF9169] hover:bg-black text-black hover:text-[#FF9169] font-medium px-4 py-2 border-2 border-black" style={{ boxShadow: '2px 2px 0 0 #000' }}>
              Read case study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicsSection;