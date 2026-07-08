import { useNavigate } from "react-router-dom"
import { PlusIcon, ImagesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlbumCard } from "@/components/AlbumCard"
import { CreateAlbumModal } from "@/components/CreateAlbumModal"
import { useEffect, useState } from "react"
import { FetchFromAPI } from "@/utils/fetch"
import type { Album } from "@phishare/shared"

export function HomeScreen() {
  const navigate = useNavigate()
  const [isCreateAlbumModalOpen, setIsCreateAlbumModalOpen] = useState(false)
  const [albums, setAlbums] = useState<Album[]>([])
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedData = await FetchFromAPI<Album[]>(
          `${BASE_URL}/api/albums`,
          {
            method: "GET",
            credentials: "include",
          }
        )
        if (!fetchedData.success) return
        setAlbums(fetchedData.data)
      } catch (err) {}
    })()
  }, [])

  const handleAlbumCreation = (album: Album) => {
    return setAlbums((prevAlbums) => [...prevAlbums, album])
  }

  return (
    <div className="flex min-h-full animate-in flex-col gap-8 pb-20 duration-500 fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight">My Albums</h2>
        </div>
        <Button
          className="font-bold shadow-md shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          onClick={() => setIsCreateAlbumModalOpen(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4 stroke-[3px]" /> New Album
        </Button>
        <CreateAlbumModal
          isOpen={isCreateAlbumModalOpen}
          onClose={() => setIsCreateAlbumModalOpen(false)}
          onAlbumCreation={handleAlbumCreation}
        />
      </div>

      {albums.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.name}
              date={new Date(album.createdAt).toISOString()}
              count={album.imageCount}
              coverUrl={album.coverImageURL}
              onSelect={(id) => navigate(`/album/${id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
            <ImagesIcon className="size-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">No albums yet</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Click the{" "}
            <span className="font-semibold text-foreground">New Album</span>{" "}
            button above to create your first album and start sharing photos.
          </p>
        </div>
      )}
    </div>
  )
}
