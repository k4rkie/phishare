import {
  PlusIcon,
  MoreVerticalIcon,
  CalendarIcon,
  ImageIcon,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Album {
  id: string
  title: string
  date: string
  count: number
  coverUrl: string
}

interface HomeScreenProps {
  onSelectAlbum: (id: string) => void
}

export function HomeScreen({ onSelectAlbum }: HomeScreenProps) {
  const albums: Album[] = [
    {
      id: "1",
      title: "Summer Wedding",
      date: "June 12, 2026",
      count: 124,
      coverUrl: "https://picsum.photos/seed/wedding/800/600",
    },
    {
      id: "2",
      title: "Birthday Party",
      date: "May 20, 2026",
      count: 86,
      coverUrl: "https://picsum.photos/seed/party/800/600",
    },
    {
      id: "3",
      title: "Graduation",
      date: "May 15, 2026",
      count: 42,
      coverUrl: "https://picsum.photos/seed/grad/800/600",
    },
    {
      id: "4",
      title: "Family Reunion",
      date: "April 10, 2026",
      count: 210,
      coverUrl: "https://picsum.photos/seed/family/800/600",
    },
  ]

  return (
    <div className="animate-in space-y-8 pb-20 duration-500 fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight">My Albums</h2>
        </div>
        <Button className="h-10 rounded-md px-4 font-bold shadow-md shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30">
          <PlusIcon className="mr-2 h-4 w-4 stroke-[3px]" /> New Album
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {albums.map((album) => (
          <Card
            key={album.id}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-md border-none bg-card p-0 shadow-sm transition-all duration-300 hover:bg-accent/30 hover:shadow-md"
            onClick={() => onSelectAlbum(album.id)}
          >
            <div className="relative aspect-square shrink-0 overflow-hidden sm:aspect-[4/3]">
              <img
                src={album.coverUrl}
                alt={album.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded border border-white/10 bg-black/40 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur-md">
                <ImageIcon className="size-2.5" />
                {album.count}
              </div>
            </div>
            <div className="space-y-0.5 p-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate text-sm leading-tight font-bold tracking-tight transition-colors group-hover:text-primary sm:text-base">
                  {album.title}
                </h3>
                <MoreVerticalIcon className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="flex items-center text-[10px] font-semibold tracking-widest text-muted-foreground uppercase opacity-60">
                <CalendarIcon className="mr-1 size-2.5" />
                {album.date}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
