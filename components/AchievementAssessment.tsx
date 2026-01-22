
import React, { useState } from 'react';
import { CheckCircle2, Trophy, ArrowRight, RotateCcw, Info, ClipboardList } from 'lucide-react';

const AchievementAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      text: "วัตถุ A มีมวล 10 กิโลกรัม วางบนพื้นเอียงลื่น อยากทราบว่ามวล B จะมีค่าเท่าไร มวล A จึงอยู่นิ่งได้?",
      diagram: (
        <svg viewBox="0 0 400 200" className="w-full h-48 bg-slate-50 rounded-xl">
          {/* Precise 30 degree incline */}
          <path d="M 50 170 L 310 170 L 310 20 Z" fill="none" stroke="#64748b" strokeWidth="2" />
          <text x="80" y="165" fontSize="12" fill="#64748b" fontWeight="bold">30°</text>
          
          {/* Mass A correctly rotated on the incline */}
          <rect x="135" y="83" width="40" height="30" fill="#6366f1" stroke="#4338ca" strokeWidth="2" transform="rotate(-30, 155, 98)" />
          <text x="155" y="103" fontSize="12" fontWeight="bold" fill="white" transform="rotate(-30, 155, 98)" textAnchor="middle">A</text>
          
          {/* Pulley at the peak */}
          <circle cx="310" cy="20" r="10" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          
          {/* Rope: Connecting from the top-side of Box A to the pulley */}
          <path d="M 165 91 L 310 10" fill="none" stroke="#475569" strokeWidth="2" />
          {/* Rope hanging down to Mass B */}
          <path d="M 320 20 L 320 100" fill="none" stroke="#475569" strokeWidth="2" />
          
          <rect x="305" y="100" width="30" height="40" fill="#f43f5e" stroke="#be123c" strokeWidth="2" rx="4" />
          <text x="320" y="125" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">B</text>
        </svg>
      ),
      options: ["ก. 5 กิโลกรัม", "ข. 10 กิโลกรัม", "ค. 10 sin 30° กิโลกรัม (5 kg)", "ง. 10 cos 30° กิโลกรัม"],
      correct: 2
    },
    {
      id: 2,
      text: "แรงคู่ควบขนาด 10 นิวตัน กระทำกับคาน AB ซึ่งยาว 2 เมตร ที่ปลายทั้งสองข้าง จงหาโมเมนต์ของแรงคู่ควบนี้?",
      diagram: (
        <svg viewBox="0 0 400 150" className="w-full h-48 bg-slate-50 rounded-xl">
          <rect x="100" y="70" width="200" height="10" fill="#94a3b8" />
          <text x="90" y="80" fontSize="14" fontWeight="bold">A</text>
          <text x="305" y="80" fontSize="14" fontWeight="bold">B</text>
          <path d="M 100 70 L 100 20" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-ach)" />
          <text x="110" y="30" fontSize="12" fill="#f43f5e">10 N</text>
          <path d="M 300 80 L 300 130" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow-ach)" />
          <text x="260" y="125" fontSize="12" fill="#f43f5e">10 N</text>
          <path d="M 100 95 L 300 95" stroke="#64748b" strokeWidth="1" strokeDasharray="4" />
          <text x="180" y="110" fontSize="12">2 m</text>
          <defs>
            <marker id="arrow-ach" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
            </marker>
          </defs>
        </svg>
      ),
      options: ["ก. 10 นิวตัน-เมตร", "ข. 20 นิวตัน-เมตร", "ค. 5 นิวตัน-เมตร", "ง. 0 นิวตัน-เมตร"],
      correct: 1
    },
    {
      id: 3,
      text: "วัตถุมวล 2 กิโลกรัม ผูกเชือกกับเพดาน จงหาความตึงในเส้นเชือก (T1 และ T2) เมื่อระบบสมดุล?",
      diagram: (
        <svg viewBox="0 0 400 200" className="w-full h-48 bg-slate-50 rounded-xl">
          <line x1="100" y1="20" x2="300" y2="20" stroke="#334155" strokeWidth="4" />
          <path d="M 150 20 L 200 100 L 250 20" fill="none" stroke="#475569" strokeWidth="2" />
          <line x1="200" y1="100" x2="200" y2="150" stroke="#475569" strokeWidth="2" />
          <rect x="185" y="150" width="30" height="30" fill="#6366f1" />
          <text x="192" y="170" fontSize="10" fill="white">2kg</text>
          <text x="160" y="50" fontSize="10">60°</text>
          <text x="230" y="50" fontSize="10">60°</text>
        </svg>
      ),
      options: ["ก. 10 นิวตัน", "ข. 20 นิวตัน", "ค. 11.55 นิวตัน", "ง. 23.1 นิวตัน"],
      correct: 2
    }
  ];

  const handleNext = () => {
    if (selectedOption === null) return;
    if (selectedOption === questions[currentQuestion].correct) setScore(score + 1);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto animate-in zoom-in duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-rose-600 p-12 text-center text-white relative">
            <Trophy className="w-24 h-24 mx-auto mb-6 drop-shadow-lg" />
            <h3 className="text-4xl font-black mb-2 tracking-tight">จบการทดสอบ!</h3>
            <p className="text-rose-100 font-medium">คะแนนของคุณสะท้อนความเข้าใจในเนื้อหาสมดุลกล</p>
          </div>
          <div className="p-12 text-center">
            <div className="text-8xl font-black text-slate-900 mb-8 tracking-tighter">
              {score}<span className="text-3xl text-slate-300">/{questions.length}</span>
            </div>
            <button onClick={() => { setCurrentQuestion(0); setScore(0); setShowResult(false); setSelectedOption(null); }}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-black flex items-center justify-center gap-3">
              <RotateCcw className="w-6 h-6" /> ทำแบบทดสอบใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-rose-500" />
          แบบวัดสัมฤทธิผลทางการเรียน
        </h3>
        <div className="bg-white border border-slate-200 px-6 py-2 rounded-2xl shadow-sm">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">ความก้าวหน้า</span>
           <div className="flex gap-1.5">
             {questions.map((_, i) => (
               <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i < currentQuestion ? 'bg-rose-500 w-6' : i === currentQuestion ? 'bg-rose-600 w-8 animate-pulse' : 'bg-slate-100 w-6'}`}></div>
             ))}
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest inline-block">
              ข้อที่ {currentQuestion + 1}
            </span>
            <h4 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
              {questions[currentQuestion].text}
            </h4>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button key={idx} onClick={() => setSelectedOption(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                    selectedOption === idx ? 'bg-rose-50 border-rose-500 shadow-sm' : 'bg-white border-slate-50 hover:border-rose-100'
                  }`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black transition-colors ${selectedOption === idx ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="font-bold text-slate-700">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col items-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Info className="w-4 h-4 text-rose-400" /> วิเคราะห์ภาพสถานการณ์
            </div>
            {questions[currentQuestion].diagram}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-50 flex justify-end">
          <button onClick={handleNext} disabled={selectedOption === null}
            className={`px-12 py-4 rounded-2xl font-black text-lg transition-all flex items-center gap-3 ${
              selectedOption !== null ? 'bg-rose-600 text-white shadow-xl hover:bg-rose-700 active:scale-95' : 'bg-slate-100 text-slate-300'
            }`}>
            {currentQuestion === questions.length - 1 ? 'ดูผลการทดสอบ' : 'ข้อถัดไป'}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementAssessment;
