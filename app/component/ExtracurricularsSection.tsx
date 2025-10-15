import React from 'react';
import Image from 'next/image';

type Status = 'positive' | 'negative' | 'neutral';

type ExtracurricularItem = {
  id: number;
  title: string;
  image: string;
  status: Status;
  statistic: string;
  userStatus: string;
  statusColor: string;
};

const ExtracurricularsSection = () => {
  const extracurriculars: ExtracurricularItem[] = [
    {
      id: 1,
      title: "Leadership",
      image: "/Leadership.jpg",
      status: "positive",
      statistic: "65% of admits at this university have moderate to exceptional leadership skills.",
      userStatus: "Your Leadership skills: Exceptional",
      statusColor: "text-green-600"
    },
    {
      id: 2,
      title: "Research",
      image: "/Research.jpg",
      status: "negative",
      statistic: "49% of admits at this university have moderate to exceptional research skills.",
      userStatus: "Your research skills: Below Average",
      statusColor: "text-red-600"
    },
    {
      id: 3,
      title: "Awards / Competitions",
      image: "/Awards.jpg",
      status: "positive",
      statistic: "23% of admits at this university have won 3 or more awards/competitions",
      userStatus: "Your awards: Above Average",
      statusColor: "text-green-600"
    },
    {
      id: 4,
      title: "Teamwork",
      image: "/Teamwork.jpg",
      status: "positive",
      statistic: "88% of admits at this university have moderate to exceptional teamwork skills.",
      userStatus: "Your Teamwork skills: Above Average",
      statusColor: "text-green-600"
    },
    {
      id: 5,
      title: "Creative Arts",
      image: "/Creative.jpg",
      status: "neutral",
      statistic: "32% of admits at this university have experience in the creative arts domain.",
      userStatus: "Your Creative Arts skills: Exceptional",
      statusColor: "text-green-600"
    },
    {
      id: 6,
      title: "Athletics",
      image: "/Athletic.jpg",
      status: "negative",
      statistic: "49% of admits at this university have moderate to exceptional research skills.",
      userStatus: "Your athletics involvement: Below Average",
      statusColor: "text-red-600"
    }
  ];

  type Status = 'positive' | 'negative' | 'neutral';

  const getStatusIcon = (status: Status): string => {
    if (status === "positive") return "✓";
    if (status === "negative") return "✕";
    return "";
  };

  const getStatusIconColor = (status: Status): string => {
    if (status === "positive") return "text-green-600";
    if (status === "negative") return "text-red-600";
    return "text-light-p dark:text-dark-text";
  };

  const getBorderColor = (status: Status): string => {
    if (status === "negative") return "border-red-500";
    return "border-black";
  };

  const getBoxShadow = (status: Status): string => {
    if (status === "negative") return "2px 2px 0 0 #ef4444";
    return "2px 2px 0 0 #000";
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-20 border-b-[1px] border-light-text dark:border-dark-text " style={{ margin: '56px'}}>
      <h2 className="text-[32px] font-bold text-light-text dark:text-dark-text mb-4">Extracurriculars</h2>
      <p className="text-light-p dark:text-dark-text mb-6">Here&apos;s how your extracurriculars stack against a typical graduate from this uni.</p>
      
      {/* 3x2 Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8 p-2">
        {extracurriculars.map((item) => (
          <div 
            key={item.id} 
            className={`border-[1px] ${getBorderColor(item.status)} bg-light-bg dark:bg-dark-tertiary w-[350px] h-[450px] p-2 flex flex-col gap-2`} 
            style={{ boxShadow: getBoxShadow(item.status) }}
          >
            {/* Image */}
            <div className="w-full h-[250px] mb-4 overflow-hidden border-[1px] border-black">
              <Image 
                src={item.image} 
                alt={item.title}
                width={320}
                height={250}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            {/* Title with Status Icon */}
            <div className="flex items-center gap-2 mb-1 ">
              <h3 className="text-lg font-bold text-light-text dark:text-dark-text">{item.title}</h3>
              <span className={`text-xl font-bold ${getStatusIconColor(item.status)}`}>
                {getStatusIcon(item.status)}
              </span>
            </div>
            
            {/* Statistics */}
            <p className="text-sm text-light-p dark:text-dark-text mb-1 leading-snug">
              {item.statistic}
            </p>
            
            {/* User Status */}
            <p className={`text-sm font-semibold ${item.statusColor} mt-1`}>
              {item.userStatus}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Case Study Card */}
      <div className="w-full border-[1px] border-black mt-6 p-4 bg-light-bg dark:bg-dark-tertiary" style={{ boxShadow: '4px 4px 0 0 #000' }}>
        <div className=" flex items-center gap-[75px]">
          {/* Left Image */}
          <div className="w-[350px] h-[350px] overflow-hidden flex-shrink-0">
            <Image 
              src="/maya.jpg"
              alt="Maya"
              width={350}
              height={350}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          
          {/* Right Content */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2 leading-tight">
              Worried about your lack of athletics involvement? Here&apos;s how Maya overcame it
            </h3>
            
            <p className="text-light-p dark:text-dark-text mb-4 leading-normal">
              Maya had the same problem as you when she was applying for Harvard. See what she did during his gap year to compensate for her lack of athletic involvement to strengthen his application and get in.
            </p>
            
            <div className="flex justify-start">
              <button className="bg-[#FF9169] hover:bg-black text-black hover:text-[#FF9169] font-semibold px-6 py-3 border-2 border-black transition-colors" style={{ boxShadow: '3px 3px 0 0 #000' }}>
                Read case study
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtracurricularsSection;