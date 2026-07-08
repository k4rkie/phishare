import { MoreVerticalIcon, CalendarIcon, ImageIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type SharedBy = {
  name: string
  avatarUrl: string
}

type AlbumCardProps = {
  id: string
  title: string
  date: string
  count: number
  coverUrl: string | undefined
  sharedBy?: SharedBy
  onSelect: (id: string) => void
}

export function AlbumCard({
  id,
  title,
  date,
  count,
  coverUrl,
  sharedBy,
  onSelect,
}: AlbumCardProps) {
  return (
    <Card
      className="group flex cursor-pointer flex-col overflow-hidden rounded-md border-none bg-card p-0 shadow-sm transition-all duration-300 hover:bg-accent/30 hover:shadow-md"
      onClick={() => onSelect(id)}
    >
      <div className="relative aspect-square shrink-0 overflow-hidden sm:aspect-[4/3]">
        <img
          src={coverUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {sharedBy && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-1.5 py-0.5 text-white backdrop-blur-md">
              <Avatar className="size-4 border border-white/20">
                <AvatarImage src={sharedBy.avatarUrl} />
                <AvatarFallback>{sharedBy.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-[9px] font-bold tracking-tight">
                {sharedBy.name.split(" ")[0]}
              </span>
            </div>
          </div>
        )}

        <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded border border-white/10 bg-black/40 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-md">
          <ImageIcon className="size-2.5" />
          {count}
        </div>
      </div>

      <div className="space-y-0.5 p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm leading-tight font-bold tracking-tight transition-colors group-hover:text-primary sm:text-base">
            {title}
          </h3>
          <MoreVerticalIcon className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="flex items-center text-[10px] font-semibold tracking-widest text-muted-foreground uppercase opacity-60">
          <CalendarIcon className="mr-1 size-2.5" />
          {date}
        </div>
      </div>
    </Card>
  )
}
