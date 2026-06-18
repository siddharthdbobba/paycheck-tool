'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'
const listeners = new Set<() => void>()
let media: MediaQueryList | null = null
let listening = false

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

function getMedia(): MediaQueryList | null {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return null
  }

  media ??= window.matchMedia(QUERY)

  if (!listening) {
    media.addEventListener('change', emitChange)
    listening = true
  }

  return media
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  getMedia()

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return getMedia()?.matches ?? false
}

function getServerSnapshot() {
  return false
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
