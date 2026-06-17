import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendPlanEmail } from '@/lib/email'
import { trackServer } from '@/lib/analytics-server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
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
