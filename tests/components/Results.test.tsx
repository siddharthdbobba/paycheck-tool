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
    rating: 4.8,
    bestForTag: 'starter emergency funds',
    headlineStat: { value: '4.0% APY', label: 'high-yield savings' },
    ctaLabel: 'Open my savings account',
    reason: 'Because you net about $4,300/mo, this fits a starter emergency fund.',
  },
  {
    id: 'brokerage-fidelity',
    category: 'brokerage',
    name: 'Fidelity Roth IRA',
    blurb: 'Open a Roth IRA with no minimum and low-cost index funds.',
    highlights: ['No account fees', 'Great index funds'],
    affiliateUrl: 'https://example.com/fidelity',
    payoutNote: 'varies',
    rating: 4.9,
    bestForTag: 'first Roth IRA',
    headlineStat: { value: '$0', label: 'account minimum' },
    ctaLabel: 'Start my Roth IRA',
    reason: 'Your employer matches, so this is a strong next retirement step.',
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

  it('renders disclosure above recommendations and never shows internal payout notes', () => {
    render(<Results result={sampleResult} products={sampleProducts} />)
    const disclosure = screen.getByText(COPY.disclosure)
    const recommendations = screen.getByText(/recommended accounts/i)

    expect(disclosure.compareDocumentPosition(recommendations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(screen.queryByText('~$20-75 funded')).toBeNull()
    expect(screen.queryByText('varies')).toBeNull()
  })

  it('renders conversion and trust details for recommended products', () => {
    render(<Results result={sampleResult} products={sampleProducts} />)

    expect(screen.getByText('4.0% APY')).toBeTruthy()
    expect(screen.getByText(/4\.8/)).toBeTruthy()
    expect(screen.getByText(/best for starter emergency funds/i)).toBeTruthy()
    expect(screen.getByText(/#1 pick/i)).toBeTruthy()
    expect(screen.getByRole('link', { name: /open my savings account/i }).getAttribute('href')).toBe('/go/savings-sofi')
    expect(screen.getByText(sampleProducts[0].reason ?? '')).toBeTruthy()
    expect(screen.getByText(/how we calculate/i)).toBeTruthy()
    expect(screen.getByText(/2026 tax year/i)).toBeTruthy()
    expect(screen.getByText(/^IRS:/i)).toBeTruthy()
    expect(screen.getByText(/^SSA:/i)).toBeTruthy()
  })
})
