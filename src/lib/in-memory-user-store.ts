import "server-only"

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

const usersByEmail = new Map<string, StoredUser>()

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function toPublicUser(user: StoredUser): PublicUser {
  const { password: _password, ...publicUser } = user
  return publicUser
}

export function findUserByEmail(email: string) {
  return usersByEmail.get(normalizeEmail(email))
}

export function registerUser({ email, password }: RegisterUserInput): PublicUser {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.")
  }

  if (usersByEmail.has(normalizedEmail)) {
    throw new Error("A user with that email already exists.")
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  }

  usersByEmail.set(normalizedEmail, user)

  return toPublicUser(user)
}

export function validateUserCredentials(email: string, password: string) {
  const user = findUserByEmail(email)

  if (!user || user.password !== password) {
    return null
  }

  return toPublicUser(user)
}
