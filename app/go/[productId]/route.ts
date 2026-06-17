import { NextRequest, NextResponse } from 'next/server'
import { getProduct } from '@/lib/data/products'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params
  const product = getProduct(productId)
  if (!product) return NextResponse.redirect(new URL('/', req.url))
  await prisma.clickEvent.create({ data: { productId: product.id, referer: req.headers.get('referer') } })
  return NextResponse.redirect(product.affiliateUrl, 302)
}
