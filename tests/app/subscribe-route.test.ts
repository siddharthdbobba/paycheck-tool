import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/subscribe/route'
import { prisma } from '@/lib/db'

vi.mock('@/lib/db', () => ({
  prisma: {
    subscriber: {
      upsert: vi.fn().mockResolvedValue({ id: 'subscriber-1' }),
    },
  },
}))

vi.mock('@/lib/email', () => ({
  sendPlanEmail: vi.fn().mockResolvedValue({ ok: true }),
}))

vi.mock('@/lib/analytics-server', () => ({
  trackServer: vi.fn().mockResolvedValue(undefined),
}))

describe('/api/subscribe', () => {
  it('rejects an invalid email before writing a subscriber', async () => {
    const req = new NextRequest('https://paycheck.test/api/subscribe', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.10' },
      body: JSON.stringify({ email: 'bad@', source: 'calculator' }),
    })

    const response = await POST(req)

    expect(response.status).toBe(400)
    expect(prisma.subscriber.upsert).not.toHaveBeenCalled()
  })
})
