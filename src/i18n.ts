export type Language = "en" | "ja"

const japanese: Record<string, string> = {
  "Share your location?": "位置情報を共有しますか？",
  "Get alerts for where you are": "現在地に合わせた警報を受け取る",
  "MizuAlert uses your location to show nearby flood warnings, shelters, and evacuation routes. Your location is saved to your account on this browser only.":
    "MizuAlertは位置情報を使って、周辺の浸水警報・避難所・避難ルートを表示します。位置情報はこのブラウザ上のアカウントにのみ保存されます。",
  "Allow location access": "位置情報の利用を許可",
  "Finding your location…": "現在地を取得しています…",
  "Not now": "今はしない",
  "Update my device location": "端末の現在地を更新",
  "Share my device location": "端末の現在地を共有",
  "Location services are not supported on this device.":
    "この端末は位置情報サービスに対応していません。",
  "Location sharing needs a secure connection (HTTPS or localhost).":
    "位置情報の共有には安全な接続（HTTPSまたはlocalhost）が必要です。",
  "We couldn't save your location. Please try again.":
    "位置情報を保存できませんでした。もう一度お試しください。",
  "Finding your location took too long. Please try again.":
    "現在地の取得に時間がかかりすぎました。もう一度お試しください。",
  "Your location is unavailable right now. Please try again.":
    "現在地を取得できません。もう一度お試しください。",
  Overview: "概要",
  "Live flood map": "リアルタイム浸水マップ",
  "Evacuation routes": "避難ルート",
  "My family": "家族",
  "Flood preparedness": "水害への備え",
  "Offline maps": "オフラインマップ",
  Workspace: "ダッシュボード",
  "YOUR SAFETY COMPANION": "あなたの安全を、いつもそばに",
  "STAY INFORMED. STAY CONNECTED. STAY SAFE.": "知る。つながる。安全を守る。",
  "Your safety, at a glance.": "安全情報を、ひと目で。",
  "A clearer view of what’s nearby.": "周辺の状況を、わかりやすく。",
  "Find your way to safer ground.": "安全な場所への道を見つける。",
  "Together, even when you're apart.": "離れていても、家族とつながる。",
  "Ready before the rain.": "雨が降る前に、備えを。",
  "Stay connected. Even offline.": "オフラインでも、安心を。",
  "Demo mode": "デモモード",
  "Illustrative data": "サンプルデータ",
  "Flood warning in your area": "周辺地域に洪水警報",
  ACTIVE: "発表中",
  "Rising water levels near the Arakawa River. Stay alert and avoid low-lying areas.":
    "荒川周辺で水位が上昇しています。低地を避け、最新情報を確認してください。",
  "View warning": "警報を確認",
  "Current risk level": "現在のリスク",
  Moderate: "中程度",
  "Stay alert": "警戒してください",
  "Based on conditions near you": "周辺の状況に基づく",
  "Rain radar": "雨レーダー",
  "Heavy rain": "強い雨",
  "Severe": "重大",
  "Traffic information": "交通情報",
  "Lower-traffic routes": "混雑の少ないルート",
  "North embankment route": "北側堤防ルート",
  "Komatsugawa connector": "小松川連絡ルート",
  "Request mobility assistance": "移動支援を依頼",
  "Disability distress alert active": "障がい者支援要請中",
  "Nearest flood zone": "最寄りの浸水想定区域",
  "Nearest evacuation shelter": "最寄りの避難所",
  "Flood activity near you": "周辺の浸水情報",
  "Light rain": "小雨",
  "Moderate rain": "雨量中程度",
  "Drainage keeps up for now, but low roads can still become slick.": "排水は追えていますが、低い道路は滑りやすくなります。",
  "Runoff rises quickly and slower routes may become harder to use.": "雨水が急速に増え、ゆっくり進むルートが使いにくくなります。",
  "Flooding risk escalates sharply; evacuation timing matters most.": "浸水のリスクが急速に高まり、避難のタイミングが重要です。",
  "Low": "低い",
  "Elevated": "高め",
  "More reliable for wheelchairs and slower-moving groups.": "車椅子やゆっくり移動する人に適したルートです。",
  "Good alternative if the riverside road is congested.": "河川沿いの道路が混雑している場合の代替ルートです。",
  "Explore map": "地図を見る",
  "A safer route, when you need it.": "必要なときに、安全なルートを。",
  "Find your nearest shelter and plan ahead.":
    "最寄りの避難所を確認し、早めに備えましょう。",
  "Plan evacuation": "避難ルートを確認",
  "Latest updates": "最新情報",
  "View all": "すべて見る",
  "A little more peace of mind": "もしもの時に、もう少し安心を",
  "Be flood ready": "水害に備える",
  "What to do before, during & after a flood":
    "水害の前・発生時・発生後にすること",
  "Your map. Even offline.": "地図をオフラインでも。",
  "Download your area for when connection drops":
    "通信が途切れても地域情報を確認できます",
  "Tokyo flood activity": "東京の浸水情報",
  "Evacuation route preview": "避難ルートのプレビュー",
  "This is an illustrative map, not live flood or routing data. Follow local authorities and never enter a flooded road.":
    "これはサンプル地図で、実際の浸水・経路情報ではありません。自治体の指示に従い、冠水した道路には入らないでください。",
  "Your circle of reassurance.": "家族の安心を、ひとつにつなぐ。",
  "A little reassurance for the people who matter most.":
    "大切な人の安心を、いつでも確認できます。",
  "Small steps today make a big difference when it matters.":
    "今日の小さな備えが、もしもの時に大きな力になります。",
  "Keep essential locations within reach, wherever you are.":
    "必要な場所の情報を、いつでも手元に。",
  "Know your surroundings and make an informed plan.":
    "周辺状況を確認し、落ち着いて行動しましょう。",
  "Your flood-ready checklist": "水害への備えチェックリスト",
  "Before a flood": "水害の前",
  "During a flood": "水害発生時",
  "After a flood": "水害の後",
  "Pack an emergency kit with water, food, and medication":
    "水・食料・薬を入れた非常用持ち出し袋を準備する",
  "Save important documents in a waterproof bag": "重要書類を防水袋に保管する",
  "Identify higher ground and local evacuation shelters":
    "高台と地域の避難所を確認する",
  "Download your local map for offline access":
    "地域の地図をオフライン用に保存する",
  "Agree on a family meeting point": "家族の集合場所を決める",
  "Follow official local evacuation instructions": "自治体の避難情報に従う",
  "Move to higher ground immediately when directed":
    "指示が出たらすぐに高い場所へ移動する",
  "Never walk, swim, or drive through floodwater":
    "冠水した場所を歩いたり、泳いだり、車で通らない",
  "Stay away from electrical equipment and fallen power lines":
    "電気設備や切れた電線に近づかない",
  "Check in with your family when it is safe to do so":
    "安全を確保してから家族に無事を知らせる",
  "Return home only when authorities say it is safe":
    "自治体が安全を発表してから帰宅する",
  "Avoid floodwater and damaged roads": "洪水や損傷した道路を避ける",
  "Photograph damage before cleaning up": "片付ける前に被害を撮影する",
  "Discard food that has been in contact with floodwater":
    "浸水した食品は廃棄する",
  "Check on neighbors who may need assistance":
    "支援が必要な近隣の人を確認する",
  "Your saved areas": "保存した地域",
  "Prepared together. Safer together.": "一緒に備えて、一緒に安全に。",
  "Demo experience · Not for emergency navigation":
    "デモ体験 · 緊急時のナビには使用できません",
  "Emergency resources": "緊急時の情報",
  "Plan your evacuation": "避難ルートを計画",
  "Bring your family together": "家族をつなぐ",
  "Flood warning": "洪水警報",
  "Aerial": "航空写真",
  "Traffic": "交通",
  "Flood": "浸水",
  "Map layers": "地図レイヤー",
  "Start evacuation": "避難を開始",
  "View evacuation options": "避難ルートを見る",
  "Demo family location": "家族のデモ位置",
  "Last updated": "最終更新",
  "Your latest updates": "最新情報",
  "Your preferences": "設定",
  "Help & emergency resources": "ヘルプ・緊急情報",
  "Your location": "現在地",
  "Weather outlook": "気象情報",
  "A little planning makes the next step clearer.":
    "早めの確認が、落ち着いた避難につながります。",
  "Add a loved one to your demo family circle.":
    "デモの家族グループに大切な人を追加します。",
  FROM: "出発地",
  TO: "目的地",
  "Your current location": "現在地",
  "ILLUSTRATIVE ROUTE": "サンプルルート",
  "Preview this route": "ルートをプレビュー",
  "Route preview selected": "ルートを選択しました",
  "Family member’s name": "家族の名前",
  "Add to family circle": "家族グループに追加",
  "Explore evacuation options": "避難ルートを確認",
  "Flood warning notifications": "洪水警報の通知",
  "Preference only; notifications are not connected.":
    "設定のみ。実際の通知には接続されていません。",
  "Current location": "現在地",
  "Save preferences": "設定を保存",
  "Sign out": "サインアウト",
  "In immediate danger?": "緊急の危険がありますか？",
  "Call 119 for fire or ambulance assistance.":
    "火事・救急は119番へ電話してください。",
  "Call 119": "119番に電話",
  "View this area": "この地域を表示",
  "Personal account": "個人アカウント",
  Settings: "設定",
  "Help & resources": "ヘルプ・防災情報",
  "Mark myself as safe": "無事を知らせる",
  "You're marked safe": "無事を共有中",
  You: "あなた",
  Safe: "無事",
  "Awaiting check-in": "安否確認待ち",
  "Not checked in": "未確認",
  "Marked safe": "無事を確認",
  "Demo map": "デモ地図",
  "Evacuation shelter": "避難所",
  Family: "家族",
  Download: "ダウンロード",
  Remove: "削除",
  "Saved to this device": "この端末に保存済み",
  "Good to have you here.": "おかえりなさい。",
  "A safer start, together.": "安心への一歩を、一緒に。",
  "Sign in to your safety dashboard and family circle.":
    "安全ダッシュボードと家族グループにサインインします。",
  "Create your account and take the first step toward being flood ready.":
    "アカウントを作成して、水害への備えを始めましょう。",
  "Sign in": "サインイン",
  "Create account": "アカウント作成",
  "Your name": "お名前",
  Username: "ユーザー名",
  "Family can use this username to find you.":
    "家族はこのユーザー名であなたを検索できます。",
  "Email or username": "メールアドレスまたはユーザー名",
  "Email address": "メールアドレス",
  Password: "パスワード",
  "Confirm password": "パスワード（確認）",
  "Keep me signed in on this device": "この端末でログイン状態を保持",
  "Opening your dashboard…": "ダッシュボードを開いています…",
  "Create my account": "アカウントを作成",
  "or take a look around": "またはデモを体験",
  "Explore the demo": "デモを体験",
  "WELCOME TO MIZUALERT": "MIZUALERTへようこそ",
  "Peace of mind. For you and yours.": "あなたと大切な人に、安心を。",
  "Flood warning for Edogawa Ward": "江戸川区に洪水警報",
  "Low-lying areas near the Arakawa River may experience flooding.":
    "荒川周辺の低地では浸水のおそれがあります。",
  "Road closure near Funabori Bridge": "船堀橋付近で通行止め",
  "The riverside approach is closed. Use an alternate evacuation route.":
    "河川沿いの道路が通行止めです。別の避難ルートを利用してください。",
  "Rainfall expected to ease this afternoon": "午後には雨が弱まる見込み",
  "Light showers forecast after 3 PM. Continue to monitor conditions.":
    "15時以降は弱い雨の予報です。引き続き最新情報を確認してください。",
  "Japan Meteorological Agency": "気象庁",
  "Edogawa City": "江戸川区",
  "At your current location": "現在地",
  "At home · 1.3 km away": "自宅 · 1.3 km",
  "Koiwa Daiichi Junior High · 1.9 km": "小岩第一中学校 · 1.9 km",
  "Funabori Station · 3.8 km away": "船堀駅 · 3.8 km",
}

export function translate(language: Language, text: string) {
  return language === "ja" ? (japanese[text] ?? text) : text
}

export function readLanguage(): Language {
  try {
    return localStorage.getItem("floodguard-language") === "ja" ? "ja" : "en"
  } catch {
    return "en"
  }
}

export function saveLanguage(language: Language) {
  try {
    localStorage.setItem("floodguard-language", language)
  } catch {
    // The language still updates for this session when storage is unavailable.
  }
}
