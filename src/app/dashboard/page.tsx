import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { authOptions } from "@/auth"
import { DashboardPageClient } from "@/components/dashboard/dashboard-page-client"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/login")
  }

  return <DashboardPageClient userEmail={session.user.email} />
}
