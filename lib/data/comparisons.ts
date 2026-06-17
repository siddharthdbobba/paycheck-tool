import type { Product } from '@/lib/calc/types'

export const COMPARISONS: { slug: string; title: string; metaDescription: string; category: Product['category']; intro: string }[] = [
  { slug: 'best-high-yield-savings', title: 'Best High-Yield Savings Accounts (2026)', metaDescription: 'Where to park your first paycheck for the highest interest, ranked for beginners.', category: 'savings', intro: 'These accounts pay far more than a big-bank savings account.' },
  { slug: 'best-roth-ira-brokerages', title: 'Best Brokerages for Your First Roth IRA (2026)', metaDescription: 'The easiest, lowest-cost places to open a Roth IRA as a new grad.', category: 'brokerage', intro: 'A Roth IRA is the simplest tax-free retirement account to start now.' },
  { slug: 'best-first-credit-cards', title: 'Best First Credit Cards to Build Credit (2026)', metaDescription: 'Starter cards that build credit with no annual fee.', category: 'card', intro: 'Pick one starter card, pay it in full monthly, and your credit grows.' },
  { slug: 'best-budgeting-apps', title: 'Best Budgeting Apps for Your First Paycheck (2026)', metaDescription: 'The easiest budgeting apps to track spending and stick to a plan as a new grad.', category: 'budgeting', intro: 'A budgeting app turns your first paycheck into an actual plan — pick one and stick with it.' },
  { slug: 'best-investing-apps-beginners', title: 'Best Investing Apps for Beginners (2026)', metaDescription: 'Low-cost, beginner-friendly apps to start investing your first paycheck.', category: 'investing', intro: 'Start small and automate it — these apps make your first investments painless.' },
  { slug: 'best-renters-insurance', title: 'Best Renters & Starter Insurance (2026)', metaDescription: 'Affordable renters and life insurance options for young adults on a budget.', category: 'insurance', intro: 'Protect your stuff and your future for the price of a couple coffees a month.' },
]
export function getComparison(slug: string) {
  return COMPARISONS.find((c) => c.slug === slug)
}
