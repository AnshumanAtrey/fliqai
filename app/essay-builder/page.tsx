"use client";
import React from 'react';
import Header from '../component/header';
import EssayBuilder from '../component/EssayBuilder';
import { withAuthProtection } from '@/lib/hooks/useAuthProtection';

const EssayBuilderPage = () => {
  return (
    <div className="min-h-screen bg-dot">
      <Header />
      <main>
        <EssayBuilder />
      </main>
    </div>
  );
};

export default withAuthProtection(EssayBuilderPage, {
  requireAuth: true,
  requireProfile: true
});
