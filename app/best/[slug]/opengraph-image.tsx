import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { BRAND } from '@/lib/copy'
import { getComparison } from '@/lib/data/comparisons'

type OgImageProps = {
  params: Promise<{ slug: string }>
}

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params
  const comparison = getComparison(slug)

  if (!comparison) {
    notFound()
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090b',
          color: '#fafafa',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#34d399', fontSize: 28, fontWeight: 700 }}>
          <div style={{ width: 22, height: 22, background: '#34d399', borderRadius: 999 }} />
          Paycheck Tool
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ color: '#34d399', fontSize: 30, fontWeight: 800 }}>New grad money picks</div>
          <div style={{ maxWidth: 940, fontSize: 70, lineHeight: 1, fontWeight: 900, letterSpacing: 0 }}>
            {comparison.title}
          </div>
          <div style={{ maxWidth: 760, color: '#d4d4d8', fontSize: 30, lineHeight: 1.25, fontWeight: 500 }}>
            Ranked by fees, eligibility, APY or rewards value, and best-fit use case.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#a1a1aa', fontSize: 28 }}>
          <div>{BRAND.handle}</div>
          <div style={{ color: '#34d399', fontWeight: 700 }}>{BRAND.shareUrl}</div>
        </div>
      </div>
    ),
    size,
  )
}
