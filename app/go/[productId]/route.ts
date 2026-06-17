import { NextRequest, NextResponse } from 'next/server'
import { getProduct } from '@/lib/data/products'
import { prisma } from '@/lib/db'
import { trackServer } from '@/lib/analytics-server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params
  const product = getProduct(productId)
  if (!product) return NextResponse.redirect(new URL('/', req.url))
  await prisma.clickEvent.create({ data: { productId: product.id, referer: req.headers.get('referer') } })
  await trackServer('affiliate_click', { productId: product.id, category: product.category })
  if (product.affiliateUrl.includes('AFFILIATE_REPLACE')) {
    return NextResponse.redirect(new URL('/?pending=1', req.url), 302)
  }
  return NextResponse.redirect(product.affiliateUrl, 302)
}
