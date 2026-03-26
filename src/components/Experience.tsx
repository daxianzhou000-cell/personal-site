import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, ArrowLeft, ArrowRight, Sparkles, Zap, Bot, Terminal, LayoutTemplate, Activity, Lightbulb, Video, Scissors, Image as ImageIcon } from 'lucide-react';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const getVisualIcon = (name: string) => {
  switch(name) {
    case 'Bot': return <Bot size={32} strokeWidth={2} />;
    case 'Terminal': return <Terminal size={32} strokeWidth={2} />;
    case 'LayoutTemplate': return <LayoutTemplate size={32} strokeWidth={2} />;
    case 'Activity': return <Activity size={32} strokeWidth={2} />;
    case 'Lightbulb': return <Lightbulb size={32} strokeWidth={2} />;
    case 'Video': return <Video size={32} strokeWidth={2} />;
    case 'Scissors': return <Scissors size={32} strokeWidth={2} />;
    default: return <Sparkles size={32} strokeWidth={2} />;
  }
};

const expData = [
  {
    id: "exp1",
    role: "AI产品经理",
    company: "想法流",
    period: "2025.12 - 2026.02",
    logoBg: "bg-[#FFE600]",
    logoText: "想",
    logoUrl: asset('xiangfaliu.png'),
    projectContent: "针对造梦次元平台“角色周边”模块定制成本高、复用性弱、迭代效率低的问题，参与搭建小剧场通用内容框架，沉淀“配置化编排 + Agent 生成 + H5 渲染”的标准化生产模式，支撑多主题内容快速复用与上线。",
    details: [
      {
        title: "Agent搭建",
        desc: "基于 n8n 参与搭建“小剧场”图文内容生成 Agent，串联记忆提取、Prompt 处理、正文生成、富文本重构、生图提示词转写等核心环节，形成“内容创作 + 视觉化表达”一体化链路；通过流程节点编排与模块拆分，提升内容生产效率并优化长文本生成场景下的 token 消耗。",
        iconName: "Bot",
        visualColor: "bg-[#00E5FF]",
        tags: ["n8n", "Agent", "Token优化"]
      },
      {
        title: "Prompt工程",
        desc: "围绕甜蜜、悲伤、中性等不同题材，结合输出稳定性与文学表现评估，参与选定ds_V3.2 与 Gemini 3 Pro 作为核心模型，并针对模型差异制定剧本生成 Prompt 策略：对 DS 强化结构化约束与富文本规则优先级，以提升格式化输出稳定性、降低叙事跑偏；对 Gemini 侧重文学性与表达张力引导，避免内容同质化。同步约束角色设定、人设边界、叙事调性、互动节奏及输出结构，提升沉浸式图文内容的稳定产出与移动端阅读体验。",
        iconName: "Terminal",
        visualColor: "bg-[#FF00FF]",
        tags: ["Prompt", "Gemini 3 Pro", "ds_V3.2"]
      },
      {
        title: "调研原型验证",
        desc: "围绕图文剧场功能方向，调研《星野》《猫箱》等 AI 陪伴产品在记忆相关度、剧本题材偏好、视觉化表达等方面的用户反馈与产品策略，提炼核心竞争要素；基于 AI 辅助快速搭建小剧场网页版原型，前置验证产品形态、交互路径及内容消费逻辑的可行性。",
        iconName: "LayoutTemplate",
        visualColor: "bg-[#FFE600]",
        tags: ["竞品调研", "原型设计", "用户反馈"]
      },
      {
        title: "功能调优",
        desc: "针对功能上线初期特殊剧场生成失败率偏高、生成失败链路复杂等问题，参与优化安全边界约束与异常处理逻辑，提升内容拦截精细度与生成链路稳定性；同时针对用户首轮体验与引导不足的问题，参与页面交互重构及视觉反馈优化，改善功能理解成本与内容消费转化效率。",
        iconName: "Activity",
        visualColor: "bg-[#FF2A2A]",
        tags: ["异常处理", "交互重构", "转化率"]
      }
    ],
    themeColor: "bg-[#FFE600]",
    textColor: "text-black",
  },
  {
    id: "exp2",
    role: "内容运营",
    company: "芒果TV",
    period: "2025.07 - 2025.10",
    logoBg: "bg-[#FF5500]",
    logoText: "芒",
    logoUrl: asset('mgtv.png'),
    projectContent: "参与芒果TV自研 AIGC 平台的内容生态建设，负责垂直领域账号的内容策划与全链路运营。通过 AI 视频技术优化传统内容创作路径，实现高频次的优质内容产出。",
    details: [
      {
        title: "选题策划",
        desc: "深度调研平台热点趋势与用户偏好，负责短视频账号的选题策划与文案脚本撰写；针对 AIGC 创作特点优化脚本结构，提升文案与 AI 生成画面的适配度，助力账号周均新增粉丝增长 10%。",
        iconName: "Lightbulb",
        visualColor: "bg-[#FFE600]",
        tags: ["热点趋势", "脚本撰写", "粉丝增长"]
      },
      {
        title: "多模态AI 生成",
        desc: "熟练运用 AIGC 工具进行视频生产，负责从 Prompt 撰写、角色一致性维护到镜头语言控制的全流程制作；独立产出符合调性的 AI 视频素材 10 余组，素材审核通过率达 90%。",
        iconName: "Video",
        visualColor: "bg-[#00E5FF]",
        tags: ["AIGC", "视频生产", "素材审核"]
      },
      {
        title: "后期与分发",
        desc: "负责素材的二次剪辑与视听包装，实现真人、3D 等多种视觉风格的平滑融合，视频完播率稳定在 40%；深度监测矩阵账号运营数据，熟悉平台底层算法与流量机制，实现平均互动率 15%，单条视频最高播放突破 10w+。",
        iconName: "Scissors",
        visualColor: "bg-[#FF00FF]",
        tags: ["二次剪辑", "流量机制", "10w+播放"]
      }
    ],
    themeColor: "bg-[#00E5FF]",
    textColor: "text-black",
  }
];

