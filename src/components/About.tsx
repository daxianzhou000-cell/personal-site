import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { 
  Star, Zap, GraduationCap, Heart, Sparkles, 
  Quote, Globe, Code2, BookOpen, Award, 
  Cpu, Languages, PenTool, Phone, Mail,
  MousePointer2, Scissors, Compass, Smile,
  ArrowRight
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, ResponsiveContainer,
  Tooltip, Legend
} from 'recharts';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const radarData = [
  { subject: '文科素养', current: 88, past: 95, fullMark: 100 },
  { subject: '技术能力', current: 75, past: 35, fullMark: 100 },
  { subject: '英语水平', current: 85, past: 70, fullMark: 100 },
  { subject: '证书储备', current: 80, past: 40, fullMark: 100 },
  { subject: 'AI工具', current: 72, past: 15, fullMark: 100 },
];

const tags = [
  { text: "文科背景AI探索者", bg: "bg-[#00E5FF]", rotate: "-4deg" },
  { text: "效率工具极客", bg: "bg-[#FFE600]", rotate: "6deg" },
  { text: "内容创作者", bg: "bg-[#FF00FF]", rotate: "-2deg" },
];

const education = [
  {
    period: "2024.09 - 2027.06",
    school: "中南大学 (985)",
    major: "新闻与传播 · 研究生",
    logo: asset('csu-logo.optimized.png'),
    accent: "#FF2A2A",
    rotate: "-2deg"
  },
  {
    period: "2020.09 - 2024.06",
    school: "北京化工大学 (211)",
    major: "财务管理 · 本科",
    logo: asset('buct-logo.optimized.png'),
    accent: "#0033FF",
    rotate: "3deg"
  }
];

