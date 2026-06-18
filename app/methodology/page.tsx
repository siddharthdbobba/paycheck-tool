import type { Metadata } from 'next'
import { BRAND, LAST_REVIEWED } from '@/lib/copy'

export const metadata: Metadata = {
  title: 'Methodology — Paycheck Tool',
  description:
    'How Paycheck Tool estimates first-paycheck take-home pay and ranks beginner financial products.',
}

const organization = {
  '@type': 'Organization',
  name: 'Paycheck Tool',
  url: BRAND.shareUrl,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Paycheck Tool Methodology',
  description: metadata.description,
  url: `${BRAND.shareUrl}/methodology`,
  dateModified: LAST_REVIEWED.dateModified,
  author: organization,
  publisher: organization,
}

export default function MethodologyPage() {
  return (
    <main className="bg-zinc-50 px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <article className="mx-auto max-w-3xl rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
          {LAST_REVIEWED.label}
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">Methodology</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Paycheck Tool estimates a first paycheck for the 2026 tax year using public tax rules,
          payroll-tax rates, and the inputs you provide. The goal is a useful planning estimate,
          not a payroll-system replacement.
        </p>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">How the calculator computes take-home pay</h2>
          <p className="text-sm leading-6 text-zinc-600">
            The calculator annualizes gross pay, subtracts the federal standard deduction, then applies
            IRS federal income-tax brackets for the 2026 tax year. It also estimates FICA using the
            employee Social Security rate of 6.2% and Medicare rate of 1.45%.
          </p>
          <ul className="space-y-2 text-sm leading-6 text-zinc-600">
            <li>
              Federal bracket and standard deduction references come from the{' '}
              <a
                href="https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026"
                rel="noopener"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                IRS tax inflation adjustments
              </a>
              .
            </li>
            <li>
              Payroll-tax rates are checked against the{' '}
              <a
                href="https://www.ssa.gov/oact/progdata/taxRates.html"
                rel="noopener"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                Social Security Administration tax-rate table
              </a>
              .
            </li>
          </ul>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">Estimates, not advice</h2>
          <p className="text-sm leading-6 text-zinc-600">
            Results are estimates, not advice. Actual paychecks can differ because of state and local
            rules, pre-tax benefits, payroll calendars, bonuses, filing status details, and employer
            withholding choices. Consult a tax, financial, or benefits professional before making
            decisions that materially affect your money.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">How product rankings work</h2>
          <p className="text-sm leading-6 text-zinc-600">
            Product comparisons are ranked for new grads using objective criteria: fees, eligibility,
            APY or rewards value where relevant, beginner usability, and the stated "best for" fit.
            Affiliate compensation never changes the order of rankings.
          </p>
        </section>
      </article>
    </main>
  )
}
