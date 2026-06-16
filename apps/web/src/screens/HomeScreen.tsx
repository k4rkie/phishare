import { useNavigate } from "react-router-dom"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlbumCard } from "@/components/AlbumCard"

interface Album {
  id: string
  title: string
  date: string
  count: number
  coverUrl: string
}

export function HomeScreen() {
  const navigate = useNavigate()

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
        <Button className="font-bold shadow-md shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30">
          <PlusIcon className="mr-2 h-4 w-4 stroke-[3px]" /> New Album
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            title={album.title}
            date={album.date}
            count={album.count}
            coverUrl={album.coverUrl}
            onSelect={(id) => navigate(`/album/${id}`)}
          />
        ))}
      </div>
    </div>
  )
}
