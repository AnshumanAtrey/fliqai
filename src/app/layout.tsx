import "./globals.css";
import Navbar from "../sections/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FliqAI",
  description: "FliqAI - All-in-one AI platform for productivity, learning, and creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
