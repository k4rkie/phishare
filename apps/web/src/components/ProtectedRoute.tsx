import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthProvider"
import { LoaderCircle } from "lucide-react"

export function ProtectedRoute() {
  const { user, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <LoaderCircle className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
