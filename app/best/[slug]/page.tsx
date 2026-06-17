import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Disclosure from '@/components/Disclosure'
import ProductCard from '@/components/ProductCard'
import { COMPARISONS, getComparison } from '@/lib/data/comparisons'
import { productsForCategory } from '@/lib/data/products'

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

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            {comparison.title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{comparison.intro}</p>
          <Disclosure />
        </div>

        {/* Comparison Table */}
        <div className="mb-10 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-4 py-3 text-left font-semibold text-zinc-700">Feature</th>
                {products.map((product) => (
                  <th key={product.id} className="px-4 py-3 text-left font-semibold text-zinc-700">
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr>
                <td className="px-4 py-3 font-medium text-zinc-600">Best For</td>
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-3 text-zinc-800">{product.blurb}</td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-zinc-600">Key Perks</td>
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-3">
                    <ul className="list-inside list-disc text-xs text-zinc-700">
                      {product.highlights.slice(0, 3).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-zinc-600">Payout</td>
                {products.map((product) => (
                  <td key={product.id} className="px-4 py-3 text-xs text-zinc-500">{product.payoutNote}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Product Cards (detailed) */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-zinc-900">Detailed Breakdown</h2>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer Disclosure */}
        <div className="mt-10 border-t border-zinc-100 pt-4">
          <Disclosure />
        </div>
      </main>
    </div>
  )
}
