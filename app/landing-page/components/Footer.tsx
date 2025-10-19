'use client';

import React from 'react';
import CircularCarousel from './CircularCarousel';
import Image from 'next/image';

// Import footer images
import FooterImg1 from '../assets/Footer/0cdf514a4b069b761062b51c694f333e9c1697f2.jpg';
import FooterImg2 from '../assets/Footer/1db2b8ad88ae181ad62d4c2c53de3b6f0bc2279e.jpg';
import FooterImg3 from '../assets/Footer/3aea1d813bf318f1504de9d46124d58a897f86d0.jpg';
import FooterImg4 from '../assets/Footer/3f295df40c214123ece75f2a9f9a670406da60e2.jpg';
import FooterImg5 from '../assets/Footer/5cd95ff7dac48664f20ec892fa52e7bb3f676c73.jpg';
import FooterImg6 from '../assets/Footer/784543ad44da90e1e39548e0ccd382944f64d3e7.jpg';
import FooterImg7 from '../assets/Footer/7d0ff01bec000df773093bac1ea984c06949ca42.jpg';
import FooterImg8 from '../assets/Footer/9787d0f030304efcd62fdcabaff5958bc3b6ea84.jpg';
import FooterImg9 from '../assets/Footer/c73e3872317fc0a9c5929fed3b628655c17c47a9.jpg';
import FooterImg10 from '../assets/Footer/d506129378287fc01cddc318d15c84963ad99c77.jpg';
import FooterImg11 from '../assets/Footer/eb7b2e78a073b7d28ca0335f39b7e50002f32c50.jpg';
import LogoImg from '../assets/logos/Whitelogo.svg';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F9F7F3] relative">
      {/* Hero Section with Circular Carousel */}
      <div className="relative w-full">
        {/* Circular Carousel Background - Responsive */}
        <div className="w-full h-[600px] md:h-[1100px] relative flex items-center justify-center pb-20 md:pb-40 pt-40 md:pt-80">
          {/* Mobile Carousel */}
          <div className="block md:hidden -mb-[30%]" style={{ marginRight: '-40px' }}>
            <CircularCarousel
              images={[
                FooterImg1.src,
                FooterImg2.src,
                FooterImg3.src,
                FooterImg4.src,
                FooterImg5.src,
                FooterImg6.src,
                FooterImg7.src,
                FooterImg8.src,
                FooterImg9.src,
                FooterImg10.src,
                FooterImg11.src,
              ]}
              diameter={600}
              imageWidth={80}
              imageHeight={100}
              rotationSpeed={50}
              imageBorderRadius={8}
            />
          </div>

          {/* Desktop Carousel */}
          <div className="hidden md:block -mb-[30%]" style={{ marginRight: '-64px' }}>
            <CircularCarousel
              images={[
                FooterImg1.src,
                FooterImg2.src,
                FooterImg3.src,
                FooterImg4.src,
                FooterImg5.src,
                FooterImg6.src,
                FooterImg7.src,
                FooterImg8.src,
                FooterImg9.src,
                FooterImg10.src,
                FooterImg11.src,
                FooterImg1.src,
                FooterImg2.src,
                FooterImg3.src,
                FooterImg4.src,
                FooterImg5.src,
              ]}
              diameter={1200}
              imageWidth={128}
              imageHeight={160}
              rotationSpeed={40}
              imageBorderRadius={12}
            />
          </div>
        </div>

        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4 md:gap-6 max-w-[629px] mx-auto">
            <div className="flex flex-col items-center gap-4 md:gap-[22px]">
              <h2 className="text-[#191919] font-outfit text-2xl md:text-[40px] font-bold leading-[110%] text-center capitalize">
                It&apos;s Not Luck, It&apos;s Data
              </h2>
              <p className="text-[#5D5237] font-outfit text-base md:text-[18px] font-normal leading-[150%] text-center max-w-[350px]">
                Utilize hundreds of thousands of essays, profiles, and colleges to get into your dream university
              </p>
            </div>
            <button className="px-4 py-3 bg-[#191919] rounded-xl border border-[#191919] text-white font-outfit text-base font-medium hover:bg-[#333] transition-colors">
              Start Exploring
            </button>
          </div>
        </div>
      </div>

      {/* Footer Content - Positioned to overlap bottom of carousel */}
      <div className="bg-[#191919] h-full rounded-t-[24px] relative z-10 flex justify-center mx-4 md:mx-[30px] -mt-40 md:-mt-80">
        {/* Main Footer Section */}
        <div className="w-full md:w-[1408px] min-h-[400px] md:h-[500px] px-4 md:px-[30px] py-10 md:py-40 md:pt-16">
          {/* Top Section with Logo, Links, and Sign Up */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12 md:mb-32 gap-8">
            {/* Logo */}
            <div className="flex items-center z-20">
              <Image src={LogoImg} alt="Logo" width={80} height={80} className="md:w-[120px] md:h-[120px]" priority />
            </div>

            {/* Navigation Links - Stack on mobile */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-[152px]">
              <div className="flex flex-col gap-3 md:gap-4 items-center md:items-start">
                <a href="#" className="text-white/80 font-outfit text-sm md:text-base font-medium hover:text-white transition-colors">
                  About
                </a>
                <a href="#" className="text-white/80 font-outfit text-sm md:text-base font-medium hover:text-white transition-colors">
                  Features
                </a>
                <a href="#" className="text-white/80 font-outfit text-sm md:text-base font-medium hover:text-white transition-colors">
                  Scale
                </a>
                <a href="#" className="text-white/80 font-outfit text-sm md:text-base font-medium hover:text-white transition-colors">
                  FAQ
                </a>
              </div>

              <div className="flex flex-col gap-3 md:gap-4 items-center md:items-start">
                <a href="#" className="text-white/80 font-outfit text-sm md:text-base font-medium hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-white/80 font-outfit text-sm md:text-base font-medium hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-white/80 font-outfit text-sm md:text-base font-medium hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-white/80 font-outfit text-sm md:text-base font-medium hover:text-white transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Sign Up Button */}
            <button className="px-4 py-3 bg-[#FAF6F2] rounded-xl border border-[#191919] text-black font-outfit text-sm md:text-base font-medium hover:bg-white transition-colors">
              Sign up
            </button>
          </div>

          {/* Large FLIQ Text */}
          <div className="flex justify-center mb-8 md:mb-20">
            <h3
              className="font-outfit text-[100px] font-black leading-[100px]"
              style={{
                background: 'linear-gradient(to bottom, #333333, #191919)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              FLIQ
            </h3>
          </div>

          {/* Support Email */}
          <div className="flex justify-center mb-8 md:mb-20 md:absolute md:bottom-0 md:left-1/2 md:transform md:-translate-x-1/2">
            <span className="text-white font-outfit text-lg md:text-[32px] font-normal leading-[28px] md:leading-[40px]">
              support@fliq.app
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section - Outside dark background */}
      <div className="w-full bg-[#F9F7F3] py-6 md:py-8 bottom-0">
        <div className="max-w-[1408px] mx-auto px-4 md:px-[99px]">
          {/* Bottom Links */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
            <span className="text-[#5D5237] font-outfit text-sm md:text-base font-normal text-center">
              © Copyright Fliq 2025
            </span>
            <div className="hidden md:block w-1 h-1 bg-[#5D5237] rounded-full" />
            <a href="#" className="text-[#5D5237] font-outfit text-sm md:text-base font-normal underline hover:text-[#191919] transition-colors">
              Terms & Conditions
            </a>
            <div className="hidden md:block w-1 h-1 bg-[#5D5237] rounded-full" />
            <a href="#" className="text-[#5D5237] font-outfit text-sm md:text-base font-normal underline hover:text-[#191919] transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}