
import React from 'react';
import { Sparkles, Brain } from 'lucide-react';

const Reflection: React.FC = () => {
  const reflectionQuestions = [
    "วันนี้คุณเข้าใจเรื่องสมดุลกลต่างจากเดิมอย่างไรบ้าง?",
    "จุดไหนที่คุณเข้าใจผิดตอนแรก และอะไรที่ทำให้คุณเปลี่ยนความคิด?",
    "เครื่องมือ AR ช่วยให้คุณมองเห็นสิ่งที่เคยมองไม่เห็นอย่างไร?",
    "หากต้องอธิบายเรื่องสมดุลกลให้เด็ก 10 ขวบฟัง คุณจะใช้อุปมาอุปไมยอะไร?"
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <div className="inline-flex p-4 bg-indigo-100 rounded-3xl text-indigo-600 mb-4 animate-bounce">
          <Brain className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800">การสะท้อนคิด (Reflection)</h3>
        <p className="text-slate-500 mt-2">การสะท้อนคิดคือขั้นตอนสำคัญที่ทำให้ความรู้ "ตกผลึก" กลายเป็นปัญญา</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reflectionQuestions.map((q, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
               <Sparkles className="w-12 h-12 text-indigo-500" />
            </div>
            <label className="block text-lg font-bold text-slate-700 mb-4 relative z-10">{q}</label>
            <textarea 
              className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all resize-none relative z-10"
              placeholder="เขียนสิ่งที่คุณค้นพบที่นี่..."
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 py-8">
        <button className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-black shadow-xl shadow-slate-200 hover:-translate-y-1 transition-all active:scale-95">
          บันทึกการเรียนรู้วันนี้
        </button>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">ข้อมูลนี้จะถูกเก็บไว้เป็นส่วนหนึ่งของแฟ้มสะสมผลงาน</p>
      </div>
    </div>
  );
};

export default Reflection;
