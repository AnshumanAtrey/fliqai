'use client';

import React from 'react';
import Header from './landing-page/components/header';
import HeroSection from './landing-page/components/herosection';
import Carousel from './landing-page/components/caraousel';
import PersonsSection from './landing-page/components/persons';
import StacksSection from './landing-page/components/stacks';
import ShareGotYouInSection from './landing-page/components/share';
import ClarityHitsSection from './landing-page/components/clarity';
import ScaleOfFliqSection from './landing-page/components/scale';
import TestimonialWallSection from './landing-page/components/testimonial';
import FaqAccordionSection from './landing-page/components/faqs';
import Footer from './landing-page/components/Footer';

const Page = () => {
  return (
    <div className="w-full">
      {/* Sticky Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* University Logos Carousel */}
      <Carousel />

      {/* Persons Section */}
      <div id="about">
        <PersonsSection />
      </div>

      {/* Stacks Section */}
      <div id="features">
        <StacksSection />
      </div>

      {/* Share What Got You In Section */}
      <ShareGotYouInSection />

      {/* Clarity Hits Section */}
      <ClarityHitsSection />

      <div id="scale">
        <ScaleOfFliqSection />
      </div>

      {/* Testimonial Wall Section */}
      <TestimonialWallSection />

      <div id="faqs">
        <FaqAccordionSection />
      </div>

      <Footer />
    </div>
  );
};

export default Page;
