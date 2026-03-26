import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Balanced spring for visibility and responsiveness
  const springConfig = { damping: 35, stiffness: 600, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(isPointer);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        className="relative flex items-center justify-center"
      >
        {/* Precision Center Dot */}
        <div className="w-1 h-1 bg-[#00E5FF] rounded-full shadow-[0_0_8px_rgba(0,229,255,1)]" />

        {/* Sniper Reticle - Outer Circle */}
        <motion.div
          className="absolute border border-[#00E5FF]/40 rounded-full"
          animate={{
            width: isHovering ? 56 : 32,
            height: isHovering ? 56 : 32,
            borderColor: isHovering ? 'rgba(255, 0, 255, 0.6)' : 'rgba(0, 229, 255, 0.4)',
            borderWidth: isHovering ? '2px' : '1px',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        />

        {/* Sniper Reticle - Crosshair Lines */}
        {[0, 90, 180, 270].map((rotation) => (
          <motion.div
            key={rotation}
            className="absolute bg-[#00E5FF]"
            style={{ 
              rotate: rotation,
              width: '1px',
              height: '8px',
              transformOrigin: 'top center'
            }}
            animate={{
              y: isHovering ? 24 : 12, // Moves outward to frame the target
              backgroundColor: isHovering ? '#FF00FF' : '#00E5FF',
              height: isHovering ? '12px' : '8px',
              opacity: isHovering ? 1 : 0.7
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          />
        ))}

        {/* Tactical Corner Brackets (Visible on hover) */}
        <motion.div
          className="absolute w-full h-full"
          animate={{
            width: isHovering ? 64 : 0,
            height: isHovering ? 64 : 0,
            opacity: isHovering ? 1 : 0,
            rotate: isHovering ? 45 : 0
          }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FF00FF]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FF00FF]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#FF00FF]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />
        </motion.div>
      </motion.div>
    </div>
  );
}
