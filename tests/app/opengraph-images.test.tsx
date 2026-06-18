import type { ReactElement, ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { COMPARISONS } from '@/lib/data/comparisons'
import { BRAND } from '@/lib/copy'

type ImageResponseOptions = {
  width?: number
  height?: number
}

class MockImageResponse {
  readonly element: ReactElement
  readonly options: ImageResponseOptions | undefined

  constructor(element: ReactElement, options?: ImageResponseOptions) {
    this.element = element
    this.options = options
  }
}

vi.mock('next/og', () => ({
  ImageResponse: MockImageResponse,
}))

function textFromNode(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(textFromNode).join(' ')
  }

  if (node && typeof node === 'object' && 'props' in node) {
    const props = node.props as { children?: ReactNode }
    return textFromNode(props.children)
  }

  return ''
}

describe('Open Graph image routes', () => {
  it('renders the root branded paycheck card at 1200 by 630', async () => {
    const route = await import('@/app/opengraph-image')
    const response = route.default()

    expect(route.size).toEqual({ width: 1200, height: 630 })
    expect(route.contentType).toBe('image/png')
    expect(response).toBeInstanceOf(MockImageResponse)
    const image = response as unknown as MockImageResponse
    expect(image.options).toEqual({ width: 1200, height: 630 })
    expect(textFromNode(image.element)).toContain('See your real first paycheck')
    expect(textFromNode(image.element)).toContain(BRAND.handle)
    expect(textFromNode(image.element)).toContain(BRAND.shareUrl)
  })

  it('renders the dynamic comparison title card at 1200 by 630', async () => {
    const comparison = COMPARISONS[0]
    const route = await import('@/app/best/[slug]/opengraph-image')
    const response = await route.default({ params: Promise.resolve({ slug: comparison.slug }) })

    expect(route.size).toEqual({ width: 1200, height: 630 })
    expect(route.contentType).toBe('image/png')
    expect(response).toBeInstanceOf(MockImageResponse)
    const image = response as unknown as MockImageResponse
    expect(textFromNode(image.element)).toContain(comparison.title)
    expect(textFromNode(image.element)).toContain(BRAND.handle)
  })
})
