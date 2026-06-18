'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type { PaycheckResult, Product } from '@/lib/calc/types'
import { LAST_REVIEWED } from '@/lib/copy'
import { getStatePageByCode } from '@/lib/data/state-pages'
import { buildShareCardCopy, buildShareUrl, createShareCardFile } from '@/lib/share-card'
import Disclaimer from './Disclaimer'
import Disclosure from './Disclosure'
import ProductCard from './ProductCard'
import EmailCapture from './EmailCapture'
import HowWeCalculate from './HowWeCalculate'
import RankingMethodology from './RankingMethodology'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface ResultsProps {
  result: PaycheckResult
  products: Product[]
  shouldFocus?: boolean
  stateCode?: string
}

function usd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function useCountUpText(value: number, formatter: (amount: number) => string) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const previousValue = useRef(value)
  const reducedMotion = usePrefersReducedMotion()
  const formattedValue = formatter(value)

  useEffect(() => {
    const node = nodeRef.current

    if (!node) {
      return
    }

    if (reducedMotion || previousValue.current === value) {
      node.textContent = formatter(value)
      previousValue.current = value
      return
    }

    const animationNode = node
    const start = previousValue.current
    const difference = value - start
    const duration = 800
    const startTime = performance.now()
    let frameId = 0

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      animationNode.textContent = formatter(start + difference * eased)

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      } else {
        previousValue.current = value
        animationNode.textContent = formatter(value)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [formatter, reducedMotion, value])

  return { nodeRef, formattedValue }
}

function AnimatedMoney({ amount, suffix = '' }: { amount: number; suffix?: string }) {
  const formatter = useMemo(() => (value: number) => `${usd(value)}${suffix}`, [suffix])
  const { nodeRef, formattedValue } = useCountUpText(amount, formatter)

  return (
    <span
      ref={nodeRef}
      className={`tabular-nums ${suffix ? 'text-inherit' : ''}`}
      aria-hidden="true"
    >
      {formattedValue}
    </span>
  )
}

function buildLiveSummary(result: PaycheckResult): string {
  return `Take-home ${usd(result.takeHomePerCheck)} per check; ${usd(result.employerMatchDollars)} free 401k match.`
}

type StickyResultCtaProps = {
  hasResult: boolean
  isHidden: boolean
  targetId: string
}

export function StickyResultCta({ hasResult, isHidden, targetId }: StickyResultCtaProps) {
  if (!hasResult) {
    return null
  }

  function handleClick() {
    const target = document.getElementById(targetId)
    const input = target?.querySelector('input')
    target?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    if (input instanceof HTMLInputElement) {
      input.focus({ preventScroll: true })
    } else {
      target?.focus({ preventScroll: true })
    }
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 pt-2 shadow-lg backdrop-blur transition-transform duration-200 ease-out ${isHidden ? 'translate-y-full' : 'translate-y-0'}`}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}
      aria-hidden={isHidden}
    >
      <div className="mx-auto max-w-md">
        <button
          type="button"
          onClick={handleClick}
          disabled={isHidden}
          tabIndex={isHidden ? -1 : 0}
          className="flex min-h-12 w-full items-center justify-center rounded-md bg-indigo-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Get my full breakdown →
        </button>
      </div>
    </div>
  )
}

export default function Results({ result, products, shouldFocus = false, stateCode }: ResultsProps) {
  const {
    takeHomePerCheck,
    recommended401kPercent,
    employerMatchDollars,
    rothMonthly,
    budget,
  } = result
  const headingRef = useRef<HTMLHeadingElement>(null)
  const hasFocused = useRef(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isEmailOffscreen, setIsEmailOffscreen] = useState(false)
  const [liveSummary, setLiveSummary] = useState(() => buildLiveSummary(result))
  const shareCopy = buildShareCardCopy(result)
  const shareUrl = buildShareUrl()
  const statePage = stateCode ? getStatePageByCode(stateCode) : undefined

  useEffect(() => {
    if (!shouldFocus || hasFocused.current) {
      return
    }

    hasFocused.current = true
    headingRef.current?.focus({ preventScroll: true })
    headingRef.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' })
  }, [shouldFocus])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLiveSummary(buildLiveSummary(result))
    }, 400)

    return () => window.clearTimeout(timeoutId)
  }, [result])

  useEffect(() => {
    const emailCapture = document.getElementById('email-capture')

    if (!emailCapture || typeof IntersectionObserver === 'undefined') {
      setIsEmailOffscreen(false)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsEmailOffscreen(!entry.isIntersecting)
    }, { threshold: 0.1 })

    observer.observe(emailCapture)
    return () => observer.disconnect()
  }, [])

  async function handleShare() {
    setIsSharing(true)
    try {
      const file = await createShareCardFile(result)
      const shareData: ShareData = {
        files: [file],
        text: shareCopy.caption,
        url: shareUrl.toString(),
      }

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share(shareData)
        return
      }

      const downloadUrl = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      link.rel = 'noopener'
      document.body.append(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }
      throw error
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="mt-6 min-h-[720px] space-y-6 pb-28">
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {liveSummary}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
            {LAST_REVIEWED.label}
          </p>
          <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-xl font-bold tracking-tight text-zinc-950 outline-none">
            Your real paycheck
          </h2>
        </div>
        <button
          type="button"
          onClick={handleShare}
          disabled={isSharing}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:opacity-60"
        >
          {isSharing ? 'Preparing...' : 'Share my result'}
        </button>
      </div>

      {/* Take-home */}
      <div className="rounded-lg border border-zinc-300 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-600">Take-home per paycheck</p>
        <p className="mt-1 text-3xl font-bold text-zinc-950">
          <AnimatedMoney amount={takeHomePerCheck} />
        </p>
        {statePage && (
          <Link
            href={statePage.href}
            className="mt-3 inline-flex text-sm font-semibold text-indigo-700 underline underline-offset-2 hover:text-indigo-900"
          >
            See {statePage.name} take-home pay details
          </Link>
        )}
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

      <HowWeCalculate />

      {/* Email Capture */}
      <div id="email-capture" tabIndex={-1} className="outline-none">
        <EmailCapture />
      </div>

      {/* Product Cards */}
      {products.length > 0 && (
        <div className="space-y-4">
          <Disclosure />
          <RankingMethodology />
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-700">Recommended Accounts</p>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} isTopPick={index === 0} />
          ))}
        </div>
      )}

      {/* Disclosures */}
      <div className="border-t border-zinc-100 pt-4">
        <Disclaimer />
      </div>

      <StickyResultCta hasResult isHidden={isSharing || !isEmailOffscreen} targetId="email-capture" />
    </div>
  )
}
