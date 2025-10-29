import React from 'react';
import Image from 'next/image';

interface StudentSupportSectionProps {
  redirectUrl?: string;
}

const StudentSupportSection: React.FC<StudentSupportSectionProps> = ({ redirectUrl }) => {
  return (
    <section className="bg-light-bg dark:bg-dark-tertiary p-4 sm:p-6 border-2 border-black" style={{ boxShadow: '4px 4px 0 0 #000' }}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - 40% width on desktop */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-light-bg dark:bg-dark-tertiary">
              <div className="relative w-full h-48 sm:h-64 md:h-80 mb-4 sm:mb-6 overflow-hidden border-[1px] border-black">
                <Image
                  src="/Student-support-1.jpg"
                  alt="Pre-entry Support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-light-text dark:text-dark-text">Pre-entry Support</h3>
              <p className="text-sm sm:text-base text-light-p dark:text-dark-text mb-3 sm:mb-4">Our dedicated pre-entry support team is here to guide you through every step of your journey to joining our university. From application assistance to accommodation advice, we&apos;re here to help make your transition as smooth as possible.</p>
              <a 
                href={redirectUrl || "/support/pre-entry"} 
                target={redirectUrl ? "_blank" : "_self"}
                rel={redirectUrl ? "noopener noreferrer" : undefined}
                className="bg-[#FF9169] text-light-text inline-flex justify-center items-center px-3 py-2 text-xs sm:text-sm mt-4 font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors" 
                style={{ boxShadow: '4px 4px 0 0 #000' }}
              >
                Read more
              </a>
            </div>
          </div>

          {/* Right Column - 60% width on desktop */}
          <div className="w-full lg:w-[60%] space-y-4 sm:space-y-6">
            {[
              {
                title: "Health and Wellbeing Support",
                description: "We prioritize your mental and physical health with comprehensive support services including counseling, medical care, and wellness programs.",
                image: "/Student-support-2.jpg",
                link: redirectUrl || "/support/health"
              },
              {
                title: "Money Advice",
                description: "Expert financial guidance on tuition fees, scholarships, budgeting, and managing your finances while studying.",
                image: "/Student-support-3.jpg",
                link: redirectUrl || "/support/finance"
              },
              {
                title: "Accommodation Support",
                description: "Assistance with finding and securing comfortable, safe, and affordable housing options near campus.",
                image: "/Student-support-4.jpg",
                link: redirectUrl || "/support/accommodation"
              },
              {
                title: "Inclusion Support",
                description: "Dedicated services to support students with disabilities, learning differences, and additional needs.",
                image: "/Student-support-5.jpg",
                link: redirectUrl || "/support/inclusion"
              }
            ].map((item, index) => (
              <div key={index} className="bg-light-bg dark:bg-dark-tertiary flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 items-start">
                <div className="relative w-full sm:w-[150px] lg:w-[200px] h-[200px] sm:h-[150px] lg:h-[200px] flex-shrink-0 overflow-hidden border-[1px] border-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 text-light-text dark:text-dark-text break-words">{item.title}</h3>
                  <p className="text-light-p dark:text-dark-text mb-3 text-xs sm:text-sm break-words">{item.description}</p>
                  <a 
                    href={item.link} 
                    target={redirectUrl ? "_blank" : "_self"}
                    rel={redirectUrl ? "noopener noreferrer" : undefined}
                    className="bg-[#FF9169] text-light-text inline-flex justify-center items-center px-3 py-2 text-xs sm:text-sm font-medium border-2 border-black hover:bg-black hover:text-[#FF9169] transition-colors" 
                    style={{ boxShadow: '4px 4px 0 0 #000' }}
                  >
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
