"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4500); // 4.5 seconds total

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-xl md:text-2xl font-medium text-stone-300 mb-2"
        >
          Fliq AI
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
          className="text-xs md:text-sm text-stone-500"
        >
          Road To Your Dream Collage
        </motion.div>
      </div>
    </motion.div>
  );
} 