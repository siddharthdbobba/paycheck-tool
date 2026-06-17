import Calculator from '@/components/Calculator'

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="mx-auto max-w-lg px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            New Grad Paycheck Calculator
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            See your real take-home pay, max your employer match, and build a simple budget for your first job.
          </p>
        </div>
        <Calculator />
      </main>
    </div>
  )
}
