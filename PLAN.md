# First-Paycheck Setup Tool: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the owned conversion asset for the faceless Instagram funnel: an interactive "what to do with your first paycheck" tool plus SEO comparison pages that route to affiliate offers and capture emails.

**Architecture:** A Next.js (App Router) app. All money math lives in pure, unit-tested functions in `lib/calc/` with zero UI or I/O. A typed product dataset in `lib/data/` feeds both the tool's recommendations and the SEO comparison pages. Every outbound affiliate link goes through a single `/go/[productId]` route that logs the click and redirects, so links are centralized, trackable, and disclosure-compliant. Email capture and event logging persist to Postgres via Prisma. Instagram Reels drive traffic to this site; this site is where the money is made.

**Tech Stack:** Next.js 14+ (App Router) + TypeScript (strict) + Tailwind CSS. Vitest for unit tests. Prisma + Postgres (Neon free tier) for subscribers and events. Resend for transactional email. PostHog (free tier) for product analytics. Deploy on Vercel.

## Global Constraints

- **Not advice:** every calculator output must display "Estimates only. This is educational information, not financial, tax, or investment advice." Copy this string verbatim from `lib/copy.ts`.
- **FTC disclosure:** every page that shows an affiliate product must render the `<Disclosure />` component near the top. Affiliate links use `rel="sponsored nofollow"`.
- **Affiliate links are centralized:** no component links directly to an affiliate URL. All affiliate clicks go through `/go/[productId]`. Raw affiliate URLs exist only in `lib/data/products.ts`.
- **Mobile-first:** Instagram traffic is ~100% mobile. Every UI is designed at 375px width first.
- **Tax constants are dated:** all tax tables, contribution limits, and rates live only in `lib/calc/constants.ts`, tagged with their tax year. They must be verified against current IRS/SSA figures before each launch and annually.
- **TypeScript strict mode on.** No `any` in `lib/calc/`.
- **Node 20+.**
- **MVP filing status is `single`.** Other statuses are out of scope for v1 (documented extension point).

---

## Overview of what "v1 done" means

The chosen scope is the **full funnel asset**:
1. Interactive calculator (salary in -> take-home, 401k match capture, Roth target, budget split, ranked product shortlist).
2. SEO comparison pages (best high-yield savings, best Roth IRA brokerages, best first credit cards).
3. Email capture that sends a personalized plan.
4. Affiliate click routing + logging.
5. Basic analytics.
6. Compliance surfaces (disclosure + disclaimer + privacy).
7. Deployed and live.

## File Structure

```
paycheck-tool/
  app/
    layout.tsx                  # global layout, fonts, analytics, footer
    page.tsx                    # landing + calculator
    best/[slug]/page.tsx        # SEO comparison pages (generated from data)
    go/[productId]/route.ts     # affiliate redirect + click logging
    api/subscribe/route.ts      # email capture endpoint
    privacy/page.tsx            # privacy policy
  components/
    Calculator.tsx              # input form (client component)
    Results.tsx                 # renders calc output
    ProductCard.tsx             # one product + /go link
    EmailCapture.tsx            # email form -> /api/subscribe
    Disclosure.tsx              # FTC disclosure banner
    Disclaimer.tsx              # "not advice" line
  lib/
    calc/
      types.ts                  # PaycheckInput, PaycheckResult, Product types
      constants.ts              # 2026 tax tables, FICA, contribution limits
      tax.ts                    # federalTax, fica, stateTax, takeHome
      retirement.ts             # match401k, rothTarget
      budget.ts                 # budgetSplit (50/30/20)
      recommend.ts              # rankProducts(input) -> Product[]
    data/
      products.ts               # typed product catalog + affiliate URLs
      comparisons.ts            # comparison page definitions (slug -> products)
    copy.ts                     # shared compliance/disclaimer strings
    db.ts                       # Prisma client singleton
    email.ts                    # Resend wrapper: sendPlanEmail
    analytics.ts                # track(event) helper (PostHog server + client)
  prisma/
    schema.prisma               # Subscriber, ClickEvent
  tests/
    calc/
      tax.test.ts
      retirement.test.ts
      budget.test.ts
      recommend.test.ts
  .env.example
  PLAN.md
```

