
import React, { useState } from 'react';
import { 
  Layers, 
  GitBranch, 
  LayoutGrid, 
  Camera,
  Anchor,
  Lightbulb,
  Box,
  RefreshCw,
  Zap,
  MousePointer2,
  ArrowRightLeft,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Target,
  // Added missing HelpCircle icon
  HelpCircle
} from 'lucide-react';
import ARExploration from './ARExploration';

const CognitiveScaffolding: React.FC = () => {
  const [activeTool, setActiveTool] = useState<number>(0);

  const tools = [
    { 
      title: '1. เกมจำแนกองค์ประกอบ', 
      desc: 'ภารกิจคัดกรองตัวแปรสำคัญ (Identify Key Components)',
      icon: <Layers className="w-5 h-5" />,
      content: <ComponentIdentificationTool />
    },
    { 
      title: '2. ห้องแล็บความสัมพันธ์', 
      desc: 'วิเคราะห์ผลกระทบเชิงเหตุและผล (Cause & Effect Lab)',
      icon: <GitBranch className="w-5 h-5" />,
      content: <RelationshipAnalysisTool />
    },
    { 
      title: '3. เกมจัดระบบความรู้', 
      desc: 'สรุปโครงสร้างมโนทัศน์ (Knowledge Sorting Game)',
      icon: <LayoutGrid className="w-5 h-5" />,
      content: <KnowledgeStructuringTool />
    },
    {
      title: '4. ห้องแล็บเสมือน AR',
      desc: 'ทดลองแก้โจทย์ด้วย AR Lab (Interactive AR Physics)',
      icon: <Camera className="w-5 h-5" />,
      content: <ARExploration />
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Lightbulb className="w-40 h-40 text-indigo-600" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
            <Anchor className="w-4 h-4" /> 3. ฐานการช่วยเหลือ (Cognitive Scaffolding)
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter mb-4">เครื่องมือฝึกการคิดวิเคราะห์ (Interactive Learning)</h2>
          <p className="text-slate-500 max-w-2xl leading-relaxed font-medium text-lg">
            ใช้เครื่องมือเหล่านี้เพื่อสลายความซับซ้อนของโจทย์ฟิสิกส์ และสร้างความเข้าใจเชิงระบบผ่านการลงมือทำจริง
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTool(idx)}
            className={`flex flex-col p-6 rounded-[2rem] border transition-all duration-500 text-left relative overflow-hidden ${
              activeTool === idx 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100 -translate-y-1 scale-[1.02]' 
                : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-3 rounded-xl mb-4 self-start ${activeTool === idx ? 'bg-white/20' : 'bg-slate-50 text-indigo-500'}`}>
              {tool.icon}
            </div>
            <h4 className="font-black mb-1 text-sm uppercase tracking-tight">{tool.title}</h4>
            <p className={`text-[11px] leading-relaxed font-bold ${activeTool === idx ? 'text-indigo-100' : 'text-slate-400'}`}>
              {tool.desc}
            </p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden min-h-[700px]">
        {tools[activeTool].content}
      </div>
    </div>
  );
};

