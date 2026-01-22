
import React, { useState } from 'react';
import { SCENARIOS } from '../constants';
import { ChevronRight, HelpCircle, Search, Info, Box, Anchor } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const ProblemBase: React.FC<Props> = ({ onNext }) => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);

  const renderScenarioDiagram = (id: string) => {
    switch (id) {
      case 'bridge_equilibrium':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-2xl">
            <rect x="50" y="150" width="40" height="50" fill="#94a3b8" rx="4" />
            <rect x="310" y="150" width="40" height="50" fill="#94a3b8" rx="4" />
            <rect x="50" y="140" width="300" height="10" fill="#78350f" rx="2" />
            <circle cx="150" cy="120" r="15" fill="#ef4444" />
            <path d="M 150 135 L 150 160" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-tip)" />
            <text x="142" y="100" fontSize="10" fill="white" fontWeight="bold">W</text>
            <defs>
              <marker id="arrow-tip" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>
          </svg>
        );
      case 'lever_system':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-2xl">
            <path d="M 180 160 L 200 120 L 220 160 Z" fill="#475569" />
            <rect x="50" y="110" width="300" height="10" fill="#64748b" rx="2" />
            <rect x="70" y="80" width="40" height="30" fill="#6366f1" rx="4" />
            <text x="80" y="70" fontSize="12" fill="#6366f1" fontWeight="black">M1</text>
            <path d="M 320 120 L 320 160" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-red)" />
            <text x="330" y="145" fontSize="12" fill="#f43f5e" fontWeight="black">F</text>
            <defs>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
              </marker>
            </defs>
          </svg>
        );
      case 'pulley_mechanics':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-2xl">
            <line x1="100" y1="20" x2="300" y2="20" stroke="#334155" strokeWidth="4" />
            <circle cx="200" cy="60" r="25" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            <path d="M 175 60 L 175 140" stroke="#475569" strokeWidth="2" />
            <path d="M 225 60 L 225 120" stroke="#475569" strokeWidth="2" />
            <rect x="155" y="140" width="40" height="40" fill="#6366f1" rx="4" />
            <path d="M 225 120 L 225 160" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-red)" />
          </svg>
        );
      case 'inclined_plane':
        return (
          <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-2xl">
            {/* 30 degree incline: base 260px, height 150px approx */}
            <path d="M 50 170 L 310 170 L 310 20 Z" fill="none" stroke="#64748b" strokeWidth="3" />
            
            {/* Box A rotated -30 degrees to match slope */}
            <rect x="155" y="78" width="50" height="35" fill="#6366f1" transform="rotate(-30, 180, 95.5)" rx="4" />
            <text x="175" y="100" fontSize="12" fontWeight="bold" fill="white" transform="rotate(-30, 180, 95.5)" textAnchor="middle">A</text>
            
            {/* Pulley at the peak (310, 20) */}
            <circle cx="310" cy="20" r="10" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            
            {/* Rope: Connecting from the side of Box A to the pulley */}
            <path d="M 185 88 L 310 10" fill="none" stroke="#475569" strokeWidth="2" />
            {/* Rope hanging down to Mass B */}
            <path d="M 320 20 L 320 100" fill="none" stroke="#475569" strokeWidth="2" />
            
            {/* Mass B */}
            <rect x="305" y="100" width="30" height="40" fill="#f43f5e" stroke="#be123c" strokeWidth="2" rx="4" />
            <text x="320" y="125" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">B</text>
            
            <text x="80" y="165" fontSize="12" fill="#64748b" fontWeight="bold">30°</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 slide-in-from-bottom-4">
      <div className="bg-indigo-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/5 relative group bg-indigo-950/50 flex items-center justify-center p-12">
            <div className="w-full max-w-lg aspect-video transition-transform duration-1000 group-hover:scale-105">
               {renderScenarioDiagram(selectedScenario.id)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] max-w-xs animate-in slide-in-from-left-6 duration-700">
               <div className="flex items-center gap-3 text-indigo-300 mb-2">
                 <Search className="w-5 h-5" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Physics Visualization</span>
               </div>
               <p className="text-white/80 text-sm font-medium leading-relaxed italic">
                 "แผนภาพจำลองสถานการณ์ {selectedScenario.title}"
               </p>
            </div>
          </div>
          
          <div className="lg:w-2/5 p-12 flex flex-col justify-center text-white relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/10">
              <Anchor className="w-4 h-4 text-indigo-300" /> 1) สถานการณ์ปัญหา
            </div>
            
            <h3 className="text-4xl font-black mb-6 leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
              {selectedScenario.title}
            </h3>
            
            <p className="text-indigo-100/70 leading-relaxed mb-8 text-lg font-medium">
              {selectedScenario.description}
            </p>
            
            <div className="space-y-4 mb-10">
              {selectedScenario.questions.map((q, i) => (
                <div key={i} className="flex gap-4 items-start bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group cursor-default">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/30 flex items-center justify-center text-xs font-black shrink-0 group-hover:bg-indigo-500 group-hover:scale-110 transition-all">{i+1}</span>
                  <p className="text-sm font-bold italic text-indigo-50 opacity-90 leading-snug">"{q}"</p>
                </div>
              ))}
            </div>

            <button 
              onClick={onNext}
              className="group w-full flex items-center justify-center gap-3 bg-white text-indigo-900 font-black py-5 px-8 rounded-[2rem] transition-all shadow-xl hover:bg-indigo-50 active:scale-95 text-xl"
            >
              เริ่มการวิเคราะห์เชิงระบบ
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-100">
              <Box className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">เลือกสถานการณ์เพื่อเริ่มต้น</h4>
          </div>
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Mechanical Equilibrium Scenarios</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenario(s)}
              className={`group p-4 rounded-[2.5rem] border transition-all duration-500 text-left relative overflow-hidden ${
                selectedScenario.id === s.id 
                  ? 'bg-white border-indigo-200 ring-4 ring-indigo-50 shadow-2xl scale-[1.02] -translate-y-2' 
                  : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-xl'
              }`}
            >
              <div className="aspect-[4/3] rounded-[1.8rem] overflow-hidden mb-5 bg-slate-50 p-6 flex items-center justify-center">
                 <div className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity">
                   {renderScenarioDiagram(s.id)}
                 </div>
              </div>
              <div className="px-2 pb-2">
                <h4 className={`font-black text-lg tracking-tight mb-2 transition-colors ${
                  selectedScenario.id === s.id ? 'text-indigo-600' : 'text-slate-700 group-hover:text-indigo-500'
                }`}>
                  {s.title}
                </h4>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${selectedScenario.id === s.id ? 'bg-indigo-500 animate-pulse' : 'bg-slate-200'}`}></div>
                   <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">วิเคราะห์สมดุลกล</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemBase;
