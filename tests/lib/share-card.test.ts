import { describe, expect, it } from 'vitest'
import type { PaycheckResult } from '@/lib/calc/types'
import { BRAND } from '@/lib/copy'
import { buildShareCardCopy, buildShareUrl } from '@/lib/share-card'

const baseResult: PaycheckResult = {
  takeHomeAnnual: 52_000,
  takeHomePerCheck: 2_000,
  federalTax: 8_000,
  fica: 5_355,
  stateTax: 2_800,
  recommended401kPercent: 4,
  employerMatchDollars: 2_800,
  rothMonthly: 583,
  budget: {
    needs: 2_166,
    wants: 1_300,
    savings: 866,
  },
}

describe('share-card copy', () => {
  it('builds the employer-match hero and supporting result lines', () => {
    const copy = buildShareCardCopy(baseResult)

    expect(copy.hero).toBe('I found $2,800/yr in free 401k match')
    expect(copy.supporting).toEqual([
      'Take-home: $2,000/check',
      'Roth target: $583/mo',
      '50/30/20: $2,166 needs • $1,300 wants • $866 savings',
    ])
    expect(copy.footer).toBe(`${BRAND.handle} • ${BRAND.shareUrl}`)
    expect(copy.caption).toBe('Found out how much of my first paycheck I actually keep')
  })

  it('falls back to take-home when employer match is zero', () => {
    const copy = buildShareCardCopy({ ...baseResult, employerMatchDollars: 0 })

    expect(copy.hero).toBe('My real take-home: $2,000/check')
  })

  it('uses leaving-on-the-table framing only when the user is not contributing', () => {
    const copy = buildShareCardCopy({ ...baseResult, recommended401kPercent: 0 })

    expect(copy.hero).toBe("I'm leaving $2,800/yr in free 401k match on the table")
  })

  it('adds the Instagram-share UTM source to the share URL', () => {
    expect(buildShareUrl().toString()).toBe(`${BRAND.shareUrl}/?utm_source=ig_share`)
  })
})