---

## Task 0: Project scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `vitest.config.ts`, `.env.example`, `app/layout.tsx`, `app/page.tsx`

**Interfaces:**
- Produces: a runnable Next.js app with `npm run dev`, `npm test`, `npm run build`.

- [ ] **Step 1:** Scaffold the app.

```bash
cd /Users/sbobba/instagram-faceless-project/paycheck-tool
npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*" --no-turbopack
```

- [ ] **Step 2:** Add test tooling.

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
```

- [ ] **Step 3:** Create `vitest.config.ts`.

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true },
})
```

- [ ] **Step 4:** Add scripts to `package.json` (`"test": "vitest run"`, `"test:watch": "vitest"`).

- [ ] **Step 5:** Verify the toolchain.

Run: `npm run build && npm test`
Expected: build succeeds; vitest runs with "no test files found" (exit 0 after we add the flag, or expect the no-tests message).

- [ ] **Step 6:** Commit.

```bash
git init && git add -A && git commit -m "chore: scaffold Next.js + TS + Tailwind + Vitest"
```

---

## Task 1: Domain types and tax constants

**Files:**
- Create: `lib/calc/types.ts`, `lib/calc/constants.ts`, `lib/copy.ts`

**Interfaces:**
- Produces:
  - `PaycheckInput { grossAnnual: number; state: string; payFrequency: 'weekly'|'biweekly'|'semimonthly'|'monthly'; matchPercent: number; matchLimitPercent: number }`
  - `PaycheckResult { takeHomeAnnual: number; takeHomePerCheck: number; federalTax: number; fica: number; stateTax: number; recommended401kPercent: number; employerMatchDollars: number; rothMonthly: number; budget: { needs: number; wants: number; savings: number } }`
  - `Product { id: string; category: 'savings'|'brokerage'|'card'; name: string; blurb: string; highlights: string[]; affiliateUrl: string; payoutNote: string }`
  - `FEDERAL_BRACKETS_2026`, `STANDARD_DEDUCTION_2026`, `FICA`, `ROTH_LIMIT_2026`, `STATE_EFFECTIVE_RATES` from `constants.ts`
  - `COPY.disclaimer`, `COPY.disclosure` from `copy.ts`

- [ ] **Step 1:** Create `lib/copy.ts`.

```ts
export const COPY = {
  disclaimer:
    'Estimates only. This is educational information, not financial, tax, or investment advice.',
  disclosure:
    'Some links are affiliate links. If you open an account through them we may earn a commission, at no cost to you. This does not influence our rankings.',
} as const
```

- [ ] **Step 2:** Create `lib/calc/types.ts` with the interfaces listed above.

- [ ] **Step 3:** Create `lib/calc/constants.ts`. Tag the tax year. These are approximate 2026 single-filer figures and MUST be verified against IRS/SSA before launch.

```ts
export const TAX_YEAR = 2026

// Single filer. Verify annually at irs.gov before launch.
export const STANDARD_DEDUCTION_2026 = 15000

export const FEDERAL_BRACKETS_2026 = [
  { upTo: 11925, rate: 0.10 },
  { upTo: 48475, rate: 0.12 },
  { upTo: 103350, rate: 0.22 },
  { upTo: 197300, rate: 0.24 },
  { upTo: 250525, rate: 0.32 },
  { upTo: 626350, rate: 0.35 },
  { upTo: Infinity, rate: 0.37 },
] as const

export const FICA = {
  socialSecurityRate: 0.062,
  socialSecurityWageBase: 176100, // verify annually (SSA)
  medicareRate: 0.0145,
} as const

export const ROTH_LIMIT_2026 = 7000 // under-50 limit, verify annually

// Approximate effective state income tax rates for an estimate only.
// 0 for no-income-tax states. Verify/expand as needed.
export const STATE_EFFECTIVE_RATES: Record<string, number> = {
  AK: 0, FL: 0, NV: 0, NH: 0, SD: 0, TN: 0, TX: 0, WA: 0, WY: 0,
  IN: 0.0315, IL: 0.0495, CO: 0.044, AZ: 0.025, MI: 0.0425,
  CA: 0.06, NY: 0.055, NC: 0.045, PA: 0.0307, OH: 0.035, GA: 0.0539,
  // default applied in code for states not listed
}
export const DEFAULT_STATE_RATE = 0.05
```

