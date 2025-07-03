import Navbar from "../sections/Navbar";
import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import BentoFeaturesSection from "../sections/BentoFeaturesSection";
import TestimonialSection from "../sections/TestimonialSection";
import PricingSection from "../sections/PricingSection";
import QnASection from "../sections/QnASection";
import FooterSection from "../sections/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <BentoFeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <QnASection />
      <FooterSection />
    </div>
  );
}
