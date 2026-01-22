
import React, { useState } from 'react';
import { PlayCircle, FileText, ExternalLink, Youtube, Video, BookOpen, X } from 'lucide-react';

const OpenResources: React.FC = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const resources = [
    { 
      id: 'v1', 
      title: 'โมเมนต์ของแรง (Moment of Force) คืออะไร?', 
      type: 'Video Tutorial', 
      duration: '10:15', 
      icon: <Youtube className="w-6 h-6 text-red-500"/>, 
      color: 'bg-red-50', 
      link: 'https://www.youtube.com/embed/vMvS_O8XFmQ' 
    },
    { 
      id: 'v2', 
      title: 'สมดุลกล: การวิเคราะห์แรงบนพื้นเอียง', 
      type: 'Physics Deep Dive', 
      duration: '15:30', 
      icon: <Video className="w-6 h-6 text-purple-500"/>, 
      color: 'bg-purple-50', 
      link: 'https://www.youtube.com/embed/0xHqYitX-yM' 
    },
    { 
      id: 'v3', 
      title: 'โจทย์ปัญหา: บันไดพาดกำแพงลื่น', 
      type: 'Problem Solving', 
      duration: '08:45', 
      icon: <Youtube className="w-6 h-6 text-red-600"/>, 
      color: 'bg-red-50', 
      link: 'https://www.youtube.com/embed/mF_12B_Wn90' 
    },
    { 
      id: 'd1', 
      title: 'สรุปสูตรสมดุลกลและโมเมนต์ (PDF)', 
      type: 'Infographic', 
      duration: 'Cheat Sheet', 
      icon: <FileText className="w-6 h-6 text-indigo-500"/>, 
      color: 'bg-indigo-50', 
      link: '#' 
    },
    { 
      id: 's1', 
      title: 'PhET Simulation: Balance Lab (ฝึกสมดุลคาน)', 
      type: 'Interactive Lab', 
      duration: 'Sim', 
      icon: <ExternalLink className="w-6 h-6 text-emerald-500"/>, 
      color: 'bg-emerald-50', 
      link: 'https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_all.html' 
    },
    { 
      id: 'v4', 
      title: 'การทำงานของรอกและระบบผ่อนแรง', 
      type: 'Engineering Concept', 
      duration: '12:20', 
      icon: <Youtube className="w-6 h-6 text-red-400"/>, 
      color: 'bg-red-50', 
      link: 'https://www.youtube.com/embed/LiBcur1aqcg' 
    }
  ];

  const handleOpen = (res: typeof resources[0]) => {
    if (res.link.includes('youtube.com/embed')) {
      setActiveVideoUrl(res.link);
    } else if (res.link !== '#') {
      window.open(res.link, '_blank');
    } else {
      alert(`ไฟล์ "${res.title}" กำลังเตรียมการดาวน์โหลด...`);
    }
  };

  return (
    <div className="space-y-8">
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-20 hover:rotate-90"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video w-full">
              <iframe 
                src={activeVideoUrl} 
                className="w-full h-full" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8 bg-slate-900 border-t border-white/5">
               <div className="flex justify-between items-center text-white">
                  <div>
                    <h3 className="font-bold text-xl mb-1">วิดีโอประกอบการเรียนรู้</h3>
                    <p className="text-slate-400 text-sm">ศึกษาเนื้อหาเพิ่มเติมเพื่อนำไปปรับปรุงแบบจำลอง FBD ของคุณ</p>
                  </div>
                  <button onClick={() => setActiveVideoUrl(null)} className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-indigo-50 transition-colors">ปิดวิดีโอ</button>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-indigo-900 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20"><BookOpen className="w-10 h-10"/></div>
        <div className="flex-1 relative z-10 text-center md:text-left">
          <h3 className="text-3xl font-bold mb-2">คลังปัญญา (Knowledge Hub)</h3>
          <p className="text-indigo-100 text-lg opacity-80 leading-relaxed">ค้นพบความลับของแรงและสมดุลผ่านสื่อมัลติมีเดียที่คัดสรรมาเพื่อคุณโดยเฉพาะ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((res) => (
          <div 
            key={res.id} 
            onClick={() => handleOpen(res)}
            className="group cursor-pointer bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-500 hover:-translate-y-2"
          >
            <div className={`p-5 rounded-2xl ${res.color} mb-6 self-start group-hover:scale-110 transition-transform duration-500`}>
              {res.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight mb-3">
                {res.title}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{res.type}</span>
                <span className="text-slate-200">|</span>
                <span className="text-xs font-bold text-slate-500">{res.duration}</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
              <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">เปิดเนื้อหา</span>
              <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all duration-500">
                {res.link.includes('embed') ? <PlayCircle className="w-6 h-6" /> : <ExternalLink className="w-6 h-6" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenResources;
