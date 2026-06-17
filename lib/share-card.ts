import type { PaycheckResult } from '@/lib/calc/types'
import { BRAND } from '@/lib/copy'

const CARD_WIDTH = 1080
const CARD_HEIGHT = 1920
const SHARE_FILE_NAME = 'my-paycheck.png'
const SHARE_UTM_SOURCE = 'ig_share'

function usd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export type ShareCardCopy = {
  hero: string
  supporting: [string, string, string]
  footer: string
  caption: string
}

export function buildShareUrl(): URL {
  const url = new URL(BRAND.shareUrl)
  url.searchParams.set('utm_source', SHARE_UTM_SOURCE)
  return url
}

export function buildShareCardCopy(result: PaycheckResult): ShareCardCopy {
  const hero = result.employerMatchDollars > 0
    ? `I'm leaving ${usd(result.employerMatchDollars)}/yr in free 401k match on the table`
    : `My real take-home: ${usd(result.takeHomePerCheck)}/check`

  return {
    hero,
    supporting: [
      `Take-home: ${usd(result.takeHomePerCheck)}/check`,
      `Roth target: ${usd(result.rothMonthly)}/mo`,
      `50/30/20: ${usd(result.budget.needs)} needs • ${usd(result.budget.wants)} wants • ${usd(result.budget.savings)} savings`,
    ],
    footer: `${BRAND.handle} • ${BRAND.shareUrl}`,
    caption: 'Found out how much of my first paycheck I actually keep',
  }
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word
    if (context.measureText(candidate).width <= maxWidth || currentLine.length === 0) {
      currentLine = candidate
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

function drawRoundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
  context.fill()
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Could not create share image.'))
      }
    }, 'image/png')
  })
}

export async function createShareCardFile(result: PaycheckResult): Promise<File> {
  const copy = buildShareCardCopy(result)
  const canvas = document.createElement('canvas')
  canvas.width = CARD_WIDTH
  canvas.height = CARD_HEIGHT

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas is not supported in this browser.')
  }

  context.fillStyle = '#0a0f0d'
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT)

  context.fillStyle = '#10b981'
  context.fillRect(0, 0, CARD_WIDTH, 28)
  context.fillRect(0, CARD_HEIGHT - 28, CARD_WIDTH, 28)

  context.fillStyle = 'rgba(16, 185, 129, 0.14)'
  drawRoundRect(context, 80, 260, 920, 1180, 56)

  context.fillStyle = '#ecfdf5'
  context.font = '900 88px Arial, sans-serif'
  context.textBaseline = 'top'
  const heroLines = wrapText(context, copy.hero, 820)
  let y = 360
  for (const line of heroLines) {
    context.fillText(line, 130, y)
    y += 112
  }

  y += 80
  context.font = '700 42px Arial, sans-serif'
  for (const line of copy.supporting) {
    context.fillStyle = '#d1fae5'
    drawRoundRect(context, 130, y, 820, 104, 32)
    context.fillStyle = '#022c22'
    context.fillText(line, 168, y + 30)
    y += 132
  }

  context.fillStyle = '#10b981'
  context.font = '900 54px Arial, sans-serif'
  context.fillText('New grad paycheck reality check', 130, 1500)

  context.fillStyle = '#a7f3d0'
  context.font = '600 34px Arial, sans-serif'
  context.fillText(copy.footer, 130, 1668)

  const blob = await canvasToBlob(canvas)
  return new File([blob], SHARE_FILE_NAME, { type: 'image/png' })
}
