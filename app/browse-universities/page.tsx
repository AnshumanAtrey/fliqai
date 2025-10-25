"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';
import { useAuth } from '@/lib/hooks/useAuth';
import Fuse from 'fuse.js';

// Import components
import { HeroSection } from './components/HeroSection';
import { SearchBar } from './components/SearchBar';
import { FilterButtons } from './components/FilterButtons';
import { FilterModals } from './components/FilterModals';
import { ResultsHeader } from './components/ResultsHeader';
import { UniversityCard } from './components/UniversityCard';
import DotPatternBackground from '@/app/component/DotPatternBackground';
import Header from '@/app/component/header';

// Import college search data
import collegeSearchData from '@/college_search.json';
import { University } from 'lucide-react';

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
  overall_match?: number;
  category_scores?: {
    academics: number;
    finances: number;
    location: number;
    culture: number;
  };
}

function BrowseUniversities() {
  const router = useRouter();
  const { user } = useAuth();
  const [universities, setUniversities] = useState<University[]>([]);
  const [allUniversities, setAllUniversities] = useState<University[]>([]); // Store ALL universities for search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useRecommendations, setUseRecommendations] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  // const [showFilters, setShowFilters] = useState(false);
  const [showCountriesFilter, setShowCountriesFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 5;

  // Initialize Fuse.js for fuzzy search on college names
  const collegeFuse = useMemo(() => new Fuse(collegeSearchData.colleges, {
    keys: ['name'],
    threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything
    minMatchCharLength: 2,
    includeScore: true,
    ignoreLocation: true,
  }), []);

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

    // Calculate ranking from global_grade
    let rankingText = isUS ? "#200+ in QS World University Rankings" : "#5 QS World Rankings";
    const recommendationScores = (uni as unknown as { recommendation_scores?: { global_grade?: number } }).recommendation_scores;
    if (recommendationScores?.global_grade) {
      const Rcurrent = 500;
      const Rmax = recommendationScores.global_grade;
      const percentile = Math.round((Rcurrent / Rmax) * 100);
      rankingText = `#${percentile} QS World Rankings`;
    }

    // Format location properly
    let locationText = '';
    if (isUS) {
      const rawLocation = (campusLifeData as { quickStats?: { location?: string } }).quickStats?.location || (uni as { location?: string }).location || '';
      // If location doesn't already include USA, add it
      locationText = rawLocation.includes('USA') ? rawLocation : rawLocation ? `${rawLocation}, USA` : 'USA';
    } else {
      const rawLocation = (uni.pages?.About as { location?: string })?.location || (uni as { location?: string }).location || '';
      // If location doesn't already include United Kingdom, add it
      locationText = rawLocation.includes('United Kingdom') ? rawLocation : rawLocation ? `${rawLocation}, United Kingdom` : 'United Kingdom';
    }

    const transformed: University = {
      id: uni.id as string,
      country: uni.country as 'US' | 'UK',
      pages: uni.pages,
      name: universityName,
      location: locationText,
      acceptanceRate: acceptanceRate + '%',
      description: (() => {
        // Helper function to truncate long text for description (limit to ~200 characters for description)
        const truncateText = (text: string, maxLength: number = 200) => {
          if (text.length <= maxLength) return text;
          const truncated = text.substring(0, maxLength);
          const lastSpace = truncated.lastIndexOf(' ');
          return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
        };

        // Try to use About.about field first (for both US and UK)
        const aboutData = uni.pages?.About as { about?: string; name?: string };
        if (aboutData?.about) {
          console.log('✅ Using About.about for description:', aboutData.about.substring(0, 50) + '...');
          return truncateText(aboutData.about);
        }

        // For US universities, try overview description
        if (isUS) {
          const overview = overviewData as { description?: string; collegeName?: string };
          if (overview?.description) {
            console.log('✅ Using Overview.description for description:', overview.description.substring(0, 50) + '...');
            return truncateText(overview.description);
          }
        }

        // Fallback to generated descriptions
        let desc = '';
        if (isUS) {
          const overview = overviewData as { description?: string; collegeName?: string };
          desc = `${overview.collegeName || 'This university'} is a leading institution in the United States, known for its academic excellence and diverse student body.`;
        } else {
          desc = `${aboutData?.name || 'This university'} is a prestigious institution in the United Kingdom, offering world-class education and research opportunities.`;
        }
        console.log('⚠️ Using fallback description');
        return desc;
      })(),
      // Add default values for UI
      image: "/college_profile.png",
      ranking: rankingText,
      quote: (() => {
        // Helper function to truncate long text for quote (limit to ~150 characters)
        const truncateText = (text: string, maxLength: number = 150) => {
          if (text.length <= maxLength) return text;
          const truncated = text.substring(0, maxLength);
          const lastSpace = truncated.lastIndexOf(' ');
          return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
        };

        // Use About.about field for quote, fallback to generated quotes
        const aboutData = uni.pages?.About as { about?: string };
        
        // Debug logging
        console.log('🔍 Browse Universities Quote Debug:', {
          universityId: uni.id,
          universityName,
          isUS,
          aboutData,
          hasAbout: !!aboutData?.about,
          aboutText: aboutData?.about?.substring(0, 100) + '...'
        });
        
        if (aboutData?.about) {
          console.log('✅ Using About.about for quote:', aboutData.about.substring(0, 50) + '...');
          return truncateText(aboutData.about);
        }

        // For US universities, also try description field
        if (isUS) {
          const overview = overviewData as { description?: string };
          if (overview?.description) {
            console.log('✅ Using Overview.description for quote:', overview.description.substring(0, 50) + '...');
            return truncateText(overview.description);
          }
        }

        // Fallback to generated quotes
        console.log('⚠️ Using fallback generated quote');
        return quotes[quoteIndex];
      })(),
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

  // Fetch personalized recommendations
  const fetchRecommendations = useCallback(async () => {
    if (!user) {
      console.log('❌ No user found, skipping recommendations');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get user token
      let token = localStorage.getItem('token');
      if (!token && user && 'getIdToken' in user && typeof user.getIdToken === 'function') {
        token = await user.getIdToken();
        if (token) {
          localStorage.setItem('token', token);
        }
      }

      if (!token) {
        throw new Error('Authentication required');
      }

      console.log('🎯 Fetching personalized recommendations...');
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
      const response = await fetch(`${backendUrl}/api/recommendations/final`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 400) {
          const data = await response.json();
          if (data.profileCompleted === false) {
            setError('Please complete your profile to get personalized recommendations');
            setUseRecommendations(false);
            fetchUniversities(); // Fallback to generic list
            return;
          }
        }
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      console.log('✅ Recommendations received:', data);
      console.log('📊 First recommendation:', data.data?.recommendations?.[0]);

      if (data.success && data.data && data.data.recommendations) {
        const recommendations = data.data.recommendations.map((rec: {
          id: string;
          college_name: string;
          country: string;
          overall_match: number;
          category_scores: { academics: number; finances: number; location: number; culture: number };
          chartData: number[];
          name?: string;
          location?: string;
          ranking?: string;
          image?: string;
          description?: string;
          quote?: string;
          author?: string;
          authorImage?: string;
          recommendation_scores?: { global_grade?: number };
        }) => {
          const isUS = rec.country === 'US';

          // Calculate ranking from global_grade
          let rankingText = isUS ? "#200+ in QS World University Rankings" : "#5 QS World Rankings";
          if (rec.recommendation_scores?.global_grade) {
            const Rcurrent = 500;
            const Rmax = rec.recommendation_scores.global_grade;
            const percentile = Math.round((Rcurrent / Rmax) * 100);
            rankingText = `#${percentile} QS World Rankings`;
          }

          // Format location properly
          let locationText = rec.location || '';
          if (!locationText) {
            locationText = rec.country;
          } else if (isUS && !locationText.includes('USA')) {
            locationText = `${locationText}, USA`;
          } else if (!isUS && !locationText.includes('United Kingdom')) {
            locationText = `${locationText}, United Kingdom`;
          }

          return {
            id: rec.id,
            country: rec.country as 'US' | 'UK',
            name: rec.name || rec.college_name,
            location: locationText,
            ranking: rankingText,
            image: rec.image || '/college_profile.png',
            description: rec.description || 'A world-class institution.',
            quote: rec.quote || 'An amazing educational experience.',
            author: rec.author || 'Student, Class of 2024',
            authorImage: rec.authorImage || '/Ellipse 2.png',
            overall_match: rec.overall_match,
            category_scores: rec.category_scores,
            chartData: rec.chartData || [
              rec.category_scores.academics,
              rec.category_scores.finances,
              rec.category_scores.location,
              rec.category_scores.culture
            ]
          };
        });

        setUniversities(recommendations);
        setAllUniversities(recommendations); // Store for search
        console.log('✅ Set', recommendations.length, 'recommendations');
        console.log('📊 First mapped university:', recommendations[0]);
      } else {
        throw new Error('No recommendations found');
      }
    } catch (err) {
      console.error('❌ Error fetching recommendations:', err);
      setError('Failed to fetch recommendations. Showing general universities.');
      setUseRecommendations(false);
      // Fallback will be handled by useEffect
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch universities from API (fallback)
  const fetchUniversities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch ALL universities (no limit) for client-side search
      const queryParams = new URLSearchParams({
        limit: '1000', // Get all universities
        offset: '0'
      });

      if (selectedCountry) {
        queryParams.append('country', selectedCountry);
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

        // Store ALL universities for search
        setAllUniversities(transformedUniversities);

        // Display all universities initially
        setUniversities(transformedUniversities);
      } else {
        throw new Error(data.message || 'No universities found');
      }
    } catch (err) {
      console.error('Error fetching universities:', err);
      setError('Failed to fetch universities. Please try again.');
      // Fallback to empty array
      setUniversities([]);
      setAllUniversities([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCountry]); // Removed allUniversities dependency to prevent infinite loop

  // Search universities using Fuse.js on college_search.json, then fetch by ID
  const searchUniversitiesByName = useCallback(async (name: string) => {
    console.log('🔍 Search called with:', name);

    if (!name.trim()) {
      // If no search term, show current universities
      if (allUniversities.length > 0) {
        setUniversities(allUniversities);
      }
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fuzzy searching college names for:', name);

      // Step 1: Use Fuse.js to search college names in JSON file
      const searchResults = collegeFuse.search(name);

      console.log(`📊 Found ${searchResults.length} name matches`);

      if (searchResults.length === 0) {
        setError(`No universities found matching "${name}". Try different spelling or keywords.`);
        setUniversities([]);
        setLoading(false);
        return;
      }

      // Step 2: Get IDs of matched colleges (top 10)
      const matchedIds = searchResults.slice(0, 10).map(result => result.item.id);
      console.log('🎯 Fetching universities with IDs:', matchedIds);

      // Step 3: Fetch universities by IDs from backend (batch request)
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
      const response = await fetch(`${backendUrl}/api/search-universities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: matchedIds })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch universities');
      }

      const data = await response.json();

      if (!data.success || !data.data || !data.data.universities) {
        throw new Error('Invalid response format');
      }

      // Transform universities
      const validUniversities = data.data.universities
        .map(transformUniversity)
        .filter((uni: University) => uni.name);

      console.log(`✅ Successfully loaded ${validUniversities.length} universities`);

      if (validUniversities.length === 0) {
        setError(`Found matches but couldn't load university data. Please try again.`);
        setUniversities([]);
      } else {
        setUniversities(validUniversities);
        setError(null);

        // Log top matches
        console.log('✅ Top matches:', validUniversities.slice(0, 3).map((u: University) => u.name));
      }
    } catch (err) {
      console.error('❌ Error searching universities:', err);
      setError('Failed to search universities. Please try again.');
      setUniversities([]);
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  }, [collegeFuse, transformUniversity, fetchUniversities]);

  // Load universities on mount and when filters change
  useEffect(() => {
    console.log('🔄 useEffect triggered:', { useRecommendations, hasUser: !!user });
    if (useRecommendations && user) {
      console.log('📊 Calling fetchRecommendations...');
      fetchRecommendations();
    } else {
      console.log('📚 Calling fetchUniversities (fallback)...');
      fetchUniversities();
    }
  }, [useRecommendations, user, fetchRecommendations, fetchUniversities]);

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