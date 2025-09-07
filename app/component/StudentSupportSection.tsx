import React from 'react';
import Image from 'next/image';

const StudentSupportSection = () => {
  return (
    <section className="bg-white p-6 border-2 border-black" style={{ boxShadow: '4px 4px 0 0 #000' }}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - 60% width */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-white">
              <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden border-[1px] border-black">
                <Image
                  src="/Student-support-1.jpg"
                  alt="Pre-entry Support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black">Pre-entry Support</h3>
              <p className="text-gray-700 mb-4">Our dedicated pre-entry support team is here to guide you through every step of your journey to joining our university. From application assistance to accommodation advice, we&apos;re here to help make your transition as smooth as possible.</p>
              <a href="/support/pre-entry" className="bg-[#FF9169] text-black flex flex-row w-[100px] justify-between items-center gap-2 px-2 py-2 text-sm mt-4 font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                Read more
              </a>
            </div>
          </div>

          {/* Right Column - 40% width with flex layout */}
          <div className="w-full lg:w-[60%] space-y-6">
            {[
              {
                title: "Health and Wellbeing Support",
                description: "We prioritize your mental and physical health with comprehensive support services including counseling, medical care, and wellness programs.",
                image: "/Student-support-2.jpg",
                link: "/support/health"
              },
              {
                title: "Money Advice",
                description: "Expert financial guidance on tuition fees, scholarships, budgeting, and managing your finances while studying.",
                image: "/Student-support-3.jpg",
                link: "/support/finance"
              },
              {
                title: "Accommodation Support",
                description: "Assistance with finding and securing comfortable, safe, and affordable housing options near campus.",
                image: "/Student-support-4.jpg",
                link: "/support/accommodation"
              },
              {
                title: "Inclusion Support",
                description: "Dedicated services to support students with disabilities, learning differences, and additional needs.",
                image: "/Student-support-5.jpg",
                link: "/support/inclusion"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white flex flex-row gap-6 items-start">
                <div className="relative w-[200px] h-[200px] flex-shrink-0 overflow-hidden border-[1px] border-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-black">{item.title}</h3>
                  <p className="text-gray-700 mb-3 text-sm">{item.description}</p>
                  <a href={item.link} className="bg-[#FF9169] text-black w-[100px] inline-flex justify-center items-center gap-2 px-2 py-2 text-sm font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors" style={{ boxShadow: '4px 4px 0 0 #000' }}>
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentSupportSection;
