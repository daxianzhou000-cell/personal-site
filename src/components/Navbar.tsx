import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';

const navItems = [
  { name: '关于我', id: 'about' },
  { name: '实习经历', id: 'experience' },
  { name: 'AIGC创作', id: 'works' },
  { name: '专业技能', id: 'skills' }
];

export default function Navbar() {
  const [active, setActive] = useState('about');
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsExpanded(false); // Collapse when scrolling down
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setIsHoveringTop(true);
      } else {
        setIsHoveringTop(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Show if not hidden by scroll, or if hovering near top, or if at the very top
  const isVisible = !hidden || isHoveringTop || scrollY.get() < 50;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0, x: '-50%' }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        x: '-50%'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-4 left-1/2 z-50 pointer-events-auto"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(true)}
    >
      <motion.div 
        layout
        className="bg-[#13141C] p-1 rounded-full flex items-center shadow-[0_0_15px_rgba(0,229,255,0.3)] border border-[#00E5FF] overflow-hidden"
      >
        {/* Fixed Logo inside Island */}
        <motion.a 
          layout
          href="#"
          className="relative z-10 px-3 py-1.5 md:px-4 md:py-2 font-display font-black text-sm md:text-base tracking-tighter text-white uppercase transform -skew-x-6 block drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]"
          onClick={(e) => {
            if (!isExpanded) {
              e.preventDefault();
              setIsExpanded(true);
            } else {
              setActive('about');
            }
          }}
        >
          MY<span className="text-[#FF00FF] drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">CYBER</span>
        </motion.a>

        {/* Expandable Navigation Items */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              layout
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex items-center whitespace-nowrap overflow-hidden"
            >
              <div className="w-px h-4 bg-[#00E5FF]/30 mx-1 shrink-0" />
              <div className="flex items-center pr-1 shrink-0">
                {navItems.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a 
                      key={item.id} 
                      href={`#${item.id}`}
                      onClick={() => setActive(item.id)}
                      className={`relative px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'text-[#00E5FF]/70 hover:text-[#00E5FF] hover:drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-[#FF00FF] rounded-full shadow-[0_0_10px_rgba(255,0,255,0.8)] border border-[#FF00FF]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
}
