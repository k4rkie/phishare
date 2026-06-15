import * as React from "react"
import {
  ArrowLeftIcon,
  SearchIcon,
  UploadIcon,
  CameraIcon,
  FilterIcon,
  MoreHorizontalIcon,
  Share2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AlbumDetailProps {
  albumId: string
  onBack: () => void
}

export function AlbumDetailScreen({ albumId, onBack }: AlbumDetailProps) {
  const [selectedFace, setSelectedFace] = React.useState<number | null>(null)
  const [isSearching, setIsSearching] = React.useState(false)

  const faces = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    url: `https://i.pravatar.cc/150?u=${i + 100}`,
  }))

  const photos = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${albumId}-${i}/800/800`,
  }))

  return (
    <div className="animate-in space-y-8 pb-20 duration-500 fade-in slide-in-from-right-4">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="-ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Albums
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-md">
            <Share2Icon className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="ghost" size="icon" className="rounded-md">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Album Info */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Summer Wedding
          </h2>
          <p className="flex items-center gap-2 text-muted-foreground">
            124 photos • Shared with 12 people
          </p>
        </div>

        {/* Search / Filter Trigger */}
        <div className="flex items-center gap-3">
          <div className="group relative w-full md:w-64">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Find a photo..."
              className="rounded-md border-border/50 bg-background pl-10 transition-all focus:border-primary/50"
            />
          </div>
          <Button
            variant={isSearching ? "default" : "secondary"}
            className="rounded-md"
            onClick={() => setIsSearching(!isSearching)}
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            {isSearching ? "Close Search" : "Search by Face"}
          </Button>
        </div>
      </div>

      {/* Face Search Section */}
      {isSearching && (
        <div className="animate-in space-y-6 rounded-md border border-border/50 bg-card/50 p-6 duration-300 zoom-in-95">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Search with photo
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2 rounded-md border-2 border-dashed"
                >
                  <UploadIcon className="size-5 text-muted-foreground" />
                  <span className="text-xs">Upload Photo</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col gap-2 rounded-md border-2 border-dashed"
                >
                  <CameraIcon className="size-5 text-muted-foreground" />
                  <span className="text-xs">Use Camera</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Suggested faces
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedFace(null)}
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold uppercase transition-all",
                    selectedFace === null
                      ? "border-primary bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "border-border bg-background text-muted-foreground hover:border-muted-foreground"
                  )}
                >
                  All
                </button>
                {faces.map((face) => (
                  <button
                    key={face.id}
                    onClick={() => setSelectedFace(face.id)}
                    className={cn(
                      "size-12 shrink-0 overflow-hidden rounded-md border-2 transition-all",
                      selectedFace === face.id
                        ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "border-transparent opacity-70 grayscale hover:opacity-100 hover:grayscale-0"
                    )}
                  >
                    <img
                      src={face.url}
                      alt="Face"
                      className="size-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-md bg-muted shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <img
              src={photo.url}
              alt={`Photo ${photo.id}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute top-2 right-2 scale-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <Button
                variant="secondary"
                size="icon"
                className="size-8 rounded-md shadow-lg"
              >
                <Share2Icon className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
