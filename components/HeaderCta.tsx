'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HeaderCta() {
  const pathname = usePathname()

  if (pathname === '/' || pathname.startsWith('/best')) {
    return null
  }

  return (
    <Link
      href="/"
      className="min-h-12 rounded-md px-3 py-3 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
    >
      Run your numbers
    </Link>
  )
}
