import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/go/[productId]/route'
import { prisma } from '@/lib/db'

vi.mock('@/lib/db', () => ({
  prisma: {
    clickEvent: {
      create: vi.fn().mockResolvedValue({ id: 'click-1' }),
    },
  },
}))

vi.mock('@/lib/analytics-server', () => ({
  trackServer: vi.fn().mockResolvedValue(undefined),
}))

describe('/go/[productId]', () => {
  it('logs placeholder affiliate clicks but redirects home instead of to AFFILIATE_REPLACE', async () => {
    const req = new NextRequest('https://paycheck.test/go/savings-sofi', {
      headers: { referer: 'https://paycheck.test/' },
    })

    const response = await GET(req, { params: Promise.resolve({ productId: 'savings-sofi' }) })

    expect(prisma.clickEvent.create).toHaveBeenCalledWith({
      data: { productId: 'savings-sofi', referer: 'https://paycheck.test/' },
    })
    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('https://paycheck.test/?pending=1')
  })
})
