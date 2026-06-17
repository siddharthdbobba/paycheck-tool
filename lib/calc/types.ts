export interface PaycheckInput {
  grossAnnual: number
  state: string
  payFrequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly'
  matchPercent: number
  matchLimitPercent: number
}

export interface PaycheckResult {
  takeHomeAnnual: number
  takeHomePerCheck: number
  federalTax: number
  fica: number
  stateTax: number
  recommended401kPercent: number
  employerMatchDollars: number
  rothMonthly: number
  budget: {
    needs: number
    wants: number
    savings: number
  }
}

export interface Product {
  id: string
  category: 'savings' | 'brokerage' | 'card' | 'budgeting' | 'investing' | 'insurance'
  name: string
  blurb: string
  highlights: string[]
  affiliateUrl: string
  payoutNote: string
}
