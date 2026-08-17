import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
  const footerRef = useRef(null);

  // Track scroll inside the footer to drive parallax on the branding text
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Reveal branding text by sliding it up and fading it in as footer scrolls into view
  const textY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [0.1, 1]);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-[#111111] text-[#F4F4F4] min-h-[60vh] py-16 flex flex-col justify-between overflow-hidden select-none border-t border-white/5"
    >
      {/* Background ambient red glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-between space-y-16 z-10">

        {/* Top Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-left pt-6">

          {/* Column 1: Services */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
              // SERVICES
            </h4>
            <ul className="space-y-2 text-sm font-mono text-[#D4D4D4] uppercase tracking-wider">
              <li className="hover:text-white transition-colors duration-200">Cinematic Production</li>
              <li className="hover:text-white transition-colors duration-200">Motion Graphics</li>
              <li className="hover:text-white transition-colors duration-200">Web Development</li>
              <li className="hover:text-white transition-colors duration-200">UI/UX Design</li>
            </ul>
          </div>

          {/* Column 2: Experience */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
              // CREDENTIALS
            </h4>
            <div className="space-y-2">
              <p className="text-lg font-light text-[#D4D4D4]">
                5+ Years of Professional Experience
              </p>
              <a
                href="#skills"
                className="relative inline-block text-sm font-semibold text-white/80 hover:text-white pb-1 group"
              >
                View Work
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary-red scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-left" />
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
              </a>
            </div>
          </div>

          {/* Column 3: Availability */}
          <div className="space-y-4 md:text-right">
            <h4 className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
              // STATUS
            </h4>
            <div className="space-y-1 text-sm font-mono text-[#D4D4D4]">
              <p className="flex items-center md:justify-end space-x-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                <span>AVAILABLE WORLDWIDE</span>
              </p>
              <p className="text-white/40">© {new Date().getFullYear()} NITHIN</p>
            </div>
          </div>

        </div>

        {/* Center Hero Branding Text */}
        <div className="w-full flex justify-center py-6 select-none">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="w-full text-center"
          >
            <h1 className="text-[14vw] md:text-[12vw] font-black lowercase tracking-tighter leading-none text-neutral-800 hover:text-white transition-colors duration-700 cursor-default select-none hover:shadow-[0_0_80px_rgba(255,42,42,0.15)] inline-block">
              Nithin
            </h1>
          </motion.div>
        </div>

        {/* Bottom Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-t border-white/10 pt-8 text-xs font-mono text-white/50 text-left">

          {/* Bottom Left: Copyright / React notice */}
          <div>
            <p>Designed & Engineered with React & Tailwind CSS.</p>
          </div>

          {/* Bottom Center: Email Link */}
          <div className="md:text-center">
            <a
              href="mailto:hello@Nithin.dev"
              className="text-sm font-semibold text-white/80 hover:text-white transition-colors duration-200 relative group pb-0.5"
            >
              hello@Nithin.dev
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary-red transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* Bottom Right: Privacy Policy */}
          <div className="md:text-right">
            <a
              href="#privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
