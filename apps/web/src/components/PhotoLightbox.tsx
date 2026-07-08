import {
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Share2Icon,
  DownloadIcon,
  CalendarIcon,
  ImageIcon,
  HardDriveIcon,
  UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"

export interface PhotoData {
  id: number
  url: string
  name: string
  size: string
  dimensions: string
  date: string
  uploadedBy: string
}

interface PhotoLightboxProps {
  photo: PhotoData
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

export function PhotoLightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: PhotoLightboxProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex max-w-[95vw] flex-col gap-0 overflow-hidden rounded-md border-none bg-background/90 p-0 sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl dark:bg-black/90"
      >
        <div className="relative flex min-h-0 flex-1 flex-col">
          {/* Close button */}
          <div className="absolute top-3 right-3 z-20">
            <DialogClose className="flex size-9 items-center justify-center rounded-full bg-muted/50 text-muted-foreground backdrop-blur-sm transition-all hover:bg-muted/70 hover:text-foreground">
              <XIcon className="size-5" />
            </DialogClose>
          </div>

          {/* Image area */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-4 pt-12">
            {/* Previous */}
            {onPrev && hasPrev && (
              <button
                className="absolute top-1/2 left-1 z-10 -translate-y-1/2 rounded-full bg-muted/50 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:bg-muted/70 hover:text-foreground"
                onClick={onPrev}
              >
                <ChevronLeftIcon className="size-6" />
              </button>
            )}

            {/* Next */}
            {onNext && hasNext && (
              <button
                className="absolute top-1/2 right-1 z-10 -translate-y-1/2 rounded-full bg-muted/50 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:bg-muted/70 hover:text-foreground"
                onClick={onNext}
              >
                <ChevronRightIcon className="size-6" />
              </button>
            )}

            <img
              src={photo.url}
              alt={photo.name}
              className="max-h-[55vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>

        {/* Metadata bar */}
        <div className="flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground/80">
              <ImageIcon className="size-3.5" />
              {photo.name}
            </span>
            <span className="flex items-center gap-1.5">
              <HardDriveIcon className="size-3.5" />
              {photo.size}
            </span>
            <span className="flex items-center gap-1.5">
              <ImageIcon className="size-3.5" />
              {photo.dimensions}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="size-3.5" />
              {photo.date}
            </span>
            <span className="flex items-center gap-1.5">
              <UserIcon className="size-3.5" />
              {photo.uploadedBy}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Share2Icon className="mr-1.5 size-3.5" />
              Share
            </Button>
            <Button variant="secondary" size="sm">
              <DownloadIcon className="mr-1.5 size-3.5" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
