// Psychological Capital tracker — 6 axes of inner growth
// All scores 0-100, persisted in localStorage

const KEY = "frisson_psycap_v2";
const MAX = 100;
const MIN = 0;
const BASELINE = 20;

// ── 6 AXES ──────────────────────────────────────────────────────────────
export const AXES = [
  { id: "safety",     label: "Внутренняя безопасность", short: "Безопасность", hex: "#7EC8DC", desc: "Ощущение, что с вами всё в порядке и мир не опасен. База для всего остального." },
  { id: "worth",      label: "Самоценность",             short: "Самоценность", hex: "#E64DA8", desc: "Знание, что вы достойны хорошего просто потому, что вы есть." },
  { id: "receive",    label: "Способность получать",     short: "Получение",    hex: "#FFAF32", desc: "Умение принимать любовь, деньги, заботу и внимание без вины." },
  { id: "feminine",   label: "Женская энергия",          short: "Женственность",hex: "#D080B0", desc: "Контакт с мягкостью, чувственностью и магнетизмом вашей природы." },
  { id: "trust",      label: "Доверие к миру",           short: "Доверие",      hex: "#9F7BD8", desc: "Способность отпускать контроль и доверять жизни." },
  { id: "authentic",  label: "Аутентичность",            short: "Подлинность",  hex: "#F08838", desc: "Жить из себя настоящей, без масок и чужих ожиданий." },
];

// ── CONTENT TAGGING ─────────────────────────────────────────────────────
// Each content item maps to 1-2 axes
export const MED_TAGS = {
  // Resource section
  "Возвращение к наполненности":     ["receive", "feminine"],
  "Восполниться энергией":           ["feminine", "worth"],
  "Женское внутреннее расслабление": ["feminine", "safety"],
  "Я автор своей жизни":             ["authentic", "worth"],
  // Feminine section
  "Женская энергия":                 ["feminine", "authentic"],
  "Возвращение к себе женственной":  ["feminine", "authentic"],
  "Состояние женской притягательности": ["feminine", "worth"],
  "Женское счастье — это норма":     ["feminine", "trust"],
  // Receiving section
  "Где я перекрыла себе получение":  ["receive", "worth"],
  "Получение благ от мира":          ["receive", "trust"],
  "Доверие к миру":                  ["trust", "safety"],
  "Деньги и безопасность":           ["safety", "receive"],
  // New level section
  "Благодарность и новый уровень":   ["trust", "authentic"],
  "Новый уровень":                   ["authentic", "worth"],
  "Разговор с собой из будущего":    ["authentic", "worth"],
  "Вера — мост между реальностями":  ["trust", "safety"],
  // Self section
  "Право быть настоящей":            ["authentic", "trust"],
  // Techniques (future content)
  "Техника против тревоги":          ["trust", "safety"],
  "Техника против ревности":         ["worth", "safety"],
  "Залатываем дефициты":             ["receive", "worth"],
  "Контакт с женской частью":        ["feminine", "worth"],
};

// Diary entry tags → axes (user can tag entries)
export const DIARY_TAGS = {
  base:        ["authentic"],              // any entry → authenticity
  желания:     ["feminine", "authentic"],
  тело:        ["feminine", "safety"],
  отношения:   ["worth", "trust"],
  деньги:      ["receive", "worth"],
};

// Orbit layers → axes
export const LAYER_AXES = {
  1: "safety",    // Бессознательное
  2: "authentic", // Самость / Подлинность
  3: "worth",     // Сознательное
  4: "feminine",  // Чувства
  5: "trust",     // Эмоции
  6: "receive",   // Поведение
};

// ── STATE ───────────────────────────────────────────────────────────────
function defaults() {
  const axes = {};
  AXES.forEach((a) => (axes[a.id] = BASELINE));
  return {
    axes,
    events: [],      // { ts, type, name, axes: [...], points, meta }
    lastActivity: null,
    lastTestScore: null,
    orbitDaily: {},  // { "2026-04-11": { layerId: true } }
    lastDecay: Date.now(),
  };
}

