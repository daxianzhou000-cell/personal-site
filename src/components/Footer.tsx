import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#13141C] border-t-2 border-[#00E5FF] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display font-black text-3xl uppercase tracking-tighter text-white drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
          My<span className="text-[#FF00FF] drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]" style={{ WebkitTextStroke: '1px #FF00FF' }}>Cyber</span>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="bg-[#1E212B] text-[#00E5FF] border-2 border-[#00E5FF] p-3 hover:bg-[#FF00FF] hover:text-white hover:border-[#FF00FF] hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,229,255,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(255,0,255,0.8)]">
            <Github size={24} />
          </a>
          <a href="#" className="bg-[#1E212B] text-[#00E5FF] border-2 border-[#00E5FF] p-3 hover:bg-[#00E5FF] hover:text-black hover:border-[#00E5FF] hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,229,255,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(0,229,255,0.8)]">
            <Twitter size={24} />
          </a>
          <a href="#" className="bg-[#1E212B] text-[#00E5FF] border-2 border-[#00E5FF] p-3 hover:bg-[#FFE600] hover:text-black hover:border-[#FFE600] hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,229,255,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(255,230,0,0.8)]">
            <Mail size={24} />
          </a>
        </div>
        
        <div className="font-bold uppercase text-sm text-center md:text-right text-gray-400">
          © {new Date().getFullYear()} 保留所有权利。 <br/>
          用 <span className="text-[#FF00FF] drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">❤</span> 和赛博朋克风格构建。
        </div>
      </div>
    </footer>
  );
}