export default function About() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleRadarClick = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 800);
  };

  return (
    <section id="about" className="relative py-24 scroll-mt-20 bg-[#1A1B26] overflow-hidden font-sans border-t-2 border-[#00E5FF]">
      {/* SVG Filters for Holographic Effects */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="remove-white" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            -2.5 -2.5 -2.5 7.5 0
          " />
        </filter>
        <filter id="neon-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </svg>

      {/* Pop-Art Halftone Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20 bg-halftone"></div>

      {/* Giant Background Text to kill whitespace */}
      <div className="absolute top-40 -left-20 whitespace-nowrap opacity-20 pointer-events-none select-none overflow-hidden flex z-0">
        <motion.h1 
          animate={{ x: [0, -1000] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="text-[15rem] font-black uppercase tracking-tighter text-transparent"
          style={{ 
            WebkitTextStroke: '3px rgba(0, 229, 255, 0.4)',
            filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.2))'
          }}
        >
          ABOUT ME ABOUT ME ABOUT ME ABOUT ME
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="flex justify-between items-start mb-8 relative z-20">
          {/* Title - Fixed stacking issue by using relative positioning and smaller text-8xl */}
          <div className="relative inline-block group cursor-crosshair">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white relative z-10 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2" style={{ WebkitTextStroke: '2px #00E5FF' }}>
              关于我
            </h2>
            <h2 className="absolute top-0 left-0 text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#FF00FF] z-0 select-none" style={{ WebkitTextStroke: '2px #FF00FF' }}>
              关于我
            </h2>
            <div className="absolute -bottom-4 left-0 w-full h-4 bg-[#00E5FF] border-2 border-[#00E5FF] -z-10 group-hover:translate-y-2 group-hover:translate-x-2 transition-transform"></div>
          </div>

          {/* Discovery Mode Sticker */}
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="hidden md:flex w-28 h-28 bg-[#FF00FF] rounded-full border-2 border-[#FF00FF] shadow-[6px_6px_0px_0px_rgba(0,229,255,0.6)] items-center justify-center rotate-12 cursor-pointer z-30"
          >
            <div className="text-center text-white">
              <Smile size={28} className="mx-auto mb-1" />
              <span className="font-black text-xs leading-none block">DISCOVERY<br/>MODE</span>
            </div>
          </motion.div>
        </div>

        {/* ================= HERO SECTION: Avatar + Intro ================= */}
        <div className="flex flex-col lg:flex-row items-center justify-center max-w-5xl mx-auto gap-12 lg:gap-16 mb-24 relative z-20">
          
          {/* Avatar (Smaller, Left Side) */}
          <motion.div 
            drag
            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
            whileHover={{ scale: 1.02, rotate: -2 }}
            className="relative w-full max-w-xs bg-[#1E212B] border-2 border-[#00E5FF] shadow-[12px_12px_0px_0px_rgba(0,229,255,0.4)] p-4 z-30 cursor-grab active:cursor-grabbing flex-shrink-0"
          >
            {/* OS Header */}
            <div className="flex justify-between items-center border-b-2 border-[#00E5FF] pb-3 mb-4">
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-[#FF00FF] rounded-full border-2 border-[#FF00FF]"></div>
                <div className="w-4 h-4 bg-[#FFE600] rounded-full border-2 border-[#FFE600]"></div>
                <div className="w-4 h-4 bg-[#00E5FF] rounded-full border-2 border-[#00E5FF]"></div>
              </div>
              <span className="font-black text-sm tracking-widest uppercase text-[#00E5FF]">profile.exe</span>
            </div>
            
            {/* Image Container */}
            <div className="relative h-64 border-2 border-[#00E5FF] overflow-hidden group bg-[#FFE600]">
              <img 
                src={asset('avatar.optimized.jpg')} 
                alt="周宏伟" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter saturate-125 contrast-110 group-hover:saturate-150 group-hover:scale-110 group-hover:brightness-110 group-hover:hue-rotate-15 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Hover Overlay Halftone */}
              <div className="absolute inset-0 bg-halftone opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Interactive Hover Elements */}
              <motion.div 
                initial={{ y: 20, opacity: 0, rotate: -10 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="absolute bottom-4 left-4 bg-[#FF00FF] text-white border-2 border-[#FF00FF] px-4 py-2 font-black text-xl transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,229,255,0.6)] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 z-20"
              >
                HELLO! 👋
              </motion.div>
              <motion.div 
                initial={{ y: -20, opacity: 0, rotate: 15 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="absolute top-4 right-4 bg-[#00E5FF] text-black border-2 border-[#00E5FF] px-3 py-1 font-black text-sm transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,0,255,0.6)] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-4 z-20"
              >
                DRAG ME
              </motion.div>
            </div>
          </motion.div>

          {/* Intro Text (Right Side, No Box) */}
          <div className="flex-1 flex flex-col justify-center pt-4 lg:pt-0 z-20 relative">
            {/* Decorative Background Text */}
            <div className="absolute -z-10 top-1/2 -translate-y-1/2 right-0 lg:right-10 text-[8rem] md:text-[12rem] font-black text-white opacity-5 pointer-events-none select-none leading-none tracking-tighter">
              HI.
            </div>

            {/* Small Greeting Badge */}
            <div className="inline-block bg-[#00E5FF] text-black px-3 py-1 text-sm font-black tracking-widest uppercase w-max mb-4 transform -rotate-2">
              Nice to meet you
            </div>

            <div className="relative inline-block w-max mb-6">
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase relative z-10" style={{ textShadow: '4px 4px 0px #FF00FF' }}>
                周宏伟
              </h3>
              {/* Decorative underline */}
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#00E5FF] z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
              </svg>
            </div>
            
            <p className="text-[15px] sm:text-lg md:text-xl lg:text-2xl font-black leading-relaxed text-white mb-10 relative whitespace-nowrap">
              <span className="absolute -top-6 -left-6 text-6xl text-[#00E5FF] opacity-30 font-serif">"</span>
              一名拥有<span className="bg-[#FF00FF] text-white px-2 py-1 md:px-3 border-2 border-[#FF00FF] mx-1 inline-block transform -rotate-2 shadow-[2px_2px_0px_0px_rgba(0,229,255,0.6)]">文科逻辑</span>与<span className="bg-[#00E5FF] text-black px-2 py-1 md:px-3 border-2 border-[#00E5FF] mx-1 inline-block transform rotate-2 shadow-[2px_2px_0px_0px_rgba(255,0,255,0.6)]">极客心脏</span>的硕士在读生
              <span className="absolute -bottom-8 ml-2 text-6xl text-[#00E5FF] opacity-30 font-serif">"</span>
            </p>
            
            {/* Contact Info (Refined Pills) */}
            <div className="flex flex-wrap gap-4 text-base md:text-lg font-black uppercase mb-10">
              <div className="flex items-center gap-3 bg-[#1E212B] text-white px-6 py-3 border-2 border-[#00E5FF] rounded-full shadow-[4px_4px_0px_0px_rgba(0,229,255,0.6)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer group">
                <Phone size={24} className="text-[#00E5FF] group-hover:rotate-12 transition-transform" />
                <span>18513073537</span>
              </div>
              <div className="flex items-center gap-3 bg-[#1E212B] text-white px-6 py-3 border-2 border-[#FF00FF] rounded-full shadow-[4px_4px_0px_0px_rgba(255,0,255,0.6)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer group">
                <Mail size={24} className="text-[#FF00FF] group-hover:-rotate-12 transition-transform" />
                <span className="lowercase">zhwydh@163.com</span>
              </div>
            </div>

            {/* Refined Tags (Soft Tinted Blocks) */}
            <div className="flex flex-wrap items-center gap-3">
              {tags.map((tag, i) => {
                const styles = [
                  "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50 hover:bg-[#00E5FF]/30",
                  "bg-[#FF00FF]/20 text-[#FF00FF] border border-[#FF00FF]/50 hover:bg-[#FF00FF]/30",
                  "bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/50 hover:bg-[#FFE600]/30"
                ];
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-sm md:text-base transition-colors cursor-pointer ${styles[i]}`}
                  >
                    <span className="opacity-60 font-medium text-sm">#</span>
                    <span className="tracking-wide">{tag.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= CONTENT GRID: Education + Quote + Radar ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-20">
          
          {/* Left Column: Education & Quote (col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            
            {/* Education Section */}
            <div className="relative flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-[#00E5FF] flex items-center justify-center text-black rotate-[-3deg] shadow-[3px_3px_0px_0px_rgba(255,0,255,0.6)]">
                  <GraduationCap size={22} />
                </div>
                <h4 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">
                  教育背景
                </h4>
              </div>
              
              <div className="flex flex-col gap-5">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="relative w-full bg-[#1E212B] border-2 border-[#00E5FF] shadow-[6px_6px_0px_0px_rgba(0,229,255,0.4)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,0.6)] transition-all p-5 md:p-6 overflow-hidden cursor-pointer group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    {/* Abstract Background Accents */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-transparent to-[#00E5FF]/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:scale-150" style={{ backgroundColor: edu.accent }}></div>
                    
                    {/* Content (Left Side) */}
                    <div className="relative z-10 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 border-2 border-[#00E5FF]" style={{ backgroundColor: edu.accent }}></div>
                        <span className="text-xs md:text-sm font-black tracking-widest text-[#00E5FF] uppercase">{edu.period}</span>
                      </div>
                      <h5 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tighter">
                        {edu.school}
                      </h5>
                      <div className="inline-flex items-center gap-2 bg-[#FF00FF] text-white px-4 py-1.5 transform -rotate-1 group-hover:rotate-0 transition-transform shadow-[3px_3px_0px_0px_rgba(0,229,255,0.6)]">
                        <span className="text-sm md:text-base font-bold tracking-wide">{edu.major}</span>
                      </div>
                    </div>

                    {/* Prominent Logo (Right Side) - Moderate Size, 3/4 Visible, Tilted Reveal Style */}
                    <div className="absolute -right-10 md:-right-12 top-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48 flex-shrink-0 transition-all duration-500 ease-out opacity-80 group-hover:opacity-100 group-hover:right-6 z-0 group-hover:z-20 pointer-events-none rotate-[-12deg] group-hover:rotate-0">
                      {/* Holographic Base Ring - Always Rotating */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00E5FF]/40 animate-[spin_15s_linear_infinite] group-hover:border-[#FF00FF]/60 transition-colors"></div>
                      <div className="absolute inset-4 rounded-full border border-dotted border-[#FF00FF]/40 animate-[spin_10s_linear_reverse_infinite] group-hover:border-[#00E5FF]/60 transition-colors"></div>
                      
                      {/* Logo Container */}
                      <div className="relative w-full h-full flex items-center justify-center p-4 transform transition-all duration-500 animate-[hologram-flicker_8s_linear_infinite]">
                        <img 
                          src={edu.logo} 
                          alt={edu.school} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain relative z-10 brightness-110 contrast-125" 
                          style={{ 
                            filter: "url(#remove-white) drop-shadow(0 0 15px rgba(0, 229, 255, 0.7))",
                          }}
                        />
                        
                        {/* Scanline Overlay on Logo */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,229,255,0.05)_50%)] bg-[size:100%_8px] pointer-events-none opacity-40 z-20 animate-[scanline_6s_linear_infinite]"></div>
                        
                        {/* Glitch Flash Effect on Hover */}
                        <div className="absolute inset-0 bg-[#00E5FF] opacity-0 group-hover:opacity-20 group-hover:animate-pulse mix-blend-overlay z-30 pointer-events-none"></div>
                      </div>

                      {/* Bottom Glow - Always visible but subtle */}
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-2 bg-[#00E5FF] blur-xl opacity-30 group-hover:opacity-80 transition-all"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote: Comic Style Block */}
            <motion.div 
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="bg-[#13141C] text-white p-8 md:p-10 border-2 border-[#00E5FF] rounded-[32px] shadow-[12px_12px_0px_0px_rgba(255,0,255,0.4)] relative rotate-1 mt-4"
            >
              <div className="absolute -top-5 right-8 bg-[#FFE600] text-black border-2 border-[#FFE600] px-4 py-1 font-black text-xl rotate-12 shadow-[4px_4px_0px_0px_rgba(0,229,255,0.6)]">
                QUOTE!
              </div>
              <p className="text-lg md:text-2xl font-black leading-relaxed">
                “在<span className="text-[#FF00FF] underline decoration-4 underline-offset-4">理性的逻辑</span>中寻找感性的火花，<br />
                在<span className="text-[#00E5FF] underline decoration-4 underline-offset-4">极客的世界</span>里保留人文的温度。”
              </p>
              <div className="absolute bottom-6 right-6 bg-[#00E5FF] text-black rounded-full p-2 border-2 border-[#00E5FF] shadow-[4px_4px_0px_0px_rgba(255,0,255,0.6)] rotate-[-15deg]">
                <ArrowRight size={24} />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Radar Chart & Skills (col-span-6) */}
          <div className="lg:col-span-6 flex flex-col gap-12">
            
            {/* Radar Chart: Premium Neo-Brutalist Container */}
            <div className="bg-[#1E212B] border-2 border-[#FF00FF] rounded-[32px] p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,229,255,0.4)] relative group">
              {/* Device Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#FF00FF] border-2 border-[#FF00FF]"></div>
                  <div className="w-4 h-4 rounded-full bg-[#FFE600] border-2 border-[#FFE600]"></div>
                  <div className="w-4 h-4 rounded-full bg-[#00E5FF] border-2 border-[#00E5FF]"></div>
                </div>
                <div className="font-black text-sm tracking-widest text-[#00E5FF]">SKILL_RADAR.SYS</div>
              </div>

              {/* Device Screen (Light Mode) with 3D Tilt & Scan Interaction */}
              <div style={{ perspective: 1000 }}>
                <motion.div 
                  ref={chartRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleRadarClick}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="bg-[#13141C] border-2 border-[#00E5FF] rounded-2xl p-4 h-[320px] relative overflow-hidden shadow-[inset_0px_0px_20px_rgba(0,229,255,0.15)] cursor-crosshair"
                >
                  {/* Grid pattern background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 pointer-events-none" style={{ transform: "translateZ(-10px)" }}></div>
                  
                  {/* Radar Sweep Animation */}
                  <div className={`absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300 ${isScanning ? 'animate-[spin_0.5s_linear_infinite] opacity-100' : 'animate-[spin_4s_linear_infinite] opacity-40'}`}
                       style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 229, 255, 0.15) 100%)', transform: "translateZ(-5px)" }}>
                  </div>

                  {/* Scanning Overlay Flash */}
                  {isScanning && (
                    <div className="absolute inset-0 bg-[#FF00FF] opacity-10 pointer-events-none animate-pulse"></div>
                  )}

                  <div style={{ width: '100%', height: '100%', transform: "translateZ(30px)" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                        <PolarGrid stroke="#334155" strokeWidth={1} strokeDasharray="3 3" />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: '#E2E8F0', fontWeight: 900, fontSize: 13 }} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1E212B', borderRadius: '12px', border: '2px solid #00E5FF', color: '#E2E8F0', fontWeight: 'bold', boxShadow: '4px 4px 0px 0px rgba(0,229,255,0.6)' }}
                          cursor={{ stroke: '#FF00FF', strokeWidth: 2, strokeDasharray: '5 5' }}
                        />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 900, paddingTop: '10px', color: '#E2E8F0' }} />
                        <Radar
                          name="过去 (Past)"
                          dataKey="past"
                          stroke="#475569"
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          fill="#334155"
                          fillOpacity={0.5}
                          activeDot={{ r: 5, fill: '#475569', stroke: '#00E5FF', strokeWidth: 2 }}
                        />
                        <Radar
                          name="现在 (Current)"
                          dataKey="current"
                          stroke="#00E5FF"
                          strokeWidth={3}
                          fill="#00E5FF"
                          fillOpacity={0.2}
                          activeDot={{ r: 7, fill: '#FF00FF', stroke: '#00E5FF', strokeWidth: 3 }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* Skill Badges (Soft Tinted Style) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { icon: <Languages size={24} />, label: "英语6级", bg: "bg-[#00E5FF]/10", text: "text-[#00E5FF]", border: "border-[#00E5FF]" },
                  { icon: <Award size={24} />, label: "初级会计", bg: "bg-[#FF00FF]/10", text: "text-[#FF00FF]", border: "border-[#FF00FF]" },
                  { icon: <Cpu size={24} />, label: "计算机二级", bg: "bg-[#9D00FF]/10", text: "text-[#9D00FF]", border: "border-[#9D00FF]" },
                  { icon: <Sparkles size={24} />, label: "AI探索者", bg: "bg-[#FFE600]/10", text: "text-[#FFE600]", border: "border-[#FFE600]" }
                ].map((skill, i) => (
                  <div key={i} className={`flex flex-col items-center justify-center gap-2 p-4 ${skill.bg} border-2 ${skill.border} rounded-2xl hover:-translate-y-1 transition-all cursor-pointer group shadow-[4px_4px_0px_0px_rgba(0,229,255,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(255,0,255,0.6)]`}>
                    <div className={`${skill.text} group-hover:scale-110 transition-transform`}>
                      {skill.icon}
                    </div>
                    <div className={`font-bold text-sm ${skill.text} text-center`}>{skill.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Sticker */}
            <div className="hidden lg:flex justify-center mt-4">
               <div className="w-32 h-32 bg-[#FF00FF] rounded-full border-2 border-[#00E5FF] shadow-[8px_8px_0px_0px_rgba(0,229,255,0.6)] flex items-center justify-center rotate-[-10deg] hover:rotate-[10deg] transition-transform cursor-pointer">
                 <div className="text-center font-black text-white leading-none">
                   <Star size={40} className="mx-auto mb-2" fill="white" />
                   KEEP<br/>EXPLORING
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-halftone {
          background-image: radial-gradient(#00E5FF 20%, transparent 20%);
          background-size: 12px 12px;
        }
      `}} />
    </section>
  );
}
