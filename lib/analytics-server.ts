/**
 * Server-side analytics. Import in API routes and server components.
 * Uses the PostHog Node SDK when key is configured; otherwise no-ops.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let posthogNode: any = null

async function getNodeClient() {
  if (posthogNode) return posthogNode
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return null
  try {
    const { PostHog } = await import('posthog-node')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    posthogNode = new PostHog(key, { host: 'https://app.posthog.com' })
    return posthogNode
  } catch {
    console.warn('[analytics-server] posthog-node not installed')
    return null
  }
}

export async function trackServer(event: string, props?: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (posthogNode) {
    posthogNode.capture({ event, distinctId: 'server', properties: props })
  } else {
    const client = await getNodeClient()
    if (client) {
      client.capture({ event, distinctId: 'server', properties: props })
    } else {
      console.debug('[analytics-server] skipped:', event, props)
    }
  }
}
