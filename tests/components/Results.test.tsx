import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Results from '@/components/Results'
import type { PaycheckResult, Product } from '@/lib/calc/types'
import { COPY } from '@/lib/copy'

const sampleResult: PaycheckResult = {
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

const sampleProducts: Product[] = [
  {
    id: 'savings-sofi',
    category: 'savings',
    name: 'SoFi Checking & Savings',
    blurb: 'High-yield savings with no account fees.',
    highlights: ['Competitive APY', 'No monthly fee'],
    affiliateUrl: 'https://example.com/sofi',
    payoutNote: '~$20-75 funded',
  },
  {
    id: 'brokerage-fidelity',
    category: 'brokerage',
    name: 'Fidelity Roth IRA',
    blurb: 'Open a Roth IRA with no minimum and low-cost index funds.',
    highlights: ['No account fees', 'Great index funds'],
    affiliateUrl: 'https://example.com/fidelity',
    payoutNote: 'varies',
  },
]

describe('Results', () => {
  it('renders the disclaimer text', () => {
    render(<Results result={sampleResult} products={sampleProducts} />)
    expect(screen.getByText(COPY.disclaimer)).toBeTruthy()
  })

  it('renders a product name', () => {
    render(<Results result={sampleResult} products={sampleProducts} />)
    expect(screen.getByText('SoFi Checking & Savings')).toBeTruthy()
  })

  it('renders a formatted dollar figure for take-home per check', () => {
    render(<Results result={sampleResult} products={sampleProducts} />)
    // $2,000 formatted as USD with no cents
    expect(screen.getByText('$2,000')).toBeTruthy()
  })

  it('highlights the employer match and places email capture under the budget', () => {
    render(<Results result={sampleResult} products={sampleProducts} />)

    const status = screen.getByRole('status')
    expect(status.getAttribute('aria-live')).toBe('polite')
    expect(screen.getByText(/free money/i)).toBeTruthy()
    expect(screen.getByText('$2,800')).toBeTruthy()
    expect(screen.getByText(/email me my plan/i)).toBeTruthy()
    expect(screen.getByPlaceholderText('you@email.com')).toBeTruthy()
  })

  it('renders the disclosure text', () => {
    render(<Results result={sampleResult} products={sampleProducts} />)
    expect(screen.getByText(COPY.disclosure)).toBeTruthy()
  })
})
