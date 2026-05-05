/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Heart, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME, FIRST_AID_GUIDES } from '../constants';

export const FirstAidDetailScreen: React.FC = () => {
  const { setCurrentScreen, selectedGuideId } = useApp();
  
  const guide = FIRST_AID_GUIDES.find(g => g.id === selectedGuideId);

  if (!guide) return null;

  return (
    <div className="min-h-full flex flex-col">
      <div className="relative h-64 shrink-0 overflow-hidden" style={{ backgroundColor: THEME.primary }}>
        <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#grid)" />
                <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                </defs>
            </svg>
        </div>
        
        <div className="absolute top-12 left-6 right-6 flex items-center justify-between z-10 text-white">
            <button onClick={() => setCurrentScreen('GUIDE')} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <ArrowLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Share2 size={20} />
            </button>
        </div>

        <div className="absolute bottom-10 left-8 right-8 z-10 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[3px] opacity-70 mb-2 block">{guide.category}</span>
            <h1 className="text-3xl font-black">{guide.title}</h1>
        </div>
      </div>

      <div className="flex-1 bg-white -mt-6 rounded-t-[32px] p-8 pb-12 shadow-2xl relative z-20 overflow-y-auto">
        <div className="w-12 h-1 rounded-full bg-gray-100 mx-auto mb-8" />
        
        <div className="space-y-8">
            {guide.steps.map((step, idx) => (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="flex items-start space-x-6"
                >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center font-black text-xs" style={{ color: THEME.primary }}>
                        {idx + 1}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-1">{step.title}</h4>
                        <p className="text-gray-500 font-medium leading-relaxed">{step.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="mt-12 p-6 rounded-3xl bg-red-50 border border-red-100 flex items-start space-x-4">
            <CheckCircle2 size={24} className="text-red-500 shrink-0" />
            <p className="text-xs text-red-700 font-bold leading-tight">These instructions are for emergency use only. Always call professional help before performing assistance.</p>
        </div>
      </div>
    </div>
  );
};
