import { NavLink } from "react-router-dom"
import { HomeIcon, UsersIcon, BellIcon, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/my-albums", label: "Home", icon: HomeIcon },
  { to: "/shared", label: "Shared", icon: UsersIcon },
  { to: "/activity", label: "Activity", icon: BellIcon },
  { to: "/profile", label: "Profile", icon: UserIcon },
]

export function MobileNav() {
  return (
    <nav className="pb-safe z-20 flex h-16 min-h-16 items-center justify-around border-t border-border/50 bg-background/90 px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] backdrop-blur-lg md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "relative flex h-full w-full flex-col items-center justify-center gap-1 transition-all duration-300",
              isActive
                ? "text-primary"
                : "text-muted-foreground/80",
            )
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={cn(
                  "rounded-2xl p-1.5 transition-all duration-300",
                  isActive
                    ? "bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                    : "",
                )}
              >
                <item.icon
                  className={cn(
                    "size-6 transition-transform",
                    isActive
                      ? "scale-110 stroke-[2.5px]"
                      : "stroke-[2px]",
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold tracking-widest uppercase transition-all",
                  isActive
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-60",
                )}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute -top-1 size-1 rounded-full bg-primary" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
