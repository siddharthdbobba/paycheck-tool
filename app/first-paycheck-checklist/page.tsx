import type { Metadata } from 'next'
import Link from 'next/link'
import Disclosure from '@/components/Disclosure'
import EmailCapture from '@/components/EmailCapture'
import { trackServer } from '@/lib/analytics-server'

export const metadata: Metadata = {
  title: 'Your First Paycheck: Complete Checklist for 2026 — What to Do Step by Step',
  description:
    'Got your first real paycheck? Here\'s exactly what to do: check your stub, set up your 401k, open a Roth IRA, build a budget, and start investing. No fluff, just the steps.',
}

export default async function FirstPaycheckGuidePage() {
  await trackServer('checklist_viewed')
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What should I do with my first paycheck?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check your pay stub, enroll in your 401k up to the full match, build an emergency fund, open a Roth IRA, start credit history, and make a 50/30/20 budget.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I know my real take-home pay?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use salary, state, pay frequency, and employer match details to estimate taxes, take-home pay, Roth IRA targets, and 50/30/20 budget amounts.',
        },
      },
    ],
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <article className="prose prose-zinc prose-sm max-w-none">
          <h1>Your First Paycheck: The Complete New Grad Checklist (2026)</h1>
          <p className="lead text-zinc-500">
            You got the job. You signed the offer. Now your first paycheck is about to hit your bank
            account — and you have no idea what to do with it. This guide walks you through every
            step, in order, so you don't leave money on the table.
          </p>

          <h2>Step 1: Check Your Pay Stub (Takes 5 Minutes)</h2>
          <p>
            Before you do anything else, look at your first pay stub carefully. Most employers mess
            something up on the first check. Three things to verify:
          </p>
          <ul>
            <li><strong>Your name and SSN</strong> — typos happen, and they cause tax headaches.</li>
            <li><strong>Your pay rate and hours</strong> — make sure the gross pay matches what you expected.</li>
            <li><strong>Your withholding allowances</strong> — check your W-4 is set correctly. Too many allowances = you'll owe at tax time. Too few = you're giving the IRS an interest-free loan.</li>
          </ul>
          <p>
            If something looks wrong, email payroll immediately. It's easier to fix before the next check.
          </p>

          <h2>Step 2: Enroll in Your 401k (Takes 10 Minutes, Worth Thousands)</h2>
          <p>
            This is the highest-return financial move you will ever make, and it takes 10 minutes.
            Most employers offer a <strong>401k match</strong>: if you contribute X% of your salary,
            they match it dollar-for-dollar up to Y% of your salary.
          </p>
          <p>
            For example, if your employer matches 100% up to 4% of your $70,000 salary:
          </p>
          <ul>
            <li>You contribute 4% = $2,800/year</li>
            <li>Your employer adds $2,800/year</li>
            <li>Total: $5,600/year in retirement savings</li>
            <li>That $2,800 is free money. Don't leave it on the table.</li>
          </ul>
          <p>
            <strong>Rule:</strong> Contribute at least enough to get the full match. Then decide
            whether to contribute more. Use the{' '}
            <Link href="/" className="text-indigo-600 underline underline-offset-2">
              Paycheck Calculator
            </Link>{' '}
            to see how different contribution levels affect your take-home pay.
          </p>

          <h2>Step 3: Open a High-Yield Savings Account (Takes 15 Minutes)</h2>
          <p>
            Your big bank savings account is probably paying you 0.01% APY. On $10,000, that's
            $1/year. A high-yield savings account pays 3.5–4.5% APY — that's $350–$450/year on the
            same $10,000. Same safety (FDIC insured), no fees, way more interest.
          </p>
          <p>
            <strong>Where to put your emergency fund:</strong> 3–6 months of expenses in a HYSA.
            On a $3,000/month spend, that's $9,000–$18,000 earning 4% instead of 0.01%.
          </p>
          <p>
            See our full comparison of{' '}
            <Link href="/best/best-high-yield-savings" className="text-indigo-600 underline underline-offset-2">
              best high-yield savings accounts for new grads
            </Link>.
          </p>

          <h2>Step 4: Open a Roth IRA (Takes 20 Minutes)</h2>
          <p>
            A Roth IRA is the single best investment account for a young person. Here's why:
          </p>
          <ul>
            <li>You contribute money you've already paid taxes on</li>
            <li>It grows tax-free forever</li>
            <li>You can withdraw your contributions (not earnings) anytime, penalty-free</li>
            <li>The 2026 contribution limit is $7,000</li>
          </ul>
          <p>
            At 22, maxing your Roth IRA ($583/month) with 7% average growth becomes roughly
            $1.2 million by age 65. Tax free. Start with $50/month if that's all you can do —
            consistency matters more than the amount.
          </p>
          <p>
            Compare the best{' '}
            <Link href="/best/best-roth-ira-brokerages" className="text-indigo-600 underline underline-offset-2">
              Roth IRA brokerages for beginners
            </Link>.
          </p>

          <h2>Step 5: Get a Starter Credit Card (Takes 10 Minutes)</h2>
          <p>
            Building credit early saves you thousands later — on car loans, mortgages, insurance,
            and even apartment applications. The formula is simple:
          </p>
          <ol>
            <li>Get a card with no annual fee</li>
            <li>Put one recurring bill on it (Netflix, Spotify, gas)</li>
            <li>Set autopay to pay in full every month</li>
            <li>Never carry a balance — credit card debt at 28% APR will destroy your finances</li>
          </ol>
          <p>
            Do this and your credit score hits 750+ in two years. See the best{' '}
            <Link href="/best/best-first-credit-cards" className="text-indigo-600 underline underline-offset-2">
              starter credit cards for new grads
            </Link>.
          </p>

          <h2>Step 6: Set Up the 50/30/20 Budget (Takes 5 Minutes)</h2>
          <p>
            The simplest budget that works: divide your after-tax income into three buckets.
          </p>
          <ul>
            <li><strong>50% Needs</strong> — rent, utilities, groceries, transport, minimum debt payments</li>
            <li><strong>30% Wants</strong> — dining out, hobbies, subscriptions, travel</li>
            <li><strong>20% Savings</strong> — retirement (Roth IRA / 401k), emergency fund, extra debt payments</li>
          </ul>
          <p>
            Use the{' '}
            <Link href="/" className="text-indigo-600 underline underline-offset-2">
              Paycheck Calculator
            </Link>{' '}
            to see your 50/30/20 numbers based on your actual salary and state.
          </p>

          <h2>The 6-Month Timeline</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-3 py-2 text-left font-semibold">Month</th>
                  <th className="px-3 py-2 text-left font-semibold">Action</th>
                  <th className="px-3 py-2 text-left font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr><td className="px-3 py-2">1</td><td className="px-3 py-2">First paycheck — check stub + enroll in 401k</td><td className="px-3 py-2">15 min</td></tr>
                <tr><td className="px-3 py-2">2</td><td className="px-3 py-2">Open High-Yield Savings, start emergency fund</td><td className="px-3 py-2">15 min</td></tr>
                <tr><td className="px-3 py-2">3</td><td className="px-3 py-2">Open Roth IRA, make first contribution</td><td className="px-3 py-2">20 min</td></tr>
                <tr><td className="px-3 py-2">4</td><td className="px-3 py-2">Get starter credit card, set autopay</td><td className="px-3 py-2">10 min</td></tr>
                <tr><td className="px-3 py-2">5</td><td className="px-3 py-2">Review budget, cut unnecessary subscriptions</td><td className="px-3 py-2">30 min</td></tr>
                <tr><td className="px-3 py-2">6</td><td className="px-3 py-2">Check-in: review progress, adjust as needed</td><td className="px-3 py-2">15 min</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Waiting to invest.</strong> Starting at 22 vs 32 costs you ~$200,000 in potential growth. Start with $50/month.</li>
            <li><strong>Buying an expensive car.</strong> A $600/month car payment on a $60k salary is 15% of take-home. Stick with a reliable used car.</li>
            <li><strong>Ignoring your credit score.</strong> Check it free at Credit Karma or Experian. Fix errors early.</li>
            <li><strong>Paying for financial advice.</strong> You don't need a $3,000 course. Index funds + Roth IRA + 401k match = 90% of what matters.</li>
          </ul>

          <div className="not-prose mt-10 rounded-lg border border-indigo-200 bg-indigo-50 p-6">
            <h3 className="text-base font-semibold text-indigo-900">Run Your Numbers</h3>
            <p className="mt-1 text-sm text-indigo-700">
              See your actual take-home pay, 401k match, Roth IRA target, and budget — personalized
              to your salary and state.
            </p>
            <Link
              href="/"
              className="mt-3 inline-flex min-h-12 items-center rounded-md bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Run your numbers
            </Link>
          </div>

          <div className="not-prose mt-6">
            <EmailCapture />
          </div>

          <div className="mt-8 border-t border-zinc-100 pt-6">
            <Disclosure />
          </div>
        </article>
      </main>
    </div>
  )
}
