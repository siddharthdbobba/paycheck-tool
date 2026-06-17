'use client'

import { useEffect, useRef, useState } from 'react'
import type { PaycheckResult, Product } from '@/lib/calc/types'
import Disclaimer from './Disclaimer'
import Disclosure from './Disclosure'
import ProductCard from './ProductCard'
import EmailCapture from './EmailCapture'

interface ResultsProps {
  result: PaycheckResult
  products: Product[]
  shouldFocus?: boolean
}

function usd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (!window.matchMedia) {
      return
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)

    function handleChange(event: MediaQueryListEvent) {
      setReduced(event.matches)
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  return reduced
}

function useCountUp(value: number): number {
  const [displayValue, setDisplayValue] = useState(value)
  const previousValue = useRef(value)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion || previousValue.current === value) {
      setDisplayValue(value)
      previousValue.current = value
      return
    }

    const start = previousValue.current
    const difference = value - start
    const duration = 800
    const startTime = performance.now()
    let frameId = 0

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplayValue(start + difference * eased)

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        previousValue.current = value
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [reducedMotion, value])

  return displayValue
}

function AnimatedMoney({ amount, suffix = '' }: { amount: number; suffix?: string }) {
  return (
    <span className="tabular-nums">
      {usd(useCountUp(amount))}
      {suffix && <span className="text-base font-normal text-zinc-600">{suffix}</span>}
    </span>
  )
}

export default function Results({ result, products, shouldFocus = false }: ResultsProps) {
  const {
    takeHomePerCheck,
    recommended401kPercent,
    employerMatchDollars,
    rothMonthly,
    budget,
  } = result
  const headingRef = useRef<HTMLHeadingElement>(null)
  const hasFocused = useRef(false)

  useEffect(() => {
    if (!shouldFocus || hasFocused.current) {
      return
    }

    hasFocused.current = true
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })
  }, [shouldFocus])

  return (
    <div role="status" aria-live="polite" aria-atomic="true" className="mt-6 min-h-[640px] space-y-6">
      <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold tracking-tight text-zinc-950 outline-none">
        Your real paycheck
      </h2>

      {/* Take-home */}
      <div className="rounded-lg border border-zinc-300 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-600">Take-home per paycheck</p>
        <p className="mt-1 text-3xl font-bold text-zinc-950">
          <AnimatedMoney amount={takeHomePerCheck} />
        </p>
      </div>

      {/* 401k match */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">Free money</p>
        <p className="mt-1 text-4xl font-black tracking-tight text-emerald-950">
          <AnimatedMoney amount={employerMatchDollars} />
        </p>
        <p className="mt-2 text-sm font-medium text-emerald-900">
          Contribute {recommended401kPercent}% so you do not leave your employer match on the table.
        </p>
      </div>

      {/* Roth IRA */}
      <div className="rounded-lg border border-zinc-300 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-600">Roth IRA monthly target</p>
        <p className="mt-1 text-2xl font-bold text-zinc-950">
          <AnimatedMoney amount={rothMonthly} suffix="/mo" />
        </p>
      </div>

      {/* 50/30/20 Budget */}
      <div className="rounded-lg border border-zinc-300 bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-zinc-600">Monthly budget (50/30/20)</p>
        <div className="flex h-3 overflow-hidden rounded-full" aria-hidden="true">
          <div className="w-[50%] bg-emerald-500" />
          <div className="w-[30%] bg-amber-400" />
          <div className="w-[20%] bg-indigo-500" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />Needs (50%)</span>
            <span className="font-semibold text-zinc-950"><AnimatedMoney amount={budget.needs} /></span>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700"><span className="h-2.5 w-2.5 rounded-full bg-amber-400" />Wants (30%)</span>
            <span className="font-semibold text-zinc-950"><AnimatedMoney amount={budget.wants} /></span>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700"><span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />Savings (20%)</span>
            <span className="font-semibold text-zinc-950"><AnimatedMoney amount={budget.savings} /></span>
          </div>
        </div>
      </div>

      {/* Email Capture */}
      <EmailCapture />

      {/* Product Cards */}
      {products.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-700">Recommended Accounts</p>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Disclosures */}
      <div className="border-t border-zinc-100 pt-4">
        <Disclaimer />
        <Disclosure />
      </div>
    </div>
  )
}
