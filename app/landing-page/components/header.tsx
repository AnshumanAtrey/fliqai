'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '../assets/fliq-black.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F3EAE1] bg-[#FAF6F2]">
      <div className="flex w-full max-w-[1640px] mx-auto px-4 md:px-10 lg:px-[120px] py-4 justify-between items-center">
        <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image src={logo} alt="Fliq Logo" width={80} height={32} className="md:w-[120px] md:h-[48px]" />
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-14">
          <a href="#about" className="text-[#5D5237] font-outfit text-sm font-medium hover:opacity-75 transition-opacity">About</a>
          <a href="#features" className="text-[#5D5237] font-outfit text-sm font-medium hover:opacity-75 transition-opacity">Features</a>
          <a href="#scale" className="text-[#5D5237] font-outfit text-sm font-medium hover:opacity-75 transition-opacity">Scale</a>
          <a href="#faqs" className="text-[#5D5237] font-outfit text-sm font-medium hover:opacity-75 transition-opacity">FAQs</a>
        </nav>

        {/* Desktop Login & Sign Up Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => router.push('/login')}
            className="flex items-center justify-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-xl border border-[#191919] bg-transparent hover:bg-[#F3EAE1] transition-colors"
          >
            <span className="text-[#191919] font-outfit text-xs md:text-sm font-medium">Login</span>
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="flex items-center justify-center gap-2 px-3 py-2 md:px-6 md:py-3 rounded-xl border border-[#191919] bg-[#191919] hover:bg-[#333333] transition-colors"
          >
            <span className="text-white font-outfit text-xs md:text-sm font-medium">Sign Up</span>
          </button>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // X icon when menu is open
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            // Hamburger icon when menu is closed
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12ZM3.75 6.75H20.25C20.4489 6.75 20.6397 6.67098 20.7803 6.53033C20.921 6.38968 21 6.19891 21 6C21 5.80109 20.921 5.61032 20.7803 5.46967C20.6397 5.32902 20.4489 5.25 20.25 5.25H3.75C3.55109 5.25 3.36032 5.32902 3.21967 5.46967C3.07902 5.61032 3 5.80109 3 6C3 6.19891 3.07902 6.38968 3.21967 6.53033C3.36032 6.67098 3.55109 6.75 3.75 6.75ZM20.25 17.25H3.75C3.55109 17.25 3.36032 17.329 3.21967 17.4697C3.07902 17.6103 3 17.8011 3 18C3 18.1989 3.07902 18.3897 3.21967 18.5303C3.36032 18.671 3.55109 18.75 3.75 18.75H20.25C20.4489 18.75 20.6397 18.671 20.7803 18.5303C20.921 18.3897 21 18.1989 21 18C21 17.8011 20.921 17.6103 20.7803 17.4697C20.6397 17.329 20.4489 17.25 20.25 17.25Z" fill="black" />
            </svg>
          )}
        </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#FAF6F2] border-b border-[#F3EAE1] md:hidden shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <a
              href="#about"
              className="text-[#5D5237] font-outfit text-base font-medium hover:opacity-75 transition-opacity py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#features"
              className="text-[#5D5237] font-outfit text-base font-medium hover:opacity-75 transition-opacity py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#scale"
              className="text-[#5D5237] font-outfit text-base font-medium hover:opacity-75 transition-opacity py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Scale
            </a>
            <a
              href="#faqs"
              className="text-[#5D5237] font-outfit text-base font-medium hover:opacity-75 transition-opacity py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </a>
            <div className="flex flex-col gap-3 mt-2">
              <button
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#191919] bg-transparent hover:bg-[#F3EAE1] transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/login');
                }}
              >
                <span className="text-[#191919] font-outfit text-sm font-medium">Login</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#191919] bg-[#191919] hover:bg-[#333333] transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push('/signup');
                }}
              >
                <span className="text-white font-outfit text-sm font-medium">Sign Up</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;