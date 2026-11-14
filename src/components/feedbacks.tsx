import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";

import { TestimonialCanvas } from "./canvas";
import { TESTIMONIALS } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { cn } from "../utils/lib";
import { fadeIn, textVariant } from "../utils/motion";

type FeedbackCardProps = {
  index: number;
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
  isActive: boolean;
  onSelect: () => void;
};

// 3D Interactive Feedback Card
const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  isActive,
  onSelect,
}: FeedbackCardProps) => {
  return (
    <Tilt
      options={{
        max: 25,
        scale: 1.02,
        speed: 400,
      }}
      className="flex-1 min-w-[280px] max-w-full"
    >
      <motion.div
        variants={fadeIn("up", "spring", index * 0.3, 0.75)}
        onClick={onSelect}
        className={cn(
          "h-full p-[1px] rounded-2xl cursor-pointer transition-all duration-300",
          isActive
            ? "violet-gradient shadow-[0_0_25px_rgba(145,94,255,0.4)]"
            : "bg-white/5 hover:bg-white/10"
        )}
      >
        <div className="bg-[#100d25] p-6 sm:p-8 rounded-2xl h-full flex flex-col justify-between">
          <div>
            {/* Stars & Quote */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-1 text-[#ffd700] text-sm">
                {"★".repeat(5)}
              </div>
              <span className="text-[#915eff] text-2xl font-black opacity-60">
                ”
              </span>
            </div>

            {/* Testimonial Quote */}
            <p className="text-white-100 text-[15px] sm:text-[16px] leading-relaxed line-clamp-4">
              {testimonial}
            </p>
          </div>

          {/* Reviewer Details */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-white font-semibold text-[15px] flex items-center gap-1.5">
                {name}
                <span
                  title="Verified Client"
                  className="text-[#00cea8] text-xs font-bold"
                >
                  ✓
                </span>
              </p>
              <p className="text-secondary text-[12px]">
                {designation} • {company}
              </p>
            </div>

            <img
              src={image}
              alt={`Avatar of ${name}`}
              className={cn(
                "w-11 h-11 rounded-full object-cover p-0.5 border-2 transition-all",
                isActive ? "border-[#915eff]" : "border-white/20"
              )}
            />
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

// Feedbacks Section
export const Feedbacks = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <SectionWrapper>
      <div className="bg-[#050816] rounded-3xl p-6 sm:p-10 border border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#804dee]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#00cea8]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <motion.div variants={textVariant()} className="mb-8">
          <p className={styles.sectionSubText}>What others say</p>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
            <div className="flex items-center gap-2 bg-[#151030] px-4 py-2 rounded-full border border-white/10">
              <span className="text-[#ffd700] text-sm">★★★★★</span>
              <span className="text-white text-xs font-medium">
                5.0 Average Client Rating
              </span>
            </div>
          </div>
        </motion.div>

        {/* Featured 3D Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#151030]/60 rounded-3xl p-6 sm:p-10 border border-white/10 mb-8 backdrop-blur-sm">
          {/* Left: 3D Holographic Interactive Model */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full flex justify-center">
              <TestimonialCanvas />
            </div>
            <p className="text-secondary text-xs mt-1 text-center flex items-center gap-1.5 opacity-75">
              <span>✦</span> Drag to spin the 3D satisfaction emblem
            </p>
          </div>

          {/* Right: Active Testimonial Card */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#ffd700] tracking-widest text-lg">
                      ★★★★★
                    </span>
                    <span className="text-xs bg-[#00cea8]/15 text-[#00cea8] px-2.5 py-0.5 rounded-full font-medium">
                      Verified Client
                    </span>
                  </div>

                  <p className="text-white text-lg sm:text-2xl font-light italic leading-relaxed mb-6">
                    “{activeTestimonial.testimonial}”
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeTestimonial.image}
                      alt={activeTestimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#915eff]"
                    />
                    <div>
                      <h4 className="text-white font-bold text-base sm:text-lg">
                        {activeTestimonial.name}
                      </h4>
                      <p className="text-secondary text-xs sm:text-sm">
                        {activeTestimonial.designation} at{" "}
                        <span className="text-[#915eff]">
                          {activeTestimonial.company}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-[#100d25] border border-white/15 text-white flex items-center justify-center hover:border-[#915eff] hover:text-[#915eff] transition"
                      aria-label="Previous testimonial"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-[#100d25] border border-white/15 text-white flex items-center justify-center hover:border-[#915eff] hover:text-[#915eff] transition"
                      aria-label="Next testimonial"
                    >
                      →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-start gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeIndex === i
                      ? "w-8 bg-[#915eff]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <FeedbackCard
              key={testimonial.name}
              index={i}
              {...testimonial}
              isActive={activeIndex === i}
              onSelect={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
