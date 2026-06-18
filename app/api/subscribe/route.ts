import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendPlanEmail } from '@/lib/email'
import { trackServer } from '@/lib/analytics-server'

const EMAIL_MAX_LENGTH = 254
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5
const subscribeRateLimit = new Map<string, number[]>()

function isValidEmail(email: string): boolean {
  return email.length <= EMAIL_MAX_LENGTH && EMAIL_REGEX.test(email)
}

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

function isRateLimited(ip: string, now = Date.now()): boolean {
  const cutoff = now - RATE_LIMIT_WINDOW_MS

  for (const [key, timestamps] of subscribeRateLimit.entries()) {
    const recent = timestamps.filter((timestamp) => timestamp > cutoff)
    if (recent.length > 0) {
      subscribeRateLimit.set(key, recent)
    } else {
      subscribeRateLimit.delete(key)
    }
  }

  const timestamps = subscribeRateLimit.get(ip) ?? []
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  subscribeRateLimit.set(ip, [...timestamps, now])
  return false
}

export async function POST(req: NextRequest) {
  try {
    // Durable cross-instance rate limiting needs Vercel KV or Upstash.
    if (isRateLimited(getClientIp(req))) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const { email, source } = body

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: { source: source || null },
      create: { email, source: source || null },
    })

    // Fire-and-forget email send (don't block response)
    sendPlanEmail(email).then((result) => {
      if (!result.ok) {
        console.warn('[subscribe] email send failed:', result.error)
      }
    })

    const distinctId = req.headers.get('X-POSTHOG-DISTINCT-ID') ?? email
    await trackServer('email_captured', { source: source || 'calculator', email }, distinctId)

    return NextResponse.json({ ok: true, id: subscriber.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[subscribe] error:', message)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
