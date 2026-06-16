import { createContext, useState, useContext, useEffect } from "react"
import type {
  User,
  AuthContextType,
  AuthProviderPropType,
  GetSessionResponse,
} from "@/types/auth.types"

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: AuthProviderPropType) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL

  useEffect(() => {
    let isMounted = true
    async function initializeAuth() {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/get-session`, {
          credentials: "include",
        })
        if (!response.ok) {
          console.warn(
            "Auth Initialization failed, keeping user state unchanged"
          )
          return
        }
        const result: GetSessionResponse = await response.json()

        if (!result) {
          setUser(null)
          return
        }

        if (!isMounted) return
        login(result.user)
      } catch (error) {
        console.log(error)
        setUser(null)
      } finally {
        if (isMounted) {
          setIsAuthLoading(false)
        }
      }
    }
    initializeAuth()

    return () => {
      isMounted = false
    }
  }, [])

  function login(userData: User) {
    setUser(userData)
  }

  async function logout() {
    await fetch(`${BASE_URL}/api/auth/sign-out`, {
      method: "POST",
      credentials: "include",
    })
    setUser(null)
  }

  function updateUser(userData: Partial<User>) {
    setUser((prev) => (prev ? { ...prev, ...userData } : null))
  }

  const value: AuthContextType = {
    user,
    isAuthLoading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be inside AuthProvider")
  }
  return context
}
