'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getCourseImage, getRandomCourseImage } from '../../lib/courseImageMapping';

interface Course {
  name: string;
  degree: string;
  duration: string;
  mode: string;
  imageUrl: string;
  thumbUrl: string;
}

interface DynamicCoursesSectionProps {
  universityData?: {
    programs?: string[];
    apiData?: {
      pages?: {
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  redirectUrl?: string;
  totalCoursesCount?: number;
}

const DynamicCoursesSection: React.FC<DynamicCoursesSectionProps> = ({ 
  universityData, 
  redirectUrl,
  totalCoursesCount = 182 
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedDegreeType, setSelectedDegreeType] = useState('Undergraduate');
  const [selectedStudyMode, setSelectedStudyMode] = useState('Full-time');

  useEffect(() => {
    // Generate dynamic courses based on university data
    const generateCourses = () => {
      const generatedCourses: Course[] = [];
      
      // Get courses from university data
      const universityPrograms = universityData?.programs || 
                                (universityData?.apiData?.pages?.Academic as { undergraduateMajors?: string[] })?.undergraduateMajors || 
                                [];
      
      // Debug log to see what we're working with
      console.log('🎓 University Programs Data:', universityPrograms);
      
      // If we have university programs, use them
      if (universityPrograms.length > 0) {
        universityPrograms.slice(0, 6).forEach((program: unknown, index: number) => {
          // Handle both string and object formats
          let courseName: string;
          try {
            if (typeof program === 'string') {
              courseName = program;
            } else if (program && typeof program === 'object') {
              // Handle object format - extract title or name
              const programObj = program as { title?: string; name?: string; courseName?: string; course?: string };
              courseName = programObj.title || programObj.name || programObj.courseName || programObj.course || 'Unknown Course';
              // Ensure it's a string
              courseName = String(courseName);
            } else {
              courseName = 'Unknown Course';
            }
            
            // Fallback if courseName is still not a proper string
            if (!courseName || courseName === 'undefined' || courseName === 'null') {
              courseName = 'Unknown Course';
            }
          } catch (error) {
            console.warn('Error processing course name:', program, error);
            courseName = 'Unknown Course';
          }
          
          const courseImage = getCourseImage(courseName);
          const fallbackImage = getRandomCourseImage();
          
          generatedCourses.push({
            name: courseName,
            degree: index % 4 === 0 ? 'BSc' : index % 4 === 1 ? 'BA' : index % 4 === 2 ? 'BEng' : 'MSc',
            duration: selectedDegreeType === 'Undergraduate' ? 
              (index % 3 === 0 ? '3 years' : index % 3 === 1 ? '4 years' : '3 years') : 
              (index % 2 === 0 ? '1 year' : '2 years'),
            mode: selectedStudyMode,
            imageUrl: courseImage?.imageUrl || fallbackImage.imageUrl,
            thumbUrl: courseImage?.thumbUrl || fallbackImage.thumbUrl
          });
        });
      } else {
        // Fallback to popular courses with proper images
        const popularCourses = [
          'Computer Science',
          'Business Administration', 
          'Mechanical Engineering',
          'Data Science',
          'Architecture',
          'Biomedical Sciences'
        ];
        
        popularCourses.forEach((courseName, index) => {
          const courseImage = getCourseImage(courseName);
          const fallbackImage = getRandomCourseImage();
          
          generatedCourses.push({
            name: courseName,
            degree: index % 4 === 0 ? 'BSc' : index % 4 === 1 ? 'BA' : index % 4 === 2 ? 'BEng' : 'MSc',
            duration: selectedDegreeType === 'Undergraduate' ? 
              (index % 3 === 0 ? '3 years' : index % 3 === 1 ? '4 years' : '3 years') : 
              (index % 2 === 0 ? '1 year' : '2 years'),
            mode: selectedStudyMode,
            imageUrl: courseImage?.imageUrl || fallbackImage.imageUrl,
            thumbUrl: courseImage?.thumbUrl || fallbackImage.thumbUrl
          });
        });
      }
      
      // Ensure we always have some courses to display
      if (generatedCourses.length === 0) {
        console.warn('No courses generated, using fallback courses');
        // Add fallback courses
        const fallbackCourses = [
          'Computer Science',
          'Business Administration', 
          'Mechanical Engineering',
          'Data Science',
          'Architecture',
          'Biomedical Sciences'
        ];
        
        fallbackCourses.forEach((courseName, index) => {
          const courseImage = getCourseImage(courseName);
          const fallbackImage = getRandomCourseImage();
          
          generatedCourses.push({
            name: courseName,
            degree: index % 4 === 0 ? 'BSc' : index % 4 === 1 ? 'BA' : index % 4 === 2 ? 'BEng' : 'MSc',
            duration: selectedDegreeType === 'Undergraduate' ? 
              (index % 3 === 0 ? '3 years' : index % 3 === 1 ? '4 years' : '3 years') : 
              (index % 2 === 0 ? '1 year' : '2 years'),
            mode: selectedStudyMode,
            imageUrl: courseImage?.imageUrl || fallbackImage.imageUrl,
            thumbUrl: courseImage?.thumbUrl || fallbackImage.thumbUrl
          });
        });
      }
      
      setCourses(generatedCourses);
    };

    try {
      generateCourses();
    } catch (error) {
      console.error('Error generating courses:', error);
      // Set fallback courses in case of error
      setCourses([
        {
          name: 'Computer Science',
          degree: 'BSc',
          duration: '3 years',
          mode: 'Full-time',
          imageUrl: '/us-cources.png',
          thumbUrl: '/us-cources.png'
        }
      ]);
    }
  }, [universityData, selectedDegreeType, selectedStudyMode]);

  const handleShowAllCourses = () => {
    if (redirectUrl) {
      window.open(redirectUrl, '_blank');
    } else {
      // Fallback - could redirect to a generic courses page
      console.log('No redirect URL available for courses');
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 py-10 sm:py-16 lg:py-20 text-light-text dark:text-dark-text border-b border-t border-light-text dark:border-dark-text">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-light-text dark:text-dark-text mb-4 sm:mb-6">Browse courses</h2>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="p-4 sm:p-6">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Filter by</h3>

            {/* Degree Type Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Degree Type</h4>
              <div className="space-y-2">
                {['Undergraduate', 'Postgraduate'].map((type) => (
                  <label key={type} className="radio-label">
                    <input
                      type="radio"
                      name="degreeType"
                      checked={selectedDegreeType === type}
                      onChange={() => setSelectedDegreeType(type)}
                    />
                    <span className="custom-radio"></span>
                    <span className="text-light-text dark:text-dark-text ml-1">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mode of Study Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Mode of Study</h4>
              <div className="space-y-2">
                {['Full-time', 'Part-time', 'Distance Learning'].map((mode) => (
                  <label key={mode} className="radio-label">
                    <input
                      type="radio"
                      name="studyMode"
                      checked={selectedStudyMode === mode}
                      onChange={() => setSelectedStudyMode(mode)}
                    />
                    <span className="custom-radio"></span>
                    <span className="text-light-text dark:text-dark-text ml-1">{mode}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-light-secondary dark:bg-dark-tertiary border border-black p-2" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                <div className="relative w-full h-48 sm:h-64 border border-black mb-2 sm:mb-3 bg-light-secondary dark:bg-dark-tertiary overflow-hidden">
                  <Image
                    src={course.imageUrl}
                    alt={course.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to a default image if the course image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/us-cources.png';
                    }}
                  />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1 mt-2 overflow-hidden" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}>
                  {String(course.name)}
                </h3>
                <div className="flex gap-1 text-xs sm:text-sm text-light-p dark:text-dark-text">
                  <p className="text-xs sm:text-sm text-light-p dark:text-dark-text mb-2">
                    {String(course.degree)}
                  </p>
                  <span>{String(course.duration)}</span>
                  <span>•</span>
                  <span>{String(course.mode)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-6 sm:mt-10 mb-6 sm:mb-8 text-center">
            <button 
              onClick={handleShowAllCourses}
              className="bg-[#FF9169] text-black flex flex-row justify-center items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium border border-black hover:bg-black hover:text-[#FF9169] transition-colors group" 
              style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
              <svg className="transition-opacity duration-300 fill-black group-hover:fill-[#FF9169]" width="12" height="13" viewBox="0 0 12 13" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.938 1.21338V9.33838C11.938 9.58702 11.8392 9.82548 11.6634 10.0013C11.4876 10.1771 11.2491 10.2759 11.0005 10.2759C10.7518 10.2759 10.5134 10.1771 10.3375 10.0013C10.1617 9.82548 10.063 9.58702 10.063 9.33838V3.479L1.66374 11.8767C1.48762 12.0528 1.24874 12.1517 0.999673 12.1517C0.750601 12.1517 0.511731 12.0528 0.335611 11.8767C0.15949 11.7005 0.0605469 11.4617 0.0605469 11.2126C0.0605469 10.9635 0.15949 10.7247 0.335611 10.5485L8.73483 2.15088H2.87545C2.62681 2.15088 2.38836 2.05211 2.21254 1.87629C2.03673 1.70048 1.93795 1.46202 1.93795 1.21338C1.93795 0.964738 2.03673 0.726282 2.21254 0.550466C2.38836 0.374651 2.62681 0.275879 2.87545 0.275879H11.0005C11.2491 0.275879 11.4876 0.374651 11.6634 0.550466C11.8392 0.726282 11.938 0.964738 11.938 1.21338Z" fill="currentColor" />
              </svg>
              Show all {totalCoursesCount} options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCoursesSection;