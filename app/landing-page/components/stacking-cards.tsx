'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// ============================================
// CONFIGURATION - CHANGE VALUES HERE
// ============================================
const SCALE_FACTOR = 0.95; // Change: Scale down factor for stacked cards (0.9-0.99)
// ============================================

interface ContainerScrollProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

interface StackingCardProps extends React.HTMLProps<HTMLDivElement> {
  index: number;
  baseTop?: number;
  children: React.ReactNode;
}

const ContainerScroll = React.forwardRef<HTMLDivElement, ContainerScrollProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative w-full', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContainerScroll.displayName = 'ContainerScroll';

const StackingCard = React.forwardRef<HTMLDivElement, StackingCardProps>(
  ({ baseTop = 80, children, className, style, ...props }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [scale, setScale] = React.useState(1);

    React.useEffect(() => {
      const handleScroll = () => {
        const card = cardRef.current;
        if (!card) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top + scrollTop;
        const stickyTop = baseTop;

        // Calculate how much the card has scrolled past its sticky position
        const scrolled = scrollTop - (cardTop - stickyTop);

        if (scrolled > 0) {
          // Card is in sticky position
          const cards = Array.from(
            card.parentElement?.querySelectorAll('[data-stacking-card]') || []
          ) as HTMLElement[];
          const nextCard = cards[cards.indexOf(card) + 1];

          if (nextCard) {
            const nextCardRect = nextCard.getBoundingClientRect();
            const nextCardTop = nextCardRect.top + scrollTop;
            const distanceToNext = nextCardTop - scrollTop - stickyTop;

            if (distanceToNext < card.offsetHeight) {
              // Calculate scale based on distance to next card
              const progress = Math.max(0, distanceToNext / card.offsetHeight);
              const newScale = 1 - ((1 - SCALE_FACTOR) * (1 - progress));
              setScale(newScale);
            } else {
              setScale(1);
            }
          } else {
            setScale(1);
          }
        } else {
          setScale(1);
        }
      };

      window.addEventListener('scroll', handleScroll);
      // Initial call
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [baseTop]);

    // Merge refs
    React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    return (
      <div
        ref={cardRef}
        data-stacking-card
        className={cn('sticky', className)}
        style={{
          top: baseTop,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          transition: 'transform 0.1s ease-out',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StackingCard.displayName = 'StackingCard';

export { ContainerScroll, StackingCard };
