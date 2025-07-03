import React from "react";

const features = [
  {
    icon: "/file.svg",
    text: "No fees overhead or minimum balances",
  },
  {
    icon: "/window.svg",
    text: "Building and maintaining an AI fund",
  },
  {
    icon: "/globe.svg",
    text: "Life is unpredictable, but with robust AI tools",
  },
  {
    icon: "/vercel.svg",
    text: "Protect your peace of mind!",
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white py-20 pt-36">
      <div className="max-w-[1250px] mx-auto flex flex-col md:flex-row items-center justify-between px-8 gap-12">
        {/* Left Side */}
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Beyond The<br />
            Business <span className="relative inline-block">
              <span className="z-10 relative">Banking</span>
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-lime-400 rounded z-0" style={{height:'6px',marginBottom:'-2px'}}></span>
            </span><br />
            Basics things
          </h2>
          <p className="text-lg text-gray-700 max-w-md">Manage money, reach goals. Simple tools, expert guidance. Get started today!</p>
          <a href="#" className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-900 transition mt-2 w-max">
            Get Started
            <span className="ml-2">↗</span>
          </a>
        </div>
        {/* Right Side: Feature Table/Grid */}
        <div className="md:w-1/2 w-full flex items-center justify-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-6 bg-gray-50 rounded-2xl p-8 relative min-w-[340px] md:min-w-[420px] min-h-[340px] md:min-h-[420px]">
            {/* Feature Cards */}
            {features.map((feature, i) => (
              <div key={i} className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-6 text-center relative z-10">
                <img src={feature.icon} alt="icon" className="w-10 h-10 mb-3" />
                <div className="text-base font-medium text-black">{feature.text}</div>
              </div>
            ))}
            {/* Center Icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg flex items-center justify-center w-24 h-24 z-20 border-4 border-white">
              <img src="/window.svg" alt="center icon" className="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 