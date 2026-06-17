'use client'

import Link from 'next/link'
import { track } from '@/lib/analytics'

const LINKS: { href: string; label: string; emoji: string }[] = [
  { href: '/', label: 'Paycheck Calculator', emoji: '🧮' },
  { href: '/best/best-high-yield-savings', label: 'Best High-Yield Savings', emoji: '🏦' },
  { href: '/best/best-roth-ira-brokerages', label: 'Best Roth IRA Brokerages', emoji: '📈' },
  { href: '/best/best-first-credit-cards', label: 'Best First Credit Cards', emoji: '💳' },
  { href: '/privacy', label: 'Privacy Policy', emoji: '🔒' },
]

export default function LinksNav() {
  return (
    <nav className="mt-8 space-y-3">
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => track('links_page_link_clicked', { label: link.label, href: link.href })}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3ee0a1] px-5 py-3.5 text-sm font-semibold text-[#0a1a2f] shadow-sm transition-colors hover:bg-[#2fcf90] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ee0a1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1a2f]"
        >
          <span aria-hidden="true">{link.emoji}</span>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
