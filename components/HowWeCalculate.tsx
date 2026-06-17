export default function HowWeCalculate() {
  return (
    <details className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
      <summary className="cursor-pointer font-semibold text-zinc-950">How we calculate</summary>
      <div className="mt-3 space-y-2 leading-6">
        <p>
          Estimates use the 2026 tax year, the federal standard deduction, current federal brackets,
          and common payroll-tax constants. State tax is simplified for planning.
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            IRS: 2026 federal brackets and standard deduction feed the federal income-tax estimate.
            <a
              href="https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026"
              rel="noopener"
              target="_blank"
              className="ml-1 font-medium text-indigo-700 underline underline-offset-2"
            >
              IRS source
            </a>
          </li>
          <li>
            SSA: Social Security is 6.2% and Medicare is 1.45% for FICA payroll tax.
            <a
              href="https://www.ssa.gov/oact/progdata/taxRates.html"
              rel="noopener"
              target="_blank"
              className="ml-1 font-medium text-indigo-700 underline underline-offset-2"
            >
              SSA source
            </a>
          </li>
          <li>401k match: uses your entered match rate and salary limit.</li>
          <li>Budget: splits estimated monthly take-home into 50% needs, 30% wants, and 20% savings.</li>
        </ul>
      </div>
    </details>
  )
}
