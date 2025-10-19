'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProfileCardProps {
  name: string;
  admissionYear: number;
  major: string;
  description: string;
  imageUrl: string;
  studentId?: string | number;
  onViewProfile: (id: string | number) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  admissionYear,
  major,
  description,
  imageUrl,
  studentId,
  onViewProfile,
}) => {
  return (
    <div className="border-2 border-black bg-light-bg dark:bg-dark-tertiary p-2 h-[570px] w-[350px]  flex flex-col" style={{ boxShadow: '4px 4px 0 0 #000' }}>
      <div className="flex items-start mb-4 flex-col">
        <div className="w-full h-[320px] mb-4 overflow-hidden border-[1px] border-black">
          <Image
            src={imageUrl}
            alt={name}
            width={320}
            height={320}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-light-p dark:text-dark-text">Admitted {admissionYear} • {major}</p>
        </div>
      </div>
      <p className="text-light-p dark:text-dark-text mb-4 text-sm flex-grow">{description}</p>
      <button
        onClick={() => studentId && onViewProfile(studentId)}
        className="mt-auto bg-[#FF9169] text-black hover:bg-black hover:text-[#FF9169] transition-colors w-full border-2 border-black px-4 py-2 text-sm font-medium self-start"
        style={{ boxShadow: '2px 2px 0 0 #000' }}
      >
        Full student profile
      </button>
    </div>
  );
};

interface StudentProfile {
  id?: string | number;
  name?: string;
  major?: string | { name?: string };
  bio?: string;
  discoveryInfo?: { description?: string };
  admissionYear?: number;
  profileImage?: string;
}

interface ProofBankSectionProps {
  students?: StudentProfile[];
}

const ProofBankSection: React.FC<ProofBankSectionProps> = ({ students = [] }) => {
  const router = useRouter();

  const handleViewProfile = (studentId: string | number) => {
    router.push(`/student-profile?id=${studentId}`);
  };

  // Fallback profiles if no students data
  const fallbackProfiles = [
    {
      id: 'fallback-1',
      name: 'Rahul Sharma',
      admissionYear: 2023,
      major: 'Computer Science',
      description: 'Secured a full scholarship through the National Talent Search Examination (NTSE).',
      imageUrl: '/Bank-1.jpg',
    },
    {
      id: 'fallback-2',
      name: 'Priya Patel',
      admissionYear: 2023,
      major: 'Mechanical Engineering',
      description: 'Awarded the prestigious INSPIRE Scholarship for Higher Education.',
      imageUrl: '/Bank-2.jpg',
    },
    {
      id: 'fallback-3',
      name: 'Amit Kumar',
      admissionYear: 2022,
      major: 'Electrical Engineering',
      description: 'Received the Kishore Vaigyanik Protsahan Yojana (KVPY) fellowship.',
      imageUrl: '/Bank-3.jpg',
    },
    {
      id: 'fallback-4',
      name: 'Neha Gupta',
      admissionYear: 2023,
      major: 'Biotechnology',
      description: 'Won the National Science Talent Search Scholarship.',
      imageUrl: '/Bank-4.jpg',
    },
    {
      id: 'fallback-5',
      name: 'Vikram Singh',
      admissionYear: 2022,
      major: 'Civil Engineering',
      description: 'Awarded the Central Sector Scholarship for professional courses.',
      imageUrl: '/Bank-5.jpg',
    },
    {
      id: 'fallback-6',
      name: 'Ananya Desai',
      admissionYear: 2023,
      major: 'Aerospace Engineering',
      description: 'Received the AICTE Pragati Scholarship for Girls.',
      imageUrl: '/Bank-6.jpg',
    },
  ];

  // Use student data if available, otherwise use fallback
  const displayProfiles = students.length > 0
    ? students.slice(0, 6).map((student, index) => ({
        id: student.id || `student-${index}`,
        name: student.name || `Student ${index + 1}`,
        admissionYear: student.admissionYear || 2023,
        major: typeof student.major === 'string' ? student.major : (student.major as any)?.name || 'Undeclared',
        description: (student.bio as string) || (student.discoveryInfo as any)?.description || 'Click to view full profile',
        imageUrl: student.profileImage || fallbackProfiles[index % fallbackProfiles.length].imageUrl,
      }))
    : fallbackProfiles;

  return (
    <div className="py-12 px-[80px] max-w-7xl mx-auto">
      <div >
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-10">Proof Bank</h2>
        <p className="text-light-p dark:text-dark-text mb-10">
          Here are some achievements achieved by admits at this university which you can draw inspiration from
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-light-text dark:text-dark-text">
        {displayProfiles.map((profile, index) => (
          <ProfileCard
            key={index}
            name={profile.name}
            admissionYear={profile.admissionYear}
            major={profile.major}
            description={profile.description}
            imageUrl={profile.imageUrl}
            studentId={profile.id}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>
      <button className="group mt-10 bg-[#FF9169] text-black hover:bg-black hover:text-[#FF9169] transition-colors flex items-center gap-2 border-2 border-black px-4 py-2 text-sm font-medium self-start"
        style={{ boxShadow: '2px 2px 0 0 #000' }}
      >
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-[#FF9169] transition-colors">
          <path d="M14.9137 2.49655L8.66374 8.74655C8.57664 8.83395 8.47315 8.90329 8.35919 8.95061C8.24524 8.99793 8.12306 9.02229 7.99967 9.02229C7.87628 9.02229 7.75411 8.99793 7.64016 8.95061C7.5262 8.90329 7.42271 8.83395 7.33561 8.74655L1.08561 2.49655C0.90949 2.32043 0.810547 2.08156 0.810547 1.83249C0.810547 1.58341 0.90949 1.34454 1.08561 1.16842C1.26173 0.992303 1.5006 0.89336 1.74967 0.89336C1.99874 0.89336 2.23762 0.992303 2.41374 1.16842L8.00045 6.75514L13.5872 1.16764C13.7633 0.991522 14.0022 0.892578 14.2512 0.892578C14.5003 0.892578 14.7392 0.991522 14.9153 1.16764C15.0914 1.34376 15.1904 1.58263 15.1904 1.8317C15.1904 2.08078 15.0914 2.31965 14.9153 2.49577L14.9137 2.49655Z" fill="currentColor" className="group-hover:fill-[#FF9169] transition-colors" />
        </svg>
        Show more
      </button>
    </div>
  );
};

export default ProofBankSection;
