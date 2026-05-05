/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  name: string;
  age: string;
  bloodGroup: string;
  medicalHistory: string;
  allergies: string;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface FirstAidStep {
  title: string;
  description: string;
}

export interface FirstAidGuide {
  id: string;
  title: string;
  icon: string;
  category: string;
  steps: FirstAidStep[];
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  uses: string[];
  sideEffects: string[];
  warnings: string;
}

export type AppScreen = 'SPLASH' | 'LOGIN' | 'HOME' | 'SOS' | 'GUIDE' | 'NEARBY' | 'PROFILE' | 'GUIDE_DETAIL' | 'MEDICINE_CATALOGUE';
