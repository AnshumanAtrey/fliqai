"use client";
import React, { useState } from "react";

const testimonials = [
  {
    quote:
      "Investing used to scare me. Now, I feel confident with their guidance. and Saved hundreds thanks to their budgeting tools. Feeling more secure.",
    name: "Geoffroy Uyttenhove",
    title: "Co-founder | Syndic4you",
    image:
      "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679d39a163db49711cf94a15_Slider%20Client%20Image.svg",
  },
  {
    quote:
      "At FliqAI we believe AI-powered productivity is within everyone's reach. Our platform is designed to simplify academic and creative work, empowering individuals and businesses.",
    name: "John Smith",
    title: "Co-founder | FliqAI",
    image:
      "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/679d39a14b23ef16d5ac58bd_Slider%20Client%20Image-2.svg",
  },
  {
    quote:
      "Our goal is to make AI tools accessible for everyone—whether you're writing essays, generating roadmaps, or planning your next project.",
    name: "Heensy Marsh",
    title: "Co-founder | FliqAI",
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
        <div className="bg-gray-50 rounded-2xl flex items-center justify-center min-w-[260px] md:w-1/3 py-16">
          <div className="flex flex-col items-center">
            <img src="/vercel.svg" alt="FliqAI Logo" className="w-12 h-12 mb-2" />
            <span className="text-2xl font-bold text-black">FliqAI</span>
          </div>
        </div>
        {/* Testimonial Card */}
        <div className="bg-[#1a2a0a] rounded-2xl flex-1 flex flex-col justify-between p-10 text-white min-h-[280px] relative">
          <div>
            <p className="italic text-2xl md:text-3xl font-medium mb-8">"{testimonials[current].quote}"</p>
            <div className="flex items-center gap-4 mt-8">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-lg">{testimonials[current].name}</div>
                <div className="text-gray-300 text-sm">{testimonials[current].title}</div>
              </div>
            </div>
          </div>
          {/* Arrows */}
          <div className="absolute bottom-8 right-8 flex gap-2">
            <button
              onClick={prev}
              className="bg-white/10 hover:bg-white/20 text-white rounded-lg w-10 h-10 flex items-center justify-center text-xl"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={next}
              className="bg-white/10 hover:bg-white/20 text-white rounded-lg w-10 h-10 flex items-center justify-center text-xl"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 