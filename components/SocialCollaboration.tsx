
import React from 'react';
import SocialDiscussion from './SocialDiscussion';
import { Users2, MessageSquare } from 'lucide-react';

const SocialCollaboration: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-emerald-50 p-10 rounded-[2.5rem] border border-emerald-100 flex items-center gap-8">
         <div className="p-6 bg-emerald-500 text-white rounded-[2rem] shadow-xl shadow-emerald-100"><Users2 className="w-10 h-10"/></div>
         <div>
            <h3 className="text-3xl font-black text-emerald-900 tracking-tight mb-2">การร่วมมือกันแก้ปัญหา (Collaboration)</h3>
            <p className="text-emerald-800/60 leading-relaxed text-lg font-medium">พื้นที่สำหรับการต่อยอดความคิด (Co-construction of Knowledge) ผ่านการแลกเปลี่ยนเรียนรู้กับเพื่อน</p>
         </div>
      </div>

      <div className="bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <SocialDiscussion />
      </div>

      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white flex flex-col items-center text-center">
         <MessageSquare className="w-12 h-12 text-emerald-400 mb-4 opacity-50" />
         <h4 className="text-xl font-bold mb-2">"ไม่มีใครรู้ไปเสียทุกอย่าง แต่ทุกคนรู้บางอย่าง"</h4>
         <p className="text-slate-400 text-sm italic">ร่วมกันสร้างความเข้าใจที่ลึกซึ้งผ่านการแบ่งปันข้อค้นพบของคุณ</p>
      </div>
    </div>
  );
};

export default SocialCollaboration;
