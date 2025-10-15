"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DotPatternBackground } from "../../component/DotPatternBackground";
import { useAuth } from "../../../lib/hooks/useAuth";

import { useState, useEffect } from "react";

const MoonIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

const SunIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

export default function AcademicSteps() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    academicLevel: '',
    fieldOfStudy: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // theme: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  // Set background SVG and colors
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const bg = theme === 'dark' ? '/bg-black.svg' : '/bg-white.svg';
      document.body.style.backgroundImage = `url('${bg}')`;
      document.body.style.backgroundRepeat = 'repeat';
      document.body.style.backgroundSize = 'auto';
      document.body.style.backgroundColor = theme === 'dark' ? '#0F0D0E' : '#FFFBF1';
    }
  }, [theme]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // TODO: Submit academic information to backend
      // For now, just redirect to the main app
      router.push('/discover-students');
    } catch (err) {
      console.error('Academic steps submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Theme color classes for login card
  const cardBg = theme === 'dark' ? 'bg-[#231F20]' : 'bg-[#FFFFFF]';
  const cardText = theme === 'dark' ? 'text-[#FFFBF1]' : 'text-[#5D5237]';

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

  return (
    <DotPatternBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-24 relative">
        
        {/* Theme Toggle Button */}
        <button
          aria-label="Toggle theme"
          className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg p-4 bg-[#FFFBF1] dark:bg-[#231F20] border border-[#FF9269] hover:scale-110 transition-transform"
          style={{ boxShadow: '0 2px 16px 0 #0002' }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? SunIcon : MoonIcon}
        </button>

        {/* Fliq Logo Above Box */}
        <div className="mb-8">
          <Image 
            src="/fliq-logo.svg" 
            alt="Fliq Logo" 
            width={120} 
            height={48} 
            priority
          />
        </div>

        {/* Academic Steps Card */}
        <div className={`max-w-xl w-full ${cardBg} p-12 ${cardText}`} style={{border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000', boxShadow: '4px 4px 0px 0px #000'}}> 
          <div className="flex flex-col items-center gap-6">
            <div className="text-center w-full mb-4">
              <h2 className={`text-[32px] font-bold mb-8 mt-2 font-outfit leading-normal ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                Complete Your Profile
              </h2>
              <p className={`text-[18px] font-outfit font-normal leading-normal text-center ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-[#5D5237]'}`}>
                Tell us about your academic background to get personalized recommendations.
              </p>
            </div>
            
            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                    First Name
                    <input 
                      type="text" 
                      className={`w-full mt-1 p-4 ${cardText}`} 
                      style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </label>
                  
                  <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                    Last Name
                    <input 
                      type="text" 
                      className={`w-full mt-1 p-4 ${cardText}`} 
                      style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={isSubmitting}
                      required
                    />
                  </label>
                </div>

                <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                  Date of Birth
                  <input 
                    type="date" 
                    className={`w-full mt-1 p-4 ${cardText}`} 
                    style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </label>
                
                <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                  Academic Level
                  <select 
                    className={`w-full mt-1 p-4 ${cardText}`} 
                    style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                    value={formData.academicLevel}
                    onChange={(e) => handleInputChange('academicLevel', e.target.value)}
                    disabled={isSubmitting}
                    required
                  >
                    <option value="">Select your academic level</option>
                    <option value="high-school">High School</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                </label>

                <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                  Field of Study
                  <input 
                    type="text" 
                    className={`w-full mt-1 p-4 ${cardText}`} 
                    style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                    placeholder="e.g., Computer Science, Business, Medicine"
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                    disabled={isSubmitting}
                    required
                  />
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 text-black text-[16px] font-outfit font-medium leading-normal hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{background:'rgb(var(--accent))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Completing Profile...
                  </div>
                ) : (
                  'Complete Profile'
                )}
              </button>

              <div className="text-center mt-4">
                <Link 
                  href="/login" 
                  className="text-[#EF622F] hover:underline text-[14px] font-outfit font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DotPatternBackground>
  );
}