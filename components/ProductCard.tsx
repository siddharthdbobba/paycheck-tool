'use client'

import type { Product } from '@/lib/calc/types'
import { track } from '@/lib/analytics'

interface ProductCardProps {
  product: Product
  isTopPick?: boolean
}

function starsForRating(rating: number): string {
  const roundedToHalf = Math.round(rating * 2) / 2
  const fullStars = Math.floor(roundedToHalf)
  const hasHalfStar = roundedToHalf % 1 !== 0
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0))

  return `${'★'.repeat(fullStars)}${hasHalfStar ? '½' : ''}${'☆'.repeat(emptyStars)}`
}

export default function ProductCard({ product, isTopPick = false }: ProductCardProps) {
  const hasPlaceholderAffiliateUrl = product.affiliateUrl.includes('AFFILIATE_REPLACE')

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight text-zinc-950">{product.headlineStat.value}</p>
          <p className="text-xs font-medium uppercase text-zinc-600">{product.headlineStat.label}</p>
        </div>
        {isTopPick && (
          <span className="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-xs font-bold uppercase text-amber-950">
            #1 Pick
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-800">
          Best for {product.bestForTag}
        </span>
        <span className="text-sm font-semibold text-zinc-800" aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}>
          {product.rating.toFixed(1)} <span className="text-amber-500" aria-hidden="true">{starsForRating(product.rating)}</span>
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-zinc-900">{product.name}</h3>
      <p className="mt-1 text-sm text-zinc-600">{product.blurb}</p>
      {product.reason && (
        <p className="mt-3 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-950">
          {product.reason}
        </p>
      )}
      {product.highlights.length > 0 && (
        <ul className="mt-3 space-y-1">
          {product.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-1.5 text-sm text-zinc-700">
              <span className="mt-0.5 text-green-500" aria-hidden="true">&#10003;</span>
              {h}
            </li>
          ))}
        </ul>
      )}
      {hasPlaceholderAffiliateUrl ? (
        <button
          type="button"
          disabled
          className="mt-4 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-md bg-zinc-200 px-4 py-3 text-center text-sm font-bold text-zinc-600"
        >
          Coming soon
        </button>
      ) : (
        <a
          href={`/go/${product.id}`}
          rel="sponsored nofollow"
          target="_blank"
          onClick={() => track('product_link_clicked', { product_id: product.id, product_name: product.name, category: product.category })}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-indigo-700 px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-indigo-800"
        >
          {product.ctaLabel} →
        </a>
      )}
    </div>
  )
}