- [ ] **Step 4:** Commit.

```bash
git add lib/ && git commit -m "feat: domain types, tax constants, compliance copy"
```

---

## Task 2: Tax + take-home calculation (TDD)

**Files:**
- Create: `lib/calc/tax.ts`, `tests/calc/tax.test.ts`

**Interfaces:**
- Consumes: constants from Task 1.
- Produces: `federalIncomeTax(taxable: number): number`, `ficaTax(gross: number): number`, `stateTax(gross: number, state: string): number`, `takeHome(input: PaycheckInput, pretax401k: number): { federalTax; fica; stateTax; takeHomeAnnual }`.

- [ ] **Step 1:** Write the failing test `tests/calc/tax.test.ts`.

```ts
import { describe, it, expect } from 'vitest'
import { federalIncomeTax, ficaTax, stateTax, takeHome } from '@/lib/calc/tax'

describe('federalIncomeTax', () => {
  it('applies brackets progressively after standard deduction', () => {
    // taxable income (already post-deduction) of 40000:
    // 10% * 11925 + 12% * (40000 - 11925) = 1192.5 + 3369 = 4561.5
    expect(federalIncomeTax(40000)).toBeCloseTo(4561.5, 1)
  })
  it('is zero at or below zero taxable', () => {
    expect(federalIncomeTax(0)).toBe(0)
  })
})

describe('ficaTax', () => {
  it('is 7.65% below the wage base', () => {
    expect(ficaTax(70000)).toBeCloseTo(70000 * 0.0765, 1)
  })
})

describe('stateTax', () => {
  it('is zero for no-income-tax states', () => {
    expect(stateTax(70000, 'TX')).toBe(0)
  })
  it('uses the state effective rate', () => {
    expect(stateTax(70000, 'IN')).toBeCloseTo(70000 * 0.0315, 1)
  })
})

describe('takeHome', () => {
  it('subtracts pretax 401k before federal/state tax', () => {
    const r = takeHome(
      { grossAnnual: 70000, state: 'TX', payFrequency: 'biweekly', matchPercent: 0, matchLimitPercent: 0 },
      7000,
    )
    expect(r.takeHomeAnnual).toBeLessThan(70000)
    expect(r.takeHomeAnnual).toBeGreaterThan(40000)
  })
})
```

- [ ] **Step 2:** Run to verify failure.

Run: `npx vitest run tests/calc/tax.test.ts`
Expected: FAIL ("federalIncomeTax is not a function").

- [ ] **Step 3:** Implement `lib/calc/tax.ts`.

```ts
import {
  FEDERAL_BRACKETS_2026, STANDARD_DEDUCTION_2026, FICA,
  STATE_EFFECTIVE_RATES, DEFAULT_STATE_RATE,
} from './constants'
import type { PaycheckInput } from './types'

export function federalIncomeTax(taxable: number): number {
  if (taxable <= 0) return 0
  let tax = 0
  let lower = 0
  for (const b of FEDERAL_BRACKETS_2026) {
    if (taxable > lower) {
      const slice = Math.min(taxable, b.upTo) - lower
      tax += slice * b.rate
      lower = b.upTo
    } else break
  }
  return tax
}

export function ficaTax(gross: number): number {
  const ss = Math.min(gross, FICA.socialSecurityWageBase) * FICA.socialSecurityRate
  const medicare = gross * FICA.medicareRate
  return ss + medicare
}

export function stateTax(gross: number, state: string): number {
  const rate = STATE_EFFECTIVE_RATES[state] ?? DEFAULT_STATE_RATE
  return gross * rate
}

export function takeHome(input: PaycheckInput, pretax401k: number) {
  const { grossAnnual, state } = input
  const taxableForFederal = Math.max(0, grossAnnual - pretax401k - STANDARD_DEDUCTION_2026)
  const federal = federalIncomeTax(taxableForFederal)
  const fica = ficaTax(grossAnnual)
  const stateAmount = stateTax(grossAnnual - pretax401k, state)
  const takeHomeAnnual = grossAnnual - pretax401k - federal - fica - stateAmount
  return { federalTax: federal, fica, stateTax: stateAmount, takeHomeAnnual }
}
```

