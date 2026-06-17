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

  it('budget is a 50/30/20 split of MONTHLY (not annual) take-home', () => {
    const r = buildResult(input)
    const monthlyTakeHome = r.takeHomeAnnual / 12
    expect(r.budget.needs).toBeCloseTo(monthlyTakeHome * 0.5, 2)
    expect(r.budget.wants).toBeCloseTo(monthlyTakeHome * 0.3, 2)
    expect(r.budget.savings).toBeCloseTo(monthlyTakeHome * 0.2, 2)
  })

  it('takeHomePerCheck uses correct per-frequency divisor', () => {
    const biweekly = buildResult(input)
    expect(biweekly.takeHomePerCheck).toBeCloseTo(biweekly.takeHomeAnnual / 26, 2)

    const monthlyInput = { ...input, payFrequency: 'monthly' as const }
    const monthly = buildResult(monthlyInput)
    expect(monthly.takeHomePerCheck).toBeCloseTo(monthly.takeHomeAnnual / 12, 2)

    expect(biweekly.takeHomePerCheck).not.toBeCloseTo(monthly.takeHomePerCheck, 0)
  })

  it('zero match yields employerMatchDollars === 0 and recommended401kPercent === 0', () => {
    const zeroMatchInput = { ...input, matchPercent: 0, matchLimitPercent: 0 }
    const r = buildResult(zeroMatchInput)
    expect(r.employerMatchDollars).toBe(0)
    expect(r.recommended401kPercent).toBe(0)
  })
})
