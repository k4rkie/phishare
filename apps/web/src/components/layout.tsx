import * as React from "react"
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Tab = "home" | "shared" | "activity" | "profile"

interface LayoutProps {
  children: React.ReactNode
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function MainLayout({ children, activeTab, onTabChange }: LayoutProps) {
  const { theme, setTheme } = useTheme()

  const navItems = [
    { id: "home" as const, label: "Home", icon: HomeIcon },
    { id: "shared" as const, label: "Shared", icon: UsersIcon },
    { id: "activity" as const, label: "Activity", icon: BellIcon },
    { id: "profile" as const, label: "Profile", icon: UserIcon },
  ]

  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background font-sans text-foreground md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card/30 backdrop-blur-sm md:flex">
        <div className="flex h-16 items-center border-b border-border/50 px-6">
          <span className="text-xl font-bold tracking-tight text-primary">
            phi<span className="text-foreground">share</span>
          </span>
        </div>
        <nav className="mt-4 flex-1 space-y-1.5 p-4">
          {navItems
            .filter((i) => i.id !== "profile")
            .map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "size-5 transition-transform group-active:scale-90",
                    activeTab === item.id ? "" : "opacity-70"
                  )}
                />
                <span className="text-sm font-semibold tracking-tight">
                  {item.label}
                </span>
              </button>
            ))}
        </nav>

        <div className="border-t border-border/50 bg-accent/5 p-4">
          <div className="flex items-center gap-3 px-2 py-1">
            <Avatar className="size-10 border-2 border-background shadow-sm">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm leading-tight font-bold tracking-tight">
                John Doe
              </span>
              <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase opacity-70">
                Free Account
              </span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="z-20 flex h-16 min-h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
          <div className="flex items-center md:hidden">
            <span className="text-xl font-bold tracking-tight text-primary">
              phi<span className="text-foreground">share</span>
            </span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold tracking-tight capitalize">
              {activeTab === "home" ? "My Albums" : activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            ></Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            >
              {theme === "dark" ? (
                <SunIcon className="size-5" />
              ) : (
                <MoonIcon className="size-5" />
              )}
            </Button>

            <div className="ml-2 hidden border-l border-border/50 pl-3 md:block">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-border/50 p-0 shadow-sm transition-transform active:scale-95"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-2 w-64 rounded-2xl p-2"
                  align="end"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="px-2 py-3 font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm leading-none font-bold tracking-tight">
                          John Doe
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <div className="p-1">
                    <DropdownMenuItem
                      onClick={() => onTabChange("profile")}
                      className="rounded-xl py-2.5"
                    >
                      <UserIcon className="mr-3 h-4 w-4" />
                      <span className="text-sm font-semibold">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl py-2.5">
                      <SettingsIcon className="mr-3 h-4 w-4" />
                      <span className="text-sm font-semibold">Settings</span>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <div className="p-1">
                    <DropdownMenuItem className="rounded-xl py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive">
                      <LogOutIcon className="mr-3 h-4 w-4" />
                      <span className="text-sm font-semibold">Log out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/20 p-6 md:p-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>

        {/* Bottom Nav - Mobile */}
        <nav className="pb-safe z-20 flex h-16 min-h-16 items-center justify-around border-t border-border/50 bg-background/90 px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] backdrop-blur-lg md:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative flex h-full w-full flex-col items-center justify-center gap-1 transition-all duration-300",
                activeTab === item.id
                  ? "text-primary"
                  : "text-muted-foreground/80"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl p-1.5 transition-all duration-300",
                  activeTab === item.id
                    ? "bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                    : ""
                )}
              >
                <item.icon
                  className={cn(
                    "size-6 transition-transform",
                    activeTab === item.id
                      ? "scale-110 stroke-[2.5px]"
                      : "stroke-[2px]"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-bold tracking-widest uppercase transition-all",
                  activeTab === item.id
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-60"
                )}
              >
                {item.label}
              </span>
              {activeTab === item.id && (
                <span className="absolute -top-1 size-1 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
