"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DotPatternBackground } from "../component/DotPatternBackground";
import { useAuth } from "../../lib/hooks/useAuth";
import { withGuestOnly } from '@/lib/hooks/useGuestOnly';
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

function Signup() {
  const router = useRouter();
  const { signUp, signInWithGoogle, loading, error, user } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  
  // theme: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      if (user.profileCompleted === false) {
        router.push('/onboarding');
      } else if (user.profileCompleted === true) {
        router.push('/'); // redirect to home page for completed users
      }
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

  // Validate form
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.displayName.trim()) {
      errors.displayName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    try {
      await signUp(formData.email, formData.password, formData.displayName);
      // Redirect will happen via useEffect when user state changes
    } catch (err) {
      // Error is handled by the auth context and displayed via error state
      console.error('Signup failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google signup
  const handleGoogleSignup = async () => {
    if (isSubmitting || loading) return;

    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      // Redirect will happen via useEffect when user state changes
    } catch (err) {
      // Error is handled by the auth context and displayed via error state
      console.error('Google signup failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear field-specific error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Theme color classes for signup card
  const cardBg = theme === 'dark' ? 'bg-[#231F20]' : 'bg-[#FFFFFF]';
  const cardText = theme === 'dark' ? 'text-[#FFFBF1]' : 'text-[#5D5237]';

  return (
    <DotPatternBackground>
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      
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

      {/* Signup Card */}
      <div className={`max-w-xl w-full ${cardBg} p-12 ${cardText}`} style={{border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000', boxShadow: '4px 4px 0px 0px #000'}}> 
        <div className="flex flex-col items-center gap-6">
          <div className="text-center w-full mb-4">
            <h2 className={`text-[32px] font-bold mb-8 mt-2 font-outfit leading-normal ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>Create an account</h2>
            <p className={`text-[18px] font-outfit font-normal leading-normal text-center ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-[#5D5237]'}`}>
              Already have an account?{" "}
              <Link href="/login" className="hover:underline text-[#EF622F] font-outfit text-[18px] font-medium leading-normal">
                Log in
              </Link>
            </p>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="w-full p-4 mb-4 border rounded text-red-600 bg-red-50 border-red-200">
              {error}
            </div>
          )}

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                Full Name
                <input 
                  type="text" 
                  className={`w-full mt-1 p-4 ${cardText}`} 
                  style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                  placeholder="Enter your full name"
                  value={formData.displayName}
                  onChange={handleInputChange('displayName')}
                  disabled={isSubmitting || loading}
                  required
                />
                {formErrors.displayName && (
                  <span className="text-red-500 text-sm mt-1 block">{formErrors.displayName}</span>
                )}
              </label>
              
              <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                Email
                <input 
                  type="email" 
                  className={`w-full mt-1 p-4 ${cardText}`} 
                  style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  disabled={isSubmitting || loading}
                  required
                />
                {formErrors.email && (
                  <span className="text-red-500 text-sm mt-1 block">{formErrors.email}</span>
                )}
              </label>
              
              <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                Password
                <input 
                  type="password" 
                  className={`w-full mt-1 p-4 ${cardText}`} 
                  style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  disabled={isSubmitting || loading}
                  required
                />
                {formErrors.password && (
                  <span className="text-red-500 text-sm mt-1 block">{formErrors.password}</span>
                )}
              </label>
              
              <label className={`block text-[14px] font-outfit font-medium leading-5 ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                Confirm Password
                <input 
                  type="password" 
                  className={`w-full mt-1 p-4 ${cardText}`} 
                  style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  disabled={isSubmitting || loading}
                  required
                />
                {formErrors.confirmPassword && (
                  <span className="text-red-500 text-sm mt-1 block">{formErrors.confirmPassword}</span>
                )}
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 text-black text-[16px] font-outfit font-medium leading-normal hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{background:'rgb(var(--accent))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  Creating account...
                </div>
              ) : (
                'Create your account'
              )}
            </button>
            
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button 
                type="button"
                onClick={handleGoogleSignup}
                disabled={isSubmitting || loading}
                className={`w-full py-4 px-4 flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${cardText}`} style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
              >
                <Image 
                  src="/google.png" 
                  alt="Google" 
                  width={20} 
                  height={20} 
                />
                <span className={`text-[16px] font-outfit font-medium leading-normal ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>
                  {isSubmitting || loading ? 'Signing up...' : 'Sign up with Google'}
                </span>
              </button>

              <button 
                type="button"
                className={`w-full py-4 px-4 flex items-center justify-center gap-3 transition-colors ${cardText}`} style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
              >
                <Image 
                  src="/apple.png" 
                  alt="Apple" 
                  width={20} 
                  height={20} 
                />
                <span className={`text-[16px] font-outfit font-medium leading-normal ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>Sign up with Apple</span>
              </button>

              <button 
                type="button"
                className={`w-full py-4 px-4 flex items-center justify-center gap-3 transition-colors ${cardText}`} style={{background: theme === 'dark' ? 'rgb(var(--dark-tertiary))' : 'rgb(var(--light-bg))', border: theme === 'dark' ? '1px solid #F9F4DA' : '1px solid #000'}}
              >
                <Image 
                  src="/facebook.svg" 
                  alt="Facebook" 
                  width={20} 
                  height={20} 
                />
                <span className={`text-[16px] font-outfit font-medium leading-normal ${theme === 'dark' ? 'text-[rgb(var(--dark-text))]' : 'text-black'}`}>Sign up with Facebook</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </DotPatternBackground>
  );
}

export default withGuestOnly(Signup);