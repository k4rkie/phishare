import { useNavigate } from "react-router-dom"
import { UserIcon } from "lucide-react"
import { AlbumCard } from "@/components/AlbumCard"
import { EmptyState } from "@/components/EmptyState"

interface SharedAlbum {
  id: string
  title: string
  date: string
  count: number
  coverUrl: string
  sharedBy: {
    name: string
    avatarUrl: string
  }
}

export function SharedScreen() {
  const navigate = useNavigate()

  const sharedAlbums: SharedAlbum[] = [
    { 
      id: "s1", 
      title: "Paris Trip", 
      date: "June 05, 2026", 
      count: 245, 
      coverUrl: "https://picsum.photos/seed/paris/800/600",
      sharedBy: { name: "Sarah Miller", avatarUrl: "https://i.pravatar.cc/150?u=sarah" }
    },
    { 
      id: "s2", 
      title: "Company Retreat", 
      date: "May 28, 2026", 
      count: 156, 
      coverUrl: "https://picsum.photos/seed/office/800/600",
      sharedBy: { name: "Mark Wilson", avatarUrl: "https://i.pravatar.cc/150?u=mark" }
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight">Shared with You</h2>
        <p className="text-muted-foreground font-medium">Albums you've been invited to by others.</p>
      </div>

      {sharedAlbums.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {sharedAlbums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              date={album.date}
              count={album.count}
              coverUrl={album.coverUrl}
              sharedBy={album.sharedBy}
              onSelect={(id) => navigate(`/album/${id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={UserIcon}
          title="No shared albums yet"
          description="When people invite you to their albums, they'll appear here."
        />
      )}
    </div>
  )
}
