import React from 'react';

interface DotPatternBackgroundProps {
  dotBg?: string;
  dotColor?: string;
  dotSize?: string;
  dotSpace?: string;
  children?: React.ReactNode;
  className?: string;
}

export const DotPatternBackground: React.FC<DotPatternBackgroundProps> = ({
  dotBg = 'var(--light-bg, #FFFBF1)',
  dotColor = 'var(--light-text, #000000)',
  dotSize = '1px',
  dotSpace = '22px',
  children,
  className = '',
}) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        '--dot-bg': dotBg,
        '--dot-color': dotColor,
        '--dot-size': dotSize,
        '--dot-space': dotSpace,
      } as React.CSSProperties}
    >
      <div 
        className="fixed inset-0 -z-10"
        style={{
          '--dot-size': dotSize,
          '--dot-space': dotSpace,
        } as React.CSSProperties}
      >
        <div className="fixed inset-0 -z-10 dark:hidden" style={{
          background: `linear-gradient(90deg, var(--light-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                      linear-gradient(var(--light-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                      var(--light-text)`,
          opacity: 0.1
        }} />
        <div className="fixed inset-0 -z-10 hidden dark:block" style={{
          background: `linear-gradient(90deg, var(--dark-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                      linear-gradient(var(--dark-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
                      var(--dark-text)`,
          opacity: 0.1
        }} />
      </div>
      {children}
    </div>
  );
};

export default DotPatternBackground;
