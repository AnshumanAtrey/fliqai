"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../component/header";
import ExamTimeline from "@/components/ExamTimeline";
import ExtracurricularsDashboard from "@/components/ExtracurricularsDashboard";
import AwardsSection from "@/components/AwardsSection";
import EssaysSection from "@/components/EssaysSection";
import QuestionsAnswersSection from "@/components/QuestionsAnswersSection";
import { DotPatternBackground } from "../component/DotPatternBackground";
import { useAuth } from "../../lib/hooks/useAuth";
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';
import { ProfileLockedModal } from './components/ProfileLockedModal';
// Student profile interface
interface StudentProfile {
  id: number;
  name: string;
  university: string;
  graduationYear: string;
  bio: string;
  profileImage: string;
  backgroundImage: string;
  badges: string[];
  admissions: Array<{ id: string; src: string; name: string }>;
  stats: {
    awards: number;
    activities: number;
    qas: number;
    apIbs: number;
  };
  personalInfo: {
    race: string;
    gender: string;
    schoolType: string;
    legacy: string;
  };
  grades: Array<{ subject: string; grade: string }>;
  gpa: {
    current: number;
    average: number;
  };
}

interface Essay {
  id?: string;
  title: string;
  content: string;
  wordCount?: number;
  submittedFor?: string;
}

// Fallback data
const fallbackProfile: StudentProfile = {
  id: 1,
  name: "Rebecca Reeves",
  university: "University of Bath",
  graduationYear: "'27",
  bio: "Hey there! I'm Rebecca, a final-year Psychology student at the University of Bath. I'm passionate about understanding how people think, learn, and connect, which is why I've spent the last three years diving into research projects, volunteering with local schools, and leading our campus Mental Health Awareness Society. My long term goal? To combine psychology and technology to build better tools for learning and wellbeing.",
  profileImage: "/profile-pic-1.jpg",
  backgroundImage: "/bath_profile.png",
  badges: ["International Student", "Low Income", "Recruited Athlete"],
  admissions: [
    { id: 'mit', src: '/mit.png', name: 'MIT' },
    { id: 'harvard', src: '/harvard.png', name: 'Harvard' },
    { id: 'stanford', src: '/college.png', name: 'Stanford' },
    { id: 'bath', src: '/bath.png', name: 'Bath' }
  ],
  stats: {
    awards: 5,
    activities: 10,
    qas: 10,
    apIbs: 8
  },
  personalInfo: {
    race: "African American",
    gender: "Female",
    schoolType: "Private",
    legacy: "No"
  },
  grades: [
    { subject: "Calc", grade: "B" },
    { subject: "Biology", grade: "A" },
    { subject: "Chemistry", grade: "A" },
    { subject: "History", grade: "B" },
    { subject: "SAT", grade: "1400" }
  ],
  gpa: {
    current: 3.92,
    average: 3.71
  }
};

