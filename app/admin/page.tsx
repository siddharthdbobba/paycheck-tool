import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const [subscriberCount, clickCount, recentSubscribers, recentClicks] = await Promise.all([
    prisma.subscriber.count(),
    prisma.clickEvent.count(),
    prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
    prisma.clickEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
  ])

  // Group clicks by product
  const clicksByProduct = recentClicks.reduce<Record<string, number>>((acc, c) => {
    acc[c.productId] = (acc[c.productId] || 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900">Admin Dashboard</h1>

        {/* Stats cards */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Subscribers</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900">{subscriberCount}</p>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Clicks</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900">{clickCount}</p>
          </div>
        </div>

        {/* Recent subscribers */}
        <div className="mb-8">
          <h2 className="mb-3 text-base font-semibold text-zinc-900">Recent Subscribers</h2>
          {recentSubscribers.length === 0 ? (
            <p className="text-sm text-zinc-500">No subscribers yet.</p>
          ) : (
            <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    <th className="px-4 py-2 text-left font-semibold text-zinc-700">Email</th>
                    <th className="px-4 py-2 text-left font-semibold text-zinc-700">Source</th>
                    <th className="px-4 py-2 text-left font-semibold text-zinc-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {recentSubscribers.map((s) => (
                    <tr key={s.id}>
                      <td className="px-4 py-2 text-zinc-800">{s.email}</td>
                      <td className="px-4 py-2 text-xs text-zinc-500">{s.source || '-'}</td>
                      <td className="px-4 py-2 text-xs text-zinc-500">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent clicks */}
        <div>
          <h2 className="mb-3 text-base font-semibold text-zinc-900">Recent Clicks</h2>
          {recentClicks.length === 0 ? (
            <p className="text-sm text-zinc-500">No clicks yet.</p>
          ) : (
            <>
              <div className="mb-4 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50">
                      <th className="px-4 py-2 text-left font-semibold text-zinc-700">Product</th>
                      <th className="px-4 py-2 text-left font-semibold text-zinc-700">Clicks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {Object.entries(clicksByProduct)
                      .sort(([, a], [, b]) => b - a)
                      .map(([productId, count]) => (
                        <tr key={productId}>
                          <td className="px-4 py-2 text-zinc-800">{productId}</td>
                          <td className="px-4 py-2 font-semibold text-zinc-900">{count}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <details className="text-sm text-zinc-500">
                <summary className="cursor-pointer hover:text-zinc-700">View raw click log</summary>
                <div className="mt-2 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 bg-zinc-50">
                        <th className="px-4 py-2 text-left font-semibold text-zinc-700">Product</th>
                        <th className="px-4 py-2 text-left font-semibold text-zinc-700">Referer</th>
                        <th className="px-4 py-2 text-left font-semibold text-zinc-700">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {recentClicks.map((c) => (
                        <tr key={c.id}>
                          <td className="px-4 py-2 text-zinc-800">{c.productId}</td>
                          <td className="px-4 py-2 text-xs text-zinc-500">{c.referer || '-'}</td>
                          <td className="px-4 py-2 text-xs text-zinc-500">
                            {new Date(c.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
