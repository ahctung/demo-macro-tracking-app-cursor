import "server-only"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

export type StoredUser = {
  id: string
  email: string
  password: string
  createdAt: string
}

export type PublicUser = Omit<StoredUser, "password">

type RegisterUserInput = {
  email: string
  password: string
}

const usersFilePath = join(process.cwd(), "data", "users.json")

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function toPublicUser(user: StoredUser): PublicUser {
  const { password: _password, ...publicUser } = user
  return publicUser
}

async function readUsers() {
  try {
    const raw = await readFile(usersFilePath, "utf8")
    const users = JSON.parse(raw) as StoredUser[]
    return Array.isArray(users) ? users : []
  } catch (error) {
    const isMissingFile =
      error instanceof Error && "code" in error && error.code === "ENOENT"

    if (isMissingFile) {
      await writeUsers([])
      return []
    }

    throw error
  }
}

async function writeUsers(users: StoredUser[]) {
  await mkdir(join(process.cwd(), "data"), { recursive: true })
  await writeFile(usersFilePath, JSON.stringify(users, null, 2))
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email)
  const users = await readUsers()

  return users.find((user) => user.email === normalizedEmail)
}

export async function registerUser({ email, password }: RegisterUserInput): Promise<PublicUser> {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.")
  }

  const users = await readUsers()

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("A user with that email already exists.")
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  }

  users.push(user)
  await writeUsers(users)

  return toPublicUser(user)
}

export async function validateUserCredentials(email: string, password: string) {
  const user = await findUserByEmail(email)

  if (!user || user.password !== password) {
    return null
  }

  return toPublicUser(user)
}
