'use client'

import { useState } from 'react'
import type { PaycheckInput, PaycheckResult, Product } from '@/lib/calc/types'
import { buildResult, rankProducts } from '@/lib/calc/recommend'
import Results from './Results'

const US_STATES = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'],
  ['CA', 'California'], ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
  ['FL', 'Florida'], ['GA', 'Georgia'], ['HI', 'Hawaii'], ['ID', 'Idaho'],
  ['IL', 'Illinois'], ['IN', 'Indiana'], ['IA', 'Iowa'], ['KS', 'Kansas'],
  ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'], ['MD', 'Maryland'],
  ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'], ['MS', 'Mississippi'],
  ['MO', 'Missouri'], ['MT', 'Montana'], ['NE', 'Nebraska'], ['NV', 'Nevada'],
  ['NH', 'New Hampshire'], ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['NY', 'New York'],
  ['NC', 'North Carolina'], ['ND', 'North Dakota'], ['OH', 'Ohio'], ['OK', 'Oklahoma'],
  ['OR', 'Oregon'], ['PA', 'Pennsylvania'], ['RI', 'Rhode Island'], ['SC', 'South Carolina'],
  ['SD', 'South Dakota'], ['TN', 'Tennessee'], ['TX', 'Texas'], ['UT', 'Utah'],
  ['VT', 'Vermont'], ['VA', 'Virginia'], ['WA', 'Washington'], ['WV', 'West Virginia'],
  ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
] as const

type CalcState =
  | { status: 'idle' }
  | { status: 'done'; result: PaycheckResult; products: Product[] }

export default function Calculator() {
  const [grossAnnual, setGrossAnnual] = useState<string>('70000')
  const [state, setState] = useState<string>('IN')
  const [payFrequency, setPayFrequency] = useState<PaycheckInput['payFrequency']>('biweekly')
  const [matchPercent, setMatchPercent] = useState<string>('100')
  const [matchLimitPercent, setMatchLimitPercent] = useState<string>('4')
  const [calc, setCalc] = useState<CalcState>({ status: 'idle' })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const input: PaycheckInput = {
      grossAnnual: parseFloat(grossAnnual) || 0,
      state,
      payFrequency,
      matchPercent: parseFloat(matchPercent) || 0,
      matchLimitPercent: parseFloat(matchLimitPercent) || 0,
    }
    const result = buildResult(input)
    const products = rankProducts(input)
    setCalc({ status: 'done', result, products })
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Gross Annual Salary */}
        <div>
          <label htmlFor="grossAnnual" className="block text-sm font-medium text-zinc-700 mb-1">
            Gross Annual Salary ($)
          </label>
          <input
            id="grossAnnual"
            type="number"
            min="0"
            step="1000"
            value={grossAnnual}
            onChange={(e) => setGrossAnnual(e.target.value)}
            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="70000"
            required
          />
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-zinc-700 mb-1">
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {US_STATES.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        {/* Pay Frequency */}
        <div>
          <label htmlFor="payFrequency" className="block text-sm font-medium text-zinc-700 mb-1">
            Pay Frequency
          </label>
          <select
            id="payFrequency"
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value as PaycheckInput['payFrequency'])}
            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="weekly">Weekly (52x/year)</option>
            <option value="biweekly">Bi-weekly (26x/year)</option>
            <option value="semimonthly">Semi-monthly (24x/year)</option>
            <option value="monthly">Monthly (12x/year)</option>
          </select>
        </div>

        {/* Employer Match Percent */}
        <div>
          <label htmlFor="matchPercent" className="block text-sm font-medium text-zinc-700 mb-1">
            Employer Match Rate (%)
          </label>
          <input
            id="matchPercent"
            type="number"
            min="0"
            max="200"
            step="10"
            value={matchPercent}
            onChange={(e) => setMatchPercent(e.target.value)}
            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="100"
          />
          <p className="mt-1 text-xs text-zinc-500">e.g. 100 means your employer matches 100% of what you contribute (dollar-for-dollar)</p>
        </div>

        {/* Match Limit Percent */}
        <div>
          <label htmlFor="matchLimitPercent" className="block text-sm font-medium text-zinc-700 mb-1">
            Match Limit (% of salary)
          </label>
          <input
            id="matchLimitPercent"
            type="number"
            min="0"
            max="100"
            step="1"
            value={matchLimitPercent}
            onChange={(e) => setMatchLimitPercent(e.target.value)}
            className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="4"
          />
          <p className="mt-1 text-xs text-zinc-500">e.g. 4 means employer matches up to 4% of your salary</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Calculate My Paycheck
        </button>
      </form>

      {calc.status === 'done' && (
        <Results result={calc.result} products={calc.products} />
      )}
    </div>
  )
}
