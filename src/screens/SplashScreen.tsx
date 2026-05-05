/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME } from '../constants';

export const SplashScreen: React.FC = () => {
  const { user, setCurrentScreen } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        setCurrentScreen('HOME');
      } else {
        setCurrentScreen('LOGIN');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [user, setCurrentScreen]);

  return (
    <div 
      className="h-full flex flex-col items-center justify-center p-8 text-center"
      style={{ backgroundColor: THEME.primary }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
          <Shield size={48} color="white" strokeWidth={1.5} />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">LifeLine</h1>
        <p className="text-white/70 font-medium text-lg leading-tight">Every Second Counts.</p>
      </motion.div>
      
      <div className="absolute bottom-12">
        <motion.div
           animate={{ opacity: [0.3, 0.6, 0.3] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="text-white/40 text-xs uppercase tracking-widest font-bold"
        >
          Initializing Secure Response
        </motion.div>
      </div>
    </div>
  );
};
