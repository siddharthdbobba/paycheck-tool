# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the paycheck calculator. The existing `posthog-js` and `posthog-node` packages were already installed but not properly initialized. The wizard replaced a custom `window.posthog` stub with a proper `instrumentation-client.ts` initialization (Next.js 15.3+ pattern), added a reverse proxy through `next.config.ts` to route PostHog traffic through `/ingest`, fixed the server-side client to use environment variables for the host, added `posthog.identify()` on email capture with client-to-server distinct ID correlation via `X-POSTHOG-DISTINCT-ID` headers, and instrumented three new events covering the full user journey from content discovery through affiliate conversion.

| Event | Description | File |
|---|---|---|
| `calc_completed` | User submits the paycheck calculator form | `components/Calculator.tsx` |
| `email_submitted` | User submits email in the capture form | `components/EmailCapture.tsx` |
| `email_captured` | Server confirms email was saved to database | `app/api/subscribe/route.ts` |
| `affiliate_click` | Server records an affiliate product redirect | `app/go/[productId]/route.ts` |
| `product_link_clicked` | User clicks "Learn More" on a product card (client-side, before redirect) | `components/ProductCard.tsx` |
| `best_page_viewed` | User lands on a best-of comparison page | `app/best/[slug]/page.tsx` |
| `checklist_viewed` | User views the first-paycheck guide | `app/first-paycheck-checklist/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/474716/dashboard/1725695)
- [Calculator completions over time](https://us.posthog.com/project/474716/insights/bKjfJbGO)
- [Calculator completions vs email captures](https://us.posthog.com/project/474716/insights/0K2ktSFP)
- [Affiliate conversion funnel](https://us.posthog.com/project/474716/insights/3D4yWFQ3)
- [Affiliate clicks by product](https://us.posthog.com/project/474716/insights/7pTGvqHx)
- [Content page views (checklist + best-of)](https://us.posthog.com/project/474716/insights/jj4Ww6F4)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite (`npm test`) — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any team onboarding docs so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or equivalent) into CI so production stack traces de-minify for the error tracking enabled in `instrumentation-client.ts`.
- [ ] Confirm the returning-visitor path also calls `posthog.identify()` — the current implementation only identifies on email submit. Users who return in a new session will be anonymous until they submit again.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
