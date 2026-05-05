/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AppScreen } from '../types';

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  selectedGuideId: string | null;
  setSelectedGuideId: (id: string | null) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('SPLASH');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('lifeline_user');
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }
  }, []);

  const setUser = (newUser: UserProfile) => {
    setUserState(newUser);
    localStorage.setItem('lifeline_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem('lifeline_user');
    setCurrentScreen('LOGIN');
  };

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        setUser, 
        currentScreen, 
        setCurrentScreen,
        selectedGuideId,
        setSelectedGuideId,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
