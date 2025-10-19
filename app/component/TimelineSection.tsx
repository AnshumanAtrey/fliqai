import React from 'react';

export const TimelineSection = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-[80px] max-w-7xl mx-auto border-b-[1px] border-t-[1px] border-light-text dark:border-dark-text">
      <h2 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-6 sm:mb-10">Timeline</h2>

      <div className="space-y-6">
        <p className="text-base sm:text-lg text-light-p dark:text-dark-text leading-relaxed max-w-full sm:max-w-[623px]">
          Top admits don’t stop at the minimum, they try to stretch as far as they can. Check the timeline below to spot the tests you can do to close the gap.
        </p>

        {/* Graph Container */}
        <div className="w-full h-64 sm:h-80 lg:h-96 flex items-center justify-center overflow-x-auto">
          <div className="main-container w-full max-w-[1120px] min-w-[800px] h-[177px] relative mx-auto my-0">
            <div className="w-[688px] h-[70px] relative z-[57] mt-0 mr-0 mb-0 ml-[28px]">
              <div className="flex w-[147px] h-[70px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] absolute top-0 left-[186px] z-[53]">
                <span className="flex w-[115px] h-[54px] justify-start items-start shrink-0 font-['Outfit'] text-[18px] font-semibold leading-[27px] text-light-text dark:text-dark-text relative text-left z-[54]">
                  AP Physics C AP Biology BC
                </span>
              </div>
              <div className="w-[188px] h-[70px] absolute top-0 left-[500px] z-[57]">
                <div className="flex w-[65px] h-[43px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] absolute top-[26px] left-0 z-[55]">
                  <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-semibold leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[56]">
                    SAT
                  </span>
                </div>
                <div className="flex w-[78px] h-[43px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] absolute top-[26px] left-[110px] z-[57]">
                  <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-semibold leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[58]">
                    IELTS
                  </span>
                </div>
              </div>
              <div className="flex w-[123px] h-[43px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] absolute top-[26px] left-0 z-[51]">
                <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-semibold leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[52]">
                  AP Calc BC
                </span>
              </div>
            </div>
            <div className="w-[588px] h-[40px] relative z-[62] mt-0 mr-0 mb-0 ml-[89px]">
              <div className="w-px h-[40px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/COHEOJUy9N.png)] bg-cover bg-no-repeat absolute top-0 left-[-1px] z-[59]" />
              <div className="w-px h-[40px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/o47ZsDos0j.png)] bg-cover bg-no-repeat absolute top-0 left-[197px] z-[60]" />
              <div className="w-px h-[40px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/ec8aqCEDxz.png)] bg-cover bg-no-repeat absolute top-0 left-[469px] z-[61]" />
              <div className="w-px h-[40px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/XRxxNpyrWs.png)] bg-cover bg-no-repeat absolute top-0 left-[587px] z-[62]" />
            </div>
            <div className="flex w-[1120px] flex-col items-center flex-nowrap relative mt-0 mr-0 mb-0 ml-0">
              <div className="h-px self-stretch shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/CPOytwcaQs.png)] bg-cover bg-no-repeat relative z-[1]" />
              <div className="flex w-[1096px] gap-[32px] items-center shrink-0 flex-nowrap relative z-[2]">
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[3]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/29f7FNZtFJ.png)] bg-cover bg-no-repeat relative z-[4]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[5]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[6]">
                      Jan
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[7]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/LdfEs8BXmT.png)] bg-cover bg-no-repeat relative z-[8]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[9]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-10">
                      Feb
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[11]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/9bhmZGNGJT.png)] bg-cover bg-no-repeat relative z-[12]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[13]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[14]">
                      Mar
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[15]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/12KNpRezqN.png)] bg-cover bg-no-repeat relative z-[16]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[17]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[18]">
                      Apr
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[19]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/RXjAtkSEnp.png)] bg-cover bg-no-repeat relative z-20" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[21]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[22]">
                      May
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[23]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/urZAY0Fm5x.png)] bg-cover bg-no-repeat relative z-[24]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[25]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[26]">
                      Jun
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[27]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/XMEbyBEVUS.png)] bg-cover bg-no-repeat relative z-[28]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[29]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-30">
                      Jul
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[31]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/BDWZEnoxMS.png)] bg-cover bg-no-repeat relative z-[32]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[33]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[34]">
                      Aug
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[35]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/BK7wme9YVY.png)] bg-cover bg-no-repeat relative z-[36]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[37]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[38]">
                      Sep
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[39]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/F8Du4U41zz.png)] bg-cover bg-no-repeat relative z-40" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[41]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[42]">
                      Oct
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[43]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/S2iANFHNLS.png)] bg-cover bg-no-repeat relative z-[44]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[45]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-[46]">
                      Nov
                    </span>
                  </div>
                </div>
                <div className="flex w-[62px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[47]">
                  <div className="w-px h-[16px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-09-27/P6Crn3a1UP.png)] bg-cover bg-no-repeat relative z-[48]" />
                  <div className="flex pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-light-bg dark:bg-dark-tertiary border-solid border border-[#000] relative z-[49]">
                    <span className="h-[27px] shrink-0 basis-auto font-['Outfit'] text-[18px] font-normal leading-[27px] text-light-text dark:text-dark-text relative text-left whitespace-nowrap z-50">
                      Dec
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
