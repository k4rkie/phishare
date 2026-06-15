import * as React from "react"
import { MoreVerticalIcon, CalendarIcon, ImageIcon, UserIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

interface SharedScreenProps {
  onSelectAlbum: (id: string) => void
}

export function SharedScreen({ onSelectAlbum }: SharedScreenProps) {
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
            <Card 
              key={album.id} 
              className="group overflow-hidden border-none bg-card hover:bg-accent/30 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex flex-col p-0"
              onClick={() => onSelectAlbum(album.id)}
            >
              <div className="aspect-square sm:aspect-[4/3] relative overflow-hidden shrink-0">
                <img 
                  src={album.coverUrl} 
                  alt={album.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                   <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-full text-white border border-white/10">
                      <Avatar className="size-4 border border-white/20">
                        <AvatarImage src={album.sharedBy.avatarUrl} />
                        <AvatarFallback>{album.sharedBy.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-[9px] font-bold tracking-tight">{album.sharedBy.name.split(' ')[0]}</span>
                   </div>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 text-white bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-bold border border-white/10">
                    <ImageIcon className="size-2.5" />
                    {album.count}
                </div>
              </div>
              <div className="p-3 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-sm sm:text-base leading-tight group-hover:text-primary transition-colors tracking-tight truncate">{album.title}</h3>
                  <MoreVerticalIcon className="size-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center text-[10px] font-semibold text-muted-foreground uppercase tracking-widest opacity-60">
                    <CalendarIcon className="mr-1 size-2.5" />
                    {album.date}
                 </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-card/20 rounded-3xl border-2 border-dashed border-border/50">
           <div className="size-16 rounded-3xl bg-muted flex items-center justify-center mb-4">
              <UserIcon className="size-8 text-muted-foreground" />
           </div>
           <p className="text-lg font-bold tracking-tight">No shared albums yet</p>
           <p className="text-muted-foreground text-sm font-medium">When people invite you to their albums, they'll appear here.</p>
        </div>
      )}
    </div>
  )
}