- [ ] **Step 4:** Run to verify pass.

Run: `npx vitest run tests/calc/tax.test.ts`
Expected: PASS (all 6).

- [ ] **Step 5:** Commit.

```bash
git add lib/calc/tax.ts tests/calc/tax.test.ts && git commit -m "feat: federal/FICA/state tax and take-home calc"
```

---

## Task 3: Retirement math (TDD)

**Files:**
- Create: `lib/calc/retirement.ts`, `tests/calc/retirement.test.ts`

**Interfaces:**
- Consumes: `ROTH_LIMIT_2026`.
- Produces: `match401k(grossAnnual, matchPercent, matchLimitPercent): { recommendedPercent; employerDollars; employeeDollars }`, `rothTarget(): { annual; monthly }`.

- [ ] **Step 1:** Write `tests/calc/retirement.test.ts`.

```ts
import { describe, it, expect } from 'vitest'
import { match401k, rothTarget } from '@/lib/calc/retirement'

describe('match401k', () => {
  it('recommends contributing up to the match limit', () => {
    // 100% match up to 4% of salary, salary 70000
    const r = match401k(70000, 100, 4)
    expect(r.recommendedPercent).toBe(4)
    expect(r.employeeDollars).toBeCloseTo(2800, 1)
    expect(r.employerDollars).toBeCloseTo(2800, 1)
  })
  it('halves employer dollars for a 50% match', () => {
    const r = match401k(70000, 50, 6)
    expect(r.employerDollars).toBeCloseTo(70000 * 0.06 * 0.5, 1)
  })
  it('recommends 0 when there is no match', () => {
    expect(match401k(70000, 0, 0).recommendedPercent).toBe(0)
  })
})

describe('rothTarget', () => {
  it('spreads the annual limit across 12 months', () => {
    const r = rothTarget()
    expect(r.monthly).toBeCloseTo(r.annual / 12, 2)
  })
})
```

- [ ] **Step 2:** Run to verify failure. `npx vitest run tests/calc/retirement.test.ts` -> FAIL.

- [ ] **Step 3:** Implement `lib/calc/retirement.ts`.

```ts
import { ROTH_LIMIT_2026 } from './constants'

export function match401k(grossAnnual: number, matchPercent: number, matchLimitPercent: number) {
  const recommendedPercent = matchLimitPercent
  const employeeDollars = grossAnnual * (matchLimitPercent / 100)
  const employerDollars = employeeDollars * (matchPercent / 100)
  return { recommendedPercent, employeeDollars, employerDollars }
}

export function rothTarget() {
  return { annual: ROTH_LIMIT_2026, monthly: ROTH_LIMIT_2026 / 12 }
}
```

- [ ] **Step 4:** Run to verify pass. Expected: PASS.

- [ ] **Step 5:** Commit. `git commit -m "feat: 401k match and Roth target math"`

---

## Task 4: Budget split (TDD)

**Files:**
- Create: `lib/calc/budget.ts`, `tests/calc/budget.test.ts`

**Interfaces:**
- Produces: `budgetSplit(takeHomeMonthly: number): { needs; wants; savings }` using 50/30/20.

- [ ] **Step 1:** Write `tests/calc/budget.test.ts`.

