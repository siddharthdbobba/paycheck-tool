import { describe, it, expect } from 'vitest'
import { budgetSplit } from '@/lib/calc/budget'

describe('budgetSplit', () => {
  it('splits 50/30/20', () => {
    const b = budgetSplit(4000)
    expect(b.needs).toBe(2000)
    expect(b.wants).toBe(1200)
    expect(b.savings).toBe(800)
  })
})
