import type { Product } from '@/lib/calc/types'

export const PRODUCTS: Product[] = [
  {
    id: 'savings-sofi', category: 'savings', name: 'SoFi Checking & Savings',
    blurb: 'High-yield savings with no account fees.',
    highlights: ['Competitive APY', 'No monthly fee', 'Signup bonus for direct deposit'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/sofi', payoutNote: '~$20-75 funded',
  },
  {
    id: 'brokerage-fidelity', category: 'brokerage', name: 'Fidelity Roth IRA',
    blurb: 'Open a Roth IRA with no minimum and low-cost index funds.',
    highlights: ['No account fees', 'Great index funds', 'Beginner friendly'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/fidelity', payoutNote: 'varies',
  },
  {
    id: 'card-discover-student', category: 'card', name: 'Discover it Student',
    blurb: 'Starter cash-back card for building credit.',
    highlights: ['No annual fee', 'Cash back', 'Builds credit'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/discover-student', payoutNote: '~$50 approval',
  },
  // Add 1-2 more per category as programs are approved.
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
export function productsForCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}