```ts
import { describe, it, expect } from 'vitest'
import { budgetSplit } from '@/lib/calc/budget'

describe('budgetSplit', () => {
  it('splits 50/30/20', () => {
    const b = budgetSplit(4000)
    expect(b.needs).toBe(2000)
    expect(b.wants).toBe(1200)
    expect(b.savings).toBe(800)
  })
})
```

- [ ] **Step 2:** Run to verify failure.

- [ ] **Step 3:** Implement `lib/calc/budget.ts`.

```ts
export function budgetSplit(takeHomeMonthly: number) {
  return {
    needs: takeHomeMonthly * 0.5,
    wants: takeHomeMonthly * 0.3,
    savings: takeHomeMonthly * 0.2,
  }
}
```

- [ ] **Step 4:** Run to verify pass.

- [ ] **Step 5:** Commit. `git commit -m "feat: 50/30/20 budget split"`

---

## Task 5: Product catalog

**Files:**
- Create: `lib/data/products.ts`, `lib/data/comparisons.ts`

**Interfaces:**
- Consumes: `Product` type from Task 1.
- Produces: `PRODUCTS: Product[]`, `getProduct(id): Product | undefined`, `COMPARISONS: { slug; title; metaDescription; category; intro }[]`, `productsForCategory(category): Product[]`.

- [ ] **Step 1:** Create `lib/data/products.ts` with a curated starter catalog (3-5 per category). Use placeholder affiliate URLs you replace once you are approved into each program; the structure is final.

```ts
import type { Product } from '@/lib/calc/types'

export const PRODUCTS: Product[] = [
  {
    id: 'savings-sofi', category: 'savings', name: 'SoFi Checking & Savings',
    blurb: 'High-yield savings with no account fees.',
    highlights: ['Competitive APY', 'No monthly fee', 'Signup bonus for direct deposit'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/sofi', payoutNote: '~$20-75 funded',
  },
  {
    id: 'brokerage-fidelity', category: 'brokerage', name: 'Fidelity Roth IRA',
    blurb: 'Open a Roth IRA with no minimum and low-cost index funds.',
    highlights: ['No account fees', 'Great index funds', 'Beginner friendly'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/fidelity', payoutNote: 'varies',
  },
  {
    id: 'card-discover-student', category: 'card', name: 'Discover it Student',
    blurb: 'Starter cash-back card for building credit.',
    highlights: ['No annual fee', 'Cash back', 'Builds credit'],
    affiliateUrl: 'https://AFFILIATE_REPLACE/discover-student', payoutNote: '~$50 approval',
  },
  // Add 1-2 more per category as programs are approved.
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}
export function productsForCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}
```

- [ ] **Step 2:** Create `lib/data/comparisons.ts`.

```ts
import type { Product } from '@/lib/calc/types'

export const COMPARISONS: { slug: string; title: string; metaDescription: string; category: Product['category']; intro: string }[] = [
  { slug: 'best-high-yield-savings', title: 'Best High-Yield Savings Accounts (2026)', metaDescription: 'Where to park your first paycheck for the highest interest, ranked for beginners.', category: 'savings', intro: 'These accounts pay far more than a big-bank savings account.' },
  { slug: 'best-roth-ira-brokerages', title: 'Best Brokerages for Your First Roth IRA (2026)', metaDescription: 'The easiest, lowest-cost places to open a Roth IRA as a new grad.', category: 'brokerage', intro: 'A Roth IRA is the simplest tax-free retirement account to start now.' },
  { slug: 'best-first-credit-cards', title: 'Best First Credit Cards to Build Credit (2026)', metaDescription: 'Starter cards that build credit with no annual fee.', category: 'card', intro: 'Pick one starter card, pay it in full monthly, and your credit grows.' },
]
export function getComparison(slug: string) {
  return COMPARISONS.find((c) => c.slug === slug)
}
```

- [ ] **Step 3:** Commit. `git add lib/data && git commit -m "feat: product catalog + comparison definitions"`

---

## Task 6: Recommendation engine (TDD)

**Files:**
- Create: `lib/calc/recommend.ts`, `tests/calc/recommend.test.ts`

