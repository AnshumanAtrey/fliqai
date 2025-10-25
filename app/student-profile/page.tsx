"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  backgroundImage: "/student-profile/uni-bg-for-student-profile.png",
  badges: ["International Student", "Low Income", "Recruited Athlete"],
  admissions: [
    { id: 'mit', src: '/mit.png', name: 'MIT' },
    { id: 'harvard', src: '/harvard.png', name: 'Harvard' },
    { id: 'oxford', src: '/oxford.jpg', name: 'Oxford' },
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
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [essays, setEssays] = useState<Array<Essay>>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const studentId = searchParams.get('id') || '1';

  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
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
      console.log('❌ No user or student ID found');
      setLoading(false);
      setError('User authentication required');
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
          profileImage: apiProfile.imageUrl || apiProfile.profileImage || fallbackProfile.profileImage, // Use imageUrl from Firebase Storage first
          backgroundImage: apiProfile.backgroundImage || fallbackProfile.backgroundImage,
          badges: apiProfile.badges || fallbackProfile.badges,
          admissions: apiProfile.admissions || fallbackProfile.admissions,
          stats: apiProfile.stats || fallbackProfile.stats,
          personalInfo: apiProfile.personalInfo || fallbackProfile.personalInfo,
          grades: apiProfile.grades || fallbackProfile.grades,
          gpa: apiProfile.gpa || fallbackProfile.gpa
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
          profileImage: apiProfile.imageUrl || apiProfile.profileImage || fallbackProfile.profileImage, // Use imageUrl from Firebase Storage first
          backgroundImage: apiProfile.backgroundImage || fallbackProfile.backgroundImage,
          badges: apiProfile.badges || fallbackProfile.badges,
          admissions: apiProfile.admissions || fallbackProfile.admissions,
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
            onClick={() => router.push('/discover-students')}
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

            <span className="font-outfit text-sm">
              Back to Student Catalogue
            </span>
          </button>
        </div>

        <main className="max-w-7xl bg-light-bg dark:bg-dark-secondary mx-auto px-4 py-8 border-[1px] border-black dark:border-dark-text mb-[24px]">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FF9169] mb-4"></div>
              <p className="text-light-text dark:text-dark-text text-lg font-outfit">Loading student profile...</p>
              <p className="text-light-p dark:text-dark-text text-sm mt-2">Please wait while we fetch the profile data</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center max-w-md">
                <div className="mb-4">
                  <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-red-600 dark:text-red-400 mb-2 text-lg font-semibold">Failed to load profile</p>
                <p className="text-light-p dark:text-dark-text mb-6">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#FF9169] text-white px-6 py-2 rounded border border-black hover:bg-black hover:text-[#FF9169] transition-colors"
                  style={{ boxShadow: '2px 2px 0 0 #000' }}
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Profile Content - Only show when loaded */}
          {!loading && !error && profile && (
            <>
              {/* University Header */}
              <div className="mb-8 flex justify-center">
                <div className="w-full h-[374px] overflow-hidden">
                  <Image
                    src="/student-profile/uni-bg-for-student-profile.png"
                    alt={profile.university}
                    width={1286}
                    height={374}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Profile Section */}
              <div className="bg-white dark:bg-dark-tertiary border border-black dark:border-dark-text p-4 sm:p-6 lg:p-12 mb-8">
                <div className="w-full">
                  {/* Content Section - Full Width */}
                  <div className="w-full">
                    <div className="space-y-6">
                      {/* Name and University */}
                      <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-outfit mb-2 break-words">{profile.name}</h1>
                        <p className="text-base sm:text-lg font-bold text-gray-600 dark:text-gray-300 break-words">{profile.university} {profile.graduationYear}</p>
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
                      <div className="w-full space-y-2">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                          {profile.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section - Full Width */}
              <div className="mt-6 sm:mt-8 pt-3 mb-8 sm:mb-16 px-4 sm:px-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { value: profile.stats.awards.toString(), label: 'Awards' },
                    { value: profile.stats.activities.toString(), label: 'Activities' },
                    { value: profile.stats.qas.toString(), label: 'Q&As' },
                    { value: profile.stats.apIbs.toString(), label: 'AP/IBs' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-[#FFE3D4] dark:bg-dark-card border border-black dark:border-dark-text p-3 sm:p-4 h-[120px] sm:h-[150px] flex flex-col justify-center items-center gap-1 sm:gap-2">
                      <div className="text-3xl sm:text-4xl font-bold text-black dark:text-black font-outfit">{stat.value}</div>
                      <div className="text-black dark:text-black text-base sm:text-xl font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academics Section */}
              <div className="px-4 sm:px-8 lg:px-[90px] bg-light-bg dark:bg-dark-bg">
                <h2 className="font-outfit text-2xl sm:text-3xl font-bold text-black dark:text-white pt-6 sm:pt-10 pb-6 sm:pb-8">Academics</h2>

                {isLocked ? (
                  <div className="p-4 sm:p-8">
                    {/* Blurred preview content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 blur-sm pointer-events-none opacity-50">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
                    {/* Personal Information */}
                    <div className="bg-[#FFC3A9] dark:bg-[#FFA07A] p-4 sm:p-6 border border-black dark:border-dark-text text-black dark:text-black">
                      <h3 className="font-outfit font-bold text-lg sm:text-xl mb-4 sm:mb-6 pb-2 border-b border-black dark:border-dark-text">Personal Information</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-medium text-sm sm:text-base">Race:</span>
                          <span className="font-bold text-sm sm:text-base text-right break-words">{profile.personalInfo.race}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-medium text-sm sm:text-base">Gender:</span>
                          <span className="font-bold text-sm sm:text-base text-right break-words">{profile.personalInfo.gender}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-medium text-sm sm:text-base">School Type:</span>
                          <span className="font-bold text-sm sm:text-base text-right break-words">{profile.personalInfo.schoolType}</span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-medium text-sm sm:text-base">Legacy:</span>
                          <span className="font-bold text-sm sm:text-base text-right break-words">{profile.personalInfo.legacy}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rebecca's Grades */}
                    <div className="bg-[#FFE3D4] dark:bg-dark-card p-4 sm:p-6 border border-black dark:border-dark-text text-black dark:text-black">
                      <h3 className="font-outfit font-bold text-lg sm:text-xl mb-4 sm:mb-6 pb-2 border-b border-black dark:border-dark-text">{profile.name.split(' ')[0]}&apos;s Grades</h3>
                      <div className="space-y-2 sm:space-y-3">
                        {profile.grades.map((grade, index) => (
                          <div key={index} className="flex justify-between items-center gap-2">
                            <span className="text-sm sm:text-base">{grade.subject}</span>
                            <span className="font-semibold text-sm sm:text-base">{grade.grade}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* GPA Information */}
                    <div className="space-y-3 sm:space-y-4">
                      {/* Average GPA */}
                      <div className="bg-[#FFE3D4] dark:bg-dark-card p-3 sm:p-4 border border-black dark:border-dark-text text-black dark:text-black">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-light text-sm sm:text-base">Average GPA</span>
                        </div>
                        <div className="w-full h-[25px] sm:h-[30px] flex flex-row gap-2 items-center">
                          <div className="bg-white border-[1px] border-black dark:border-dark-text h-full" style={{ width: '74.2%', boxShadow: '2px 2px 0 0 #000' }}></div>
                          <span className="font-bold text-sm sm:text-base whitespace-nowrap">{profile.gpa.average}</span>
                        </div>
                      </div>
                      {/* Rebecca's GPA */}
                      <div className="bg-[#FFE3D4] dark:bg-dark-card p-3 sm:p-4 border border-black dark:border-dark-text text-black dark:text-black">
                        <div className="flex justify-between items-center mb-2 gap-2">
                          <span className="font-light text-sm sm:text-base">{profile.name.split(' ')[0]}&apos;s GPA</span>
                        </div>
                        <div className="w-full h-[25px] sm:h-[30px] flex flex-row gap-2 items-center">
                          <div className="bg-[#FF8C42] dark:bg-[#FF9F6E] border-[1px] border-black dark:border-dark-text h-full" style={{ width: '78.4%', boxShadow: '2px 2px 0 0 #000' }}></div>
                          <span className="font-bold text-sm sm:text-base whitespace-nowrap">{profile.gpa.current}</span>
                        </div>
                      </div>
                      {/* GPA Comparison */}
                      <div className="bg-[#FFE3D4] dark:bg-dark-card p-3 sm:p-4 border border-black dark:border-dark-text text-black dark:text-black">
                        <p className="text-xs sm:text-sm break-words">
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
            </>
          )}
        </main>
      </DotPatternBackground>
    </div>
  );
}

export default withAuthProtection(StudentProfile, {
  requireAuth: false,
  requireProfile: false  // Temporarily disabled for testing
});