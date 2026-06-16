import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LogInIcon, ArrowLeftIcon, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/context/AuthProvider"
import type { AuthResult } from "@/types/auth.types"

type FieldErrors = Partial<Record<"email" | "password" | "base", string>>

export function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const auth = useAuth()
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newErrors: FieldErrors = {}

    if (!email.includes("@")) {
      newErrors.email = "Enter a valid email address"
    }

    if (password.length < 1) {
      newErrors.password = "Enter your password"
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })
      const result: AuthResult | undefined = await response
        .json()
        .catch(() => undefined)
      if (!response.ok) {
        if (result && "code" in result) {
          if (result.code === "INVALID_EMAIL_OR_PASSWORD") {
            newErrors.base = result.message
          } else if (result.code === "VALIDATION_ERROR") {
            const fieldMatch = result.message.match(/\[body\.(\w+)\]/)
            if (fieldMatch) {
              newErrors[fieldMatch[1] as keyof FieldErrors] = result.message
            }
          } else {
            newErrors.base = result.message
          }
        } else {
          newErrors.base = "Login failed"
        }
        setErrors(newErrors)
        return
      }
      if (result && "user" in result) {
        auth.login(result.user)
      }
      navigate("/")
    } catch (error) {
      console.log("ERROR:", error)
      newErrors.base = "Something went wrong"
      setErrors(newErrors)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="flex flex-col items-center gap-6 pt-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary">
            <LogInIcon className="size-6 text-primary-foreground" />
          </div>

          <div className="text-center">
            <h1 className="text-base font-semibold">Welcome back</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-email"
                className="text-xs font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="login-password"
                className="text-xs font-medium text-foreground"
              >
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            {errors.base && (
              <p className="text-xs text-destructive">{errors.base}</p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 w-full"
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Create one
            </Link>
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon className="size-3.5" />
            Cancel
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
