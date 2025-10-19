import { UnderlineSvg } from '../assets/UnderlineSvg';

export function HeroSection() {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <h1 className="text-light-text dark:text-dark-text font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
        <span className="block sm:inline">Find your type of</span>
        <span className="block sm:inline sm:ml-2">university</span>
      </h1>
      {/* SVG Underline - Smaller on mobile */}
      <div className="flex justify-center mb-4">
        <div className="scale-75 sm:scale-100">
          <UnderlineSvg />
        </div>
      </div>
      <p className="text-light-text dark:text-dark-text text-center font-outfit text-base sm:text-lg font-normal leading-[160%] mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        Big names, serene location, killer societies - whatever you&apos;re looking for, we&apos;ve got a uni for that. Browse by course, location, or pure vibes, your call.
      </p>
    </div>
  );
}