import posthog from "posthog-js";

let hasInitialized = false;
let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;
let idleCallbackId: number | undefined;

function initPostHog() {
  if (hasInitialized) {
    return;
  }

  hasInitialized = true;

  if (timeoutId !== undefined) {
    window.clearTimeout(timeoutId);
  }

  if (idleCallbackId !== undefined && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(idleCallbackId);
  }

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}

const interactionEvents = ["pointerdown", "keydown", "touchstart"] as const;

for (const eventName of interactionEvents) {
  window.addEventListener(eventName, initPostHog, { once: true, passive: true });
}

if ("requestIdleCallback" in window) {
  idleCallbackId = window.requestIdleCallback(initPostHog, { timeout: 3000 });
} else {
  timeoutId = globalThis.setTimeout(initPostHog, 3000);
}
