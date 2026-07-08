import { MoreVerticalIcon, Share2Icon, DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PhotoCardProps {
  id: number
  url: string
  onClick?: () => void
}

export function PhotoCard({ id, url, onClick }: PhotoCardProps) {
  return (
    <div
      className={cn(
        "group relative aspect-square overflow-hidden rounded-md bg-muted shadow-sm transition-all duration-300 hover:shadow-md",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <img
        src={url}
        alt={`Photo ${id}`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

      <div
        className="absolute top-1 right-1"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="secondary"
              size="icon"
              className="size-6 rounded-md border-none bg-black/20 text-white/60 shadow-none backdrop-blur-sm transition-all hover:bg-black/40 hover:text-white"
            >
              <MoreVerticalIcon className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem>
              <Share2Icon className="size-4" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon className="size-4" />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
