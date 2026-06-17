import {
  FEDERAL_BRACKETS_2026, STANDARD_DEDUCTION_2026, FICA,
  STATE_EFFECTIVE_RATES, DEFAULT_STATE_RATE,
} from './constants'
import type { PaycheckInput } from './types'

export function federalIncomeTax(taxable: number): number {
  if (taxable <= 0) return 0
  let tax = 0
  let lower = 0
  for (const b of FEDERAL_BRACKETS_2026) {
    if (taxable > lower) {
      const slice = Math.min(taxable, b.upTo) - lower
      tax += slice * b.rate
      lower = b.upTo
    } else break
  }
  return tax
}

export function ficaTax(gross: number): number {
  const ss = Math.min(gross, FICA.socialSecurityWageBase) * FICA.socialSecurityRate
  const medicare = gross * FICA.medicareRate
  return ss + medicare
}

export function stateTax(gross: number, state: string): number {
  const rate = STATE_EFFECTIVE_RATES[state] ?? DEFAULT_STATE_RATE
  return gross * rate
}

export function takeHome(input: PaycheckInput, pretax401k: number) {
  const { grossAnnual, state } = input
  const taxableForFederal = Math.max(0, grossAnnual - pretax401k - STANDARD_DEDUCTION_2026)
  const federal = federalIncomeTax(taxableForFederal)
  const fica = ficaTax(grossAnnual)
  const stateAmount = stateTax(grossAnnual - pretax401k, state)
  const takeHomeAnnual = grossAnnual - pretax401k - federal - fica - stateAmount
  return { federalTax: federal, fica, stateTax: stateAmount, takeHomeAnnual }
}
