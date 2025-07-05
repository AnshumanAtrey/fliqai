"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

const plans = [
  {
    icon: "https://cdn.prod.website-files.com/6794f6c73a1878801060345a/67994f9be5c70fc684f5d206_Plan%20Icon.svg",
    name: "Starter Plan",
    price: { monthly: 29, yearly: 25 },
    features: [
      "AI college recommendations (up to 10 colleges)",
      "Basic admission roadmap",
      "1 essay evaluation",
      "Email support",
    ],
  },
  {
    icon: "https://cdn.prod.website-files.com/6794f6c73a1878801060345a/67994f5d29c5fdc5a5473e24_Plan%20Icon-IIsvg.svg",
    name: "Premium Plan",
    price: { monthly: 69, yearly: 60 },
    features: [
      "Unlimited college recommendations",
      "Detailed personalized roadmaps",
      "5 essay evaluations with detailed feedback",
      "Priority support & consultation",
    ],
  },
  {
    icon: "https://cdn.prod.website-files.com/6794f6c73a1878801060345a/67994ef87db63d83079ec8a0_Plan%20Icon-IIIsvg.svg",
    name: "Elite Plan",
    price: { monthly: 129, yearly: 110 },
    features: [
      "Everything in Premium",
      "Unlimited essay evaluations",
      "1-on-1 college application coaching",
      "Guaranteed admission strategy",
    ],
  },
];

const PricingSection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1250px] mx-auto px-4 md:px-8">
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
            Choose Your Path to<br />
            College <span className="relative inline-block">
              <span className="z-10 relative">Success</span>
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-lime-400 rounded z-0" style={{height:'6px',marginBottom:'-2px'}}></span>
            </span>
          </motion.h2>
          <motion.div 
            className="text-gray-600 text-base mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Flexible pricing plans designed to fit every student&apos;s college application journey.
          </motion.div>
        </motion.div>
        {/* Billing Toggle */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex bg-gray-100 rounded-lg overflow-hidden">
            <motion.button
              className={`px-6 py-2 font-semibold text-base transition-colors ${billing === "monthly" ? "bg-lime-400 text-black" : "text-gray-700"}`}
              onClick={() => setBilling("monthly")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button
              className={`px-6 py-2 font-semibold text-base transition-colors ${billing === "yearly" ? "bg-lime-400 text-black" : "text-gray-700"}`}
              onClick={() => setBilling("yearly")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yearly
            </motion.button>
          </div>
        </motion.div>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-start shadow-sm"
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + (idx * 0.2),
                ease: "easeOut"
              }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 + (idx * 0.2) }}
              >
                <img src={plan.icon} alt="icon" className="w-8 h-8" />
                <span className="font-semibold text-lg text-black">{plan.name}</span>
              </motion.div>
              <motion.div 
                className="flex items-end mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.4 + (idx * 0.2) }}
              >
                <span className="text-3xl font-bold text-black">${plan.price[billing]}</span>
                <span className="text-gray-400 ml-1">/month</span>
              </motion.div>
              <div className="w-full border-t border-gray-200 my-4"></div>
              <motion.div 
                className="mb-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.5 + (idx * 0.2) }}
              >
                <div className="font-semibold mb-2 text-gray-700">What&apos;s included:</div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center gap-2 text-gray-800"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: 0.6 + (idx * 0.2) + (i * 0.1) }}
                    >
                      <img
                        src="https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/67995391de1f0564894d7053_Pricing%20icon.svg"
                        alt="feature"
                        className="w-4 h-4"
                      />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.button 
                className="w-full mt-auto bg-gray-100 hover:bg-lime-400 hover:text-black text-gray-900 font-semibold py-3 rounded-xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.7 + (idx * 0.2) }}
                whileHover={{ scale: 1.05, backgroundColor: "#a3e635" }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 