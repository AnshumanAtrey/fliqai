import "./globals.css";
import Navbar from "../sections/Navbar";
import LoadingScreen from "./loadingscreen";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LoadingScreen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
