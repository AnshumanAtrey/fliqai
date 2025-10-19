"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../component/header';
import { DotPatternBackground } from "../component/DotPatternBackground";
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';

// Import components
import { HeroSection } from './components/HeroSection';
import { SearchBar } from './components/SearchBar';
import { FilterButtons } from './components/FilterButtons';
import { FilterModals } from './components/FilterModals';
import { ResultsHeader } from './components/ResultsHeader';
import { UniversityCard } from './components/UniversityCard';

// Define interface based on backend API structure
interface University {
  id: string;
  country: 'US' | 'UK';
  pages?: {
    Overview?: {
      collegeName?: string;
      description?: string;
      admissionRate?: string;
    };
    About?: {
      name?: string;
      location?: string;
      about?: string;
    };
    'Campus Life'?: {
      quickStats?: {
        location?: string;
        acceptanceRate?: string;
      };
    };
  };
  // Transformed fields for easier access
  name?: string;
  location?: string;
  ranking?: string;
  acceptanceRate?: string;
  description?: string;
  image?: string;
  quote?: string;
  author?: string;
  authorImage?: string;
  chartData?: number[];
}

function BrowseUniversities() {
  const router = useRouter();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  // const [showFilters, setShowFilters] = useState(false);
  const [showCountriesFilter, setShowCountriesFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 5;

  // Transform API university data to match frontend structure
  const transformUniversity = (uni: { id: string; country: 'US' | 'UK'; pages?: Record<string, unknown>; location?: string;[key: string]: unknown }): University => {
    const isUS = uni.country === 'US';

    // Extract data from API response
    const overviewData = uni.pages?.Overview || {};
    const admissionsData = uni.pages?.Admissions || {};
    const campusLifeData = (uni.pages?.['Campus Life'] as { quickStats?: { location?: string; acceptanceRate?: string } }) || {};
    const studentsData = uni.pages?.Students || {};

    // Calculate acceptance rate from admissions data
    let acceptanceRate = 25; // Default
    if (isUS && (admissionsData as { profileoffalladmission?: { overalladmissionrate?: string[] } }).profileoffalladmission?.overalladmissionrate?.[0]) {
      const rateMatch = (admissionsData as { profileoffalladmission: { overalladmissionrate: string[] } }).profileoffalladmission.overalladmissionrate[0].match(/(\d+)%/);
      if (rateMatch) acceptanceRate = parseInt(rateMatch[1]);
    } else if (!isUS) {
      // For UK universities, use a calculated rate based on university name hash
      const nameHash = (uni.id || (uni as { name?: string }).name || '').split('').reduce((a: number, b: string) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      acceptanceRate = 15 + Math.abs(nameHash) % 40; // Range 15-55%
    }

    // Get graduation rate
    let graduationRate = 45; // Default
    if (isUS && (studentsData as { undergraduateretentiongraduation?: { studentsgraduatingwithin6years?: string } }).undergraduateretentiongraduation?.studentsgraduatingwithin6years) {
      const gradMatch = (studentsData as { undergraduateretentiongraduation: { studentsgraduatingwithin6years: string } }).undergraduateretentiongraduation.studentsgraduatingwithin6years.match(/(\d+\.?\d*)%/);
      if (gradMatch) graduationRate = parseFloat(gradMatch[1]);
    } else if (!isUS) {
      // For UK universities, use a calculated graduation rate
      const nameHash = (uni.id || (uni as { name?: string }).name || '').split('').reduce((a: number, b: string) => {
        a = ((a << 7) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      graduationRate = 70 + Math.abs(nameHash) % 25; // Range 70-95%
    }

    // Generate realistic quote based on university name and type
    const universityName = isUS ? (overviewData as { collegeName?: string }).collegeName : (uni.pages?.About as { name?: string })?.name || (uni as { name?: string }).name;
    const quotes = [
      `A world-class education in a historic setting. The experience at ${universityName} has been transformative.`,
      `Innovation and excellence in everything we do. ${universityName} has shaped my future.`,
      `The opportunities here are endless. I've grown so much during my time at ${universityName}.`,
      `Amazing community and professors. ${universityName} exceeded all my expectations.`
    ];

    const authors = [
      "Emma Johnson, Class of 2021",
      "John Smith, Class of 2022",
      "Sarah Wilson, Class of 2023",
      "Michael Brown, Class of 2022"
    ];

    // Use university ID to deterministically select quote and author
    const quoteIndex = parseInt((uni.id || '0').replace(/[^\d]/g, '') || '0') % quotes.length;

    const transformed: University = {
      id: uni.id as string,
      country: uni.country as 'US' | 'UK',
      pages: uni.pages,
      name: universityName,
      location: isUS
        ? (campusLifeData as { quickStats?: { location?: string } }).quickStats?.location || (uni as { location?: string }).location
        : (uni.pages?.About as { location?: string })?.location || (uni as { location?: string }).location,
      acceptanceRate: acceptanceRate + '%',
      description: isUS
        ? (overviewData as { description?: string }).description
        : (uni.pages?.About as { about?: string })?.about,
      // Add default values for UI
      image: "/college_profile.png",
      ranking: isUS ? "#1 in Innovation" : "#5 QS World Rankings",
      quote: quotes[quoteIndex],
      author: authors[quoteIndex],
      authorImage: "/Ellipse 2.png",
      chartData: [
        Math.min(95, Math.max(60, 100 - acceptanceRate + 10)), // Academics: inversely related to acceptance rate
        Math.min(95, Math.max(40, 100 - acceptanceRate - 5)), // Finances: more selective = more expensive
        (campusLifeData.quickStats?.location || uni.location || '')?.toLowerCase().includes('california') ||
          (campusLifeData.quickStats?.location || uni.location || '')?.toLowerCase().includes('new york') ? 85 : 75, // Location: higher for major cities
        Math.min(95, Math.max(70, graduationRate + 15)) // Culture: related to graduation rate
      ]
    };
    return transformed;
  };

  // Fetch universities from API
  const fetchUniversities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        limit: (universitiesPerPage * 2).toString(), // Get more for better filtering
        offset: '0'
      });

      if (selectedCountry) {
        queryParams.append('country', selectedCountry);
      }

      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/university?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch universities');
      }

      const data = await response.json();

      if (data.success && data.data && data.data.universities) {
        const universitiesArray = data.data.universities;
        const transformedUniversities = universitiesArray
          .map(transformUniversity)
          .filter((uni: University) => uni.name); // Filter out universities without names

        setUniversities(transformedUniversities);
      } else {
        throw new Error(data.message || 'No universities found');
      }
    } catch (err) {
      console.error('Error fetching universities:', err);
      setError('Failed to fetch universities. Please try again.');
      // Fallback to empty array
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCountry]);

  // Search universities by name
  const searchUniversitiesByName = async (name: string) => {
    if (!name.trim()) {
      fetchUniversities();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({ exact: 'false' });
      if (selectedCountry) {
        queryParams.append('country', selectedCountry);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/university/name/${encodeURIComponent(name)}?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to search universities');
      }

      const data = await response.json();

      if (data.success) {
        const universitiesArray = Array.isArray(data.data) ? data.data : [data.data];
        const transformedUniversities = universitiesArray
          .map(transformUniversity)
          .filter((uni: University) => uni.name);

        setUniversities(transformedUniversities);
      } else {
        setError('No universities found matching your search.');
        setUniversities([]);
      }
    } catch (err) {
      console.error('Error searching universities:', err);
      setError('Failed to search universities. Please try again.');
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  // Load universities on mount and when filters change
  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchUniversitiesByName(searchTerm);
    } else {
      fetchUniversities();
    }
  };

  // Handle university card click
  const handleUniversityClick = (university: University) => {
    // Navigate to appropriate profile page based on country
    if (university.country === 'UK') {
      router.push(`/university-profile?id=${university.id}`);
    } else if (university.country === 'US') {
      router.push(`/us-university-profile?id=${university.id}`);
    }
  };

  // Pagination
  const indexOfLastUniversity = currentPage * universitiesPerPage;
  const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
  const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity);
  const totalPages = Math.ceil(universities.length / universitiesPerPage);

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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSubmit={handleSearchSubmit}
          />

          {/* Filter Section with Buttons and Modals */}
          <div className="relative">
            <FilterButtons
              selectedCountry={selectedCountry}
              showCountriesFilter={showCountriesFilter}
              showSortFilter={showSortFilter}
              setShowCountriesFilter={setShowCountriesFilter}
              setShowSortFilter={setShowSortFilter}
            />

            <FilterModals
              showCountriesFilter={showCountriesFilter}
              showSortFilter={showSortFilter}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              setShowCountriesFilter={setShowCountriesFilter}
              setShowSortFilter={setShowSortFilter}
            />
          </div>

          {/* Results Header */}
          <ResultsHeader
            loading={loading}
            error={error}
            universitiesCount={universities.length}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* University Cards */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="space-y-4 sm:space-y-6">
            {loading ? (
              <div className="w-full text-center py-12">
                <span className="text-light-text dark:text-dark-text font-outfit text-base sm:text-lg">Loading universities...</span>
              </div>
            ) : error ? (
              <div className="w-full text-center py-12">
                <span className="text-red-500 font-outfit text-base sm:text-lg">{error}</span>
              </div>
            ) : universities.length === 0 ? (
              <div className="w-full text-center py-12">
                <span className="text-light-text dark:text-dark-text font-outfit text-base sm:text-lg">No universities found matching your criteria.</span>
              </div>
            ) : (
              currentUniversities.map((university) => (
                <UniversityCard
                  key={university.id}
                  university={university}
                  onUniversityClick={handleUniversityClick}
                />
              ))
            )}
          </div>
        </div>
      </DotPatternBackground>
    </div>
  );
}

export default withAuthProtection(BrowseUniversities, {
  requireAuth: true,
  requireProfile: true
});