const ComponentIdentificationTool: React.FC = () => {
  const [scenario, setScenario] = useState<'lever' | 'incline'>('lever');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  const allItems = [
    { id: 1, label: 'แรงต้าน (Resistance)', target: ['lever'], icon: <Box className="w-5 h-5"/> },
    { id: 2, label: 'จุดหมุน (Pivot)', target: ['lever'], icon: <Anchor className="w-5 h-5"/> },
    { id: 3, label: 'แรงโน้มถ่วง (mg sin θ)', target: ['incline'], icon: <Zap className="w-5 h-5"/> },
    { id: 4, label: 'แรงเสียดทาน (f)', target: ['incline'], icon: <RefreshCw className="w-5 h-5"/> },
    { id: 5, label: 'แรงพยายาม (Effort)', target: ['lever'], icon: <MousePointer2 className="w-5 h-5"/> },
    { id: 6, label: 'ระยะตั้งฉาก (L)', target: ['lever', 'incline'], icon: <ArrowRightLeft className="w-5 h-5"/> },
    { id: 7, label: 'แรงแนวฉาก (N)', target: ['incline'], icon: <Layers className="w-5 h-5"/> },
    { id: 8, label: 'โมเมนต์ (M)', target: ['lever'], icon: <RefreshCw className="w-5 h-5"/> },
  ];

  const currentScenarioItems = allItems.filter(item => item.target.includes(scenario));

  return (
    <div className="p-10 space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 border-b border-slate-100 pb-8">
        <div>
          <h5 className="text-2xl font-black text-slate-800 tracking-tight">Level 1: ภารกิจคัดกรองตัวแปร</h5>
          <p className="text-slate-500 font-medium">"วิเคราะห์สถานการณ์และเลือกองค์ประกอบที่มีผลต่อสมดุลให้ถูกต้อง"</p>
        </div>
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button onClick={() => {setScenario('lever'); setSelectedItems([]);}} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${scenario === 'lever' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>ระบบคาน</button>
          <button onClick={() => {setScenario('incline'); setSelectedItems([]);}} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${scenario === 'incline' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>พื้นเอียง</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
           <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">ตัวแปรที่พบได้ในธรรมชาติ</h6>
           <div className="grid grid-cols-1 gap-3">
             {allItems.map(item => (
               <button
                 key={item.id}
                 onClick={() => {
                   if (selectedItems.includes(item.id)) {
                     setSelectedItems(prev => prev.filter(i => i !== item.id));
                   } else {
                     setSelectedItems(prev => [...prev, item.id]);
                   }
                 }}
                 className={`w-full p-5 rounded-3xl border-2 text-left flex items-center gap-6 transition-all ${
                   selectedItems.includes(item.id) 
                   ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg -translate-x-2' 
                   : 'bg-white border-slate-50 hover:border-indigo-100 text-slate-600 shadow-sm'
                 }`}
               >
                  <div className={`p-3 rounded-xl ${selectedItems.includes(item.id) ? 'bg-white/20' : 'bg-slate-100 text-indigo-500'}`}>
                    {item.icon}
                  </div>
                  <span className="font-black text-sm">{item.label}</span>
                  {selectedItems.includes(item.id) && <CheckCircle2 className="w-5 h-5 ml-auto animate-in zoom-in" />}
               </button>
             ))}
           </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-slate-50 rounded-[3rem] border border-slate-200 p-10 flex flex-col min-h-[400px]">
             <div className="flex justify-between items-center mb-10">
                <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">การวิเคราะห์สถานการณ์: {scenario === 'lever' ? 'คาน' : 'พื้นเอียง'}</h6>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Active analysis</span>
                </div>
             </div>

             <div className="flex-1 flex flex-wrap content-start gap-3">
                {selectedItems.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 italic py-20">
                    <MousePointer2 className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-sm font-bold">เลือกตัวแปรจากรายการเพื่อเริ่มการจำแนก</p>
                  </div>
                ) : (
                  selectedItems.map(id => {
                    const item = allItems.find(i => i.id === id);
                    const isCorrect = item?.target.includes(scenario);
                    return (
                      <div key={id} className={`px-5 py-3 rounded-2xl border-2 flex items-center gap-3 animate-in zoom-in duration-300 ${isCorrect ? 'bg-white border-emerald-100 text-emerald-700 shadow-sm' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        <span className="text-xs font-black">{item?.label}</span>
                      </div>
                    );
                  })
                )}
             </div>

             {selectedItems.length > 0 && (
               <div className="mt-8 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  {selectedItems.every(id => allItems.find(i => i.id === id)?.target.includes(scenario)) && selectedItems.length === currentScenarioItems.length ? (
                    <div className="text-center space-y-3">
                       <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
                       <h6 className="font-black text-emerald-600 text-lg">สมบูรณ์แบบ!</h6>
                       <p className="text-xs text-slate-500 font-medium italic">"คุณจำแนกองค์ประกอบที่จำเป็นในระบบนี้ได้ครบถ้วนและแม่นยำ"</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 font-bold text-center uppercase tracking-widest">วิเคราะห์ความสัมพันธ์ของแต่ละตัวแปรต่อไป...</p>
                  )}
               </div>
             )}
          </div>
          
          <div className="bg-indigo-900 text-white p-8 rounded-[2.5rem] flex items-center gap-6">
             <div className="p-4 bg-white/10 rounded-2xl"><HelpCircle className="w-6 h-6 text-indigo-300"/></div>
             <p className="text-xs font-medium leading-relaxed italic opacity-90">
               "หัวใจของการจำแนกคือการมองหาว่า 'แรง' และ 'ระยะทาง' ใดบ้างที่มีผลโดยตรงต่อสมดุล หากเลือกเกินหรือขาด การคำนวณจะผิดพลาดทันที"
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RelationshipAnalysisTool: React.FC = () => {
  const [distance, setDistance] = useState(50);
  const [force, setForce] = useState(100);
  const [targetMoment, setTargetMoment] = useState(250);

  const moment = (force * (distance / 100));
  const isMatch = Math.abs(moment - targetMoment) < 5;

  return (
    <div className="p-10 space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-start border-b border-slate-100 pb-8">
        <div>
          <h5 className="text-2xl font-black text-slate-800 tracking-tight">Level 2: ห้องแล็บความสัมพันธ์เชิงเหตุผล</h5>
          <p className="text-slate-500 font-medium">"ทดลองปรับเปลี่ยนตัวแปรเพื่อสร้างโมเมนต์ลัพธ์ให้ตรงตามเป้าหมาย"</p>
        </div>
        <div className="flex flex-col items-end">
           <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-amber-200 mb-2">
             Mission: Achieve {targetMoment} N⋅m
           </div>
           <button onClick={() => setTargetMoment(Math.floor(Math.random() * 400) + 50)} className="text-[10px] font-black text-indigo-500 underline uppercase tracking-widest hover:text-indigo-700 transition-colors">สุ่มโจทย์ใหม่</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-12 bg-white p-10 rounded-[3rem] border border-slate-50 shadow-inner">
           <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ระยะห่างจากจุดหมุน (L)</label>
                <span className="text-xl font-mono font-black text-indigo-600">{(distance/100).toFixed(2)} m</span>
              </div>
              <input 
                type="range" min="10" max="100" value={distance} 
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
           </div>

           <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">ขนาดแรงพยายาม (F)</label>
                <span className="text-xl font-mono font-black text-rose-600">{force} N</span>
              </div>
              <input 
                type="range" min="10" max="500" value={force} 
                onChange={(e) => setForce(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
           </div>

           <div className="pt-8 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center italic">
              "เปลี่ยนเหตุ (F หรือ L) เพื่อดูผล (Moment)"
           </div>
        </div>

        <div className="relative">
           <div className={`p-16 rounded-[4rem] border-4 transition-all duration-700 flex flex-col items-center justify-center text-center overflow-hidden ${
             isMatch ? 'bg-emerald-600 border-emerald-700 shadow-2xl shadow-emerald-100 scale-[1.05]' : 'bg-slate-900 border-slate-800'
           }`}>
              <div className="absolute top-0 right-0 p-10 opacity-10 animate-spin-slow">
                 <RefreshCw className="w-48 h-48 text-white" />
              </div>

              <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${isMatch ? 'text-emerald-100' : 'text-slate-500'}`}>โมเมนต์ที่คำนวณได้</span>
              <h2 className={`text-7xl font-black mb-2 font-mono tracking-tighter transition-colors ${isMatch ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 to-rose-300'}`}>
                {moment.toFixed(1)}
              </h2>
              <span className={`text-xs font-bold uppercase tracking-widest ${isMatch ? 'text-emerald-100' : 'text-slate-500'}`}>Newton-Metre (N⋅m)</span>

              {isMatch && (
                <div className="mt-8 bg-white/20 backdrop-blur-md px-8 py-3 rounded-2xl text-white font-black text-sm flex items-center gap-3 animate-in bounce-in">
                  <Trophy className="w-5 h-5" /> ภารกิจสำเร็จ!
                </div>
              )}
           </div>

           <div className={`mt-8 p-6 rounded-2xl border transition-all ${isMatch ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-amber-50 border-amber-100 text-amber-800'}`}>
              <div className="flex items-center gap-3 font-black text-sm mb-2 uppercase tracking-wide">
                <Target className="w-4 h-4" /> 
                {isMatch ? 'ความรู้ตกผลึก:' : 'วิเคราะห์ผลลัพธ์:'}
              </div>
              <p className="text-xs font-medium italic leading-relaxed">
                {isMatch 
                  ? `ถูกต้อง! คุณสร้างโมเมนต์ ${targetMoment} N⋅m ได้สำเร็จ ความสัมพันธ์คือ M = F × L เมื่อเพิ่มอย่างหนึ่ง อีกอย่างหนึ่งสามารถลดลงได้เพื่อรักษาสมดุล`
                  : `ขาดอีก ${(targetMoment - moment).toFixed(1)} N⋅m ลองเพิ่มระยะ L หรือเพิ่มขนาดแรง F เพื่อให้ได้ผลลัพธ์ตามเป้าหมาย`
                }
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const KnowledgeStructuringTool: React.FC = () => {
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const concepts = [
    { id: 'c1', text: 'ΣF = 0', category: 'trans' },
    { id: 'c2', text: 'ΣM = 0', category: 'rot' },
    { id: 'c3', text: 'วัตถุอยู่นิ่ง/ไม่หมุน', category: 'abs' },
    { id: 'c4', text: 'Center of Mass', category: 'prop' },
  ];

  const categories = [
    { id: 'trans', label: 'สมดุลต่อการเลื่อนที่' },
    { id: 'rot', label: 'สมดุลต่อการหมุน' },
    { id: 'abs', label: 'สมดุลสัมบูรณ์' },
    { id: 'prop', label: 'คุณสมบัติของวัตถุ' },
  ];

  const checkResults = () => {
    let correct = 0;
    concepts.forEach(c => {
      if (matches[c.id] === c.category) correct++;
    });
    setFeedback(`คุณจับคู่ได้ถูกต้อง ${correct} จาก ${concepts.length} ข้อ`);
  };

  return (
    <div className="p-10 space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center border-b border-slate-100 pb-8">
        <div>
          <h5 className="text-2xl font-black text-slate-800 tracking-tight">Level 3: เกมจัดระบบมโนทัศน์</h5>
          <p className="text-slate-500 font-medium">"จับคู่มโนทัศน์ฟิสิกส์ให้เข้ากับหมวดหมู่หลักเพื่อสรุปความเข้าใจ"</p>
        </div>
        <button onClick={() => {setMatches({}); setFeedback(null);}} className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest flex items-center gap-2">
           <RefreshCw className="w-3 h-3" /> ล้างค่าทั้งหมด
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-4">
           <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Physics Concepts</h6>
           {concepts.map(c => (
             <div key={c.id} className="bg-white p-6 rounded-[2rem] border-2 border-slate-50 shadow-sm flex flex-col gap-4">
                <span className="text-xl font-black text-slate-800 font-mono">{c.text}</span>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                  value={matches[c.id] || ''}
                  onChange={(e) => setMatches({...matches, [c.id]: e.target.value})}
                >
                  <option value="">เลือกหมวดหมู่...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
             </div>
           ))}
        </div>

        <div className="flex flex-col">
           <div className="bg-indigo-50 rounded-[3rem] border border-indigo-100 p-10 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8">
                <LayoutGrid className="w-10 h-10 text-indigo-600" />
              </div>
              <h6 className="text-lg font-black text-slate-800 mb-2">โครงสร้างความรู้ในระบบ</h6>
              <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed mb-8 italic">
                การจัดหมวดหมู่ช่วยให้สมองสร้าง **Schema** ของความรู้ ซึ่งจะช่วยให้คุณดึงข้อมูลมาใช้แก้โจทย์ได้เร็วขึ้น
              </p>

              {feedback && (
                <div className="w-full bg-indigo-600 text-white p-6 rounded-[2rem] shadow-xl animate-in zoom-in mb-8">
                   <p className="font-black text-lg mb-1">{feedback}</p>
                   <p className="text-[10px] uppercase tracking-widest opacity-80">Knowledge Consolidation Stage</p>
                </div>
              )}

              <button 
                onClick={checkResults}
                disabled={Object.keys(matches).length < concepts.length}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
                  Object.keys(matches).length < concepts.length 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 active:scale-95'
                }`}
              >
                ตรวจสอบโครงสร้าง
                <ArrowRightLeft className="w-6 h-6" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveScaffolding;
