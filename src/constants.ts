/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const THEME = {
  primary: '#2D5A27', // Forest Green
  secondary: '#5D4037', // Earthy Brown
  accent: '#A5D6A7', // Light Green
  background: '#F9FBF9', // Off-White Nature
  card: '#FFFFFF',
  text: {
    primary: '#1B3022',
    secondary: '#5D4037',
    muted: '#8D9B91',
  }
};

export const FIRST_AID_GUIDES = [
  {
    id: 'accident',
    title: 'Road Accident',
    icon: 'Car',
    category: 'Trauma',
    steps: [
      { title: 'Safety First', description: 'Ensure the area is safe for you and the victim. Turn on hazard lights.' },
      { title: 'Check Visibility', description: 'Check if the victim is conscious and breathing.' },
      { title: 'Call Emergency', description: 'Call 911 or local emergency services immediately.' },
      { title: 'Control Bleeding', description: 'Apply firm pressure to any bleeding wounds with a clean cloth.' },
      { title: 'Keep Still', description: 'Unless there is immediate danger (like fire), do not move the victim to avoid spinal injury.' }
    ]
  },
  {
    id: 'burn',
    title: 'Severe Burns',
    icon: 'Flame',
    category: 'Injury',
    steps: [
      { title: 'Stop the Burn', description: 'Remove the heat source. Move the person away from smoke or flames.' },
      { title: 'Cool the Burn', description: 'Run cool (not cold) tap water over the burn for 10-20 minutes.' },
      { title: 'Remove Jewelry', description: 'Gently remove rings or tight clothing before swelling begins.' },
      { title: 'Cover Loosely', description: 'Cover the burn with a sterile bandage or clean cloth. Do not apply ointments.' }
    ]
  },
  {
    id: 'unconscious',
    title: 'Unconsciousness',
    icon: 'UserX',
    category: 'Critical',
    steps: [
      { title: 'Check Response', description: 'Tap their shoulders and shout. Look for chest movement.' },
      { title: 'Open Airway', description: 'Tilt the head back and lift the chin slightly.' },
      { title: 'Check Breathing', description: 'Look, listen, and feel for breath for no more than 10 seconds.' },
      { title: 'Positioning', description: 'If breathing, place them in the recovery position (on their side).' },
      { title: 'CPR', description: 'If not breathing, begin chest compressions immediately.' }
    ]
  },
  {
    id: 'heart_attack',
    title: 'Heart Attack',
    icon: 'HeartPulse',
    category: 'Critical',
    steps: [
      { title: 'Signs', description: 'Chest pain, shortness of breath, nausea, or sweating.' },
      { title: 'Sit Down', description: 'Have the person sit and stay calm. Do not let them walk.' },
      { title: 'Loosen Clothing', description: 'Loosen any tight clothing around the neck and waist.' },
      { title: 'Medication', description: 'If they have prescribed nitroglycerin, help them take it.' }
    ]
  }
];

export const MEDICINES_DATA = [
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    uses: ['Fever', 'Headache', 'Muscle Pain'],
    sideEffects: ['Nausea', 'Rash'],
    warnings: 'Do not exceed 4g in 24 hours. Avoid alcohol.'
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'NSAID',
    category: 'Anti-inflammatory',
    uses: ['Arthritis', 'Dental Pain', 'Fever'],
    sideEffects: ['Stomach pain', 'Dizziness'],
    warnings: 'Take with food. Not recommended for people with stomach ulcers.'
  },
  {
    id: 'cetirizine',
    name: 'Cetirizine',
    genericName: 'Antihistamine',
    category: 'Allergy',
    uses: ['Hay fever', 'Hives', 'Dust allergies'],
    sideEffects: ['Drowsiness', 'Dry mouth'],
    warnings: 'Avoid driving if drowsy.'
  },
  {
    id: 'loperamide',
    name: 'Loperamide',
    genericName: 'Antidiarrheal',
    category: 'Digestive',
    uses: ['Diarrhea'],
    sideEffects: ['Constipation', 'Cramping'],
    warnings: 'Drink plenty of water. Do not use if high fever is present.'
  }
];

export const INCIDENTS_FEED = [
  {
    id: '1',
    type: 'Vehicle Collision',
    location: 'Main St & 5th Ave',
    distance: '0.8 km',
    time: '2 mins ago',
    status: 'active'
  },
  {
    id: '2',
    type: 'Medical Emergency',
    location: 'Greenwood Park',
    distance: '1.2 km',
    time: '15 mins ago',
    status: 'active'
  }
];
