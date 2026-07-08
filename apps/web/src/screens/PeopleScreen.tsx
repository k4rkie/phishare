import { useState } from "react"
import {
  SearchIcon,
  UserPlusIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
export function PeopleScreen() {
  const [searchQuery, setSearchQuery] = useState("")

  const suggestions = [
    { id: 1, name: "Family", count: 42, icon: SparklesIcon },
    { id: 2, name: "Friends", count: 86, icon: UserPlusIcon },
    { id: 3, name: "Wedding Guests", count: 124, icon: SearchIcon },
  ]

  const faces = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    url: `https://i.pravatar.cc/150?u=${i + 200}`,
    name: `Person ${i + 1}`,
  }))

  return (
    <div className="mx-auto max-w-4xl animate-in space-y-10 duration-500 fade-in">
      <div className="space-y-4 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Search Everything
        </h2>
        <p className="mx-auto max-w-xl text-lg text-muted-foreground">
          Find people, events, or specific moments across all your albums.
        </p>
        <div className="relative mx-auto mt-8 max-w-2xl">
          <SearchIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, event, or date..."
            className="h-14 rounded-2xl border-none bg-card pr-4 pl-12 text-lg shadow-sm transition-all focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {suggestions.map((s) => (
          <Card
            key={s.id}
            className="group cursor-pointer border-none bg-primary/5 transition-colors hover:bg-primary/10"
          >
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-background p-2 shadow-sm">
                  <s.icon className="size-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{s.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.count} matches
                  </span>
                </div>
              </div>
              <ArrowRightIcon className="size-4 -translate-x-2 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight">People you know</h3>
          <Button variant="link" className="font-semibold text-primary">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
          {faces.map((face) => (
            <div
              key={face.id}
              className="group flex cursor-pointer flex-col items-center gap-2"
            >
              <div className="relative">
                <div className="size-20 overflow-hidden rounded-full border-2 border-transparent p-1 transition-all group-hover:border-primary sm:size-24">
                  <img
                    src={face.url}
                    alt={face.name}
                    className="size-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] font-bold text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {Math.floor(Math.random() * 20) + 1}
                </div>
              </div>
              <span className="w-full truncate text-center text-xs font-medium transition-colors group-hover:text-primary">
                {face.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