export default function Experience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedExp = expData.find(exp => exp.id === selectedId);

  return (
    <section id="experience" className="relative py-24 scroll-mt-20 bg-[#13141C] overflow-hidden font-sans border-t-2 border-[#FF00FF]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 229, 255, 0.3) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      {/* Giant Background Text to kill whitespace */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 whitespace-nowrap opacity-20 pointer-events-none select-none overflow-hidden flex z-0">
        <motion.h1 
          animate={{ x: [-1000, 0] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="text-[15rem] font-black uppercase tracking-tighter text-transparent"
          style={{ 
            WebkitTextStroke: '3px rgba(255, 0, 255, 0.3)',
            filter: 'drop-shadow(0 0 20px rgba(255, 0, 255, 0.15))'
          }}
        >
          EXPERIENCE EXPERIENCE EXPERIENCE EXPERIENCE
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Dynamic Comic-Style Title Section */}
        <div className="mb-12 md:mb-16 flex flex-col items-center justify-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative inline-block"
          >
            {/* Decorative comic dots background */}
            <div className="absolute -top-8 -left-8 w-20 h-20 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 0, 255, 0.5) 2px, transparent 0)', backgroundSize: '8px 8px' }}></div>
            
            {/* Main Title Box */}
            <div className="bg-[#1E212B] px-8 py-3 md:px-12 md:py-4 border-2 border-[#00E5FF] shadow-[6px_6px_0px_0px_rgba(0,229,255,0.8)] transform -rotate-2 relative z-10 group hover:rotate-0 transition-transform cursor-default">
              <h2 className="text-4xl md:text-6xl font-black tracking-widest text-white" style={{ WebkitTextStroke: '1px #00E5FF' }}>
                实习经历
              </h2>
              {/* Highlight tape */}
              <div className="absolute bottom-2 left-4 right-4 h-3 md:h-4 bg-[#FF00FF]/50 -z-10 mix-blend-screen"></div>
            </div>
            
            {/* Subtitle / Accent */}
            <div className="absolute -bottom-4 -right-4 md:-right-8 bg-[#FF00FF] text-white font-black text-sm md:text-lg px-4 py-1 border-2 border-[#FF00FF] shadow-[4px_4px_0px_0px_rgba(255,0,255,0.5)] transform rotate-3 z-20">
              EXPERIENCE
            </div>

            {/* Decorative Sparkle */}
            <div className="absolute -top-6 -right-6 text-[#FFE600] z-20 animate-pulse">
              <Sparkles size={48} strokeWidth={2} className="fill-current drop-shadow-[0_0_10px_rgba(255,230,0,0.8)]" />
            </div>
          </motion.div>
        </div>

        {/* Two-Page Layout using AnimatePresence */}
        <AnimatePresence mode="wait">
          {!selectedId ? (
            /* PAGE 1: TIMELINE VIEW */
            <motion.div
              key="timeline"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative pt-4 md:pt-8"
            >
              {/* Desktop Horizontal Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#00E5FF]/30 -translate-y-1/2 z-0"></div>

              <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center relative z-10">
                {expData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative w-full md:w-1/2 max-w-md group cursor-pointer"
                    onClick={() => setSelectedId(item.id)}
                  >
                    {/* Timeline Node (Desktop) */}
                    <div className="hidden md:flex absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 w-8 h-8 bg-[#1E212B] border-2 border-[#00E5FF] rounded-full z-20 items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.5)] group-hover:scale-125 group-hover:border-[#FF00FF] transition-all">
                      <div className={`w-3 h-3 ${item.themeColor} rounded-full shadow-[0_0_8px_currentColor]`}></div>
                    </div>

                    {/* Card */}
                    <div className={`bg-[#1E212B] border-2 border-[#00E5FF] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,229,255,0.8)] group-hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,0.8)] group-hover:border-[#FF00FF] group-hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden`}>
                      {/* Hover Background Accent */}
                      <div className={`absolute inset-0 ${item.themeColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 mix-blend-screen`}></div>
                      
                      {/* Company Logo Placeholder (Large box, Text in bottom-right) */}
                      <div className={`w-32 h-32 md:w-48 md:h-48 rounded-2xl border-2 border-[#00E5FF] ${item.logoBg} shadow-[4px_4px_0px_0px_rgba(0,229,255,0.5)] group-hover:border-[#FF00FF] group-hover:shadow-[4px_4px_0px_0px_rgba(255,0,255,0.5)] flex flex-col mb-6 transform group-hover:rotate-3 transition-all relative overflow-hidden`}>
                        {/* Main area for future image */}
                        <div className="flex-1 w-full h-full flex items-center justify-center bg-[#13141C]">
                          <img 
                            src={item.logoUrl} 
                            alt={`${item.company} logo`} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden flex-1 w-full h-full flex items-center justify-center bg-[#1E212B]">
                            <ImageIcon size={48} className="text-[#00E5FF]/50" />
                          </div>
                        </div>
                        
                        {/* Text in bottom right */}
                        <div className="absolute bottom-0 right-0 bg-[#1E212B] border-t-2 border-l-2 border-[#00E5FF] group-hover:border-[#FF00FF] px-3 py-1 rounded-tl-xl font-black text-xl md:text-2xl text-white shadow-[-2px_-2px_0px_0px_rgba(0,229,255,0.2)] z-10 transition-colors">
                          {item.logoText}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="bg-[#FF00FF] text-white px-4 py-1 font-bold text-sm border-2 border-[#FF00FF] shadow-[2px_2px_0px_0px_rgba(255,0,255,0.5)] mb-4">
                        {item.period}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-white group-hover:text-[#00E5FF] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {item.role}
                      </h3>
                      <h4 className="text-xl font-bold text-gray-400 mb-6 flex items-center justify-center gap-2">
                        <Briefcase size={20} className="text-[#00E5FF]" /> {item.company}
                      </h4>

                      {/* Action Button */}
                      <div className="mt-auto pt-6 w-full relative z-10">
                        <div className={`w-full py-3 border-2 border-[#00E5FF] font-black text-lg flex items-center justify-center gap-2 transition-all text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(0,229,255,0.5)]`}>
                          查看详情 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* PAGE 2: DETAIL VIEW */
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative bg-[#1E212B] border-2 border-[#FF00FF] shadow-[8px_8px_0px_0px_rgba(255,0,255,0.8)] p-6 md:p-10"
            >
              {selectedExp && (
                <>
                  {/* Top Navigation Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b-2 border-[#00E5FF]/30">
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="group flex items-center gap-3 bg-[#13141C] text-[#00E5FF] px-6 py-3 font-black text-lg border-2 border-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,229,255,0.8)] hover:-translate-y-1 transition-all self-start"
                    >
                      <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
                      返回时间轴
                    </button>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{selectedExp.role}</h3>
                        <p className="text-gray-400 font-bold flex items-center justify-end gap-2 mt-1">
                          <Briefcase size={16} className="text-[#FF00FF]" /> {selectedExp.company} <span className="mx-2 text-gray-600">|</span> <Calendar size={16} className="text-[#00E5FF]" /> {selectedExp.period}
                        </p>
                      </div>
                      {/* Small Logo */}
                      <div className={`w-16 h-16 rounded-xl border-2 border-[#00E5FF] ${selectedExp.logoBg} flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,229,255,0.8)] flex-shrink-0 overflow-hidden relative bg-[#13141C]`}>
                        <img 
                          src={selectedExp.logoUrl} 
                          alt={`${selectedExp.company} logo`} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <span className="hidden text-2xl font-black text-white">{selectedExp.logoText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Summary */}
                  <div className="mb-12 bg-[#13141C] border-2 border-[#00E5FF] p-6 md:p-8 relative shadow-[inset_0_0_20px_rgba(0,229,255,0.05)]">
                    <div className={`absolute -top-4 -left-4 w-12 h-12 ${selectedExp.themeColor} border-2 border-[#00E5FF] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,229,255,0.8)] -rotate-6`}>
                      <Sparkles size={24} className="text-black" />
                    </div>
                    <h4 className="text-xl font-black mb-4 inline-block bg-[#00E5FF] text-black px-3 py-1 ml-6 shadow-[2px_2px_0px_0px_rgba(255,0,255,0.5)]">核心项目内容</h4>
                    <p className="text-lg md:text-xl font-bold leading-relaxed text-gray-300">
                      {selectedExp.projectContent}
                    </p>
                  </div>

                  {/* Detailed Breakdown (Clean List Layout) */}
                  <div className="space-y-8">
                    <h4 className="text-2xl font-black uppercase tracking-widest border-b-2 border-[#FF00FF] pb-2 inline-block text-white drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]">
                      具体工作拆解
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-8">
                      {selectedExp.details.map((detail, i) => (
                        <div key={i} className="flex flex-col md:flex-row gap-6 items-start group">
                          {/* Icon Column */}
                          <div className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border-2 border-[#00E5FF] ${detail.visualColor} flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,229,255,0.8)] transform group-hover:rotate-6 group-hover:scale-110 transition-all text-black`}>
                            {getVisualIcon(detail.iconName)}
                          </div>
                          
                          {/* Content Column */}
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <h5 className="text-xl md:text-2xl font-black bg-[#FF00FF] text-white px-3 py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,229,255,0.5)]">
                                {detail.title}
                              </h5>
                              <div className="flex gap-2">
                                {detail.tags.map(tag => (
                                  <span key={tag} className="text-xs font-black bg-[#13141C] text-[#00E5FF] border border-[#00E5FF] px-2 py-1 uppercase shadow-[1px_1px_0px_0px_rgba(0,229,255,0.5)]">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 font-medium leading-relaxed text-base md:text-lg">
                              {detail.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
