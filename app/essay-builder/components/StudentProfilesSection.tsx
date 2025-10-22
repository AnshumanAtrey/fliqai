"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface StudentProfile {
  id: string;
  name: string;
  university: string;
  major: string;
  essayCount: number;
  profileImage: string;
  admissions: string[];
}

export const StudentProfilesSection = () => {
  const router = useRouter();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomStudents();
  }, []);

  const fetchRandomStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://fliq-backend-bxhr.onrender.com/api/students/discover?limit=3`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.students) {
          // Map to our interface
          const mappedStudents = data.data.students.slice(0, 3).map((s: any) => ({
            id: s.id,
            name: s.name,
            university: s.university || 'University',
            major: s.interests?.split(',')[0] || 'Student',
            essayCount: parseInt(s.stats?.split('Essays')[0]) || 12,
            profileImage: s.profileImage || '/profile.png',
            admissions: s.colleges || []
          }));
          setStudents(mappedStudents);
        }
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
      // Use fallback data
      setStudents([
        {
          id: '1',
          name: 'Rebecca Reeves',
          university: 'University of Bath',
          major: 'BSc Business Administration',
          essayCount: 12,
          profileImage: '/profile.png',
          admissions: ['/mit.png', '/harvard.png', '/college.png', '/bath.png']
        },
        {
          id: '2',
          name: 'Alex Hawkins',
          university: 'Harvard University',
          major: 'BSc Computer Science',
          essayCount: 15,
          profileImage: '/profile.png',
          admissions: ['/mit.png', '/harvard.png', '/college.png', '/bath.png']
        },
        {
          id: '3',
          name: 'Jordan Hughes',
          university: 'University of Oxford',
          major: 'BSc Civil Engineering',
          essayCount: 12,
          profileImage: '/profile.png',
          admissions: ['/mit.png', '/harvard.png', '/college.png', '/bath.png']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentClick = (studentId: string) => {
    router.push(`/student-profile?id=${studentId}`);
  };

  const handleViewMore = () => {
    router.push('/discover-students');
  };

  if (loading) {
    return null;
  }

  return (
    <div className="w-full mt-8 p-6 bg-light-bg dark:bg-dark-secondary border border-black dark:border-dark-text" style={{ boxShadow: '4px 4px 0 0 #000' }}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="font-['Outfit'] text-lg sm:text-xl font-bold text-light-text dark:text-dark-text mb-2">
          Struggling to draft up your essay?
        </h3>
        <p className="font-['Outfit'] text-sm sm:text-base text-light-p dark:text-dark-text">
          Have a look at student profiles to draw inspirations for your essay.
        </p>
      </div>

      {/* Student Cards */}
      <div className="flex flex-col gap-4 mb-6">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => handleStudentClick(student.id)}
            className="flex items-center gap-4 p-4 bg-light-secondary dark:bg-dark-tertiary border border-black dark:border-dark-text cursor-pointer hover:bg-[#FFE5D9] dark:hover:bg-dark-bg transition-colors"
            style={{ boxShadow: '2px 2px 0 0 #000' }}
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border border-black bg-light-secondary dark:bg-dark-secondary rounded-full overflow-hidden">
                <Image
                  src={student.profileImage}
                  alt={student.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Student Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-['Outfit'] text-base sm:text-lg font-bold text-light-text dark:text-dark-text mb-1 truncate">
                {student.name}
              </h4>
              <p className="font-['Outfit'] text-xs sm:text-sm text-light-p dark:text-dark-text mb-2">
                {student.major} • {student.university} • {student.essayCount} Essays
              </p>

              {/* College Logos */}
              <div className="flex items-center gap-2">
                {student.admissions.slice(0, 4).map((logo, index) => (
                  <Image
                    key={index}
                    src={logo}
                    alt={`College ${index + 1}`}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                ))}
                {student.admissions.length > 4 && (
                  <span className="text-xs text-light-p dark:text-dark-text">
                    +{student.admissions.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <button
        onClick={handleViewMore}
        className="w-full py-3 px-6 border border-black text-black font-['Outfit'] text-sm sm:text-base font-medium transition-colors duration-200 bg-[#FF9169] hover:bg-[#ff7b4d]"
        style={{ boxShadow: '4px 4px 0 0 #000' }}
      >
        View more profiles
      </button>
    </div>
  );
};
