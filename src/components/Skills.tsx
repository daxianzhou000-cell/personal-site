import { motion } from 'motion/react';

const skills = [
  { name: "React / Next.js", level: 90, color: "bg-[#0033FF]" },
  { name: "TypeScript", level: 85, color: "bg-[#FFD700]" },
  { name: "Tailwind CSS", level: 95, color: "bg-[#FF2A2A]" },
  { name: "Framer Motion", level: 80, color: "bg-[#9900FF]" },
  { name: "UI/UX Design", level: 75, color: "bg-[#FF5500]" },
  { name: "Node.js", level: 70, color: "bg-[#00E5FF]" }
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 scroll-mt-20 bg-[#13141C] overflow-hidden font-sans border-t-2 border-[#FFE600]">
      {/* Giant Background Text to kill whitespace */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 whitespace-nowrap opacity-20 pointer-events-none select-none overflow-hidden flex z-0">
        <motion.h1 
          animate={{ x: [-1000, 0] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="text-[15rem] font-black uppercase tracking-tighter text-transparent"
          style={{ 
            WebkitTextStroke: '3px rgba(0, 229, 255, 0.3)',
            filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.15))'
          }}
        >
          SUPER SKILLS SUPER SKILLS SUPER SKILLS SUPER SKILLS
        </motion.h1>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#1E212B] text-white border-2 border-[#00E5FF] shadow-[8px_8px_0px_0px_rgba(0,229,255,0.8)] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3 space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-5xl md:text-6xl font-black uppercase leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                超级 <br/> <span className="text-[#FF00FF] drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">能力</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg font-medium text-gray-300"
              >
                配备了最新的工具来对抗糟糕的设计和缓慢的性能。这是我的万能腰带。
              </motion.p>
            </div>

            <div className="w-full md:w-2/3 space-y-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between font-bold uppercase tracking-wider text-[#00E5FF] drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-6 w-full bg-[#13141C] border-2 border-[#00E5FF] shadow-[inset_0_0_10px_rgba(0,229,255,0.2)] overflow-hidden p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1), type: "spring" }}
                      className={`h-full ${skill.color} border-r-2 border-white shadow-[0_0_10px_currentColor]`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
