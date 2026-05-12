'use client'

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function LoginForm() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (!email || !password) {
      setMessage("Please enter your email and password.")
      return
    }

    setPending(true)
    setMessage("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    })

    setPending(false)

    if (!result || result.error) {
      setMessage("Invalid email or password.")
      return
    }

    router.push(result.url ?? "/dashboard")
    router.refresh()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Log in with the email and password you used to register.</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="alex@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          {message ? (
            <p
              className={cn(
                "text-sm",
                "text-destructive",
              )}
            >
              {message}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in..." : "Log In"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="text-muted-foreground text-sm">
        <p>
          Need an account?{" "}
          <Link href="/register" className="text-primary underline-offset-4 hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
