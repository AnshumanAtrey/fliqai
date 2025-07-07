import HeroSection from "../components/HeroSection";
import { TextReveal } from "../components/magicui/text-reveal";
import LoadingScreen from "./loadingscreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen flex flex-col">
        <HeroSection />
        <section className="w-full text-white">
          <TextReveal>
            Unlock AI-powered college roadmaps, personalized admission strategies, and data-driven college matches to boost your acceptance odds. Your profile is analyzed by AI for smarter college planning guidance every step of the way.
          </TextReveal>
        </section>
      </div>
    </>
  );
}
