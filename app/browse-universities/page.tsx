"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '../component/header';
import { DotPatternBackground } from "../component/DotPatternBackground";
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';

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
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 5;

  // Transform API university data to match frontend structure
  const transformUniversity = (uni: any): University => {
    const isUS = uni.country === 'US';
    
    // Extract data from API response
    const overviewData = uni.pages?.Overview || {};
    const admissionsData = uni.pages?.Admissions || {};
    const campusLifeData = uni.pages?.['Campus Life'] || {};
    const studentsData = uni.pages?.Students || {};
    
    // Calculate acceptance rate from admissions data
    let acceptanceRate = 25; // Default
    if (isUS && admissionsData.profileoffalladmission?.overalladmissionrate?.[0]) {
      const rateMatch = admissionsData.profileoffalladmission.overalladmissionrate[0].match(/(\d+)%/);
      if (rateMatch) acceptanceRate = parseInt(rateMatch[1]);
    } else if (!isUS) {
      // For UK universities, use a calculated rate based on university name hash
      const nameHash = (uni.id || uni.name || '').split('').reduce((a: number, b: string) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      acceptanceRate = 15 + Math.abs(nameHash) % 40; // Range 15-55%
    }
    
    // Get graduation rate
    let graduationRate = 45; // Default
    if (isUS && studentsData.undergraduateretentiongraduation?.studentsgraduatingwithin6years) {
      const gradMatch = studentsData.undergraduateretentiongraduation.studentsgraduatingwithin6years.match(/(\d+\.?\d*)%/);
      if (gradMatch) graduationRate = parseFloat(gradMatch[1]);
    } else if (!isUS) {
      // For UK universities, use a calculated graduation rate
      const nameHash = (uni.id || uni.name || '').split('').reduce((a: number, b: string) => {
        a = ((a << 7) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      graduationRate = 70 + Math.abs(nameHash) % 25; // Range 70-95%
    }
    
    // Generate realistic quote based on university name and type
    const universityName = isUS ? overviewData.collegeName : uni.pages?.About?.name || uni.name;
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
      ...uni,
      name: universityName,
      location: isUS 
        ? campusLifeData.quickStats?.location || uni.location
        : uni.pages?.About?.location || uni.location,
      acceptanceRate: acceptanceRate + '%',
      description: isUS 
        ? overviewData.description 
        : uni.pages?.About?.about,
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
    <div className={`min-h-screen `}>
      <DotPatternBackground>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 h-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className={`text-light-text dark:text-dark-text font-outfit text-5xl font-bold mb-2`}>
            Find your type of university
          </h1>
          {/* SVG Underline */}
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="226" height="13" viewBox="0 0 226 13" fill="none">
              <path d="M225.891 4.72036C225.823 4.48139 225.739 4.2823 225.643 4.13456C225.612 4.08361 225.579 4.04005 225.545 4.00437C225.5 3.95897 225.455 3.91987 225.409 3.88721C225.297 3.8091 225.213 3.77002 225.133 3.73096C224.529 3.52267 224.005 3.47061 223.458 3.37948L221.839 3.21024L218.611 2.98895L212.169 2.75459L199.289 2.5333L173.524 2.40311H147.763H105.783C91.789 2.40311 77.7954 2.40311 63.8065 2.52027H58.7676C58.993 2.22328 59.2352 2.03825 59.4835 1.97353C64.5223 0.268133 60.5455 -0.239583 45.4945 0.0988921C42.2195 0.177002 38.748 0.0988921 35.4029 0.0988921C27.6505 0.0338008 14.6113 0.0988921 6.78403 0.0988921C5.60036 0.0988921 4.40264 0.176981 3.19089 0.281127C2.58267 0.281127 1.97446 0.385291 1.31946 0.502455H1.07618L0.795461 0.606584C0.72925 0.629962 0.663625 0.664766 0.598962 0.710752H0.556856L0.477321 0.788859C0.424204 0.863046 0.372654 0.945633 0.322928 1.03621C0.25876 1.16329 0.201959 1.31696 0.154499 1.49186C0.0563016 1.84676 0.00212548 2.2807 0.00010511 2.72857C-0.00293245 3.25316 0.0599499 3.76427 0.177893 4.17362C0.224792 4.31712 0.276482 4.44788 0.33228 4.56415L0.421174 4.72036L0.481997 4.79847L0.608321 4.91563C0.720943 4.98663 0.83499 5.03883 0.949855 5.07188C1.29139 5.17603 1.5955 5.21506 1.88557 5.25411C4.35118 5.55353 6.80275 5.61861 9.23561 5.6837L14.9575 5.82692L13.4416 5.91806L12.2205 6.04825H10.7561V6.51689H10.6392L10.4988 6.64708C10.4348 6.71742 10.3748 6.81395 10.321 6.93348C10.2125 7.16396 10.1298 7.47547 10.0824 7.83175C10.0448 8.13226 10.0323 8.45277 10.0461 8.76871C10.0599 9.08464 10.0995 9.3876 10.162 9.65429L10.4286 10.4874H10.9947V10.7088C10.9947 10.852 10.9947 10.7088 10.9947 10.7869H11.0181H11.1632L11.5047 10.7088L12.2018 10.6046H12.3515C47.511 11.5289 82.6658 10.865 117.858 10.4484H126.003C125.199 10.7088 124.74 10.9952 124.679 11.3206C124.399 12.7917 138.345 12.7917 146.547 12.8568L166.234 13H176.059C177.7 13 179.344 13 180.991 13C181.814 13 182.638 13 183.47 12.8828C183.887 12.8828 184.298 12.8047 184.738 12.7136L185.094 12.6225L185.22 12.5574H185.323C185.407 12.2319 185.37 13.1041 185.875 11.1904C185.871 10.5351 185.838 9.88368 185.777 9.25073L199.845 9.18562L212.707 9.04243L219.144 8.87319L222.373 8.69096L223.996 8.52171C224.267 8.52171 224.539 8.44361 224.824 8.3655C224.996 8.3364 225.166 8.27108 225.334 8.17019H225.404L225.507 8.05303C225.619 7.92379 225.717 7.71776 225.793 7.45421C226.12 7.44119 225.984 4.08247 225.891 4.72036Z" fill="#FF9169"/>
            </svg>
          </div>
          <p className={`text-light-text dark:text-dark-text text-center font-outfit text-lg font-normal leading-[160%] mb-8 max-w-2xl mx-auto`}>
            Big names, serene location, killer societies - whatever you’re looking for, we’ve got a uni for that. Browse by course, location, or pure vibes, your call.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit}>
            <div className="relative w-[1094px] h-20 mx-auto">
              <button type="submit" className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                <div className="w-[60px] h-[60px] shrink-0 flex items-center justify-center border border-black bg-[#FF9169]">
                  <svg width="26.028" height="26.028" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" className="w-[26.028px] h-[26.028px] shrink-0">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              </button>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search universities by name..."
                className={`w-full h-20 shrink-0 border border-black bg-light-secondary dark:bg-dark-secondary pl-[85px] pr-5 outline-none font-outfit text-lg font-medium leading-normal text-light-text dark:text-dark-text`}
                style={{
                  boxShadow: '4px 4px 0 0 #000'
                }}
              />
            </div>
          </form>
        </div>

        {/* Filter and Sort Buttons */}
        <div className="flex gap-6 mb-6 w-[1094px] mx-auto justify-start mt-9">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex py-3 px-4 justify-center items-center gap-2 border border-black bg-light-secondary dark:bg-dark-secondary cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
              style={{ boxShadow: '4px 4px 0 0 #000' }}
            >
              <svg width="25.997" height="24" viewBox="0 0 24 24" className="w-[25.997px] h-6 shrink-0 fill-black dark:fill-white">
                <path d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
              </svg>
              <span className="text-light-text dark:text-dark-text font-outfit text-lg font-medium leading-normal">Filter</span>
            </button>
          </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="w-[1094px] mx-auto mb-6 p-4 border border-black bg-light-secondary dark:bg-dark-secondary" style={{ boxShadow: '4px 4px 0 0 #000' }}>
            <div className="flex gap-4 items-center">
              <span className="text-light-text dark:text-dark-text font-outfit text-base font-medium">Country:</span>
              <button
                onClick={() => setSelectedCountry('')}
                className={`px-3 py-1 border border-black ${selectedCountry === '' ? 'bg-[#FF9169]' : 'bg-white'} text-black font-outfit text-sm`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedCountry('US')}
                className={`px-3 py-1 border border-black ${selectedCountry === 'US' ? 'bg-[#FF9169]' : 'bg-white'} text-black font-outfit text-sm`}
              >
                United States
              </button>
              <button
                onClick={() => setSelectedCountry('UK')}
                className={`px-3 py-1 border border-black ${selectedCountry === 'UK' ? 'bg-[#FF9169]' : 'bg-white'} text-black font-outfit text-sm`}
              >
                United Kingdom
              </button>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="flex justify-between items-center mb-4 w-[1094px] mx-auto">
            <div className="flex items-center">
              {loading && (
                <span className="text-light-text dark:text-dark-text font-outfit text-base">Loading universities...</span>
              )}
              {error && (
                <span className="text-red-500 font-outfit text-base">{error}</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-light-text dark:text-dark-text" style={{
                fontFamily: 'Outfit',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '150%'
              }}>
                {!loading && !error && `Showing ${universities.length} Universities - Page ${currentPage} of ${totalPages}`}
              </span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex p-2 items-center justify-center border border-black ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#FF9169] hover:bg-[#ff7b4d]'} transition-colors`} 
                  style={{ boxShadow: '2px 2px 0 0 #000', width: '36px', height: '36px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 6 11" fill="none" className="w-[10px] h-[16px]">
                    <path d="M5.85349 10.146C5.89994 10.1925 5.93678 10.2476 5.96192 10.3083C5.98706 10.369 6 10.4341 6 10.4997C6 10.5654 5.98706 10.6305 5.96192 10.6912C5.93678 10.7519 5.89994 10.807 5.85349 10.8535C5.80704 10.8999 5.75189 10.9368 5.6912 10.9619C5.63051 10.9871 5.56547 11 5.49978 11C5.43409 11 5.36904 10.9871 5.30835 10.9619C5.24766 10.9368 5.19252 10.8999 5.14607 10.8535L0.146627 5.85373C0.100144 5.8073 0.0632687 5.75216 0.0381093 5.69146C0.01295 5.63076 0 5.5657 0 5.5C0 5.4343 0.01295 5.36924 0.0381093 5.30854C0.0632687 5.24784 0.100144 5.1927 0.146627 5.14627L5.14607 0.146521C5.23988 0.052705 5.36711 -2.61535e-09 5.49978 0C5.63244 2.61535e-09 5.75968 0.052705 5.85349 0.146521C5.9473 0.240336 6 0.367577 6 0.500253C6 0.632928 5.9473 0.760169 5.85349 0.853985L1.20713 5.5L5.85349 10.146Z" fill="#000"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`inline-flex p-2 items-center justify-center border border-black ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#FF9169] hover:bg-[#ff7b4d]'} transition-colors`} 
                  style={{ boxShadow: '2px 2px 0 0 #000', width: '36px', height: '36px' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 7 11" fill="none" className="w-[10px] h-[16px]">
                    <path d="M6.36314 5.85373L1.3637 10.8535C1.31725 10.8999 1.2621 10.9368 1.20141 10.9619C1.14072 10.9871 1.07568 11 1.00999 11C0.944298 11 0.879251 10.9871 0.818561 10.9619C0.757871 10.9368 0.702727 10.8999 0.656277 10.8535C0.609827 10.807 0.572981 10.7519 0.547843 10.6912C0.522704 10.6305 0.509766 10.5654 0.509766 10.4997C0.509766 10.4341 0.522704 10.369 0.547843 10.3083C0.572981 10.2476 0.609827 10.1925 0.656277 10.146L5.30263 5.5L0.656277 0.853985C0.562467 0.760169 0.509766 0.632928 0.509766 0.500253C0.509766 0.367577 0.562467 0.240336 0.656277 0.146521C0.750087 0.052705 0.877321 9.88508e-10 1.00999 0C1.14265 -9.88508e-10 1.26989 0.052705 1.3637 0.146521L6.36314 5.14627C6.40962 5.1927 6.4465 5.24784 6.47166 5.30854C6.49682 5.36924 6.50977 5.4343 6.50977 5.5C6.50977 5.5657 6.49682 5.63076 6.47166 5.69146C6.4465 5.75216 6.40962 5.8073 6.36314 5.85373Z" fill="#000"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* University cards  */}
        <div className="space-y-6 pb-12">
          {loading ? (
            <div className="w-[1094px] mx-auto text-center py-12">
              <span className="text-light-text dark:text-dark-text font-outfit text-lg">Loading universities...</span>
            </div>
          ) : error ? (
            <div className="w-[1094px] mx-auto text-center py-12">
              <span className="text-red-500 font-outfit text-lg">{error}</span>
            </div>
          ) : universities.length === 0 ? (
            <div className="w-[1094px] mx-auto text-center py-12">
              <span className="text-light-text dark:text-dark-text font-outfit text-lg">No universities found matching your criteria.</span>
            </div>
          ) : (
            currentUniversities.map((university) => (
            <div key={university.id} className="w-[1094px] h-[395px] flex-shrink-0 border border-black  bg-light-bg dark:bg-dark-secondary relative mx-auto" style={{ boxShadow: '4px 4px 0 0 #000' }}>
              <div className="flex h-full p-6 gap-6">
                {/* Left - University Image */}
                <div className="flex-shrink-0 relative">
                  <div className="w-[345px] h-[347px] border border-black bg-light-secondary dark:bg-dark-secondary  flex flex-col justify-between">
                    <Image
                      src={university.image || "/college_profile.png"}
                      alt={university.name || "University"}
                      width={345}
                      height={347}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Match Percentage Badge - Inside Image */}
                  <div className="absolute bottom-4 left-4 inline-flex py-2 px-4 justify-center items-center gap-2.5 border border-black bg-white " style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    <span className="text-light-text font-outfit text-base font-normal leading-normal">72% Overall Match</span>
                  </div>
                </div>

                {/* Middle - University Info and Chart */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* University Name */}
                    <h3 className="text-light-text dark:text-dark-text font-outfit text-[32px] font-bold leading-normal mb-2">{university.name}</h3>
                    
                    {/* Location and Ranking */}
                    <p className="text-light-text dark:text-dark-text font-outfit text-base font-normal leading-normal mb-4">{university.location} • {university.ranking}</p>
                    <p className="text-black dark:text-dark-text font-outfit text-lg font-normal leading-[150%] mb-8">{university.ranking}</p>
                  </div>

                  {/* Bar Chart Container - Aligned to bottom */}
                  <div className="flex w-[236px] justify-between items-end self-start">
                    {university.chartData?.map((value, index) => {
                      const colors = ['#32D583', '#F97066', '#FDB022', '#32D583'];
                      const labels = ['Academics', 'Finances', 'Location', 'Culture'];
                      const height = Math.max(30, (value / 100) * 120);
                      return (
                        <div key={index} className="flex flex-col items-center gap-2">
                          {/* Percentage Label with color matching graph */}
                          <span
                            className="text-center font-bold text-sm leading-normal"
                            style={{
                              color: colors[index],
                              fontFamily: 'Figtree',
                              fontSize: '14px'
                            }}
                          >
                            {value}%
                          </span>
                          {/* Bar */}
                          <div
                            className="w-12 border border-black"
                            style={{
                              height: `${height}px`,
                              backgroundColor: colors[index],
                              boxShadow: '2px 2px 0 0 #000'
                            }}
                          ></div>
                          {/* Category Label */}
                          <span
                            className="text-center text-light-text dark:text-dark-text font-medium leading-[140%]"
                            style={{
                              fontFamily: 'Outfit',
                              fontSize: '12px'
                            }}
                          >
                            {labels[index]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right - Quote Section */}
                <div className="flex flex-col w-[280px]">
                  <div className="inline-flex py-4 px-6 flex-col justify-between items-end gap-4 border border-black bg-white dark:bg-dark-tertiary flex-1" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    <p className="text-light-text dark:text-dark-text text-right font-outfit text-base font-normal leading-[140%]">
                      &quot;{university.quote}&quot;
                    </p>
                    
                    <div className="w-full">
                      {/* Divider Line */}
                      <div className="w-full h-px bg-[#5D5237] mb-4"></div>
                      
                      {/* Author Info */}
                      <div className="flex items-center gap-3 self-end">
                        <div className="flex items-center mt-3">
                          <Image
                            src={university.authorImage || "/Ellipse 2.png"}
                            alt={university.author || "Student"}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className="text-light-text dark:text-dark-text font-outfit text-sm font-medium leading-normal">{university.author}</span>
                        </div>
                      </div>
                      
                      {/* Find out more button */}
                      <div className="mt-4 p-4">
                        <button 
                          onClick={() => handleUniversityClick(university)}
                          className="w-full py-3 bg-[#FF9169] border border-black text-black font-outfit text-base font-medium leading-normal hover:bg-[#ff7b4d] transition-colors duration-200" 
                          style={{ boxShadow: '4px 4px 0 0 #000' }}
                        >
                          View Full Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )))}
        </div>
      </DotPatternBackground>
    </div>
  );
}

export default withAuthProtection(BrowseUniversities, {
  requireAuth: true,
  requireProfile: true
});
