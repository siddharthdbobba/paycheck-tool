import type { PaycheckInput, PaycheckResult, Product } from './types'
import { takeHome } from './tax'
import { match401k, rothTarget } from './retirement'
import { budgetSplit } from './budget'
import { productsForCategory } from '@/lib/data/products'

const PER_YEAR = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 } as const

// The homepage calculator surfaces one "first paycheck" essential per core
// category. Newer categories (budgeting, investing, insurance) have their own
// dedicated /best comparison pages, so they're intentionally not ranked on the
// homepage — but rankProducts falls back to the first product per category and
// drops any category that has no products yet, so extending this list is safe.
const RANKED_CATEGORIES: Product['category'][] = ['savings', 'brokerage', 'card']

export function rankProducts(_input: PaycheckInput): Product[] {
  return RANKED_CATEGORIES
    .map((category) => productsForCategory(category)[0])
    .filter(Boolean) as Product[]
}

export function buildResult(input: PaycheckInput): PaycheckResult {
  const match = match401k(input.grossAnnual, input.matchPercent, input.matchLimitPercent)
  const { federalTax, fica, stateTax, takeHomeAnnual } = takeHome(input, match.employeeDollars)
  const roth = rothTarget()
  const budget = budgetSplit(takeHomeAnnual / 12)
  return {
    takeHomeAnnual,
    takeHomePerCheck: takeHomeAnnual / PER_YEAR[input.payFrequency],
    federalTax, fica, stateTax,
    recommended401kPercent: match.recommendedPercent,
    employerMatchDollars: match.employerDollars,
    rothMonthly: roth.monthly,
    budget,
  }
}
