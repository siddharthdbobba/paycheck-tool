export const TAX_YEAR = 2026

// Single filer. Verify annually at irs.gov before launch.
export const STANDARD_DEDUCTION_2026 = 15000

export const FEDERAL_BRACKETS_2026 = [
  { upTo: 11925, rate: 0.10 },
  { upTo: 48475, rate: 0.12 },
  { upTo: 103350, rate: 0.22 },
  { upTo: 197300, rate: 0.24 },
  { upTo: 250525, rate: 0.32 },
  { upTo: 626350, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
] as const

export const FICA = {
  socialSecurityRate: 0.062,
  socialSecurityWageBase: 176100, // verify annually (SSA)
  medicareRate: 0.0145,
} as const

export const ROTH_LIMIT_2026 = 7000 // under-50 limit, verify annually

// Approximate effective state income tax rates for an estimate only.
// 0 for no-income-tax states. Verify/expand as needed.
export const STATE_EFFECTIVE_RATES: Record<string, number> = {
  AK: 0, FL: 0, NV: 0, NH: 0, SD: 0, TN: 0, TX: 0, WA: 0, WY: 0,
  IN: 0.0315, IL: 0.0495, CO: 0.044, AZ: 0.025, MI: 0.0425,
  CA: 0.06, NY: 0.055, NC: 0.045, PA: 0.0307, OH: 0.035, GA: 0.0539,
  // default applied in code for states not listed
}
export const DEFAULT_STATE_RATE = 0.05
