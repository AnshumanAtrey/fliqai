'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Essay {
  id?: string | number;
  title: string;
  content: string;
  wordCount?: number | string;
  prompt?: string;
  submittedFor?: string;
}

interface EssaysSectionProps {
  essays?: Essay[];
  studentName?: string;
  studentImage?: string;
}

const EssaysSection: React.FC<EssaysSectionProps> = ({ essays: propEssays, studentName = 'Rebecca Reeves', studentImage = '/profile.png' }) => {
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  // Fallback essays if none provided
  const fallbackEssays = [
    {
      id: 1,
      title: 'Diversity Essay',
      submittedFor: 'Submitted for Harvard application',
      content: 'Growing up in a multicultural neighborhood shaped my worldview in profound ways. My family immigrated from Mexico when I was five, and I quickly learned to navigate between two cultures. At home, we spoke Spanish and maintained our traditions, while at school, I embraced American customs and the English language. This duality taught me the value of diversity and the importance of cultural understanding.\n\nIn high school, I founded the Cultural Exchange Club, bringing together students from various backgrounds to share their heritage through food, music, and stories. What started as a small group of ten students grew to over fifty members within a year. We organized monthly events celebrating different cultures, from Diwali to Lunar New Year, creating a space where everyone felt represented and valued.\n\nThese experiences taught me that diversity is not just about representation—it\'s about creating environments where different perspectives can thrive and contribute to collective growth. I bring this understanding to everything I do, whether it\'s group projects, community service, or casual conversations. I believe that the most innovative solutions come from diverse teams that challenge each other\'s assumptions and build on each other\'s strengths.',
      wordCount: 490,
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
      submittedFor: 'Submitted for Bath application',
      content: 'When I was diagnosed with dyslexia in seventh grade, I felt like my academic dreams were crumbling. Reading, which came naturally to my peers, was a daily struggle for me. Simple assignments took hours, and I often felt frustrated and defeated. However, this challenge became the catalyst for my greatest personal growth.\n\nI refused to let dyslexia define my capabilities. I worked with specialists, developed new study strategies, and learned to advocate for myself. I discovered audiobooks, text-to-speech software, and color-coded note-taking systems that transformed my learning experience. What once took me hours now took minutes, and I began to excel in subjects I had previously struggled with.\n\nMore importantly, this experience taught me resilience and empathy. I started a peer tutoring program for students with learning differences, helping them discover their own strategies for success. I learned that challenges are not roadblocks—they are opportunities to develop strength, creativity, and compassion. My dyslexia taught me to think differently, and that different thinking is often what leads to innovation.',
      wordCount: 549,
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
      submittedFor: 'Submitted for Bath application',
      content: 'From an early stage in my education, I have been drawn to problem-solving, creativity, and the intersection between technology and people. This interest naturally evolved into my pursuit of computer science and design, where I discovered how impactful thoughtful design can be in shaping how people interact with products, services, and even each other. Alongside my academic background, I have gained hands-on experience working on real projects where I have applied my skills in web design, user experience, and teamwork.\n\nThese experiences have not only deepened my technical abilities but also helped me grow personally, building confidence, resilience, and a genuine excitement for contributing to meaningful work. One of the most important lessons I have learned through my academic and practical experiences is that design and technology do not exist in isolation. A design is not successful simply because it looks attractive; it must serve a purpose, solve a problem, and create value for the user.\n\nIn this sense, I see design as a bridge between people\'s needs and technological possibilities. I am motivated by the challenge of creating solutions that are not only functional but also intuitive and delightful to use. This mindset has guided me in every project I have undertaken, from building small-scale prototypes during my studies to collaborating with startups where the stakes were much higher.',
      wordCount: 820,
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
      submittedFor: 'Submitted for Yale application',
      content: 'Psychology offers a unique lens through which to explore the intricate interplay between biology, behavior, and environment, providing a framework for understanding human experiences. I\'m particularly drawn to the field\'s potential to alleviate suffering and promote well-being, empowering individuals to lead fulfilling lives.\n\nMy fascination with psychology began in high school when I volunteered at a local mental health clinic. Witnessing the transformative power of therapy and the resilience of individuals facing mental health challenges ignited my passion for this field. I was struck by how psychological interventions could help people overcome trauma, manage anxiety, and build healthier relationships.\n\nThrough my coursework and research experiences, I\'ve developed a strong foundation in psychological theories and research methods. I\'ve explored topics ranging from cognitive development to social psychology, and I\'m particularly interested in the intersection of psychology and neuroscience. Understanding how brain structure and function relate to behavior and mental processes fascinates me, and I believe this interdisciplinary approach is crucial for advancing our understanding of the human mind.',
      wordCount: 729,
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
      submittedFor: 'Submitted for Harvard application',
      content: 'In our hyperconnected world, distractions are everywhere. Social media notifications, endless streaming content, and the constant buzz of our devices make it increasingly difficult to focus on what truly matters. I learned this lesson the hard way during my sophomore year when my grades began to slip despite spending hours "studying."\n\nI realized I was spending more time scrolling through social media than actually engaging with my coursework. This wake-up call prompted me to develop strategies for managing distractions. I started by tracking my screen time and was shocked to discover I was spending over five hours daily on my phone. I implemented the Pomodoro Technique, working in focused 25-minute intervals with short breaks, and used website blockers during study sessions.\n\nThe results were transformative. My grades improved, but more importantly, I felt more present and engaged in my learning. I now help other students develop similar strategies through peer mentoring sessions.',
      wordCount: 339,
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
      submittedFor: 'Submitted for Columbia application',
      content: 'What drives me is the desire to make a tangible difference in people\'s lives through innovation and service. This motivation stems from my upbringing in a community where resources were limited but determination was abundant. I watched my parents work multiple jobs to provide for our family, and their resilience taught me the value of hard work and perseverance.\n\nIn high school, I channeled this drive into founding a tutoring program for underprivileged students in my community. What started as helping a few neighbors with homework grew into a structured program serving over 50 students. Seeing younger students gain confidence in their abilities and achieve academic success they never thought possible reinforced my belief that education is the key to breaking cycles of poverty.\n\nThis experience also taught me that making a difference requires more than good intentions—it requires strategic thinking, collaboration, and sustained effort. I learned to recruit volunteers, secure funding, and build partnerships with local organizations. These skills, combined with my academic interests in social entrepreneurship, drive my ambition to create scalable solutions to social problems.',
      wordCount: 593,
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

  // Ensure we always have exactly 6 essays with content
  const essays = (() => {
    const backendEssays = propEssays || [];
    const totalNeeded = 6;
    
    // Filter backend essays to only include those with actual content
    const validBackendEssays = backendEssays.filter(essay => 
      essay.content && essay.content.trim().length > 0
    );
    
    console.log(`📝 Essays Debug - Backend: ${backendEssays.length}, Valid: ${validBackendEssays.length}, Student: ${studentName}`);
    
    // If we have 6 or more valid backend essays, use first 6
    if (validBackendEssays.length >= totalNeeded) {
      console.log(`✅ Using ${validBackendEssays.length} backend essays for ${studentName}`);
      return validBackendEssays.slice(0, totalNeeded);
    }
    
    // If we have some valid backend essays but less than 6, fill with fallback
    if (validBackendEssays.length > 0) {
      const needed = totalNeeded - validBackendEssays.length;
      const fallbacksToUse = fallbackEssays.slice(0, needed);
      console.log(`🔄 Using ${validBackendEssays.length} backend + ${needed} fallback essays for ${studentName}`);
      return [...validBackendEssays, ...fallbacksToUse];
    }
    
    // If no valid backend essays (empty content or no essays), use all fallback
    console.log(`🎯 Using all fallback essays for ${studentName} (no valid backend content)`);
    return fallbackEssays;
  })();

  // Count words in essay content
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  // Close modal
  const closeModal = () => {
    setSelectedEssay(null);
  };

  return (
    <div className="mt-16 mb-16 border border-black dark:border-dark-text">
      <div className="bg-white dark:bg-dark-tertiary p-6 w-full">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-12 font-outfit">Essays</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {essays.map((essay) => (
            <div key={essay.id} className="bg-[#FFF3ED] border-[1px] border-black rounded-none p-6 hover:shadow-md transition-all duration-300 flex flex-col h-full">
              {/* Top section with word count and button */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-medium text-[#EF622F]">{essay.wordCount || countWords(essay.content)} words</span>
                <button 
                  onClick={() => setSelectedEssay(essay)}
                  className="text-[#4B5563] hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-all"
                >
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
                <p className="text-sm text-[#6B7280]">{essay.submittedFor || essay.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Essay Modal */}
      {selectedEssay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div 
            className="bg-white dark:bg-dark-bg max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-black relative"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: '4px 4px 0 0 #000' }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-dark-bg border-b-2 border-black p-6 flex justify-between items-start z-10">
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-4">{selectedEssay?.title || 'Untitled Essay'}</h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black">
                    <Image 
                      src={studentImage} 
                      alt={studentName}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">{studentName}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">17 Jun 2025</p>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="bg-[#FF9169] border-2 border-black p-2 hover:bg-[#ff7b4d] transition-colors"
                style={{ boxShadow: '2px 2px 0 0 #000' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Submitted For Section */}
              {selectedEssay?.submittedFor && (
                <div className="mb-6 pb-6 border-b-2 border-gray-200">
                  <p className="text-base font-medium text-black dark:text-white">
                    {selectedEssay.submittedFor}
                  </p>
                </div>
              )}
              
              {/* Essay Content */}
              <div className="prose prose-lg max-w-none text-black dark:text-white">
                {selectedEssay?.content?.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                )) || (
                  <p className="text-gray-500 italic">No essay content available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssaysSection;
