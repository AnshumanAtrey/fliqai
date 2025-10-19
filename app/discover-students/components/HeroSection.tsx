import { ScoopUnderlineSvg } from '../assets/ScoopUnderlineSvg';

export function HeroSection() {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <h1 className="text-light-text dark:text-dark-text font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        Get in the <span className="relative inline-block">scoop
          <ScoopUnderlineSvg />
        </span>
      </h1>
      <p className="text-light-text dark:text-dark-text text-center font-outfit text-base sm:text-lg font-normal leading-[160%] mb-6 sm:mb-8 max-w-[600px] mx-auto px-4">
        Want to know what a winning uni application looks like? These students nailed it,
        and now it&apos;s your turn. Dive in and learn from the best.
      </p>
    </div>
  );
}