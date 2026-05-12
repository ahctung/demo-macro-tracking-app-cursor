'use client'

import Link from "next/link"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"

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

export type RegisterFormState = {
  status: "idle" | "success" | "error"
  message: string
}

export type RegisterFormAction = (
  previousState: RegisterFormState,
  formData: FormData,
) => Promise<RegisterFormState>

export const initialRegisterFormState: RegisterFormState = {
  status: "idle",
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Creating account..." : "Create account"}
    </Button>
  )
}

export function RegisterForm({ action }: { action: RegisterFormAction }) {
  const [state, formAction] = useActionState(action, initialRegisterFormState)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          This first version stores users in memory only, so accounts reset when the server restarts.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Alex Smith" autoComplete="name" required />
          </div>

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
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          {state.message ? (
            <p
              className={cn(
                "text-sm",
                state.status === "error" ? "text-destructive" : "text-green-600",
              )}
            >
              {state.message}
            </p>
          ) : null}

          <SubmitButton />
        </form>
      </CardContent>

      <CardFooter className="text-muted-foreground text-sm">
        <p>
          Already on the landing page?{" "}
          <Link href="/" className="text-primary underline-offset-4 hover:underline">
            Go back home
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
