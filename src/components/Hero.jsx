import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronDown, Volume2, VolumeX } from 'lucide-react';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [subtitles, setSubtitles] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [pose, setPose] = useState('resting'); // resting, lifting, upright
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  const synthRef = useRef(null);
  const utteranceRef = useRef(null);
  const timerRef = useRef(null);

  const speechText = `Hi, I'm  Nithin. I'm a Full Stack Developer passionate about creating modern web applications and digital experiences. I enjoy turning ideas into real products using technologies like HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Node.js, and MongoDB.

My journey in development started with curiosity, and over time it grew into a passion for building clean, responsive, and user-friendly applications. I love designing beautiful interfaces, developing scalable backend systems, and creating seamless user experiences.

I'm constantly learning new technologies, improving my problem-solving skills, and working on exciting projects that challenge me to grow as a developer.

My goal is to build innovative products that make a meaningful impact while continuing to evolve as a software engineer.

Thank you for visiting my portfolio. I'm excited to connect, collaborate, and create something amazing together.`;

  // Subtitle timestamps mapping (seconds -> text)
  const subtitleScript = [
    { start: 0, end: 4, text: "Hi, I'm Nithin. I'm a Full Stack Developer passionate about creating modern web applications..." },
    { start: 4, end: 8, text: "...and digital experiences. I enjoy turning ideas into real products using technologies..." },
    { start: 8, end: 12, text: "...like HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Node.js, and MongoDB." },
    { start: 12, end: 17, text: "My journey in development started with curiosity, and over time it grew into a passion..." },
    { start: 17, end: 22, text: "...for building clean, responsive, and user-friendly applications." },
    { start: 22, end: 27, text: "I love designing beautiful interfaces, developing scalable backend systems, and creating seamless user experiences." },
    { start: 27, end: 32, text: "I'm constantly learning new technologies, improving my problem-solving skills..." },
    { start: 32, end: 37, text: "...and working on exciting projects that challenge me to grow as a developer." },
    { start: 37, end: 42, text: "My goal is to build innovative products that make a meaningful impact..." },
    { start: 42, end: 47, text: "...while continuing to evolve as a software engineer." },
    { start: 47, end: 60, text: "Thank you for visiting my portfolio. I'm excited to connect, collaborate, and create something amazing together." }
  ];

  // Speech engine setup
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      clearInterval(timerRef.current);
    };
  }, []);

  // Blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth movements when playing/speaking
  useEffect(() => {
    let mouthInterval;
    if (isPlaying) {
      mouthInterval = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 120 + Math.random() * 80); // Random speech speed rhythm
    } else {
      setMouthOpen(false);
    }
    return () => clearInterval(mouthInterval);
  }, [isPlaying]);

  // Video timeline simulation (60s)
  useEffect(() => {
    if (isPlaying) {
      // Manage Pose: 1s resting, 1s-2s lift, 2s+ upright
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const nextTime = prev + 0.1;

          // Pose transitions
          if (nextTime < 1.0) {
            setPose('resting');
          } else if (nextTime >= 1.0 && nextTime < 2.0) {
            setPose('lifting');
          } else {
            setPose('upright');
          }

          // Subtitles mapping
          const currentSub = subtitleScript.find(s => nextTime >= s.start && nextTime < s.end);
          setSubtitles(currentSub ? currentSub.text : '');

          if (nextTime >= 60) {
            handleStop();
            return 0;
          }
          return nextTime;
        });
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      // Pause
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play
      setIsPlaying(true);

      if (synthRef.current.paused) {
        synthRef.current.resume();
      } else {
        synthRef.current.cancel();

        // Start fresh
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = 'en-US';
        utterance.rate = 0.95; // Slightly slower, professional self-introduction pace
        utterance.volume = isMuted ? 0 : 1;

        // Track speech ended
        utterance.onend = () => {
          handleStop();
        };

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
      }
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setPose('resting');
    setSubtitles('');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (synthRef.current && isPlaying) {
      // Synthesis volume cannot be dynamically changed, must restart speech at current position
      // For simplicity, we just cancel and speak from current paragraph or toggle browser voice mute
      synthRef.current.cancel();
      const nextUtterance = new SpeechSynthesisUtterance(speechText.substring(Math.floor((currentTime / 60) * speechText.length)));
      nextUtterance.lang = 'en-US';
      nextUtterance.rate = 0.95;
      nextUtterance.volume = !isMuted ? 0 : 1; // inverse of current state (will become isMuted)
      nextUtterance.onend = () => handleStop();
      utteranceRef.current = nextUtterance;
      synthRef.current.speak(nextUtterance);
    }
  };

  // Helper variables for avatar position based on pose
  // Resting: body down, head tilted on arms
  // Lifting: intermediate
  // Upright: body up, head supported by right hand
  const getAvatarProps = () => {
    switch (pose) {
      case 'resting':
        return {
          bodyY: 100,
          headY: 130,
          headRotate: 15,
          leftArmY: 160,
          leftArmRotate: 5,
          rightArmY: 150,
          rightArmRotate: -15,
          cableY: 10,
        };
      case 'lifting':
        return {
          bodyY: 50,
          headY: 60,
          headRotate: 8,
          leftArmY: 110,
          leftArmRotate: 2,
          rightArmY: 90,
          rightArmRotate: -8,
          cableY: 5,
        };
      case 'upright':
      default:
        return {
          bodyY: 0,
          headY: 0,
          headRotate: -3,
          leftArmY: 0,
          leftArmRotate: 0,
          rightArmY: 0,
          rightArmRotate: 0,
          cableY: 0,
        };
    }
  };

  const currentProps = getAvatarProps();

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-between overflow-hidden bg-[#050505]">
      {/* Background Cinematic Visualizer simulating a video camera screen */}
      <div className="absolute inset-0 z-0">
        {/* Animated grid dots background */}
        <div className="absolute inset-0 bg-[radial-gradient(#ff2a2a_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10" />

        {/* Video simulation red pulsing background (represents the same red background in rules) */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-[#3d0303] transition-colors duration-1000 z-0">
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/90" />
          <motion.div
            animate={{ opacity: isPlaying ? [0.4, 0.6, 0.4] : 0.3 }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#FF2A2A]/10"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-20">

        {/* Left Column: Heading and Description */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left text-white select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <h2 className="text-xl font-bold tracking-widest text-primary-red uppercase mb-4 font-mono">
              // INTRODUCTION
            </h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
              Hi, I'm a <br />
              <span className="text-stroke-white select-text font-black hover:text-white transition-colors duration-500">
                Full Stack Developer
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="text-lg md:text-xl text-white/70 font-light max-w-xl mb-10 leading-relaxed drop-shadow"
          >
            Crafting premium digital experiences and production-ready applications with{' '}
            <span className="text-white font-semibold">React.js</span>,{' '}
            <span className="text-white font-semibold">Node.js</span>, and{' '}
            <span className="text-white font-semibold">Tailwind CSS</span>. Focusing on visual excellence, performance, and clean design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/20"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md font-semibold rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Column: Animated Portrait Video Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative h-[450px] lg:h-[550px] w-full">

          {/* Video Container (The Portrait Frame) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="relative w-full aspect-[4/3] max-w-[480px] bg-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl group flex items-center justify-center bg-radial-gradient from-neutral-900 to-black"
          >
            {/* Camera Overlay Details */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 text-[10px] font-mono tracking-widest text-white/40">
              <span className={`h-2.5 w-2.5 rounded-full ${isPlaying ? 'bg-primary-red animate-pulse' : 'bg-neutral-600'}`} />
              <span>{isPlaying ? 'REC' : 'PAUSE'}</span>
            </div>

            <div className="absolute top-4 right-4 text-[10px] font-mono text-white/40">
              {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(1).padStart(4, '0')}
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/40">
              60 FPS
            </div>

            {/* Custom Interactive Audio Volume Indicator */}
            {isPlaying && (
              <button
                onClick={toggleMute}
                className="absolute bottom-4 left-4 z-30 text-white/50 hover:text-white transition-colors duration-200"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="animate-bounce" />}
              </button>
            )}

            {/* Red Studio Light Gradient Background inside frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

            {/* Interactive Vector Character SVG */}
            <svg
              viewBox="0 0 400 400"
              className="absolute inset-0 w-full h-full z-0 select-none"
              style={{ background: '#ff2a2a' }} // Same red background
            >
              {/* Subtle floating background patterns */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="black" strokeWidth="1" strokeOpacity="0.15" />

              {/* Laptop stationary in foreground/bottom */}
              {/* Note: Drawn first but rendered behind character except the screen edge */}
              <rect x="120" y="320" width="160" height="8" rx="2" fill="#333333" />
              <path d="M140,320 L160,260 L240,260 L260,320 Z" fill="#222222" opacity="0.8" />
              <rect x="165" y="265" width="70" height="50" fill="#000000" rx="1" />
              <path d="M185,280 L200,295 L215,280" stroke="#ff2a2a" strokeWidth="2" fill="none" opacity="0.7" />

              {/* Character Group: Responds to poses */}
              <g style={{ transition: 'transform 1000ms cubic-bezier(0.76, 0, 0.24, 1)' }}>

                {/* 1. Body & Clothes (White shirt remains unchanged) */}
                <path
                  d={`M100,400 C110,${330 + currentProps.bodyY} 140,${280 + currentProps.bodyY} 200,${280 + currentProps.bodyY} C260,${280 + currentProps.bodyY} 290,${330 + currentProps.bodyY} 300,400 Z`}
                  fill="#ffffff"
                  stroke="#dddddd"
                  strokeWidth="2"
                />

                {/* Neck */}
                <path
                  d={`M175,${290 + currentProps.bodyY} L225,${290 + currentProps.bodyY} L215,${240 + currentProps.headY} L185,${240 + currentProps.headY} Z`}
                  fill="#ffd0b0"
                />

                {/* 2. Head Group (Includes eyes, beard, hair, headphones) */}
                <g style={{
                  transform: `translate(0px, ${currentProps.headY}px) rotate(${currentProps.headRotate}deg)`,
                  transformOrigin: '200px 200px',
                  transition: 'transform 1000ms cubic-bezier(0.76, 0, 0.24, 1)'
                }}>
                  {/* Face Shape */}
                  <path d="M150,170 C150,230 170,260 200,260 C230,260 250,230 250,170 C250,130 230,110 200,110 C170,110 150,130 150,170 Z" fill="#ffd0b0" />

                  {/* Beard (Brownish-dark tone) */}
                  <path d="M150,180 C150,240 170,270 200,270 C230,270 250,240 250,180 C242,205 240,245 200,255 C160,245 158,205 150,180 Z" fill="#2d221c" />
                  <path d="M170,215 C180,225 220,225 230,215 C220,215 210,220 200,220 C190,220 180,215 170,215 Z" fill="#2d221c" />

                  {/* Hair (Preserve style and dark brown color) */}
                  <path d="M145,150 C140,110 160,85 200,85 C240,85 260,110 255,150 C245,130 240,120 200,120 C160,120 155,130 145,150 Z" fill="#1e1511" />
                  <path d="M165,95 C180,80 220,80 235,95 C220,90 180,90 165,95 Z" fill="#2d221c" />

                  {/* Eyebrows (Moving subtly when speaking) */}
                  <path
                    d="M172,145 Q185,138 193,143"
                    stroke="#2d221c"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      transform: isPlaying ? `translateY(${mouthOpen ? -2 : 0}px)` : 'none',
                      transition: 'transform 0.2s'
                    }}
                  />
                  <path
                    d="M228,145 Q215,138 207,143"
                    stroke="#2d221c"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      transform: isPlaying ? `translateY(${mouthOpen ? -2.5 : 0}px)` : 'none',
                      transition: 'transform 0.2s'
                    }}
                  />

                  {/* Eyes (Keep eye contact, with natural blinking every few seconds) */}
                  {!isBlinking ? (
                    <>
                      {/* Left Eye */}
                      <circle cx="183" cy="155" r="5" fill="#1e1511" />
                      <circle cx="184.5" cy="153.5" r="1.5" fill="#ffffff" />
                      {/* Right Eye */}
                      <circle cx="217" cy="155" r="5" fill="#1e1511" />
                      <circle cx="218.5" cy="217" r="0" /> {/* dummy */}
                      <circle cx="218.5" cy="153.5" r="1.5" fill="#ffffff" />
                    </>
                  ) : (
                    <>
                      {/* Blink state */}
                      <path d="M177,155 L189,155" stroke="#2d221c" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M211,155 L223,155" stroke="#2d221c" strokeWidth="2.5" strokeLinecap="round" />
                    </>
                  )}

                  {/* Nose */}
                  <path d="M200,162 L196,187 L204,187 Z" fill="#efa680" opacity="0.8" />

                  {/* Mouth with lip sync animation */}
                  {mouthOpen ? (
                    /* Open speaking mouth */
                    <path d="M188,202 Q200,218 212,202 Q200,205 188,202 Z" fill="#801c1c" stroke="#2d221c" strokeWidth="1.5" />
                  ) : (
                    /* Soft smile */
                    <path d="M188,202 Q200,210 212,202" stroke="#2d221c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  )}

                  {/* Headphones (Luxury Studio Headsets) */}
                  {/* Headband */}
                  <path d="M142,160 C142,90 258,90 258,160" fill="none" stroke="#222222" strokeWidth="10" strokeLinecap="round" />

                  {/* Left Ear Cushion */}
                  <rect x="135" y="145" width="12" height="40" rx="6" fill="#111111" />
                  <rect x="141" y="152" width="6" height="26" rx="2" fill="#333333" />

                  {/* Right Ear Cushion */}
                  <rect x="253" y="145" width="12" height="40" rx="6" fill="#111111" />
                  <rect x="253" y="152" width="6" height="26" rx="2" fill="#333333" />
                </g>

                {/* 3. Left Arm & Right Arm (Resting on table or supporting head) */}
                {/* Left Arm: Stays relatively flat/resting */}
                <path
                  d={`M80,400 Q140,${340 + currentProps.leftArmY} 190,${340 + currentProps.leftArmY}`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="24"
                  strokeLinecap="round"
                  style={{ transition: 'all 1000ms cubic-bezier(0.76, 0, 0.24, 1)' }}
                />

                {/* Right Arm: Changes based on pose */}
                {/* In 'resting': both arms folded flat on the desk. In 'upright': right hand supports head. */}
                {pose === 'resting' ? (
                  /* Folded flat on desk */
                  <path
                    d="M320,400 Q260,340 210,340"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="24"
                    strokeLinecap="round"
                    style={{ transition: 'all 1000ms' }}
                  />
                ) : (
                  /* Lifts to support head */
                  <path
                    d="M320,400 Q260,310 242,210"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="24"
                    strokeLinecap="round"
                    style={{ transition: 'all 1000ms' }}
                  />
                )}

                {/* Headphone Cable physics (dangles to bottom) */}
                <path
                  d={`M141,${185 + currentProps.headY} Q110,${250 + currentProps.cableY} 130,340`}
                  fill="none"
                  stroke="#111111"
                  strokeWidth="3.5"
                  style={{ transition: 'all 1000ms ease-out' }}
                />
              </g>

              {/* Desk Foreground bar */}
              <rect x="0" y="340" width="400" height="60" fill="#1b120c" />
              <rect x="0" y="340" width="400" height="4" fill="#ff2a2a" opacity="0.4" />
            </svg>

            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 border-[16px] border-black pointer-events-none z-20" />
          </motion.div>

          {/* Subtitles Overlay beneath the video player */}
          <div className="h-12 w-full max-w-[480px] mt-4 text-center">
            <AnimatePresence mode="wait">
              {isPlaying && subtitles && (
                <motion.p
                  key={subtitles}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs md:text-sm text-white/60 font-mono italic px-4"
                >
                  "{subtitles}"
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Circular Play Reel Button & Label */}
          <div className="flex flex-col items-center mt-2 z-30">
            <motion.button
              onClick={handlePlayToggle}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{
                scale: 1.15,
                boxShadow: '0 0 30px rgba(255, 42, 42, 0.7)',
                borderColor: '#ff2a2a'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`h-20 w-20 rounded-full border-2 flex items-center justify-center bg-black/60 backdrop-blur-md cursor-pointer transition-colors duration-300 ${isPlaying ? 'border-primary-red text-primary-red' : 'border-white text-white'
                }`}
            >
              {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} className="ml-1" fill="currentColor" />}
            </motion.button>

            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase mt-3">
              {isPlaying ? 'PAUSE REEL' : 'PLAY REEL'}
            </span>
          </div>

        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center z-20 select-none">
        <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase mb-2">SCROLL DOWN</span>
        <ChevronDown className="text-white/40 animate-scroll-bounce" size={20} />
      </div>
    </section>
  );
}
