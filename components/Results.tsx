import type { PaycheckResult, Product } from '@/lib/calc/types'
import Disclaimer from './Disclaimer'
import Disclosure from './Disclosure'
import ProductCard from './ProductCard'
import EmailCapture from './EmailCapture'

interface ResultsProps {
  result: PaycheckResult
  products: Product[]
}

function usd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function Results({ result, products }: ResultsProps) {
  const {
    takeHomePerCheck,
    recommended401kPercent,
    employerMatchDollars,
    rothMonthly,
    budget,
  } = result

  return (
    <div className="mt-6 space-y-6">
      {/* Take-home */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Take-Home Per Paycheck</p>
        <p className="mt-1 text-3xl font-bold text-zinc-900">{usd(takeHomePerCheck)}</p>
      </div>

      {/* 401k match */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-zinc-700">
          Contribute {recommended401kPercent}% to get {usd(employerMatchDollars)} in free employer match
        </p>
      </div>

      {/* Roth IRA */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Roth IRA Monthly Target</p>
        <p className="mt-1 text-2xl font-bold text-zinc-900">{usd(rothMonthly)}<span className="text-base font-normal text-zinc-500">/mo</span></p>
      </div>

      {/* 50/30/20 Budget */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-zinc-500 uppercase tracking-wide mb-3">Monthly Budget (50/30/20)</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-600">Needs (50%)</span>
            <span className="font-semibold text-zinc-900">{usd(budget.needs)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-600">Wants (30%)</span>
            <span className="font-semibold text-zinc-900">{usd(budget.wants)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-600">Savings (20%)</span>
            <span className="font-semibold text-zinc-900">{usd(budget.savings)}</span>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      {products.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">Recommended Accounts</p>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Email Capture */}
      <EmailCapture />

      {/* Disclosures */}
      <div className="border-t border-zinc-100 pt-4">
        <Disclaimer />
        <Disclosure />
      </div>
    </div>
  )
}
