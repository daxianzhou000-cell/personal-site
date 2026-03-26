import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'motion/react';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    // Transition from Page 1 to Page 2 after 2.2 seconds
    const timer = setTimeout(() => setPhase(2), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {phase === 1 && <PageOne key="page1" />}
      {phase === 2 && <PageTwo onComplete={onComplete} />}
    </AnimatePresence>
  );
}

function PageOne() {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#13141C] border-[16px] border-[#00E5FF] overflow-hidden flex items-center justify-center"
      exit={{ opacity: 0, transition: { duration: 0 } }} // Instant exit for flash transition
    >
      {/* Yellow Diagonal Split */}
      <div 
        className="absolute inset-0 bg-[#FF00FF]" 
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} 
      />

      {/* Cartridge Slot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-16 bg-[#1E212B] rounded-b-3xl z-20 border-b-4 border-x-4 border-[#00E5FF]" />

      {/* Cartridge Container (Handles the Glitch Effect) */}
      <motion.div
        className="absolute top-16 left-1/2 -translate-x-1/2 z-10"
        animate={{ x: [0, -15, 15, -10, 10, -5, 5, 0], y: [0, 10, -10, 5, -5, 0] }}
        transition={{ delay: 1.4, duration: 0.4 }}
      >
        {/* Cartridge Body */}
        <motion.div
          className="w-64 h-80 bg-[#1E212B] border-8 border-[#00E5FF] rounded-t-2xl flex flex-col items-center pt-8 shadow-[16px_16px_0px_0px_rgba(0,229,255,0.5)]"
          initial={{ y: "100vh" }}
          animate={{ y: ["100vh", 0, 0] }}
          transition={{ duration: 1.5, times: [0, 0.6, 1], ease: "easeOut", delay: 0.2 }}
        >
          {/* Label */}
          <div className="w-48 h-28 bg-[#13141C] border-4 border-[#00E5FF] flex items-center justify-center relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,229,255,0.3)]">
            {/* Glitch overlay on label */}
            <motion.div
              className="absolute inset-0 bg-[#FF00FF] mix-blend-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1, 0] }}
              transition={{ delay: 1.4, duration: 0.4 }}
            />
            <span className="font-mono font-black text-2xl tracking-widest text-[#00E5FF] drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]">LOADING...</span>
          </div>
          
          {/* Cartridge ridges */}
          <div className="flex gap-3 mt-auto mb-6">
             <div className="w-5 h-20 border-4 border-[#00E5FF] bg-[#13141C] rounded-full shadow-[inset_0_0_5px_rgba(0,229,255,0.5)]" />
             <div className="w-5 h-20 border-4 border-[#00E5FF] bg-[#13141C] rounded-full shadow-[inset_0_0_5px_rgba(0,229,255,0.5)]" />
             <div className="w-5 h-20 border-4 border-[#00E5FF] bg-[#13141C] rounded-full shadow-[inset_0_0_5px_rgba(0,229,255,0.5)]" />
             <div className="w-5 h-20 border-4 border-[#00E5FF] bg-[#13141C] rounded-full shadow-[inset_0_0_5px_rgba(0,229,255,0.5)]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Hand Silhouette */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-80 bg-[#00E5FF] rounded-t-[4rem] z-30 shadow-[0_0_30px_rgba(0,229,255,0.5)]"
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "20%", "100%"] }}
        transition={{ duration: 1.5, times: [0, 0.6, 1], ease: "easeInOut", delay: 0.2 }}
      >
         {/* Thumb */}
         <div className="absolute top-20 -left-10 w-16 h-32 bg-[#00E5FF] rounded-l-full" />
      </motion.div>
    </motion.div>
  );
}

function PageTwo({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 6000); // 6 seconds auto-skip
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the 3D tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 200 });

  // Shadow offsets based on mouse (moves opposite to mouse)
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, -40]), { damping: 20, stiffness: 150 });
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [40, -40]), { damping: 20, stiffness: 150 });
  
  // Unified massive yellow shadow
  const shadow = useMotionTemplate`${shadowX}px ${shadowY}px 0px rgba(255,0,255,0.8)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#13141C] bg-grid overflow-hidden flex flex-col items-center justify-center cursor-pointer"
      onClick={onComplete}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.5 } }}
      style={{ perspective: 1200 }}
    >
      {/* Background Marquee Text for extra texture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex flex-col justify-center gap-4 opacity-[0.05] whitespace-nowrap z-0 text-[#00E5FF]">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="text-[15vw] font-black leading-none"
            initial={{ x: i % 2 === 0 ? "0%" : "-50%" }}
            animate={{ x: i % 2 === 0 ? "-50%" : "0%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            看见宏伟 看见宏伟 看见宏伟 看见宏伟 看见宏伟
          </motion.div>
        ))}
      </div>

      {/* 3D Typographic Lockup (No Boxes) */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-8"
        style={{ rotateX, rotateY }}
        initial={{ y: "100vh", rotateZ: -5 }}
        animate={{ y: 0, rotateZ: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
        <div className="flex flex-col items-start leading-[0.85] tracking-tighter relative w-full">
          
          {/* "看见" - Hollow/Outlined Style */}
          <motion.span
            className="text-[35vw] md:text-[22vw] font-black cursor-default z-10 relative"
            style={{
              color: '#13141C', // Matches background to look hollow
              WebkitTextStroke: 'clamp(2px, 0.6vw, 6px) #00E5FF', // Refined, elegant stroke
              textShadow: shadow
            }}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.02, x: '1vw', skewX: -5 }}
          >
            <motion.div 
              className="absolute inset-0 bg-[#00E5FF] rounded-full blur-3xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 0.5, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
            看见
          </motion.span>

          {/* "宏伟" - Solid Style */}
          <motion.span
            className="text-[35vw] md:text-[22vw] font-black text-[#00E5FF] self-end cursor-default z-10 relative"
            style={{ textShadow: shadow }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.02, x: '-1vw', skewX: 5 }}
          >
            <motion.div 
              className="absolute inset-0 bg-[#00E5FF] rounded-full blur-3xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 0.5, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
            宏伟
          </motion.span>

          {/* Subtitle - High-end Editorial Placard */}
          <motion.div
            className="absolute left-6 md:left-12 bottom-8 md:bottom-12 z-20 pointer-events-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            <div className="border-l-[4px] border-[#FF00FF] pl-4 md:pl-6 py-2 flex flex-col justify-center drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">
              <span className="text-lg md:text-2xl font-black tracking-[0.2em] md:tracking-[0.3em] text-white block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                谢谢你愿意了解我
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Skip Hint */}
      <motion.div 
        className="absolute bottom-8 right-6 md:right-12 text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#00E5FF]/60 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        [ 点击任意处进入 ]
      </motion.div>
    </motion.div>
  );
}
