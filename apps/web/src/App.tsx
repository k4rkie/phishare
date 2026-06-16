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

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="phishare-theme">
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
