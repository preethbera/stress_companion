import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Clock, Percent, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const History = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('session_history') || '[]');
    setSessions(data);
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400 mb-6">
          <HistoryIcon size={40} />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Sessions Yet</h2>
        <p className="text-neutral-500 max-w-sm">Complete your first stress analysis session to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
        <HistoryIcon className="text-indigo-500" />
        Session History
      </h1>
      
      <div className="space-y-4">
        {sessions.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-3xl hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-lg font-bold">{session.date}</p>
                  <p className="text-sm text-neutral-500">Regular Check-in</p>
                </div>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-neutral-400" />
                  <span className="font-semibold">{session.duration}</span>
                  <span className="text-xs text-neutral-500 uppercase font-bold tracking-wider">min</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-neutral-500 uppercase font-black tracking-widest mb-1">Stress Level</p>
                    <div className="flex items-center gap-2">
                       <Percent size={14} className="text-indigo-500" />
                       <span className={`text-2xl font-black ${session.stressLevel > 50 ? 'text-orange-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                         {session.stressLevel}
                       </span>
                    </div>
                  </div>
                  <div className="w-2 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div 
                      className={`w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-full transition-all duration-1000`}
                      style={{ height: `${session.stressLevel}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;
