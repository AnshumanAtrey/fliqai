import Silk from "./Backgrounds/Silk/Silk";
import { WordRotate } from "./magicui/word-rotate";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full overflow-hidden">
      {/* Silk as background */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none bg-black">
        <Silk
          speed={5}
          scale={1}
          color="#1c1c1c"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      {/* Content above Silk */}
      <div className="flex flex-col items-center justify-center text-center px-4 max-w-l mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold gradient-text leading-snug mb-3">
          Unlock your college journey with <br />
          <span>
            <WordRotate
              className="text-2xl md:text-4xl font-bold gradient-text"
              words={["Personalized Roadmaps", "AI Insights", "Smart Matches", "Profile Analysis", "Admission Boost"]}
            />
          </span>
        </h1>
        <p className="text-sm md:text-sm text-stone-400 mb-7 max-w-lg">
          Fliq helps students get tailored college roadmaps by analyzing their unique profiles and matching them with the best-fit colleges using advanced AI. Increase your chances of admission with data-driven guidance every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
         
          <button className="px-4 py-2 rounded-md border border-white/30 text-white font-medium text-sm bg-white/10 hover:bg-white/20 transition">
          Try FliqAI Free
          </button>
        </div>
      </div>
    </div>
  );
}
