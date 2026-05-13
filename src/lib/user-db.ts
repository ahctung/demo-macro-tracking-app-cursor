import "server-only"

import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client"

import { prisma } from "@/lib/prisma"

const BCRYPT_ROUNDS = 12

export type PublicUser = {
  id: string
  email: string
  createdAt: string
}

type RegisterUserInput = {
  email: string
  password: string
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function toPublicUser(user: {
  id: string
  email: string
  createdAt: Date
}): PublicUser {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  }
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email)

  return prisma.user.findUnique({
    where: { email: normalizedEmail },
  })
}

export async function registerUser({ email, password }: RegisterUserInput): Promise<PublicUser> {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.")
  }

  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })

  if (existing) {
    throw new Error("A user with that email already exists.")
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)

  try {
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
      },
    })

    return toPublicUser(user)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("A user with that email already exists.")
    }

    throw error
  }
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await findUserByEmail(email)

  if (!user) {
    return null
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)

  if (!isValid) {
    return null
  }

  return toPublicUser(user)
}
