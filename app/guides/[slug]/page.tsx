import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import { BRAND, COPY, LAST_REVIEWED } from '@/lib/copy'
import { allGuides, getGuide } from '@/lib/data/guides'

type GuidePageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function generateStaticParams() {
  return allGuides().map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `/guides/${guide.slug}`,
    },
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params
  const guide = getGuide(slug)

  if (!guide) {
    notFound()
  }

  const guideUrl = `${BRAND.shareUrl}/guides/${guide.slug}`
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: guideUrl,
    dateModified: LAST_REVIEWED.dateModified,
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: BRAND.shareUrl },
          { name: 'Guides', item: `${BRAND.shareUrl}/guides` },
          { name: guide.title, item: guideUrl },
        ]}
      />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <article className="rounded-none">
          <div className="border-b border-zinc-200 pb-8">
            <Link
              href="/guides"
              className="text-sm font-semibold text-indigo-700 underline underline-offset-2 hover:text-indigo-900"
            >
              Guides
            </Link>
            <p className="mt-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
              {LAST_REVIEWED.label}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-4xl">
              {guide.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-700">{guide.summary}</p>
          </div>

          <div className="mt-8 space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-zinc-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 pl-0">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {section.subsections && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.heading} className="border-l-2 border-indigo-200 pl-4">
                        <h3 className="text-lg font-semibold tracking-tight text-zinc-950">
                          {subsection.heading}
                        </h3>
                        <div className="mt-2 space-y-3 text-sm leading-6 text-zinc-700">
                          {subsection.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                          {subsection.bullets && (
                            <ul className="space-y-2">
                              {subsection.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-2">
                                  <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-indigo-500" aria-hidden="true" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          <section className="mt-10 border-y border-zinc-200 py-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-950">Next steps</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href="/"
                className="rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm leading-6 text-indigo-950 transition-colors hover:border-indigo-300 hover:bg-indigo-100"
              >
                <span className="block font-semibold">Run the paycheck calculator</span>
                <span className="mt-1 block text-indigo-800">
                  Estimate take-home pay, employer match, and 50/30/20 budget amounts.
                </span>
              </Link>
              <Link
                href={guide.bestLink.href}
                className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-100"
              >
                <span className="block font-semibold text-zinc-950">{guide.bestLink.label}</span>
                <span className="mt-1 block">{guide.bestLink.description}</span>
              </Link>
              <Link
                href={guide.supportLink.href}
                className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-100"
              >
                <span className="block font-semibold text-zinc-950">{guide.supportLink.label}</span>
                <span className="mt-1 block">{guide.supportLink.description}</span>
              </Link>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-bold tracking-tight text-zinc-950">Related guides</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {guide.relatedLinks.map((relatedLink) => (
                <Link
                  key={relatedLink.href}
                  href={relatedLink.href}
                  className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-100"
                >
                  <span className="block font-semibold text-zinc-950">{relatedLink.label}</span>
                  <span className="mt-1 block">{relatedLink.description}</span>
                </Link>
              ))}
            </div>
          </section>

          {guide.sourceLinks && (
            <section className="mt-8">
              <h2 className="text-xl font-bold tracking-tight text-zinc-950">Sources</h2>
              <div className="mt-4 grid gap-3">
                {guide.sourceLinks.map((sourceLink) => (
                  <a
                    key={sourceLink.href}
                    href={sourceLink.href}
                    className="rounded-lg border border-zinc-200 bg-white p-4 text-sm leading-6 text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-100"
                  >
                    <span className="block font-semibold text-zinc-950">{sourceLink.label}</span>
                    <span className="mt-1 block">{sourceLink.description}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            <h2 className="text-base font-semibold text-amber-950">Estimates, not advice</h2>
            <p className="mt-2">
              {COPY.disclaimer} This guide is not financial, tax, legal, or investment advice.
              Consult a qualified professional for decisions specific to your situation. Read the{' '}
              <Link href="/methodology" className="font-semibold underline underline-offset-2">
                methodology
              </Link>
              .
            </p>
          </section>
        </article>
      </main>
    </div>
  )
}
