import * as React from "react"
import { SearchIcon, UserPlusIcon, ArrowRightIcon, SparklesIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function PeopleScreen() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const suggestions = [
    { id: 1, name: "Family", count: 42, icon: SparklesIcon },
    { id: 2, name: "Friends", count: 86, icon: UserPlusIcon },
    { id: 3, name: "Wedding Guests", count: 124, icon: SearchIcon },
  ]

  const faces = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    url: `https://i.pravatar.cc/150?u=${i + 200}`,
    name: `Person ${i + 1}`
  }))

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="space-y-4 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight">Search Everything</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Find people, events, or specific moments across all your albums.
        </p>
        <div className="relative max-w-2xl mx-auto mt-8">
           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
           <Input 
             placeholder="Search by name, event, or date..." 
             className="h-14 pl-12 pr-4 rounded-2xl bg-card border-none shadow-sm focus:ring-2 focus:ring-primary/20 text-lg transition-all"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {suggestions.map((s) => (
           <Card key={s.id} className="border-none bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
             <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-lg bg-background shadow-sm">
                      <s.icon className="size-4 text-primary" />
                   </div>
                   <div className="flex flex-col">
                      <span className="font-semibold text-sm">{s.name}</span>
                      <span className="text-xs text-muted-foreground">{s.count} matches</span>
                   </div>
                </div>
                <ArrowRightIcon className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
             </CardContent>
           </Card>
         ))}
      </div>

      <div className="space-y-6 pt-4">
         <div className="flex items-center justify-between">
            <h3 className="font-bold text-xl tracking-tight">People you know</h3>
            <Button variant="link" className="text-primary font-semibold">View all</Button>
         </div>
         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {faces.map((face) => (
              <div key={face.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                 <div className="relative">
                    <div className="size-20 sm:size-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all p-1">
                       <img src={face.url} alt={face.name} className="size-full object-cover rounded-full" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shadow-lg border-2 border-background opacity-0 group-hover:opacity-100 transition-opacity">
                       {Math.floor(Math.random() * 20) + 1}
                    </div>
                 </div>
                 <span className="text-xs font-medium text-center truncate w-full group-hover:text-primary transition-colors">{face.name}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  )
}
