import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-pattern flex flex-col items-center justify-center p-24">
      <div className="max-w-md w-full bg-light-secondary dark:bg-dark-secondary p-32 rounded-lg card">
        <div className="flex flex-col items-center gap-24">
          <Link href="/" className="flex items-center gap-8">
            <Image 
              src="/back.svg" 
              alt="Back" 
              width={24} 
              height={24} 
            />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex justify-center">
            <Image 
              src="/fliq-logo.svg" 
              alt="FliqAI Logo" 
              width={150} 
              height={60} 
              priority
            />
          </div>
          
          <div className="text-center w-full">
            <h2>Login</h2>
            <p className="mt-8">Sign in to your account</p>
          </div>
          
          <form className="w-full space-y-16">
            <div className="space-y-8">
              <label className="block text-paragraph">
                Email
                <input 
                  type="email" 
                  className="w-full mt-8 p-16 border border-black rounded-md bg-transparent" 
                  placeholder="Enter your email"
                  required
                />
              </label>
              
              <label className="block text-paragraph">
                Password
                <input 
                  type="password" 
                  className="w-full mt-8 p-16 border border-black rounded-md bg-transparent" 
                  placeholder="Enter your password"
                  required
                />
              </label>
            </div>
            
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-accent hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-16 bg-accent text-white font-bold rounded-md card hover:opacity-90 transition-opacity"
            >
              Login
            </button>
            
            <div className="text-center">
              <p>
                Don't have an account?{" "}
                <Link href="/signup" className="text-accent hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}