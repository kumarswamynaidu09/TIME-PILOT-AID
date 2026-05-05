/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X, AlertTriangle, MapPin, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME } from '../constants';

export const SOSScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSOS = () => {
    setIsActive(true);
    setCountdown(5);
  };

  const cancelSOS = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setCountdown(5);
  };

  useEffect(() => {
    if (isActive && countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
        // Simulate haptic feedback
        if (navigator.vibrate) navigator.vibrate(50);
      }, 1000);
    } else if (countdown === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsSent(true);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
    }

    return () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, countdown]);

  if (isSent) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-red-600 text-white text-center">
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-md"
        >
            <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-4xl font-bold mb-4">Alerts Sent!</h2>
        <p className="text-white/80 font-medium mb-12">Emergency responders and your trusted contacts have been notified with your live GPS location.</p>
        
        <div className="w-full space-y-4">
            <div className="bg-white/10 rounded-2xl p-4 flex items-center space-x-4 border border-white/10">
                <MapPin size={24} />
                <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-white/50">Current Location</p>
                    <p className="font-bold">Sent (lat: 34.05, lng: -118.24)</p>
                </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 flex items-center space-x-4 border border-white/10">
                <PhoneCall size={24} />
                <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-white/50">Contacting Services</p>
                    <p className="font-bold">Establishing Secure Channel...</p>
                </div>
            </div>
        </div>

        <button 
           onClick={() => setCurrentScreen('HOME')}
           className="mt-12 text-sm font-bold uppercase tracking-[2px]"
        >
            Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-12 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-red-600">Emergency System</h1>
          <p className="text-gray-400 font-medium text-sm">Tap to trigger immediate response</p>
        </div>
        <button onClick={() => setCurrentScreen('HOME')} className="p-2">
            <X size={24} className="text-gray-400" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <AnimatePresence mode="wait">
          {!isActive ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-12">
                 <motion.div 
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-red-100 rounded-full"
                 />
                 <button 
                    onClick={startSOS}
                    className="relative w-56 h-56 rounded-full bg-red-600 shadow-2xl flex flex-col items-center justify-center text-white z-10 border-[12px] border-white active:scale-95 transition-transform"
                 >
                    <Shield size={64} className="mb-4" />
                    <span className="text-3xl font-black uppercase tracking-widest italic">SOS</span>
                 </button>
              </div>
              <div className="max-w-xs">
                 <h3 className="text-gray-800 font-bold mb-2">Immediate Rescue</h3>
                 <p className="text-sm text-gray-400 font-medium">Alerts emergency services, sends precise GPS location, and notifies emergency contacts.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-56 h-56 rounded-full border-[16px] border-red-50 flex items-center justify-center mb-12 relative">
                 <motion.div 
                   className="absolute inset-0 border-[16px] border-red-600 rounded-full"
                   initial={{ pathLength: 0 }}
                   animate={{ pathLength: 1 }}
                   transition={{ duration: 5, ease: "linear" }}
                   style={{ rotate: -90 }}
                 />
                 <span className="text-8xl font-black text-red-600 italic">{countdown}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Initiating Alerts</h3>
              <p className="text-gray-400 font-medium mb-12">Alerts will be sent in {countdown} seconds.</p>

              <button 
                onClick={cancelSOS}
                className="px-10 h-16 rounded-3xl bg-gray-100 text-gray-600 font-bold text-lg flex items-center space-x-2"
              >
                <X size={20} />
                <span>Cancel Alert</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-8 border-t border-gray-50 flex items-center space-x-4">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
             <AlertTriangle size={24} className="text-orange-500" />
          </div>
          <div>
             <p className="text-[10px] uppercase font-bold text-gray-400">Security Note</p>
             <p className="text-xs text-gray-600 font-medium leading-tight">Accidental triggers can be cancelled within 5 seconds. All alerts are encrypted.</p>
          </div>
      </div>
    </div>
  );
};
