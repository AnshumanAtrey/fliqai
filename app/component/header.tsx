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
  const headerBg = theme === 'dark' ? 'bg-[#231F20]' : 'bg-[#FFFBF1]';
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
        <nav className="hidden md:flex items-center space-x-12">
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

        {/* Right Side - Coins, Subscribe Button and Profile */}
        <div className="flex items-center space-x-4">
          {/* Coins Display */}
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="33" viewBox="0 0 46 33" fill="none" className="w-[30px] h-[22px]">
              <path d="M33.5 9.29437V8.25C33.5 3.5475 26.4069 0 17 0C7.59313 0 0.5 3.5475 0.5 8.25V15.75C0.5 19.6669 5.42188 22.7794 12.5 23.7113V24.75C12.5 29.4525 19.5931 33 29 33C38.4069 33 45.5 29.4525 45.5 24.75V17.25C45.5 13.3687 40.7337 10.2525 33.5 9.29437ZM42.5 17.25C42.5 19.7288 36.7269 22.5 29 22.5C28.3006 22.5 27.6069 22.4756 26.9225 22.4306C30.9669 20.9569 33.5 18.5625 33.5 15.75V12.3263C39.1006 13.1606 42.5 15.4256 42.5 17.25ZM12.5 20.6719V16.2113C13.9921 16.4057 15.4953 16.5021 17 16.5C18.5047 16.5021 20.0079 16.4057 21.5 16.2113V20.6719C20.0101 20.892 18.506 21.0016 17 21C15.494 21.0016 13.9899 20.892 12.5 20.6719ZM30.5 13.1119V15.75C30.5 17.3231 28.1731 19.0125 24.5 20.0381V15.6562C26.9206 15.0694 28.97 14.1956 30.5 13.1119ZM17 3C24.7269 3 30.5 5.77125 30.5 8.25C30.5 10.7288 24.7269 13.5 17 13.5C9.27312 13.5 3.5 10.7288 3.5 8.25C3.5 5.77125 9.27312 3 17 3ZM3.5 15.75V13.1119C5.03 14.1956 7.07938 15.0694 9.5 15.6562V20.0381C5.82687 19.0125 3.5 17.3231 3.5 15.75ZM15.5 24.75V23.9681C15.9931 23.9869 16.4919 24 17 24C17.7275 24 18.4381 23.9756 19.1356 23.9344C19.9105 24.2118 20.6998 24.4471 21.5 24.6394V29.0381C17.8269 28.0125 15.5 26.3231 15.5 24.75ZM24.5 29.6719V25.2C25.9916 25.4005 27.495 25.5007 29 25.5C30.5047 25.5021 32.0079 25.4057 33.5 25.2113V29.6719C30.5159 30.1094 27.4841 30.1094 24.5 29.6719ZM36.5 29.0381V24.6562C38.9206 24.0694 40.97 23.1956 42.5 22.1119V24.75C42.5 26.3231 40.1731 28.0125 36.5 29.0381Z" fill="black"/>
            </svg>
            <span className={`${textColor} font-medium text-lg`}>50</span>
          </div>

          {/* Subscribe Button */}
          <Link href="/subscription">
            <button 
              className={`px-4 py-2 ${textColor} font-medium card hover:opacity-90 transition-opacity`}
              style={{background: 'rgb(var(--accent))'}}
            >
              Buy Credits
            </button>
          </Link>

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