function StudentProfile() {
  const [profile, setProfile] = useState<StudentProfile>(fallbackProfile);
  const [essays, setEssays] = useState<Array<Essay>>([]);
  const searchParams = useSearchParams();
  const studentId = searchParams.get('id') || '1';

  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  // Fetch user credits
  const fetchUserCredits = async () => {
    if (!user) return;
    
    try {
      let token = localStorage.getItem('token');
      if (!token && user && 'getIdToken' in user && typeof user.getIdToken === 'function') {
        token = await user.getIdToken();
      }
      
      if (!token) return;
      
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
      const response = await fetch(`${backendUrl}/api/profile/credits`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setUserCredits(data.data.credits || 0);
        }
      }
    } catch (err) {
      console.error('Failed to fetch credits:', err);
    }
  };

  // Fetch student profile preview (no credits required)
  const fetchProfilePreview = async () => {
    if (!user || !studentId) {
      console.log('❌ No user or student ID found, using fallback data');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let token = localStorage.getItem('token');
      if (!token && user && 'getIdToken' in user && typeof user.getIdToken === 'function') {
        token = await user.getIdToken();
        if (token) {
          localStorage.setItem('token', token);
        }
      }
      
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

      console.log('🔄 Fetching profile preview for student:', studentId);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
      const response = await fetch(`${backendUrl}/api/students/${studentId}/preview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch preview: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Preview Data received:', data);

      if (data.success && data.data) {
        const apiProfile = data.data;
        const transformedProfile: StudentProfile = {
          id: apiProfile.id || parseInt(studentId),
          name: apiProfile.name || fallbackProfile.name,
          university: apiProfile.university || fallbackProfile.university,
          graduationYear: apiProfile.graduationYear || fallbackProfile.graduationYear,
          bio: apiProfile.bio || fallbackProfile.bio,
          profileImage: apiProfile.profileImage || fallbackProfile.profileImage,
          backgroundImage: apiProfile.backgroundImage || fallbackProfile.backgroundImage,
          badges: apiProfile.badges || fallbackProfile.badges,
          admissions: fallbackProfile.admissions,
          stats: apiProfile.stats || fallbackProfile.stats,
          personalInfo: fallbackProfile.personalInfo,
          grades: fallbackProfile.grades,
          gpa: fallbackProfile.gpa
        };
        setProfile(transformedProfile);
        setIsLocked(true); // Profile is locked by default
      }
    } catch (err: unknown) {
      console.error('❌ Failed to fetch preview:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch preview');
    } finally {
      setLoading(false);
    }
  };

  // Unlock profile (deducts 15 credits)
  const unlockProfile = async () => {
    if (!user || !studentId) return;
    
    setIsUnlocking(true);
    
    try {
      let token = localStorage.getItem('token');
      if (!token && user && 'getIdToken' in user && typeof user.getIdToken === 'function') {
        token = await user.getIdToken();
      }
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      console.log('🔓 Unlocking profile for student:', studentId);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
      const response = await fetch(`${backendUrl}/api/students/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Insufficient credits');
        }
        throw new Error(`Failed to unlock profile: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Full Profile Data received:', data);
      
      if (data.success && data.data) {
        const apiProfile = data.data;
        const transformedProfile: StudentProfile = {
          id: apiProfile.id || parseInt(studentId),
          name: apiProfile.name || fallbackProfile.name,
          university: apiProfile.university?.name || apiProfile.university || fallbackProfile.university,
          graduationYear: apiProfile.graduationYear || fallbackProfile.graduationYear,
          bio: apiProfile.bio || apiProfile.discoveryInfo?.description || fallbackProfile.bio,
          profileImage: apiProfile.profileImage || fallbackProfile.profileImage,
          backgroundImage: apiProfile.backgroundImage || fallbackProfile.backgroundImage,
          badges: apiProfile.badges || fallbackProfile.badges,
          admissions: fallbackProfile.admissions,
          stats: {
            awards: apiProfile.awards?.length || apiProfile.stats?.awards || 0,
            activities: apiProfile.extracurriculars?.length || apiProfile.stats?.activities || 0,
            qas: apiProfile.qas?.length || apiProfile.stats?.qas || 0,
            apIbs: apiProfile.courses?.length || apiProfile.stats?.apIbs || 0
          },
          personalInfo: {
            race: apiProfile.personalInfo?.ethnicity || fallbackProfile.personalInfo.race,
            gender: apiProfile.personalInfo?.gender || fallbackProfile.personalInfo.gender,
            schoolType: apiProfile.personalInfo?.schoolType || fallbackProfile.personalInfo.schoolType,
            legacy: apiProfile.personalInfo?.legacy || fallbackProfile.personalInfo.legacy
          },
          grades: apiProfile.grades || fallbackProfile.grades,
          gpa: {
            current: apiProfile.gpa?.current || fallbackProfile.gpa.current,
            average: apiProfile.gpa?.average || fallbackProfile.gpa.average
          }
        };
        setProfile(transformedProfile);
        
        if (apiProfile.essays && Array.isArray(apiProfile.essays)) {
          setEssays(apiProfile.essays);
        }
        
        setIsLocked(false); // Unlock the profile
        await fetchUserCredits(); // Refresh credits
      }
    } catch (err: unknown) {
      console.error('❌ Failed to unlock profile:', err);
      alert(err instanceof Error ? err.message : 'Failed to unlock profile');
    } finally {
      setIsUnlocking(false);
    }
  };

  // Fetch student profile data from backend (OLD - keeping for reference)
  const fetchProfileData = async () => {
    if (!user || !studentId) {
      console.log('❌ No user or student ID found, using fallback data');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get token using the same method as useAuthProtection
      let token = localStorage.getItem('token');
      if (!token && user && 'getIdToken' in user && typeof user.getIdToken === 'function') {
        token = await user.getIdToken();
        if (token) {
          localStorage.setItem('token', token);
          console.log('✅ Got fresh token for student profile');
        }
      }
      
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

      console.log('🔄 Fetching profile data for student:', studentId);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
      const response = await fetch(`${backendUrl}/api/student-profile/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Subscription required to access student profiles');
        }
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Profile API Data received:', data);

      if (data.success && data.data) {
        // Transform API data to match component interface
        const apiProfile = data.data;
        const transformedProfile: StudentProfile = {
          id: apiProfile.id || parseInt(studentId),
          name: apiProfile.name || fallbackProfile.name,
          university: apiProfile.university?.name || fallbackProfile.university,
          graduationYear: apiProfile.graduationYear || fallbackProfile.graduationYear,
          bio: apiProfile.bio || apiProfile.discoveryInfo?.description || fallbackProfile.bio,
          profileImage: apiProfile.profileImage || fallbackProfile.profileImage,
          backgroundImage: fallbackProfile.backgroundImage, // Use fallback for now
          badges: apiProfile.badges || fallbackProfile.badges,
          admissions: fallbackProfile.admissions, // Use fallback for now
          stats: {
            awards: apiProfile.awards?.length || 0,
            activities: apiProfile.extracurriculars?.length || 0,
            qas: apiProfile.qas?.length || 0,
            apIbs: apiProfile.courses?.length || 0
          },
          personalInfo: {
            race: apiProfile.personalInfo?.ethnicity || fallbackProfile.personalInfo.race,
            gender: apiProfile.personalInfo?.gender || fallbackProfile.personalInfo.gender,
            schoolType: apiProfile.personalInfo?.schoolType || fallbackProfile.personalInfo.schoolType,
            legacy: apiProfile.personalInfo?.legacy || fallbackProfile.personalInfo.legacy
          },
          grades: apiProfile.grades || fallbackProfile.grades,
          gpa: {
            current: apiProfile.gpa?.current || fallbackProfile.gpa.current,
            average: apiProfile.gpa?.average || fallbackProfile.gpa.average
          }
        };
        setProfile(transformedProfile);
        
        // Extract essays from API response
        if (apiProfile.essays && Array.isArray(apiProfile.essays)) {
          setEssays(apiProfile.essays);
        }
      }
    } catch (err: unknown) {
      console.error('❌ Failed to fetch profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfilePreview();
    fetchUserCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);
  return (
    <div>
      <DotPatternBackground>
        {/* Header with Navigation */}
        <Header />

        {/* Back to Student Catalogue */}
        <div className="px-[90px] pt-12 pb-2">
          <button 
            className="flex items-center gap-2 text-[#5D5237] dark:text-dark-text hover:opacity-80 transition-opacity cursor-pointer"
            onClick={() => window.location.href = '/discover-students'}
          >
            <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_1_332)">
                <rect width="30" height="29" className="fill-[#FF9169] dark:fill-[#FFA07A]" />
                <rect x="0.5" y="0.5" width="29" height="28" className="stroke-black" />
                <path d="M17.5 8.75C17.6989 8.75006 17.8896 8.82908 18.0303 8.96973C18.1709 9.11037 18.2499 9.30112 18.25 9.5C18.25 9.69886 18.1708 9.8896 18.0303 10.0303V10.0312L13.5605 14.5L18.0303 18.9688V18.9697C18.0998 19.0393 18.1557 19.122 18.1934 19.2129C18.231 19.3038 18.25 19.4016 18.25 19.5C18.25 19.5984 18.231 19.6962 18.1934 19.7871C18.1557 19.8781 18.0999 19.9606 18.0303 20.0303C17.9606 20.0999 17.8781 20.1557 17.7871 20.1934C17.6962 20.231 17.5984 20.25 17.5 20.25C17.4016 20.25 17.3038 20.231 17.2129 20.1934C17.122 20.1557 17.0393 20.0998 16.9697 20.0303L11.9697 15.0303C11.9002 14.9607 11.8453 14.878 11.8076 14.7871C11.7699 14.6961 11.75 14.5986 11.75 14.5C11.75 14.4014 11.7699 14.3039 11.8076 14.2129C11.8453 14.122 11.9002 14.0393 11.9697 13.9697L16.9697 8.96973C17.1104 8.82917 17.3011 8.75 17.5 8.75Z" className="fill-black dark:fill-white" stroke="currentColor" stroke-width="0.5" />
              </g>
              <defs>
                <filter id="filter0_d_1_332" x="0" y="0" width="32" height="31" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dx="2" dy="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_332" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_332" result="shape" />
                </filter>
              </defs>
            </svg>

            <span 
              className="font-outfit text-sm"
              onClick={() => window.location.href = '/discover-students'}
            >
              Back to Student Catalogue
            </span>
          </button>
        </div>

        <main className="max-w-7xl bg-light-bg dark:bg-dark-secondary mx-auto px-4 py-8 border-[1px] border-black dark:border-dark-text mb-[24px]">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <p className="text-red-600 mb-4">Failed to load profile: {error}</p>
                <p className="text-light-text dark:text-dark-text">Showing cached profile</p>
              </div>
            </div>
          )}

          {/* University Header */}
          <div className="mb-8 flex justify-center">
            <div className="w-full h-[374px]">
              <Image
                src={profile.backgroundImage}
                alt={profile.university}
                width={1286}
                height={374}
                className="w-full h-full object-fill"
                priority
              />
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-white dark:bg-dark-tertiary border border-black dark:border-dark-text  p-12 mb-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Section - Text Content */}
              <div className="flex-1">
                <div className="space-y-6">
                  {/* Name and University */}
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-outfit mb-2">{profile.name}</h1>
                    <p className="text-lg font-bold text-gray-600 dark:text-gray-300">{profile.university} {profile.graduationYear}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#FFC3A9] dark:bg-[#FFA07A] text-black text-sm font-medium px-4 py-1.5 border border-black dark:border-dark-text  flex items-center">
                      International Student
                    </span>
                    <span className="bg-[#FFC3A9] dark:bg-[#FFA07A] text-black text-sm font-medium px-4 py-1.5 border border-black dark:border-dark-text  flex items-center">
                      Low Income
                    </span>
                    <span className="bg-[#FFC3A9] dark:bg-[#FFA07A] text-black text-sm font-medium px-4 py-1.5 border border-black dark:border-dark-text  flex items-center">
                      Recruited Athlete
                    </span>
                  </div>

                  {/* Bio */}
                  <div className="w-[550px] space-y-2">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>

                  {/* University Admissions */}
                  <div className="pt-2">
                    <h3 className="font-outfit font-semibold text-gray-900 dark:text-white text-lg mb-3">{profile.name.split(' ')[0]}&apos;s Admissions:</h3>
                    <div className="flex items-center gap-4">
                      {[
                        { id: 'mit', src: '/mit.png' },
                        { id: 'harvard', src: '/harvard.png' },
                        { id: 'stanford', src: '/college.png' },
                        { id: 'bath', src: '/bath.png' }
                      ].map((uni, index) => (
                        <div
                          key={uni.id}
                          className="w-[70px] h-[70px] shrink-0 bg-contain bg-center bg-no-repeat relative"
                          style={{
                            backgroundImage: `url(${uni.src})`,
                            zIndex: index,
                            marginLeft: index > 0 ? '-10px' : '0'
                          }}
                        />
                      ))}
                      <span className="text-gray-400 dark:text-gray-400 text-sm font-medium ml-2">+5 more</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Profile Photo */}
              <div className="lg:w-80 flex-shrink-0 flex items-center justify-center">
                <div className="relative w-full max-w-[455px] h-[455px] overflow-hidden border-2 border-black dark:border-dark-text ">
                  <Image
                    src={profile.profileImage}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section - Full Width */}
          <div className="mt-8 pt-3 mb-16 ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
              {[
                { value: profile.stats.awards.toString(), label: 'Awards' },
                { value: profile.stats.activities.toString(), label: 'Activities' },
                { value: profile.stats.qas.toString(), label: 'Q&As' },
                { value: profile.stats.apIbs.toString(), label: 'AP/IBs' }
              ].map((stat, index) => (
                <div key={index} className="bg-[#FFE3D4] dark:bg-dark-card border border-black dark:border-dark-text  p-4 h-[150px] flex flex-col justify-center items-center gap-2">
                  <div className="text-4xl font-bold text-black dark:text-black font-outfit">{stat.value}</div>
                  <div className="text-black dark:text-black text-xl font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Academics Section */}
          <div className="px-[90px] bg-light-bg dark:bg-dark-bg">
            <h2 className="font-outfit text-3xl font-bold text-black dark:text-white pt-10 pl-8 pb-8">Academics</h2>

            {isLocked ? (
              <div className="p-8">
                {/* Blurred preview content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 blur-sm pointer-events-none opacity-50">
                  <div className="bg-[#FFC3A9] dark:bg-[#FFA07A] p-6 border border-black dark:border-dark-text h-64"></div>
                  <div className="bg-[#FFE3D4] dark:bg-dark-card p-6 border border-black dark:border-dark-text h-64"></div>
                  <div className="space-y-4">
                    <div className="bg-[#FFE3D4] dark:bg-dark-card p-4 border border-black dark:border-dark-text h-28"></div>
                    <div className="bg-[#FFE3D4] dark:bg-dark-card p-4 border border-black dark:border-dark-text h-28"></div>
                  </div>
                </div>
                
                {/* Locked Modal - Positioned over the blurred content */}
                <div className="relative -mt-48">
                  <ProfileLockedModal 
                    onUnlock={unlockProfile}
                    isUnlocking={isUnlocking}
                    userCredits={userCredits}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              {/* Personal Information */}
              <div className="bg-[#FFC3A9] dark:bg-[#FFA07A] p-6 border border-black dark:border-dark-text  text-black dark:text-black">
                <h3 className="font-outfit font-bold text-xl mb-6 pb-2 border-b border-black dark:border-dark-text ">Personal Information</h3>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="font-medium">Race:</span>
                    <span className="font-bold">{profile.personalInfo.race}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Gender:</span>
                    <span className="font-bold">{profile.personalInfo.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">School Type:</span>
                    <span className="font-bold">{profile.personalInfo.schoolType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Legacy:</span>
                    <span className="font-bold">{profile.personalInfo.legacy}</span>
                  </div>
                </div>
              </div>

              {/* Rebecca's Grades */}
              <div className="bg-[#FFE3D4] dark:bg-dark-card p-6 border border-black dark:border-dark-text  text-black dark:text-black">
                <h3 className="font-outfit font-bold text-xl mb-6 pb-2 border-b border-black dark:border-dark-text ">{profile.name.split(' ')[0]}&apos;s Grades</h3>
                <div className="space-y-3">
                  {profile.grades.map((grade, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{grade.subject}</span>
                      <span className="font-semibold">{grade.grade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GPA Information */}
              <div className="space-y-4">
                {/* Average GPA */}
                <div className="bg-[#FFE3D4] dark:bg-dark-card p-4 border border-black dark:border-dark-text  text-black dark:text-black">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-light">Average GPA</span>
                  </div>
                  <div className="w-full h-[30px] flex flex-row gap-2">
                    <div className="bg-white border-[1px] border-black dark:border-dark-text  h-full" style={{ width: '74.2%', boxShadow: '2px 2px 0 0 #000' }}></div>
                    <span className="font-bold">{profile.gpa.average}</span>
                  </div>
                </div>
                {/* Rebecca's GPA */}
                <div className="bg-[#FFE3D4] dark:bg-dark-card p-4 border border-black dark:border-dark-text  text-black dark:text-black">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <span className="font-light">{profile.name.split(' ')[0]}&apos;s GPA</span>
                  </div>
                  <div className="w-full h-[30px] flex flex-row gap-2">
                    <div className="bg-[#FF8C42] dark:bg-[#FF9F6E] border-[1px] border-black dark:border-dark-text  h-full" style={{ width: '78.4%', boxShadow: '2px 2px 0 0 #000' }}></div>
                    <span className="font-bold">{profile.gpa.current}</span>
                  </div>
                </div>
                {/* GPA Comparison */}
                <div className="bg-[#FFE3D4] dark:bg-dark-card p-4 border border-black dark:border-dark-text  text-black dark:text-black">
                  <p className="text-sm">
                    {profile.name.split(' ')[0]}&apos;s GPA is {profile.gpa.current > profile.gpa.average ? 'higher' : 'lower'} than the average GPA of admits at this uni
                  </p>
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Exam Timeline Section */}
          <div className={`mt-12 mb-16 ${isLocked ? 'blur-sm pointer-events-none' : ''}`}>
            <ExamTimeline />
          </div>

          {/* Extracurriculars Dashboard */}
          <div className={`mt-12 ${isLocked ? 'blur-sm pointer-events-none' : ''}`}>
            <ExtracurricularsDashboard />
          </div>

          {/* Awards Section */}
          <div className={`mt-12 ${isLocked ? 'blur-sm pointer-events-none' : ''}`}>
            <AwardsSection />
          </div>

          {/* Essays Section */}
          <div className={`mt-12 ${isLocked ? 'blur-sm pointer-events-none' : ''}`}>
            <EssaysSection 
              essays={essays}
              studentName={profile.name}
              studentImage={profile.profileImage}
            />
          </div>

          {/* Questions & Answers Section */}
          <div className={`mt-12 mb-20 ${isLocked ? 'blur-sm pointer-events-none' : ''}`}>
            <QuestionsAnswersSection />
          </div>
        </main>
      </DotPatternBackground>
    </div>
  );
}

export default withAuthProtection(StudentProfile, {
  requireAuth: false,
  requireProfile: false  // Temporarily disabled for testing
});