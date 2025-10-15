"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Header from "../component/header";
import { DotPatternBackground } from "../component/DotPatternBackground";
import { useApiGet } from "../../lib/hooks/useApi";
import { useAuth } from "../../lib/hooks/useAuth";
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';




const SearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 stroke-black dark:stroke-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const FilterIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-5 h-5 stroke-black dark:stroke-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
  </svg>
);

const LeftArrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-5 h-5 stroke-black dark:stroke-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
  </svg>
);

const RightArrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-5 h-5 stroke-black dark:stroke-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
  </svg>
);

const MoonIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-7 h-7 stroke-black dark:stroke-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

const SunIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-7 h-7 stroke-black dark:stroke-white">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

// Student interface for type safety
interface Student {
  id: number;
  name: string;
  stats: string;
  description: string;
  background: string;
  interests: string;
  sat: string;
  gpa: string;
  uwGpa: string;
  profileImage: string;
  colleges: string[];
  sticker?: string;
  hasSticker: boolean;
}

// Fallback data for when API is not available
const fallbackStudents: Student[] = [
  {
    id: 1,
    name: "Jordan Hughes",
    stats: "38 Essays | 11 Colleges | 5 Awards | 10 Activities | 10 GLAs | 8 AP/IBs",
    description: "Economics & Political Science student at Stanford University | 500K in Scholarships | Profile includes Research and Summer Research Email Templates",
    background: "African American male student from USA",
    interests: "Computer Science, Artificial Intelligence, Robotics",
    sat: "1580",
    gpa: "4.8",
    uwGpa: "4.5",
    profileImage: "/profile.png",
    colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
    sticker: "/sticker1.png",
    hasSticker: true
  },
  {
    id: 2,
    name: "Sofia Martinez",
    stats: "25 Essays | 8 Colleges | 3 Awards | 7 Activities | 4 GLAs | 5 AP/IBs",
    description: "Biology & Environmental Studies student at UC Berkeley | 300K in Scholarships | Profile includes Personal Statement and Research Proposal Templates",
    background: "Hispanic female student from Mexico",
    interests: "Environmental Science, Sustainability, Renewable Energy",
    sat: "1560",
    gpa: "4.2",
    uwGpa: "4.0",
    profileImage: "/profile.png",
    colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
    hasSticker: false
  },
  {
    id: 3,
    name: "Mei Wong",
    stats: "30 Essays | 12 Colleges | 6 Awards | 9 Activities | 5 GLAs | 7 AP/IBs",
    description: "Business Administration student at Harvard University | 700K in Scholarships | Profile includes Cover Letter and Internship Guide",
    background: "Asian American female student from Canada",
    interests: "Business, Finance, Marketing",
    sat: "1590",
    gpa: "4.6",
    uwGpa: "4.3",
    profileImage: "/profile.png",
    colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
    hasSticker: false
  },
  {
    id: 4,
    name: "Liam Johnson",
    stats: "40 Essays | 15 Colleges | 8 Awards | 12 Activities | 6 GLAs | 9 AP/IBs",
    description: "Physics & Astronomy student at MIT | 1M in Scholarships | Profile includes Research Paper and Conference Presentation Guidelines",
    background: "Caucasian male student from Australia",
    interests: "Physics, Astronomy, Mathematics",
    sat: "1600",
    gpa: "4.9",
    uwGpa: "4.6",
    profileImage: "/profile.png",
    colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
    sticker: "/sticker2.png",
    hasSticker: true
  }
];

function DiscoverStudentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>(fallbackStudents);

  const { user, refreshToken } = useAuth();

  const [studentsData, setStudentsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch students data from backend
  const fetchStudentsData = async () => {
    if (!user) {
      console.log('❌ No user found, using fallback data');
      return;
    }

    setLoading(true);
    setError(null);

    try {


      const token = await refreshToken();
      const searchParams = new URLSearchParams();
      searchParams.set('page', currentPage.toString());
      searchParams.set('limit', '10');
      if (searchQuery.trim()) {
        searchParams.set('search', searchQuery);
      }

      console.log('🔄 Fetching students data for user:', user.uid);
      const response = await fetch(`https://fliq-backend-bxhr.onrender.com/api/students/discover?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Subscription required to access student profiles');
        }
        throw new Error(`Failed to fetch students: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ API Data received:', data);
      setStudentsData(data);

      if (data.success && data.data?.students) {
        setStudents(data.data.students);
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch students:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, [user, currentPage]);



  // Handle 403 subscription required error
  const handleSubscriptionRequired = () => {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
            Upgrade Required
          </h2>
          <p className="text-light-p dark:text-dark-text mb-6">
            Student profiles are only available to paid subscribers. Upgrade your account to discover successful student profiles and learn from their journeys.
          </p>
          <button className="px-6 py-3 bg-[#FF9169] text-white border border-black hover:bg-[#ff7b4d] transition-colors" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            Upgrade to Premium
          </button>
        </div>
      </div>
    );
  };

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search

    if (user) {
      // Fetch with search parameter
      fetchStudentsData();
    } else {
      // Fallback to local filtering for non-authenticated users
      if (!query.trim()) {
        setStudents(fallbackStudents);
        return;
      }

      const filtered = fallbackStudents.filter(student =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.description.toLowerCase().includes(query.toLowerCase()) ||
        student.interests.toLowerCase().includes(query.toLowerCase())
      );
      setStudents(filtered);
    }
  };
  return (
    <div>
      <DotPatternBackground>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-light-text dark:text-dark-text" style={{
              textAlign: 'center',
              fontFamily: 'Outfit',
              fontSize: '48px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              marginBottom: '16px'
            }}>
              Get in the <span className="relative inline-block">scoop
                <svg
                  className="absolute -bottom-2 left-0 animate-pulse"
                  width="166"
                  height="13"
                  viewBox="0 0 166 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: '166px',
                    height: '13px',
                    flexShrink: 0
                  }}
                >
                  <path
                    d="M2 11C55.3333 2.33333 162 -2.8 164 11"
                    stroke="#FF9169"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="#FF9169"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-light-text dark:text-dark-text text-center font-outfit text-lg font-normal leading-[160%] max-w-[600px] mx-auto">
              Want to know what a winning uni application looks like? These students nailed it,
              and now it&apos;s your turn. Dive in and learn from the best.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            {/* Search Bar */}
            <div className="relative mb-6 w-[1094px] h-20 mx-auto bg-light-secondary dark:bg-dark-secondary">
              <div className="absolute left-0 pl-[4px] top-1/2 transform -translate-y-1/2 z-10">
                <div className="w-[73px] h-[73px] shrink-0 flex items-center justify-center border border-light-text dark:border-dark-text bg-accent">
                  <svg width="26.028" height="26.028" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[26.028px] h-[26.028px] shrink-0 stroke-black">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              </div>
              <input
                type="text"
                placeholder="Search by name, university, or another keyword"
                className="w-full h-20 shrink-0 border border-light-text dark:border-dark-text bg-light-secondary dark:bg-dark-secondary pl-[90px] pr-5 outline-none font-outfit text-lg font-medium leading-normal text-light-text dark:text-dark-text"
                style={{
                  boxShadow: '4px 4px 0 0 #000'
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
              />
            </div>

            {/* Filter and Sort Buttons */}
            <div className="flex gap-6 mb-6 w-[1094px] mx-auto justify-start">
              <button className="flex py-3 px-4 justify-center items-center gap-2 border border-light-text dark:border-dark-text bg-light-secondary dark:bg-dark-secondary cursor-pointer" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                <svg width="25.997" height="24" viewBox="0 0 24 24" className="w-[25.997px] h-6 shrink-0 fill-black dark:fill-white">
                  <path d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
                <span className="text-light-text dark:text-dark-text font-outfit text-lg font-medium leading-normal">Filter</span>
              </button>
              <button className="flex py-3 px-4 justify-center items-center gap-2 border border-light-text dark:border-dark-text bg-light-secondary dark:bg-dark-secondary cursor-pointer" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                <svg width="25.997" height="24" viewBox="0 0 24 24" className="w-[25.997px] h-6 shrink-0 fill-black dark:fill-white">
                  <path d="M3 6h18M7 12h10m-7 6h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="dark:stroke-white" />
                </svg>
                <span className="text-light-text dark:text-dark-text font-outfit text-lg font-medium leading-normal">Sort</span>
              </button>
            </div>

            {/* Results Info */}
            <div className="flex justify-end items-center mb-6 w-[1094px] mx-auto">
              <div className="flex items-center gap-4">
                <span className="text-light-text dark:text-dark-text font-outfit text-base font-normal leading-[150%]">
                  {loading ? 'Loading students...' : `Showing ${students.length} students - Page ${currentPage} of ${Math.ceil(students.length / 4)}`}
                </span>
                <div className="flex items-center gap-2">
                  <button className="inline-flex py-[9px] px-3 items-center gap-[10px] border border-light-text dark:border-dark-text bg-accent hover:bg-accent/90 transition-colors" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" className="w-[6px] h-[11px] aspect-[6/11]">
                      <path d="M5.85349 10.146C5.89994 10.1925 5.93678 10.2476 5.96192 10.3083C5.98706 10.369 6 10.4341 6 10.4997C6 10.5654 5.98706 10.6305 5.96192 10.6912C5.93678 10.7519 5.89994 10.807 5.85349 10.8535C5.80704 10.8999 5.75189 10.9368 5.6912 10.9619C5.63051 10.9871 5.56547 11 5.49978 11C5.43409 11 5.36904 10.9871 5.30835 10.9619C5.24766 10.9368 5.19252 10.8999 5.14607 10.8535L0.146627 5.85373C0.100144 5.8073 0.0632687 5.75216 0.0381093 5.69146C0.01295 5.63076 0 5.5657 0 5.5C0 5.4343 0.01295 5.36924 0.0381093 5.30854C0.0632687 5.24784 0.100144 5.1927 0.146627 5.14627L5.14607 0.146521C5.23988 0.052705 5.36711 -2.61535e-09 5.49978 0C5.63244 2.61535e-09 5.75968 0.052705 5.85349 0.146521C5.9473 0.240336 6 0.367577 6 0.500253C6 0.632928 5.9473 0.760169 5.85349 0.853985L1.20713 5.5L5.85349 10.146Z" fill="#000" />
                    </svg>
                  </button>
                  <button className="inline-flex py-[9px] px-3 items-center gap-[10px] border border-light-text dark:border-dark-text bg-accent hover:bg-accent/90 transition-colors" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none" className="w-[6px] h-[11px] aspect-[6/11]">
                      <path d="M6.36314 5.85373L1.3637 10.8535C1.31725 10.8999 1.2621 10.9368 1.20141 10.9619C1.14072 10.9871 1.07568 11 1.00999 11C0.944298 11 0.879251 10.9871 0.818561 10.9619C0.757871 10.9368 0.702727 10.8999 0.656277 10.8535C0.609827 10.807 0.572981 10.7519 0.547843 10.6912C0.522704 10.6305 0.509766 10.5654 0.509766 10.4997C0.509766 10.4341 0.522704 10.369 0.547843 10.3083C0.572981 10.2476 0.609827 10.1925 0.656277 10.146L5.30263 5.5L0.656277 0.853985C0.562467 0.760169 0.509766 0.632928 0.509766 0.500253C0.509766 0.367577 0.562467 0.240336 0.656277 0.146521C0.750087 0.052705 0.877321 9.88508e-10 1.00999 0C1.14265 -9.88508e-10 1.26989 0.052705 1.3637 0.146521L6.36314 5.14627C6.40962 5.1927 6.4465 5.24784 6.47166 5.30854C6.49682 5.36924 6.50977 5.4343 6.50977 5.5C6.50977 5.5657 6.49682 5.63076 6.47166 5.69146C6.4465 5.75216 6.40962 5.8073 6.36314 5.85373Z" fill="#000" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <>
              {error.includes('403') || error.includes('subscription') || error.includes('Upgrade') ? (
                handleSubscriptionRequired()
              ) : (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <p className="text-red-600 mb-4">Failed to load students: {error}</p>
                    <p className="text-light-text dark:text-dark-text">Showing cached results</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Student Cards */}
          <div className="space-y-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="w-[1094px] min-h-[391px] shrink-0 border border-light-text dark:border-dark-text  bg-light-secondary dark:bg-dark-secondary relative mx-auto cursor-pointer text-light-text dark:text-dark-text mb-6"
                style={{ boxShadow: '4px 4px 0 0 #000' }}
                onClick={() => window.location.href = `/student-profile?id=${student.id}`}
              >
                {/* Student Header */}
                <div className="absolute top-[31px] left-[31px] z-20">
                  <div className="flex items-center gap-6">
                    <div className="w-[80px] h-[80px] rounded-full border-2 border-light-text dark:border-dark-text  overflow-hidden">
                      <Image
                        src={student.profileImage}
                        alt={student.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-outfit text-2xl font-bold">{student.name}</h3>
                      <p className="font-outfit text-lg mt-1">{student.stats.replace('GLAs', 'Q&As')}</p>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-[1044px] h-px bg-light-text/20 dark:bg-dark-text/20 relative z-10 mt-[135px] ml-[23px]" />

                {/* Main Content */}
                <div className="w-[1039px] min-h-[199px] relative z-10 mt-[29px] ml-[24px] mb-6">
                  <div className="flex">
                    {/* Left Side - Description */}
                    <div className="flex-1 pr-8">
                      <p className="text-light-text dark:text-dark-text font-outfit text-lg font-normal leading-[150%] mb-6">
                        {student.description}
                      </p>

                      {/* Colleges Section */}
                      <div>
                        <p className="text-light-text/80 dark:text-dark-text/80 font-outfit text-sm font-bold mb-2">ACCEPTED TO</p>
                        <div className="inline-flex items-center gap-2 mb-4">
                          {/* First Logo */}
                          <div className="w-[50px] h-[50px] aspect-square bg-light-secondary dark:bg-dark-secondary border border-light-text dark:border-dark-text flex items-center justify-center">
                            <Image
                              src="/mit.png"
                              alt="MIT"
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                          {/* Harvard Logo */}
                          <div className="w-[41.468px] h-[49.521px] shrink-0 flex items-center justify-center">
                            <Image
                              src="/harvard.png"
                              alt="Harvard"
                              width={41}
                              height={49}
                              className="object-contain"
                            />
                          </div>
                          {/* Third Logo */}
                          <div className="w-[50px] h-[50px] aspect-square" style={{ background: 'url(/college.png) lightgray 50% / contain no-repeat' }}></div>
                          {/* Fourth Logo */}
                          <div className="w-[142px] h-20 shrink-0 aspect-[71/40] flex items-center justify-center" style={{ opacity: 0.8 }}>
                            <Image
                              src="/bath.png"
                              alt="Bath"
                              width={142}
                              height={80}
                              className="object-contain"
                            />
                          </div>
                          <span className="text-light-text/80 dark:text-dark-text/80 font-outfit text-lg font-normal leading-[150%] ml-2">+5 more</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Background Info */}
                    <div className="w-[400px] flex-shrink-0">
                      <div className="space-y-2">
                        <p>
                          <span className="font-bold">Background:</span> {student.background}
                        </p>
                        <p>
                          <span className="font-bold">Academic Interests:</span> {student.interests}
                        </p>
                        <p><span className="font-bold">SAT:</span> {student.sat}</p>
                        <p><span className="font-bold">GPA (W):</span> {student.gpa}</p>
                        <p><span className="font-bold">GPA (UW):</span> {student.uwGpa}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Profile Button */}
                <button
                  className="absolute top-[31px] right-[31px] text-light-text w-[234px] h-[44px] flex justify-center items-center bg-accent hover:bg-accent/90 transition-colors z-10"
                  style={{ boxShadow: '2px 2px 0 0 #000' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/student-profile?id=${student.id}`;
                  }}
                >
                  <span className="font-outfit text-base font-medium">View {student.name.split(' ')[0]}&apos;s Profile</span>
                </button>

                {/* Sticker Overlay */}
                <div className="absolute -bottom-10 -right-40 w-[120px] h-[120px] z-10 overflow-visible">
                  <div className="absolute -top-10 -left-10 w-full h-full">
                    <Image
                      src="/sticker1.png"
                      alt="Achievement Sticker"
                      width={200}
                      height={200}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <span className="text-light-text dark:text-dark-text font-outfit text-base font-normal leading-[150%]">Page {currentPage} of 19</span>
            <div className="flex gap-2">
              <button
                className={`inline-flex py-[9px] px-3 items-center gap-[10px] border-[1px] border-light-text transition-colors ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-accent hover:bg-accent/90'}`}
                style={{ boxShadow: '2px 2px 0 0 #000' }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11" fill="none" className="w-[6px] h-[11px] aspect-[6/11]">
                  <path d="M5.85349 10.146C5.89994 10.1925 5.93678 10.2476 5.96192 10.3083C5.98706 10.369 6 10.4341 6 10.4997C6 10.5654 5.98706 10.6305 5.96192 10.6912C5.93678 10.7519 5.89994 10.807 5.85349 10.8535C5.80704 10.8999 5.75189 10.9368 5.6912 10.9619C5.63051 10.9871 5.56547 11 5.49978 11C5.43409 11 5.36904 10.9871 5.30835 10.9619C5.24766 10.9368 5.19252 10.8999 5.14607 10.8535L0.146627 5.85373C0.100144 5.8073 0.0632687 5.75216 0.0381093 5.69146C0.01295 5.63076 0 5.5657 0 5.5C0 5.4343 0.01295 5.36924 0.0381093 5.30854C0.0632687 5.24784 0.100144 5.1927 0.146627 5.14627L5.14607 0.146521C5.23988 0.052705 5.36711 -2.61535e-09 5.49978 0C5.63244 2.61535e-09 5.75968 0.052705 5.85349 0.146521C5.9473 0.240336 6 0.367577 6 0.500253C6 0.632928 5.9473 0.760169 5.85349 0.853985L1.20713 5.5L5.85349 10.146Z" fill={currentPage === 1 ? "#888" : "#000"} />
                </svg>
              </button>
              <button
                className="inline-flex py-[9px] px-3 items-center gap-[10px] border-[1px] border-light-text bg-accent hover:bg-accent/90 transition-colors"
                style={{ boxShadow: '2px 2px 0 0 #000' }}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.85337 5.85373L0.853933 10.8535C0.807483 10.8999 0.752339 10.9368 0.691649 10.9619C0.630959 10.9871 0.565912 11 0.500222 11C0.434532 11 0.369485 10.9871 0.308795 10.9619C0.248106 10.9368 0.192961 10.8999 0.146511 10.8535C0.100061 10.807 0.0632154 10.7519 0.0380769 10.6912C0.0129384 10.6305 0 10.5654 0 10.4997C0 10.4341 0.0129384 10.369 0.0380769 10.3083C0.0632154 10.2476 0.100061 10.1925 0.146511 10.146L4.79287 5.5L0.146511 0.853985C0.0527015 0.760169 -9.88447e-10 0.632928 0 0.500253C9.88448e-10 0.367577 0.0527015 0.240336 0.146511 0.146521C0.240321 0.052705 0.367555 9.88508e-10 0.500222 0C0.632889 -9.88508e-10 0.760123 0.052705 0.853933 0.146521L5.85337 5.14627C5.89986 5.1927 5.93673 5.24784 5.96189 5.30854C5.98705 5.36924 6 5.4343 6 5.5C6 5.5657 5.98705 5.63076 5.96189 5.69146C5.93673 5.75216 5.89986 5.8073 5.85337 5.85373Z" fill="black" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </DotPatternBackground>
    </div>
  );
}

export default withAuthProtection(DiscoverStudentsPage, {
  requireAuth: true,
  requireProfile: true
});