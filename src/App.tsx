import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import AuthPage from "./AuthPage"
import { readSession, signOut } from "./auth"
import type { Account } from "./auth"

type IconName = "shield" | "grid" | "map" | "route" | "users" | "book" | "download" | "settings" | "help" | "pin" | "chevron" | "arrow" | "bell" | "warning" | "check" | "plus" | "minus" | "locate" | "layers" | "close" | "clock" | "cloud" | "phone" | "external" | "wifi" | "search"
function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName
  size?: number
  className?: string
}) {
  const paths: Record<IconName, ReactNode> = {
    shield: (
      <>
        <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 6h7a4 4 0 0 1 0 8H8a4 4 0 0 0-4 4h11" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2" />
      </>
    ),
    book: (
      <>
        <path d="M12 5v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2V4Z" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </>
    ),
    settings: (
      <>
        <path d="m10 3-1 3-3 1-3 3 2 3-1 3 3 3 3-1 3 2 3-1 1-3 3-1 1-4-3-2-1-3-4-1-3-2Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4m0 3h.01" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    bell: (
      <>
        <path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3ZM10 21h4" />
      </>
    ),
    warning: (
      <>
        <path d="m12 3 10 18H2L12 3Z" />
        <path d="M12 9v5m0 3h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    locate: (
      <>
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 6-10 6L2 9l10-6Zm-9 11 9 5 9-5M3 18l9 5 9-5" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    cloud: (
      <>
        <path d="M6 15a5 5 0 1 1 2-9 6 6 0 0 1 11 4 3 3 0 0 1-1 6H6" />
        <path d="m8 19-1 2m6-2-1 2m6-2-1 2" />
      </>
    ),
    phone: (
      <path d="m6 3 4 4-2 3c2 3 3 4 6 6l3-2 4 4-2 3C10 22 2 14 3 6l3-3Z" />
    ),
    external: (
      <>
        <path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7" />
      </>
    ),
    wifi: (
      <>
        <path d="M3 8a14 14 0 0 1 18 0M6 12a9 9 0 0 1 12 0m-9 4a4 4 0 0 1 6 0" />
        <circle cx="12" cy="20" r=".5" />
      </>
    ),
    search: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const navItems: { label: string icon: IconName }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Live flood map", icon: "map" },
  { label: "Evacuation routes", icon: "route" },
  { label: "My family", icon: "users" },
  { label: "Flood preparedness", icon: "book" },
  { label: "Offline maps", icon: "download" },
]
type FamilyMember = {
  name: string
  initials: string
  color: string
  location: string
  status: string
  time: string
  mapPosition?: [number, number]
}
const initialFamily: FamilyMember[] = [
  {
    name: "You",
    initials: "AC",
    color: "olive",
    location: "At your current location",
    status: "Not checked in",
    time: "Just now",
  },
  {
    name: "Jamie Chen",
    initials: "JC",
    color: "peach",
    location: "At home · 0.8 mi away",
    mapPosition: [385, 222],
    status: "Safe",
    time: "5 min ago",
  },
  {
    name: "Emma Chen",
    initials: "EC",
    color: "lavender",
    location: "Lincoln High School · 1.2 mi",
    mapPosition: [602, 348],
    status: "Safe",
    time: "12 min ago",
  },
  {
    name: "Michael Chen",
    initials: "MC",
    color: "blue",
    location: "Downtown · 2.4 mi away",
    mapPosition: [305, 346],
    status: "Awaiting check-in",
    time: "28 min ago",
  },
]
const updates = [
  {
    icon: "warning" as IconName,
    color: "amber",
    title: "Flood warning for Sacramento County",
    description:
      "Low-lying areas near the American River may experience flooding.",
    source: "National Weather Service",
    time: "8 min ago",
    tag: "Warning",
  },
  {
    icon: "route" as IconName,
    color: "blue",
    title: "Road closure on Garden Highway",
    description:
      "Between Northgate Blvd and Discovery Park. Use alternate routes.",
    source: "Sacramento County",
    time: "24 min ago",
    tag: "Road closure",
  },
  {
    icon: "cloud" as IconName,
    color: "mint",
    title: "Rainfall expected to ease this afternoon",
    description:
      "Light showers forecast after 3 PM. Continue to monitor conditions.",
    source: "National Weather Service",
    time: "42 min ago",
    tag: "Weather",
  },
]

function FloodMap({
  large = false,
  route = false,
  family,
  onPlan,
}: {
  large?: boolean
  route?: boolean
  family: FamilyMember[]
  onPlan: () => void
}) {
  const [zoom, setZoom] = useState(1)
  const [layers, setLayers] = useState(true)
  const [selected, setSelected] = useState(false)
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null)
  const selectedMember = family.find((member) => member.name === selectedFamily)
  return (
    <div className={`flood-map ${large ? "large-map" : ""}`}>
      <svg
        viewBox="0 0 900 440"
        preserveAspectRatio="xMidYMid slice"
        className="map-art"
        role="group"
        aria-label="Illustrative Sacramento flood map showing an affected river area, your location, family locations, and an evacuation shelter"
      >
        <defs>
          <pattern
            id="blocks"
            width="74"
            height="64"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-15)"
          >
            <rect width="74" height="64" fill="#eaece5" />
            <rect x="7" y="7" width="26" height="22" rx="2" fill="#e1e4dc" />
            <rect x="40" y="7" width="26" height="22" rx="2" fill="#e2e5dd" />
            <rect x="7" y="36" width="26" height="20" rx="2" fill="#e2e5dd" />
            <rect x="40" y="36" width="26" height="20" rx="2" fill="#e0e4dc" />
            <path
              d="M0 0h74M0 32h74M0 64h74M0 0v64M37 0v64M74 0v64"
              stroke="#fafbf7"
              strokeWidth="5"
            />
          </pattern>
          <pattern
            id="flood-lines"
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(35)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="9"
              stroke="#eaa85b"
              strokeWidth="2"
              opacity=".25"
            />
          </pattern>
          <filter id="pin-shadow">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodOpacity=".15" />
          </filter>
        </defs>
        <rect width="900" height="440" fill="url(#blocks)" />
        <g
          transform={`translate(${450 - 450 * zoom} ${220 - 220 * zoom}) scale(${zoom})`}
        >
          <path
            d="M0 0h253l-9 70-74 26-59 64L0 183ZM620 0h280v63l-73 19-81-16-56-43ZM900 265l-96 25-22 92 54 58h64ZM299 287l74-9 52 47-26 70-91-6-39-54Z"
            fill="#d7e2cd"
          />
          <path
            d="M-40 276C88 285 163 235 241 186S341 154 429 166s122-46 224-51S813 138 940 64"
            stroke="#d0e1ce"
            strokeWidth="86"
            fill="none"
          />
          {layers && (
            <>
              <path
                d="M-30 225 83 225 174 185 262 126 362 119 436 130 511 99 652 80 779 85 908 13 937 94 803 164 668 168 576 178 499 216 419 212 338 202 290 221 195 278 82 313-30 316Z"
                fill="#f2c583"
                opacity=".39"
              />
              <path
                d="M-30 225 83 225 174 185 262 126 362 119 436 130 511 99 652 80 779 85 908 13 937 94 803 164 668 168 576 178 499 216 419 212 338 202 290 221 195 278 82 313-30 316Z"
                fill="url(#flood-lines)"
                stroke="#e1a252"
                strokeDasharray="6 5"
                strokeWidth="1.5"
              />
            </>
          )}
          <path
            d="M-40 276C88 285 163 235 241 186S341 154 429 166s122-46 224-51S813 138 940 64"
            stroke="#a6cdd1"
            strokeWidth="38"
            fill="none"
          />
          <path
            d="M-30 366 184 322 389 289 583 235 927 245M75-20 150 97 222 266 259 458M500-20 531 116 593 274 669 460M725-20 702 116 717 300 770 460"
            fill="none"
            stroke="#d4d6ce"
            strokeWidth="14"
          />
          <path
            d="M-30 366 184 322 389 289 583 235 927 245M75-20 150 97 222 266 259 458M500-20 531 116 593 274 669 460M725-20 702 116 717 300 770 460"
            fill="none"
            stroke="#fffefa"
            strokeWidth="9"
          />
          <path
            d="M-10 415 259 376 441 333 616 335 922 377"
            fill="none"
            stroke="#d6d5b6"
            strokeWidth="15"
          />
          <path
            d="M-10 415 259 376 441 333 616 335 922 377"
            fill="none"
            stroke="#f8f4d9"
            strokeWidth="10"
          />
          <path
            d="M343-20 340 107 366 204 401 306 445 450"
            fill="none"
            stroke="#d1d3c9"
            strokeWidth="10"
          />
          <path
            d="M343-20 340 107 366 204 401 306 445 450"
            fill="none"
            stroke="#fffdf7"
            strokeWidth="6"
          />
          <g
            fill="#7f897d"
            fontFamily="Inter, sans-serif"
            fontSize="10"
            letterSpacing="1.2"
          >
            <text x="80" y="125">
              SOUTH NATOMAS
            </text>
            <text x="426" y="70">
              NORTHGATE
            </text>
            <text x="545" y="391">
              MIDTOWN
            </text>
            <text x="113" y="408">
              DOWNTOWN
            </text>
            <text x="745" y="205">
              WOODLAKE
            </text>
          </g>
          <g fill="#899285" fontFamily="Inter, sans-serif" fontSize="9">
            <text x="303" y="340" transform="rotate(-12 303 340)">
              Jibboom St
            </text>
            <text x="594" y="228" transform="rotate(2 594 228)">
              Richards Blvd
            </text>
            <text x="64" y="322" transform="rotate(-13 64 322)">
              Garden Hwy
            </text>
            <text x="677" y="302" transform="rotate(72 677 302)">
              Northgate Blvd
            </text>
            <text x="264" y="70">
              Discovery Park
            </text>
          </g>
          <text
            x="326"
            y="172"
            fill="#4d898e"
            fontSize="11"
            fontStyle="italic"
            transform="rotate(5 326 172)"
          >
            American River
          </text>
          <g transform="translate(187 302)">
            <rect
              x="-10"
              y="-8"
              width="21"
              height="16"
              rx="4"
              fill="white"
              stroke="#d5d9d0"
            />
            <text textAnchor="middle" y="4" fontSize="9" fill="#778277">
              5
            </text>
          </g>
          {route && (
            <path
              d="M487 274 477 312 583 335 628 299 646 269"
              fill="none"
              stroke="#3f795e"
              strokeWidth="5"
              strokeDasharray="9 5"
            />
          )}
          <g transform="translate(647 269)" filter="url(#pin-shadow)">
            <circle r="17" fill="#fff" />
            <circle r="13" fill="#55795e" />
            <path
              d="m-6 0 6-5 6 5v6H-6Z"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />
            <path d="M-1 6V2h3v4" stroke="white" fill="none" />
          </g>
          <text
            x="646"
            y="302"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="10"
            fill="#50654c"
          >
            Evacuation shelter
          </text>
          {layers && (
            <g transform="translate(236 199)">
              <circle r="14" fill="#fff9ee" stroke="#eac887" />
              <path d="m0-7 8 13H-8L0-7Z" fill="#d89838" />
              <path d="M0-2v4m0 2h.01" stroke="white" strokeWidth="1.5" />
            </g>
          )}
          <g transform="translate(487 274)">
            <circle r="31" fill="#6093a5" opacity=".13" />
            <circle r="20" fill="#6093a5" opacity=".16" />
            <circle r="9" fill="#438698" stroke="white" strokeWidth="3" />
          </g>
          <g transform="translate(447 228)" filter="url(#pin-shadow)">
            <rect width="81" height="28" rx="7" fill="white" />
            <text
              x="40"
              y="18"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="10"
              fill="#33443d"
              fontWeight="600"
            >
              You are here
            </text>
            <path d="m35 27 5 6 5-6" fill="white" />
          </g>
          {family
            .filter((member) => member.mapPosition)
            .map((member) => (
              <foreignObject
                key={member.name}
                x={member.mapPosition![0] - 40}
                y={member.mapPosition![1] - 36}
                width="80"
                height="65"
                className="family-map-marker"
              >
                <button
                  className={`family-map-pin ${
                    selectedFamily === member.name ? "selected" : ""
                  }`}
                  aria-label={`${member.name}, ${member.location}, ${member.status}. View location details`}
                  aria-pressed={selectedFamily === member.name}
                  onClick={() => {
                    setSelected(false)
                    setSelectedFamily(
                      selectedFamily === member.name ? null : member.name,
                    )
                  }}
                >
                  <span className={`avatar ${member.color}`}>
                    {member.initials}
                    {member.status === "Safe" && (
                      <span className="avatar-check">
                        <Icon name="check" size={8} />
                      </span>
                    )}
                    {member.status !== "Safe" && (
                      <span className="map-awaiting-dot" />
                    )}
                  </span>
                  <span className="family-map-name">
                    {member.name.split(" ")[0]}
                  </span>
                </button>
              </foreignObject>
            ))}
        </g>
      </svg>
      <div className="map-location">
        <span className="live-dot" /> Sacramento, CA{" "}
        <span className="map-demo">Demo map</span>
      </div>
      <div className="map-controls">
        <button
          aria-label="Zoom in"
          onClick={() => setZoom(Math.min(zoom + 0.2, 1.8))}
        >
          <Icon name="plus" size={17} />
        </button>
        <button
          aria-label="Zoom out"
          onClick={() => setZoom(Math.max(zoom - 0.2, 1))}
        >
          <Icon name="minus" size={17} />
        </button>
        <button
          aria-label="Center on your location"
          onClick={() => {
            setZoom(1)
            setSelected(true)
            setSelectedFamily(null)
          }}
        >
          <Icon name="locate" size={17} />
        </button>
      </div>
      <button
        className={`layer-button ${layers ? "active" : ""}`}
        onClick={() => setLayers(!layers)}
        aria-label="Toggle flood layer"
        aria-pressed={layers}
      >
        <Icon name="layers" size={18} />
      </button>
      {selectedMember && (
        <div className="location-popup family-location-popup" role="status">
          <div className="family-popup-heading">
            <span className={`avatar ${selectedMember.color}`}>
              {selectedMember.initials}
            </span>
            <div>
              <strong>{selectedMember.name}</strong>
              <span>Demo family location</span>
            </div>
          </div>
          <span>{selectedMember.location}</span>
          <span
            className={`member-status ${
              selectedMember.status === "Safe" ? "safe" : "waiting"
            }`}
          >
            {selectedMember.status}
          </span>
          <small>Last updated {selectedMember.time.toLowerCase()}</small>
          <button
            className="popup-close"
            onClick={() => setSelectedFamily(null)}
            aria-label="Close family location"
          >
            <Icon name="close" size={13} />
          </button>
        </div>
      )}
      {selected && (
        <div className="location-popup">
          <strong>Your demo location</strong>
          <span>0.8 mi from the affected area</span>
          <button onClick={onPlan}>
            View evacuation options <Icon name="arrow" size={14} />
          </button>
          <button
            className="popup-close"
            onClick={() => setSelected(false)}
            aria-label="Close location"
          >
            <Icon name="close" size={13} />
          </button>
        </div>
      )}
      <button
        className="map-location-hit"
        aria-label="View your location details"
        onClick={() => {
          setSelected(!selected)
          setSelectedFamily(null)
        }}
      />
      <div className="map-legend">
        <span>
          <i className="legend-flood" /> Flood warning
        </span>
        <span>
          <i className="legend-shelter" /> Evacuation shelter
        </span>
        <span>
          <i className="legend-you" /> Your location
        </span>
        <span>
          <i className="legend-family" /> Family
        </span>
      </div>
      <span className="map-scale">
        500 m <i />
      </span>
    </div>
  )
}

