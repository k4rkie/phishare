import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border/50 bg-card/20 py-20">
      <div className="mb-4 flex size-16 items-center justify-center rounded-3xl bg-muted">
        <Icon className="size-8 text-muted-foreground" />
      </div>
      <p className="text-lg font-bold tracking-tight">{title}</p>
      <p className="text-sm font-medium text-muted-foreground">{description}</p>
    </div>
  )
}