function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    if (!d) return defaults();
    if (!d.axes || !d.events) return defaults();
    AXES.forEach((a) => { if (d.axes[a.id] === undefined) d.axes[a.id] = BASELINE; });
    return d;
  } catch { return defaults(); }
}
function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }

function today() { return new Date().toISOString().slice(0, 10); }

function applyDecay(d) {
  const now = Date.now();
  const days = Math.floor((now - (d.lastDecay || now)) / 86400000);
  if (days >= 3) {
    const decays = Math.floor(days / 3);
    const floor = d.lastTestScore !== null ? d.lastTestScore : BASELINE;
    AXES.forEach((a) => {
      d.axes[a.id] = Math.max(floor, d.axes[a.id] - decays);
    });
    d.lastDecay = now;
  }
}

// ── CORE: add event and update axes ─────────────────────────────────────
function addEvent(type, name, axes, points, meta = {}) {
  const d = load();
  applyDecay(d);
  axes.forEach((axId) => {
    d.axes[axId] = Math.min(MAX, d.axes[axId] + points);
  });
  d.events.unshift({
    ts: Date.now(),
    type,
    name,
    axes,
    points,
    meta,
  });
  if (d.events.length > 500) d.events = d.events.slice(0, 500);
  d.lastActivity = Date.now();
  save(d);
  return d;
}

// ── PUBLIC API ──────────────────────────────────────────────────────────

// Meditation listened (full or partial)
export function logMeditation(title, completion = "full") {
  const axes = MED_TAGS[title];
  if (!axes) return;
  const points = completion === "full" ? 5 : 2;
  addEvent("meditation", title, axes, points, { completion });
  addStreakBonus();
}

// Diary entry completed
export function logDiary(text, tags = []) {
  const axSet = new Set(DIARY_TAGS.base);
  tags.forEach((t) => {
    const ax = DIARY_TAGS[t];
    if (ax) ax.forEach((id) => axSet.add(id));
  });
  addEvent("diary", text.slice(0, 40), [...axSet], 4, { tags });
  addStreakBonus();
}

// Orbit session (>1 min) — capped 1x per layer per day
export function logOrbitSession(layerId, layerName) {
  const d = load();
  const t = today();
  if (!d.orbitDaily[t]) d.orbitDaily[t] = {};
  if (d.orbitDaily[t][layerId]) return; // already counted today
  d.orbitDaily[t][layerId] = true;
  save(d);
  const axId = LAYER_AXES[layerId];
  if (!axId) return;
  addEvent("orbit", layerName, [axId], 2, { layerId });
  addStreakBonus();
}

// Energy test — recalibrates baseline
export function logEnergyTest(score) {
  const d = load();
  applyDecay(d);
  d.lastTestScore = score;
  // Recalibrate: pull each axis toward test score by 40%
  AXES.forEach((a) => {
    const current = d.axes[a.id];
    d.axes[a.id] = Math.round(current * 0.6 + score * 0.4);
  });
  d.events.unshift({
    ts: Date.now(),
    type: "test",
    name: `Тест энергии: ${score}`,
    axes: AXES.map((a) => a.id),
    points: 0,
    meta: { score },
  });
  if (d.events.length > 500) d.events = d.events.slice(0, 500);
  d.lastActivity = Date.now();
  save(d);
}

// Weekly self-report check-in: 4 sliders (0-100)
export function logWeeklyCheckin(values) {
  const d = load();
  applyDecay(d);
  // Values: { safety, worth, feminine, trust } — sliders
  // Blend: 70% current + 30% reported
  ["safety", "worth", "feminine", "trust"].forEach((id) => {
    if (typeof values[id] === "number") {
      d.axes[id] = Math.round(d.axes[id] * 0.7 + values[id] * 0.3);
    }
  });
  d.events.unshift({
    ts: Date.now(),
    type: "checkin",
    name: "Еженедельный чекин",
    axes: ["safety", "worth", "feminine", "trust"],
    points: 0,
    meta: { values },
  });
  d.lastActivity = Date.now();
  save(d);
}

// Daily streak bonus — +1 to safety once per day
function addStreakBonus() {
  const d = load();
  const t = today();
  if (d.lastStreakDay === t) return;
  d.lastStreakDay = t;
  d.axes.safety = Math.min(MAX, d.axes.safety + 1);
  save(d);
}

