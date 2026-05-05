/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Pill, ChevronDown, ChevronUp, AlertCircle, Info, ArrowLeft } from 'lucide-react';
import { THEME, MEDICINES_DATA } from '../constants';
import { Medicine } from '../types';
import { useApp } from '../context/AppContext';

const MedicineCard = ({ medicine }: { medicine: Medicine }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4"
    >
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between text-left"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
            <Pill size={24} className="text-blue-500" />
          </div>
          <div>
            <h4 className="font-bold text-[#1B3022]">{medicine.name}</h4>
            <p className="text-xs text-gray-400 font-medium">{medicine.genericName} • {medicine.category}</p>
          </div>
        </div>
        <div className="text-gray-300">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 pt-0"
          >
            <div className="h-[1px] bg-gray-50 mb-4" />
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Common Uses</p>
                <div className="flex flex-wrap gap-2">
                  {medicine.uses.map(use => (
                    <span key={use} className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-600">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertCircle size={14} className="text-orange-500" />
                    <p className="text-[10px] font-extrabold text-orange-700 uppercase">Warning</p>
                  </div>
                  <p className="text-xs text-orange-800 font-medium leading-relaxed">{medicine.warnings}</p>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                   <div className="flex items-center space-x-2 mb-1">
                    <Info size={14} className="text-blue-500" />
                    <p className="text-[10px] font-extrabold text-blue-700 uppercase">Side Effects</p>
                  </div>
                  <p className="text-xs text-blue-800 font-medium leading-relaxed">May cause: {medicine.sideEffects.join(', ')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const MedicineCatalogueScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedicines = MEDICINES_DATA.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-12 h-full overflow-y-auto">
      <div className="px-6 pt-12 mb-8">
        <button 
          onClick={() => setCurrentScreen('GUIDE')}
          className="mb-6 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: THEME.text.primary }}>Medicine Catalogue</h1>
        <p className="text-gray-400 font-medium">Identify common OTC medicines and understand their usage.</p>
      </div>

      <div className="px-6 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, category or type..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-100 h-14 pl-12 pr-4 rounded-2xl outline-none shadow-sm focus:border-blue-200 transition-colors"
          />
        </div>
      </div>

      <div className="px-6">
        <motion.div layout className="space-y-2">
          {filteredMedicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}

          {filteredMedicines.length === 0 && (
            <div className="text-center py-12">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 grayscale opacity-50">
                  <Pill size={32} className="text-gray-300" />
               </div>
               <p className="text-gray-400 font-bold">No medicines found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>

      <div className="px-6 mt-8">
         <div className="bg-red-50 p-6 rounded-[32px] border border-red-100 flex items-start space-x-4">
            <AlertCircle size={24} className="text-red-500 shrink-0" />
            <div className="space-y-1">
               <h5 className="text-xs font-black text-red-700 uppercase tracking-wider">Medical Disclaimer</h5>
               <p className="text-xs text-red-600/70 font-medium leading-relaxed">This catalogue is for informational purposes only. Do not consume any medication without consulting a certified healthcare professional. In case of overdose, call Emergency immediately.</p>
            </div>
         </div>
      </div>
    </div>
  );
};
