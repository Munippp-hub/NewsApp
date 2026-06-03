export default function SectionHeader({ title, subtitle, accent = false }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className={`font-display font-bold text-xl ${accent ? 'text-accent-red' : 'text-ink-50'}`}>
        {title}
      </h2>
      {subtitle && <span className="text-xs text-ink-500 uppercase tracking-widest">{subtitle}</span>}
      <div className="flex-1 h-px bg-ink-800 ml-2" />
    </div>
  )
}
