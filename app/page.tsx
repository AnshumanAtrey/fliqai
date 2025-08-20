import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center p-24">
      <div className="max-w-4xl w-full bg-light-secondary dark:bg-dark-secondary p-32 rounded-lg card">
        <div className="flex flex-col items-center gap-24">
          <div className="flex justify-center">
            <Image 
              src="/fliq-logo.svg" 
              alt="FliqAI Logo" 
              width={200} 
              height={80} 
              priority
            />
          </div>
          
          <div className="text-center">
            <h1>Welcome to FliqAI</h1>
            <p className="mt-16">Your college recommendation system with AI analysis</p>
          </div>
          
          <div className="flex gap-16">
            <Link 
              href="/login" 
              className="px-24 py-16 bg-accent text-white font-bold rounded-md card hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-24 py-16 border border-accent text-accent font-bold rounded-md card hover:bg-accent hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
