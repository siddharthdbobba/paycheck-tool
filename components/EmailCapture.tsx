'use client'

import { useState, FormEvent } from 'react'
import { track } from '@/lib/analytics'

type Status = { type: 'idle' } | { type: 'loading' } | { type: 'success' } | { type: 'error'; message: string }

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus({ type: 'loading' })

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'calculator' }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Something went wrong' })
        return
      }

      track('email_submitted', { source: 'calculator' })
      setStatus({ type: 'success' })
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  if (status.type === 'success') {
    return (
      <div className="mt-8 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Check your inbox for your personalized plan! 📬
      </div>
    )
  }

  return (
    <div className="mt-8 rounded-md border border-zinc-200 bg-white px-4 py-5">
      <h3 className="mb-1 text-sm font-semibold text-zinc-900">Get your personalized plan</h3>
      <p className="mb-3 text-xs text-zinc-500">
        We&apos;ll send you a checklist tailored to your salary and state.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="min-w-0 flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
        >
          {status.type === 'loading' ? 'Sending...' : 'Send Plan'}
        </button>
      </form>
      {status.type === 'error' && (
        <p className="mt-2 text-xs text-red-600">{status.message}</p>
      )}
      <p className="mt-2 text-xs text-zinc-400">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}
