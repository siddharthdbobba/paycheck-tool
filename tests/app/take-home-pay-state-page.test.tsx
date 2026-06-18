import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StateTakeHomePage, {
  generateMetadata,
  generateStaticParams,
} from '@/app/take-home-pay/[state]/page'
import { STATE_EFFECTIVE_RATES } from '@/lib/calc/constants'
import { takeHome } from '@/lib/calc/tax'
import { US_STATES } from '@/lib/data/states'

describe('/take-home-pay/[state]', () => {
  it('generates one static route for each state', () => {
    const params = generateStaticParams()

    expect(params).toHaveLength(50)
    expect(params).toEqual(US_STATES.map(([code]) => ({ state: code.toLowerCase() })))
  })

  it('generates unique state metadata with a self canonical', async () => {
    await expect(
      generateMetadata({ params: Promise.resolve({ state: 'ca' }) }),
    ).resolves.toMatchObject({
      title: 'Take-Home Pay in California (2026) - New Grad Calculator',
      description: expect.stringContaining('California'),
      alternates: {
        canonical: 'https://paycheck-tool-faceless1.vercel.app/take-home-pay/ca',
      },
    })
  })

  it('renders computed take-home numbers and the embedded state-defaulted calculator', async () => {
    const expected = takeHome(
      {
        grossAnnual: 65_000,
        state: 'TX',
        payFrequency: 'biweekly',
        matchPercent: 100,
        matchLimitPercent: 4,
      },
      0,
    )

    render(await StateTakeHomePage({ params: Promise.resolve({ state: 'tx' }) }))

    expect(screen.getByRole('heading', { level: 1, name: /take-home pay in texas/i })).toBeTruthy()
    expect(screen.getByText(/Texas has no state income tax in this estimate/i)).toBeTruthy()
    expect(screen.getAllByText(formatMoney(expected.stateTax)).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(formatMoney(expected.takeHomeAnnual))).toBeTruthy()
    expect((screen.getByLabelText(/^state$/i) as HTMLSelectElement).value).toBe('TX')
    expect(screen.getByRole('link', { name: /methodology/i }).getAttribute('href')).toBe('/methodology')
  })

  it('marks states with positive effective rates as estimated state income tax pages', async () => {
    render(await StateTakeHomePage({ params: Promise.resolve({ state: 'in' }) }))

    expect(STATE_EFFECTIVE_RATES.IN).toBeGreaterThan(0)
    expect(screen.getByText(/Indiana uses an estimated effective state income tax rate/i)).toBeTruthy()
  })
})

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
