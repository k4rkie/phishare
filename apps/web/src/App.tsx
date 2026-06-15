import * as React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout, type Tab } from "@/components/layout"
import { HomeScreen } from "@/screens/HomeScreen"
import { SharedScreen } from "@/screens/SharedScreen"
import { ActivityScreen } from "@/screens/ActivityScreen"
import { ProfileScreen } from "@/screens/ProfileScreen"
import { AlbumDetailScreen } from "@/screens/AlbumDetailScreen"

export function App() {
  const [activeTab, setActiveTab] = React.useState<Tab>("home")
  const [selectedAlbumId, setSelectedAlbumId] = React.useState<string | null>(
    null
  )

  const handleSelectAlbum = (id: string) => {
    setSelectedAlbumId(id)
  }

  const handleBackToAlbums = () => {
    setSelectedAlbumId(null)
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setSelectedAlbumId(null) // Reset deep view when switching tabs
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="phishare-theme">
      <MainLayout activeTab={activeTab} onTabChange={handleTabChange}>
        {activeTab === "home" &&
          (selectedAlbumId ? (
            <AlbumDetailScreen
              albumId={selectedAlbumId}
              onBack={handleBackToAlbums}
            />
          ) : (
            <HomeScreen onSelectAlbum={handleSelectAlbum} />
          ))}

        {activeTab === "shared" &&
          (selectedAlbumId ? (
            <AlbumDetailScreen
              albumId={selectedAlbumId}
              onBack={handleBackToAlbums}
            />
          ) : (
            <SharedScreen onSelectAlbum={handleSelectAlbum} />
          ))}

        {activeTab === "activity" && <ActivityScreen />}

        {activeTab === "profile" && <ProfileScreen />}
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
