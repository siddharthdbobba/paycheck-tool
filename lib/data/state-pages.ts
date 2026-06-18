import { BRAND } from '@/lib/copy'
import { US_STATES } from './states'

export type StateCode = (typeof US_STATES)[number][0]

export type StatePageState = {
  code: StateCode
  name: string
  slug: string
  href: string
  url: string
}

export function stateSlug(code: string): string {
  return code.toLowerCase()
}

export function statePageHref(code: string): string {
  return `/take-home-pay/${stateSlug(code)}`
}

export function statePageUrl(code: string): string {
  return `${BRAND.shareUrl}${statePageHref(code)}`
}

export function allStatePages(): StatePageState[] {
  return US_STATES.map(([code, name]) => ({
    code,
    name,
    slug: stateSlug(code),
    href: statePageHref(code),
    url: statePageUrl(code),
  }))
}

export function getStatePageBySlug(slug: string): StatePageState | undefined {
  return allStatePages().find((state) => state.slug === slug.toLowerCase())
}

export function getStatePageByCode(code: string): StatePageState | undefined {
  return allStatePages().find((state) => state.code === code.toUpperCase())
}
