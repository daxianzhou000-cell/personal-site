import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, MousePointer2, Smile, Eye } from 'lucide-react';
import PixelGlobe from './PixelGlobe';

export default function Hero() {
  const constraintsRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    const customEvent = new CustomEvent('trigger-particle', {
      detail: { x: info.point.x, y: info.point.y }
    });
    window.dispatchEvent(customEvent);
  };

  return (
    <section 
      ref={constraintsRef} 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#13141C] text-[#E2E8F0] pt-24 lg:pt-0"
    >
      {/* SVG Filter for Retro Pixelation */}
      <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden">
        <filter id="pixel-filter" x="0" y="0">
          <feFlood x="2" y="2" height="1" width="1"/>
          <feComposite width="4" height="4"/>
          <feTile result="a"/>
          <feComposite in="SourceGraphic" in2="a" operator="in"/>
          <feMorphology operator="dilate" radius="2"/>
        </filter>
      </svg>

      {/* --- Pixel Globe Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center bg-[#13141C]">
        {/* Subtle Noise Texture */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none z-20"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />
        
        {/* Rotating Pixel Earth */}
        <div className="absolute w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] max-w-[900px] max-h-[900px] opacity-25 z-10">
          <PixelGlobe />
        </div>
      </div>

      {/* --- Clever Details: Draggable Interactive Stickers --- */}
      <motion.div 
        drag 
        onDragEnd={handleDragEnd}
        dragConstraints={constraintsRef} 
        dragElastic={0.7}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -10, cursor: "grabbing" }}
        animate={{ y: [0, -8, 0], rotate: [-6, -4, -6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[8%] left-[50%] -translate-x-1/2 lg:top-[12%] lg:left-[35%] cursor-grab z-40 bg-[#FFE600] text-black px-5 py-2 rounded-full font-bold border-2 border-[#FFE600] shadow-[4px_4px_0px_0px_rgba(255,230,0,0.6)] flex items-center gap-2"
      >
        <MousePointer2 size={18} /> 拖拽我试试！
      </motion.div>

      <motion.div 
        drag 
        onDragEnd={handleDragEnd}
        dragConstraints={constraintsRef} 
        dragElastic={0.7}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        whileHover={{ scale: 1.15, rotate: 20 }}
        whileTap={{ scale: 0.8, rotate: -20, borderRadius: "30%", cursor: "grabbing" }}
        animate={{ y: [0, 12, 0], rotate: [12, 16, 12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] left-[5%] lg:bottom-[15%] lg:left-[8%] cursor-grab z-40 bg-[#00E5FF] text-black w-20 h-20 lg:w-24 lg:h-24 rounded-full flex flex-col items-center justify-center font-black border-2 border-[#00E5FF] shadow-[4px_4px_0px_0px_rgba(0,229,255,0.6)]"
      >
        <Smile size={28} className="mb-1" />
        <span className="text-xs lg:text-sm">100% Fun</span>
      </motion.div>

      <motion.div 
        drag 
        onDragEnd={handleDragEnd}
        dragConstraints={constraintsRef} 
        dragElastic={0.7}
        dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
        whileHover={{ scale: 1.3, rotate: 90 }}
        whileTap={{ scale: 0.6, rotate: -45, cursor: "grabbing" }}
        animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[12%] right-[10%] lg:top-[15%] lg:right-[8%] cursor-grab z-40 text-[#FF00FF] drop-shadow-[4px_4px_0px_rgba(255,0,255,0.6)]"
      >
        <Sparkles size={48} className="lg:w-12 lg:h-12" />
      </motion.div>

      {/* --- Main Content Grid --- */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left: Flamboyant Typography & Buttons */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full z-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
            className="flex items-center gap-4"
          >
            <h1 className="text-[10vw] sm:text-[7vw] lg:text-[4.5rem] font-black leading-none tracking-tight">
              赋予逻辑以
            </h1>
          </motion.div>

          {/* The Gradient Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.5 }}
            className="relative group cursor-crosshair my-4 lg:my-6 inline-block"
          >
            <h1 
              className="text-[14vw] sm:text-[11vw] lg:text-[7.5rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 transform -rotate-3 origin-center transition-all duration-500 group-hover:rotate-0 group-hover:scale-110"
              style={{
                WebkitTextStroke: '2px #E2E8F0',
                filter: 'drop-shadow(6px 6px 0px rgba(0,229,255,0.8)) drop-shadow(12px 12px 0px rgba(255,0,255,0.5))'
              }}
            >
              温热的
            </h1>
            {/* Playful hover reveal text */}
            <span className="absolute -bottom-4 lg:-bottom-8 right-0 text-sm lg:text-base font-black bg-[#FF00FF] text-white px-4 py-2 rounded-xl border-2 border-[#FF00FF] shadow-[4px_4px_0px_0px_rgba(255,0,255,0.6)] opacity-0 group-hover:opacity-100 transition-all transform translate-y-8 group-hover:translate-y-0 pointer-events-none z-20 rotate-12">
              🔥 烫烫烫！
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.5 }}
            className="flex items-center gap-4"
          >
            <h1 className="text-[10vw] sm:text-[7vw] lg:text-[4.5rem] font-black leading-none tracking-tight">
              AI 灵魂
            </h1>
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="hidden sm:flex bg-[#00E5FF] border-2 border-[#00E5FF] rounded-full px-4 py-1 lg:px-5 lg:py-2 text-lg lg:text-xl font-black shadow-[4px_4px_0px_0px_rgba(0,229,255,0.6)] text-black transform -rotate-6"
            >
              YES!
            </motion.div>
          </motion.div>

          {/* Playful CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring", bounce: 0.6 }}
            className="mt-8 lg:mt-12 flex flex-col sm:flex-row gap-4 lg:gap-6 w-full sm:w-auto"
          >
            <a 
              href="#about" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 lg:px-8 lg:py-4 bg-[#1E212B] text-[#00E5FF] font-black text-lg rounded-full border-2 border-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-colors shadow-[6px_6px_0px_0px_rgba(0,229,255,0.6)] hover:shadow-[2px_2px_0px_0px_rgba(0,229,255,0.6)] hover:translate-y-1 hover:translate-x-1 active:shadow-none active:translate-y-2 active:translate-x-2 w-full sm:w-auto"
            >
              <span>了解我</span>
            </a>
            <a 
              href="#works" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 lg:px-8 lg:py-4 bg-[#FF00FF] text-white font-black text-lg rounded-full border-2 border-[#FF00FF] hover:bg-[#FFE600] hover:text-black hover:border-[#FFE600] transition-colors shadow-[6px_6px_0px_0px_rgba(255,0,255,0.6)] hover:shadow-[2px_2px_0px_0px_rgba(255,230,0,0.6)] hover:translate-y-1 hover:translate-x-1 active:shadow-none active:translate-y-2 active:translate-x-2 w-full sm:w-auto"
            >
              <span>作品展示</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>

        </div>

        {/* Right: Quirky Image Container */}
        <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0 pb-16 lg:pb-0 z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: isRevealed ? [1, 1.05, 1] : 1, 
              rotate: isRevealed ? 0 : 4 
            }}
            transition={{ 
              duration: 0.7, 
              delay: isRevealed ? 0 : 0.3, 
              type: "spring", 
              bounce: 0.5,
              scale: { type: "tween", duration: 0.4, ease: "easeInOut" }
            }}
            onMouseEnter={() => setIsRevealed(true)}
            onMouseLeave={() => setIsRevealed(false)}
            className="relative w-[75%] sm:w-[320px] lg:w-[400px] aspect-[3/4] border-2 border-[#FF00FF] rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(255,0,255,0.4)] bg-[#1A1A2E] group cursor-none"
          >
            {/* The Image with Effects */}
            <div className="relative w-full h-full overflow-hidden">
              {/* HD Image (Revealed) */}
              <motion.img 
                src="/hero-image.jpg" 
                alt="HD Portrait" 
                initial={false}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  scale: isRevealed ? 1 : 1.2,
                  filter: isRevealed ? "blur(0px) brightness(1)" : "blur(20px) brightness(0.5)"
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="absolute inset-0 w-full h-full object-cover z-0"
                referrerPolicy="no-referrer"
              />

              {/* Animated Pixel Art Composition (Initial State) */}
              <AnimatePresence>
                {!isRevealed && (
                  <motion.div
                    key="pixel-art-comp"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ 
                      opacity: 0, 
                      scale: 1.15, 
                      filter: 'brightness(1.5) blur(10px)',
                      transition: { duration: 0.4, ease: "circIn" }
                    }}
                    className="absolute inset-0 z-10 bg-[#0F0F0F] overflow-hidden"
                  >
                    {/* The Pixelated Portrait (Directly linked to HD) */}
                    <motion.img 
                      src="/hero-image.jpg" 
                      alt="Pixel Portrait" 
                      animate={{
                        filter: [
                          "url(#pixel-filter) saturate(1.6) brightness(1.1) hue-rotate(0deg)",
                          "url(#pixel-filter) saturate(1.8) brightness(1.2) hue-rotate(10deg)",
                          "url(#pixel-filter) saturate(1.6) brightness(1.1) hue-rotate(0deg)"
                        ],
                        scale: [1, 1.03, 1],
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full h-full object-cover opacity-95"
                      referrerPolicy="no-referrer"
                    />

                    {/* Animated "Dopamine" Pixel Overlays */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      {/* Floating Pixel blocks that "highlight" the portrait */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [0, -60, 0],
                            x: [0, (i % 2 === 0 ? 30 : -30), 0],
                            opacity: [0, 0.7, 0],
                            scale: [0.5, 1.2, 0.5]
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeInOut"
                          }}
                          className="absolute w-6 h-6 border-2 border-white/40 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
                          style={{
                            top: `${15 + i * 10}%`,
                            left: `${10 + (i * 13) % 80}%`,
                            backgroundColor: ['#FF0080', '#FFFF00', '#39FF14', '#00FFFF', '#FF6600'][i % 5],
                            mixBlendMode: 'screen'
                          }}
                        />
                      ))}

                      {/* Twinkling Pixel Sparkles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 4
                          }}
                          className="absolute w-2 h-2 bg-white"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            boxShadow: '0 0 8px #fff'
                          }}
                        />
                      ))}
                    </div>

                    {/* Color Glitch Overlay */}
                    <motion.div 
                      animate={{
                        opacity: [0, 0.1, 0, 0.05, 0],
                        x: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                      className="absolute inset-0 bg-cyan-500/10 mix-blend-screen z-30"
                    />

                    {/* Retro Grid Overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-40 z-40"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, rgba(0,0,0,0.8) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(0,0,0,0.8) 1px, transparent 1px)
                        `,
                        backgroundSize: '10px 10px',
                      }}
                    />

                    {/* CRT Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_6px] z-50" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Revealed Badge */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: -12 }}
                  className="absolute bottom-4 left-4 z-30 bg-[#FF0080] text-white font-black px-3 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs flex items-center gap-1"
                >
                  <Smile size={14} />
                  PIXEL ART ✨
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Decorative Tape/Sticker on Image */}
            <motion.div 
              drag 
              onDragEnd={handleDragEnd}
              dragConstraints={constraintsRef}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9, rotate: 0, cursor: "grabbing" }}
              className="absolute -top-2 -right-2 bg-[#FFE600] text-black font-black px-4 py-2 transform rotate-12 border-2 border-[#FFE600] shadow-[4px_4px_0px_0px_rgba(255,230,0,0.6)] z-40 cursor-grab"
              onClick={(e) => e.stopPropagation()} // Prevent revealing when dragging sticker
            >
              HELLO!
            </motion.div>
            
            {/* Image Hover Overlay (Subtle scanline effect) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] w-full animate-[scanline_8s_linear_infinite] pointer-events-none z-20"></div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
