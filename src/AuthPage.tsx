import { useRef, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { createAccount, enterDemo, signIn } from "./auth"
import type { Account } from "./auth"

type AuthIcon = "shield" | "users" | "map" | "arrow" | "check"

export default function AuthPage({
  onAuthenticated,
  renderIcon,
}: {
  onAuthenticated: (account: Account) => void
  renderIcon: (name: AuthIcon) => ReactNode
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const submitting = useRef(false)
  const errorRef = useRef<HTMLParagraphElement>(null)

  function switchMode(next: "signin" | "signup") {
    setMode(next)
    setError("")
    setPassword("")
    setConfirmPassword("")
    setShowPassword(false)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    setError("")
    if (mode === "signup" && password !== confirmPassword) {
      setError("Your passwords don’t match. Please check and try again.")
      requestAnimationFrame(() => errorRef.current?.focus())
      return
    }
    submitting.current = true
    setBusy(true)
    try {
      const account =
        mode === "signup"
          ? await createAccount(name, email, password, remember)
          : await signIn(email, password, remember)
      onAuthenticated(account)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "We couldn’t open your account. Please try again.",
      )
      requestAnimationFrame(() => errorRef.current?.focus())
    } finally {
      submitting.current = false
      setBusy(false)
    }
  }

  return (
    <div className="auth-shell">
      <aside className="auth-story">
        <div className="brand auth-brand">
          <span className="brand-symbol">{renderIcon("shield")}</span>flood
          <span>guard</span>
          <span className="brand-period">.</span>
        </div>
        <div className="auth-story-content">
          <div className="eyebrow">YOUR SAFETY COMPANION</div>
          <h1>
            Peace of mind.
            <br />
            For you and yours.
          </h1>
          <p>
            When the weather changes, you don’t have to face it alone. Stay
            informed, find safer ground, and keep your family close.
          </p>
          <div className="auth-map-illustration" aria-hidden="true">
            <svg viewBox="0 0 500 290" fill="none">
              <defs>
                <pattern
                  id="auth-streets"
                  width="64"
                  height="56"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(-15)"
                >
                  <rect width="64" height="56" fill="#e7ecdf" />
                  <rect
                    x="6"
                    y="6"
                    width="22"
                    height="18"
                    rx="3"
                    fill="#dce4d4"
                  />
                  <rect
                    x="36"
                    y="6"
                    width="22"
                    height="18"
                    rx="3"
                    fill="#dce4d4"
                  />
                  <rect
                    x="6"
                    y="32"
                    width="22"
                    height="18"
                    rx="3"
                    fill="#dce4d4"
                  />
                  <rect
                    x="36"
                    y="32"
                    width="22"
                    height="18"
                    rx="3"
                    fill="#dce4d4"
                  />
                  <path
                    d="M0 0h64M0 28h64M0 0v56M32 0v56"
                    stroke="#f4f6ee"
                    strokeWidth="5"
                  />
                </pattern>
              </defs>
              <rect
                width="500"
                height="290"
                rx="16"
                fill="url(#auth-streets)"
              />
              <path
                d="M-20 110C80 135 117 71 205 82S315 173 520 117"
                stroke="#d0dec5"
                strokeWidth="68"
              />
              <path
                d="M-20 110C80 135 117 71 205 82S315 173 520 117"
                stroke="#abcdd0"
                strokeWidth="28"
              />
              <path
                d="m30 280 125-83 132 4 105-122M224-20l-10 110 72 111 7 110"
                stroke="#fafbf6"
                strokeWidth="9"
              />
              <path
                d="m155 197 132 4 67-78"
                stroke="#78956a"
                strokeWidth="3"
                strokeDasharray="7 5"
              />
              <circle
                cx="155"
                cy="197"
                r="32"
                fill="#8fa783"
                fillOpacity=".15"
              />
              <circle
                cx="155"
                cy="197"
                r="21"
                fill="#8fa783"
                fillOpacity=".2"
              />
              <circle
                cx="155"
                cy="197"
                r="8"
                fill="#597b5c"
                stroke="white"
                strokeWidth="3"
              />
              <circle cx="354" cy="123" r="19" fill="white" />
              <circle cx="354" cy="123" r="15" fill="#69865f" />
              <path
                d="m347 123 7-6 7 6v7h-14v-7Z"
                stroke="white"
                strokeWidth="1.5"
              />
              <path d="M352 130v-5h4v5" stroke="white" strokeWidth="1.5" />
            </svg>
            <div className="auth-family-bubble">
              <span className="avatar peach">
                JC<span className="avatar-check">{renderIcon("check")}</span>
              </span>
              <div>
                <strong>Jamie is safe</strong>
                <span>A little reassurance, in real time.</span>
              </div>
            </div>
            <div className="auth-map-label">
              {renderIcon("shield")}Your circle. Your peace of mind.
            </div>
          </div>
          <div className="auth-benefits">
            <span>{renderIcon("map")}Know what’s nearby</span>
            <span>{renderIcon("users")}Stay connected</span>
            <span>{renderIcon("shield")}Plan ahead</span>
          </div>
        </div>
        <div className="auth-story-footer">
          Prepared together. Safer together.
          <span>Illustrative demo experience</span>
        </div>
      </aside>
      <main className="auth-main">
        <div className="auth-top-note">
          A little preparation. A lot of peace of mind.
        </div>
        <div className="auth-form-container">
          <div className="auth-welcome-icon">{renderIcon("shield")}</div>
          <div className="eyebrow">WELCOME TO FLOODGUARD</div>
          <h2>
            {mode === "signin"
              ? "Good to have you here."
              : "A safer start, together."}
          </h2>
          <p className="auth-subtitle">
            {mode === "signin"
              ? "Sign in to your safety dashboard and family circle."
              : "Create your account and take the first step toward being flood ready."}
          </p>
          <div className="auth-tabs" aria-label="Choose account action">
            <button
              type="button"
              disabled={busy}
              className={mode === "signin" ? "active" : ""}
              aria-pressed={mode === "signin"}
              onClick={() => switchMode("signin")}
            >
              Sign in
            </button>
            <button
              type="button"
              disabled={busy}
              className={mode === "signup" ? "active" : ""}
              aria-pressed={mode === "signup"}
              onClick={() => switchMode("signup")}
            >
              Create account
            </button>
          </div>
          <form onSubmit={handleSubmit} aria-busy={busy}>
            <fieldset disabled={busy}>
              {mode === "signup" && (
                <div className="auth-field">
                  <label className="form-label" htmlFor="auth-name">
                    Your name
                  </label>
                  <input
                    id="auth-name"
                    className="text-input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    placeholder="e.g. Alex Chen"
                    required
                    minLength={2}
                    maxLength={60}
                  />
                </div>
              )}
              <div className="auth-field">
                <label className="form-label" htmlFor="auth-email">
                  Email address
                </label>
                <input
                  id="auth-email"
                  className="text-input"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                />
              </div>
              <div className="auth-field">
                <label className="form-label" htmlFor="auth-password">
                  Password
                </label>
                <div className="auth-password">
                  <input
                    id="auth-password"
                    className="text-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete={
                      mode === "signup" ? "new-password" : "current-password"
                    }
                    placeholder={
                      mode === "signup"
                        ? "Create a password"
                        : "Enter your password"
                    }
                    required
                    minLength={mode === "signup" ? 8 : undefined}
                    maxLength={128}
                    aria-describedby={
                      mode === "signup" ? "password-hint" : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {mode === "signup" && (
                  <small id="password-hint" className="auth-input-hint">
                    At least 8 characters. Please don’t reuse a real password.
                  </small>
                )}
              </div>
              {mode === "signup" && (
                <div className="auth-field">
                  <label className="form-label" htmlFor="auth-confirm">
                    Confirm password
                  </label>
                  <input
                    id="auth-confirm"
                    className="text-input"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    required
                    maxLength={128}
                  />
                </div>
              )}
              <label className="auth-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                Keep me signed in on this device<small>7 days</small>
              </label>
              {error && (
                <p
                  className="auth-error"
                  role="alert"
                  ref={errorRef}
                  tabIndex={-1}
                >
                  {error}
                </p>
              )}
              <button className="primary-button auth-submit" type="submit">
                {busy
                  ? "Opening your dashboard…"
                  : mode === "signin"
                    ? "Sign in"
                    : "Create my account"}
                {!busy && renderIcon("arrow")}
              </button>
            </fieldset>
          </form>
          <div className="auth-divider">
            <span />
            or take a look around
            <span />
          </div>
          <button
            className="outline-button auth-demo-button"
            disabled={busy}
            onClick={() => {
              try {
                onAuthenticated(enterDemo())
              } catch {
                setError(
                  "Your browser storage is unavailable. Please allow site storage to open the demo.",
                )
              }
            }}
          >
            {renderIcon("map")}Explore the demo
          </button>
          <div className="auth-demo-note">
            {renderIcon("shield")}
            <p>
              <strong>A local demo, not live authentication.</strong> Accounts
              stay in this browser only. Use sample details, not sensitive
              information. Live alerts and locations are also simulated.
            </p>
          </div>
        </div>
        <footer className="auth-footer">
          <span>
            In immediate danger? <a href="tel:911">Call 911</a>
          </span>
          <a
            href="https://www.ready.gov/floods"
            target="_blank"
            rel="noreferrer"
          >
            Official flood-safety guidance ↗
          </a>
        </footer>
      </main>
    </div>
  )
}
