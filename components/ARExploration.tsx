
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Info, 
  RefreshCw, 
  Plus, 
  Minus, 
  Move, 
  ArrowUp, 
  ArrowDown, 
  Camera, 
  QrCode, 
  Scan, 
  X, 
  HelpCircle, 
  Target,
  MousePointer2,
  Box,
  Zap,
  Maximize2,
  Trash2,
  // Added missing Lightbulb icon
  Lightbulb
} from 'lucide-react';

interface Force {
  id: string;
  x: number;
  mag: number;
  dir: 1 | -1; // 1 for down, -1 for up
  label: string;
}

interface PaletteItem {
  type: 'weight' | 'lift';
  magnitude: number;
  label: string;
  icon: React.ReactNode;
}

const ARExploration: React.FC = () => {
  const [pivotX, setPivotX] = useState(400);
  const [forces, setForces] = useState<Force[]>([
    { id: '1', x: 200, mag: 100, dir: 1, label: 'F1' }
  ]);
  const [beamWeight, setBeamWeight] = useState(50);
  const [isARMode, setIsARMode] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isDraggingPivot, setIsDraggingPivot] = useState(false);
  const [draggedFromPalette, setDraggedFromPalette] = useState<PaletteItem | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const forcePalette: PaletteItem[] = [
    { type: 'weight', magnitude: 50, label: 'น้ำหนัก 50N', icon: <ArrowDown className="w-4 h-4" /> },
    { type: 'weight', magnitude: 150, label: 'น้ำหนัก 150N', icon: <ArrowDown className="w-4 h-4" /> },
    { type: 'lift', magnitude: 100, label: 'แรงดึงขึ้น 100N', icon: <ArrowUp className="w-4 h-4" /> },
  ];

  // AR Camera setup
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isARMode) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(err => console.error("Error accessing camera:", err));
    }
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [isARMode]);

  const calculateEquilibrium = useCallback(() => {
    let totalTorque = 0;
    // Torque from beam weight (assume center is 400)
    totalTorque += -beamWeight * (400 - pivotX);

    forces.forEach(f => {
      const actualForce = f.mag * f.dir;
      // Torque = Force * distance from pivot (F * (x - pivot))
      totalTorque += -actualForce * (f.x - pivotX);
    });

    const isBalanced = Math.abs(totalTorque) < 20;
    return { totalTorque, isBalanced };
  }, [forces, pivotX, beamWeight]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isARMode) {
      // Draw Grid
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.5)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 50) {
        ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
      }
      
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(800, 450); ctx.stroke();
    }

    // Pivot
    ctx.fillStyle = isARMode ? 'rgba(255, 255, 255, 0.95)' : '#334155';
    ctx.beginPath();
    ctx.moveTo(pivotX, 450);
    ctx.lineTo(pivotX - 30, 485);
    ctx.lineTo(pivotX + 30, 485);
    ctx.fill();

    const { totalTorque, isBalanced } = calculateEquilibrium();
    const rotationAngle = Math.max(-0.2, Math.min(0.2, totalTorque / 18000));

    ctx.save();
    ctx.translate(pivotX, 450);
    ctx.rotate(rotationAngle);
    ctx.translate(-pivotX, -450);

    // Beam
    ctx.fillStyle = isBalanced ? '#10b981' : isARMode ? 'rgba(255, 255, 255, 0.4)' : '#64748b';
    ctx.fillRect(100, 440, 600, 10);
    
    // Forces
    forces.forEach(f => {
      const arrowLen = Math.max(50, f.mag / 2);
      const color = f.dir === 1 ? '#ef4444' : '#3b82f6';
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      
      const startY = 440;
      const endY = startY - (arrowLen * f.dir);

      ctx.beginPath();
      ctx.moveTo(f.x, startY);
      ctx.lineTo(f.x, endY);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      if (f.dir === 1) { // Down
        ctx.moveTo(f.x, startY);
        ctx.lineTo(f.x - 14, startY - 18);
        ctx.lineTo(f.x + 14, startY - 18);
      } else { // Up
        ctx.moveTo(f.x, startY);
        ctx.lineTo(f.x - 14, startY + 18);
        ctx.lineTo(f.x + 14, startY + 18);
      }
      ctx.fill();

      // Interaction Target
      ctx.beginPath();
      ctx.arc(f.x, endY, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = isARMode ? 'white' : '#0f172a';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${f.mag}N`, f.x, endY + (f.dir === 1 ? -35 : 50));
    });

    ctx.restore();
  }, [forces, pivotX, calculateEquilibrium, isARMode]);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      draw();
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [draw]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = 800 / rect.width;
    const scaleY = 500 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (Math.abs(x - pivotX) < 45 && y > 420) {
      setIsDraggingPivot(true);
      return;
    }

    forces.forEach(f => {
      const arrowLen = Math.max(50, f.mag / 2);
      const endY = 440 - (arrowLen * f.dir);
      const dist = Math.sqrt(Math.pow(x - f.x, 2) + Math.pow(y - endY, 2));
      if (dist < 40) {
        setDraggingId(f.id);
      }
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = 800 / rect.width;
    const x = (e.clientX - rect.left) * scaleX;

    if (isDraggingPivot) {
      setPivotX(Math.max(120, Math.min(680, x)));
    } else if (draggingId) {
      setForces(prev => prev.map(f => f.id === draggingId ? { ...f, x: Math.max(105, Math.min(695, x)) } : f));
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setDraggingId(null);
    setIsDraggingPivot(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedFromPalette) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const scaleX = 800 / rect.width;
      const x = (e.clientX - rect.left) * scaleX;
      
      const newForce: Force = {
        id: Date.now().toString(),
        x: Math.max(110, Math.min(690, x)),
        mag: draggedFromPalette.magnitude,
        dir: draggedFromPalette.type === 'weight' ? 1 : -1,
        label: `F${forces.length + 1}`
      };
      setForces([...forces, newForce]);
    }
    setDraggedFromPalette(null);
  };

  const simulateScan = () => {
    setShowQRScanner(true);
    setActiveHint(null);
    setTimeout(() => {
      setShowQRScanner(false);
      setActiveHint("💡 คำใบ้จาก QR: 'ลองใช้หลักการสมดุลโมเมนต์ ΣM ทวน = ΣM ตาม โดยวัดระยะจากจุดหมุนไปตั้งฉากแนวแรง!'");
    }, 2800);
  };

  const { isBalanced, totalTorque } = calculateEquilibrium();

  return (
    <div className="p-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-xl">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Interactive AR Lab</h3>
          </div>
          <p className="text-slate-500 font-medium">ลากแรงจำลองจาก Palette มาวางบนคาน และสแกน QR เพื่อขอคำแนะนำพิเศษ</p>
        </div>
        
        <div className="flex gap-4">
           <button 
              onClick={() => setIsARMode(!isARMode)}
              className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black text-sm transition-all shadow-xl ${
                isARMode ? 'bg-rose-600 text-white shadow-rose-100' : 'bg-slate-900 text-white shadow-slate-200'
              }`}
           >
              {isARMode ? <X className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              {isARMode ? 'ปิดกล้อง AR' : 'เปิดโหมด AR'}
           </button>
           <button 
              onClick={simulateScan}
              className="flex items-center gap-3 px-8 py-4 bg-amber-500 text-white rounded-[2rem] font-black text-sm transition-all shadow-xl shadow-amber-100"
           >
              <QrCode className="w-5 h-5" />
              สแกนรับคำใบ้
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Force Palette Sidebar */}
        <div className="xl:col-span-3 space-y-6">
           <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-500" /> คลังแรงเสมือน (Drag Items)
              </h4>
              <div className="space-y-3">
                 {forcePalette.map((item, idx) => (
                   <div 
                     key={idx}
                     draggable
                     onDragStart={() => setDraggedFromPalette(item)}
                     className="bg-slate-50 p-5 rounded-3xl border-2 border-transparent hover:border-indigo-300 cursor-grab active:cursor-grabbing transition-all group flex items-center justify-between"
                   >
                     <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${item.type === 'weight' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                           {item.icon}
                        </div>
                        <div>
                           <p className="font-black text-slate-800 text-xs">{item.label}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.magnitude}N</p>
                        </div>
                     </div>
                     <MousePointer2 className="w-4 h-4 text-slate-200 group-hover:text-indigo-400 transition-colors" />
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-indigo-950 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Zap className="w-24 h-24 text-indigo-400" />
              </div>
              <div className="relative z-10 space-y-6">
                 <div>
                    <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.2em] mb-1">ผลรวมทอร์ก (Στ)</p>
                    <p className="text-4xl font-black font-mono">{totalTorque.toFixed(1)} <span className="text-xs">N⋅m</span></p>
                 </div>
                 <div className={`px-6 py-3 rounded-2xl text-[10px] font-black text-center uppercase tracking-widest ${isBalanced ? 'bg-emerald-500 text-white' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                    {isBalanced ? 'System Equilibrium' : 'Not in Balance'}
                 </div>
                 <button 
                  onClick={() => setForces([])} 
                  className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-white/50 hover:text-rose-400 uppercase tracking-widest transition-colors py-2 border-t border-white/10 mt-4"
                 >
                   <Trash2 className="w-3 h-3" /> ล้างการทดลอง
                 </button>
              </div>
           </div>
        </div>

        {/* Lab Canvas Area */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="xl:col-span-9 relative rounded-[4rem] overflow-hidden border-8 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] bg-slate-900 aspect-[16/9]"
        >
           {isARMode && (
             <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none" />
           )}
           
           <canvas 
              ref={canvasRef} 
              width={800} 
              height={500}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {setDraggingId(null); setIsDraggingPivot(false);}}
              className="relative z-10 w-full h-full cursor-crosshair"
           />

           {/* QR Simulator Overlay */}
           {showQRScanner && (
             <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
                <div className="relative">
                   <div className="w-72 h-72 border-4 border-white/30 rounded-[3rem] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-amber-400 shadow-[0_0_30px_#f59e0b] animate-scan-line"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <QrCode className="w-32 h-32 text-white/10" />
                      </div>
                   </div>
                   <div className="mt-8 text-center text-white font-black text-sm uppercase tracking-[0.2em] animate-pulse">
                      กำลังสแกนหาจุดอ้างอิงทางฟิสิกส์...
                   </div>
                </div>
             </div>
           )}

           {/* Hint Alert */}
           {activeHint && (
             <div className="absolute top-10 right-10 z-40 max-w-sm bg-white p-8 rounded-[2.5rem] shadow-2xl border border-amber-100 animate-in slide-in-from-right-8 duration-500">
                <button onClick={() => setActiveHint(null)} className="absolute top-4 right-4 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-rose-500 transition-colors">
                   <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 mb-4 text-amber-500 font-black text-xs uppercase tracking-widest">
                   <Lightbulb className="w-4 h-4" /> Hint Revealed
                </div>
                <p className="text-slate-700 font-bold italic leading-relaxed text-lg">"{activeHint}"</p>
             </div>
           )}

           {/* Drag Guide */}
           <div className="absolute bottom-10 left-10 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] max-w-xs pointer-events-none z-20">
              <div className="flex items-center gap-3 text-white/40 mb-2">
                <MousePointer2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Interaction Guide</span>
              </div>
              <p className="text-white/80 text-xs font-medium leading-relaxed italic">
                "ลากแรงที่ต้องการวางลงบนคาน เพื่อทดสอบสภาวะสมดุลสัมบูรณ์"
              </p>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default ARExploration;
