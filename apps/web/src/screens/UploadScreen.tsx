import { useState } from "react"
import {
  UploadIcon,
  CheckCircle2Icon,
  ImageIcon,
  ChevronDownIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function UploadScreen() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState("Summer Wedding")

  const albums = [
    "Summer Wedding",
    "Birthday Party",
    "Graduation",
    "Family Reunion",
  ]

  return (
    <div className="mx-auto max-w-3xl animate-in space-y-8 duration-500 fade-in slide-in-from-bottom-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Upload Photos</h2>
        <p className="text-muted-foreground">
          Add new photos to your existing albums or create a new one.
        </p>
      </div>

      <Card className="overflow-hidden border-none bg-card/50 shadow-sm">
        <CardContent className="space-y-8 p-8">
          {/* Album Selector */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Select Album
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    className="h-12 w-full justify-between rounded-xl md:w-64"
                  >
                    <div className="flex items-center gap-2">
                      <ImageIcon className="size-4 text-primary" />
                      <span className="font-medium">{selectedAlbum}</span>
                    </div>
                    <ChevronDownIcon className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 rounded-xl">
                  <DropdownMenuLabel>Your Albums</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {albums.map((album) => (
                    <DropdownMenuItem
                      key={album}
                      onClick={() => setSelectedAlbum(album)}
                      className="rounded-lg"
                    >
                      {album}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-medium text-primary">
                    + Create New Album
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-500">
              <CheckCircle2Icon className="size-4" />
              <span>Optimized for web</span>
            </div>
          </div>

          {/* Dropzone */}
          <label
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
            }}
            className={cn(
              "group relative flex cursor-pointer flex-col items-center justify-center gap-6 rounded-3xl border-2 border-dashed px-6 py-16 transition-all",
              isDragging
                ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div
              className={cn(
                "rounded-2xl p-5 shadow-sm transition-all duration-300",
                isDragging
                  ? "scale-110 bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground group-hover:scale-110"
              )}
            >
              <UploadIcon className="size-10" />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-xl font-bold">
                Click to upload or drag and drop
              </p>
              <p className="mx-auto max-w-xs text-sm text-muted-foreground">
                High resolution photos are automatically resized for fast
                sharing while keeping original quality.
              </p>
            </div>
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>

          <div className="grid grid-cols-1 gap-6 border-t border-border/50 pt-4 md:grid-cols-3">
            <div className="space-y-1">
              <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                File Types
              </h4>
              <p className="text-sm font-medium">JPG, PNG, HEIC</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Batch Size
              </h4>
              <p className="text-sm font-medium">Up to 50 photos</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Total Size
              </h4>
              <p className="text-sm font-medium">No strict limit</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
