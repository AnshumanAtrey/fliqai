"use client";

import React from "react";
import { motion } from "motion/react";

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
  { href: "#", label: "Pricing" },
  { href: "#", label: "Contact" },
];

const FooterSection = () => {
  return (
    <footer className="w-full bg-[#1a2a0a] text-white pt-16 pb-8">
      <div className="max-w-[1250px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-0 mb-12">
          {/* Left: Logo, description, newsletter */}
          <motion.div 
            className="md:w-1/3 flex flex-col gap-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="/vercel.svg" alt="FliqAI Logo" className="w-8 h-8" />
              <span className="text-2xl font-bold">FliqAI</span>
            </motion.div>
            <motion.p 
              className="text-gray-300 mb-4 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              FliqAI is your AI-powered college application platform that uses hyper-personalization to increase your admission chances.
            </motion.p>
            <motion.form 
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label htmlFor="newsletter" className="font-semibold">Stay updated with college application tips.</label>
              <div className="flex items-center bg-[#232f13] rounded-full overflow-hidden max-w-xs">
                <input
                  id="newsletter"
                  type="email"
                  placeholder="email@provider.com"
                  className="bg-transparent px-4 py-3 text-white flex-1 outline-none placeholder:text-gray-400"
                  required
                />
                <motion.button 
                  type="submit" 
                  className="bg-white text-black w-12 h-12 flex items-center justify-center rounded-full m-1 hover:bg-lime-400 transition"
                  whileHover={{ scale: 1.1, backgroundColor: "#a3e635" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">→</span>
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
          {/* Center: Main Links */}
          <motion.div 
            className="md:w-1/3 flex flex-col gap-2 md:items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h6 
              className="text-xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Quick Links
            </motion.h6>
            <ul className="flex flex-col gap-1">
              {mainLinks.map((link, idx) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
                >
                  <a href={link.href} className="text-gray-200 hover:text-lime-400 font-medium transition">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          {/* Right: Social Icons */}
          <motion.div 
            className="md:w-1/3 flex flex-col md:items-end gap-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.h6 
              className="text-xl font-bold mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Connect With Us
            </motion.h6>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#232f13] hover:bg-lime-400 rounded-full w-10 h-10 flex items-center justify-center transition"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.6 + (idx * 0.1) }}
                  whileHover={{ scale: 1.2, backgroundColor: "#a3e635", rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={social.icon} alt={social.label} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="border-t border-[#232f13] pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div>© {new Date().getFullYear()} FliqAI. All rights reserved.</div>
          <div>
            Empowering students to achieve their college dreams with AI
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection; 