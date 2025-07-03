"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
  },
  {
    question: "What is your cancellation Policy?",
    answer:
      "You can cancel your subscription at any time. Your plan will remain active until the end of your billing cycle.",
  },
  {
    question: "Is there any free trial available?",
    answer:
      "Yes, we offer a 14-day free trial for all new users. No credit card required.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "Yes, you can add custom information to your invoices from your billing settings.",
  },
];

const QnASection = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[900px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
            Answers For Easy <span className="relative inline-block">
              <span className="z-10 relative">Understand</span>
              <span className="absolute left-0 right-0 bottom-0 h-1 bg-lime-400 rounded z-0" style={{height:'6px',marginBottom:'-2px'}}></span>
            </span>
          </h2>
          <div className="text-lime-900 text-base mt-2">
            Manage money, reach goals. Simple tools, expert guidance.
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl px-8 py-6 cursor-pointer transition hover:bg-gray-100"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-black">
                  {idx + 1}. {faq.question}
                </span>
                <span className="text-2xl text-gray-400">
                  {open === idx ? "−" : "+"}
                </span>
              </div>
              {open === idx && (
                <div className="mt-4 text-gray-700 text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QnASection; 