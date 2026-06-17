import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'First Paycheck Guide — Links',
  description:
    'Free tools and honest picks to make the most of your first paycheck: take-home calculator, high-yield savings, Roth IRA brokerages, and starter credit cards.',
}

const LINKS: { href: string; label: string; emoji: string }[] = [
  { href: '/', label: 'Paycheck Calculator', emoji: '🧮' },
  { href: '/best/best-high-yield-savings', label: 'Best High-Yield Savings', emoji: '🏦' },
  { href: '/best/best-roth-ira-brokerages', label: 'Best Roth IRA Brokerages', emoji: '📈' },
  { href: '/best/best-first-credit-cards', label: 'Best First Credit Cards', emoji: '💳' },
  { href: '/privacy', label: 'Privacy Policy', emoji: '🔒' },
]

export default function LinksPage() {
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

        <nav className="mt-8 space-y-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3ee0a1] px-5 py-3.5 text-sm font-semibold text-[#0a1a2f] shadow-sm transition-colors hover:bg-[#2fcf90] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ee0a1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1a2f]"
            >
              <span aria-hidden="true">{link.emoji}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
