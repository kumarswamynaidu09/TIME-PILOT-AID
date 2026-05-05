/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone, Star, Building2, Search } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { THEME } from '../constants';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const HospitalsMarkers = () => {
    const placesLib = useMapsLibrary('places');
    const map = useMap();
    const [hospitals, setHospitals] = useState<google.maps.places.Place[]>([]);

    useEffect(() => {
        if (!placesLib || !map) return;
        
        placesLib.Place.searchByText({
            textQuery: 'hospitals near me',
            fields: ['displayName', 'location', 'formattedAddress', 'rating'],
            locationBias: map.getCenter(),
            maxResultCount: 10,
        }).then(({ places }) => {
            setHospitals(places);
        });
    }, [placesLib, map]);

    return (
        <>
            {hospitals.map(h => (
                h.location && (
                    <AdvancedMarker 
                      key={h.id} 
                      position={{ lat: h.location.lat(), lng: h.location.lng() }} 
                      title={h.displayName}
                    >
                        <Pin background="#D32F2F" glyphColor="#fff" borderColor="#8C1C1C" />
                    </AdvancedMarker>
                )
            ))}
        </>
    );
};

export const NearbyServicesScreen: React.FC = () => {
  if (!hasValidKey) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
          <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 text-gray-400">
             <MapPin size={40} />
          </div>
          <h2 className="text-xl font-bold mb-2">Google Maps Key Required</h2>
          <p className="text-sm text-gray-400 font-medium mb-8">Please add your GOOGLE_MAPS_PLATFORM_KEY to the secrets to see nearby hospitals.</p>
          <div className="text-left w-full max-w-xs space-y-4">
             <p className="text-[10px] uppercase font-bold text-gray-300">Quick Guide</p>
             <div className="text-xs text-gray-500 font-medium bg-gray-50 p-4 rounded-xl border border-gray-100">
                1. Go to Google Cloud Console<br/>
                2. Activate Maps JS API & Places API<br/>
                3. Add key to AI Studio Secrets
             </div>
          </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative">
      <div className="absolute top-12 left-6 right-6 z-10 space-y-4">
         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1 flex items-center">
            <div className="w-10 h-10 flex items-center justify-center text-gray-400">
                <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search hospitals, clinics..." 
              className="flex-1 h-10 text-sm outline-none font-medium pr-4"
            />
         </div>
         
         <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {['Hospitals', 'Pharmacies', 'Clinics', 'Blood Banks'].map((cat, idx) => (
                <button 
                  key={cat} 
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-sm border ${idx === 0 ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-white text-gray-600 border-gray-100'}`}
                  style={{ '--primary': THEME.primary } as any}
                >
                    {cat}
                </button>
            ))}
         </div>
      </div>

      <div className="flex-1">
        <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={{ lat: 34.0522, lng: -118.2437 }} // Sample Downtown LA
              defaultZoom={14}
              mapId="LIFE_LINE_MAP"
              style={{ width: '100%', height: '100%' }}
              disableDefaultUI={true}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            >
                <HospitalsMarkers />
            </Map>
        </APIProvider>
      </div>

      {/* Floating Card for closest hospital */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-[32px] p-6 shadow-2xl border border-gray-100 flex items-center space-x-4"
          >
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                 <Building2 size={32} className="text-red-600" />
              </div>
              <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-gray-800">Central Medical Center</h4>
                      <div className="flex items-center text-xs font-bold text-yellow-500">
                          <Star size={12} fill="currentColor" className="mr-0.5" /> 4.8
                      </div>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-3">1.2 km away • Emergency 24/7</p>
                  <div className="flex space-x-2">
                      <button className="flex-1 h-10 rounded-xl bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md shadow-green-100" style={{ '--primary': THEME.primary } as any}>
                          <Navigation size={14} />
                          <span>Get Directions</span>
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                          <Phone size={16} />
                      </button>
                  </div>
              </div>
          </motion.div>
      </div>
    </div>
  );
};
