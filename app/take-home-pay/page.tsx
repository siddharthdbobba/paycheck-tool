import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import { BRAND } from '@/lib/copy'
import { allStatePages } from '@/lib/data/state-pages'

export const metadata: Metadata = {
  title: 'Take-Home Pay by State (2026) - New Grad Calculator',
  description: 'Choose a state to see computed take-home pay examples and run a state-defaulted paycheck calculator.',
  alternates: {
    canonical: `${BRAND.shareUrl}/take-home-pay`,
  },
}

export default function TakeHomePayIndexPage() {
  const states = allStatePages()

  return (
    <div className="min-h-screen bg-zinc-50">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: BRAND.shareUrl },
          { name: 'Take-home pay', item: `${BRAND.shareUrl}/take-home-pay` },
        ]}
      />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Take-home pay by state</h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-700">
            Pick your state for computed federal, FICA, state tax, and net pay examples, plus a live calculator defaulted to that state.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <li key={state.code}>
              <Link
                href={state.href}
                className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-700"
              >
                {state.name} take-home pay
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
