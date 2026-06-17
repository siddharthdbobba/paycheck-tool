import type { PaycheckInput, PaycheckResult, Product } from './types'
import { takeHome } from './tax'
import { match401k, rothTarget } from './retirement'
import { budgetSplit } from './budget'
import { productsForCategory } from '@/lib/data/products'

const PER_YEAR = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 } as const
type ScoredProduct = Product & { reason: string; score: number }

// The homepage calculator surfaces one "first paycheck" essential per core
// category. Newer categories (budgeting, investing, insurance) have their own
// dedicated /best comparison pages, so they're intentionally not ranked on the
// homepage — but rankProducts falls back to the first product per category and
// drops any category that has no products yet, so extending this list is safe.
const RANKED_CATEGORIES: Product['category'][] = ['savings', 'brokerage', 'card']
const STATE_NAMES: Record<string, string> = {
  TX: 'Texas',
}

function usd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function rankProducts(input: PaycheckInput): Product[] {
  const match = match401k(input.grossAnnual, input.matchPercent, input.matchLimitPercent)
  const { takeHomeAnnual } = takeHome(input, match.employeeDollars)
  const monthlyTakeHome = takeHomeAnnual / 12
  const matchDollars = match.employerDollars
  const noIncomeTaxState = new Set(['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY']).has(input.state)
  const stateName = STATE_NAMES[input.state] ?? input.state

  return RANKED_CATEGORIES
    .map((category) => {
      const product = productsForCategory(category)[0]
      if (!product) {
        return null
      }

      let score = 0
      let reason = ''

      if (category === 'brokerage') {
        score = 60 + (matchDollars > 0 ? 45 : 0) + (input.grossAnnual >= 60_000 ? 10 : 0)
        reason = matchDollars > 0
          ? `Your employer match is worth about ${usd(matchDollars)}/yr, so a Roth IRA is the next retirement step.`
          : `After cash basics, this gives your ${usd(monthlyTakeHome)}/mo take-home a long-term investing lane.`
      }

      if (category === 'savings') {
        score = 85 + (monthlyTakeHome < 4_000 ? 20 : 0) + (matchDollars === 0 ? 15 : 0)
        reason = `Because you net about ${usd(monthlyTakeHome)}/mo, this fits a starter emergency fund.`
      }

      if (category === 'card') {
        score = 70 + (input.grossAnnual < 50_000 ? 20 : 0) + (noIncomeTaxState ? 8 : 0)
        reason = noIncomeTaxState
          ? `With ${stateName} take-home and no state income tax, use rewards carefully while building credit.`
          : `With your ${stateName} paycheck, a no-fee starter card can build credit without adding fixed costs.`
      }

      return { ...product, reason, score } satisfies ScoredProduct
    })
    .filter((item): item is ScoredProduct => item !== null)
    .sort((a, b) => b.score - a.score)
    .map(({ score: _score, ...product }) => product)
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