function Modal({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string
  subtitle?: string
  onClose: () => void
  children: ReactNode
}) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current()
    }
    document.addEventListener("keydown", handler)
    const previous = document.activeElement as HTMLElement | null
    const dialog = document.querySelector<HTMLDivElement>(".modal")
    dialog?.focus()
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return
      const elements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, input, select, a[href], [tabindex="0"]',
        ),
      )
      const first = elements[0],
        last = elements[elements.length - 1]
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener("keydown", trap)
    return () => {
      document.removeEventListener("keydown", handler)
      document.removeEventListener("keydown", trap)
      previous?.focus()
    }
  }, [])
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function App() {
  const [account, setAccount] = useState<Account | null>(readSession)
  if (!account)
    return (
      <AuthPage
        onAuthenticated={setAccount}
        renderIcon={(name) => <Icon name={name} />}
      />
    )
  return (
    <Dashboard
      account={account}
      onSignOut={() => {
        try {
          signOut()
        } finally {
          setAccount(null)
        }
      }}
    />
  )
}

function Dashboard({
  account,
  onSignOut,
}: {
  account: Account
  onSignOut: () => void
}) {
  const initials = account.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  const [page, setPage] = useState("Overview")
  const [modal, setModal] = useState<string | null>(null)
  const [safe, setSafe] = useState(false)
  const [toast, setToast] = useState("")
  const [family, setFamily] = useState(() =>
    initialFamily.map((member, index) =>
      index === 0 ? { ...member, initials } : member,
    ),
  )
  const [invite, setInvite] = useState("")
  const [downloads, setDownloads] = useState<string[]>([])
  const [stage, setStage] = useState("Before a flood")
  const [checked, setChecked] = useState<string[]>([])
  const [notifications, setNotifications] = useState(true)
  const [routeStarted, setRouteStarted] = useState(false)
  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(""), 4500)
      return () => clearTimeout(id)
    }
  }, [toast])
  function checkIn() {
    setSafe(!safe)
    setToast(
      safe
        ? "Your check-in has been cleared."
        : "Your safe status is now visible in your demo family circle.",
    )
  }
  const familyCard = (
    <section className="card family-card">
      <div className="card-header">
        <div className="section-title">
          <Icon name="users" size={19} />
          <h2>My family</h2>
          <span className="count">{family.length}</span>
        </div>
        <button
          className="subtle-icon"
          aria-label="Invite a family member"
          onClick={() => setModal("invite")}
        >
          <Icon name="plus" size={20} />
        </button>
      </div>
      <div className="family-summary">
        <span className="status-dot" />
        {safe ? 3 : 2} of {family.length} members marked safe
      </div>
      <div className="family-list">
        {family.map((member, index) => (
          <div className="family-member" key={member.name}>
            <div className={`avatar ${member.color}`}>
              {member.initials}
              {(member.status === "Safe" || (index === 0 && safe)) && (
                <span className="avatar-check">
                  <Icon name="check" size={8} />
                </span>
              )}
            </div>
            <div className="member-info">
              <div className="member-name">
                {member.name}
                {index === 0 && <span className="you-tag">You</span>}
                <span className="member-time">{member.time}</span>
              </div>
              <p>{member.location}</p>
              <span
                className={`member-status ${
                  member.status === "Safe" || (index === 0 && safe)
                    ? "safe"
                    : "waiting"
                }`}
              >
                {index === 0
                  ? safe
                    ? "Marked safe"
                    : "Not checked in"
                  : member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`safe-button ${safe ? "checked-in" : ""}`}
        onClick={checkIn}
      >
        <Icon name="shield" size={18} />
        {safe ? "You're marked safe" : "Mark myself as safe"}
        {safe && <Icon name="check" size={17} />}
      </button>
      <p className="family-footnote">
        {safe
          ? "Your family can see your safe status."
          : "Let your family know you're okay."}
      </p>
    </section>
  )
  const preparationItems: Record<string, string[]> = {
    "Before a flood": [
      "Pack an emergency kit with water, food, and medication",
      "Save important documents in a waterproof bag",
      "Identify higher ground and local evacuation shelters",
      "Download your local map for offline access",
      "Agree on a family meeting point",
    ],
    "During a flood": [
      "Follow official local evacuation instructions",
      "Move to higher ground immediately when directed",
      "Never walk, swim, or drive through floodwater",
      "Stay away from electrical equipment and fallen power lines",
      "Check in with your family when it is safe to do so",
    ],
    "After a flood": [
      "Return home only when authorities say it is safe",
      "Avoid floodwater and damaged roads",
      "Photograph damage before cleaning up",
      "Discard food that has been in contact with floodwater",
      "Check on neighbors who may need assistance",
    ],
  }
  const offlineContent = (
    <div className="offline-list">
      {["Sacramento County", "Yolo County", "Placer County"].map((area, i) => (
        <div className="offline-item" key={area}>
          <div className="offline-icon">
            <Icon name="map" size={24} />
          </div>
          <div>
            <h3>{area}</h3>
            <p>{[24, 18, 32][i]} MB · Roads, shelters & essential locations</p>
            {downloads.includes(area) && (
              <span className="download-status">
                <Icon name="check" size={13} /> Saved to this device
              </span>
            )}
          </div>
          <button
            className={
              downloads.includes(area) ? "outline-button" : "primary-button"
            }
            onClick={() => {
              if (downloads.includes(area)) {
                setDownloads(downloads.filter((d) => d !== area))
                setToast(`${area} removed from saved maps.`)
              } else {
                const content = JSON.stringify(
                  {
                    area,
                    mode: "demo",
                    savedAt: new Date().toISOString(),
                    shelter: "Northside Community Center",
                    warning: "Illustrative map data only. Not for navigation.",
                  },
                  null,
                  2,
                )
                const url = URL.createObjectURL(
                  new Blob([content], { type: "application/json" }),
                )
                const link = document.createElement("a")
                link.href = url
                link.download = `${area.toLowerCase().replace(/ /g, "-")}-demo-map.json`
                link.click()
                URL.revokeObjectURL(url)
                setDownloads([...downloads, area])
                setToast(`Demo location data for ${area} downloaded.`)
              }
            }}
          >
            <Icon
              name={downloads.includes(area) ? "check" : "download"}
              size={16}
            />
            {downloads.includes(area) ? "Remove" : "Download"}
          </button>
        </div>
      ))}
      <div className="info-note">
        <Icon name="help" size={18} />
        <p>
          These downloads contain demo location data, not navigable offline
          maps. Full offline mapping requires a map provider integration.
        </p>
      </div>
    </div>
  )
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setPage("Overview")
          }}
        >
          <span className="brand-symbol">
            <Icon name="shield" size={27} />
          </span>
          flood<span>guard</span>
          <span className="brand-period">.</span>
        </a>
        <div className="workspace-label">YOUR SAFETY COMPANION</div>
        <nav aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${page === item.label ? "selected" : ""}`}
              onClick={() => setPage(item.label)}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
              {item.label === "Live flood map" && <span className="nav-live" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="prepared-card">
            <span className="prepared-icon">
              <Icon name="shield" size={22} />
            </span>
            <h3>
              A little preparation.
              <br />A lot of peace of mind.
            </h3>
            <p>Your flood-ready checklist is a good place to start.</p>
            <button onClick={() => setPage("Flood preparedness")}>
              Get prepared <Icon name="arrow" size={16} />
            </button>
          </div>
          <button className="nav-item" onClick={() => setModal("settings")}>
            <Icon name="settings" size={19} />
            Settings
          </button>
          <button className="nav-item" onClick={() => setModal("help")}>
            <Icon name="help" size={19} />
            Help & resources
          </button>
          <div className="profile">
            <div className="avatar olive">{initials}</div>
            <div>
              <strong>{account.name}</strong>
              <span>Personal account</span>
            </div>
            <button
              className="subtle-icon"
              aria-label="Account settings"
              onClick={() => setModal("settings")}
            >
              <Icon name="chevron" size={16} />
            </button>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <Icon name="chevron" size={13} />
            <span>{page}</span>
          </div>
          <div className="topbar-right">
            <button
              className="location-control"
              onClick={() => setModal("location")}
            >
              <Icon name="pin" size={16} />
              Sacramento, CA
              <Icon name="chevron" size={12} />
            </button>
            <span className="topbar-divider" />
            <button
              className="notification-button"
              aria-label="View notifications"
              onClick={() => setModal("alerts")}
            >
              <Icon name="bell" size={20} />
              <i />
            </button>
            <button
              className="top-avatar avatar olive"
              aria-label="Open profile settings"
              onClick={() => setModal("settings")}
            >
              {initials}
            </button>
          </div>
        </header>
        <main>
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                STAY INFORMED. STAY CONNECTED. STAY SAFE.
              </div>
              <h1>
                {page === "Overview"
                  ? "Your safety, at a glance."
                  : page === "Live flood map"
                    ? "A clearer view of what’s nearby."
                    : page === "Evacuation routes"
                      ? "Find your way to safer ground."
                      : page === "My family"
                        ? "Together, even when you're apart."
                        : page === "Flood preparedness"
                          ? "Ready before the rain."
                          : "Stay connected. Even offline."}
              </h1>
              <p>
                {page === "Overview"
                  ? `Welcome, ${account.name.split(/\s+/)[0]}. Here’s what’s happening around you.`
                  : page === "My family"
                    ? "A little reassurance for the people who matter most."
                    : page === "Flood preparedness"
                      ? "Small steps today make a big difference when it matters."
                      : page === "Offline maps"
                        ? "Keep essential locations within reach, wherever you are."
                        : "Know your surroundings and make an informed plan."}
              </p>
            </div>
            <div className="live-status">
              <span className="live-dot" />
              Demo mode<span className="last-update">Illustrative data</span>
            </div>
          </div>
          {(page === "Overview" ||
            page === "Live flood map" ||
            page === "Evacuation routes") && (
            <div className="warning-banner">
              <div className="warning-symbol">
                <Icon name="warning" size={23} />
              </div>
              <div>
                <h3>
                  Flood warning in your area{" "}
                  <span className="warning-label">ACTIVE</span>
                </h3>
                <p>
                  Rising water levels near the American River. Stay alert and
                  avoid low-lying areas.
                </p>
              </div>
              <button onClick={() => setModal("warning")}>
                View warning <Icon name="arrow" size={16} />
              </button>
            </div>
          )}
          {page === "Overview" && (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon amber">
                    <Icon name="warning" size={22} />
                  </div>
                  <div>
                    <span className="stat-label">Current risk level</span>
                    <div className="stat-value">
                      Moderate<span className="risk-tag">Stay alert</span>
                    </div>
                    <p>Based on conditions near you</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <Icon name="pin" size={22} />
                  </div>
                  <div>
                    <span className="stat-label">Nearest flood zone</span>
                    <div className="stat-value">
                      0.8 <span className="value-unit">mi away</span>
                    </div>
                    <p>American River · Northwest of you</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon mint">
                    <Icon name="shield" size={23} />
                  </div>
                  <div>
                    <span className="stat-label">
                      Nearest evacuation shelter
                    </span>
                    <div className="stat-value">
                      1.6 <span className="value-unit">mi away</span>
                    </div>
                    <p>
                      Northside Community Center{" "}
                      <span className="open-tag">Open</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="dashboard-grid">
                <section className="card map-card">
                  <div className="card-header">
                    <div className="section-title">
                      <Icon name="map" size={19} />
                      <h2>Flood activity near you</h2>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => setPage("Live flood map")}
                    >
                      Explore map <Icon name="external" size={14} />
                    </button>
                  </div>
                  <FloodMap family={family} onPlan={() => setModal("route")} />
                  <div className="map-footer">
                    <div>
                      <span className="route-mini-icon">
                        <Icon name="route" size={20} />
                      </span>
                      <div>
                        <strong>A safer route, when you need it.</strong>
                        <p>Find your nearest shelter and plan ahead.</p>
                      </div>
                    </div>
                    <button
                      className="outline-button"
                      onClick={() => setModal("route")}
                    >
                      Plan evacuation <Icon name="arrow" size={15} />
                    </button>
                  </div>
                </section>
                {familyCard}
              </div>
              <div className="bottom-grid">
                <section className="card updates-card">
                  <div className="card-header">
                    <div className="section-title">
                      <Icon name="clock" size={18} />
                      <h2>Latest updates</h2>
                      <span className="live-pill">
                        <span className="live-dot" />
                        DEMO
                      </span>
                    </div>
                    <button
                      className="text-button"
                      onClick={() => setModal("alerts")}
                    >
                      View all <Icon name="arrow" size={14} />
                    </button>
                  </div>
                  <div className="updates-list">
                    {updates.slice(0, 2).map((update) => (
                      <button
                        className="update-row"
                        key={update.title}
                        onClick={() =>
                          setModal(
                            update.color === "amber" ? "warning" : "closure",
                          )
                        }
                      >
                        <span className={`update-icon ${update.color}`}>
                          <Icon name={update.icon} size={18} />
                        </span>
                        <span className="update-text">
                          <strong>{update.title}</strong>
                          <span>{update.description}</span>
                          <small>
                            {update.source}
                            <i />
                            {update.time}
                          </small>
                        </span>
                        <Icon name="chevron" size={16} />
                      </button>
                    ))}
                  </div>
                </section>
                <section className="card essentials-card">
                  <div className="card-header">
                    <div className="section-title">
                      <Icon name="book" size={18} />
                      <h2>A little more peace of mind</h2>
                    </div>
                  </div>
                  <button
                    className="essential-row"
                    onClick={() => setPage("Flood preparedness")}
                  >
                    <span className="essential-icon mint">
                      <Icon name="book" size={21} />
                    </span>
                    <span>
                      <strong>Be flood ready</strong>
                      <small>What to do before, during & after a flood</small>
                    </span>
                    <Icon name="arrow" size={17} />
                  </button>
                  <button
                    className="essential-row"
                    onClick={() => setPage("Offline maps")}
                  >
                    <span className="essential-icon blue">
                      <Icon name="download" size={21} />
                    </span>
                    <span>
                      <strong>Your map. Even offline.</strong>
                      <small>
                        Download your area for when connection drops
                      </small>
                    </span>
                    <Icon name="arrow" size={17} />
                  </button>
                </section>
              </div>
            </>
          )}
          {(page === "Live flood map" || page === "Evacuation routes") && (
            <section className="card expanded-map">
              <div className="card-header">
                <div className="section-title">
                  <Icon name={page === "Live flood map" ? "map" : "route"} />
                  <h2>
                    {page === "Live flood map"
                      ? "Sacramento flood activity"
                      : "Evacuation route preview"}
                  </h2>
                </div>
                <button
                  className="primary-button"
                  onClick={() => setModal("route")}
                >
                  Plan evacuation <Icon name="arrow" size={16} />
                </button>
              </div>
              <FloodMap
                large
                family={family}
                route={page === "Evacuation routes"}
                onPlan={() => setModal("route")}
              />
              <div className="info-note">
                <Icon name="help" />
                <p>
                  This is an illustrative map, not live flood or routing data.
                  Follow local authorities and never enter a flooded road.
                </p>
              </div>
            </section>
          )}
          {page === "My family" && (
            <div className="family-page">
              {familyCard}
              <section className="card family-info">
                <div className="large-symbol">
                  <Icon name="users" size={32} />
                </div>
                <h2>Your circle of reassurance.</h2>
                <p>
                  Keep your loved ones in the loop with a quick safe check-in.
                  Invite someone to grow your family circle.
                </p>
                <button
                  className="primary-button"
                  onClick={() => setModal("invite")}
                >
                  <Icon name="plus" size={17} />
                  Invite a family member
                </button>
                <div className="info-note">
                  <Icon name="shield" size={18} />
                  <p>
                    Location and family status are simulated in this demo. No
                    messages are sent and no real locations are shared.
                  </p>
                </div>
              </section>
            </div>
          )}
          {page === "Flood preparedness" && (
            <section className="card preparation-card">
              <div className="card-header">
                <div className="section-title">
                  <Icon name="book" />
                  <h2>Your flood-ready checklist</h2>
                </div>
                <span className="checklist-count">
                  {checked.length} steps completed
                </span>
              </div>
              <div className="stage-tabs">
                {Object.keys(preparationItems).map((s) => (
                  <button
                    className={stage === s ? "active" : ""}
                    key={s}
                    onClick={() => setStage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="preparation-intro">
                {stage === "Before a flood"
                  ? "Prepare the essentials now so you can focus on staying safe later."
                  : stage === "During a flood"
                    ? "Your safety comes first. Follow official alerts and act early."
                    : "Take your time. Returning safely is more important than returning quickly."}
              </p>
              <div className="checklist">
                {preparationItems[stage].map((item) => (
                  <label
                    key={item}
                    className={checked.includes(item) ? "complete" : ""}
                  >
                    <input
                      type="checkbox"
                      checked={checked.includes(item)}
                      onChange={() =>
                        setChecked(
                          checked.includes(item)
                            ? checked.filter((i) => i !== item)
                            : [...checked, item],
                        )
                      }
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <div className="info-note">
                <Icon name="warning" size={20} />
                <p>
                  In an immediate emergency, call 911. Always follow the
                  instructions of your local emergency services.
                </p>
              </div>
            </section>
          )}
          {page === "Offline maps" && (
            <section className="card offline-card">
              <div className="card-header">
                <div className="section-title">
                  <Icon name="download" />
                  <h2>Your saved areas</h2>
                </div>
                <span className="checklist-count">
                  {downloads.length} areas saved
                </span>
              </div>
              {offlineContent}
            </section>
          )}
          <footer className="page-footer">
            <span>
              <Icon name="shield" size={14} /> Prepared together. Safer
              together.
            </span>
            <span>
              Demo experience · Not for emergency navigation{" "}
              <span className="footer-dot">·</span>{" "}
              <button onClick={() => setModal("help")}>
                Emergency resources <Icon name="external" size={12} />
              </button>
            </span>
          </footer>
        </main>
      </div>
      {toast && (
        <div className="toast" role="status">
          <span>
            <Icon name="check" size={18} />
          </span>
          {toast}
          <button onClick={() => setToast("")} aria-label="Dismiss message">
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
      {modal && (
        <Modal
          title={
            modal === "route"
              ? "Plan your evacuation"
              : modal === "invite"
                ? "Bring your family together"
                : modal === "warning"
                  ? "Flood warning"
                  : modal === "alerts"
                    ? "Your latest updates"
                    : modal === "settings"
                      ? "Your preferences"
                      : modal === "help"
                        ? "Help & emergency resources"
                        : modal === "location"
                          ? "Your location"
                          : modal === "weather"
                            ? "Weather outlook"
                            : "Garden Highway road closure"
          }
          subtitle={
            modal === "route"
              ? "A little planning makes the next step clearer."
              : modal === "invite"
                ? "Add a loved one to your demo family circle."
                : undefined
          }
          onClose={() => {
            setModal(null)
            setRouteStarted(false)
          }}
        >
          {modal === "route" && (
            <>
              <div className="route-locations">
                <div>
                  <span className="route-origin" />
                  <div>
                    <small>FROM</small>
                    <strong>Your current location</strong>
                    <p>Sacramento, CA (demo location)</p>
                  </div>
                </div>
                <div>
                  <Icon name="shield" size={23} />
                  <div>
                    <small>TO</small>
                    <strong>Northside Community Center</strong>
                    <p>1.6 mi away · Demo shelter</p>
                  </div>
                </div>
              </div>
              <div className="route-option">
                <span className="recommended">ILLUSTRATIVE ROUTE</span>
                <h3>Via Richards Boulevard</h3>
                <p>8 min by car · 1.9 mi · Avoids demo flood zone</p>
                <div>
                  <Icon name="check" size={16} /> Head east on Richards Blvd
                </div>
                <div>
                  <Icon name="check" size={16} /> Continue to Northgate Blvd
                </div>
                <div>
                  <Icon name="check" size={16} /> Arrive at the community center
                </div>
              </div>
              <div className="info-note warning-note">
                <Icon name="warning" size={19} />
                <p>
                  This route is a demo, not verified navigation. Check official
                  road conditions and shelter availability. Never drive through
                  floodwater.
                </p>
              </div>
              <button
                className="primary-button full-width"
                onClick={() => {
                  setRouteStarted(true)
                  setPage("Evacuation routes")
                }}
              >
                {routeStarted ? (
                  <>
                    <Icon name="check" size={18} />
                    Route preview selected
                  </>
                ) : (
                  <>
                    Preview this route <Icon name="arrow" size={17} />
                  </>
                )}
              </button>
            </>
          )}
          {modal === "invite" && (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!invite.trim()) return
                setFamily([
                  ...family,
                  {
                    name: invite.trim(),
                    initials: invite
                      .trim()
                      .split(" ")
                      .map((s) => s[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase(),
                    color: "lavender",
                    location: "Location not shared",
                    status: "Awaiting check-in",
                    time: "Just added",
                  },
                ])
                setInvite("")
                setModal(null)
                setToast(
                  "Family member added to your demo circle. No invitation was sent.",
                )
              }}
            >
              <label className="form-label" htmlFor="family-name">
                Family member’s name
              </label>
              <input
                className="text-input"
                id="family-name"
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder="e.g. Taylor Chen"
                required
                maxLength={40}
              />
              <div className="info-note">
                <Icon name="users" size={18} />
                <p>
                  In this demo, members are added locally. Real invitations and
                  location sharing will require connected accounts.
                </p>
              </div>
              <button className="primary-button full-width" type="submit">
                <Icon name="plus" size={17} />
                Add to family circle
              </button>
            </form>
          )}
          {modal === "warning" && (
            <>
              <div className="detail-badge amber">
                <Icon name="warning" size={18} />
                DEMO · FLOOD WARNING
              </div>
              <h3 className="detail-title">
                Sacramento County · American River
              </h3>
              <p className="detail-copy">
                This sample warning shows how an alert would appear. Rising
                water levels may affect low-lying areas near the American River,
                including Discovery Park.
              </p>
              <div className="warning-details">
                <div>
                  <span>Distance from demo location</span>
                  <strong>0.8 miles northwest</strong>
                </div>
                <div>
                  <span>Sample source</span>
                  <strong>National Weather Service</strong>
                </div>
                <div>
                  <span>Recommended action</span>
                  <strong>
                    Stay alert and prepare to move to higher ground
                  </strong>
                </div>
              </div>
              <div className="info-note warning-note">
                <Icon name="warning" size={20} />
                <p>
                  This is not an active official warning. Check weather.gov and
                  your local emergency services for current information.
                </p>
              </div>
              <button
                className="primary-button full-width"
                onClick={() => setModal("route")}
              >
                Explore evacuation options
                <Icon name="arrow" size={16} />
              </button>
            </>
          )}
          {modal === "alerts" && (
            <>
              <div className="info-note">
                <Icon name="help" size={18} />
                <p>
                  All updates below are illustrative. A live alert feed has not
                  been connected.
                </p>
              </div>
              {updates.map((update) => (
                <button
                  className="update-row modal-update"
                  key={update.title}
                  onClick={() =>
                    setModal(
                      update.color === "amber"
                        ? "warning"
                        : update.color === "blue"
                          ? "closure"
                          : "weather",
                    )
                  }
                >
                  <span className={`update-icon ${update.color}`}>
                    <Icon name={update.icon} size={19} />
                  </span>
                  <span className="update-text">
                    <strong>{update.title}</strong>
                    <span>{update.description}</span>
                    <small>
                      {update.source} · {update.time}
                    </small>
                  </span>
                  <Icon name="chevron" size={16} />
                </button>
              ))}
            </>
          )}
          {modal === "weather" && (
            <>
              <div className="detail-badge mint">
                <Icon name="cloud" size={18} />
                DEMO · WEATHER OUTLOOK
              </div>
              <h3 className="detail-title">Rainfall expected to ease</h3>
              <p className="detail-copy">
                This sample forecast shows light showers easing after 3 PM.
                Flooding can continue even after the rain stops. Continue to
                monitor official conditions and avoid flooded areas.
              </p>
              <div className="info-note">
                <Icon name="help" size={18} />
                <p>
                  This is not a current forecast. Visit the National Weather
                  Service for verified weather information.
                </p>
              </div>
              <a
                className="resource-link"
                href="https://www.weather.gov/"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <strong>Check the official forecast</strong>
                  <small>National Weather Service</small>
                </span>
                <Icon name="external" size={18} />
              </a>
            </>
          )}
          {modal === "closure" && (
            <>
              <div className="detail-badge blue">
                <Icon name="route" size={18} />
                DEMO · ROAD CLOSURE
              </div>
              <h3 className="detail-title">Garden Highway</h3>
              <p className="detail-copy">
                Sample closure between Northgate Boulevard and Discovery Park
                due to high water. Consider alternate routes and check official
                road information before traveling.
              </p>
              <div className="info-note">
                <Icon name="help" size={18} />
                <p>
                  This is illustrative road data, not a verified current
                  closure.
                </p>
              </div>
              <button
                className="primary-button full-width"
                onClick={() => setModal("route")}
              >
                View route options
                <Icon name="arrow" size={16} />
              </button>
            </>
          )}
          {modal === "settings" && (
            <>
              <div className="settings-profile">
                <div className="avatar olive">{initials}</div>
                <div>
                  <strong>{account.name}</strong>
                  <p>{account.email || "Personal demo account"}</p>
                </div>
              </div>
              <div className="setting-row">
                <div>
                  <strong>Flood warning notifications</strong>
                  <p>Preference only; notifications are not connected.</p>
                </div>
                <button
                  className={`toggle ${notifications ? "on" : ""}`}
                  role="switch"
                  aria-checked={notifications}
                  aria-label="Flood warning notifications"
                  onClick={() => setNotifications(!notifications)}
                >
                  <span />
                </button>
              </div>
              <div className="setting-row">
                <div>
                  <strong>Current location</strong>
                  <p>Sacramento, California · Demo location</p>
                </div>
                <Icon name="pin" size={18} />
              </div>
              <button
                className="primary-button full-width"
                onClick={() => {
                  setModal(null)
                  setToast(
                    "Your preferences have been updated for this session.",
                  )
                }}
              >
                Save preferences
                <Icon name="check" size={17} />
              </button>
              <button
                className="outline-button full-width auth-signout"
                onClick={onSignOut}
              >
                Sign out
                <Icon name="arrow" size={17} />
              </button>
            </>
          )}
          {modal === "help" && (
            <>
              <div className="emergency-call">
                <Icon name="phone" size={25} />
                <div>
                  <strong>In immediate danger?</strong>
                  <p>Call 911 for emergency assistance.</p>
                </div>
                <a href="tel:911">
                  Call 911
                  <Icon name="external" size={15} />
                </a>
              </div>
              <a
                className="resource-link"
                href="https://www.weather.gov/"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <strong>National Weather Service</strong>
                  <small>Official warnings and weather forecasts</small>
                </span>
                <Icon name="external" size={18} />
              </a>
              <a
                className="resource-link"
                href="https://www.ready.gov/floods"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <strong>Ready.gov · Flood safety</strong>
                  <small>Reliable preparedness and response guidance</small>
                </span>
                <Icon name="external" size={18} />
              </a>
              <a
                className="resource-link"
                href="https://www.saccounty.gov/"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <strong>Sacramento County</strong>
                  <small>Local information and emergency resources</small>
                </span>
                <Icon name="external" size={18} />
              </a>
              <div className="info-note">
                <Icon name="shield" size={18} />
                <p>
                  Floodguard is a prototype. Do not rely on its sample alerts,
                  routes, or family locations in an emergency.
                </p>
              </div>
            </>
          )}
          {modal === "location" && (
            <>
              <div className="location-detail">
                <Icon name="pin" size={32} />
                <h3>Sacramento, California</h3>
                <p>
                  Your map currently uses a sample location in Sacramento. No
                  device location is collected.
                </p>
              </div>
              <button
                className="primary-button full-width"
                onClick={() => {
                  setPage("Live flood map")
                  setModal(null)
                }}
              >
                View this area
                <Icon name="map" size={17} />
              </button>
            </>
          )}
        </Modal>
      )}
    </div>
  )
}
