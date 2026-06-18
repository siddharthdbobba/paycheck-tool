import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home, { generateMetadata } from '@/app/page'

describe('/', () => {
  it('swaps the hero headline from the hook query param', async () => {
    render(await Home({ searchParams: Promise.resolve({ hook: 'match' }) }))

    expect(
      screen.getByRole('heading', { level: 1, name: /stop missing free 401k money/i }),
    ).toBeTruthy()
  })

  it('adds dateModified and url to the home JSON-LD', async () => {
    const { container } = render(await Home({ searchParams: Promise.resolve({}) }))
    const script = container.querySelector('script[type="application/ld+json"]')

    expect(script?.textContent).toContain('"dateModified"')
    expect(script?.textContent).toContain('"url":"https://paycheck-tool-faceless1.vercel.app"')
  })

  it('generates hook-specific title and OpenGraph description', async () => {
    await expect(
      generateMetadata({ searchParams: Promise.resolve({ hook: 'budget' }) }),
    ).resolves.toMatchObject({
      title: expect.stringContaining('first salary'),
      alternates: {
        canonical: 'https://paycheck-tool-faceless1.vercel.app',
      },
      openGraph: {
        description: expect.stringContaining('monthly budget'),
      },
    })
  })
})
