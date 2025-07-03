"use client";
import React, { useState } from "react";

const plans = [
  {
    icon: "https://cdn.prod.website-files.com/6794f6c73a1878801060345a/67994f9be5c70fc684f5d206_Plan%20Icon.svg",
    name: "Basic Plan",
    price: { monthly: 299, yearly: 280 },
    features: [
      "Basic budgeting tools",
      "Expense tracking",
      "Set up to 2 savings goals",
      "Connect up to 2 accounts",
    ],
  },
  {
    icon: "https://cdn.prod.website-files.com/6794f6c73a1878801060345a/67994f5d29c5fdc5a5473e24_Plan%20Icon-IIsvg.svg",
    name: "Essentials Plan",
    price: { monthly: 699, yearly: 650 },
    features: [
      "Unlimited account integrations",
      "Advanced budgeting and goal tracking",
      "Custom financial reports",
      "Shared budgets for families",
    ],
  },
  {
    icon: "https://cdn.prod.website-files.com/6794f6c73a1878801060345a/67994ef87db63d83079ec8a0_Plan%20Icon-IIIsvg.svg",
    name: "Professional Plan",
    price: { monthly: 999, yearly: 900 },
    features: [
      "Tax preparation tools",
      "Investment tracking and insights",
      "Role-based permissions for teams",
      "Priority customer support",
    ],
  },
];

const PricingSection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1250px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
            Find The Perfect Plan for<br />
            Your Financial <span className="relative inline-block">
              <span className="z-10 relative">Goals</span>
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-lime-400 rounded z-0" style={{height:'6px',marginBottom:'-2px'}}></span>
            </span>
          </h2>
          <div className="text-gray-600 text-base mt-2">
            At FliqAI we offer flexible pricing plans to suit your unique needs.
          </div>
        </div>
        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-lg overflow-hidden">
            <button
              className={`px-6 py-2 font-semibold text-base transition-colors ${billing === "monthly" ? "bg-lime-400 text-black" : "text-gray-700"}`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 font-semibold text-base transition-colors ${billing === "yearly" ? "bg-lime-400 text-black" : "text-gray-700"}`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col items-start shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <img src={plan.icon} alt="icon" className="w-8 h-8" />
                <span className="font-semibold text-lg text-black">{plan.name}</span>
              </div>
              <div className="flex items-end mb-4">
                <span className="text-3xl font-bold text-black">${plan.price[billing]}</span>
                <span className="text-gray-400 ml-1">/month</span>
              </div>
              <div className="w-full border-t border-gray-200 my-4"></div>
              <div className="mb-4 w-full">
                <div className="font-semibold mb-2 text-gray-700">What's included:</div>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-800">
                      <img
                        src="https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/67995391de1f0564894d7053_Pricing%20icon.svg"
                        alt="feature"
                        className="w-4 h-4"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full mt-auto bg-gray-100 hover:bg-lime-400 hover:text-black text-gray-900 font-semibold py-3 rounded-xl transition">
                Start Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 