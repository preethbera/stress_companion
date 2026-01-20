import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Monitor, Volume2, Globe } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold mb-8">Settings</h1>

      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <Sun className="text-indigo-500" size={20} />
          <h2 className="text-lg font-bold">Appearance</h2>
        </div>
        
        <div className="p-6 grid grid-cols-3 gap-4">
          {[
            { id: 'light', name: 'Light', icon: Sun },
            { id: 'dark', name: 'Dark', icon: Moon },
            { id: 'system', name: 'System', icon: Monitor },
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  theme === mode.id 
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                    : 'border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500'
                }`}
              >
                <Icon size={24} />
                <span className="text-sm font-bold">{mode.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <Volume2 className="text-indigo-500" size={20} />
          <h2 className="text-lg font-bold">Voice & Audio</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-neutral-500 mb-3 uppercase tracking-wider">System Voice</label>
            <select className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Nova (Natural - Recommended)</option>
              <option>Atlas (Deep)</option>
              <option>Echo (Monotone)</option>
              <option>Celeste (Soft)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">Real-time Feedback</p>
              <p className="text-sm text-neutral-500">Allow AI to speak during analysis</p>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
          <Globe className="text-indigo-500" size={20} />
          <h2 className="text-lg font-bold">Regional</h2>
        </div>
        <div className="p-6">
          <label className="block text-sm font-bold text-neutral-500 mb-3 uppercase tracking-wider">Language</label>
          <select className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
            <option>English (US)</option>
            <option>Spanish (ES)</option>
            <option>French (FR)</option>
            <option>German (DE)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
