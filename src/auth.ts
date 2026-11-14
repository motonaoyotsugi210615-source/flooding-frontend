export type AccountProfile = "standard" | "accessibility" | "senior" | "kids"

function normalizeProfile(profile: unknown): AccountProfile {
  if (profile === "kids") return "kids"
  if (profile === "senior" || profile === "accessibility") return "senior"
  return "standard"
}

export type Account = {
  id: string
  name: string
  email: string
  username: string
  profile: AccountProfile
}

type StoredAccount = Account & {
  salt: string
  passwordHash: string
}

const ACCOUNTS_KEY = "floodguard.demo.accounts.v1"
const SESSION_KEY = "floodguard.demo.session.v1"
const demoAccount: Account = {
  id: "demo",
  name: "Aoi Sato",
  email: "aoi@example.jp",
  username: "aoi.sato",
  profile: "standard",
}
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
        (typeof account.username === "string" ||
          typeof account.username === "undefined") &&
        (typeof account.profile === "undefined" ||
          account.profile === "standard" ||
          account.profile === "accessibility" ||
          account.profile === "senior" ||
          account.profile === "kids") &&
        typeof account.salt === "string" &&
        typeof account.passwordHash === "string",
    )
  )
    throw new Error(
      "Your local demo accounts could not be read. Please try a different browser.",
    )
  return value.map((account) => ({
    ...account,
    username:
      account.username ||
      account.email.split("@")[0].replace(/[^a-z0-9._]/gi, "") ||
      `member-${account.id.slice(0, 6)}`,
    profile:
      normalizeProfile(account.profile),
  }))
}

function publicAccount(account: Account): Account {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    username: account.username,
    profile: account.profile,
  }
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
    profile: account.profile,
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
    const profile =
      session &&
      typeof session === "object" &&
      "profile" in session &&
      (session.profile === "accessibility" ||
        session.profile === "senior" ||
        session.profile === "kids")
        ? session.profile
        : "standard"
    if (session.id === "demo") return { ...demoAccount, profile }
    const account = getAccounts().find((account) => account.id === session.id)
    return account ? publicAccount({ ...account, profile: normalizeProfile(profile) }) : null
  } catch {
    return null
  }
}

export async function createAccount(
  name: string,
  username: string,
  email: string,
  password: string,
  remember: boolean,
  profile: AccountProfile = "standard",
): Promise<Account> {
  name = name.trim()
  username = username.trim().toLowerCase().replace(/^@/, "")
  email = email.trim().toLowerCase()
  if (name.length < 2)
    throw new Error("Please enter a name with at least two characters.")
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.")
  if (!/^[a-z0-9][a-z0-9._-]{2,23}$/.test(username))
    throw new Error(
      "Choose a username with 3–24 letters, numbers, dots, dashes, or underscores.",
    )
  if (password.length < 8)
    throw new Error("Your password needs at least 8 characters.")
  const accounts = getAccounts()
  if (accounts.some((account) => account.email === email))
    throw new Error(
      "An account with this email already exists on this browser. Please sign in instead.",
    )
  if (accounts.some((account) => account.username === username))
    throw new Error(
      "This username is already in use on this browser. Please choose another.",
    )
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("")
  const account: StoredAccount = {
    id: crypto.randomUUID(),
    name,
    email,
    username,
    profile,
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
  identifier: string,
  password: string,
  remember: boolean,
): Promise<Account> {
  identifier = identifier.trim().toLowerCase().replace(/^@/, "")
  const account = getAccounts().find(
    (account) =>
      account.email === identifier || account.username === identifier,
  )
  if (
    !account ||
    (await hashPassword(password, account.salt)) !== account.passwordHash
  ) {
    throw new Error(
      "Email, username, or password doesn’t match. Use an account created on this browser, or explore the demo.",
    )
  }
  return saveSession(account, remember)
}

export function updateAccountProfile(
  account: Account,
  profile: AccountProfile,
): Account {
  const updatedAccount = { ...account, profile }
  if (account.id !== "demo") {
    const accounts = getAccounts().map((storedAccount) =>
      storedAccount.id === account.id
        ? { ...storedAccount, profile }
        : storedAccount,
    )
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  }

  for (const storage of [sessionStorage, localStorage]) {
    const rawSession = storage.getItem(SESSION_KEY)
    if (!rawSession) continue
    try {
      const session: unknown = JSON.parse(rawSession)
      if (
        session &&
        typeof session === "object" &&
        "id" in session &&
        session.id === account.id
      ) {
        storage.setItem(SESSION_KEY, JSON.stringify({ ...session, profile }))
      }
    } catch {
      // Keep the account profile updated even if a stale session is malformed.
    }
  }
  return updatedAccount
}

export function enterDemo(): Account {
  return saveSession(demoAccount, false)
}
export function signOut() {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}
