export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Choose the Right Plan for You</h1>
      <p className="text-lg text-center text-lime-900 mb-8 max-w-2xl">
        Discover flexible pricing options designed to fit your needs and help you get the most out of FliqAI's powerful features.
      </p>
      <a
        href="#"
        className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-900 transition"
      >
        Get Started
        <span className="ml-2">↗</span>
      </a>
    </div>
  );
} 