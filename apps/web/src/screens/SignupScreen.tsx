import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserPlusIcon, ArrowLeftIcon, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/context/AuthProvider"
import type { AuthResult } from "@/types/auth.types"

type FieldErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword" | "base", string>
>

export function SignupScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL
  const auth = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const newErrors: FieldErrors = {}

    if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters"
    }

    if (!email.includes("@")) {
      newErrors.email = "Enter a valid email address"
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setIsSubmitting(true)

    const signupData = {
      name,
      email,
      password,
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(signupData),
      })
      const result: AuthResult | undefined = await response
        .json()
        .catch(() => undefined)
      if (!response.ok) {
        if (result && "code" in result) {
          if (result.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            newErrors.email = result.message
          } else if (result.code === "VALIDATION_ERROR") {
            const fieldMatch = result.message.match(/\[body\.(\w+)\]/)
            if (fieldMatch) {
              newErrors[fieldMatch[1] as keyof FieldErrors] = result.message
            }
          } else {
            newErrors.base = result.message
          }
        } else {
          newErrors.base = "Signup failed"
        }
        setErrors(newErrors)
        return
      }
      if (result && "user" in result) {
        auth.login(result.user)
      }
      console.log("Signup successful")
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
            <UserPlusIcon className="size-6 text-primary-foreground" />
          </div>

          <div className="text-center">
            <h1 className="text-base font-semibold">Create an account</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Get started with Phishare
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-name"
                className="text-xs font-medium text-foreground"
              >
                Name
              </label>
              <Input
                id="signup-name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-email"
                className="text-xs font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="signup-email"
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
                htmlFor="signup-password"
                className="text-xs font-medium text-foreground"
              >
                Password
              </label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                aria-invalid={!!errors.password}
              />
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-confirm-password"
                className="text-xs font-medium text-foreground"
              >
                Confirm Password
              </label>
              <Input
                id="signup-confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                aria-invalid={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {errors.confirmPassword}
                </p>
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
                "Create account"
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline-offset-2 hover:underline"
            >
              Sign in
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
