
import React, { useState } from 'react';
import { SCENARIOS } from '../constants';
import { Camera } from 'lucide-react';

interface Props {
  onStartAR: () => void;
}

const ProblemContext: React.FC<Props> = ({ onStartAR }) => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [hypothesis, setHypothesis] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img 
              src={selectedScenario.image} 
              alt={selectedScenario.title} 
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Real-world Scenario</span>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">{selectedScenario.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {selectedScenario.description}
            </p>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
              <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                คำถามชวนคิด
              </h4>
              <ul className="space-y-3">
                {selectedScenario.questions.map((q, i) => (
                  <li key={i} className="text-slate-700 text-sm italic">"{q}"</li>
                ))}
              </ul>
            </div>

            <button 
              onClick={onStartAR}
              className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95"
            >
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              สำรวจด้วย AR เพื่อค้นหาความจริง
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedScenario(s)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedScenario.id === s.id 
                ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100' 
                : 'bg-white border-slate-200 hover:border-indigo-200'
            }`}
          >
            <div className="aspect-video mb-3 rounded-lg overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">{s.title}</h4>
          </button>
        ))}
      </div>

      <section className="bg-indigo-900 rounded-2xl p-8 text-white shadow-xl">
        <h4 className="text-xl font-bold mb-4">สมมติฐานของคุณ (Hypothesis)</h4>
        <p className="text-indigo-200 mb-4 text-sm">จากการสังเกตเบื้องต้น คุณคิดว่าเงื่อนไขใดที่ทำให้วัตถุข้างต้นนิ่งอยู่ได้? ลองพิมพ์ความคิดเห็นของคุณก่อนจะไปสำรวจด้วยเครื่องมือทางปัญญา</p>
        <textarea 
          value={hypothesis}
          onChange={(e) => setHypothesis(e.target.value)}
          placeholder="พิมพ์สมมติฐานของคุณที่นี่..."
          className="w-full h-32 bg-indigo-800/50 border border-indigo-700 rounded-xl p-4 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
        <div className="mt-4 flex justify-end">
          <button className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
            บันทึกสมมติฐาน
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProblemContext;
