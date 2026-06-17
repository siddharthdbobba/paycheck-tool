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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
