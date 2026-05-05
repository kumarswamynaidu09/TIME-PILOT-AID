/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Activity, Droplets, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME } from '../constants';

export const LoginScreen: React.FC = () => {
  const { setUser, setCurrentScreen } = useApp();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  const handleStart = () => {
    if (name && age && bloodGroup) {
      setUser({
        name,
        age,
        bloodGroup,
        medicalHistory: '',
        allergies: '',
        emergencyContacts: []
      });
      setCurrentScreen('HOME');
    }
  };

  return (
    <div className="h-full px-8 pt-16 flex flex-col">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: THEME.text.primary }}>Setup Your Profile</h2>
        <p className="text-gray-500 font-medium">This info helps responders save your life in an emergency.</p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-2">
          <label className="text-xs uppercase font-bold tracking-widest text-gray-400 ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-100 h-14 pl-12 pr-4 rounded-2xl outline-none focus:border-[var(--primary)] transition-colors shadow-sm"
              style={{ '--primary': THEME.primary } as any}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-widest text-gray-400 ml-1">Age</label>
            <div className="relative">
              <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="number" 
                placeholder="25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-white border border-gray-100 h-14 pl-12 pr-4 rounded-2xl outline-none focus:border-[var(--primary)] transition-colors shadow-sm"
                style={{ '--primary': THEME.primary } as any}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-widest text-gray-400 ml-1">Blood Group</label>
            <div className="relative">
              <Droplets className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select 
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-white border border-gray-100 h-14 pl-12 pr-4 rounded-2xl outline-none focus:border-[var(--primary)] transition-colors shadow-sm appearance-none"
                style={{ '--primary': THEME.primary } as any}
              >
                <option value="">Select</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          disabled={!name || !age || !bloodGroup}
          className="w-full h-16 rounded-2xl text-white font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:grayscale"
          style={{ backgroundColor: THEME.primary }}
        >
          <span>Get Started</span>
          <ArrowRight size={20} />
        </motion.button>
        <p className="text-center text-[10px] text-gray-400 mt-4 px-8 leading-relaxed uppercase tracking-widest font-bold">
          By continuing, you agree to our privacy terms and medical data usage policy.
        </p>
      </div>
    </div>
  );
};
