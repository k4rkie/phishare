import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { MobileNav } from "@/components/MobileNav"

export function MainLayout() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background font-sans text-foreground md:flex-row">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/20 p-6 md:p-10">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>

        <MobileNav />
      </div>
    </div>
  )
}
