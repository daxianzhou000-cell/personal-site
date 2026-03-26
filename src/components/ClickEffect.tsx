import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const words = ["✨", "HACKED!", "🚀", "CYBER!", "来了呀！", "欢迎！", "NEON!", "Cool!", "Wow!", "GLITCH!", "👀"];
const colors = ['#00E5FF', '#FF00FF', '#FFE600', '#00FF00', '#FF2A2A', '#9900FF'];

export default function ClickEffect() {
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number; word: string; color: string; rotation: number }[]>([]);

  useEffect(() => {
    const triggerEffect = (x: number, y: number) => {
      const newClick = {
        id: Date.now() + Math.random(),
        x,
        y,
        word: words[Math.floor(Math.random() * words.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 40 - 20, // -20 to 20 degrees
      };
      
      setClicks((prev) => [...prev, newClick]);
      
      // Remove after animation completes
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 1000);
    };

    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking on a link or button to avoid distracting from navigation
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        // We can still show it, but maybe smaller? Let's just show it everywhere for maximum fun!
      }
      triggerEffect(e.clientX, e.clientY);
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{x: number, y: number}>;
      triggerEffect(customEvent.detail.x, customEvent.detail.y);
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('trigger-particle', handleCustomEvent);
    
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('trigger-particle', handleCustomEvent);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 1, scale: 0.5, rotate: click.rotation, y: "-50%", x: "-50%" }}
            animate={{ opacity: 0, scale: [0.5, 1.2, 1.5], y: "-150%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", times: [0, 0.2, 1] }}
            className="absolute font-black text-2xl md:text-4xl whitespace-nowrap drop-shadow-[0_0_10px_currentColor]"
            style={{ 
              left: click.x,
              top: click.y,
              color: click.color, 
              WebkitTextStroke: '1px white',
            }}
          >
            {click.word}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
