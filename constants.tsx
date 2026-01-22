
import React from 'react';
import { 
  Target, 
  BookOpen, 
  Construction, 
  UserRoundCheck, 
  Users2
} from 'lucide-react';
import { ModuleType, Scenario } from './types';

export const NAV_ITEMS = [
  { id: ModuleType.PROBLEM_BASE, label: '1) สถานการณ์ปัญหา', icon: <Target className="w-5 h-5" /> },
  { id: ModuleType.RESOURCE, label: '2) แหล่งเรียนรู้', icon: <BookOpen className="w-5 h-5" /> },
  { id: ModuleType.SCAFFOLDING, label: '3) ฐานการช่วยเหลือ', icon: <Construction className="w-5 h-5" /> },
  { id: ModuleType.COACHING, label: '4) การโค้ช', icon: <UserRoundCheck className="w-5 h-5" /> },
  { id: ModuleType.COLLABORATION, label: '5) การร่วมมือกันแก้ปัญหา', icon: <Users2 className="w-5 h-5" /> }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'bridge_equilibrium',
    title: '1. สะพานไม้ข้ามลำธาร',
    image: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?q=80&w=1200&auto=format&fit=crop',
    description: 'แผ่นไม้กระดานวางพาดอยู่บนโขดหินสองฝั่ง เมื่อมีคนเดินข้ามสะพาน แรงปฏิกิริยาที่โขดหินแต่ละข้างจะเปลี่ยนแปลงอย่างไรเพื่อรักษาสมดุล?',
    questions: [
      'ระบุจุดหมุนและแรงที่กระทำต่อสะพานนี้',
      'ทำไมแรงที่โขดหินแต่ละฝั่งจึงไม่เท่ากันเมื่อคนเดินไม่ถึงกึ่งกลาง?'
    ]
  },
  {
    id: 'lever_system',
    title: '2. คานสมดุลและจุดหมุน',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop',
    description: 'การยกวัตถุหนักด้วยไม้คาน หากเราเลื่อนจุดหมุนเข้าใกล้กึ่งกลางมากขึ้น เราจะต้องออกแรงมากขึ้นหรือน้อยลง?',
    questions: [
      'โมเมนต์ทวนและโมเมนต์ตามในระบบนี้เกิดจากแรงใดบ้าง?',
      'สรุปความสัมพันธ์ระหว่างระยะห่างจากจุดหมุนและขนาดของแรง'
    ]
  },
  {
    id: 'pulley_mechanics',
    title: '3. รอกเดี่ยวและระบบรอก',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200&auto=format&fit=crop',
    description: 'ช่างก่อสร้างใช้ระบบรอกเพื่อยกถังปูนหนักขึ้นที่สูง ระบบรอกช่วยผ่อนแรงได้อย่างไร และแรงตึงในเส้นเชือกมีค่าเท่าใด?',
    questions: [
      'แรงตึงเชือกในแต่ละส่วนของรอกมีความสัมพันธ์กันอย่างไร?',
      'ทำไมรอกเคลื่อนที่ถึงช่วยผ่อนแรงได้มากกว่ารอกเดี่ยวตายตัว?'
    ]
  },
  {
    id: 'inclined_plane',
    title: '4. วัตถุบนพื้นเอียง',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1200&auto=format&fit=crop',
    description: 'การเข็นลังสินค้าขึ้นพื้นเอียง 30 องศา แรงเสียดทานและน้ำหนักของวัตถุในแนวขนานพื้นเอียงส่งผลต่อการเคลื่อนที่อย่างไร?',
    questions: [
      'แตกแรงน้ำหนัก (mg) เข้าสู่แนวขนานและแนวตั้งฉากพื้นเอียง',
      'สภาวะสมดุลจะเกิดขึ้นได้เมื่อแรงพยายามมีค่าเท่ากับแรงใดบ้าง?'
    ]
  }
];
