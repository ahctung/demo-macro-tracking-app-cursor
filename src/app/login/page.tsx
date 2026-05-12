import Link from "next/link"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/auth"
import { LoginForm } from "@/components/auth/login-form"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session?.user?.email) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <Link href="/" className="text-xl font-semibold">
          MacroTrack
        </Link>

        <LoginForm />
      </div>
    </main>
  )
}
