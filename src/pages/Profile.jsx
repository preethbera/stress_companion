import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, UserCircle, Activity } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [biometrics, setBiometrics] = useState({
    age: '',
    gender: '',
    heartRate: '',
    conditions: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_biometrics', JSON.stringify(biometrics));
    alert('Biometric data saved successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-6">
        <img src={user?.avatar} alt="Profile" className="w-24 h-24 rounded-3xl shadow-lg border-2 border-white dark:border-neutral-800" />
        <div>
          <h1 className="text-3xl font-bold mb-1">{user?.name}</h1>
          <p className="text-neutral-500">{user?.email}</p>
          <span className="inline-block mt-3 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full border border-indigo-100 dark:border-indigo-800">Premium Member</span>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Activity className="text-indigo-500" />
          <h2 className="text-xl font-bold">Algorithm Calibration Data</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wide">Age</label>
              <input
                type="number"
                value={biometrics.age}
                onChange={(e) => setBiometrics({...biometrics, age: e.target.value})}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wide">Gender</label>
              <select
                value={biometrics.gender}
                onChange={(e) => setBiometrics({...biometrics, gender: e.target.value})}
                className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Non-binary</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wide">Baseline Heart Rate (BPM)</label>
            <input
              type="number"
              value={biometrics.heartRate}
              onChange={(e) => setBiometrics({...biometrics, heartRate: e.target.value})}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="72"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wide">Medical Conditions</label>
            <textarea
              value={biometrics.conditions}
              onChange={(e) => setBiometrics({...biometrics, conditions: e.target.value})}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24"
              placeholder="e.g. Hypertension, Anxiety..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full py-4 bg-neutral-900 dark:bg-indigo-600 hover:bg-neutral-800 dark:hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Save size={20} /> Save Calibration Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
