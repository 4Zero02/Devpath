// Componente reutilizável de barra de progresso
interface ProgressBarProps {
  value: number // 0 a 100
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function ProgressBar({ value, className = '', showLabel = false, size = 'md' }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const height = size === 'sm' ? 'h-1' : 'h-2'

  // Cor baseada no progresso
  const barColor =
    clampedValue >= 100
      ? 'bg-emerald-500'
      : clampedValue >= 60
        ? 'bg-indigo-500'
        : clampedValue >= 30
          ? 'bg-amber-500'
          : 'bg-zinc-600'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex-1 ${height} bg-zinc-800 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-zinc-500 w-8 text-right tabular-nums">{clampedValue}%</span>
      )}
    </div>
  )
}
