import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import Calculator from '@/components/Calculator'
import { TAX_YEAR } from '@/lib/calc/constants'
import { takeHome } from '@/lib/calc/tax'
import type { PaycheckInput } from '@/lib/calc/types'
import { BRAND, COPY } from '@/lib/copy'
import { allSalaryPages, getSalaryPage } from '@/lib/data/salary-pages'
import { statePageHref } from '@/lib/data/state-pages'

type SalaryStatePageProps = {
  params: Promise<{ amount: string; state: string }>
}

type SalaryBreakdown = {
  federalTax: number
  fica: number
  stateTax: number
  takeHomeAnnual: number
  takeHomeMonthly: number
  takeHomePerPaycheck: number
}

export const dynamicParams = false

export function generateStaticParams() {
  return allSalaryPages().map((page) => ({
    amount: String(page.salary),
    state: page.stateSlug,
  }))
}

export async function generateMetadata({ params }: SalaryStatePageProps): Promise<Metadata> {
  const { amount, state: stateSlug } = await params
  const page = getSalaryPage(amount, stateSlug)

  if (!page) {
    notFound()
  }

  const formattedSalary = formatMoney(page.salary)
  const title = `${formattedSalary} Salary After Taxes in ${page.stateName} ${TAX_YEAR}`

  return {
    title,
    description: `${formattedSalary} salary after taxes in ${page.stateName} for ${TAX_YEAR}, including estimated federal income tax, FICA, state tax, annual take-home pay, monthly pay, and biweekly paycheck.`,
    alternates: {
      canonical: page.url,
    },
  }
}

export default async function SalaryStatePage({ params }: SalaryStatePageProps) {
  const { amount, state: stateSlug } = await params
  const page = getSalaryPage(amount, stateSlug)

  if (!page) {
    notFound()
  }

  const breakdown = buildSalaryBreakdown(page.salary, page.stateCode)
  const formattedSalary = formatMoney(page.salary)
  const stateHref = statePageHref(page.stateCode)

  return (
    <div className="min-h-screen bg-zinc-50">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: BRAND.shareUrl },
          { name: 'Salary', item: `${BRAND.shareUrl}/salary` },
          { name: page.stateName, item: `${BRAND.shareUrl}${stateHref}` },
          { name: formattedSalary, item: page.url },
        ]}
      />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:items-start">
          <article className="space-y-8">
            <div className="space-y-3">
              <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                Updated {TAX_YEAR}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                {formattedSalary} salary after taxes in {page.stateName}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-zinc-700">
                A {formattedSalary} salary in {page.stateName} is estimated with the same take-home pay calculator used
                across this site. This page uses that exact salary and state to show federal income tax, FICA,
                state income tax, annual net pay, monthly net pay, and biweekly take-home per paycheck.
              </p>
            </div>

            <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-950">{formattedSalary} {page.stateName} tax breakdown</h2>
              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <BreakdownItem label="Federal income tax" value={formatMoney(breakdown.federalTax)} />
                <BreakdownItem label="FICA tax" value={formatMoney(breakdown.fica)} />
                <BreakdownItem label={`${page.stateName} state tax`} value={formatMoney(breakdown.stateTax)} />
                <BreakdownItem label="Net annual pay" value={formatMoney(breakdown.takeHomeAnnual)} />
                <BreakdownItem label="Net monthly pay" value={formatMoney(breakdown.takeHomeMonthly)} />
                <BreakdownItem label="Net biweekly paycheck" value={formatMoney(breakdown.takeHomePerPaycheck)} />
              </dl>
            </section>

            <section className="rounded-lg border border-indigo-200 bg-indigo-50 p-5">
              <h2 className="text-lg font-semibold text-indigo-950">Compare this estimate</h2>
              <p className="mt-2 text-sm leading-6 text-indigo-900">
                Review the broader{' '}
                <Link href={stateHref} className="font-medium underline underline-offset-2">
                  {page.stateName} take-home pay page
                </Link>{' '}
                for other salary examples, or use the{' '}
                <Link href="/#calculator" className="font-medium underline underline-offset-2">
                  calculator
                </Link>{' '}
                to adjust pay frequency and inputs.
              </p>
            </section>

            <section className="space-y-3 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-950">Before you use the estimate</h2>
              <p className="text-sm leading-6 text-zinc-700">
                {COPY.disclaimer} See the{' '}
                <Link href="/methodology" className="font-medium text-indigo-700 underline underline-offset-2">
                  methodology
                </Link>{' '}
                for tax assumptions, source notes, and update cadence.
              </p>
            </section>
          </article>

          <aside className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm lg:sticky lg:top-20">
            <h2 className="mb-4 text-lg font-semibold text-zinc-950">Run this paycheck</h2>
            <Calculator defaultState={page.stateCode} defaultSalary={page.salary} />
          </aside>
        </div>
      </main>
    </div>
  )
}

function BreakdownItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3">
      <dt className="text-xs font-semibold uppercase text-zinc-600">{label}</dt>
      <dd className="mt-1 text-xl font-bold text-zinc-950">{value}</dd>
    </div>
  )
}

function buildSalaryBreakdown(salary: number, stateCode: string): SalaryBreakdown {
  const input: PaycheckInput = {
    grossAnnual: salary,
    state: stateCode,
    payFrequency: 'biweekly',
    matchPercent: 0,
    matchLimitPercent: 0,
  }
  const result = takeHome(input, 0)

  return {
    ...result,
    takeHomeMonthly: result.takeHomeAnnual / 12,
    takeHomePerPaycheck: result.takeHomeAnnual / 26,
  }
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
