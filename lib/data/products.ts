import type { Product } from '@/lib/calc/types'

export const PRODUCTS: Product[] = [
  // === Savings ===
  {
    id: 'savings-sofi', category: 'savings', name: 'SoFi Checking & Savings',
    blurb: 'High-yield savings with no account fees and a signup bonus.',
    highlights: ['4.0% APY', 'No monthly fee', '$250 signup bonus with direct deposit', 'All-in-one app'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/sofi', payoutNote: '~$20-75 funded',
  },
  {
    id: 'savings-ally', category: 'savings', name: 'Ally Online Savings',
    blurb: 'Reliable high-yield savings from a well-known online bank.',
    highlights: ['3.8% APY', 'No minimum deposit', 'No monthly fees', '24/7 customer service'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/ally', payoutNote: 'varies',
  },
  {
    id: 'savings-wealthfront', category: 'savings', name: 'Wealthfront Cash Account',
    blurb: 'High APY savings with instant access and no fees.',
    highlights: ['4.0% APY', 'FDIC insured up to $8M', 'No account fees', 'Instant transfers'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/wealthfront', payoutNote: '~$25-50 funded',
  },
  {
    id: 'savings-capitalone', category: 'savings', name: 'Capital One 360 Performance Savings',
    blurb: 'Reliable high-yield savings from a trusted national bank.',
    highlights: ['3.8% APY', 'No fees', 'No minimum balance', 'Great mobile app'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/capitalone', payoutNote: 'varies',
  },

  // === Brokerage ===
  {
    id: 'brokerage-fidelity', category: 'brokerage', name: 'Fidelity Roth IRA',
    blurb: 'Open a Roth IRA with no minimum and low-cost index funds.',
    highlights: ['No account fees', 'Great index funds (FXAIX, FZROX)', 'Beginner friendly app', 'Excellent customer service'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/fidelity', payoutNote: 'varies',
  },
  {
    id: 'brokerage-vanguard', category: 'brokerage', name: 'Vanguard Roth IRA',
    blurb: 'The OG low-cost brokerage — perfect for buy-and-hold investors.',
    highlights: ['No account fees', 'Ultra-low-cost ETFs (VTI, VOO)', 'Strong retirement focus', 'Trusted by millions'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/vanguard', payoutNote: 'varies',
  },
  {
    id: 'brokerage-schwab', category: 'brokerage', name: 'Schwab Roth IRA',
    blurb: 'Best customer service + a solid lineup of low-cost index funds.',
    highlights: ['No account fees', 'Best-in-class customer support', 'Great checking integration', 'Excellent research tools'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/schwab', payoutNote: 'varies',
  },

  // === Credit Cards ===
  {
    id: 'card-discover-student', category: 'card', name: 'Discover it Student Cash Back',
    blurb: 'Starter cash-back card that builds credit with solid rewards.',
    highlights: ['No annual fee', '2% cash back at restaurants', 'Cashback match after first year', 'Good grades reward ($20/yr)'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/discover-student', payoutNote: '~$50 approval',
  },
  {
    id: 'card-capitalone-savor', category: 'card', name: 'Capital One SavorOne Student',
    blurb: 'Excellent dining and entertainment rewards for new grads.',
    highlights: ['No annual fee', '3% cash back on dining', '3% on entertainment', 'No foreign transaction fees'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/capitalone-savor', payoutNote: '~$50-75 approval',
  },
  {
    id: 'card-chase-freedom-rise', category: 'card', name: 'Chase Freedom Rise',
    blurb: 'Build credit with a simple, no-fee card from a major bank.',
    highlights: ['No annual fee', '1.5% cash back on everything', 'Credit building tools', 'Automatic credit line review'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/chase-rise', payoutNote: '~$50 approval',
  },
  {
    id: 'card-bofa-customized', category: 'card', name: 'Bank of America Customized Cash Rewards',
    blurb: 'Choose your 3% cash-back category — great for recent grads.',
    highlights: ['No annual fee', '3% in category of your choice', 'Online banking bonus', 'Preferred Rewards boost'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/bofa-customized', payoutNote: '~$50-100 approval',
  },
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
export function productsForCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}
