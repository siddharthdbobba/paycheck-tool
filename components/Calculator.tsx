'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { PaycheckInput } from '@/lib/calc/types'
import { buildResult, rankProducts } from '@/lib/calc/recommend'
import Results from './Results'
import { track } from '@/lib/analytics'
import { US_STATES } from '@/lib/data/states'

type MatchPreset = 'typical-100-4' | 'half-50-6' | 'none' | 'custom'

type CalculatorProps = {
  defaultState?: string
}

const MATCH_PRESETS: Record<Exclude<MatchPreset, 'custom'>, { matchPercent: number; matchLimitPercent: number }> = {
  'typical-100-4': { matchPercent: 100, matchLimitPercent: 4 },
  'half-50-6': { matchPercent: 50, matchLimitPercent: 6 },
  none: { matchPercent: 0, matchLimitPercent: 0 },
}

function parseMoney(value: string): number {
  const normalized = value.replace(/[$,\s]/g, '')
  return Number.parseFloat(normalized) || 0
}

export default function Calculator({ defaultState = 'IN' }: CalculatorProps) {
  const [grossAnnual, setGrossAnnual] = useState<string>('70000')
  const [state, setState] = useState<string>(defaultState)
  const [payFrequency, setPayFrequency] = useState<PaycheckInput['payFrequency']>('biweekly')
  const [matchPreset, setMatchPreset] = useState<MatchPreset>('typical-100-4')
  const [matchPercent, setMatchPercent] = useState<string>('100')
  const [matchLimitPercent, setMatchLimitPercent] = useState<string>('4')
  const [hasInteracted, setHasInteracted] = useState(false)
  const hasTracked = useRef(false)

  const input = useMemo<PaycheckInput>(() => {
    const preset = matchPreset === 'custom' ? null : MATCH_PRESETS[matchPreset]

    return {
      grossAnnual: parseMoney(grossAnnual),
      state,
      payFrequency,
      matchPercent: preset ? preset.matchPercent : Number.parseFloat(matchPercent) || 0,
      matchLimitPercent: preset ? preset.matchLimitPercent : Number.parseFloat(matchLimitPercent) || 0,
    }
  }, [grossAnnual, matchLimitPercent, matchPercent, matchPreset, payFrequency, state])

  const [debouncedInput, setDebouncedInput] = useState<PaycheckInput>(input)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedInput(input)
    }, 250)

    return () => window.clearTimeout(timeoutId)
  }, [input])

  const calculationInput = input.grossAnnual > 0 ? debouncedInput : input
  const result = useMemo(() => (calculationInput.grossAnnual > 0 ? buildResult(calculationInput) : null), [calculationInput])
  const products = useMemo(() => (calculationInput.grossAnnual > 0 ? rankProducts(calculationInput) : []), [calculationInput])

  useEffect(() => {
    if (result && !hasTracked.current) {
      hasTracked.current = true
      track('calc_completed', { salary: debouncedInput.grossAnnual, state: debouncedInput.state })
    }
  }, [debouncedInput.grossAnnual, debouncedInput.state, result])

  function markInteracted() {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <form className="space-y-4" aria-label="Paycheck calculator">
        {/* Gross Annual Salary */}
        <div>
          <label htmlFor="grossAnnual" className="mb-1 block text-sm font-medium text-zinc-800">
            Gross Annual Salary ($)
          </label>
          <input
            id="grossAnnual"
            type="text"
            inputMode="decimal"
            autoFocus
            value={grossAnnual}
            onChange={(e) => {
              markInteracted()
              setGrossAnnual(e.target.value)
            }}
            className="block min-h-12 w-full rounded-md border border-zinc-400 px-3 py-2 text-base text-zinc-900 shadow-sm placeholder:text-zinc-500 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            placeholder="70000"
            required
          />
          <p className="mt-1 text-xs leading-5 text-zinc-600">
            Runs in your browser. We never see or store your salary.
          </p>
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="mb-1 block text-sm font-medium text-zinc-800">
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => {
              markInteracted()
              setState(e.target.value)
            }}
            className="block min-h-12 w-full rounded-md border border-zinc-400 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            {US_STATES.map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        {/* Pay Frequency */}
        <div>
          <label htmlFor="payFrequency" className="mb-1 block text-sm font-medium text-zinc-800">
            Pay Frequency
          </label>
          <select
            id="payFrequency"
            value={payFrequency}
            onChange={(e) => {
              markInteracted()
              setPayFrequency(e.target.value as PaycheckInput['payFrequency'])
            }}
            className="block min-h-12 w-full rounded-md border border-zinc-400 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            <option value="weekly">Weekly (52x/year)</option>
            <option value="biweekly">Bi-weekly (26x/year)</option>
            <option value="semimonthly">Semi-monthly (24x/year)</option>
            <option value="monthly">Monthly (12x/year)</option>
          </select>
        </div>

        <div>
          <label htmlFor="matchPreset" className="mb-1 block text-sm font-medium text-zinc-800">
            401k match
          </label>
          <select
            id="matchPreset"
            value={matchPreset}
            onChange={(e) => {
              markInteracted()
              setMatchPreset(e.target.value as MatchPreset)
            }}
            className="block min-h-12 w-full rounded-md border border-zinc-400 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
          >
            <option value="typical-100-4">Typical: 100% up to 4%</option>
            <option value="half-50-6">50% up to 6%</option>
            <option value="none">No match</option>
            <option value="custom">Custom</option>
          </select>
          <p className="mt-1 text-xs text-zinc-600">Choose the closest employer match. You can customize it if your offer letter lists different numbers.</p>
        </div>

        {matchPreset === 'custom' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="matchPercent" className="mb-1 block text-sm font-medium text-zinc-800">
                Employer Match Rate (%)
              </label>
              <input
                id="matchPercent"
                type="text"
                inputMode="decimal"
                value={matchPercent}
                onChange={(e) => {
                  markInteracted()
                  setMatchPercent(e.target.value)
                }}
                className="block min-h-12 w-full rounded-md border border-zinc-400 px-3 py-2 text-base text-zinc-900 shadow-sm placeholder:text-zinc-500 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                placeholder="100"
              />
            </div>
            <div>
              <label htmlFor="matchLimitPercent" className="mb-1 block text-sm font-medium text-zinc-800">
                Match Limit (% of salary)
              </label>
              <input
                id="matchLimitPercent"
                type="text"
                inputMode="decimal"
                value={matchLimitPercent}
                onChange={(e) => {
                  markInteracted()
                  setMatchLimitPercent(e.target.value)
                }}
                className="block min-h-12 w-full rounded-md border border-zinc-400 px-3 py-2 text-base text-zinc-900 shadow-sm placeholder:text-zinc-500 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                placeholder="4"
              />
            </div>
          </div>
        )}
      </form>

      <div className="min-h-[720px] pb-28">
        {result ? (
          <Results result={result} products={products} shouldFocus={hasInteracted} stateCode={calculationInput.state} />
        ) : (
          <div role="status" aria-live="polite" aria-atomic="true" className="mt-6 flex min-h-[720px] items-start justify-center rounded-lg border border-dashed border-zinc-300 bg-white px-4 py-12 text-center">
            <p className="text-sm font-medium text-zinc-700">Enter your salary to see your numbers.</p>
          </div>
        )}
      </div>
    </div>
  )
}
