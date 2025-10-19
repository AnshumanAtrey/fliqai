"use client";
import { useState, useEffect } from 'react';
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
  const { user } = useAuth();

  // State management
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

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

  // Fallback data for when API is not available - keeping one dummy profile for testing
  const fallbackStudents: Student[] = [
    {
      id: 3,
      name: "Mei Wong",
      stats: "30 Essays | 12 Colleges | 6 Awards | 9 Activities | 5 Q&As | 7 AP/IBs",
      description: "Business Administration student at Harvard University | 700K in Scholarships | Profile includes Cover Letter and Internship Guide",
      background: "African American male student from USA",
      interests: "Computer Science, Artificial Intelligence, Robotics",
      sat: "1580",
      gpa: "4.8",
      uwGpa: "4.5",
      profileImage: "/profile.png",
      colleges: ["/mit.png", "/harvard.png", "/college.png", "/bath.png"],
      hasSticker: false
    }
  ];

  // Fetch students data from backend
  const fetchStudentsData = async () => {
    // Always show fallback data for testing purposes
    console.log('🔄 Using fallback data for testing');
    setStudents(fallbackStudents);
    setLoading(false);
    setError(null);
    return;

    // Commented out API call for testing - uncomment when ready for production
    /*
    if (!user) {
      console.log('❌ No user found, using fallback data');
      setStudents(fallbackStudents);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = await refreshToken();
      const searchParams = new URLSearchParams();
      searchParams.set('page', currentPage.toString());
      searchParams.set('limit', studentsPerPage.toString());
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

      if (data.success && data.data?.students) {
        setStudents(data.data.students);
      }
    } catch (err: any) {
      console.error('❌ Failed to fetch students:', err);
      setError(err.message);
      // Fallback to mock data on error
      setStudents(fallbackStudents);
    } finally {
      setLoading(false);
    }
    */
  };

  useEffect(() => {
    fetchStudentsData();
  }, [user, currentPage]);

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
    fetchStudentsData();
  };

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);

    if (user) {
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

  // Handle student card click
  const handleStudentClick = (student: Student) => {
    router.push(`/student-profile/${student.id}`);
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

  // Calculate pagination
  const totalPages = Math.ceil(students.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

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
            studentsCount={students.length}
            currentPage={currentPage}
            totalPages={totalPages}
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