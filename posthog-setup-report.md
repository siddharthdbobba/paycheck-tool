# PostHog post-wizard report

The wizard has completed a deep integration of your project. PostHog was already partially instrumented (posthog-js/posthog-node installed, `instrumentation-client.ts` initialised, reverse proxy configured, and core events in place). This run filled the remaining gaps: the social media landing page (`/links`) now tracks server-side views and client-side link clicks via a new `LinksNav` client component, email capture errors are now recorded and surfaced to PostHog error tracking, and environment variables were written to `.env.local`.

| Event | Description | File |
|---|---|---|
| `links_page_viewed` | Server-side: user lands on the `/links` social media landing page | `app/links/page.tsx` |
| `links_page_link_clicked` | Client-side: user clicks a link on the `/links` page (includes `label` and `href` props) | `app/links/LinksNav.tsx` |
| `email_capture_failed` | Client-side: email form submission fails (includes `source` and `error` message props); also calls `posthog.captureException` on network errors | `components/EmailCapture.tsx` |

### Pre-existing events (already instrumented)

| Event | File |
|---|---|
| `calc_completed` | `components/Calculator.tsx` |
| `email_submitted` | `components/EmailCapture.tsx` |
| `product_link_clicked` | `components/ProductCard.tsx` |
| `email_captured` | `app/api/subscribe/route.ts` |
| `affiliate_click` | `app/go/[productId]/route.ts` |
| `best_page_viewed` | `app/best/[slug]/page.tsx` |
| `checklist_viewed` | `app/first-paycheck-checklist/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/474716/dashboard/1726176)
- [Calculator completions](https://us.posthog.com/project/474716/insights/YfZuVYR9) — daily trend of `calc_completed`
- [Calculator to email funnel](https://us.posthog.com/project/474716/insights/rp9UvxV6) — `calc_completed` → `email_submitted` conversion
- [Affiliate clicks by product](https://us.posthog.com/project/474716/insights/0NU1PKQF) — `product_link_clicked` broken down by product
- [Links page views vs link clicks](https://us.posthog.com/project/474716/insights/3ManNfJ9) — social landing page engagement
- [Email capture failure rate](https://us.posthog.com/project/474716/insights/64sksEFG) — `email_submitted` vs `email_capture_failed`

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite (`npm test`) — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` (or your team's bootstrap docs) so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — currently `posthog.identify` is only called on fresh email submission; a returning user who skips the form will stay on an anonymous distinct ID.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-pages-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
