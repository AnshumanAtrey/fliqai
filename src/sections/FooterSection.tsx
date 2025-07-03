import React from "react";

const socialLinks = [
  {
    href: "https://facebook.com",
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/6796abae071435268a79f55f_FacebookLogo.svg",
    label: "Facebook",
  },
  {
    href: "https://instagram.com",
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/6796abae355f0e60ed8c5ab8_InstagramLogo.svg",
    label: "Instagram",
  },
  {
    href: "https://linkedin.com",
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/6796abd5e147649bdd9c4128_LinkedinLogo.svg",
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com",
    icon: "https://cdn.prod.website-files.com/6787a0ca9071ad357581470a/6796abaeef2c9fdb4c143db4_fi_5969020.svg",
    label: "Twitter",
  },
];

const mainLinks = [
  { href: "#", label: "Home" },
  { href: "#", label: "About" },
  { href: "#", label: "Features" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Pricing" },
];

const FooterSection = () => {
  return (
    <footer className="w-full bg-[#1a2a0a] text-white pt-16 pb-8">
      <div className="max-w-[1250px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-0 mb-12">
          {/* Left: Logo, description, newsletter */}
          <div className="md:w-1/3 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              <img src="/vercel.svg" alt="FliqAI Logo" className="w-8 h-8" />
              <span className="text-2xl font-bold">FliqAI</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-xs">FliqAI is your all-in-one AI platform for productivity, learning, and creativity.</p>
            <form className="flex flex-col gap-2">
              <label htmlFor="newsletter" className="font-semibold">Subscribe to newsletter.</label>
              <div className="flex items-center bg-[#232f13] rounded-full overflow-hidden max-w-xs">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="email@provider.com"
                  className="bg-transparent px-4 py-3 text-white flex-1 outline-none placeholder:text-gray-400"
                  required
                />
                <button type="submit" className="bg-white text-black w-12 h-12 flex items-center justify-center rounded-full m-1 hover:bg-lime-400 transition">
                  <span className="text-2xl">→</span>
                </button>
              </div>
            </form>
          </div>
          {/* Center: Main Links */}
          <div className="md:w-1/3 flex flex-col gap-2 md:items-center">
            <h6 className="text-xl font-bold mb-2">Main Pages</h6>
            <ul className="flex flex-col gap-1">
              {mainLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-200 hover:text-lime-400 font-medium transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Right: Social Icons */}
          <div className="md:w-1/3 flex flex-col md:items-end gap-6">
            <h6 className="text-xl font-bold mb-2">Connect</h6>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#232f13] hover:bg-lime-400 rounded-full w-10 h-10 flex items-center justify-center transition"
                  aria-label={social.label}
                >
                  <img src={social.icon} alt={social.label} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[#232f13] pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          <div>© {new Date().getFullYear()} FliqAI. All rights reserved.</div>
          <div>
            Made by <a href="https://fliqai.com" className="underline hover:text-lime-400">FliqAI Team</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection; 