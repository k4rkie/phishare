import * as React from "react"
import { UploadIcon, CheckCircle2Icon, ImageIcon, ChevronDownIcon } from "lucide-react"
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
  const [isDragging, setIsDragging] = React.useState(false)
  const [selectedAlbum, setSelectedAlbum] = React.useState("Summer Wedding")
  
  const albums = ["Summer Wedding", "Birthday Party", "Graduation", "Family Reunion"]

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Upload Photos</h2>
        <p className="text-muted-foreground">Add new photos to your existing albums or create a new one.</p>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-card/50">
        <CardContent className="p-8 space-y-8">
          {/* Album Selector */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="space-y-1">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Select Album</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full md:w-64 justify-between rounded-xl h-12">
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
                    <DropdownMenuItem className="text-primary font-medium">+ Create New Album</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
             </div>
             
             <div className="flex items-center gap-2 text-sm text-green-500 font-medium bg-green-500/10 px-3 py-1.5 rounded-full">
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
              "relative flex flex-col items-center justify-center gap-6 py-16 px-6 rounded-3xl border-2 border-dashed transition-all cursor-pointer group",
              isDragging
                ? "border-primary bg-primary/5 ring-4 ring-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div className={cn(
              "p-5 rounded-2xl transition-all duration-300 shadow-sm",
              isDragging ? "bg-primary text-primary-foreground scale-110" : "bg-background text-muted-foreground group-hover:scale-110"
            )}>
              <UploadIcon className="size-10" />
            </div>
            <div className="text-center space-y-2">
              <p className="font-bold text-xl">Click to upload or drag and drop</p>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                High resolution photos are automatically resized for fast sharing while keeping original quality.
              </p>
            </div>
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-border/50">
             <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">File Types</h4>
                <p className="text-sm font-medium">JPG, PNG, HEIC</p>
             </div>
             <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Batch Size</h4>
                <p className="text-sm font-medium">Up to 50 photos</p>
             </div>
             <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Size</h4>
                <p className="text-sm font-medium">No strict limit</p>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
