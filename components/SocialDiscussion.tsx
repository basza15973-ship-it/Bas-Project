
import React, { useState } from 'react';
import { Send, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  text: string;
  likes: number;
  replies: number;
  time: string;
}

const SocialDiscussion: React.FC = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: 'Peerawat K.', text: 'ผมลองเลื่อนจุดหมุนไปทางซ้ายสุด พบว่าต้องใช้แรง F2 มหาศาลเลยกว่าจะสมดุล ใครเป็นเหมือนกันบ้าง?', likes: 4, replies: 2, time: '2 ชม. ที่แล้ว' },
    { id: 2, user: 'Siriwan S.', text: 'ถ้าเราเปลี่ยนวัสดุของคานเป็นเหล็กที่มีน้ำหนักมากขึ้น ค่าทอร์กสุทธิจะเปลี่ยนไปไหมคะ?', likes: 2, replies: 1, time: '3 ชม. ที่แล้ว' },
    { id: 3, user: 'Aekchai L.', text: 'ตอบ Siriwan: ถ้าน้ำหนักคานลงที่กึ่งกลางพอดี และเราวางจุดหมุนตรงกลาง ทอร์กจากน้ำหนักคานจะเป็น 0 ค่ะ', likes: 7, replies: 0, time: '1 ชม. ที่แล้ว' }
  ]);

  const handlePost = () => {
    if (!newComment.trim()) return;
    const post: Comment = {
      id: Date.now(),
      user: 'Student User',
      text: newComment,
      likes: 0,
      replies: 0,
      time: 'เมื่อสักครู่'
    };
    setComments([post, ...comments]);
    setNewComment('');
  };

  const handleLike = (id: number) => {
    setComments(comments.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-8">
        <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          กระดานแลกเปลี่ยนเรียนรู้แบบ Constructivism
        </h3>
        <p className="text-indigo-800 text-sm opacity-90">ร่วมแบ่งปันข้อค้นพบจากแบบจำลอง FBD ของคุณ หรือตอบคำถามเพื่อนเพื่อสร้างความรู้ความเข้าใจร่วมกัน (Co-construction of Knowledge)</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-inner">ST</div>
           <div className="flex-1 relative">
             <input 
               type="text" 
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
               onKeyPress={(e) => e.key === 'Enter' && handlePost()}
               placeholder="ร่วมแชร์สิ่งที่คุณค้นพบจากการสำรวจ..." 
               className="w-full bg-white border border-slate-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
             />
             <button 
               onClick={handlePost}
               className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md active:scale-95"
             >
               <Send className="w-4 h-4"/>
             </button>
           </div>
        </div>

        <div className="divide-y divide-slate-100">
          {comments.map((comment) => (
            <div key={comment.id} className="p-6 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${comment.user === 'Student User' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {comment.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800 text-sm">{comment.user}</h4>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{comment.time}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{comment.text}</p>
                  <div className="flex gap-6">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors active:scale-90"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {comment.likes} ถูกใจ
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {comment.replies} ตอบกลับ
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                      แชร์
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialDiscussion;
