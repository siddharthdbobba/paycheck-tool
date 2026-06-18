import type { Metadata } from 'next'
import Calculator from '@/components/Calculator'
import { BRAND, LAST_REVIEWED } from '@/lib/copy'
import { jsonLdScript } from '@/lib/json-ld'

type HomeProps = {
  searchParams: Promise<{ hook?: string | string[] }>
}

const HERO_HOOKS = {
  match: {
    headline: 'Stop missing free 401k money',
    accent: 'Find the exact match dollars hiding in your first paycheck.',
    title: 'Stop Missing Free 401k Money',
    description: 'Find the exact employer match dollars hiding in your first paycheck.',
  },
  paycheck: {
    headline: 'See your real first paycheck',
    accent: 'Turn your salary into take-home pay, free 401k match, and a simple 50/30/20 plan.',
    title: 'New Grad Paycheck Calculator',
    description: 'Turn your salary into take-home pay, free 401k match, and a simple 50/30/20 plan.',
  },
  budget: {
    headline: 'Turn your first salary into a plan',
    accent: 'Get your take-home pay, free match, and monthly budget from two required inputs.',
    title: 'Turn your first salary into a plan',
    description: 'Get your take-home pay, free employer match, and monthly budget from two required inputs.',
  },
} as const

function pickHook(value: string | string[] | undefined) {
  const key = Array.isArray(value) ? value[0] : value
  return key && key in HERO_HOOKS ? HERO_HOOKS[key as keyof typeof HERO_HOOKS] : HERO_HOOKS.paycheck
}

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const hook = pickHook((await searchParams).hook)

  return {
    title: hook.title,
    description: hook.description,
    alternates: {
      canonical: BRAND.shareUrl,
    },
    openGraph: {
      title: hook.title,
      description: hook.description,
    },
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const hook = pickHook((await searchParams).hook)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'New Grad Paycheck Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: BRAND.shareUrl,
    dateModified: LAST_REVIEWED.dateModified,
    description: "See your real take-home pay, max your employer's 401k match, and build a 50/30/20 budget.",
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <div id="calculator" className="mx-auto max-w-lg px-4 py-6">
        <div className="mb-5 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            {hook.headline}
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-700">
            {hook.accent}
          </p>
        </div>
        <Calculator />
      </div>
    </div>
  )
}
