import { ROTH_LIMIT_2026 } from './constants'

export function match401k(grossAnnual: number, matchPercent: number, matchLimitPercent: number) {
  const recommendedPercent = matchLimitPercent
  const employeeDollars = grossAnnual * (matchLimitPercent / 100)
  const employerDollars = employeeDollars * (matchPercent / 100)
  return { recommendedPercent, employeeDollars, employerDollars }
}

export function rothTarget() {
  return { annual: ROTH_LIMIT_2026, monthly: ROTH_LIMIT_2026 / 12 }
}
