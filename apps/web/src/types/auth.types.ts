import { type ReactNode } from "react"

export type User = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: string
  updatedAt: string
}

export type AuthSuccess = { redirect: false; token: string; user: User }

export type AuthError = { message: string; code: string }

export type Session = {
  id: string
  userId: string
  expiresAt: string
  createdAt: string
  updatedAt: string
  ipAddress?: string
  userAgent?: string
}

export type AuthResult = AuthSuccess | AuthError

export type GetSessionResponse = { session: Session; user: User } | null

export type AuthContextType = {
  user: User | null
  isAuthLoading: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

export type AuthProviderPropType = {
  children: ReactNode
}
