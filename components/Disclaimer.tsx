import { COPY } from '@/lib/copy'

export default function Disclaimer() {
  return (
    <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
      {COPY.disclaimer}
    </p>
  )
}
