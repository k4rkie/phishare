import { useState, useRef, type ChangeEvent } from "react"
import { ImageUpIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type CreateAlbumModalProps = {
  isOpen: boolean
  onClose: () => void
}

type FieldErrors = Partial<
  Record<"name" | "description" | "coverImage" | "base", string>
>

export function CreateAlbumModal({ isOpen, onClose }: CreateAlbumModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const newErrors: FieldErrors = {}

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10485760) {
        newErrors.coverImage = "Image must be under 10MB"
        return setErrors(newErrors)
      }
      setCoverPreview(URL.createObjectURL(file))
      setCoverImage(file)
      console.log(file)
    }
  }

  const handleRemoveCover = () => {
    setCoverImage(null)
    setCoverPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClose = () => {
    setName("")
    setDescription("")
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview)
    }
    setCoverImage(null)
    setCoverPreview(null)
    setErrors({})
    onClose()
  }

  const handleCreate = () => {
    if (!coverImage) {
      newErrors.coverImage = "Please provide a cover image"
    }
    if (name.length < 3) {
      newErrors.name = "Please provide the name"
    }
    if (description.length > 50) {
      newErrors.name = "Description too long"
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    console.log("Album created:", {
      name,
      description,
      coverImage,
    })

    handleClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(closeTrigger) => !closeTrigger && handleClose()}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create album</DialogTitle>
          <DialogDescription>
            Give your album a name, description, and cover image.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Cover image upload */}
          <div className="flex flex-col items-center gap-2">
            {coverPreview ? (
              <div className="relative">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-36 w-full rounded-lg object-cover ring-1 ring-foreground/10 sm:w-80"
                />
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                >
                  <XIcon className="size-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border transition-colors sm:w-80",
                  "text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
                )}
              >
                <ImageUpIcon className="size-8" />
                <span className="text-xs font-medium">Upload cover image</span>
                <span className="text-[10px] text-muted-foreground/60">
                  PNG, JPG up to 10MB
                </span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {errors.coverImage && (
              <p className="text-xs text-destructive">{errors.coverImage}</p>
            )}
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Name</label>
            <Input
              placeholder="e.g. Summer Trip 2025"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">
              Description (Optional)
            </label>
            <textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={cn(
                "h-20 w-full min-w-0 resize-none rounded-md border border-input bg-input/20 px-3 py-2 text-xs transition-colors outline-none",
                "placeholder:text-muted-foreground",
                "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
                "dark:bg-input/30"
              )}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