**Interfaces:**
- Consumes: `PRODUCTS`, `PaycheckInput`.
- Produces: `rankProducts(input: PaycheckInput): Product[]` returning the top pick per category in display order (savings, brokerage, card), and `buildResult(input): PaycheckResult` that composes all calc modules.

- [ ] **Step 1:** Write `tests/calc/recommend.test.ts`.

```ts
import { describe, it, expect } from 'vitest'
import { rankProducts, buildResult } from '@/lib/calc/recommend'

const input = { grossAnnual: 70000, state: 'IN', payFrequency: 'biweekly' as const, matchPercent: 100, matchLimitPercent: 4 }

describe('rankProducts', () => {
  it('returns one product per category in fixed order', () => {
    const r = rankProducts(input)
    expect(r.map((p) => p.category)).toEqual(['savings', 'brokerage', 'card'])
  })
})

describe('buildResult', () => {
  it('composes take-home, match, roth, and budget', () => {
    const r = buildResult(input)
    expect(r.takeHomeAnnual).toBeGreaterThan(0)
    expect(r.employerMatchDollars).toBeCloseTo(2800, 0)
    expect(r.rothMonthly).toBeGreaterThan(0)
    expect(r.budget.needs + r.budget.wants + r.budget.savings).toBeCloseTo(r.takeHomeAnnual / 12, 0)
  })
})
```

- [ ] **Step 2:** Run to verify failure.

- [ ] **Step 3:** Implement `lib/calc/recommend.ts`.

```ts
import type { PaycheckInput, PaycheckResult, Product } from './types'
import { takeHome } from './tax'
import { match401k, rothTarget } from './retirement'
import { budgetSplit } from './budget'
import { productsForCategory } from '@/lib/data/products'

const PER_YEAR = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 } as const

export function rankProducts(_input: PaycheckInput): Product[] {
  const order: Product['category'][] = ['savings', 'brokerage', 'card']
  return order.map((c) => productsForCategory(c)[0]).filter(Boolean) as Product[]
}

export function buildResult(input: PaycheckInput): PaycheckResult {
  const match = match401k(input.grossAnnual, input.matchPercent, input.matchLimitPercent)
  const { federalTax, fica, stateTax, takeHomeAnnual } = takeHome(input, match.employeeDollars)
  const roth = rothTarget()
  const budget = budgetSplit(takeHomeAnnual / 12)
  return {
    takeHomeAnnual,
    takeHomePerCheck: takeHomeAnnual / PER_YEAR[input.payFrequency],
    federalTax, fica, stateTax,
    recommended401kPercent: match.recommendedPercent,
    employerMatchDollars: match.employerDollars,
    rothMonthly: roth.monthly,
    budget,
  }
}
```

- [ ] **Step 4:** Run to verify pass. All `tests/calc/` green: `npx vitest run`.

- [ ] **Step 5:** Commit. `git commit -m "feat: recommendation engine composing all calc modules"`

---

## Task 7: Calculator UI

**Files:**
- Create: `components/Calculator.tsx`, `components/Results.tsx`, `components/Disclaimer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `buildResult`, `rankProducts`, `COPY`.
- Produces: a working client-side calculator on `/`.

- [ ] **Step 1:** Create `components/Disclaimer.tsx` rendering `COPY.disclaimer` in muted text.

- [ ] **Step 2:** Create `components/Calculator.tsx` (client component): a mobile-first form with fields salary (number), state (select), pay frequency (select), employer match % and match limit %. On submit, call `buildResult`/`rankProducts` and render `<Results />`. All math runs client-side (no API needed).

- [ ] **Step 3:** Create `components/Results.tsx`: render take-home per check, the "contribute X% to get $Y free employer match" line, the Roth monthly target, the 50/30/20 budget, and the three `<ProductCard />`s (ProductCard built in Task 8). Always render `<Disclaimer />` and `<Disclosure />`.

- [ ] **Step 4:** Wire `app/page.tsx` to render a headline, short intro, and `<Calculator />`.

- [ ] **Step 5:** Manually verify.

Run: `npm run dev`, open `http://localhost:3000`, enter 70000 / IN / biweekly / 100 / 4.
Expected: take-home, a $2,800 match line, a Roth target, a budget, and three product cards render at 375px width.

