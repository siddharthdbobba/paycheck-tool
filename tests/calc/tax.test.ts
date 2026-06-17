import { describe, it, expect } from 'vitest'
import { federalIncomeTax, ficaTax, stateTax, takeHome } from '@/lib/calc/tax'

describe('federalIncomeTax', () => {
  it('applies brackets progressively after standard deduction', () => {
    // taxable income (already post-deduction) of 40000, 2026 brackets:
    // 10% * 12400 + 12% * (40000 - 12400) = 1240 + 3312 = 4552
    expect(federalIncomeTax(40000)).toBeCloseTo(4552, 1)
  })
  it('is zero at or below zero taxable', () => {
    expect(federalIncomeTax(0)).toBe(0)
  })
})

describe('ficaTax', () => {
  it('is 7.65% below the wage base', () => {
    expect(ficaTax(70000)).toBeCloseTo(70000 * 0.0765, 1)
  })
})

describe('stateTax', () => {
  it('is zero for no-income-tax states', () => {
    expect(stateTax(70000, 'TX')).toBe(0)
  })
  it('uses the state effective rate', () => {
    expect(stateTax(70000, 'IN')).toBeCloseTo(70000 * 0.0315, 1)
  })
})

describe('takeHome', () => {
  it('subtracts pretax 401k before federal/state tax', () => {
    const r = takeHome(
      { grossAnnual: 70000, state: 'TX', payFrequency: 'biweekly', matchPercent: 0, matchLimitPercent: 0 },
      7000,
    )
    expect(r.takeHomeAnnual).toBeLessThan(70000)
    expect(r.takeHomeAnnual).toBeGreaterThan(40000)
  })
})
