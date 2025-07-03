import React from "react";

const bentoFeatures = [
  {
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba2d68ccf6d458f1cba91_Feature%20Top%20Icon.svg",
    title: "Custom and design your card, make it unique",
    desc: "Track your spending and income: Gain valuable insights into your financial habits.",
    image: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/67f648b4722ae1b3ebe5f0fd_card.png",
  },
  {
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba2d627842bdba0691636_Feature%20Top%20Icon-2.svg",
    title: "Personalized your financial insights and goals",
    desc: "Track your spending and income: Gain valuable insights into your financial habits.",
    image: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba6988ba3ecd1b14055e5_Features%20Image.svg",
  },
  {
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba2d60261c2a128dd8c3f_Feature%20Top%20Icon-3.svg",
    title: "Free transfer anywhere around the world",
    desc: "Feeling overwhelmed with you. We know, That's why we offer a suite ok.",
    image: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679ba790c6c50edb0d759bf3_Feature%20Image-3.jpg",
  },
];

const BentoFeaturesSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1250px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
            Feel The Best Experience<br />
            With Our <span className="relative inline-block">
              <span className="z-10 relative">Features</span>
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-lime-400 rounded z-0" style={{height:'6px',marginBottom:'-2px'}}></span>
            </span>
          </h2>
          <div className="text-gray-600 text-base">
            Manage money, reach goals. Simple tools, expert guidance.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Left Card */}
          <div className="bg-gray-50 rounded-2xl flex flex-col">
            <div className="p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <img src={bentoFeatures[0].icon} alt="icon" className="w-14 h-14" />
              </div>
              <h4 className="text-xl font-semibold mb-1">{bentoFeatures[0].title}</h4>
              <p className="text-gray-600 text-base mb-4">{bentoFeatures[0].desc}</p>
            </div>
            <div className="w-full flex-1 flex items-end">
              <img src={bentoFeatures[0].image} alt="feature" className="w-full object-cover rounded-b-2xl" style={{maxHeight: 200}} />
            </div>
          </div>
          {/* Top Right Card */}
          <div className="bg-gray-50 rounded-2xl flex flex-col">
            <div className="p-8 flex flex-col gap-4 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <img src={bentoFeatures[1].icon} alt="icon" className="w-14 h-14" />
              </div>
              <h4 className="text-xl font-semibold mb-1">{bentoFeatures[1].title}</h4>
              <p className="text-gray-600 text-base mb-4">{bentoFeatures[1].desc}</p>
            </div>
            <div className="w-full flex-1 flex items-end">
              <img src={bentoFeatures[1].image} alt="feature" className="w-full object-cover rounded-b-2xl" style={{maxHeight: 200}} />
            </div>
          </div>
          {/* Bottom Card spanning both columns, text left, image right */}
          <div className="bg-gray-50 rounded-2xl flex flex-col md:col-span-2 mt-0">
            <div className="flex flex-col md:flex-row h-full">
              {/* Text Side */}
              <div className="p-8 flex flex-col gap-4 flex-1 justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <img src={bentoFeatures[2].icon} alt="icon" className="w-14 h-14" />
                </div>
                <h4 className="text-xl font-semibold mb-1">{bentoFeatures[2].title}</h4>
                <p className="text-gray-600 text-base mb-4">{bentoFeatures[2].desc}</p>
              </div>
              {/* Image Side */}
              <div className="flex-1 flex items-center justify-center p-4">
                <img src={bentoFeatures[2].image} alt="feature" className="w-full h-full object-contain rounded-2xl" style={{maxHeight: 320}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeaturesSection; 