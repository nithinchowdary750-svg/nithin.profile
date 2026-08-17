import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

function ProcessCard({ number, title, description, positionClass, rotationClass, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`absolute ${positionClass} ${rotationClass} w-[280px] md:w-[320px] p-6 rounded-[2rem] border-2 transition-all duration-500 cursor-pointer ${
        isActive
          ? 'bg-primary-red border-primary-red text-white shadow-[0_20px_40px_rgba(255,42,42,0.4)]'
          : 'bg-white border-neutral-900 text-black shadow-[0_15px_30px_rgba(0,0,0,0.06)]'
      }`}
    >
      {/* Hole Punch Luggage Tag Detail */}
      <div className="flex flex-col items-center mb-4">
        <div className={`w-5 h-5 rounded-full border shadow-inner transition-colors duration-500 ${
          isActive ? 'bg-[#3d0303] border-red-900' : 'bg-neutral-100 border-neutral-300'
        }`} />
        <div className={`w-0.5 h-6 transition-colors duration-500 ${
          isActive ? 'bg-red-800' : 'bg-neutral-300'
        }`} />
      </div>

      {/* Card Content */}
      <div className="text-center">
        <span className={`block text-5xl font-serif italic mb-2 transition-colors duration-500 ${
          isActive ? 'text-red-200' : 'text-neutral-400'
        }`}>
          {number}
        </span>
        <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase font-sans">
          {title}
        </h3>
        <p className={`text-sm font-light leading-relaxed transition-colors duration-500 ${
          isActive ? 'text-white/80' : 'text-neutral-600'
        }`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Service() {
  const containerRef = useRef(null);
  
  // Track scroll position of the entire timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Grow timeline pathLength from 0 to 1 over scroll
  const pathLength = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  // Determine active state for cards based on scroll progress
  // Using transform to map scroll progress to boolean active states
  const card1Active = useTransform(scrollYProgress, (progress) => progress >= 0.15);
  const card2Active = useTransform(scrollYProgress, (progress) => progress >= 0.38);
  const card3Active = useTransform(scrollYProgress, (progress) => progress >= 0.62);
  const card4Active = useTransform(scrollYProgress, (progress) => progress >= 0.82);

  // Convert MotionValues to local react states or let framer handle it by passing MotionValue or using a small listener
  // To avoid re-renders, we can hook standard react states using useEffect on the MotionValues
  const [c1, setC1] = React.useState(false);
  const [c2, setC2] = React.useState(false);
  const [c3, setC3] = React.useState(false);
  const [c4, setC4] = React.useState(false);

  React.useEffect(() => {
    const unsub1 = card1Active.on("change", (latest) => setC1(latest));
    const unsub2 = card2Active.on("change", (latest) => setC2(latest));
    const unsub3 = card3Active.on("change", (latest) => setC3(latest));
    const unsub4 = card4Active.on("change", (latest) => setC4(latest));
    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
    };
  }, [card1Active, card2Active, card3Active, card4Active]);

  // S-Curve path for desktop (ViewBox 0 0 1000 1200)
  // Sweeps: center -> right -> left -> right -> left -> center-bottom
  const sCurvePath = "M 500,0 C 820,50 820,180 820,280 C 820,380 180,380 180,550 C 180,720 820,720 820,880 C 820,1020 180,1020 180,1130 L 500,1200";

  return (
    <section id="skills" ref={containerRef} className="relative bg-white w-full py-24 grid-pattern text-black overflow-hidden flex flex-col items-center">
      
      {/* Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center px-4 py-1.5 rounded-full border border-neutral-300 bg-neutral-50/50 shadow-sm text-xs font-mono font-bold tracking-widest text-primary-red uppercase mb-6"
      >
        How we work
      </motion.div>

      {/* Main Headline */}
      <div className="max-w-3xl mx-auto px-6 text-center relative mb-24 select-none">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
        >
          Let us show you how we drive your brand to new heights
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-6 text-lg text-neutral-500 font-light max-w-xl mx-auto"
        >
          A structured, premium, full-cycle approach to defining, designing, building, and launching digital excellence.
        </motion.p>

        {/* Hand-Drawn SVG Arrow decoration */}
        <div className="absolute top-1/2 -right-16 lg:-right-24 hidden md:block text-primary-red opacity-80 rotate-12">
          <svg viewBox="0 0 100 50" className="w-20 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {/* Curved arrow path */}
            <path d="M10,40 Q40,10 80,25 M65,15 L80,25 L75,40" />
          </svg>
        </div>
      </div>

      {/* Timeline S-Curve and Cards Container (Desktop) */}
      <div className="relative w-full max-w-[1000px] h-[1200px] hidden lg:block select-none">
        
        {/* SVG S-Curve Path */}
        <svg 
          viewBox="0 0 1000 1200" 
          fill="none" 
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Background shadow/faint line */}
          <path 
            d={sCurvePath} 
            stroke="#e5e5e5" 
            strokeWidth="6" 
            strokeDasharray="12 8" 
          />
          {/* Animated drawing line */}
          <motion.path 
            d={sCurvePath} 
            stroke="#FF2A2A" 
            strokeWidth="6" 
            strokeDasharray="12 8" 
            style={{ pathLength }}
          />
        </svg>

        {/* Card 01: Define */}
        <ProcessCard
          number="01"
          title="Define"
          description="We clarify project scope, target audience, and engineering constraints. Aligning product goals ensures a robust foundation before design begins."
          positionClass="top-[12%] right-[10%]"
          rotationClass="rotate-2"
          isActive={c1}
        />

        {/* Card 02: Design */}
        <ProcessCard
          number="02"
          title="Design"
          description="We conceptualize luxury UI layouts, high-fidelity prototypes, and user flows. Crafting clean brand typography, custom palettes, and micro-interactions."
          positionClass="top-[35%] left-[10%]"
          rotationClass="-rotate-2"
          isActive={c2}
        />

        {/* Card 03: Build */}
        <ProcessCard
          number="03"
          title="Build"
          description="We write semantic, performant frontend code with React, styling via Tailwind, and reliable backends using Node.js, Express, and MongoDB."
          positionClass="top-[58%] right-[10%]"
          rotationClass="rotate-3"
          isActive={c3}
        />

        {/* Card 04: Launch */}
        <ProcessCard
          number="04"
          title="Launch"
          description="We optimize asset delivery, deploy, run automated audit checks, and release a premium product ready to capture market attention."
          positionClass="top-[80%] left-[10%]"
          rotationClass="-rotate-3"
          isActive={c4}
        />

      </div>

      {/* Mobile Timeline (Stacked layout below 1024px) */}
      <div className="relative w-full px-6 flex flex-col items-center space-y-12 block lg:hidden select-none">
        
        {/* Simple straight vertical dashed line on mobile */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1.5 bg-neutral-200 border-l border-dashed border-neutral-400" />
        
        {/* Cards stacked vertically */}
        <div className="relative z-10 w-full flex flex-col items-center space-y-12 pt-6">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-[2rem] border-2 bg-white border-neutral-900 text-black shadow-md w-full max-w-[340px] text-center"
          >
            <span className="block text-4xl font-serif italic mb-1 text-primary-red">01</span>
            <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">Define</h3>
            <p className="text-sm text-neutral-600 font-light">We clarify project scope, target audience, and engineering constraints. Aligning product goals ensures a robust foundation.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-[2rem] border-2 bg-white border-neutral-900 text-black shadow-md w-full max-w-[340px] text-center"
          >
            <span className="block text-4xl font-serif italic mb-1 text-primary-red">02</span>
            <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">Design</h3>
            <p className="text-sm text-neutral-600 font-light">We conceptualize luxury UI layouts, high-fidelity prototypes, and user flows. Crafting clean brand typography and custom palettes.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-[2rem] border-2 bg-white border-neutral-900 text-black shadow-md w-full max-w-[340px] text-center"
          >
            <span className="block text-4xl font-serif italic mb-1 text-primary-red">03</span>
            <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">Build</h3>
            <p className="text-sm text-neutral-600 font-light">We write semantic, performant frontend code with React, styling via Tailwind, and reliable backends using Node.js and MongoDB.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-[2rem] border-2 bg-white border-neutral-900 text-black shadow-md w-full max-w-[340px] text-center"
          >
            <span className="block text-4xl font-serif italic mb-1 text-primary-red">04</span>
            <h3 className="text-xl font-bold tracking-tight mb-2 uppercase">Launch</h3>
            <p className="text-sm text-neutral-600 font-light">We optimize asset delivery, deploy, run automated audit checks, and release a premium product ready to capture market attention.</p>
          </motion.div>

        </div>
      </div>

      {/* Bottom handwritten text section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-16 text-center select-none"
      >
        <span className="inline-block text-3xl font-serif italic font-semibold text-neutral-800 -rotate-2 select-text">
          Ready to be delivered!
        </span>
      </motion.div>
    </section>
  );
}
