"use client";

import React from "react";
import { motion } from "motion/react";

const bentoFeatures = [
  {
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba2d68ccf6d458f1cba91_Feature%20Top%20Icon.svg",
    title: "AI-Powered College Recommendations",
    desc: "Our AI analyzes your academic profile, extracurriculars, and preferences against our comprehensive college database to suggest the best-fit universities for your goals.",
    image: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/67f648b4722ae1b3ebe5f0fd_card.png",
  },
  {
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba2d627842bdba0691636_Feature%20Top%20Icon-2.svg",
    title: "Personalized Admission Roadmaps",
    desc: "Get customized step-by-step roadmaps that analyze both your profile and target college requirements to maximize your admission chances.",
    image: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba6988ba3ecd1b14055e5_Features%20Image.svg",
  },
  {
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba2d60261c2a128dd8c3f_Feature%20Top%20Icon-3.svg",
    title: "AI Essay Evaluation & Feedback",
    desc: "Upload your college essays and receive detailed AI-powered feedback with specific suggestions to improve your writing and increase your chances of acceptance.",
    image: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba790c6c50edb0d759bf3_Feature%20Image-3.jpg",
  },
];

const BentoFeaturesSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1250px] mx-auto px-8">
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
            Experience The Future of<br />
            College <span className="relative inline-block">
              <span className="z-10 relative">Applications</span>
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-lime-400 rounded z-0" style={{height:'6px',marginBottom:'-2px'}}></span>
            </span>
          </motion.h2>
          <motion.div 
            className="text-gray-600 text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hyper-personalized AI tools designed to increase your admission success rate.
          </motion.div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Left Card */}
          <motion.div 
            className="bg-gray-50 rounded-2xl flex flex-col"
            initial={{ opacity: 0, x: -100, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -10 }}
          >
            <div className="p-8 flex flex-col gap-4 flex-1">
              <motion.div 
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img src={bentoFeatures[0].icon} alt="icon" className="w-14 h-14" />
              </motion.div>
              <motion.h4 
                className="text-xl font-semibold mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {bentoFeatures[0].title}
              </motion.h4>
              <motion.p 
                className="text-gray-600 text-base mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {bentoFeatures[0].desc}
              </motion.p>
            </div>
            <motion.div 
              className="w-full flex-1 flex items-end"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <img src={bentoFeatures[0].image} alt="feature" className="w-full object-cover rounded-b-2xl" style={{maxHeight: 200}} />
            </motion.div>
          </motion.div>
          {/* Top Right Card */}
          <motion.div 
            className="bg-gray-50 rounded-2xl flex flex-col"
            initial={{ opacity: 0, x: 100, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -10 }}
          >
            <div className="p-8 flex flex-col gap-4 flex-1">
              <motion.div 
                className="flex items-center gap-3 mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img src={bentoFeatures[1].icon} alt="icon" className="w-14 h-14" />
              </motion.div>
              <motion.h4 
                className="text-xl font-semibold mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {bentoFeatures[1].title}
              </motion.h4>
              <motion.p 
                className="text-gray-600 text-base mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {bentoFeatures[1].desc}
              </motion.p>
            </div>
            <motion.div 
              className="w-full flex-1 flex items-end"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <img src={bentoFeatures[1].image} alt="feature" className="w-full object-cover rounded-b-2xl" style={{maxHeight: 200}} />
            </motion.div>
          </motion.div>
          {/* Bottom Card spanning both columns, text left, image right */}
          <motion.div 
            className="bg-gray-50 rounded-2xl flex flex-col md:col-span-2 mt-0"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ y: -10 }}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Text Side */}
              <motion.div 
                className="p-8 flex flex-col gap-4 flex-1 justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div 
                  className="flex items-center gap-3 mb-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <img src={bentoFeatures[2].icon} alt="icon" className="w-14 h-14" />
                </motion.div>
                <motion.h4 
                  className="text-xl font-semibold mb-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {bentoFeatures[2].title}
                </motion.h4>
                <motion.p 
                  className="text-gray-600 text-base mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {bentoFeatures[2].desc}
                </motion.p>
              </motion.div>
              {/* Image Side */}
              <motion.div 
                className="flex-1 flex items-center justify-center p-4"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <img src={bentoFeatures[2].image} alt="feature" className="w-full h-full object-contain rounded-2xl" style={{maxHeight: 320}} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeaturesSection; 