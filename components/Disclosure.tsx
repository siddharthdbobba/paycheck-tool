import { COPY } from '@/lib/copy'

export default function Disclosure() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 text-zinc-700 shadow-sm">
      <p className="font-semibold text-zinc-950">How we make money — and why these picks stay honest.</p>
      <p>{COPY.disclosure}</p>
    </div>
  )
}
