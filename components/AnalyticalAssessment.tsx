
import React, { useState } from 'react';
import { ClipboardCheck, ArrowRight, AlertCircle, RotateCcw, BrainCircuit, Info } from 'lucide-react';

const AnalyticalAssessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { 
      label: "1. การวิเคราะห์องค์ประกอบสถานการณ์", 
      question: "จากสถานการณ์วัตถุบนพื้นเอียง หากพื้นเอียง 'มีความเสียดทาน' จะส่งผลต่อค่าของมวล B อย่างไรเพื่อให้ระบบยังคงอยู่นิ่ง? จงอธิบายโดยใช้หลักการสมดุลของแรง", 
      icon: <ClipboardCheck className="w-6 h-6"/>,
      diagram: (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Precise 30 degree incline */}
          <path d="M 50 170 L 310 170 L 310 20 Z" fill="none" stroke="#64748b" strokeWidth="2" />
          <text x="75" y="165" fontSize="12" fill="#64748b" fontWeight="bold">30°</text>
          
          {/* Mass A correctly rotated on the incline */}
          <rect x="135" y="83" width="40" height="30" fill="#6366f1" stroke="#4338ca" strokeWidth="2" transform="rotate(-30, 155, 98)" />
          <text x="155" y="103" fontSize="12" fontWeight="bold" fill="white" transform="rotate(-30, 155, 98)" textAnchor="middle">A</text>
          
          {/* Pulley at the peak */}
          <circle cx="310" cy="20" r="10" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          
          {/* Rope: Connecting from the side of Box A to the top of the pulley */}
          <path d="M 165 91 L 310 10" fill="none" stroke="#475569" strokeWidth="2" />
          {/* Rope hanging down to Mass B */}
          <path d="M 320 20 L 320 100" fill="none" stroke="#475569" strokeWidth="2" />
          
          <rect x="305" y="100" width="30" height="40" fill="#f43f5e" stroke="#be123c" strokeWidth="2" rx="4" />
          <text x="320" y="125" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">B</text>
        </svg>
      )
    },
    { 
      label: "2. การเชื่อมโยงหลักการโมเมนต์", 
      question: "พิจารณาเรื่องแรงคู่ควบ หากเราเลื่อนตำแหน่งของแรงทั้งสองให้ห่างกันมากขึ้นเป็น 10 เมตร โดยที่ขนาดแรงยังคงเป็น 10 นิวตันเท่าเดิม จะส่งผลต่อแนวโน้มการหมุนของคานอย่างไร?", 
      icon: <AlertCircle className="w-6 h-6"/>,
      diagram: (
        <svg viewBox="0 0 400 150" className="w-full h-full">
          <rect x="100" y="70" width="200" height="10" fill="#94a3b8" />
          <text x="90" y="80" fontSize="14" fontWeight="bold">A</text>
          <text x="305" y="80" fontSize="14" fontWeight="bold">B</text>
          <path d="M 100 70 L 100 20" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-ana)" />
          <text x="110" y="30" fontSize="12" fill="#f43f5e">10 N</text>
          <path d="M 300 80 L 300 130" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-ana)" />
          <text x="260" y="125" fontSize="12" fill="#f43f5e">10 N</text>
          <path d="M 100 95 L 300 95" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
          <text x="180" y="110" fontSize="12">2 m</text>
          <defs>
            <marker id="arrow-ana" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
            </marker>
          </defs>
        </svg>
      )
    },
    { 
      label: "3. การสังเคราะห์ทางเลือกในการแก้ปัญหา", 
      question: "ในกรณีคานพาดเสา หากต้องการให้แรงที่เสา A รับน้ำหนัก 'ลดลง' โดยไม่เปลี่ยนมวล 10 กิโลกรัม เราควรเลื่อนตำแหน่งมวลไปทิศทางใด และใช้หลักการโมเมนต์อธิบายเหตุผล?", 
      icon: <ArrowRight className="w-6 h-6"/>,
      diagram: (
        <svg viewBox="0 0 400 150" className="w-full h-full">
          <rect x="50" y="60" width="300" height="8" fill="#94a3b8" />
          <rect x="50" y="68" width="10" height="40" fill="#475569" />
          <text x="50" y="125" fontSize="12">A</text>
          <rect x="340" y="68" width="10" height="40" fill="#475569" />
          <text x="340" y="125" fontSize="12">B</text>
          <rect x="120" y="40" width="20" height="20" fill="#6366f1" />
          <text x="110" y="35" fontSize="10" fontWeight="bold">10 kg</text>
          <path d="M 50 85 L 125 85" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrowSmall-ana)" />
          <text x="75" y="100" fontSize="10">50 cm</text>
          <path d="M 50 115 L 350 115" stroke="#64748b" strokeWidth="1" />
          <text x="190" y="130" fontSize="10">2 m</text>
          <defs>
            <marker id="arrowSmall-ana" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="bg-amber-500 rounded-[3rem] p-10 text-white shadow-xl shadow-amber-100 flex flex-col md:flex-row items-center gap-8">
         <div className="p-6 bg-white/20 backdrop-blur-xl rounded-[2.5rem] border border-white/20">
            <BrainCircuit className="w-12 h-12" />
         </div>
         <div className="text-center md:text-left">
            <h3 className="text-3xl font-black tracking-tight mb-1">แบบวัดการคิดวิเคราะห์</h3>
            <p className="text-amber-50 font-medium">ประเมินกระบวนการวิเคราะห์เชิงลึกจากภาพสถานการณ์</p>
         </div>
      </header>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-8 md:p-12 relative overflow-hidden flex flex-col lg:flex-row gap-12">
         <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <RotateCcw className="w-64 h-64 text-indigo-600 rotate-45" />
         </div>

         <div className="flex-1 relative z-10 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-black">
                {currentStep + 1}
              </div>
              <h4 className="text-xl font-black text-slate-800 tracking-tight">{steps[currentStep].label}</h4>
            </div>

            <p className="text-2xl md:text-3xl font-black text-slate-800 mb-8 leading-tight tracking-tight">
               {steps[currentStep].question}
            </p>
            
            <textarea 
               className="w-full h-64 bg-slate-50 border border-slate-200 rounded-[2rem] p-6 text-lg font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all resize-none mb-8 placeholder-slate-300 shadow-inner"
               placeholder="เขียนคำอธิบายกระบวนการวิเคราะห์ของคุณ..."
            />

            <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50">
                <button 
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className={`text-sm font-black uppercase tracking-widest transition-all ${
                    currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900'
                  }`}
                >
                  ย้อนกลับ
                </button>
                <button 
                  onClick={() => {
                    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
                    else alert("บันทึกการวิเคราะห์เรียบร้อย!");
                  }}
                  className="bg-amber-500 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-amber-600 shadow-xl shadow-amber-100 transition-all flex items-center gap-3 active:scale-95"
                >
                  {currentStep === steps.length - 1 ? 'ส่งการวิเคราะห์' : 'ข้อถัดไป'}
                  <ArrowRight className="w-6 h-6" />
                </button>
            </div>
         </div>

         <div className="lg:w-[400px] shrink-0 relative z-10">
            <div className="sticky top-24">
               <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 shadow-inner flex flex-col items-center">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Info className="w-4 h-4 text-amber-400" /> แผนภาพอ้างอิง
                  </div>
                  <div className="w-full aspect-square flex items-center justify-center">
                     {steps[currentStep].diagram}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnalyticalAssessment;
