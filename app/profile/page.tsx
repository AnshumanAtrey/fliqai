'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../component/header';
import { DotPatternBackground } from '../component/DotPatternBackground';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  status: string;
  avatar: string;
  stats: {
    universitiesBrowsed: number;
    studentProfilesViewed: number;
    essaysViewed: number;
  };
  credits: number;
  subscriptionStatus?: string;
  subscriptionActive?: boolean;
  preferences?: any; // Store full preferences for editing
}

type TabType = 'general' | 'credits' | 'preferences';

// Helper function to convert grade to status
const getStatusFromGrade = (grade: string): string => {
  if (!grade) return 'Student';
  
  if (grade.includes('9th') || grade.includes('Freshman')) return 'High School Freshman';
  if (grade.includes('10th') || grade.includes('Sophomore')) return 'High School Sophomore';
  if (grade.includes('11th') || grade.includes('Junior')) return 'High School Junior';
  if (grade.includes('12th') || grade.includes('Senior')) return 'High School Senior';
  
  return grade;
};

function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [user, setUser] = useState<any>(null);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [preferencesSection, setPreferencesSection] = useState<string>('academics');

  // Handle preferences section update
  const handlePreferencesUpdate = async (section: string, data: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Authentication required');
        return;
      }

      const idToken = await user.getIdToken();
      const response = await fetch('/api/profile/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          section,
          data
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Update local state
        setUserProfile((prev: UserProfile | null) => prev ? {
          ...prev,
          preferences: {
            ...prev.preferences,
            [section]: data
          }
        } : null);
        
        alert('Preferences updated successfully!');
      } else {
        alert('Failed to update preferences: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Error updating preferences. Please try again.');
    }
  };

  // Handle re-taking onboarding
  const handleRetakeOnboarding = () => {
    setShowPreferencesModal(false);
    // Redirect to onboarding
    router.push('/onboarding');
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProfile(currentUser);
      } else {
        // User not authenticated, use fallback data
        setUserProfile({
          id: '1',
          name: 'Simone Sharma',
          username: 'simonefromfliq',
          email: 'simonesharma@gmail.com',
          phone: '+91 12345 67890',
          status: 'Fresh College Grad',
          avatar: '/Ellipse 2.png',
          stats: {
            universitiesBrowsed: 12,
            studentProfilesViewed: 19,
            essaysViewed: 14,
          },
          credits: 50,
        });
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user profile from backend
  const fetchProfile = async (firebaseUser: any) => {
    try {
      setLoading(true);
      
      // Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();
      
      // Using the correct backend endpoint with Firebase ID token
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${idToken}`, // Firebase ID token
          'Content-Type': 'application/json',
        },
      });

        const data = await response.json();
        
        if (response.ok && data.success) {
          // Transform backend data to match frontend interface
          const backendProfile = data.data;
          setUserProfile({
            id: firebaseUser.uid,
            name: backendProfile.profile?.basicInfo?.fullName || firebaseUser.displayName || 'User',
            username: backendProfile.profile?.basicInfo?.preferredName || firebaseUser.email?.split('@')[0] || 'user',
            email: firebaseUser.email || backendProfile.profile?.basicInfo?.email || '',
            phone: backendProfile.profile?.basicInfo?.phone || '',
            status: getStatusFromGrade(backendProfile.profile?.basicInfo?.currentGrade) || 'Student',
            avatar: firebaseUser.photoURL || '/Ellipse 2.png',
            stats: {
              universitiesBrowsed: backendProfile.stats?.universitiesBrowsed || 0,
              studentProfilesViewed: backendProfile.stats?.studentProfilesViewed || 0,
              essaysViewed: backendProfile.stats?.essaysViewed || 0,
            },
            credits: backendProfile.credits || 0,
            subscriptionStatus: backendProfile.subscriptionStatus || 'free',
            subscriptionActive: backendProfile.subscriptionActive || false,
            preferences: backendProfile.profile, // Store full profile for editing
          });
        } else {
          // API endpoint error - use fallback data
          console.log('API endpoint returned error, using fallback data');
          setUserProfile({
            id: '1',
            name: 'Simone Sharma',
            username: 'simonefromfliq',
            email: 'simonesharma@gmail.com',
            phone: '+91 12345 67890',
            status: 'Fresh College Grad',
            avatar: '/Ellipse 2.png',
            stats: {
              universitiesBrowsed: 12,
              studentProfilesViewed: 19,
              essaysViewed: 14,
            },
            credits: 50,
          });
        }
      } catch (err: any) {
        console.log('Network error or API unavailable, using fallback data:', err?.message || err);
        // Use mock data on any error (network, 404, 500, etc.)
        setUserProfile({
          id: '1',
          name: 'Simone Sharma',
          username: 'simonefromfliq',
          email: 'simonesharma@gmail.com',
          phone: '+91 12345 67890',
          status: 'Fresh College Grad',
          avatar: '/Ellipse 2.png',
          stats: {
            universitiesBrowsed: 12,
            studentProfilesViewed: 19,
            essaysViewed: 14,
          },
          credits: 50,
        });
      } finally {
        setLoading(false);
      }
    };

  const handleEditClick = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleSaveEdit = async () => {
    if (!userProfile || !editingField) return;

    try {
      // Map frontend fields to backend structure
      const fieldMappings: { [key: string]: { section: string; path: string } } = {
        name: { section: 'basicInfo', path: 'fullName' },
        username: { section: 'basicInfo', path: 'preferredName' },
        email: { section: 'basicInfo', path: 'email' },
        phone: { section: 'basicInfo', path: 'phone' },
        status: { section: 'academics', path: 'currentStatus' },
      };

      const mapping = fieldMappings[editingField];
      if (!mapping) {
        throw new Error(`Field ${editingField} not supported for editing`);
      }

      // Get Firebase ID token for authenticated request
      const idToken = user ? await user.getIdToken() : null;
      
      if (!idToken) {
        console.log('No authentication token available, updating locally only');
        setUserProfile(prev => prev ? {
          ...prev,
          [editingField]: editValue,
        } : null);
        setEditingField(null);
        setEditValue('');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/profile/update`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: mapping.section,
          data: {
            [mapping.path]: editValue,
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Update local state with backend response
        setUserProfile(prev => prev ? {
          ...prev,
          [editingField]: editValue,
        } : null);
      } else {
        // API not available or error - update locally for demo
        console.log('API not available for profile update, updating locally');
        setUserProfile(prev => prev ? {
          ...prev,
          [editingField]: editValue,
        } : null);
      }
      
      setEditingField(null);
      setEditValue('');
    } catch (err: any) {
      // Network error or API unavailable - update locally for demo
      console.log('Profile update API unavailable, updating locally:', err?.message || err);
      setUserProfile(prev => prev ? {
        ...prev,
        [editingField]: editValue,
      } : null);
      setEditingField(null);
      setEditValue('');
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  if (loading) {
    return (
      <DotPatternBackground>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-lg text-light-text dark:text-dark-text">Loading profile...</span>
        </div>
      </DotPatternBackground>
    );
  }

  if (!userProfile) {
    return (
      <DotPatternBackground>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-lg text-red-500">Failed to load profile</span>
        </div>
      </DotPatternBackground>
    );
  }

  return (
    <DotPatternBackground>
      <div className="min-h-screen">
        <Header />
        
        <div className="px-[90px] pt-12">
          {/* Go Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-light-text dark:text-dark-text hover:opacity-80 transition-opacity mb-8"
          >
            <div className="w-8 h-8 bg-[#FF9169] border border-black flex items-center justify-center" style={{ boxShadow: '2px 2px 0 0 #000' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4L6 8L10 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-outfit text-sm">Go Back</span>
          </button>

          <div className="max-w-2xl mx-auto">
            {/* Profile Header Card - Separate Card */}
            <div className="w-full bg-light-bg dark:bg-dark-secondary border border-black p-8 mb-4" style={{ boxShadow: '4px 4px 0 0 #000' }}>
              <div className="flex flex-col items-center">
                {/* Profile Avatar */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border border-black overflow-hidden">
                    <Image
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-light-bg dark:bg-dark-tertiary border border-black flex items-center justify-center" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Name and Subtitle */}
                <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">{userProfile.name}</h1>
                <p className="text-light-p dark:text-dark-text mb-8">Account & Settings</p>

                {/* Stats */}
                <div className="flex gap-16">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-light-text dark:text-dark-text mb-1">{userProfile.stats.universitiesBrowsed}</div>
                    <div className="text-sm text-light-p dark:text-dark-text">
                      Universities<br />Browsed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-light-text dark:text-dark-text mb-1">{userProfile.stats.studentProfilesViewed}</div>
                    <div className="text-sm text-light-p dark:text-dark-text">
                      Student Profiles<br />Viewed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-light-text dark:text-dark-text mb-1">{userProfile.stats.essaysViewed}</div>
                    <div className="text-sm text-light-p dark:text-dark-text">
                      Essays<br />Viewed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Tab Container - Figma: width: 794px, padding: 16px 32px 32px 32px, gap: 32px */}
            <div className="flex flex-col items-center gap-8 w-full max-w-[794px] px-8 pt-4 pb-8 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text" style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}>
              
              {/* Tab Navigation - Figma: each button padding: 12px 24px, font: 18px */}
              <div className="flex w-full border border-light-text dark:border-dark-text" style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}>
                <button
                  onClick={() => setActiveTab('general')}
                  className={`flex justify-center items-center gap-2.5 py-3 px-6 flex-1 font-outfit text-lg font-medium transition-colors ${
                    activeTab === 'general'
                      ? 'bg-[#FF9269] text-white'
                      : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text hover:bg-[#FF9269] hover:text-white'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setActiveTab('credits')}
                  className={`flex justify-center items-center gap-2.5 py-3 px-6 flex-1 font-outfit text-lg font-medium border-l border-light-text dark:border-dark-text transition-colors ${
                    activeTab === 'credits'
                      ? 'bg-[#FF9269] text-white'
                      : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text hover:bg-[#FF9269] hover:text-white'
                  }`}
                >
                  Credits
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`flex justify-center items-center gap-2.5 py-3 px-6 flex-1 font-outfit text-lg font-medium border-l border-light-text dark:border-dark-text transition-colors ${
                    activeTab === 'preferences'
                      ? 'bg-[#FF9269] text-white'
                      : 'bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text hover:bg-[#FF9269] hover:text-white'
                  }`}
                >
                  Preferences
                </button>
              </div>

              {/* Tab Content - Figma: gap: 16px, align-self: stretch */}
              <div className="flex flex-col items-center justify-center gap-4 w-full">
                {activeTab === 'general' && (
                  <div className="space-y-8">
                    {/* Profile Fields - Figma: gap: 16px */}
                    <div className="flex flex-col items-center gap-4 w-full">
                      {/* Name Field */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1 text-left">
                          <div className="text-sm font-outfit text-light-text dark:text-dark-text mb-1">Name</div>
                          <div className="text-lg font-outfit font-semibold text-light-text dark:text-dark-text">
                            {userProfile.name}
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditClick('name', userProfile.name)}
                          className="flex items-center gap-2 px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text hover:bg-[#FF9269] hover:text-white transition-colors font-outfit"
                          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                      </div>

                      {/* Username Field */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1 text-left">
                          <div className="text-sm font-outfit text-light-text dark:text-dark-text mb-1">username</div>
                          <div className="text-lg font-outfit font-semibold text-light-text dark:text-dark-text">
                            {userProfile.username}
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditClick('username', userProfile.username)}
                          className="flex items-center gap-2 px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text hover:bg-[#FF9269] hover:text-white transition-colors font-outfit"
                          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                      </div>

                      {/* Password Field */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1 text-left">
                          <div className="text-sm font-outfit text-light-text dark:text-dark-text mb-1">password</div>
                          <div className="text-lg font-outfit font-semibold text-light-text dark:text-dark-text">
                            ••••••••••••
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditClick('password', '')}
                          className="flex items-center gap-2 px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text hover:bg-[#FF9269] hover:text-white transition-colors font-outfit"
                          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                      </div>

                      {/* Email Field */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1 text-left">
                          <div className="text-sm font-outfit text-light-text dark:text-dark-text mb-1">Email</div>
                          <div className="text-lg font-outfit font-semibold text-light-text dark:text-dark-text">
                            {userProfile.email}
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditClick('email', userProfile.email)}
                          className="flex items-center gap-2 px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text hover:bg-[#FF9269] hover:text-white transition-colors font-outfit"
                          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                      </div>

                      {/* Phone Field */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1 text-left">
                          <div className="text-sm font-outfit text-light-text dark:text-dark-text mb-1">Phone</div>
                          <div className="text-lg font-outfit font-semibold text-light-text dark:text-dark-text">
                            {userProfile.phone}
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditClick('phone', userProfile.phone)}
                          className="flex items-center gap-2 px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text hover:bg-[#FF9269] hover:text-white transition-colors font-outfit"
                          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                      </div>

                      {/* Status Field */}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1 text-left">
                          <div className="text-sm font-outfit text-light-text dark:text-dark-text mb-1">Status</div>
                          <div className="text-lg font-outfit font-semibold text-light-text dark:text-dark-text">
                            {userProfile.status}
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditClick('status', userProfile.status)}
                          className="flex items-center gap-2 px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text hover:bg-[#FF9269] hover:text-white transition-colors font-outfit"
                          style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 6L10 4L4 10V12H6L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm font-medium">Edit</span>
                        </button>
                      </div>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-col items-center gap-4 w-full mt-8">
                      <div className="flex justify-center gap-8 text-sm font-outfit text-light-text dark:text-dark-text">
                        <button className="hover:opacity-70 transition-opacity underline">Terms & Conditions</button>
                        <button className="hover:opacity-70 transition-opacity underline">Privacy Policy</button>
                        <button className="hover:opacity-70 transition-opacity underline">Support</button>
                        <button className="hover:opacity-70 transition-opacity underline">Contact</button>
                      </div>
                      
                      <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text text-light-text dark:text-dark-text hover:bg-[#FF9269] hover:text-white transition-colors font-outfit font-medium" style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}>
                          Log Out
                        </button>
                        <button className="px-6 py-3 bg-[#FF9269] border border-light-text dark:border-dark-text text-white hover:bg-[#ff7b4d] transition-colors font-outfit font-medium" style={{ boxShadow: '2px 2px 0 0 rgba(0,0,0,0.8)' }}>
                          Confirm Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'credits' && (
                  <div className="text-center py-8">
                    <div className="max-w-md mx-auto">
                      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">You have:</h3>
                      
                      <div className="bg-light-secondary dark:bg-dark-tertiary border border-black p-8 mb-8" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
                          </svg>
                          <span className="text-4xl font-bold text-light-text dark:text-dark-text">{userProfile.credits}</span>
                        </div>
                        <div className="text-light-text dark:text-dark-text font-medium">CREDITS</div>
                      </div>

                      <div className="text-left mb-8">
                        <div className="text-light-text dark:text-dark-text font-medium mb-4">This gives you access to:</div>
                        <div className="space-y-2 text-light-p dark:text-dark-text">
                          <div>Unlock 5 profiles or</div>
                          <div>Unlock 3 revisions</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button className="flex-1 py-3 bg-light-secondary dark:bg-dark-tertiary border border-black text-light-text dark:text-dark-text hover:bg-[#FF9169] transition-colors" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                          Use credits
                        </button>
                        <button className="flex-1 py-3 bg-[#FF9169] border border-black text-light-text dark:text-dark-text hover:bg-[#ff7b4d] transition-colors" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                          Buy more credits
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'preferences' && (
                  <div className="text-center py-8">
                    <div className="max-w-md mx-auto">
                      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">Onboarding Preferences</h3>
                      <p className="text-light-p dark:text-dark-text mb-8">
                        Update your academic preferences, interests, and goals that help us provide better recommendations.
                      </p>
                      
                      {userProfile?.preferences && (
                        <div className="text-left mb-6 bg-light-secondary dark:bg-dark-tertiary p-4 border border-black" style={{ boxShadow: '2px 2px 0 0 #000' }}>
                          <h4 className="font-bold mb-2">Current Status:</h4>
                          <p className="text-sm">Grade: {userProfile.preferences?.basicInfo?.currentGrade || 'Not set'}</p>
                          <p className="text-sm">GPA: {userProfile.preferences?.academics?.gpa || 'Not set'}</p>
                          <p className="text-sm">Graduation Year: {userProfile.preferences?.basicInfo?.graduationYear || 'Not set'}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={() => setShowPreferencesModal(true)}
                          className="px-6 py-3 bg-[#FF9169] border border-black text-light-text dark:text-dark-text font-medium hover:bg-[#ff7b4d] transition-colors"
                          style={{ boxShadow: '2px 2px 0 0 #000' }}
                        >
                          Edit Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingField && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-light-bg dark:bg-dark-secondary border border-black p-6 max-w-md w-full mx-4" style={{ boxShadow: '4px 4px 0 0 #000' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                  Edit your {editingField}
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="w-8 h-8 bg-[#FF9169] border border-black flex items-center justify-center hover:bg-[#ff7b4d] transition-colors"
                  style={{ boxShadow: '2px 2px 0 0 #000' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2 capitalize">
                  {editingField}
                </label>
                <input
                  type={editingField === 'password' ? 'password' : editingField === 'email' ? 'email' : 'text'}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full px-4 py-3 border border-black bg-light-secondary dark:bg-dark-tertiary text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-[#FF9169]"
                  placeholder={`Enter your ${editingField}`}
                />
              </div>
              
              <button
                onClick={handleSaveEdit}
                className="w-full py-3 bg-[#FF9169] border border-black text-light-text dark:text-dark-text font-medium hover:bg-[#ff7b4d] transition-colors"
                style={{ boxShadow: '2px 2px 0 0 #000' }}
              >
                Confirm {editingField === 'email' ? 'Email' : editingField.charAt(0).toUpperCase() + editingField.slice(1)}
              </button>
            </div>
          </div>
        )}

        {/* Preferences Modal */}
        {showPreferencesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-light-bg dark:bg-dark-secondary border border-black p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" style={{ boxShadow: '4px 4px 0 0 #000' }}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                  Edit Onboarding Preferences
                </h3>
                <button
                  onClick={() => setShowPreferencesModal(false)}
                  className="w-8 h-8 bg-[#FF9169] border border-black flex items-center justify-center hover:bg-[#ff7b4d] transition-colors"
                  style={{ boxShadow: '2px 2px 0 0 #000' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Section Selector */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {['academics', 'testing', 'activitiesInterests', 'preferences', 'dreamSchools'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setPreferencesSection(section)}
                      className={`px-4 py-2 border border-black text-sm font-medium transition-colors ${
                        preferencesSection === section
                          ? 'bg-[#FF9169] text-light-text dark:text-dark-text'
                          : 'bg-light-secondary dark:bg-dark-tertiary text-light-text dark:text-dark-text hover:bg-[#ffa982]'
                      }`}
                      style={{ boxShadow: '2px 2px 0 0 #000' }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mb-6 max-h-80 overflow-y-auto">
                {preferencesSection === 'academics' && (
                  <div className="text-left space-y-4">
                    <h4 className="font-bold mb-3">Academic Information</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">GPA</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.academics?.gpa || 'Not set'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Grade</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.basicInfo?.currentGrade || 'Not set'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">AP Courses</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.academics?.apCourses?.join(', ') || 'None selected'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Favorite Subjects</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.academics?.favoriteSubjects?.join(', ') || 'None selected'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {preferencesSection === 'testing' && (
                  <div className="text-left space-y-4">
                    <h4 className="font-bold mb-3">Test Scores</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">SAT Score</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.testing?.satScore || 'Not taken'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">ACT Score</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.testing?.actScore || 'Not taken'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">AP Exam Scores</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.testing?.apScores?.length 
                            ? userProfile.preferences.testing.apScores.map((score: any) => 
                                `${score.subject}: ${score.score}`).join(', ')
                            : 'None reported'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {preferencesSection === 'activitiesInterests' && (
                  <div className="text-left space-y-4">
                    <h4 className="font-bold mb-3">Activities & Interests</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Extracurricular Activities</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.activitiesAndInterests?.extracurriculars?.join(', ') || 'None selected'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Career Interests</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.activitiesAndInterests?.careerInterests?.join(', ') || 'None selected'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Hobbies</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.activitiesAndInterests?.hobbies?.join(', ') || 'None selected'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {preferencesSection === 'preferences' && (
                  <div className="text-left space-y-4">
                    <h4 className="font-bold mb-3">College Preferences</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Preferred Location</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.preferences?.collegePreferences?.location || 'No preference'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">College Size</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.preferences?.collegePreferences?.size || 'No preference'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">College Type</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.preferences?.collegePreferences?.type || 'No preference'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {preferencesSection === 'dreamSchools' && (
                  <div className="text-left space-y-4">
                    <h4 className="font-bold mb-3">Dream Schools</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Target Universities</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.dreamSchools?.targetUniversities?.length 
                            ? userProfile.preferences.dreamSchools.targetUniversities.join(', ')
                            : 'No dream schools selected'}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Major Interests</label>
                        <div className="text-sm p-3 bg-light-tertiary dark:bg-dark-tertiary border border-black">
                          {userProfile?.preferences?.dreamSchools?.majorInterests?.join(', ') || 'No majors selected'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!['academics', 'testing', 'activitiesInterests', 'preferences', 'dreamSchools'].includes(preferencesSection) && (
                  <div className="text-center py-8">
                    <p className="text-light-p dark:text-dark-text text-sm">
                      Select a section above to view your preferences data.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-300 pt-4 mt-6">
                <p className="text-light-p dark:text-dark-text text-sm mb-4 text-center">
                  To update your preferences, re-take the onboarding questionnaire.
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleRetakeOnboarding}
                    className="px-6 py-3 bg-[#FF9169] border border-black text-light-text dark:text-dark-text font-medium hover:bg-[#ff7b4d] transition-colors"
                    style={{ boxShadow: '2px 2px 0 0 #000' }}
                  >
                    Re-take Onboarding
                  </button>
                  <button
                    onClick={() => setShowPreferencesModal(false)}
                    className="px-6 py-3 bg-light-secondary dark:bg-dark-tertiary border border-black text-light-text dark:text-dark-text font-medium hover:bg-gray-200 transition-colors"
                    style={{ boxShadow: '2px 2px 0 0 #000' }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DotPatternBackground>
  );
}

export default withAuthProtection(ProfilePage, {
  requireAuth: true,
  requireProfile: true
});