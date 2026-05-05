/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Search, Heart, ChevronRight, Activity, Flame, UserX, HeartPulse, Car, Pill } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME, FIRST_AID_GUIDES } from '../constants';

const IconMap: any = {
    'Car': Car,
    'Flame': Flame,
    'UserX': UserX,
    'HeartPulse': HeartPulse
};

export const FirstAidGuideScreen: React.FC = () => {
  const { setCurrentScreen, setSelectedGuideId } = useApp();

  return (
    <div className="pb-12">
      <div className="px-6 pt-12 mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: THEME.text.primary }}>First-Aid Assistant</h1>
        <p className="text-gray-400 font-medium text-sm">Quick resources for handling common medical situations.</p>
      </div>

      {/* Featured: Medicine Catalogue */}
      <div className="px-6 mb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentScreen('MEDICINE_CATALOGUE')}
          className="w-full bg-[#1B3022] rounded-[32px] p-6 text-left flex items-center space-x-6 overflow-hidden relative group shadow-xl shadow-green-900/10"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
            <Pill size={32} className="text-[#A5D6A7]" />
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="text-white font-black text-lg">Medicine Catalogue</h3>
            <p className="text-[#A5D6A7]/70 text-xs font-medium">Identify medicines & side-effects</p>
          </div>
          <ChevronRight size={24} className="text-white/30" />
          <Pill className="absolute -bottom-4 -right-4 text-white/5" size={100} />
        </motion.button>
      </div>

      <div className="px-6 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search incident type..." 
            className="w-full bg-white border border-gray-100 h-14 pl-12 pr-4 rounded-2xl outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="px-6 space-y-4">
        {FIRST_AID_GUIDES.map((guide) => {
          const Icon = IconMap[guide.icon] || Heart;
          return (
            <motion.button
              key={guide.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedGuideId(guide.id);
                setCurrentScreen('GUIDE_DETAIL');
              }}
              className="w-full bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center space-x-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                <Icon size={24} style={{ color: THEME.primary }} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-bold text-[#1B3022]">{guide.title}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{guide.category}</p>
              </div>
              <div className="text-gray-300">
                <ChevronRight size={20} />
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="px-6 mt-12">
        <div className="bg-brown-50 p-6 rounded-3xl border border-brown-100/20" style={{ backgroundColor: '#efebe9' }}>
           <Activity size={24} style={{ color: THEME.secondary }} className="mb-4" />
           <h4 className="font-bold mb-2" style={{ color: THEME.secondary }}>Why First Aid Matters?</h4>
           <p className="text-xs text-[#5D4037]/70 font-medium leading-relaxed">Providing immediate assistance can reduce the severity of an injury and increase survival rates by up to 40% in critical conditions.</p>
        </div>
      </div>
    </div>
  );
};