// ── GETTERS ─────────────────────────────────────────────────────────────
export function getPsycap() {
  const d = load();
  applyDecay(d);
  save(d);
  return d;
}

export function getOverallScore() {
  const d = getPsycap();
  const total = AXES.reduce((s, a) => s + d.axes[a.id], 0);
  return Math.round(total / AXES.length);
}

export function getLowestAxis() {
  const d = getPsycap();
  const sorted = [...AXES].map((a) => ({ ...a, value: d.axes[a.id] })).sort((a, b) => a.value - b.value);
  return sorted[0];
}

export function getHighestAxis() {
  const d = getPsycap();
  const sorted = [...AXES].map((a) => ({ ...a, value: d.axes[a.id] })).sort((a, b) => b.value - a.value);
  return sorted[0];
}

// Get last activity date for a specific axis
export function getLastAxisActivity(axId) {
  const d = getPsycap();
  const evt = d.events.find((e) => e.axes.includes(axId));
  return evt ? evt.ts : null;
}

// Monthly delta: current score minus score 30 days ago
export function getMonthlyDelta() {
  const d = getPsycap();
  const now = Date.now();
  const monthAgo = now - 30 * 86400000;
  const current = getOverallScore();
  // Sum all positive events in last 30 days
  const gained = d.events
    .filter((e) => e.ts >= monthAgo && e.points > 0)
    .reduce((s, e) => s + e.points, 0);
  return Math.round(gained / AXES.length);
}

// Score history timeseries for growth chart
export function getScoreHistory(rangeMs = 30 * 86400000) {
  const d = getPsycap();
  const now = Date.now();
  const start = now - rangeMs;
  const events = d.events.filter((e) => e.ts >= start).sort((a, b) => a.ts - b.ts);
  // Build timeseries: starting from current score minus all gains, apply events forward
  const totalPoints = events.filter((e) => e.points > 0).reduce((s, e) => s + e.points, 0);
  const startScore = Math.max(MIN, getOverallScore() - Math.round(totalPoints / AXES.length));
  const points = [{ ts: start, score: startScore }];
  let current = startScore;
  events.forEach((e) => {
    current += Math.round((e.points * e.axes.length) / AXES.length);
    points.push({ ts: e.ts, score: Math.min(MAX, current), event: e });
  });
  if (points[points.length - 1].ts < now) {
    points.push({ ts: now, score: getOverallScore() });
  }
  return points;
}

// Get events grouped by day for activity feed
export function getEventsByDay() {
  const d = getPsycap();
  const groups = {};
  d.events.forEach((e) => {
    const day = new Date(e.ts).toISOString().slice(0, 10);
    if (!groups[day]) groups[day] = [];
    groups[day].push(e);
  });
  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([day, events]) => ({ day, events }));
}

// Smart recommendation based on lowest axis
export function getRecommendation() {
  const lowest = getLowestAxis();
  const RECS = {
    safety:    { med: "Женское внутреннее расслабление", scenario: "fear",     text: "Начните с практики расслабления или сценария работы со страхом в орбите." },
    worth:     { med: "Разговор с собой из будущего",    scenario: "power",    text: "Укрепите самоценность через контакт с собой в будущем или внутренний огонь." },
    receive:   { med: "Где я перекрыла себе получение",  scenario: "abundance", text: "Откройте способность получать — послушайте медитацию или попробуйте сценарий изобилия." },
    feminine:  { med: "Женская энергия",                  scenario: "feminine", text: "Вернитесь в свою женскую природу через медитацию или текучий сценарий на орбите." },
    trust:     { med: "Доверие к миру",                   scenario: "love",     text: "Развивайте доверие через практику или сценарий любви и наполненности." },
    authentic: { med: "Право быть настоящей",             scenario: "capital",  text: "Вернитесь к себе настоящей через медитацию или сценарий психологического капитала." },
  };
  return { axis: lowest, ...RECS[lowest.id] };
}

export function resetPsycap() { localStorage.removeItem(KEY); }
