import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/my-albums", label: "Home", icon: HomeIcon },
  { to: "/shared", label: "Shared", icon: UsersIcon },
  { to: "/activity", label: "Activity", icon: BellIcon },
]

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-border bg-card/30 backdrop-blur-sm md:flex">
      <div className="flex h-16 items-center border-b border-border/50 px-6">
        <span className="text-xl font-bold tracking-tight text-primary">
          phi<span className="text-foreground">share</span>
        </span>
      </div>

      <nav className="mt-4 flex-1 space-y-1.5 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "group flex w-full items-center gap-3 rounded-md px-4 py-3 transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "size-5 transition-transform group-active:scale-90",
                    isActive ? "" : "opacity-70",
                  )}
                />
                <span className="text-sm font-semibold tracking-tight">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
