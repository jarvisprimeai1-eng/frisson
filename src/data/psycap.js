// Psychological Capital (PsyCap) — HERO model
// Hope, self-Efficacy, Resilience, Optimism (Luthans, 2007)
// Each practice boosts specific dimensions; we track growth over time
// and surface insights + recommendations.

const KEY = "frisson_psycap";
const MAX = 100;

function defaults() {
  return {
    hope: 12, efficacy: 12, resilience: 12, optimism: 12,
    history: [], // { ts, h, e, r, o, source }
  };
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || defaults(); }
  catch { return defaults(); }
}
function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }

// Each practice = HERO weights (how much it develops each dimension per session)
// h=hope, e=efficacy, r=resilience, o=optimism
export const PRACTICE_HERO = {
  // Orbit scenarios
  neutral:   { h: 1, e: 1, r: 1, o: 1 },
  anxiety:   { h: 0, e: 1, r: 3, o: 1 }, // recovering from anxiety builds resilience
  love:      { h: 3, e: 0, r: 1, o: 3 }, // love opens hope and optimism
  power:     { h: 2, e: 4, r: 1, o: 1 }, // inner fire = self-efficacy
  conflict:  { h: 1, e: 3, r: 2, o: 0 }, // resolving conflict = efficacy + resilience
  fear:      { h: 1, e: 1, r: 4, o: 1 }, // facing fear = resilience
  abundance: { h: 3, e: 1, r: 0, o: 3 }, // abundance = hope + optimism
  feminine:  { h: 2, e: 2, r: 1, o: 2 }, // balanced
  capital:   { h: 2, e: 2, r: 2, o: 2 }, // direct psycap practice = all four
  // Journal sections
  intent:    { h: 3, e: 1, r: 0, o: 2 }, // intentions = hope + future thinking
  grat:      { h: 1, e: 0, r: 1, o: 4 }, // gratitude = optimism
  goals:     { h: 2, e: 3, r: 0, o: 1 }, // goals = efficacy
  reflect:   { h: 0, e: 1, r: 3, o: 1 }, // reflection on practice = resilience
};

export function addPsycap(source) {
  const weights = PRACTICE_HERO[source];
  if (!weights) return load();
  const d = load();
  d.hope = Math.min(MAX, d.hope + weights.h);
  d.efficacy = Math.min(MAX, d.efficacy + weights.e);
  d.resilience = Math.min(MAX, d.resilience + weights.r);
  d.optimism = Math.min(MAX, d.optimism + weights.o);
  d.history.push({ ts: Date.now(), h: weights.h, e: weights.e, r: weights.r, o: weights.o, source });
  // Keep history capped at 200 entries
  if (d.history.length > 200) d.history = d.history.slice(-200);
  save(d);
  return d;
}

export function getPsycap() { return load(); }

export function getPsycapStats() {
  const d = load();
  const total = d.hope + d.efficacy + d.resilience + d.optimism;
  const avg = Math.round(total / 4);

  // Growth this week vs last week
  const now = Date.now();
  const weekAgo = now - 7 * 86400000;
  const twoWeeksAgo = now - 14 * 86400000;
  const thisWeek = d.history.filter((h) => h.ts >= weekAgo);
  const lastWeek = d.history.filter((h) => h.ts >= twoWeeksAgo && h.ts < weekAgo);
  const sumDim = (entries, key) => entries.reduce((s, h) => s + (h[key] || 0), 0);
  const thisWeekTotal = sumDim(thisWeek, "h") + sumDim(thisWeek, "e") + sumDim(thisWeek, "r") + sumDim(thisWeek, "o");
  const lastWeekTotal = sumDim(lastWeek, "h") + sumDim(lastWeek, "e") + sumDim(lastWeek, "r") + sumDim(lastWeek, "o");
  const weeklyGrowth = thisWeekTotal - lastWeekTotal;

  // Find strongest and weakest dimensions
  const dims = [
    { id: "hope", label: "Надежда", value: d.hope, hex: "#F08838", desc: "Способность видеть пути и желать большего" },
    { id: "efficacy", label: "Самоэффективность", value: d.efficacy, hex: "#E64DA8", desc: "Уверенность, что справишься с задачами" },
    { id: "resilience", label: "Стойкость", value: d.resilience, hex: "#9F7BD8", desc: "Способность восстанавливаться после трудностей" },
    { id: "optimism", label: "Оптимизм", value: d.optimism, hex: "#FFAF32", desc: "Вера, что хорошее возможно и произойдёт" },
  ];
  const sorted = [...dims].sort((a, b) => b.value - a.value);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  // Recommendation based on weakest
  const RECS = {
    hope: { practice: "Любовь · Наполненность", scenario: "love", text: "Откройте сердце надежде. Любовь и наполненность раскрывают способность желать и видеть пути." },
    efficacy: { practice: "Сила · Внутренний огонь", scenario: "power", text: "Укрепите веру в свои силы. Практика внутреннего огня собирает энергию для действия." },
    resilience: { practice: "Тревога или Страх", scenario: "anxiety", text: "Учитесь восстанавливаться. Практики работы с тревогой и страхом тренируют возвращение в покой." },
    optimism: { practice: "Изобилие · Получение благ", scenario: "abundance", text: "Настройтесь на хорошее. Практика изобилия меняет то, что вы ожидаете от мира." },
  };

  return {
    dims, total, avg, weeklyGrowth,
    strongest, weakest,
    recommendation: RECS[weakest.id],
    sessionsThisWeek: thisWeek.length,
  };
}

export function resetPsycap() { localStorage.removeItem(KEY); }
