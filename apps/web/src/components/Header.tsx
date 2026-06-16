import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"
import {
  SunIcon,
  MoonIcon,
  SettingsIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
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

const pageTitles: Record<string, string> = {
  "/my-albums": "My Albums",
  "/shared": "Shared",
  "/activity": "Activity",
  "/profile": "Profile",
}

export function Header() {
  const { theme, setTheme } = useTheme()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const title = pageTitles[pathname] ?? ""
  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="z-20 flex h-16 min-h-16 items-center justify-between border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center md:hidden">
        <Link
          to="/my-albums"
          className="text-xl font-bold tracking-tight text-primary"
        >
          phi<span className="text-foreground">share</span>
        </Link>
      </div>
      <div className="hidden md:block">
        <h1 className="text-xl font-bold tracking-tight capitalize">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
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
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-border/50 p-0 shadow-sm transition-transform active:scale-95"
                />
              }
            >
              <Avatar className="h-full w-full">
                <AvatarImage src={user?.image ?? undefined} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="mt-2 w-64 rounded-2xl p-2"
              align="end"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-3 font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm leading-none font-bold tracking-tight">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-border/50" />
              <div className="p-1">
                <DropdownMenuItem
                  onClick={() => navigate("/profile")}
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
                <DropdownMenuItem
                  className="rounded-xl py-2.5 text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={async () => {
                    await logout()
                    navigate("/login")
                  }}
                >
                  <LogOutIcon className="mr-3 h-4 w-4" />
                  <span className="text-sm font-semibold">Log out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
