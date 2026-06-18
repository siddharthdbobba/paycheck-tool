import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Disclosure from '@/components/Disclosure'
import EmailCapture from '@/components/EmailCapture'
import ProductCard from '@/components/ProductCard'
import RankingMethodology from '@/components/RankingMethodology'
import { COMPARISONS, getComparison } from '@/lib/data/comparisons'
import { productsForCategory } from '@/lib/data/products'
import { trackServer } from '@/lib/analytics-server'
import { BRAND, LAST_REVIEWED } from '@/lib/copy'

type BestPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return COMPARISONS.map((comparison) => ({ slug: comparison.slug }))
}

export async function generateMetadata({ params }: BestPageProps): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparison(slug)

  if (!comparison) {
    notFound()
  }

  return {
    title: comparison.title,
    description: comparison.metaDescription,
  }
}

export default async function BestPage({ params }: BestPageProps) {
  const { slug } = await params
  const comparison = getComparison(slug)

  if (!comparison) {
    notFound()
  }

  const products = productsForCategory(comparison.category)
  const comparisonRows = [
    {
      label: 'Best For',
      values: products.map((product) => product.bestForTag),
    },
    {
      label: 'Rating',
      values: products.map((product) => `${product.rating.toFixed(1)} out of 5`),
    },
    {
      label: 'Key Perks',
      values: products.map((product) => product.highlights.slice(0, 3).join(', ')),
    },
  ]
  const bestRating = Math.max(...products.map((product) => product.rating))
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: `${BRAND.shareUrl}/best/${slug}`,
    dateModified: LAST_REVIEWED.dateModified,
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the best option for ${comparison.category} for new grads?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: comparison.intro,
        },
      },
      {
        '@type': 'Question',
        name: 'Should I run my paycheck numbers first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Your take-home pay, 401k match, and monthly budget make it easier to choose accounts that fit your first job.',
        },
      },
    ],
  }

  await trackServer('best_page_viewed', { slug, category: comparison.category, product_count: products.length })

  return (
    <div className="min-h-screen bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 space-y-4">
          <Disclosure />
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
            {LAST_REVIEWED.label}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            {comparison.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{comparison.intro}</p>
          <RankingMethodology />
        </div>

        {/* Comparison Table */}
        <div className="mb-10">
          <div className="space-y-4 md:hidden">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                <h2 className="text-base font-semibold text-zinc-950">{product.name}</h2>
                <dl className="mt-3 space-y-3 text-sm">
                  {comparisonRows.map((row) => (
                    <div key={row.label} className="border-t border-zinc-100 pt-3 first:border-t-0 first:pt-0">
                      <dt className="font-medium text-zinc-600">{row.label}</dt>
                      <dd className="mt-1 text-zinc-900">{row.values[products.indexOf(product)]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <table className="hidden w-full overflow-hidden rounded-lg border border-zinc-200 bg-white text-sm shadow-sm md:table">
            <thead className="sticky top-16 z-10">
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th scope="col" className="px-4 py-3 text-left font-semibold text-zinc-700">Feature</th>
                {products.map((product) => (
                  <th key={product.id} scope="col" className="px-4 py-3 text-left font-semibold text-zinc-700">
                    <span className="block text-zinc-900">{product.name}</span>
                    <span className="mt-2 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                      Best for {product.bestForTag}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {comparisonRows.map((row) => (
                <tr key={row.label} className="even:bg-zinc-50">
                  <th scope="row" className="px-4 py-3 text-left font-medium text-zinc-600">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td
                      key={products[index].id}
                      className={
                        row.label === 'Rating' && products[index].rating === bestRating
                          ? 'px-4 py-3 font-semibold text-zinc-950'
                          : 'px-4 py-3 text-zinc-800'
                      }
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Cards (detailed) */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-zinc-900">Detailed Breakdown</h2>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} isTopPick={index === 0} />
          ))}
        </div>

        <div className="mt-10 space-y-4 rounded-lg border border-indigo-200 bg-indigo-50 p-5">
          <h2 className="text-lg font-semibold text-indigo-950">Run your numbers first</h2>
          <p className="text-sm leading-6 text-indigo-900">
            See your take-home pay, full employer match, and budget before picking accounts.
          </p>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-md bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Run your numbers
          </Link>
        </div>

        <div className="mt-6">
          <EmailCapture />
        </div>
      </main>
    </div>
  )
}
