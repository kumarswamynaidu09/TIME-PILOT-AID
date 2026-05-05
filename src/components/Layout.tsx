/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Shield, BookOpen, MapPin, User, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppScreen } from '../types';
import { THEME } from '../constants';

const NavItem = ({ icon: Icon, label, screen, active }: { icon: any, label: string, screen: AppScreen, active: boolean }) => {
  const { setCurrentScreen } = useApp();
  
  return (
    <button 
      onClick={() => setCurrentScreen(screen)}
      className="flex flex-col items-center justify-center space-y-1 w-full relative h-full py-2"
    >
      <Icon 
        size={24} 
        color={active ? THEME.primary : THEME.text.muted} 
        strokeWidth={active ? 2.5 : 2}
      />
      <span 
        className={`text-[10px] font-medium tracking-tight ${active ? 'text-[var(--primary)]' : 'text-[var(--muted)]'}`}
        style={{ color: active ? THEME.primary : THEME.text.muted }}
      >
        {label}
      </span>
      {active && (
        <motion.div 
          layoutId="nav-pill"
          className="absolute -top-1 w-1 h-1 rounded-full"
          style={{ backgroundColor: THEME.primary }}
        />
      )}
    </button>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentScreen, setCurrentScreen } = useApp();

  const showNav = !['SPLASH', 'LOGIN'].includes(currentScreen);

  return (
    <div 
      className="flex flex-col h-screen overflow-hidden" 
      style={{ backgroundColor: THEME.background, color: THEME.text.primary }}
    >
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {/* SOS Quick Floating Button if on certain screens */}
        {showNav && currentScreen !== 'SOS' && (
           <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentScreen('SOS')}
            className="fixed bottom-24 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50"
            style={{ backgroundColor: '#D32F2F' }}
           >
             <AlertCircle color="white" size={28} />
           </motion.button>
        )}
      </main>

      {showNav && (
        <div 
          className="h-20 border-t border-gray-100 flex items-center justify-around px-2 z-50 bg-white/80 backdrop-blur-md"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <NavItem icon={Home} label="Home" screen="HOME" active={currentScreen === 'HOME'} />
          <NavItem icon={BookOpen} label="Guides" screen="GUIDE" active={currentScreen === 'GUIDE' || currentScreen === 'GUIDE_DETAIL'} />
          <NavItem icon={Shield} label="SOS" screen="SOS" active={currentScreen === 'SOS'} />
          <NavItem icon={MapPin} label="Nearby" screen="NEARBY" active={currentScreen === 'NEARBY'} />
          <NavItem icon={User} label="Profile" screen="PROFILE" active={currentScreen === 'PROFILE'} />
        </div>
      )}
    </div>
  );
};
