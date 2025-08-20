"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  // theme: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  // Theme color classes
  const headerBg = theme === 'dark' ? 'bg-[#231F20]' : 'bg-[#FFFFFF]';
  const textColor = theme === 'dark' ? 'text-[#FFFBF1]' : 'text-[#5D5237]';

  return (
    <header className={`w-full ${headerBg} border-b border-black px-6 py-4`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image 
            src="/fliq-logo.svg" 
            alt="Fliq Logo" 
            width={80} 
            height={32} 
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/essay-builder" className={`${textColor} hover:opacity-70 transition-opacity`}>
            Essay Builder
          </Link>
          <Link href="/browse-universities" className={`${textColor} hover:opacity-70 transition-opacity`}>
            Browse Universities
          </Link>
          <Link href="/discover-students" className={`${textColor} hover:opacity-70 transition-opacity`}>
            Discover Students
          </Link>
        </nav>

        {/* Right Side - Subscribe Button and Profile */}
        <div className="flex items-center space-x-4">
          {/* Subscribe Button */}
          <button 
            className={`px-4 py-2 ${textColor} font-medium card hover:opacity-90 transition-opacity`}
            style={{background: 'rgb(var(--accent))'}}
          >
            Subscribe to Fliq+
          </button>

          {/* Profile Image */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-black">
            <Image 
              src="/profile.png" 
              alt="Profile" 
              width={40} 
              height={40} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}