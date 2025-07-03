"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="max-w-[1250px] mx-auto flex items-center justify-between px-8 py-4">
        <div className="text-2xl font-bold">
          <Link href="/">FliqAI</Link>
        </div>
        <div className="flex gap-8 items-center">
          <Link href="/" className="text-black hover:underline">Home</Link>
          <Link href="/about" className="text-black hover:underline">About</Link>
          <Link href="/pricing" className="text-black hover:underline">Pricing</Link>
          <Link href="/features" className="text-black hover:underline">Features</Link>
          <Link href="/blog" className="text-black hover:underline">Blog</Link>
          <Link href="/essay-writer" className="text-black hover:underline">Essay Writer</Link>
          <Link href="/smart-recommendation" className="text-black hover:underline">Smart Recommendation</Link>
          <Link href="/ai-roadmaps" className="text-black hover:underline">AI Roadmaps</Link>
        </div>
        <div>
          <Link
            href="/features"
            className="bg-black text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-900 transition"
          >
            Get Started
            <span className="ml-1">↗</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 