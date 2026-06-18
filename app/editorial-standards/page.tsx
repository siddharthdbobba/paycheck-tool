import type { Metadata } from 'next'
import { LAST_REVIEWED } from '@/lib/copy'

export const metadata: Metadata = {
  title: 'Editorial Standards — Paycheck Tool',
  description:
    'The sourcing, affiliate, testimonial, and update standards behind Paycheck Tool content.',
}

export default function EditorialStandardsPage() {
  return (
    <main className="bg-zinc-50 px-4 py-10">
      <article className="mx-auto max-w-3xl rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
          {LAST_REVIEWED.label}
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-950">Editorial Standards</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Paycheck Tool is written to help new grads make clearer first-job money decisions. These
          standards keep the content practical, sourced, and independent.
        </p>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">Sourcing policy</h2>
          <p className="text-sm leading-6 text-zinc-600">
            Tax and payroll explanations use primary public sources when available, including the IRS
            and Social Security Administration. Product details are checked against provider pages and
            reviewed for fees, eligibility, APY or rewards value, and beginner fit.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">No fabricated testimonials</h2>
          <p className="text-sm leading-6 text-zinc-600">
            We do not publish fabricated testimonials, invented user stories, or fake expert quotes.
            If a testimonial appears in the future, it will be based on a real source and labeled clearly.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">Affiliate independence</h2>
          <p className="text-sm leading-6 text-zinc-600">
            Some links may earn compensation, but compensation never changes rankings. Products are
            ordered by fit for the comparison, not by payout.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">Review and update cadence</h2>
          <p className="text-sm leading-6 text-zinc-600">
            Calculator assumptions and product rankings are reviewed when tax-year data changes,
            provider terms change, or a scheduled content review is due.
          </p>
        </section>
      </article>
    </main>
  )
}
