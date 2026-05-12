import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { validateUserCredentials } from "@/lib/in-memory-user-store"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string" ? credentials.email : ""
        const password = typeof credentials?.password === "string" ? credentials.password : ""

        if (!email || !password) {
          return null
        }

        const user = await validateUserCredentials(email, password)

        if (!user) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
        }
      },
    }),
  ],
}
