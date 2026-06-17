import type { Metadata } from 'next'
import { trackServer } from '@/lib/analytics-server'
import LinksNav from './LinksNav'

export const metadata: Metadata = {
  title: 'First Paycheck Guide — Links',
  description:
    'Free tools and honest picks to make the most of your first paycheck: take-home calculator, high-yield savings, Roth IRA brokerages, and starter credit cards.',
}

export default async function LinksPage() {
  await trackServer('links_page_viewed')

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#0a1a2f] px-5 py-14 text-white">
      <div className="w-full max-w-md">
        {/* PFP placeholder */}
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#13294a] text-4xl ring-2 ring-[#3ee0a1]/40">
          <span aria-hidden="true">💰</span>
        </div>

        <h1 className="text-center text-2xl font-bold tracking-tight">
          First Paycheck Guide <span aria-hidden="true">💰</span>
        </h1>
        <p className="mt-2 text-center text-sm leading-6 text-slate-300">
          Free tools &amp; honest picks to make the most of your first real paycheck.
        </p>

        <LinksNav />
      </div>
    </div>
  )
}
