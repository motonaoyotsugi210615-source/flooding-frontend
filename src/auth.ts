export type Account = {
  id: string
  name: string
  email: string
}

type StoredAccount = Account & {
  salt: string
  passwordHash: string
}

const ACCOUNTS_KEY = "floodguard.demo.accounts.v1"
const SESSION_KEY = "floodguard.demo.session.v1"
const demoAccount: Account = { id: "demo", name: "Alex Chen", email: "" }
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000

function getAccounts(): StoredAccount[] {
  const value: unknown = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]")
  if (
    !Array.isArray(value) ||
    !value.every(
      (account) =>
        account &&
        typeof account.id === "string" &&
        typeof account.name === "string" &&
        typeof account.email === "string" &&
        typeof account.salt === "string" &&
        typeof account.passwordHash === "string",
    )
  )
    throw new Error(
      "Your local demo accounts could not be read. Please try a different browser.",
    )
  return value
}

function publicAccount(account: Account): Account {
  return { id: account.id, name: account.name, email: account.email }
}

async function hashPassword(password: string, salt: string) {
  if (!globalThis.crypto?.subtle)
    throw new Error(
      "Account creation requires a secure browser connection (HTTPS).",
    )
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  )
  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    key,
    256,
  )
  return Array.from(new Uint8Array(hash), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("")
}

function saveSession(account: Account, remember: boolean) {
  const session = JSON.stringify({
    id: account.id,
    expiresAt: Date.now() + SESSION_DURATION,
  })
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(SESSION_KEY, session)
  ;(remember ? sessionStorage : localStorage).removeItem(SESSION_KEY)
  return publicAccount(account)
}

export function readSession(): Account | null {
  try {
    const raw =
      sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session: unknown = JSON.parse(raw)
    if (
      !session ||
      typeof session !== "object" ||
      !("id" in session) ||
      !("expiresAt" in session) ||
      typeof session.id !== "string" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt < Date.now()
    )
      return null
    if (session.id === "demo") return demoAccount
    const account = getAccounts().find((account) => account.id === session.id)
    return account ? publicAccount(account) : null
  } catch {
    return null
  }
}

export async function createAccount(
  name: string,
  email: string,
  password: string,
  remember: boolean,
): Promise<Account> {
  name = name.trim()
  email = email.trim().toLowerCase()
  if (name.length < 2)
    throw new Error("Please enter a name with at least two characters.")
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.")
  if (password.length < 8)
    throw new Error("Your password needs at least 8 characters.")
  const accounts = getAccounts()
  if (accounts.some((account) => account.email === email))
    throw new Error(
      "An account with this email already exists on this browser. Please sign in instead.",
    )
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("")
  const account: StoredAccount = {
    id: crypto.randomUUID(),
    name,
    email,
    salt,
    passwordHash: await hashPassword(password, salt),
  }
  // Local prototype only: never store plaintext passwords or use this as a security boundary.
  const currentAccounts = getAccounts()
  if (currentAccounts.some((existing) => existing.email === email))
    throw new Error("This email was just registered. Please sign in instead.")
  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify([...currentAccounts, account]),
  )
  return saveSession(account, remember)
}

export async function signIn(
  email: string,
  password: string,
  remember: boolean,
): Promise<Account> {
  const account = getAccounts().find(
    (account) => account.email === email.trim().toLowerCase(),
  )
  if (
    !account ||
    (await hashPassword(password, account.salt)) !== account.passwordHash
  ) {
    throw new Error(
      "Email or password doesn’t match. Use an account created on this browser, or explore the demo.",
    )
  }
  return saveSession(account, remember)
}

export function enterDemo(): Account {
  return saveSession(demoAccount, false)
}
export function signOut() {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}
