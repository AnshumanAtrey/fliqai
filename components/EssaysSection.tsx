import React from 'react';

const EssaysSection = () => {
  const essays = [
    {
      id: 1,
      title: 'Diversity Essay',
      status: 'In Progress',
      date: 'Due Sep 1, 2024',
      content: 'Submitted for Harvard application',
      wordCount: '490',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V4" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 2V4" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 9H21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Overcoming Challenges',
      status: 'In Progress',
      date: 'Due Sep 1, 2024',
      content: 'Submitted for Bath application',
      wordCount: '549',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6V12L16 14" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Personal Statement',
      status: 'In Progress',
      date: 'Due Sep 1, 2024',
      content: 'Submitted for Bath application',
      wordCount: '820',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20H21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04016C19.0692 3.14676 19.303 3.30303 19.5 3.50001C19.697 3.69699 19.8532 3.93084 19.9598 4.1882C20.0665 4.44556 20.1213 4.72142 20.1213 5.00001C20.1213 5.2786 20.0665 5.55446 19.9598 5.81182C19.8532 6.06918 19.697 6.30303 19.5 6.50001L7 19L3 20L4 16L16.5 3.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Why This Major',
      status: 'In Progress',
      date: 'Due Sep 1, 2024',
      content: 'Submitted for Bath application',
      wordCount: '729',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V12M12 8H12.01" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 5,
      title: 'Reducing distractions',
      status: 'Not Started',
      date: 'Due Oct 15, 2024',
      content: 'Submitted for Bath application',
      wordCount: '339',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V12M12 8H12.01" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 6,
      title: 'What Drives Me',
      status: 'Not Started',
      date: 'Due Nov 1, 2024',
      content: 'Submitted for Bath application',
      wordCount: '593',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  // Removed unused functions getStatusColor and getProgressPercentage to clean up the code

  return (
    <div className="mt-16 mb-16 border border-black dark:border-dark-text">
      <div className="bg-white dark:bg-dark-tertiary p-6 w-full">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-12 font-outfit">Essays</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {essays.map((essay) => (
            <div key={essay.id} className="bg-[#FFF3ED] border-[1px] border-black rounded-none p-6 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              {/* Top section with word count and button */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-medium text-[#EF622F]">{essay.wordCount} words</span>
                <button className="text-[#4B5563] hover:text-gray-700 p-2 rounded-full hover:bg-gray-200">
                <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_1_375)">
                    <rect x="0.666656" width="36" height="36" fill="#FF9169" shapeRendering="crispEdges"/>
                      <rect x="1.16666" y="0.5" width="35" height="35" stroke="black" shapeRendering="crispEdges"/>
                      <path d="M24.292 13V21.125C24.292 21.2908 24.2262 21.4497 24.1089 21.5669C23.9917 21.6842 23.8328 21.75 23.667 21.75C23.5012 21.75 23.3423 21.6842 23.2251 21.5669C23.1079 21.4497 23.042 21.2908 23.042 21.125V14.5086L14.1092 23.4422C13.9919 23.5595 13.8329 23.6253 13.667 23.6253C13.5012 23.6253 13.3421 23.5595 13.2248 23.4422C13.1075 23.3249 13.0417 23.1659 13.0417 23C13.0417 22.8341 13.1075 22.6751 13.2248 22.5578L22.1584 13.625H15.542C15.3762 13.625 15.2173 13.5592 15.1001 13.4419C14.9829 13.3247 14.917 13.1658 14.917 13C14.917 12.8342 14.9829 12.6753 15.1001 12.5581C15.2173 12.4408 15.3762 12.375 15.542 12.375H23.667C23.8328 12.375 23.9917 12.4408 24.1089 12.5581C24.2262 12.6753 24.292 12.8342 24.292 13Z" fill="black"/>
                      </g>
                      <defs>
                      <filter id="filter0_d_1_375" x="0.666656" y="0" width="38" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dx="2" dy="2"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_375"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_375" result="shape"/>
                      </filter>
                    </defs>
                </svg>

                </button>
              </div>
              
              {/* Bottom section with title and description */}
              <div className="mt-auto pt-16">
                <h3 className="text-lg font-semibold text-[#111827] mb-1">{essay.title}</h3>
                <p className="text-sm text-[#6B7280]">{essay.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EssaysSection;
