import { PostHog } from 'posthog-node'

let posthogClient: PostHog | null = null

export function getPostHogClient(): PostHog {
  if (!posthogClient) {
    posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    })
  }
  return posthogClient
}

export async function trackServer(
  event: string,
  props?: Record<string, unknown>,
  distinctId = 'server',
) {
  const client = getPostHogClient()
  client.capture({ distinctId, event, properties: props })
}
