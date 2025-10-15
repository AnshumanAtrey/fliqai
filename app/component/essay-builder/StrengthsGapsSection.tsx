import React from 'react';

export const StrengthsGapsSection = () => {
  const characteristics = [
    ["Resilience", "Leadership", "Curiosity", "Motivated"],
    ["Collaboration", "Impact", "Empathy", "Authenticity"],
  ];

  return (
    <div className="absolute w-[477px] top-[40px] left-[40px]">
      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col items-start self-stretch w-full gap-2">
          <h1 className="self-stretch mt-[-1.00px] [font-family:'Outfit-SemiBold',Helvetica] font-semibold text-black text-2xl tracking-[0] leading-[normal]">
            How an Adcom officer might read this essay
          </h1>
          <p className="self-stretch [font-family:'Outfit-Regular',Helvetica] font-normal text-[#5d5237] text-base tracking-[0] leading-6">
            These are the characteristics an admissions officer might perceive you
            to have based on your current essay draft.
          </p>
        </div>

        <div className="flex flex-col w-[443px] items-start gap-2">
          {characteristics.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`${rowIndex === 0 ? "flex items-center self-stretch w-full gap-2" : "inline-flex items-center gap-2"}`}
            >
              {row.map((characteristic, index) => (
                <div
                  key={index}
                  className={`flex w-[120px] items-center justify-center px-4 py-1 bg-[#ffc3a9] border border-solid border-black gap-2 ${rowIndex === 0 && index === 3 ? "ml-[-61.00px]" : ""}`}
                >
                  <div className={`relative w-fit mt-[-1.00px] ${characteristic === "Collaboration" ? "ml-[-2.00px] mr-[-2.00px]" : ""} [font-family:'Outfit-Regular',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[22.5px] whitespace-nowrap`}>
                    {characteristic}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-gray-200 my-4"></div>

        <div className="flex flex-col gap-2 w-full">
          <h2 className="text-lg font-semibold text-black">Essay Analysis</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span>📝</span>
              </div>
              <div>
                <h3 className="font-medium text-black">Word Count</h3>
                <p className="text-sm text-gray-600">Your essay is 0 words long</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
