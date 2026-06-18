import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import { BRAND, LAST_REVIEWED } from '@/lib/copy'
import { allGuides } from '@/lib/data/guides'

export const metadata: Metadata = {
  title: 'New Grad Money Guides (2026)',
  description:
    'Plain-English guides for first paychecks, 401(k) matches, Roth vs traditional choices, savings rates, and student-loan tradeoffs.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'New Grad Money Guides (2026)',
    description:
      'Plain-English guides for first paychecks, 401(k) matches, Roth vs traditional choices, savings rates, and student-loan tradeoffs.',
    url: '/guides',
  },
}

export default async function GuidesIndexPage() {
  const guides = allGuides()

  return (
    <div className="min-h-screen bg-zinc-50">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: BRAND.shareUrl },
          { name: 'Guides', item: `${BRAND.shareUrl}/guides` },
        ]}
      />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="border-b border-zinc-200 pb-8">
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
            {LAST_REVIEWED.label}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            New Grad Money Guides
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700">
            Practical, consensus-first guides for turning a first paycheck into a paycheck plan:
            take-home pay, emergency savings, employer match decisions, Roth choices, and debt tradeoffs.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Run the paycheck calculator
            </Link>
            <Link
              href="/first-paycheck-checklist"
              className="inline-flex min-h-11 items-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 hover:bg-zinc-100"
            >
              First paycheck checklist
            </Link>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-200 hover:bg-indigo-50"
            >
              <h2 className="text-lg font-bold tracking-tight text-zinc-950">{guide.shortTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-700">{guide.summary}</p>
              <span className="mt-4 inline-flex text-sm font-semibold text-indigo-700 underline underline-offset-2">
                Read the guide
              </span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  )
}
