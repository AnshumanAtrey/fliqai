"use client";

import React from "react";
import { motion } from "motion/react";

const HERO_BG = {
  backgroundColor: "#f5f5f5", // whitesmoke
  backgroundImage:
    "url(https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679940aef9deac5f8d104198_Trustify%20Hero%20Line.svg)",
  backgroundPosition: "0%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "auto",
};

const HeroSection = () => {
  return (
    <section
      className="w-full flex-1 flex items-center"
      style={HERO_BG}
    >
      <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-stretch justify-between px-8 pt-32 gap-12 w-full">
        {/* Left Content */}
        <motion.div 
          className="md:w-2/5 w-full flex flex-col gap-6 max-w-xl justify-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">AI-Powered</span>
            <span className="w-2 h-2 bg-black rounded-full"></span>
            <span className="text-gray-600 text-xs">4.9 Student Rating</span>
            <img src="/vercel.svg" alt="Rating" className="h-6 ml-2" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AI-Powered College Application Platform
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            We analyze your profile against our comprehensive college database to <strong>increase your admission chances by 60-80%</strong> with personalized roadmaps and AI-powered essay evaluation.
          </motion.p>
          <motion.a 
            href="#" 
            className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-900 transition mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
            <span className="ml-2">↗</span>
          </motion.a>
        </motion.div>
        {/* Right Image */}
        <motion.div 
          className="md:w-3/5 w-full flex items-end justify-center"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/68036155af99d97b1a3185c4_Safari%20(Big%20Sur)%20-%20Light-p-1080.webp"
            alt="College Application AI"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection; 