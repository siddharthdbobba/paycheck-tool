import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { BRAND, COPY } from '@/lib/copy'
import HeaderCta from '@/components/HeaderCta'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.shareUrl),
  title: 'New Grad Paycheck Calculator — Know Your First Paycheck',
  description:
    "See your real take-home pay, max your employer's 401k match, and build a simple budget for your first job.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between">
            <Link href="/" className="text-sm font-bold tracking-tight text-zinc-950">
              Paycheck Tool
            </Link>
            <HeaderCta />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 px-4 py-6 text-xs text-zinc-500">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
            <nav aria-label="Trust and policy links" className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link href="/guides" className="underline underline-offset-2 hover:text-zinc-700">
                Guides
              </Link>
              <Link href="/methodology" className="underline underline-offset-2 hover:text-zinc-700">
                Methodology
              </Link>
              <Link href="/editorial-standards" className="underline underline-offset-2 hover:text-zinc-700">
                Editorial Standards
              </Link>
              <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-700">
                Privacy Policy
              </Link>
            </nav>
            <div className="space-y-1">
              <p>{COPY.disclaimer}</p>
              <p>Not financial advice — consult a professional.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
