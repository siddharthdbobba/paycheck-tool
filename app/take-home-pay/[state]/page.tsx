import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import Calculator from '@/components/Calculator'
import { DEFAULT_STATE_RATE, STATE_EFFECTIVE_RATES, TAX_YEAR } from '@/lib/calc/constants'
import { takeHome } from '@/lib/calc/tax'
import type { PaycheckInput } from '@/lib/calc/types'
import { BRAND, COPY } from '@/lib/copy'
import { allStatePages, getStatePageBySlug } from '@/lib/data/state-pages'

type StateTakeHomePageProps = {
  params: Promise<{ state: string }>
}

type SalaryExample = {
  salary: number
  federalTax: number
  fica: number
  stateTax: number
  takeHomeAnnual: number
  takeHomeMonthly: number
}

const REPRESENTATIVE_SALARIES = [50_000, 65_000, 80_000] as const

export function generateStaticParams() {
  return allStatePages().map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: StateTakeHomePageProps): Promise<Metadata> {
  const { state: slug } = await params
  const state = getStatePageBySlug(slug)

  if (!state) {
    notFound()
  }

  const title = `Take-Home Pay in ${state.name} (${TAX_YEAR}) - New Grad Calculator`

  return {
    title,
    description: `Estimate ${state.name} take-home pay for new grads with computed federal, FICA, state tax, and net pay examples for ${TAX_YEAR}.`,
    alternates: {
      canonical: state.url,
    },
  }
}

export default async function StateTakeHomePage({ params }: StateTakeHomePageProps) {
  const { state: slug } = await params
  const state = getStatePageBySlug(slug)

  if (!state) {
    notFound()
  }

  const examples = REPRESENTATIVE_SALARIES.map((salary) => buildSalaryExample(salary, state.code))
  const stateRate = STATE_EFFECTIVE_RATES[state.code] ?? DEFAULT_STATE_RATE
  const taxNote = stateRate === 0
    ? `${state.name} has no state income tax in this estimate, so the state income tax line is $0.`
    : `${state.name} uses an estimated effective state income tax rate of ${formatPercent(stateRate)} in this estimate.`

  return (
    <div className="min-h-screen bg-zinc-50">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: BRAND.shareUrl },
          { name: 'Take-home pay', item: `${BRAND.shareUrl}/take-home-pay` },
          { name: state.name, item: state.url },
        ]}
      />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,420px)] lg:items-start">
          <article className="space-y-8">
            <div className="space-y-3">
              <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                {TAX_YEAR} estimate
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Take-home pay in {state.name}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-zinc-700">
                These examples call the same calculator used on this site and show estimated federal income tax,
                FICA, {state.name} state income tax, and annual net pay for common early-career salaries.
              </p>
            </div>

            <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-950">Representative {state.name} paycheck estimates</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Assumes single filer, no pre-tax 401k withholding in these examples, and biweekly pay context.
              </p>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[620px] text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50">
                      <th scope="col" className="px-3 py-3 text-left font-semibold text-zinc-700">Gross salary</th>
                      <th scope="col" className="px-3 py-3 text-left font-semibold text-zinc-700">Federal</th>
                      <th scope="col" className="px-3 py-3 text-left font-semibold text-zinc-700">FICA</th>
                      <th scope="col" className="px-3 py-3 text-left font-semibold text-zinc-700">State</th>
                      <th scope="col" className="px-3 py-3 text-left font-semibold text-zinc-700">Net annual</th>
                      <th scope="col" className="px-3 py-3 text-left font-semibold text-zinc-700">Net monthly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {examples.map((example) => (
                      <tr key={example.salary} className="even:bg-zinc-50">
                        <th scope="row" className="px-3 py-3 text-left font-semibold text-zinc-950">
                          {formatMoney(example.salary)}
                        </th>
                        <td className="px-3 py-3 text-zinc-800">{formatMoney(example.federalTax)}</td>
                        <td className="px-3 py-3 text-zinc-800">{formatMoney(example.fica)}</td>
                        <td className="px-3 py-3 text-zinc-800">{formatMoney(example.stateTax)}</td>
                        <td className="px-3 py-3 font-semibold text-zinc-950">{formatMoney(example.takeHomeAnnual)}</td>
                        <td className="px-3 py-3 text-zinc-800">{formatMoney(example.takeHomeMonthly)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-lg border border-indigo-200 bg-indigo-50 p-5">
              <h2 className="text-lg font-semibold text-indigo-950">State tax note</h2>
              <p className="mt-2 text-sm leading-6 text-indigo-900">{taxNote}</p>
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
            <h2 className="mb-4 text-lg font-semibold text-zinc-950">Run a {state.name} paycheck</h2>
            <Calculator defaultState={state.code} />
          </aside>
        </div>
      </main>
    </div>
  )
}

function buildSalaryExample(salary: number, stateCode: string): SalaryExample {
  const input: PaycheckInput = {
    grossAnnual: salary,
    state: stateCode,
    payFrequency: 'biweekly',
    matchPercent: 100,
    matchLimitPercent: 4,
  }
  const result = takeHome(input, 0)

  return {
    salary,
    ...result,
    takeHomeMonthly: result.takeHomeAnnual / 12,
  }
}

function formatMoney(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value)
}
