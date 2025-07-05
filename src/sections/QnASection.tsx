"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "How does FliqAI's college recommendation system work?",
    answer:
      "Our AI analyzes your academic profile, extracurricular activities, test scores, and preferences against our comprehensive database of thousands of colleges to provide personalized recommendations that match your goals and increase your admission chances.",
  },
  {
    question: "What makes your admission roadmaps different from others?",
    answer:
      "Our roadmaps are hyper-personalized using AI that analyzes both your profile and specific college requirements. We provide step-by-step strategies tailored to maximize your chances of acceptance at your target universities.",
  },
  {
    question: "How accurate is the AI essay evaluation?",
    answer:
      "Our AI evaluates essays based on admission criteria from top universities, providing specific feedback on structure, content, and style. Students using our essay evaluation have seen a 60-80% improvement in their application success rates.",
  },
  {
    question: "Can I change my plan or cancel my subscription?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your subscription at any time. Your plan will remain active until the end of your billing cycle, and you can access all features until then.",
  },
];

const QnASection = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[900px] mx-auto px-4 md:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold leading-tight mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Everything You Need to <span className="relative inline-block">
              <span className="z-10 relative">Know</span>
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-lime-400 rounded z-0" style={{height:'6px',marginBottom:'-2px'}}></span>
            </span>
          </motion.h2>
          <motion.div 
            className="text-lime-900 text-base mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get answers to the most common questions about our AI-powered college application platform.
          </motion.div>
        </motion.div>
        <div className="flex flex-col gap-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-50 rounded-2xl px-8 py-6 cursor-pointer transition hover:bg-gray-100"
              onClick={() => setOpen(open === idx ? null : idx)}
              initial={{ opacity: 0, y: 50, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + (idx * 0.1),
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between">
                <motion.span 
                  className="text-lg font-semibold text-black"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
                >
                  {idx + 1}. {faq.question}
                </motion.span>
                <motion.span 
                  className="text-2xl text-gray-400"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
                  animate={{ rotate: open === idx ? 180 : 0 }}
                >
                  {open === idx ? "−" : "+"}
                </motion.span>
              </div>
              <AnimatePresence>
                {open === idx && (
                  <motion.div 
                    className="mt-4 text-gray-700 text-base"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QnASection; 