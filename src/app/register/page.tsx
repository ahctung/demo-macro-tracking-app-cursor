import Link from "next/link"

import {
  RegisterForm,
  type RegisterFormState,
} from "@/components/auth/register-form"
import { registerUser } from "@/lib/in-memory-user-store"

async function registerUserAction(
  _previousState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  "use server"

  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  if (!name || !email || !password || !confirmPassword) {
    return {
      status: "error",
      message: "Please fill in all fields.",
    }
  }

  if (password.length < 8) {
    return {
      status: "error",
      message: "Password must be at least 8 characters long.",
    }
  }

  if (password !== confirmPassword) {
    return {
      status: "error",
      message: "Passwords do not match.",
    }
  }

  try {
    registerUser({ name, email, password })

    return {
      status: "success",
      message: "Account created. This demo account is stored in memory only.",
    }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unable to create your account.",
    }
  }
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <Link href="/" className="text-xl font-semibold">
          MacroTrack
        </Link>

        <RegisterForm action={registerUserAction} />
      </div>
    </main>
  )
}
