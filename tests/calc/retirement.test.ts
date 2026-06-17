import { describe, it, expect } from 'vitest'
import { match401k, rothTarget } from '@/lib/calc/retirement'

describe('match401k', () => {
  it('recommends contributing up to the match limit', () => {
    // 100% match up to 4% of salary, salary 70000
    const r = match401k(70000, 100, 4)
    expect(r.recommendedPercent).toBe(4)
    expect(r.employeeDollars).toBeCloseTo(2800, 1)
    expect(r.employerDollars).toBeCloseTo(2800, 1)
  })
  it('halves employer dollars for a 50% match', () => {
    const r = match401k(70000, 50, 6)
    expect(r.employerDollars).toBeCloseTo(70000 * 0.06 * 0.5, 1)
  })
  it('recommends 0 when there is no match', () => {
    expect(match401k(70000, 0, 0).recommendedPercent).toBe(0)
  })
})

describe('rothTarget', () => {
  it('spreads the annual limit across 12 months', () => {
    const r = rothTarget()
    expect(r.monthly).toBeCloseTo(r.annual / 12, 2)
  })
})
