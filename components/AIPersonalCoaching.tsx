
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Bot, User, Loader2, Info } from 'lucide-react';

const AIPersonalCoaching: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: 'สวัสดีครับ! ผมคือ AI Physics Coach คุณสงสัยส่วนไหนของสถานการณ์ปัญหา หรืออยากให้ผมช่วยตรวจสอบสมมติฐานส่วนไหนไหมครับ?'}
  ]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'You are a professional Physics Coach. Help students understand Mechanical Equilibrium using Socratic questioning. Do not give direct answers immediately; guide them to discover the truth. Keep answers in Thai and encouraging.',
        },
      });

      setMessages(prev => [...prev, {role: 'bot', text: response.text || 'ขออภัยครับ ผมไม่สามารถประมวลผลคำตอบได้'}]);
    } catch (error) {
      setMessages(prev => [...prev, {role: 'bot', text: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับสมองกลครับ'}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100 flex items-start gap-6">
         <div className="p-4 bg-amber-500 text-white rounded-2xl"><Sparkles className="w-8 h-8"/></div>
         <div>
            <h3 className="text-2xl font-black text-amber-900 mb-1 tracking-tight">การโค้ช (Coaching)</h3>
            <p className="text-amber-800/60 leading-relaxed">AI Coach จะทำหน้าที่กระตุ้นผู้เรียนด้วยคำถามเพื่อให้เกิดการแสวงหาความรู้ด้วยตนเองตามแนวทาง Constructivism</p>
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/30">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[80%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-100 text-indigo-600'}`}>
                  {m.role === 'user' ? <User className="w-5 h-5"/> : <Bot className="w-5 h-5"/>}
                </div>
                <div className={`p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="flex gap-4 items-center bg-white p-4 rounded-full border border-slate-100 text-slate-400 text-xs font-bold">
                  <Loader2 className="w-4 h-4 animate-spin" /> กำลังประมวลผลคำแนะนำ...
               </div>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="พิมพ์คำถาม หรือสมมติฐานของคุณ..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] pl-6 pr-16 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all"
            />
            <button 
              onClick={handleAsk}
              className="absolute right-2 p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              <Send className="w-5 h-5"/>
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
             <Info className="w-3 h-3"/> AI Coach จะช่วยคุณวิเคราะห์แต่จะไม่บอกคำตอบโดยตรง
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonalCoaching;
