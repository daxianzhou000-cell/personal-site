import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, X } from 'lucide-react';

const localVideo = (index: number) => `${import.meta.env.BASE_URL}videos/video${index}.mp4`;

const videos = [
  {
    title: "《变形记》",
    category: "荒谬怪诞",
    thumb: "https://my-portfolio-1416115630.cos.ap-guangzhou.myqcloud.com/%E3%80%8A%E5%8F%98%E5%BD%A2%E8%AE%B0%E3%80%8B%5B00-00-35%5D%5B20260326-005758671%5D.jpg",
    // 这里填入你压缩后上传到 public 文件夹的视频文件名，或者其他云盘的直链
    url: localVideo(1), 
  },
  {
    title: "《中式梦核》",
    category: "视觉盛宴",
    thumb: "https://my-portfolio-1416115630.cos.ap-guangzhou.myqcloud.com/c1%5B00-00-09%5D%5B20260326-005701755%5D.jpg",
    url: localVideo(2),
  },
  {
    title: "《局外人》",
    category: "不相干",
    thumb: "https://my-portfolio-1416115630.cos.ap-guangzhou.myqcloud.com/%E3%80%8A%E5%B1%80%E5%A4%96%E4%BA%BA%E3%80%8B%5B00-00-03%5D%5B20260326-005943762%5D.jpg",
    url: localVideo(3),
  },
  {
    title: "《玻璃山》",
    category: "大山压顶",
    thumb: "https://my-portfolio-1416115630.cos.ap-guangzhou.myqcloud.com/%E3%80%8A%E7%8E%BB%E7%92%83%E5%B1%B1%E3%80%8B%5B00-00-05%5D%5B20260326-010036619%5D.jpg",
    url: localVideo(4),
  },
  {
    title: "《美丽新84》-1",
    category: "梦之天堂",
    thumb: "https://my-portfolio-1416115630.cos.ap-guangzhou.myqcloud.com/0e6091e0-bfd3-47f5-ac9c-8f9cc685ee31_1758076186463575403~tplv-a9rns2rl98-web-preview-watermark.png",
    url: localVideo(5),
  },
  {
    title: "《美丽新84》-2",
    category: "死之压抑",
    thumb: "https://my-portfolio-1416115630.cos.ap-guangzhou.myqcloud.com/e034f6dd-e7f1-4042-8a8c-7c1d8c38a4c7%5B00-00-08%5D%5B20250926-091655477%5D.jpg",
    url: localVideo(6),
  },
  {
    title: "《工位越近素质越低》",
    category: "人之常情",
    thumb: "https://my-portfolio-1416115630.cos.ap-guangzhou.myqcloud.com/%E3%80%8A%E5%B7%A5%E4%BD%8D%E8%B6%8A%E8%BF%91%EF%BC%8C%E7%B4%A0%E8%B4%A8%E8%B6%8A%E4%BD%8E%E3%80%8B%5B00-00-11%5D%5B20260326-005842637%5D.jpg",
    url: localVideo(7),
  },
  {
    title: "《重生末世》",
    category: "海外出口",
    thumb: "https://my-portfolio-1416115630.cos.ap-guangzhou.myqcloud.com/3.png",
    url: localVideo(8),
  }
];

export default function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const openVideo = (video: typeof videos[0]) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="works" className="relative py-24 scroll-mt-20 bg-[#13141C] overflow-hidden font-sans border-t-2 border-[#00E5FF]">
      {/* Giant Background Text to kill whitespace */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-20 whitespace-nowrap opacity-20 pointer-events-none select-none overflow-hidden flex z-0">
        <motion.h1 
          animate={{ x: [0, -1000] }} 
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="text-[15rem] font-black uppercase tracking-tighter text-transparent"
          style={{ 
            WebkitTextStroke: '3px rgba(255, 230, 0, 0.3)',
            filter: 'drop-shadow(0 0 20px rgba(255, 230, 0, 0.15))'
          }}
        >
          AIGC WORKS AIGC WORKS AIGC WORKS AIGC WORKS
        </motion.h1>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        <div className="flex flex-col items-center justify-center mb-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-black tracking-widest uppercase text-white text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          精选 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] to-[#00E5FF] drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">AIGC创作</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#00E5FF] font-bold tracking-[0.3em] uppercase mt-3 text-sm drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]"
        >
          Featured AIGC Works
        </motion.p>
      </div>

      {/* Accordion Container */}
      <div className="flex h-[500px] md:h-[600px] w-full gap-3 md:gap-5 items-center justify-center pb-12 pt-2">
        {videos.map((video, i) => {
          const isHovered = hoveredIndex === i;
          
          // Stagger effect: increased for more obvious "错落有致" (staggered) feel
          const staggerY = i % 2 === 0 ? 35 : -35;

          return (
            <motion.div
              key={i}
              layout
              className={`relative h-[75%] md:h-[80%] cursor-pointer overflow-hidden border-2 border-[#00E5FF] shadow-[4px_4px_0px_0px_rgba(0,229,255,0.5)] bg-[#1E212B] rounded-2xl transition-all duration-500 ease-out hover:border-[#FF00FF] hover:shadow-[4px_4px_0px_0px_rgba(255,0,255,0.5)] ${
                isHovered ? 'flex-[4] md:flex-[5]' : 'flex-1'
              }`}
              animate={{ 
                y: staggerY
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openVideo(video)}
            >
              <img 
                src={video.thumb} 
                alt={video.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${isHovered ? 'opacity-100 scale-105' : 'opacity-60 saturate-75 scale-100'}`}
                style={{ objectPosition: (video as any).imagePosition || 'center' }}
                referrerPolicy="no-referrer"
              />
              
              {/* Play Button Overlay (visible on hover) */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-[#FF00FF] text-white p-4 rounded-full border-2 border-[#FF00FF] shadow-[4px_4px_0px_0px_rgba(255,0,255,0.8)] transform hover:scale-110 hover:bg-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[4px_4px_0px_0px_rgba(0,229,255,0.8)] hover:text-black transition-all">
                  <Play fill="currentColor" size={32} className="ml-1" />
                </div>
              </div>

              {/* Title overlay (visible on hover) */}
              <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#13141C]/90 via-[#13141C]/60 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <h3 className="text-white font-display font-black text-xl md:text-2xl uppercase leading-tight line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{video.title}</h3>
                <p className="text-[#00E5FF] font-bold text-sm tracking-wider uppercase mt-2 drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]">{video.category}</p>
              </div>
              
              {/* Vertical title when not hovered */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                <h3 className="text-white font-display font-black text-lg md:text-xl uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
                  {video.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#13141C]/92 p-4 md:p-12"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.3)] border-2 border-[#00E5FF]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white hover:text-[#FF00FF] transition-colors z-10 drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]"
                onClick={closeVideo}
              >
                <X size={36} />
              </button>

              <video
                src={selectedVideo.url}
                poster={selectedVideo.thumb}
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
