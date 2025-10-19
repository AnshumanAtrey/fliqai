'use client';

import React, { useState } from 'react';

// Up/down arrow SVG (use rotation for toggle)
const ArrowIcon = ({ open }: { open: boolean }) => (
  <div className="flex p-2 items-center gap-2 rounded-lg bg-[#E7D3C1]">
    {open ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M15.668 7.83297L8.91797 1.08297C8.81345 0.978088 8.68926 0.894873 8.55251 0.838093C8.41577 0.781311 8.26916 0.752081 8.12109 0.752081C7.97303 0.752081 7.82642 0.781311 7.68967 0.838093C7.55293 0.894873 7.42873 0.978088 7.32422 1.08297L0.574217 7.83297C0.362873 8.04431 0.244141 8.33096 0.244141 8.62984C0.244141 8.92873 0.362873 9.21537 0.574217 9.42672C0.785562 9.63806 1.07221 9.75679 1.37109 9.75679C1.66998 9.75679 1.95662 9.63806 2.16797 9.42672L6.99703 4.59766V18.3789C6.99703 18.6773 7.11556 18.9634 7.32653 19.1744C7.53751 19.3854 7.82366 19.5039 8.12203 19.5039C8.4204 19.5039 8.70655 19.3854 8.91752 19.1744C9.1285 18.9634 9.24703 18.6773 9.24703 18.3789V4.59766L14.0761 9.42766C14.2874 9.639 14.5741 9.75773 14.873 9.75773C15.1719 9.75773 15.4585 9.639 15.6698 9.42766C15.8812 9.21631 15.9999 8.92967 15.9999 8.63078C15.9999 8.3319 15.8812 8.04525 15.6698 7.83391L15.668 7.83297Z" fill="#191919"/>
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
        <path d="M15.668 11.6709L8.91797 18.4209C8.81345 18.5258 8.68926 18.609 8.55251 18.6658C8.41577 18.7226 8.26916 18.7518 8.12109 18.7518C7.97303 18.7518 7.82642 18.7226 7.68967 18.6658C7.55293 18.609 7.42873 18.5258 7.32422 18.4209L0.574217 11.6709C0.362873 11.4596 0.244141 11.1729 0.244141 10.8741C0.244141 10.5752 0.362873 10.2885 0.574217 10.0772C0.785562 9.86584 1.07221 9.74711 1.37109 9.74711C1.66998 9.74711 1.95662 9.86584 2.16797 10.0772L6.99703 14.9062V1.125C6.99703 0.826631 7.11556 0.540483 7.32653 0.329505C7.53751 0.118526 7.82366 0 8.12203 0C8.4204 0 8.70655 0.118526 8.91752 0.329505C9.1285 0.540483 9.24703 0.826631 9.24703 1.125V14.9062L14.0761 10.0763C14.2874 9.86491 14.5741 9.74617 14.873 9.74617C15.1719 9.74617 15.4585 9.86491 15.6698 10.0763C15.8812 10.2876 15.9999 10.5742 15.9999 10.8731C15.9999 11.172 15.8812 11.4587 15.6698 11.67L15.668 11.6709Z" fill="#191919"/>
      </svg>
    )}
  </div>
);

const faqs = [
  {
    q: "How Does Fliq Personalize My Experience?",
    a: "Fliq uses your profile and academic interests to match you with the best-fit schools, offering step-by-step playbooks for each application."
  },
  {
    q: "Can Fliq Really Improve My Chances Of Getting In?",
    a: "Fliq doesn't guarantee admission (no one can), but it shows you what worked for students who got accepted, helps you avoid common mistakes, and gives you a clear roadmap to follow."
  },
  {
    q: "Who Is Fliq For?",
    a: "Fliq is for any student looking for practical, data-driven guidance to maximize their application success."
  },
  {
    q: "How Is Fliq Different To Other Admission Tools?",
    a: "Fliq delivers actionable insights using thousands of successful admit data, not just generic advice or broad stats."
  },
  {
    q: "Do I Need To Pay To Use Fliq?",
    a: "Fliq offers free resources plus optional paid features for deeper personalization and analytics."
  },
];

export default function FaqAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#FAF6F2] flex flex-col items-center justify-center py-12 md:py-[120px] px-4 md:px-[24px]">
      <h2 className="text-[#191919] font-outfit text-2xl md:text-[40px] font-bold text-center leading-[110%] mb-6 md:mb-[44px]">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col w-full max-w-[700px] gap-4 md:gap-[18px] mx-auto">
        {faqs.map((faq, idx) => {
          const open = openIndex === idx;
          return (
            <div
              key={idx}
              className={`bg-[#F3EAE1] rounded-[16px] px-4 md:px-6 py-3 md:py-4 transition-all flex flex-col
                ${open ? 'shadow-md' : ''}`}
            >
              <button
                className="flex items-center justify-between gap-4 w-full"
                onClick={() => setOpenIndex(open ? null : idx)}
                aria-expanded={open}
                style={{ cursor: 'pointer' }}
              >
                <span className="text-[#191919] font-outfit text-base md:text-[18px] font-semibold leading-[26px] text-left">
                  {faq.q}
                </span>
                <span>
                  <ArrowIcon open={open} />
                </span>
              </button>
              {open && (
                <div className="pt-4 pl-1 pr-2 pb-1 text-[#191919b3] font-outfit text-base md:text-[17px] font-normal leading-[150%] border-t border-[#e3dfdc] mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}