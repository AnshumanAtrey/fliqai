import React from "react";

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
        <div className="md:w-2/5 w-full flex flex-col gap-6 max-w-xl justify-center">
          <div className="flex items-center gap-3">
            <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">Powerful platform</span>
            <span className="w-2 h-2 bg-black rounded-full"></span>
            <span className="text-gray-600 text-xs">4.9 By Trustpilot</span>
            <img src="/vercel.svg" alt="Trustpilot" className="h-6 ml-2" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">All-in-One AI Academic Help System</h1>
          <p className="text-lg text-gray-700">We resolve <strong>60-80%</strong> of your academic and creative challenges with AI-powered tools, reducing your workload <strong>by over 50%</strong>.</p>
          <a href="#" className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-900 transition mt-2">
            Get Started
            <span className="ml-2">↗</span>
          </a>
        </div>
        {/* Right Image */}
        <div className="md:w-3/5 w-full flex items-end justify-center">
          <img
            src="https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/68036155af99d97b1a3185c4_Safari%20(Big%20Sur)%20-%20Light-p-1080.webp"
            alt="AI Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 