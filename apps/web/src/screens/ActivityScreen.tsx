import {
  ImageIcon,
  UserPlusIcon,
  HeartIcon,
  MessageSquareIcon,
  ClockIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ActivityItem {
  id: string
  type: "upload" | "invite" | "join" | "like" | "comment"
  user: {
    name: string
    avatarUrl: string
  }
  album: string
  time: string
  previewUrl?: string
}

export function ActivityScreen() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "upload",
      user: {
        name: "Sarah Miller",
        avatarUrl: "https://i.pravatar.cc/150?u=sarah",
      },
      album: "Paris Trip",
      time: "2 hours ago",
      previewUrl: "https://picsum.photos/seed/paris/200/200",
    },
    {
      id: "2",
      type: "join",
      user: {
        name: "Mark Wilson",
        avatarUrl: "https://i.pravatar.cc/150?u=mark",
      },
      album: "Summer Wedding",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "invite",
      user: { name: "John Doe", avatarUrl: "https://github.com/shadcn.png" },
      album: "Birthday Party",
      time: "Yesterday",
    },
    {
      id: "4",
      type: "upload",
      user: {
        name: "Emma Thompson",
        avatarUrl: "https://i.pravatar.cc/150?u=emma",
      },
      album: "Paris Trip",
      time: "2 days ago",
      previewUrl: "https://picsum.photos/seed/tower/200/200",
    },
  ]

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "upload":
        return <ImageIcon className="size-3.5" />
      case "invite":
        return <UserPlusIcon className="size-3.5" />
      case "join":
        return <UserPlusIcon className="size-3.5" />
      case "like":
        return <HeartIcon className="size-3.5" />
      case "comment":
        return <MessageSquareIcon className="size-3.5" />
    }
  }

  const getMessage = (activity: ActivityItem) => {
    switch (activity.type) {
      case "upload":
        return (
          <span>
            added new photos to{" "}
            <span className="font-bold tracking-tight text-foreground">
              {activity.album}
            </span>
          </span>
        )
      case "invite":
        return (
          <span>
            invited you to join{" "}
            <span className="font-bold tracking-tight text-foreground">
              {activity.album}
            </span>
          </span>
        )
      case "join":
        return (
          <span>
            joined the album{" "}
            <span className="font-bold tracking-tight text-foreground">
              {activity.album}
            </span>
          </span>
        )
      case "like":
        return (
          <span>
            liked a photo in{" "}
            <span className="font-bold tracking-tight text-foreground">
              {activity.album}
            </span>
          </span>
        )
      case "comment":
        return (
          <span>
            commented on a photo in{" "}
            <span className="font-bold tracking-tight text-foreground">
              {activity.album}
            </span>
          </span>
        )
    }
  }

  return (
    <div className="mx-auto max-w-3xl animate-in space-y-8 pb-20 duration-500 fade-in">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight">Activity</h2>
        <p className="font-medium text-muted-foreground">
          Keep track of updates across your shared albums.
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="group flex items-start gap-4 rounded-md border border-transparent bg-card/40 p-4 transition-all duration-300 hover:border-border/50 hover:bg-card/60"
          >
            <div className="relative shrink-0">
              <Avatar className="size-12 border-2 border-background shadow-sm">
                <AvatarImage src={activity.user.avatarUrl} />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-md border-2 border-background bg-primary text-primary-foreground shadow-sm">
                {getIcon(activity.type)}
              </div>
            </div>

            <div className="flex-1 space-y-1 pt-1">
              <p className="text-sm leading-snug font-medium text-muted-foreground">
                <span className="mr-1 font-bold tracking-tight text-foreground">
                  {activity.user.name}
                </span>
                {getMessage(activity)}
              </p>
              <div className="flex items-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase opacity-60">
                <ClockIcon className="mr-1.5 size-3" />
                {activity.time}
              </div>
            </div>

            {activity.previewUrl && (
              <div className="size-16 shrink-0 overflow-hidden rounded-md border border-border/50 shadow-sm transition-transform group-hover:scale-105">
                <img
                  src={activity.previewUrl}
                  alt="Preview"
                  className="size-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
