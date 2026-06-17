import type { Product } from '@/lib/calc/types'

export const COMPARISONS: { slug: string; title: string; metaDescription: string; category: Product['category']; intro: string }[] = [
  { slug: 'best-high-yield-savings', title: 'Best High-Yield Savings Accounts (2026)', metaDescription: 'Where to park your first paycheck for the highest interest, ranked for beginners.', category: 'savings', intro: 'These accounts pay far more than a big-bank savings account.' },
  { slug: 'best-roth-ira-brokerages', title: 'Best Brokerages for Your First Roth IRA (2026)', metaDescription: 'The easiest, lowest-cost places to open a Roth IRA as a new grad.', category: 'brokerage', intro: 'A Roth IRA is the simplest tax-free retirement account to start now.' },
  { slug: 'best-first-credit-cards', title: 'Best First Credit Cards to Build Credit (2026)', metaDescription: 'Starter cards that build credit with no annual fee.', category: 'card', intro: 'Pick one starter card, pay it in full monthly, and your credit grows.' },
]
export function getComparison(slug: string) {
  return COMPARISONS.find((c) => c.slug === slug)
}
