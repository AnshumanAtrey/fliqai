'use client';

import React from 'react';

// Demo testimonials. Replace avatar, name, role, and text with your user data.
const testimonials = [
  // -------- ROW 1 -----------
  {
    avatar: '/avatar1.jpg',
    name: 'John Doe',
    role: 'College Graduate',
    text: 'Using Fliq was a game-changer for my university applications. The AI recommendations helped me find the perfect programs and I crafted essays that truly represented my passion.'
  },
  {
    avatar: '/avatar2.jpg',
    name: 'Aisha Khan',
    role: 'Junior Year Student',
    text: 'Fliq’s features made navigating the university landscape so much easier. The insights into successful students gave me the motivation I needed to refine my applications.'
  },
  {
    avatar: '/avatar3.jpg',
    name: 'Aishwariya',
    role: 'College Grad',
    text: "I can&apos;t thank Fliq enough for their support. The AI-driven essay builder helped me articulate my story effectively, which made a huge difference in my acceptance."
  },
  // -------- ROW 2 -----------
  {
    avatar: '/avatar4.jpg',
    name: 'Sofia Reyes',
    role: 'College Grad',
    text: "Fliq was instrumental in my university search. The tailored recommendations and essay tips made me stand out in a crowded applicant pool."
  },
  {
    avatar: '/avatar5.jpg',
    name: 'Kreethi Kapoor',
    role: 'College Grad',
    text: "The personalized guidance from Fliq gave me clarity on my academic goals. I discovered universities I had never considered before, all thanks to their smart tools."
  },
  {
    avatar: '/avatar6.jpg',
    name: 'Kreethi Kapoor',
    role: 'College Grad',
    text: "The personalized guidance from Fliq gave me clarity on my academic goals. I discovered universities I had never considered before, all thanks to their smart tools."
  },
  // -------- ROW 3 -----------
  {
    avatar: '/avatar7.jpg',
    name: 'Anil Sharma',
    role: 'Senior Year Student',
    text: "The personalized guidance from Fliq gave me clarity on my academic goals. I discovered universities I had never considered before, all thanks to their smart tools."
  },
  {
    avatar: '/avatar8.jpg',
    name: 'Sarah Williams',
    role: 'Senior Year Student',
    text: "I can&apos;t thank Fliq enough for their support. The AI-driven essay builder helped me articulate my story effectively, which made a huge difference in my acceptance."
  },
  {
    avatar: '/avatar9.jpg',
    name: 'Ali Hamad',
    role: 'Senior Year Student',
    text: "I was blown away by how Fliq streamlined my application process. The insights into what worked for other successful students were invaluable."
  },
  // -------- ROW 4 -----------
  {
    avatar: '/avatar10.jpg',
    name: 'Anil Sharma',
    role: 'Senior Year Student',
    text: "The personalized guidance from Fliq gave me clarity on my academic goals. I discovered universities I had never considered before, all thanks to their smart tools."
  },
  {
    avatar: '/avatar11.jpg',
    name: 'Ayesha Latif',
    role: 'Senior Year Student',
    text: "I can&apos;t thank Fliq enough for their support. The AI-driven essay builder helped me articulate my story effectively, which made a huge difference in my acceptance."
  },
  {
    avatar: '/avatar12.jpg',
    name: 'Liam Johnson',
    role: 'Senior Year Student',
    text: "I was blown away by how Fliq streamlined my application process. The insights into what worked for other successful students were invaluable."
  }
];

export default function TestimonialWallSection() {
  return (
    <section className="w-full min-h-[600px] md:min-h-[950px] bg-[#FAF6F2] flex flex-col items-center pt-12 md:pt-[120px] pb-12 md:pb-[120px] px-4 md:px-[120px]">
      {/* Heading */}
      <h2 className="text-[#191919] font-outfit text-2xl md:text-[40px] font-bold leading-[110%] text-center mb-6 md:mb-9">
        We Could Brag, But It&apos;d Be<br/>Better If They Do
      </h2>
      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[20px] w-full max-w-[1440px]">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between h-full bg-[#F3EAE1] rounded-[12px] p-4 md:p-6 mx-auto w-full"
          >
            {/* Avatar, Name, Role */}
            <div className="flex flex-row items-center gap-3 mb-4">
              <div
                className="w-[56px] h-[56px] rounded-full bg-[#D9D9D9] flex-shrink-0 bg-center bg-cover"
                style={{
                  backgroundImage: `url(${t.avatar})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
              />
              <div className="flex flex-col">
                <span className="text-[#191919] font-outfit text-base md:text-[18px] font-semibold leading-[27px]">{t.name}</span>
                <span className="text-[#191919] font-outfit text-sm md:text-[16px] font-normal leading-[24px]">{t.role}</span>
              </div>
            </div>
            {/* Dashed line */}
            <div className="w-full border-t border-dashed border-[#191919] opacity-60 mb-4" />
            {/* Testimonial Text */}
            <div className="text-[#191919b3] font-outfit text-base md:text-[18px] font-normal leading-[27px] flex-grow">
              {t.text}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}