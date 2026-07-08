import { cn } from "@/lib/utils"

interface FaceCircleProps {
  url: string
  name: string
  isSelected: boolean
  onClick: () => void
}

export function FaceCircle({
  url,
  name,
  isSelected,
  onClick,
}: FaceCircleProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "size-20 shrink-0 overflow-hidden rounded-full border-2 transition-all sm:size-24",
        isSelected
          ? "border-primary p-1"
          : "border-transparent opacity-70 grayscale hover:opacity-100 hover:grayscale-0"
      )}
    >
      <img
        src={url}
        alt={name}
        className="size-full rounded-full object-cover"
      />
    </button>
  )
}
