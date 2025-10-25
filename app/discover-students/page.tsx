"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../component/header';
import { DotPatternBackground } from '../component/DotPatternBackground';

import { useAuth } from '../../lib/hooks/useAuth';
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';

// Import components
import {
  HeroSection,
  SearchBar,
  FilterButtons,
  FilterModals,
  StudentCard,
  ResultsHeader
} from './components';

// Student interface
interface Student {
  id: number;
  name: string;
  university?: string;
  graduationYear?: string;
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

function DiscoverStudentsPage() {
  const router = useRouter();
  const { user, refreshToken } = useAuth();

  // State management
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [usingFrontendPagination, setUsingFrontendPagination] = useState(false);
  const studentsPerPage = 6;

  // Filter states
  const [showGPAFilter, setShowGPAFilter] = useState(false);
  const [showSATFilter, setShowSATFilter] = useState(false);
  const [showMajorFilter, setShowMajorFilter] = useState(false);
  const [showBackgroundFilter, setShowBackgroundFilter] = useState(false);
  const [showCountriesFilter, setShowCountriesFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);

  // Filter values
  const [filters, setFilters] = useState({
    gpaMin: 2.5,
    gpaMax: 3.5,
    satMin: 1200,
    satMax: 1600,
    majors: [] as string[],
    backgrounds: [] as string[],
    countries: [] as string[],
    sortBy: 'highest_gpa' as 'most_essays' | 'highest_sat' | 'highest_gpa' | 'most_universities'
  });

  // Fallback data for when API is not available
  const fallbackStudents: Student[] = [
    {
      id: 1,
      name: "Jordan Hughes",
      stats: "38 Essays | 11 Colleges | 5 Awards | 10 Activities | 10 Q&As | 8 AP/IBs",
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
      stats: "25 Essays | 8 Colleges | 3 Awards | 7 Activities | 4 Q&As | 5 AP/IBs",
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
      stats: "30 Essays | 12 Colleges | 6 Awards | 9 Activities | 5 Q&As | 7 AP/IBs",
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
      stats: "40 Essays | 15 Colleges | 8 Awards | 12 Activities | 6 Q&As | 9 AP/IBs",
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

  // Fetch students data from backend
  const fetchStudentsData = useCallback(async () => {
    if (!user) {
      console.log('❌ No user found, using fallback data');
      setStudents(fallbackStudents);
      setTotalPages(Math.ceil(fallbackStudents.length / studentsPerPage));
      setUsingFrontendPagination(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await refreshToken();
      const searchParams = new URLSearchParams();
      searchParams.set('page', currentPage.toString());
      searchParams.set('limit', '10'); // Request more to see if there are additional students
      if (searchQuery.trim()) {
        searchParams.set('search', searchQuery);
      }

      console.log('🔄 Fetching students data for user:', user.uid, 'Page:', currentPage);
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
      console.log('📊 Students count:', data.data?.students?.length, 'Backend says total:', data.data?.pagination?.totalStudents);

      if (data.success && data.data?.students) {
        setStudents(data.data.students);
        
        // Use backend pagination info if available, but implement frontend pagination
        // if backend returns more students than expected per page
        if (data.data.pagination && data.data.students.length <= 6) {
          // Backend pagination is working correctly
          setTotalPages(data.data.pagination.totalPages || 1);
          setUsingFrontendPagination(false);
        } else {
          // Backend returned more students or pagination is not working - use frontend pagination
          setTotalPages(Math.ceil(data.data.students.length / studentsPerPage));
          setUsingFrontendPagination(true);
          console.log(`🔧 Using frontend pagination: ${data.data.students.length} students, ${Math.ceil(data.data.students.length / studentsPerPage)} pages`);
        }
      }
    } catch (err: unknown) {
      console.error('❌ Failed to fetch students:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, [user, currentPage, searchQuery, refreshToken, fallbackStudents, studentsPerPage]);

  useEffect(() => {
    // Only fetch data if we're not using frontend pagination or if it's the first page
    if (!usingFrontendPagination || currentPage === 1) {
      fetchStudentsData();
    }
  }, [user, currentPage, fetchStudentsData, usingFrontendPagination]);

  // Filter handlers
  const handleGPAChange = (min: number, max: number) => {
    setFilters({ ...filters, gpaMin: min, gpaMax: max });
  };

  const handleMajorToggle = (major: string) => {
    const newMajors = filters.majors.includes(major)
      ? filters.majors.filter(m => m !== major)
      : [...filters.majors, major];
    setFilters({ ...filters, majors: newMajors });
  };

  const handleBackgroundToggle = (background: string) => {
    setFilters({ ...filters, backgrounds: [background] }); // Single selection
  };

  const handleCountryToggle = (country: string) => {
    const newCountries = filters.countries.includes(country)
      ? filters.countries.filter(c => c !== country)
      : [...filters.countries, country];
    setFilters({ ...filters, countries: newCountries });
  };

  const handleSortChange = (sort: string) => {
    setFilters({ ...filters, sortBy: sort as 'most_essays' | 'highest_sat' | 'highest_gpa' | 'most_universities' });
  };

  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1);
    setUsingFrontendPagination(false); // Reset pagination mode
    fetchStudentsData();
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      gpaMin: 2.5,
      gpaMax: 3.5,
      satMin: 1200,
      satMax: 1600,
      majors: [],
      backgrounds: [],
      countries: [],
      sortBy: 'highest_gpa'
    });
    setSearchQuery('');
    setCurrentPage(1);
    setUsingFrontendPagination(false); // Reset pagination mode
    fetchStudentsData();
  };

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    // fetchStudentsData will be triggered by useEffect when searchQuery changes

    if (!user) {
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

  // Handle student card click
  const handleStudentClick = (student: Student) => {
    router.push(`/student-profile?id=${student.id}`);
  };

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
          <button
            onClick={() => router.push('/subscription')}
            className="px-6 py-3 bg-[#FF9169] text-white border border-black hover:bg-[#ff7b4d] transition-colors"
            style={{ boxShadow: '4px 4px 0 0 #000' }}
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    );
  };

  // Calculate pagination - use backend pagination if available, otherwise frontend pagination
  const finalTotalPages = totalPages > 1 ? totalPages : Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = usingFrontendPagination ? students.slice(indexOfFirstStudent, indexOfLastStudent) : students;

  // Check if subscription error
  if (error && error.includes('Subscription required')) {
    return (
      <div className="min-h-screen">
        <DotPatternBackground>
          <Header />
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            {handleSubscriptionRequired()}
          </div>
        </DotPatternBackground>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DotPatternBackground>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Hero Section */}
          <HeroSection />

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />

          {/* Filter Section with Buttons and Modals */}
          <div className="relative">
            <FilterButtons
              showGPAFilter={showGPAFilter}
              showSATFilter={showSATFilter}
              showMajorFilter={showMajorFilter}
              showBackgroundFilter={showBackgroundFilter}
              showCountriesFilter={showCountriesFilter}
              showSortFilter={showSortFilter}
              setShowGPAFilter={setShowGPAFilter}
              setShowSATFilter={setShowSATFilter}
              setShowMajorFilter={setShowMajorFilter}
              setShowBackgroundFilter={setShowBackgroundFilter}
              setShowCountriesFilter={setShowCountriesFilter}
              setShowSortFilter={setShowSortFilter}
              gpaMin={filters.gpaMin}
              gpaMax={filters.gpaMax}
              selectedMajors={filters.majors}
              selectedBackgrounds={filters.backgrounds}
              selectedCountries={filters.countries}
            />

            <FilterModals
              showGPAFilter={showGPAFilter}
              setShowGPAFilter={setShowGPAFilter}
              gpaMin={filters.gpaMin}
              gpaMax={filters.gpaMax}
              onGPAChange={handleGPAChange}
              showSATFilter={showSATFilter}
              setShowSATFilter={setShowSATFilter}
              showMajorFilter={showMajorFilter}
              setShowMajorFilter={setShowMajorFilter}
              selectedMajors={filters.majors}
              onMajorToggle={handleMajorToggle}
              showBackgroundFilter={showBackgroundFilter}
              setShowBackgroundFilter={setShowBackgroundFilter}
              selectedBackgrounds={filters.backgrounds}
              onBackgroundToggle={handleBackgroundToggle}
              showCountriesFilter={showCountriesFilter}
              setShowCountriesFilter={setShowCountriesFilter}
              selectedCountries={filters.countries}
              onCountryToggle={handleCountryToggle}
              showSortFilter={showSortFilter}
              setShowSortFilter={setShowSortFilter}
              sortBy={filters.sortBy}
              onSortChange={handleSortChange}
              onApply={applyFilters}
              onReset={clearAllFilters}
            />
          </div>

          {/* Results Header */}
          <ResultsHeader
            loading={loading}
            error={error}
            studentsCount={currentStudents.length}
            currentPage={currentPage}
            totalPages={finalTotalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* Student Cards */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="space-y-4 sm:space-y-6">
            {loading ? (
              <div className="w-full text-center py-12">
                <span className="text-light-text dark:text-dark-text font-outfit text-base sm:text-lg">Loading students...</span>
              </div>
            ) : error && !error.includes('Subscription required') ? (
              <div className="w-full text-center py-12">
                <span className="text-red-500 font-outfit text-base sm:text-lg">{error}</span>
              </div>
            ) : students.length === 0 ? (
              <div className="w-full text-center py-12">
                <span className="text-light-text dark:text-dark-text font-outfit text-base sm:text-lg">No students found matching your criteria.</span>
              </div>
            ) : (
              currentStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onStudentClick={handleStudentClick}
                />
              ))
            )}
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