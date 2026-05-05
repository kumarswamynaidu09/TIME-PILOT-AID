/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SOSScreen } from './screens/SOSScreen';
import { FirstAidGuideScreen } from './screens/FirstAidGuideScreen';
import { FirstAidDetailScreen } from './screens/FirstAidDetailScreen';
import { NearbyServicesScreen } from './screens/NearbyServicesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { MedicineCatalogueScreen } from './screens/MedicineCatalogueScreen';

const ScreenRouter = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'SPLASH':
      return <SplashScreen />;
    case 'LOGIN':
      return <LoginScreen />;
    case 'HOME':
      return <HomeScreen />;
    case 'SOS':
      return <SOSScreen />;
    case 'GUIDE':
      return <FirstAidGuideScreen />;
    case 'GUIDE_DETAIL':
      return <FirstAidDetailScreen />;
    case 'MEDICINE_CATALOGUE':
      return <MedicineCatalogueScreen />;
    case 'NEARBY':
      return <NearbyServicesScreen />;
    case 'PROFILE':
      return <ProfileScreen />;
    default:
      return <HomeScreen />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <ScreenRouter />
      </Layout>
    </AppProvider>
  );
}
