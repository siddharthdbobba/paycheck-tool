import { describe, it, expect } from 'vitest'
import { rankProducts, buildResult } from '@/lib/calc/recommend'

const input = { grossAnnual: 70000, state: 'IN', payFrequency: 'biweekly' as const, matchPercent: 100, matchLimitPercent: 4 }

describe('rankProducts', () => {
  it('returns one product per category in fixed order', () => {
    const r = rankProducts(input)
    expect(r.map((p) => p.category)).toEqual(['savings', 'brokerage', 'card'])
  })
})

describe('buildResult', () => {
  it('composes take-home, match, roth, and budget', () => {
    const r = buildResult(input)
    expect(r.takeHomeAnnual).toBeGreaterThan(0)
    expect(r.employerMatchDollars).toBeCloseTo(2800, 0)
    expect(r.rothMonthly).toBeGreaterThan(0)
    expect(r.budget.needs + r.budget.wants + r.budget.savings).toBeCloseTo(r.takeHomeAnnual / 12, 0)
  })
})
