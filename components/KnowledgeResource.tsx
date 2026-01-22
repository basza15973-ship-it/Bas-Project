
import React, { useState } from 'react';
import { 
  FileText, 
  BookOpen, 
  ArrowRight,
  Zap,
  Dna,
  Compass,
  Target,
  RotateCw,
  Box,
  ChevronRight
} from 'lucide-react';

const KnowledgeResource: React.FC = () => {
  const categories = [
    {
      id: 'fundamentals',
      title: '1. พื้นฐานและประเภทสมดุลกล',
      icon: <Zap className="w-5 h-5" />,
      resources: [
        { 
          id: 'f1', 
          title: 'สมดุลกล (Equilibrium) คืออะไร?', 
          source: 'PDF Page 1',
          type: 'Definition', 
          icon: <FileText className="w-6 h-6 text-indigo-500"/>, 
          color: 'bg-indigo-50', 
          content: 'สภาวะที่วัตถุรักษาสภาพการเคลื่อนที่ให้คงที่ ไม่ว่าจะอยู่นิ่งหรือเคลื่อนที่ด้วยความเร็วคงที่ เกิดขึ้นเมื่อผลรวมของแรงภายนอกเป็นศูนย์ (ΣF = 0)'
        },
        { 
          id: 'f2', 
          title: 'สมดุลสถิต vs สมดุลจลน์', 
          source: 'PDF Page 1',
          type: 'Classification', 
          icon: <Compass className="w-6 h-6 text-amber-500"/>, 
          color: 'bg-amber-50', 
          content: '1. สมดุลสถิต: วัตถุอยู่นิ่ง/ไม่หมุน (เช่น สมุดวางบนโต๊ะ) 2. สมดุลจลน์: เคลื่อนที่ด้วยความเร็วคงที่/หมุนด้วยอัตราเร็วคงที่'
        }
      ]
    },
    {
      id: 'mass_center',
      title: '2. ศูนย์กลางมวลและศูนย์ถ่วง',
      icon: <Target className="w-5 h-5" />,
      resources: [
        { 
          id: 'm1', 
          title: 'Center of Mass (C.M.)', 
          source: 'PDF Page 1',
          type: 'Concept', 
          icon: <Dna className="w-6 h-6 text-emerald-500"/>, 
          color: 'bg-emerald-50', 
          content: 'จุดรวมมวลของวัตถุทั้งหมด อยู่ประจำที่และไม่ขึ้นกับสถานที่ อาจอยู่ภายในหรือภายนอกเนื้อวัตถุก็ได้'
        },
        { 
          id: 'm2', 
          title: 'Center of Gravity (C.G.)', 
          source: 'PDF Page 1',
          type: 'Concept', 
          icon: <Target className="w-6 h-6 text-rose-500"/>, 
          color: 'bg-rose-50', 
          content: 'จุดที่แรงโน้มถ่วงของโลกกระทำต่อวัตถุ ถือเป็นจุดเสมือนที่รวมน้ำหนักทั้งหมด (จะตรงกับ C.M. หากสนามโน้มถ่วงสม่ำเสมอ)'
        }
      ]
    },
    {
      id: 'equilibrium_types',
      title: '3. ลักษณะของสมดุล 3 รูปแบบ',
      icon: <RotateCw className="w-5 h-5" />,
      resources: [
        { 
          id: 'e1', 
          title: 'สมดุลต่อการเลื่อนที่ (Translation)', 
          source: 'PDF Page 2',
          type: 'Equation', 
          icon: <ArrowRight className="w-6 h-6 text-blue-500"/>, 
          color: 'bg-blue-50', 
          content: 'สภาวะวัตถุอยู่นิ่งหรือเคลื่อนที่ด้วยความเร็วคงที่ เงื่อนไข: ΣF = 0'
        },
        { 
          id: 'e2', 
          title: 'สมดุลต่อการหมุน (Rotational)', 
          source: 'PDF Page 2',
          type: 'Equation', 
          icon: <RotateCw className="w-6 h-6 text-purple-500"/>, 
          color: 'bg-purple-50', 
          content: 'สภาวะวัตถุมีอัตราการหมุนคงที่ เงื่อนไข: ΣM = 0 (โมเมนต์ทวน = โมเมนต์ตาม)'
        },
        { 
          id: 'e3', 
          title: 'สมดุลสัมบูรณ์ (Absolute)', 
          source: 'PDF Page 2',
          type: 'Full System', 
          icon: <Zap className="w-6 h-6 text-orange-500"/>, 
          color: 'bg-orange-50', 
          content: 'วัตถุอยู่นิ่งและไม่หมุน ต้องเป็นไปตามเงื่อนไขทั้งสองข้อ: ΣF = 0 และ ΣM = 0'
        }
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header Banner */}
      <div className="bg-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
           <div className="p-8 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-inner">
             <BookOpen className="w-16 h-16 text-indigo-300"/>
           </div>
           <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-white/10">
                Course Materials (PDF Summary)
              </div>
              <h3 className="text-5xl font-black tracking-tighter mb-4 leading-none">สรุปองค์ความรู้สมดุลกล</h3>
              <p className="text-indigo-100/70 text-xl font-medium max-w-2xl leading-relaxed">
                เจาะลึกเนื้อหาจากบทเรียน ตั้งแต่นิยามพื้นฐานไปจนถึงการวิเคราะห์สมดุลสัมบูรณ์และขั้นตอนการแก้โจทย์
              </p>
           </div>
        </div>
      </div>

      {/* Categories Content */}
      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-8">
            <div className="flex items-center gap-4 px-2">
              <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-indigo-600">
                {cat.icon}
              </div>
              <h4 className="text-2xl font-black text-slate-800 tracking-tight">{cat.title}</h4>
              <div className="flex-1 h-[2px] bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cat.resources.map((res: any) => (
                <div 
                  key={res.id} 
                  className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 flex flex-col h-full"
                >
                  <div className={`p-5 rounded-2xl ${res.color} mb-8 self-start group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                    {res.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                       {res.source}
                    </div>
                    <h5 className="font-black text-xl text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                      {res.title}
                    </h5>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      {res.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-50">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</span>
                        <span className="text-sm font-bold text-slate-600">{res.type}</span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Special Detail: Case Analysis from Page 2 & 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] p-10">
          <h5 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <Box className="w-5 h-5 text-indigo-500" /> การวิเคราะห์แรง 3 แรง (Page 2)
          </h5>
          <ul className="space-y-4">
            {[
              "หากแรงไม่ขนานกัน สภาพสมดุลจะเกิดเมื่อแรงทั้ง 3 อยู่บนระนาบเดียวกัน",
              "แนวแรงทั้ง 3 ต้องตัดกันที่จุดเดียวกัน",
              "ผลรวมของเวกเตอร์แรงทั้ง 3 ต้องเป็นศูนย์ (รูปหลายเหลี่ยมปิด)"
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-sm font-medium text-slate-600 leading-relaxed">
                <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-xl shadow-indigo-100">
          <h5 className="text-xl font-black mb-6 flex items-center gap-2">
            <RotateCw className="w-5 h-5" /> สูตรการคำนวณที่สำคัญ (Page 2)
          </h5>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-60">Force Balance</span>
              <p className="text-2xl font-black font-mono">ΣF = 0</p>
            </div>
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-60">Momentum</span>
              <p className="text-2xl font-black font-mono">ΣM = 0</p>
            </div>
            <div className="col-span-2 bg-white/10 p-5 rounded-2xl border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 opacity-60">Moment Equation</span>
              <p className="text-xl font-black font-mono leading-tight">M = F × L</p>
              <p className="text-[10px] mt-1 opacity-60 font-medium">(L = ระยะทางจากจุดหมุนไปตั้งฉากแนวแรง)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Solving Steps Banner (Page 3) */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500 blur-[120px]"></div>
        </div>
        <div className="relative z-10">
          <h4 className="text-3xl font-black mb-10 text-center tracking-tight">ขั้นตอนการแก้โจทย์สมดุลกล</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "1", t: "วาดรูปสถานการณ์", d: "แสดงแรงทั้งหมดที่กระทำ (FBD)" },
              { n: "2", t: "แตกแรงเข้าแกน", d: "แยกแรงเข้าแกน x และ y" },
              { n: "3", t: "รวมองค์ประกอบ", d: "ΣFx = 0 และ ΣFy = 0" },
              { n: "4", t: "คำนวณหาปริมาณ", d: "ใช้เงื่อนไข ΣF = 0 แก้สมการ" }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-black text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                  {step.n}
                </div>
                <h6 className="font-bold text-lg mb-2">{step.t}</h6>
                <p className="text-slate-400 text-sm font-medium">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeResource;
