"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    quote:
      "FliqAI helped me get into my dream university! Their AI recommendations were spot-on, and the personalized roadmap made the application process so much easier. I increased my admission chances significantly.",
    name: "Sarah Johnson",
    title: "Accepted to Stanford University",
    image:
      "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679d39a163db49711cf94a15_Slider%20Client%20Image.svg",
  },
  {
    quote:
      "At FliqAI, we believe every student deserves personalized guidance for their college journey. Our AI platform analyzes thousands of data points to provide hyper-personalized recommendations that truly work.",
    name: "Dr. Michael Chen",
    title: "Co-founder | FliqAI",
    image:
      "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679d39a14b23ef16d5ac58bd_Slider%20Client%20Image-2.svg",
  },
  {
    quote:
      "The AI essay evaluation feature is incredible! It gave me specific feedback that helped me improve my personal statement. I got accepted to 5 out of 6 universities I applied to.",
    name: "Alex Rodriguez",
    title: "Accepted to MIT, UC Berkeley, UCLA",
    image:
      "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679d39a2c5d7efb071b33e04_Slider%20Client%20image-3.svg",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="w-full flex justify-center py-20">
      <div className="max-w-[1250px] w-full flex flex-col md:flex-row gap-8 px-4 md:px-8">
        {/* Logo Card */}
        <motion.div 
          className="bg-gray-50 rounded-2xl flex items-center justify-center min-w-[260px] md:w-1/3 py-16"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/vercel.svg" alt="FliqAI Logo" className="w-12 h-12 mb-2" />
            <span className="text-2xl font-bold text-black">FliqAI</span>
          </motion.div>
        </motion.div>
        {/* Testimonial Card */}
        <motion.div 
          className="bg-[#1a2a0a] rounded-2xl flex-1 flex flex-col justify-between p-10 text-white min-h-[280px] relative"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
        >
          <div>
            <AnimatePresence mode="wait">
              <motion.p 
                key={current}
                className="italic text-2xl md:text-3xl font-medium mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                &ldquo;{testimonials[current].quote}&rdquo;
              </motion.p>
            </AnimatePresence>
            <motion.div 
              className="flex items-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-12 h-12 rounded-full object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
              />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="font-bold text-lg">{testimonials[current].name}</div>
                <div className="text-gray-300 text-sm">{testimonials[current].title}</div>
              </motion.div>
            </motion.div>
          </div>
          {/* Arrows */}
          <motion.div 
            className="absolute bottom-8 right-8 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              onClick={prev}
              className="bg-white/10 hover:bg-white/20 text-white rounded-lg w-10 h-10 flex items-center justify-center text-xl"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.button>
            <motion.button
              onClick={next}
              className="bg-white/10 hover:bg-white/20 text-white rounded-lg w-10 h-10 flex items-center justify-center text-xl"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection; 