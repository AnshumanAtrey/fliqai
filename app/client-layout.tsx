'use client';

import { useEffect } from 'react';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // This runs only on the client side after hydration
    const cleanUpAttributes = () => {
      // Remove common extension-added attributes
      document.body.removeAttribute('__processed_9bc19447-f698-4569-880b-328ea799f86e__');
      document.body.removeAttribute('bis_register');
      // Add any other extension-specific attributes you find in the error
    };

    // Run cleanup after a short delay to ensure extensions have run
    const timer = setTimeout(cleanUpAttributes, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
    </>
  );
}
