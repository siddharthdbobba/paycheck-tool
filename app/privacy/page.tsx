import type { Metadata } from 'next'
import Disclosure from '@/components/Disclosure'

export const metadata: Metadata = {
  title: 'Privacy Policy — New Grad Paycheck Calculator',
  description: 'How we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-10 text-sm text-zinc-700">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900">Privacy Policy</h1>
      <p className="mb-6 text-zinc-500">Last updated: June 2026</p>

      <section className="mb-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-900">What We Collect</h2>
        <p>
          <strong>Email address.</strong> If you choose to subscribe via the email capture form, we store your email address
          and the date/time you signed up. We use this to send you your personalized plan and occasional updates.
        </p>
        <p>
          <strong>Click events.</strong> When you click an affiliate product link, we log the product ID, the referring page,
          and a timestamp. This helps us understand which products are most useful to our readers.
        </p>
        <p>
          <strong>Analytics.</strong> We use PostHog (self-hosted or cloud) to track anonymized page views, calculator usage,
          and feature interactions. No personally identifiable information is sent to analytics.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-900">Why We Collect It</h2>
        <p>
          We collect this data solely to improve the tool, understand what content resonates with our audience, and
          maintain the affiliate links that keep this site free.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-900">Cookies</h2>
        <p>
          This site does not set tracking cookies. PostHog uses local storage for session identification, which does not
          leave your browser.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-900">Data Sharing</h2>
        <p>
          We do not sell, rent, or share your data with third parties. Affiliate clicks go directly to the product
          partner through the link you clicked. Those partners have their own privacy policies.
        </p>
      </section>

      <section className="mb-8 space-y-3">
        <h2 className="text-base font-semibold text-zinc-900">Your Rights</h2>
        <p>
          You can request deletion of your data at any time by emailing{' '}
          <a href="mailto:siddharthdbobba@gmail.com" className="text-indigo-600 underline underline-offset-2">
            siddharthdbobba@gmail.com
          </a>
          . We will remove your subscriber record and associated click events within 7 days.
        </p>
      </section>

      <Disclosure />
    </div>
  )
}
