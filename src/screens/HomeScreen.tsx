/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Clock, ArrowRight, Shield, Activity, Heart, AlertCircle, Pill } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME, INCIDENTS_FEED, FIRST_AID_GUIDES } from '../constants';

export const HomeScreen: React.FC = () => {
  const { user, setCurrentScreen, setSelectedGuideId } = useApp();

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="px-6 pt-12 pb-8 flex items-center justify-between">
        <div>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Welcome back,</p>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: THEME.text.primary }}>{user?.name}</h1>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
          <Activity size={24} style={{ color: THEME.primary }} />
        </div>
      </div>

      {/* SOS Quick Call Card */}
      <div className="px-6 mb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentScreen('SOS')}
          className="w-full relative overflow-hidden rounded-[32px] p-8 text-left shadow-xl shadow-red-100"
          style={{ backgroundColor: '#D32F2F' }}
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Shield color="white" size={28} />
            </div>
            <h3 className="text-3xl font-bold text-white leading-tight mb-2">Emergency SOS</h3>
            <p className="text-white/70 font-medium">One-tap to alert services and emergency contacts.</p>
          </div>
          <AlertCircle className="absolute -bottom-6 -right-6 text-white/5" size={180} />
        </motion.button>
      </div>

      {/* Nearby Feed */}
      <div className="px-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold uppercase tracking-widest text-[#5D4037]/60">Active Incidents Nearby</h2>
          <button className="text-xs font-bold text-[#2D5A27] flex items-center">
            See All <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          {INCIDENTS_FEED.map((incident) => (
            <motion.div
              key={incident.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-start space-x-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                <AlertCircle size={24} style={{ color: '#F57C00' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-[#1B3022]">{incident.type}</h4>
                  <span className="text-[10px] bg-red-50 text-red-500 font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
                  <div className="flex items-center">
                    <MapPin size={12} className="mr-1" />
                    {incident.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {incident.time}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Access Tools */}
      <div className="px-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold uppercase tracking-widest text-[#5D4037]/60">Medical Resources</h2>
          <button 
            onClick={() => setCurrentScreen('MEDICINE_CATALOGUE')}
            className="text-xs font-bold text-[#2D5A27] flex items-center"
          >
            Full Catalogue <ArrowRight size={14} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentScreen('MEDICINE_CATALOGUE')}
            className="bg-[#E3F2FD] rounded-[24px] p-5 border border-blue-50 shadow-sm text-left flex flex-col"
          >
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
              <Pill size={20} className="text-blue-500" />
            </div>
            <h4 className="font-bold text-[#1B3022] text-sm mb-1">Medications</h4>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Usage & Safety</p>
          </motion.button>

          {FIRST_AID_GUIDES.slice(0, 1).map((guide) => (
            <motion.button
              key={guide.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedGuideId(guide.id);
                setCurrentScreen('GUIDE_DETAIL');
              }}
              className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm text-left flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                <Heart size={20} style={{ color: THEME.primary }} />
              </div>
              <h4 className="font-bold text-[#1B3022] text-sm mb-1">{guide.title}</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{guide.category}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
