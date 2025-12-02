/**
 * Brandscaling Pricing Tiers & Copy Framework
 * Based on Design Guidelines Section 13
 */

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNumeric: number;
  stage: string;
  aiCredits: number;
  aiCreditsLabel: string;
  features: string[];
  outcomes: string[];
  cta: string;
  color: 'indigo' | 'plum' | 'pink' | 'orange' | 'red';
  recommended?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'discovery',
    name: 'Discovery',
    tagline: 'Get your E-DNA report',
    price: '£9.99',
    priceNumeric: 9.99,
    stage: 'Foundation',
    aiCredits: 10,
    aiCreditsLabel: 'Preview',
    features: [
      'Complete EDNA assessment',
      'Personalized results report',
      'Architect or Alchemist classification',
      'Subtype identification',
      'Basic AI mentor access (10 credits)'
    ],
    outcomes: [
      'Understand your entrepreneurial DNA',
      'Identify your core strengths',
      'Get personalized recommendations'
    ],
    cta: 'Get Your Report',
    color: 'indigo'
  },
  {
    id: 'awareness',
    name: 'Awareness',
    tagline: 'Stabilise your loop',
    price: '£99',
    priceNumeric: 99,
    stage: 'Growth Plan',
    aiCredits: 25,
    aiCreditsLabel: 'Light',
    features: [
      'Everything in Discovery',
      'Access to Foundation courses',
      'Monthly group coaching session',
      'Community forum access',
      'AI mentor (25 credits/month)'
    ],
    outcomes: [
      'Build sustainable business systems',
      'Connect with like-minded founders',
      'Get ongoing support and guidance'
    ],
    cta: 'Start Growth Plan',
    color: 'plum'
  },
  {
    id: 'entry',
    name: 'Entry',
    tagline: 'Build your launch system',
    price: '£999 + VAT',
    priceNumeric: 999,
    stage: 'Launch System',
    aiCredits: 50,
    aiCreditsLabel: 'Moderate',
    features: [
      'Everything in Awareness',
      'Complete course library access',
      'Weekly 1:1 coaching calls',
      'Launch plan template & support',
      'AI mentor (50 credits/month)',
      'Priority support'
    ],
    outcomes: [
      'Launch your product or service',
      'Build a complete business system',
      'Get personalized launch strategy'
    ],
    cta: 'Build Launch System',
    color: 'pink',
    recommended: true
  },
  {
    id: 'expert',
    name: 'Expert',
    tagline: 'Make your offer magnetic',
    price: '£9,999 + VAT',
    priceNumeric: 9999,
    stage: 'Magnetic Offer',
    aiCredits: 75,
    aiCreditsLabel: 'Expanded',
    features: [
      'Everything in Entry',
      'Unlimited course access',
      '2x weekly 1:1 coaching',
      'Offer design workshop',
      'Marketing strategy & execution',
      'AI mentor (75 credits/month)',
      'Direct mentor access'
    ],
    outcomes: [
      'Create an irresistible offer',
      'Scale revenue predictably',
      'Build high-converting systems'
    ],
    cta: 'Make Offer Magnetic',
    color: 'orange'
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Apply for Private Mastermind',
    price: '£19,999 + VAT',
    priceNumeric: 19999,
    stage: 'Private Mastermind',
    aiCredits: 100,
    aiCreditsLabel: 'Unlimited',
    features: [
      'Everything in Expert',
      'Private mastermind access',
      'Unlimited 1:1 coaching',
      'Done-with-you implementation',
      'Direct founder access',
      'AI mentor (unlimited credits)',
      'VIP event invitations'
    ],
    outcomes: [
      'Join elite founder community',
      'Scale to 7+ figures',
      'Build legacy business'
    ],
    cta: 'Apply for Mastermind',
    color: 'red'
  }
];

/**
 * Get pricing tier by ID
 */
export function getPricingTier(tierId: string): PricingTier | undefined {
  return pricingTiers.find(tier => tier.id === tierId);
}

/**
 * Get next tier for upgrade prompts
 */
export function getNextTier(currentTierId: string): PricingTier | null {
  const currentIndex = pricingTiers.findIndex(tier => tier.id === currentTierId);
  if (currentIndex === -1 || currentIndex === pricingTiers.length - 1) {
    return null;
  }
  return pricingTiers[currentIndex + 1];
}

/**
 * Get color class for tier
 */
export function getTierColorClass(color: PricingTier['color']): string {
  const colorMap = {
    indigo: 'bg-[var(--bs-color-indigo)]',
    plum: 'bg-[var(--bs-color-plum)]',
    pink: 'bg-[var(--bs-color-pink)]',
    orange: 'bg-[var(--bs-color-orange)]',
    red: 'bg-[var(--bs-color-red)]'
  };
  return colorMap[color];
}

/**
 * Get AI credits percentage for progress bar
 */
export function getAICreditsPercentage(credits: number): number {
  const maxCredits = 100;
  return Math.min((credits / maxCredits) * 100, 100);
}

/**
 * Access Matrix - What changes between tiers
 */
export interface AccessMatrixItem {
  feature: string;
  current: string | boolean;
  next: string | boolean;
}

export function getAccessMatrix(currentTierId: string): AccessMatrixItem[] {
  const current = getPricingTier(currentTierId);
  const next = getNextTier(currentTierId);
  
  if (!current || !next) return [];
  
  return [
    {
      feature: 'Course Library',
      current: currentTierId === 'discovery' ? 'None' : 'Foundation',
      next: next.id === 'entry' ? 'Full Access' : 'Expanded'
    },
    {
      feature: 'Coaching Calls',
      current: currentTierId === 'discovery' ? 'None' : currentTierId === 'awareness' ? 'Group Only' : 'Weekly',
      next: next.id === 'expert' ? '2x Weekly' : next.id === 'elite' ? 'Unlimited' : 'Weekly'
    },
    {
      feature: 'AI Credits/Month',
      current: current.aiCredits,
      next: next.aiCredits
    },
    {
      feature: 'Community Access',
      current: currentTierId !== 'discovery',
      next: true
    },
    {
      feature: 'Priority Support',
      current: ['entry', 'expert', 'elite'].includes(currentTierId),
      next: true
    },
    {
      feature: 'Direct Founder Access',
      current: currentTierId === 'elite',
      next: next.id === 'elite'
    }
  ];
}

export default pricingTiers;
