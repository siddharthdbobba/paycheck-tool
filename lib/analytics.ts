'use client'

import { useEffect } from 'react'

type PostHogInstance = {
  capture: (event: string, props?: Record<string, unknown>) => void
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    posthog?: any
  }
}

let posthog: PostHogInstance | null = null

function getPostHog(): PostHogInstance | null {
  if (typeof window === 'undefined') return null
  if (posthog) return posthog

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) {
    return null
  }

  if (!window.posthog) {
    window.posthog = {
      _i: [],
      init: () => {},
      capture: (event: string, props?: Record<string, unknown>) => {
        console.debug('[analytics]', event, props)
      },
    }
  }
  posthog = window.posthog as PostHogInstance
  return posthog
}

export function track(event: string, props?: Record<string, unknown>) {
  const ph = getPostHog()
  if (ph) {
    ph.capture(event, props)
  } else {
    console.debug('[analytics] (no key) skipped:', event, props)
  }
}

/** Hook to track page views. Call in layout or per-page. */
export function usePageView(pageName: string) {
  useEffect(() => {
    track('page_view', { page: pageName })
  }, [pageName])
}
