import { ImageResponse } from 'next/og'
import { BRAND } from '@/lib/copy'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ maxWidth: 920, fontSize: 82, lineHeight: 0.96, fontWeight: 900, letterSpacing: 0 }}>
            See your real first paycheck
          </div>
          <div style={{ maxWidth: 760, color: '#d4d4d8', fontSize: 34, lineHeight: 1.25, fontWeight: 500 }}>
            Estimate take-home pay, your 401k match, and a simple first-job budget before payday.
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
