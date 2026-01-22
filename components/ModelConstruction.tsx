
import React, { useState, useRef, useMemo } from 'react';
import { Pencil, Trash2, Save, Type, ArrowUp, ArrowDown, Move, Info, CheckCircle2, Plus, Minus, Settings2, RotateCcw, Image as ImageIcon } from 'lucide-react';

interface VisualForce {
  id: number;
  x: number;
  y: number;
  magnitude: number;
  direction: 'up' | 'down';
  label: string;
}

type SystemType = 'lever' | 'combined_pulley';

const ModelConstruction: React.FC = () => {
  const [systemType, setSystemType] = useState<SystemType>('lever');
  const [description, setDescription] = useState('');
  const [forces, setForces] = useState<VisualForce[]>([]);
  const [pivotX, setPivotX] = useState(400);
  const [showReference, setShowReference] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const addForce = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.abs(y - 300) < 150) {
      const newForce: VisualForce = {
        id: Date.now(),
        x,
        y: 300,
        magnitude: 100,
        direction: y > 300 ? 'down' : 'up',
        label: `F${forces.length + 1}`
      };
      setForces([...forces, newForce]);
    }
  };

  const removeForce = (id: number) => {
    setForces(forces.filter(f => f.id !== id));
  };

  const toggleDirection = (id: number) => {
    setForces(forces.map(f => f.id === id ? { ...f, direction: f.direction === 'up' ? 'down' : 'up' } : f));
  };

  const updateMagnitude = (id: number, delta: number) => {
    setForces(forces.map(f => f.id === id ? { ...f, magnitude: Math.max(0, f.magnitude + delta) } : f));
  };

  const analysis = useMemo(() => {
    let sumTorque = 0;
    const ccwMoments: { label: string, value: number, dist: number, f: number }[] = [];
    const cwMoments: { label: string, value: number, dist: number, f: number }[] = [];

    forces.forEach(f => {
      const forceVal = f.direction === 'up' ? f.magnitude : -f.magnitude;
      const distancePx = f.x - pivotX;
      const distanceM = distancePx / 50; 
      
      const torque = forceVal * distanceM;
      sumTorque += torque;

      const info = { label: f.label, value: Math.abs(torque), dist: Math.abs(distanceM), f: f.magnitude };
      
      if (torque > 0.01) {
        ccwMoments.push(info);
      } else if (torque < -0.01) {
        cwMoments.push(info);
      }
    });

    return {
      sumTorque,
      ccwMoments,
      cwMoments,
      isBalanced: Math.abs(sumTorque) < 0.5 && forces.length > 0
    };
  }, [forces, pivotX]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-50/50 gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-800">เครื่องมือวิเคราะห์โมเมนต์และ FBD</h3>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => setSystemType('lever')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${systemType === 'lever' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}
              >ระบบคาน (กำหนดจุดหมุนได้)</button>
              <button 
                onClick={() => setSystemType('combined_pulley')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-all ${systemType === 'combined_pulley' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300'}`}
              >รอกและพื้นเอียง (W1-W2)</button>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {systemType === 'combined_pulley' && (
              <button 
                onClick={() => setShowReference(!showReference)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${showReference ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-white text-slate-600 border border-slate-200'}`}
              >
                <ImageIcon className="w-4 h-4" />
                {showReference ? 'ซ่อนภาพอ้างอิง' : 'แสดงภาพอ้างอิง'}
              </button>
            )}
            <button onClick={() => setForces([])} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors border border-transparent hover:border-red-200"><Trash2 className="w-5 h-5"/></button>
            <button onClick={() => alert('บันทึกโมเดลแล้ว')} className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-sm transition-all active:scale-95 flex items-center gap-2"><Save className="w-4 h-4"/> บันทึก</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[700px]">
          {/* Main Drawing Area */}
          <div ref={containerRef} onClick={addForce} className="flex-1 bg-white relative canvas-container overflow-hidden cursor-crosshair">
            
            {/* System Visuals */}
            {systemType === 'lever' && (
              <div className="absolute top-[300px] left-[5%] right-[5%] h-5 bg-amber-50 border-2 border-amber-200 rounded-full shadow-inner">
                <div 
                  className="absolute -bottom-8 -translate-x-1/2 cursor-move group/pivot"
                  style={{ left: pivotX }}
                  onMouseDown={(e) => {
                    const handleMove = (me: MouseEvent) => {
                      const rect = containerRef.current?.getBoundingClientRect();
                      if (rect) {
                        const newX = Math.max(rect.width * 0.05, Math.min(rect.width * 0.95, me.clientX - rect.left));
                        setPivotX(newX);
                      }
                    };
                    const handleUp = () => { window.removeEventListener('mousemove', handleMove); window.removeEventListener('mouseup', handleUp); };
                    window.addEventListener('mousemove', handleMove);
                    window.addEventListener('mouseup', handleUp);
                  }}
                >
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-slate-800 filter drop-shadow-md"></div>
                </div>
              </div>
            )}

            {systemType === 'combined_pulley' && (
              <div className="absolute inset-0 p-10 flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full max-w-2xl flex items-center justify-center">
                  {showReference ? (
                    <div className="bg-white/95 p-6 rounded-3xl border-2 border-indigo-100 shadow-2xl animate-in zoom-in-95 duration-300 pointer-events-auto">
                      <div className="relative overflow-hidden rounded-xl border border-slate-100">
                        <img 
                          src="pulley_system.png" 
                          alt="Pulley and Incline Diagram" 
                          className="max-h-[420px] w-auto transition-all duration-700 hover:scale-105"
                          onError={(e) => {
                            // Fallback rendering if the file isn't uploaded yet
                            (e.target as any).style.display = 'none';
                            const parent = (e.target as any).parentNode;
                            const fallback = document.createElement('div');
                            fallback.className = "p-10 text-slate-400 font-bold text-center italic bg-slate-50 border-2 border-dashed rounded-xl";
                            fallback.innerText = "กำลังรอไฟล์รูปภาพ (pulley_system.png)...";
                            parent.appendChild(fallback);
                          }}
                        />
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-indigo-700 bg-indigo-50/80 p-4 rounded-2xl border border-indigo-100/50 backdrop-blur-sm">
                         <Info className="w-5 h-5 text-indigo-500" />
                         <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest leading-none mb-1">รูปภาพอ้างอิง: ระบบรอกและพื้นเอียง 30°</p>
                            <p className="text-[10px] text-indigo-600/70 font-medium">ใช้ภาพนี้เป็นต้นแบบในการวางแรง (FBD) ลงบนแบบจำลองของคุณ</p>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <svg viewBox="0 0 800 500" className="w-full h-full opacity-20 transition-opacity duration-500">
                      <path d="M 100 400 L 600 400 L 600 150 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
                      <circle cx="600" cy="150" r="25" fill="#94a3b8" stroke="#475569" strokeWidth="4" />
                      <rect x="350" y="240" width="80" height="60" fill="white" stroke="#6366f1" strokeWidth="3" transform="rotate(-26.5, 390, 270)" />
                      <rect x="630" y="250" width="80" height="80" fill="white" stroke="#f43f5e" strokeWidth="3" />
                    </svg>
                  )}
                </div>
              </div>
            )}

            {/* Render Interaction Forces */}
            {forces.map((f) => (
              <div key={f.id} onClick={(e) => e.stopPropagation()} className="absolute transition-all duration-300 group/force" style={{ left: f.x, top: 300 }}>
                <div className={`relative flex flex-col items-center ${f.direction === 'up' ? 'translate-y-[-100%]' : ''}`}>
                  <div className="absolute -top-16 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-xl flex items-center gap-3 opacity-0 group-hover/force:opacity-100 transition-opacity z-20">
                    <button onClick={() => updateMagnitude(f.id, -10)} className="hover:text-red-500 p-1"><Minus className="w-4 h-4"/></button>
                    <span className="text-xs font-bold font-mono min-w-[30px] text-center">{f.magnitude}N</span>
                    <button onClick={() => updateMagnitude(f.id, 10)} className="hover:text-green-500 p-1"><Plus className="w-4 h-4"/></button>
                  </div>
                  <div className={`w-1 bg-red-500 relative transition-all`} style={{ height: `${40 + f.magnitude/5}px` }}>
                    <div className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent ${f.direction === 'up' ? '-top-2 border-b-[12px] border-b-red-500' : '-bottom-2 border-t-[12px] border-t-red-500'}`}></div>
                  </div>
                  <div className="mt-4 flex gap-1 bg-white p-1 rounded-full shadow-sm border border-slate-100 opacity-0 group-hover/force:opacity-100 transition-all">
                    <button onClick={() => toggleDirection(f.id)} className="p-1.5 hover:bg-indigo-50 rounded-full text-indigo-600 transition-colors"><Move className="w-3.5 h-3.5" /></button>
                    <button onClick={() => removeForce(f.id)} className="p-1.5 hover:bg-red-50 rounded-full text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}

            {forces.length === 0 && (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                <div className="p-8 bg-white/40 border-4 border-dashed border-slate-100 rounded-[32px] text-center backdrop-blur-sm">
                  <Plus className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="font-bold text-sm text-slate-400">คลิกที่พื้นที่ทำงานเพื่อระบุแรง (FBD)</p>
                  <p className="text-[10px] uppercase tracking-widest mt-1 opacity-60">Creative Model Construction</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Analysis Area */}
          <div className="w-full lg:w-[400px] border-l border-slate-100 bg-slate-50 p-6 flex flex-col overflow-y-auto">
            <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-indigo-500" />
              การวิเคราะห์โมเมนต์รอบจุดหมุน
            </h4>

            {/* CCW and CW Sections */}
            <div className="space-y-4 mb-6">
              <div className="bg-white p-5 rounded-2xl border-l-4 border-l-indigo-500 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                    <RotateCcw className="w-3 h-3" /> โมเมนต์ทวนเข็ม (CCW)
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">ΣM_ccw</span>
                </div>
                <div className="space-y-3">
                  {analysis.ccwMoments.length > 0 ? analysis.ccwMoments.map((m, i) => (
                    <div key={i} className="flex flex-col text-xs">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-slate-700">{m.label}</span>
                        <span className="text-indigo-600">+{m.value.toFixed(2)} N⋅m</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {m.f}N × {m.dist.toFixed(2)}m
                      </div>
                    </div>
                  )) : <p className="text-[10px] text-slate-400 italic">ไม่มีโมเมนต์ทวนเข็ม</p>}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-l-4 border-l-amber-500 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-2">
                    <RotateCcw className="w-3 h-3 scale-x-[-1]" /> โมเมนต์ตามเข็ม (CW)
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">ΣM_cw</span>
                </div>
                <div className="space-y-3">
                  {analysis.cwMoments.length > 0 ? analysis.cwMoments.map((m, i) => (
                    <div key={i} className="flex flex-col text-xs">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-slate-700">{m.label}</span>
                        <span className="text-amber-600">-{m.value.toFixed(2)} N⋅m</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {m.f}N × {m.dist.toFixed(2)}m
                      </div>
                    </div>
                  )) : <p className="text-[10px] text-slate-400 italic">ไม่มีโมเมนต์ตามเข็ม</p>}
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-2xl border-2 mb-6 flex flex-col items-center justify-center text-center transition-all ${analysis.isBalanced ? 'bg-green-600 border-green-700 text-white shadow-lg' : 'bg-slate-200 border-slate-300 text-slate-600'}`}>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">โมเมนต์ลัพธ์สุทธิ (ΣM)</div>
              <div className="text-3xl font-black font-mono">{analysis.sumTorque.toFixed(2)}</div>
              <div className="text-[10px] mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
                {analysis.isBalanced ? <><CheckCircle2 className="w-4 h-4" /> ระบบสมดุลโมเมนต์!</> : 'ยังไม่สมดุล'}
              </div>
            </div>

            <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Type className="w-4 h-4 text-indigo-500" />
              อธิบายการวิเคราะห์โมเมนต์
            </h4>
            <textarea
              className="flex-1 w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all resize-none mb-4"
              placeholder="จากการคำนวณ ΣM_ccw = ΣM_cw หรือไม่? อย่างไร..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2">
              ส่งแบบจำลองเพื่อประเมินผล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelConstruction;
