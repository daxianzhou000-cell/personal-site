import { motion } from 'motion/react';
import { Star, Zap, Circle, Triangle } from 'lucide-react';

export default function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Element 1: Floating Star */}
      <motion.div
        animate={{ y: [0, -40, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] -left-4 md:left-[5%] text-[#FF00FF] opacity-30 drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]"
      >
        <Star size={80} fill="#FF00FF" stroke="#00E5FF" strokeWidth={2} />
      </motion.div>

      {/* Element 2: Floating Zap */}
      <motion.div
        animate={{ y: [0, 50, 0], rotate: [0, -30, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[20%] -right-4 md:right-[5%] text-[#00E5FF] opacity-30 drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]"
      >
        <Zap size={100} fill="#00E5FF" stroke="#FF00FF" strokeWidth={2} />
      </motion.div>

      {/* Element 3: Halftone Circle */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[60%] -left-10 md:left-[2%] opacity-20"
      >
        <div className="w-32 h-32 rounded-full bg-[#1E212B] comic-border border-[#00E5FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.5)]">
           <div className="w-24 h-24 rounded-full bg-grid opacity-50"></div>
        </div>
      </motion.div>

      {/* Element 4: Comic Text Bubble */}
      <motion.div
        animate={{ y: [0, 40, 0], rotate: [-12, 10, -12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[75%] -right-5 md:right-[8%] opacity-30"
      >
        <div className="bg-[#FF00FF] comic-border border-[#00E5FF] px-6 py-3 font-display font-black text-[#13141C] text-3xl shadow-[0_0_15px_rgba(255,0,255,0.5)]">
          HACKED!
        </div>
      </motion.div>
      
      {/* Element 5: Green Circle */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[40%] left-[5%] md:left-[10%] opacity-30 drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]"
      >
        <Circle size={60} fill="#00FF00" stroke="#00E5FF" strokeWidth={3} />
      </motion.div>

      {/* Element 6: Orange Triangle */}
      <motion.div
        animate={{ y: [0, -50, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[10%] md:right-[20%] opacity-30 drop-shadow-[0_0_10px_rgba(255,230,0,0.8)]"
      >
        <Triangle size={70} fill="#FFE600" stroke="#FF00FF" strokeWidth={2} />
      </motion.div>
      
      {/* Element 7: "COOL!" Sticker */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [15, 15, 15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[30%] right-[2%] md:right-[10%] opacity-30"
      >
        <div className="bg-[#13141C] comic-border border-[#00E5FF] px-4 py-1 font-display font-black text-[#00E5FF] text-xl shadow-[0_0_15px_rgba(0,229,255,0.5)]">
          CYBER!
        </div>
      </motion.div>
    </div>
  );
}