- [ ] **Step 6:** Commit. `git commit -m "feat: interactive calculator UI"`

---

## Task 8: Affiliate routing + click logging

**Files:**
- Create: `app/go/[productId]/route.ts`, `prisma/schema.prisma`, `lib/db.ts`, `components/ProductCard.tsx`, `components/Disclosure.tsx`

**Interfaces:**
- Consumes: `getProduct`, Prisma client.
- Produces: `/go/[productId]` 302-redirects to the product's `affiliateUrl` after inserting a `ClickEvent`. `<ProductCard product={...} />` links to `/go/{id}` with `rel="sponsored nofollow"`.

- [ ] **Step 1:** Add Prisma + Postgres.

```bash
npm install prisma @prisma/client && npx prisma init
```

- [ ] **Step 2:** Define `prisma/schema.prisma` models.

```prisma
model ClickEvent {
  id        String   @id @default(cuid())
  productId String
  createdAt DateTime @default(now())
  referer   String?
}
model Subscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  source    String?
}
```

- [ ] **Step 3:** Create `lib/db.ts` (Prisma singleton) and run `npx prisma migrate dev --name init` against a Neon dev database in `.env`.

- [ ] **Step 4:** Create `app/go/[productId]/route.ts`.

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getProduct } from '@/lib/data/products'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: { productId: string } }) {
  const product = getProduct(params.productId)
  if (!product) return NextResponse.redirect(new URL('/', req.url))
  await prisma.clickEvent.create({ data: { productId: product.id, referer: req.headers.get('referer') } })
  return NextResponse.redirect(product.affiliateUrl, 302)
}
```

- [ ] **Step 5:** Create `components/Disclosure.tsx` (renders `COPY.disclosure`) and `components/ProductCard.tsx` linking to `/go/{product.id}` with `rel="sponsored nofollow"`.

- [ ] **Step 6:** Verify: dev server, click a product card, confirm redirect and a `ClickEvent` row (`npx prisma studio`).

- [ ] **Step 7:** Commit. `git commit -m "feat: affiliate redirect route + click logging + product cards"`

---

## Task 9: SEO comparison pages

**Files:**
- Create: `app/best/[slug]/page.tsx`

**Interfaces:**
- Consumes: `COMPARISONS`, `productsForCategory`, `getComparison`.
- Produces: statically generated pages at `/best/<slug>` with per-page `<title>`/meta description and product lists.

- [ ] **Step 1:** Implement `generateStaticParams` from `COMPARISONS` and `generateMetadata` from each comparison's title/metaDescription.

- [ ] **Step 2:** Render intro, `<Disclosure />`, and the category's `<ProductCard />` list.

- [ ] **Step 3:** Verify: visit `/best/best-high-yield-savings`; view source shows the right `<title>` and meta description.

- [ ] **Step 4:** Commit. `git commit -m "feat: SEO comparison pages generated from data"`

---

## Task 10: Email capture + personalized plan email

**Files:**
- Create: `app/api/subscribe/route.ts`, `lib/email.ts`, `components/EmailCapture.tsx`
- Modify: `components/Results.tsx` (add `<EmailCapture />`)

**Interfaces:**
- Consumes: Prisma, Resend.
- Produces: `POST /api/subscribe { email, source }` -> upserts `Subscriber`, sends the plan email, returns `{ ok: true }`.

- [ ] **Step 1:** `npm install resend`. Add `RESEND_API_KEY` to `.env.example`.

- [ ] **Step 2:** Create `lib/email.ts` with `sendPlanEmail(email: string)` using Resend (plain summary + a link back to the tool; the personalized numbers can be passed in or the email can just invite them back). Keep v1 simple: a welcome email with the disclaimer.

- [ ] **Step 3:** Create `app/api/subscribe/route.ts`: validate email, `prisma.subscriber.upsert`, call `sendPlanEmail`, handle errors with a JSON error response.

- [ ] **Step 4:** Create `components/EmailCapture.tsx`: email input + submit -> `fetch('/api/subscribe')`, success and error states.

- [ ] **Step 5:** Verify: submit an email in dev; confirm `Subscriber` row and that Resend logs a send (use a Resend test key).

- [ ] **Step 6:** Commit. `git commit -m "feat: email capture + plan email"`

---

## Task 11: Analytics events

**Files:**
- Create: `lib/analytics.ts`
- Modify: `app/layout.tsx` (init PostHog), `components/Calculator.tsx` (track `calc_completed`), `app/go/[productId]/route.ts` (track `affiliate_click`), `app/api/subscribe/route.ts` (track `email_captured`)

**Interfaces:**
- Produces: `track(event: string, props?: Record<string, unknown>)`.

- [ ] **Step 1:** `npm install posthog-js posthog-node`. Add `NEXT_PUBLIC_POSTHOG_KEY` to `.env.example`.

- [ ] **Step 2:** Create `lib/analytics.ts` exposing `track`. Wire the three events above.

- [ ] **Step 3:** Verify the three events appear in PostHog live events.

- [ ] **Step 4:** Commit. `git commit -m "feat: product analytics for calc/affiliate/email events"`

---

## Task 12: Compliance + footer + privacy

**Files:**
- Create: `app/privacy/page.tsx`
- Modify: `app/layout.tsx` (global footer with disclaimer + privacy link)

**Interfaces:**
- Produces: a privacy policy page and a persistent footer carrying `COPY.disclaimer`.

- [ ] **Step 1:** Add a footer in `app/layout.tsx` rendering `COPY.disclaimer` and a link to `/privacy`.

- [ ] **Step 2:** Write `app/privacy/page.tsx`: what data is collected (email, click events, analytics), why, and how to request deletion (your contact email).

- [ ] **Step 3:** Grep check: confirm `<Disclosure />` renders on `/`, every `/best/*`, and in `Results`. Confirm no component imports a raw `affiliateUrl` (only `products.ts` and the `/go` route reference it).

- [ ] **Step 4:** Commit. `git commit -m "feat: privacy page + global disclaimer footer"`

---

## Task 13: Deploy + launch checklist

**Files:**
- Create: `.env.example` (final), `README.md` (run/deploy notes)

- [ ] **Step 1:** Push to a private GitHub repo. Import into Vercel.

- [ ] **Step 2:** Set Vercel env vars: `DATABASE_URL` (Neon prod), `RESEND_API_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`. Run `prisma migrate deploy` on the prod database.

- [ ] **Step 3:** `npm run build` locally must pass before deploy.

- [ ] **Step 4:** Pre-launch checklist (do not skip):
  - [ ] Replace every `AFFILIATE_REPLACE` URL with a real approved affiliate link, or hide that product.
  - [ ] Verify 2026 tax constants against irs.gov and SSA.
  - [ ] Confirm `<Disclosure />` + `<Disclaimer />` show on all product surfaces.
  - [ ] Test the full funnel on a phone: calculator -> product click (redirects) -> email capture (email arrives).
  - [ ] Add a custom domain and set the canonical URL for SEO.

- [ ] **Step 5:** Commit + tag. `git commit -m "chore: deploy config + launch checklist" && git tag v1.0.0`

---

## Self-Review notes (for the implementer)

- **Spec coverage:** calculator (Tasks 1-7), comparison/SEO pages (Task 9), email capture (Task 10), affiliate routing (Task 8), analytics (Task 11), compliance (Tasks 1, 8, 12). All five funnel pieces are covered.
- **Extension points (out of scope for v1, by design):** non-single filing statuses, exact per-state progressive tax, PDF generation of the plan, multi-step quiz UX, A/B testing hooks.
- **The one risky assumption:** affiliate-program approval. Several programs gate on having a live content site with traffic. This tool plus the comparison pages is what satisfies that requirement, so build and deploy it before applying, then swap in real links at Task 13.
