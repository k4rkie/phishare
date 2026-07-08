import { Navigate, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/components/layout"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { LoginScreen } from "@/screens/LoginScreen"
import { SignupScreen } from "@/screens/SignupScreen"
import { HomeScreen } from "@/screens/HomeScreen"
import { SharedScreen } from "@/screens/SharedScreen"
import { ActivityScreen } from "@/screens/ActivityScreen"
import { ProfileScreen } from "@/screens/ProfileScreen"
import { AlbumDetailScreen } from "@/screens/AlbumDetailScreen"
import { AuthProvider } from "./context/AuthProvider"
import { Toaster } from "react-hot-toast"

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="phishare-theme">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              fontFamily: "var(--font-sans)",
            },
            success: {
              iconTheme: {
                primary: "var(--primary)",
                secondary: "var(--primary-foreground)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--destructive)",
                secondary: "var(--primary-foreground)",
              },
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/my-albums" replace />} />
              <Route path="/my-albums" element={<HomeScreen />} />
              <Route path="/shared" element={<SharedScreen />} />
              <Route path="/activity" element={<ActivityScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/album/:albumId" element={<AlbumDetailScreen />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
