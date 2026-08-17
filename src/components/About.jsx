import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  // A jagged organic torn paper path from x=0 to x=1440, height=80
  const tornPaperPath = "M0,40 Q60,15 120,38 T240,42 T360,20 T480,48 T600,25 T720,45 T840,18 T960,35 T1080,22 T1200,48 T1320,15 T1440,40 L1440,100 L0,100 Z";

  return (
    <section id="about" className="relative bg-primary-red w-full min-h-screen pt-24 pb-32 overflow-hidden flex flex-col justify-between">

      {/* Black Star Ornament 1 */}
      <div className="absolute top-16 left-10 text-black animate-pulse-slow opacity-60 pointer-events-none select-none">
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
          <path d="M12,0 L14,8 L22,10 L14,12 L12,20 L10,12 L2,10 L10,8 Z" />
        </svg>
      </div>

      {/* Black Star Ornament 2 */}
      <div className="absolute bottom-28 right-12 text-black animate-pulse-slow opacity-60 pointer-events-none select-none" style={{ animationDelay: '1.5s' }}>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M12,0 L14.5,7.5 L22,10 L14.5,12.5 L12,20 L9.5,12.5 L2,10 L9.5,7.5 Z" />
        </svg>
      </div>

      {/* Black Star Ornament 3 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black animate-pulse-slow opacity-20 pointer-events-none select-none" style={{ animationDelay: '0.8s' }}>
        <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current">
          <path d="M12,0 L15,9 L24,12 L15,15 L12,24 L9,15 L0,12 L9,9 Z" />
        </svg>
      </div>

      {/* Main Two-Column Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center flex-grow z-10">

        {/* Left Column: Lanyard & Suspended ID Badge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-start relative pt-12 min-h-[500px]">

          {/* Lanyard Strap (Drawn from top center down to clip) */}
          <div className="absolute top-0 bottom-[380px] w-2.5 bg-neutral-900 shadow-inner flex flex-col justify-end items-center">
            {/* Lanyard Texture lines */}
            <div className="w-[2px] h-full bg-white/20" />
          </div>

          {/* Lanyard Metal Clip / Ring */}
          <div className="absolute bottom-[365px] z-20">
            <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-md">
              {/* Ring */}
              <circle cx="20" cy="12" r="10" fill="none" stroke="#222" strokeWidth="4" />
              {/* Metal Spring Clip */}
              <path d="M16,20 L24,20 L22,35 L18,35 Z" fill="#666" stroke="#222" strokeWidth="2" />
              <circle cx="20" cy="28" r="3" fill="#333" />
            </svg>
          </div>

          {/* Conference Pass ID Card */}
          <motion.div
            initial={{ rotate: -8, y: 30, opacity: 0 }}
            whileInView={{ rotate: -3, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{
              rotate: 0,
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="relative w-80 aspect-[5/8] bg-neutral-900 rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 flex flex-col justify-between items-center text-white select-none mt-6 cursor-pointer"
          >
            {/* Hole punch at card top */}
            <div className="w-12 h-4 bg-black rounded-full border border-white/10 mt-1 shadow-inner" />

            {/* Logo Badge */}
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-4 mt-4">
              <span className="text-xs font-mono font-bold tracking-widest text-primary-red">DEV_CON // 2026</span>
              <span className="text-xs font-mono text-white/40">VIP PASS</span>
            </div>

            {/* Profile Picture */}
            <div className="w-44 h-44 rounded-2xl border-2 border-white/10 overflow-hidden shadow-2xl bg-neutral-800 flex items-center justify-center my-4">
              <img
                src="/imresizer-e3c1db21-f8b9-4b23-b24d-648f07deeb81 - Copy.jpg"
                alt="Nithin Portrait"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image isn't loaded yet
                  e.target.style.display = 'none';
                }}
              />
            </div>

            {/* Developer Details */}
            <div className="w-full text-center space-y-1">
              <h3 className="text-xl font-black tracking-tight text-white uppercase font-sans">
                NITHIN
              </h3>
              <p className="text-xs font-mono text-primary-red font-semibold uppercase tracking-widest">
                FULL STACK DEVELOPER
              </p>
              <div className="inline-flex items-center space-x-2 pt-1 text-[10px] font-mono text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>ACCESS: ALL AREAS</span>
              </div>
            </div>

            {/* Pass Barcode */}
            <div className="w-full flex flex-col items-center border-t border-white/10 pt-4 mt-4">
              <svg viewBox="0 0 100 20" className="w-3/4 h-8 text-white/80" fill="currentColor">
                {/* Simulated Barcode */}
                <rect x="0" y="0" width="3" height="20" />
                <rect x="5" y="0" width="1" height="20" />
                <rect x="8" y="0" width="5" height="20" />
                <rect x="15" y="0" width="2" height="20" />
                <rect x="20" y="0" width="1" height="20" />
                <rect x="23" y="0" width="4" height="20" />
                <rect x="29" y="0" width="2" height="20" />
                <rect x="33" y="0" width="1" height="20" />
                <rect x="36" y="0" width="6" height="20" />
                <rect x="44" y="0" width="2" height="20" />
                <rect x="48" y="0" width="1" height="20" />
                <rect x="51" y="0" width="5" height="20" />
                <rect x="58" y="0" width="3" height="20" />
                <rect x="63" y="0" width="1" height="20" />
                <rect x="66" y="0" width="4" height="20" />
                <rect x="72" y="0" width="2" height="20" />
                <rect x="76" y="0" width="1" height="20" />
                <rect x="79" y="0" width="6" height="20" />
                <rect x="87" y="0" width="2" height="20" />
                <rect x="91" y="0" width="1" height="20" />
                <rect x="94" y="0" width="6" height="20" />
              </svg>
              <span className="text-[8px] font-mono tracking-widest text-white/30 mt-1">
                *LS-98246-VIP-2026*
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Bio Content & Floating Tech Icons */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Bold black heading */}
            <h2 className="text-7xl md:text-8xl font-black text-black tracking-tight leading-none mb-6">
              Hello!
            </h2>

            {/* Upper case Name Highlight */}
            <p className="text-xs font-mono font-black tracking-widest text-black mb-6 uppercase">
              MEET <span className="underline decoration-black decoration-2 underline-offset-4">NITHIN</span> // FULL STACK CREATIVE
            </p>

            {/* Biography text */}
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-6">
              I love turning ideas into real digital products. Whether it's crafting beautiful responsive interfaces or building scalable, secure backend systems, I'm passionate about the details.
            </p>

            <p className="text-base md:text-lg text-black/80 font-medium leading-relaxed mb-12">
              Based in our interconnected digital workspace, I combine technical engineering with visual design rules to ship modern solutions that perform and scale. Constant learning is my engine, and clean code is my commitment.
            </p>
          </motion.div>

          {/* Technology Skills: Large floating transparent logos with shadows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center space-x-12 select-none"
          >
            {/* React SVG */}
            <div className="animate-float hover:scale-110 transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-black" stroke="currentColor" fill="none" strokeWidth="3">
                <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(0 50 50)" />
                <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(60 50 50)" />
                <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(120 50 50)" />
                <circle cx="50" cy="50" r="6" fill="currentColor" />
              </svg>
              <div className="text-[10px] font-mono text-center font-bold text-black mt-2">REACT</div>
            </div>

            {/* Node.js SVG */}
            <div className="animate-float hover:scale-110 transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]" style={{ animationDelay: '1.5s' }}>
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-black" fill="none" stroke="currentColor" strokeWidth="3">
                {/* Hexagon outline */}
                <path d="M50 10 L88 32 L88 75 L50 97 L12 75 L12 32 Z" />
                {/* Node inner details */}
                <path d="M50 10 L50 97" opacity="0.15" />
                <path d="M50 35 C50 35 68 45 68 60 C68 70 58 75 50 75" />
                <path d="M50 75 C42 75 32 70 32 60 C32 45 50 35 50 35" strokeDasharray="3,3" />
              </svg>
              <div className="text-[10px] font-mono text-center font-bold text-black mt-2">NODE.JS</div>
            </div>

            {/* MongoDB SVG */}
            <div className="animate-float hover:scale-110 transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]" style={{ animationDelay: '3s' }}>
              <svg viewBox="0 0 100 100" className="w-16 h-16 text-black" fill="none" stroke="currentColor" strokeWidth="3">
                {/* Leaf boundary */}
                <path d="M50 5 C32 35 32 75 50 95 C68 75 68 35 50 5 Z" />
                {/* Center rib */}
                <path d="M50 5 L50 95" />
                {/* Detail curves */}
                <path d="M50 25 C40 45 42 60 50 75" />
                <path d="M50 35 C60 50 58 65 50 80" />
              </svg>
              <div className="text-[10px] font-mono text-center font-bold text-black mt-2">MONGODB</div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Bottom Divider: Jagged Organic Torn Paper SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 100"
          className="relative block w-full h-[80px]"
          preserveAspectRatio="none"
        >
          <path d={tornPaperPath} fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
