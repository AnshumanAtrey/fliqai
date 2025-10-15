'use client';

import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';

export default function ThemeBackground() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={theme === 'dark' ? '/bg-black.svg' : '/bg-white.svg'}
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
