import {
  SettingsIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  HelpCircleIcon,
  LogOutIcon,
  ChevronRightIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ProfileScreen() {
  const menuItems = [
    {
      icon: SettingsIcon,
      label: "Account Settings",
      description: "Email, password, and personal info",
    },
    {
      icon: CreditCardIcon,
      label: "Subscription",
      description: "Manage your current plan",
    },
    {
      icon: ShieldCheckIcon,
      label: "Privacy & Safety",
      description: "Who can see your albums",
    },
    {
      icon: HelpCircleIcon,
      label: "Help & Support",
      description: "Get in touch with our team",
    },
  ]

  return (
    <div className="mx-auto max-w-xl animate-in space-y-8 pb-20 duration-500 fade-in slide-in-from-bottom-4">
      <div className="flex flex-col items-center space-y-4 pt-6 text-center">
        <div className="relative">
          <Avatar className="size-24 border-4 border-background shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            className="absolute -right-1 -bottom-1 size-8 rounded-md border-2 border-background shadow-lg"
          >
            <SettingsIcon className="size-4" />
          </Button>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight">John Doe</h2>
          <p className="font-medium text-muted-foreground">john@example.com</p>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase">
          Free Account
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-none bg-card/40 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold tracking-tighter">12</p>
          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            My Albums
          </p>
        </Card>
        <Card className="border-none bg-card/40 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold tracking-tighter">452</p>
          <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
            Total Photos
          </p>
        </Card>
      </div>

      <div className="space-y-2">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="group flex w-full items-center justify-between rounded-md border border-transparent bg-card/40 p-4 transition-all duration-300 hover:border-border/50 hover:bg-card/60"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-md bg-background text-muted-foreground shadow-sm transition-colors group-hover:bg-primary/5 group-hover:text-primary">
                <item.icon className="size-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold tracking-tight">{item.label}</p>
                <p className="text-xs font-medium text-muted-foreground opacity-70">
                  {item.description}
                </p>
              </div>
            </div>
            <ChevronRightIcon className="size-4 text-muted-foreground opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          </button>
        ))}
      </div>

      <Button
        variant="destructive"
        className="h-12 w-full rounded-md font-bold tracking-tight shadow-lg shadow-destructive/10"
      >
        <LogOutIcon className="mr-2 h-4 w-4" /> Log out
      </Button>
    </div>
  )
}
