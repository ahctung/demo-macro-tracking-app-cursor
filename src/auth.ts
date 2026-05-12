import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { validateUserCredentials } from "@/lib/in-memory-user-store"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
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
      authorize(credentials) {
        const email = typeof credentials.email === "string" ? credentials.email : ""
        const password = typeof credentials.password === "string" ? credentials.password : ""

        if (!email || !password) {
          return null
        }

        const user = validateUserCredentials(email, password)

        if (!user) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
})
