
import React, { useState } from 'react';
import { NAV_ITEMS } from './constants';
import { ModuleType } from './types';
import ProblemBase from './components/ProblemBase';
import KnowledgeResource from './components/KnowledgeResource';
import CognitiveScaffolding from './components/CognitiveScaffolding';
import AIPersonalCoaching from './components/AIPersonalCoaching';
import SocialCollaboration from './components/SocialCollaboration';
import AnalyticalAssessment from './components/AnalyticalAssessment';
import AchievementAssessment from './components/AchievementAssessment';
import { BrainCircuit, ClipboardList } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.PROBLEM_BASE);

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.PROBLEM_BASE:
        return <ProblemBase onNext={() => setActiveModule(ModuleType.RESOURCE)} />;
      case ModuleType.RESOURCE:
        return <KnowledgeResource />;
      case ModuleType.SCAFFOLDING:
        return <CognitiveScaffolding />;
      case ModuleType.COACHING:
        return <AIPersonalCoaching />;
      case ModuleType.COLLABORATION:
        return <SocialCollaboration />;
      case ModuleType.ANALYTICAL_TEST:
        return <AnalyticalAssessment />;
      case ModuleType.ACHIEVEMENT_TEST:
        return <AchievementAssessment />;
      default:
        return <ProblemBase onNext={() => setActiveModule(ModuleType.RESOURCE)} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">PhysCLE</h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Constructivist Learning Env.</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-6">
            <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] px-3 mb-3">5 องค์ประกอบ CLE</h2>
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                    activeModule === item.id 
                      ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-100' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                  }`}
                >
                  <span className={activeModule === item.id ? 'text-white' : 'text-indigo-400'}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 border-t border-slate-100 pt-6">
             <h2 className="text-[9px] font-bold text-rose-400 uppercase tracking-[0.2em] px-3 mb-3">Testing & Assessment Zone</h2>
             <div className="space-y-2">
                <button 
                  onClick={() => setActiveModule(ModuleType.ANALYTICAL_TEST)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all border ${
                    activeModule === ModuleType.ANALYTICAL_TEST 
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md font-bold' 
                    : 'bg-white border-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  <BrainCircuit className="w-4 h-4" />
                  แบบวัดการคิดวิเคราะห์
                </button>

                <button 
                  onClick={() => setActiveModule(ModuleType.ACHIEVEMENT_TEST)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all border ${
                    activeModule === ModuleType.ACHIEVEMENT_TEST 
                    ? 'bg-rose-600 text-white border-rose-700 shadow-md font-bold' 
                    : 'bg-white border-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  แบบวัดสัมฤทธิผลทางการเรียน
                </button>
             </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">ST</div>
            <div>
              <p className="text-sm font-bold text-slate-700 leading-none mb-1">ผู้เรียน</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Physics Mode</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className={`w-2 h-2 rounded-full animate-pulse ${
               activeModule === ModuleType.ANALYTICAL_TEST ? 'bg-amber-500' : 
               activeModule === ModuleType.ACHIEVEMENT_TEST ? 'bg-rose-500' : 'bg-green-500'
             }`}></div>
             <h2 className="text-lg font-bold text-slate-800">
              {activeModule === ModuleType.ANALYTICAL_TEST ? 'แบบวัดการคิดวิเคราะห์' : 
               activeModule === ModuleType.ACHIEVEMENT_TEST ? 'แบบวัดสัมฤทธิผลทางการเรียน' : 
               NAV_ITEMS.find(n => n.id === activeModule)?.label}
            </h2>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mechanical Equilibrium Mastery</div>
        </header>

        <div className="max-w-6xl mx-auto p-8">
          {renderModule()}
        </div>
      </main>
    </div>
  );
};

export default App;
