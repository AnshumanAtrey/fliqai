import React from 'react';

export const HeaderSection = () => (
  <div className="flex flex-col gap-4 justify-center items-center w-full py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-light-text dark:text-dark-text text-center">
            Essay <span className="relative inline-block">Builder<div className="absolute left-0 w-full h-2 sm:h-3 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-11/MNpgqFFWFV.png)] bg-cover bg-no-repeat" /></span>
          </h1>
        </div>
        <p className="font-['Outfit'] text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-light-text dark:text-dark-text text-center max-w-2xl px-4">
          By breaking down essays from past admits to your top choices, we&apos;ll
          guide you step by step in crafting one that gets attention.
        </p>
      </div>
);