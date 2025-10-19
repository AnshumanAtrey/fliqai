'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface CircularCarouselProps {
  diameter?: number;
  imageWidth?: number;
  imageHeight?: number;
  rotationSpeed?: number;
  imageBorderRadius?: number;
  images: string[];
}

export default function CircularCarousel({
  diameter = 1000,
  imageWidth = 128,
  imageHeight = 160,
  rotationSpeed = 40,
  imageBorderRadius = 12,
  images
}: CircularCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const rotationPerFrame = (2 * Math.PI) / (rotationSpeed * 60);

    const animate = () => {
      if (!isPausedRef.current) {
        setCurrentRotation((prev) => {
          let next = prev + rotationPerFrame;
          if (next >= 2 * Math.PI) {
            next -= 2 * Math.PI;
          }
          return next;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [rotationSpeed]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  const positionItems = () => {
    const numItems = images.length;
    const angleStep = (2 * Math.PI) / numItems;
    const radius = (diameter / 2) - (Math.max(imageWidth, imageHeight) / 2);

    return images.map((imageSrc, index) => {
      const initialAngle = angleStep * index;
      const currentAngle = initialAngle + currentRotation;

      const x = radius + radius * Math.cos(currentAngle);
      const y = radius + radius * Math.sin(currentAngle);

      return (
        <div
          key={index}
          className="absolute"
          style={{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
            borderRadius: `${imageBorderRadius}px`,
            left: `${x}px`,
            top: `${y}px`,
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden'
          }}
        >
          <Image
            src={imageSrc}
            alt={`Carousel item ${index + 1}`}
            width={imageWidth}
            height={imageHeight}
            className="w-full h-full object-cover"
          />
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={containerRef}
        className="relative"
        style={{
          width: `${diameter}px`,
          height: `${diameter}px`
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={carouselRef} className="relative w-full h-full">
          {positionItems()}
        </div>
        
        {/* Center circle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent border-2 border-gray-300/20"
          style={{
            width: `${diameter * 0.3}px`,
            height: `${diameter * 0.3}px`
          }}
        />
      </div>
    </div>
  );
}
