import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SalaryStatePage, { generateStaticParams } from '@/app/salary/[amount]/[state]/page'
import { takeHome } from '@/lib/calc/tax'
import { SALARY_PAGE_SALARIES, SALARY_PAGE_STATE_CODES } from '@/lib/data/salary-pages'

describe('/salary/[amount]/[state]', () => {
  it('generates only the capped salary-by-state matrix', () => {
    const params = generateStaticParams()

    expect(params).toHaveLength(SALARY_PAGE_SALARIES.length * SALARY_PAGE_STATE_CODES.length)
    expect(params).toContainEqual({ amount: '65000', state: 'ca' })
    expect(params).toContainEqual({ amount: '85000', state: 'wa' })
    expect(params).not.toContainEqual({ amount: '95000', state: 'ca' })
    expect(params).not.toContainEqual({ amount: '65000', state: 'in' })
  })

  it('renders computed take-home numbers for the exact salary and state', async () => {
    const expected = takeHome(
      {
        grossAnnual: 65_000,
        state: 'CA',
        payFrequency: 'biweekly',
        matchPercent: 0,
        matchLimitPercent: 0,
      },
      0,
    )

    render(await SalaryStatePage({ params: Promise.resolve({ amount: '65000', state: 'ca' }) }))

    expect(screen.getByRole('heading', { level: 1, name: /\$65,000 salary after taxes in california/i })).toBeTruthy()
    expect(screen.getByText(formatMoney(expected.federalTax))).toBeTruthy()
    expect(screen.getByText(formatMoney(expected.fica))).toBeTruthy()
    expect(screen.getByText(formatMoney(expected.stateTax))).toBeTruthy()
    expect(screen.getByText(formatMoney(expected.takeHomeAnnual))).toBeTruthy()
    expect(screen.getByText(formatMoney(expected.takeHomeAnnual / 12))).toBeTruthy()
    expect(screen.getByText(formatMoney(expected.takeHomeAnnual / 26))).toBeTruthy()
    expect((screen.getByLabelText(/gross annual salary/i) as HTMLInputElement).value).toBe('65000')
    expect((screen.getByLabelText(/^state$/i) as HTMLSelectElement).value).toBe('CA')
    expect(screen.getByRole('link', { name: /california take-home pay page/i }).getAttribute('href')).toBe('/take-home-pay/ca')
    expect(screen.getByRole('link', { name: /^calculator$/i }).getAttribute('href')).toBe('/#calculator')
    expect(screen.getByRole('link', { name: /methodology/i }).getAttribute('href')).toBe('/methodology')
  })
})

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
