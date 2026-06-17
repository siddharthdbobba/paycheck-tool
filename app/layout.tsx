import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { COPY } from '@/lib/copy'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
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
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 px-4 py-6 text-center text-xs text-zinc-500">
          <p className="mb-2">{COPY.disclaimer}</p>
          <a href="/privacy" className="underline underline-offset-2 hover:text-zinc-700">
            Privacy Policy
          </a>
        </footer>
      </body>
    </html>
  )
}
