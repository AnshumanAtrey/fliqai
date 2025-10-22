"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Student {
  id: number;
  name: string;
  degree: string;
  university: string;
  essays: string;
  profileImage: string;
  colleges: string[];
}

const hardcodedStudents: Student[] = [
  {
    id: 1,
    name: "Rebecca Reaves",
    degree: "BSc Business Administration",
    university: "University of Bath",
    essays: "12 Essays",
    profileImage: "/essay/1.png",
    colleges: ["/logo1.png", "/logo2.jpg", "/logo3.png", "/college.png"]
  },
  {
    id: 2,
    name: "Alex Hawkins",
    degree: "BSc Computer Science",
    university: "Harvard University",
    essays: "15 Essays",
    profileImage: "/essay/2.png",
    colleges: ["/logo2.jpg", "/logo1.png", "/logo3.png", "/college.png"]
  },
  {
    id: 3,
    name: "Jordan Hughes",
    degree: "BSc Civil Engineering",
    university: "University of Oxford",
    essays: "12 Essays",
    profileImage: "/essay/3.png",
    colleges: ["/logo3.png", "/logo1.png", "/logo2.jpg", "/college.png"]
  }
];

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="flex items-start gap-4 mb-6">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <div className="w-24 h-32 border-2 border-black overflow-hidden">
          <Image
            alt={student.name}
            width={96}
            height={128}
            className="w-full h-full object-cover"
            src={student.profileImage}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-outfit font-bold text-xl text-light-text dark:text-dark-text mb-1">
          {student.name}
        </h3>
        <p className="font-outfit text-sm text-light-p dark:text-dark-text mb-4">
          {student.degree} • {student.university} • {student.essays}
        </p>

        {/* College Logos */}
        <div className="flex items-center gap-2">
          {student.colleges.slice(0, 4).map((college, index) => (
            <Image
              key={index}
              alt={`College ${index + 1}`}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              src={college}
            />
          ))}
          <span className="font-outfit text-sm text-light-p dark:text-dark-text ml-2">
            +5 more
          </span>
        </div>
      </div>
    </div>
  );
};

export const StudentProfilesSection: React.FC = () => {
  const router = useRouter();

  const handleViewMoreClick = () => {
    router.push('/discover-students');
  };

  return (
    <div className="w-full p-6 bg-light-bg dark:bg-dark-secondary border-2 border-black" style={{ boxShadow: '6px 6px 0px 0px rgb(0, 0, 0)' }}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-outfit font-bold text-2xl text-light-text dark:text-dark-text mb-2">
          Struggling to draft up your essay?
        </h2>
        <p className="font-outfit text-base text-light-p dark:text-dark-text">
          Have a look at student profiles to draw inspirations for your essay.
        </p>
      </div>

      {/* Student Cards */}
      <div className="mb-8">
        {hardcodedStudents.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
          />
        ))}
      </div>

      {/* View More Button */}
      <button
        onClick={handleViewMoreClick}
        className="w-full py-4 bg-[#FF9169] border-2 border-black text-black font-outfit text-lg font-semibold hover:bg-[#ff7b4d] transition-colors"
        style={{ boxShadow: '4px 4px 0px 0px rgb(0, 0, 0)' }}
      >
        View more profiles
      </button>
    </div>
  );
};