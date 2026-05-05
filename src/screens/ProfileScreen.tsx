/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { User, Activity, Droplets, Shield, Plus, Phone, Mail, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME } from '../constants';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useApp();

  return (
    <div className="pb-12 h-full overflow-y-auto">
      <div className="px-6 pt-12 pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: THEME.text.primary }}>My Medical ID</h1>
        <button className="p-2 text-gray-400">
            <Settings size={22} />
        </button>
      </div>

      <div className="px-6 mb-8 flex items-center space-x-6">
         <div className="w-24 h-24 rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="avatar" />
         </div>
         <div>
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-sm text-gray-400 font-medium">{user?.age} Years • {user?.bloodGroup} Group</p>
            <div className="mt-2 inline-flex items-center space-x-1 px-2 py-1 bg-green-50 rounded-lg">
                <Shield size={12} style={{ color: THEME.primary }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: THEME.primary }}>Verified User</span>
            </div>
         </div>
      </div>

      <div className="px-6 mb-10">
         <h3 className="text-xs font-bold uppercase tracking-[2px] text-gray-400 mb-4 px-1">Health Vitals</h3>
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Blood Group</p>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                        <Droplets size={16} className="text-red-500" />
                    </div>
                    <span className="text-xl font-black text-gray-800">{user?.bloodGroup}</span>
                </div>
            </div>
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Daily Pulse</p>
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                        <Activity size={16} className="text-red-500" />
                    </div>
                    <span className="text-xl font-black text-gray-800">72 <small className="text-xs font-bold text-gray-300">bpm</small></span>
                </div>
            </div>
         </div>
      </div>

      <div className="px-6 mb-10">
         <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-xs font-bold uppercase tracking-[2px] text-gray-400">Emergency Contacts</h3>
            <button className="text-xs text-[var(--primary)] font-bold flex items-center" style={{ '--primary': THEME.primary } as any}>
                <Plus size={14} className="mr-1" /> Add New
            </button>
         </div>
         <div className="space-y-4">
            <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                        <User size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-800">Sarah Johnson</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Spouse</p>
                    </div>
                </div>
                <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <Phone size={18} />
                </button>
            </div>
            <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                        <User size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-800">Michael Doe</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Father</p>
                    </div>
                </div>
                <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <Phone size={18} />
                </button>
            </div>
         </div>
      </div>

      <div className="px-6 mb-10">
         <h3 className="text-xs font-bold uppercase tracking-[2px] text-gray-400 mb-4 px-1">Other Settings</h3>
         <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <button className="w-full h-16 px-6 flex items-center justify-between border-bottom border-gray-50 text-left">
                <span className="text-sm font-bold text-gray-700">Notification Preferences</span>
                <ChevronRight size={18} className="text-gray-300" />
            </button>
            <div className="h-[1px] bg-gray-50 mx-6" />
            <button className="w-full h-16 px-6 flex items-center justify-between text-left">
                <span className="text-sm font-bold text-gray-700">Medical Data Export</span>
                <ChevronRight size={18} className="text-gray-300" />
            </button>
         </div>
      </div>

      <div className="px-6 pb-12">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="w-full h-16 rounded-2xl bg-gray-100 text-gray-400 font-bold flex items-center justify-center space-x-2"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
};
