"use client";

import React from "react";
import { motion } from "motion/react";

const features = [
  {
    icon: "/file.svg",
    text: "AI-powered college recommendations based on your profile",
  },
  {
    icon: "/window.svg",
    text: "Personalized admission roadmaps to increase your chances",
  },
  {
    icon: "/globe.svg",
    text: "Comprehensive college database with real-time insights",
  },
  {
    icon: "/vercel.svg",
    text: "AI essay evaluation and improvement suggestions",
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white py-20 pt-36">
      <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-center justify-between px-8 gap-12">
        {/* Left Side */}
        <motion.div 
          className="md:w-1/2 w-full flex flex-col gap-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Beyond Traditional<br />
            College <span className="relative inline-block">
              <span className="z-10 relative">Applications</span>
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-lime-400 rounded z-0" style={{height:'6px',marginBottom:'-2px'}}></span>
            </span><br />
            With AI Intelligence
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get personalized college recommendations, strategic roadmaps, and AI-powered essay feedback to maximize your admission success.
          </motion.p>
          <motion.a 
            href="#" 
            className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-900 transition mt-2 w-max"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Features
            <span className="ml-2">↗</span>
          </motion.a>
        </motion.div>
        {/* Right Side: Feature Table/Grid */}
        <motion.div 
          className="md:w-1/2 w-full flex items-center justify-center"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-6 bg-gray-50 rounded-2xl p-8 relative min-w-[340px] md:min-w-[420px] min-h-[340px] md:min-h-[420px]">
            {/* Feature Cards */}
            {features.map((feature, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-6 text-center relative z-10"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.2 + (i * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <img src={feature.icon} alt="icon" className="w-10 h-10 mb-3" />
                <div className="text-base font-medium text-black">{feature.text}</div>
              </motion.div>
            ))}
            {/* Center Icon */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center w-24 h-24 z-20 border-4 border-white"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img src="/window.svg" alt="center icon" className="w-12 h-12" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 