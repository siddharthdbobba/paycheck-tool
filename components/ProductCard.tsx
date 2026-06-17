'use client'

import type { Product } from '@/lib/calc/types'
import { track } from '@/lib/analytics'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold text-zinc-900">{product.name}</h3>
      <p className="mt-1 text-sm text-zinc-600">{product.blurb}</p>
      {product.highlights.length > 0 && (
        <ul className="mt-2 space-y-1">
          {product.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-1.5 text-sm text-zinc-700">
              <span className="mt-0.5 text-green-500" aria-hidden="true">&#10003;</span>
              {h}
            </li>
          ))}
        </ul>
      )}
      {product.payoutNote && (
        <p className="mt-2 text-xs text-zinc-500">{product.payoutNote}</p>
      )}
      <a
        href={`/go/${product.id}`}
        rel="sponsored nofollow"
        target="_blank"
        onClick={() => track('product_link_clicked', { product_id: product.id, product_name: product.name, category: product.category })}
        className="mt-3 inline-block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        Learn More
      </a>
    </div>
  )
}
