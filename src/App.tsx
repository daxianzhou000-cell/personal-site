import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import IntroAnimation from './components/IntroAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Works from './components/Works';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ClickEffect from './components/ClickEffect';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#13141C] text-[#E2E8F0] font-sans selection:bg-[#FF00FF] selection:text-white overflow-x-hidden cursor-none">
      {/* Global Background Layering */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base Dark Color */}
        <div className="absolute inset-0 bg-[#0B0C10]"></div>
        
        {/* Animated Glow Spots */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-[radial-gradient(circle,rgba(0,229,255,0.15)_0%,transparent_70%)] blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -150, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[radial-gradient(circle,rgba(255,0,255,0.1)_0%,transparent_70%)] blur-[100px]"
        />
        
        {/* Subtle Scanlines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>
      
      <div className="relative min-h-screen overflow-hidden z-10">
        <CustomCursor />
        <ClickEffect />
        
        <AnimatePresence>
          {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: introDone ? 1 : 0, y: introDone ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative z-10 ${!introDone ? 'pointer-events-none h-screen overflow-hidden' : ''}`}
        >
          <Navbar />
          <Hero />
          <main className="relative z-10 w-full">
            <About />
            <Experience />
            <Works />
            <Skills />
          </main>
          <Footer />
          
          {/* Replay Intro Button */}
          <button
            onClick={() => setIntroDone(false)}
            className="fixed bottom-12 right-12 z-50 bg-[#1E212B] text-[#00E5FF] comic-border comic-shadow-sm p-4 rounded-full hover:bg-[#FF00FF] hover:text-[#13141C] hover:-translate-y-1 transition-all group shadow-[0_0_15px_rgba(0,229,255,0.5)]"
            title="重播入场动画"
          >
            <RotateCcw size={24} className="group-hover:-rotate-180 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
