import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from '@/app/page'

describe('/', () => {
  it('swaps the hero headline from the hook query param', async () => {
    render(await Home({ searchParams: Promise.resolve({ hook: 'match' }) }))

    expect(
      screen.getByRole('heading', { level: 1, name: /stop missing free 401k money/i }),
    ).toBeTruthy()
  })
})
