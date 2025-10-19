'use client';

import { useState, useEffect } from 'react';
import Header from '../component/header';
import { DotPatternBackground } from '../component/DotPatternBackground';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';
import { useRouter } from 'next/navigation';

// Import components
import { ProfileHeader } from './components/ProfileHeader';
import { TabNavigation } from './components/TabNavigation';
import { GeneralTab } from './components/GeneralTab';
import { CreditsTab } from './components/CreditsTab';
import { PreferencesTab } from './components/PreferencesTab';
import { EditModal } from './components/EditModal';
import { PreferencesModal } from './components/PreferencesModal';

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
  preferences?: Record<string, unknown>; // Store full preferences for editing
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
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);



  // Handle sign out
  const handleSignOut = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Get Firebase ID token
        const idToken = await user.getIdToken();

        // Call backend signout endpoint to revoke refresh tokens
        try {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/auth/signout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.log('Backend signout call failed, continuing with Firebase signout:', error);
        }
      }

      // Sign out from Firebase
      await signOut(auth);

      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
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
  const fetchProfile = async (firebaseUser: User) => {
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
    } catch (err: unknown) {
      console.log('Network error or API unavailable, using fallback data:', err instanceof Error ? err.message : err);
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
    } catch (err: unknown) {
      // Network error or API unavailable - update locally for demo
      console.log('Profile update API unavailable, updating locally:', err instanceof Error ? err.message : err);
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

        {/* Main Content Container - Responsive Layout */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-light-text dark:text-dark-text hover:opacity-80 transition-opacity mb-6 sm:mb-8"
          >
            <div className="w-8 h-8 bg-[#FF9169] border border-black flex items-center justify-center" style={{ boxShadow: '2px 2px 0 0 #000' }}>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4L6 8L10 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-outfit text-sm">Go Back</span>
          </button>

          {/* Profile Content - Always Stacked Vertically */}
          <div className="flex flex-col gap-4 sm:gap-6 max-w-4xl mx-auto">
            
            {/* Profile Header - Always on Top */}
            <ProfileHeader userProfile={userProfile} />

            {/* Tab Content Section - Always Below Header */}
            <div className="w-full">
              {/* Main Tab Container */}
              <div className="flex flex-col gap-6 sm:gap-8 w-full p-4 sm:p-6 lg:p-8 bg-light-bg dark:bg-dark-bg border border-light-text dark:border-dark-text" style={{ boxShadow: '4px 4px 0 0 rgba(0,0,0,0.8)' }}>

                {/* Tab Navigation */}
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Tab Content */}
                <div className="w-full">
                  {activeTab === 'general' && (
                    <GeneralTab
                      userProfile={userProfile}
                      onEditClick={handleEditClick}
                      onSignOut={handleSignOut}
                    />
                  )}

                  {activeTab === 'credits' && (
                    <CreditsTab userProfile={userProfile} />
                  )}

                  {activeTab === 'preferences' && (
                    <PreferencesTab
                      userProfile={userProfile}
                      onOpenPreferencesModal={() => setShowPreferencesModal(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <EditModal
          editingField={editingField}
          editValue={editValue}
          setEditValue={setEditValue}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />

        {/* Preferences Modal */}
        <PreferencesModal
          isOpen={showPreferencesModal}
          onClose={() => setShowPreferencesModal(false)}
          userProfile={userProfile}
        />
      </div>
    </DotPatternBackground>
  );
}

export default withAuthProtection(ProfilePage, {
  requireAuth: true,
  requireProfile: true
});