import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ComputersCanvas } from "./canvas";
import { styles } from "../styles";
import { cn } from "../utils/lib";

const ROLES = [
  "a Full-Stack Developer",
  "a Software Engineer",
  "a React & Next.js Expert",
  "a Web Application Architect",
];

// Hero
export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = ROLES[roleIndex];

    // If fully typed, pause so the visitor can comfortably read it
    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    // If fully erased, pause briefly then move to the next title
    if (isDeleting && subIndex === 0) {
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 300);
      return () => clearTimeout(pauseTimeout);
    }

    // Typing / Erasing interval speed
    const speed = isDeleting ? 45 : 90;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, roleIndex]);

  const displayedRole = ROLES[roleIndex].substring(0, subIndex);

  return (
    <section className="relative w-full h-screen mx-auto touch-pan-y">
      <div
        className={cn(
          styles.paddingX,
          "absolute inset-0 top-30 max-w-7xl mx-auto flex flex-row items-start gap-5 z-10 pointer-events-auto md:pointer-events-none",
        )}
      >
        {/* Title Indicator line */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* Hero Bio */}
        <div className="pointer-events-auto">
          {/* Permanent Bold Name */}
          <h1 className={cn(styles.heroHeadText, "text-white")}>
            Hi, I'm <span className="text-[#915eff]">Mubarek Ali</span>
          </h1>

          {/* Animated Typewriter Roles */}
          <p className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[18px] lg:leading-[40px] mt-2 flex items-center flex-wrap">
            <span>I am&nbsp;</span>
            <span className="text-[#00cea8] font-bold">
              {displayedRole}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
              className="text-[#00cea8] ml-1 font-light inline-block select-none"
            >
              |
            </motion.span>
          </p>

          {/* Supporting Description */}
          <p className="mt-3 text-[#aaa6c3] text-[15px] sm:text-[17px] max-w-xl leading-relaxed">
            I Craft immersive 3D web experiences, responsive interfaces, and production-ready applications with React, Next.js, Django, and PostgreSQL.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="violet-gradient px-6 py-3 rounded-xl text-white font-semibold text-[15px] sm:text-[16px] shadow-[0_4px_20px_rgba(128,77,238,0.4)] hover:shadow-[0_6px_25px_rgba(128,77,238,0.6)] transition-shadow flex items-center gap-2 cursor-pointer"
            >
              <span>Explore My Work</span>
              <span>→</span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#151030]/80 hover:bg-[#1d1836] border border-white/15 hover:border-[#00cea8]/50 px-6 py-3 rounded-xl text-white font-semibold text-[15px] sm:text-[16px] transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Get in Touch</span>
              <span className="w-2 h-2 rounded-full bg-[#00cea8] inline-block" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Computer Model */}
      <ComputersCanvas />

      {/* Scroll to about section */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-8.75 h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};
