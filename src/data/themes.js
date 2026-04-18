// Night themes — juicy dopamine palette
// Each mood = unique combo of complementary jewel tones
const NIGHT = {
  // Пустота — Iris Milk: deep violet iris + creamy lavender mist + ethereal bloom
  empty: {
    e: "🌑", l: "Пустота", bg: "linear-gradient(165deg, #0c0620 0%, #16103a 50%, #1a0c30 100%)",
    card: "rgba(91,58,140,.2)", border: "rgba(120,80,180,.3)",
    accent: "#8B68C8", ar: "139,104,200",
    dim: "rgba(100,70,160,.22)", o1: "rgba(91,58,140,.75)", o2: "rgba(180,140,220,.5)",
    nav: "rgba(100,70,160,.3)", text: "#e8daf8", tr: "232,218,248",
    gF: "#1a1040", gT: "#0c0620"
  },
  // Тихо — Cherry Cloud: rich dark cherry + soft berry + warm fruit depth
  quiet: {
    e: "🌒", l: "Тихо", bg: "linear-gradient(165deg, #1a0610 0%, #2e0c1c 50%, #200818 100%)",
    card: "rgba(138,28,60,.18)", border: "rgba(170,45,80,.28)",
    accent: "#C44070", ar: "196,64,112",
    dim: "rgba(150,35,70,.2)", o1: "rgba(140,24,56,.75)", o2: "rgba(200,80,120,.5)",
    nav: "rgba(160,40,75,.3)", text: "#fce0ec", tr: "252,224,236",
    gF: "#300e20", gT: "#1a0610"
  },
  // Наполнена — Eau Naturelle: warm almond + golden cream + abundant earth
  full: {
    e: "🌕", l: "Наполнена", bg: "linear-gradient(165deg, #181008 0%, #2c1a0c 45%, #221408 100%)",
    card: "rgba(196,152,104,.16)", border: "rgba(212,168,112,.26)",
    accent: "#D4A868", ar: "212,168,104",
    accent2: "#E8D0B0", ar2: "232,208,176",
    dim: "rgba(196,152,104,.2)", o1: "rgba(180,120,60,.7)", o2: "rgba(232,208,176,.45)",
    nav: "rgba(196,148,96,.3)", text: "#F4ECDC", tr: "244,236,220",
    gF: "#322010", gT: "#181008"
  },
  // В силе — Deep Cherry Fire: dark fruit intensity + crimson core + fierce warmth
  power: {
    e: "🔥", l: "В силе", bg: "linear-gradient(165deg, #100410 0%, #280818 50%, #1c0410 100%)",
    card: "rgba(154,24,72,.18)", border: "rgba(180,40,90,.28)",
    accent: "#B83060", ar: "184,48,96",
    accent2: "#E07898", ar2: "224,120,152",
    dim: "rgba(160,30,72,.22)", o1: "rgba(154,24,72,.75)", o2: "rgba(224,120,152,.45)",
    nav: "rgba(170,36,80,.32)", text: "#F8E0EC", tr: "248,224,236",
    gF: "#2c0a1c", gT: "#100410"
  },
};

// Day themes — Cloud Dancer base with rich jewel gradients
const DAY = {
  empty: {
    e: "🌑", l: "Пустота", bg: "linear-gradient(165deg, #EDE8F2 0%, #F0EDE8 40%, #E8E4F0 100%)",
    card: "rgba(80,60,140,.08)", border: "rgba(80,60,140,.18)",
    accent: "#6048B0", ar: "96,72,176",
    dim: "rgba(80,60,140,.1)", o1: "rgba(100,60,180,.25)", o2: "rgba(60,30,150,.15)",
    nav: "rgba(80,60,140,.08)", text: "#2a2040",
    gF: "#E0DCF0", gT: "#EDE8F2"
  },
  quiet: {
    e: "🌒", l: "Тихо", bg: "linear-gradient(165deg, #F0E4EC 0%, #EDE9E4 40%, #E8DEE8 100%)",
    card: "rgba(140,40,90,.08)", border: "rgba(140,40,90,.16)",
    accent: "#9B2868", ar: "155,40,104",
    dim: "rgba(140,40,90,.1)", o1: "rgba(160,30,110,.22)", o2: "rgba(220,140,60,.12)",
    nav: "rgba(140,40,90,.08)", text: "#3a1028",
    gF: "#E8D8E4", gT: "#F0E4EC"
  },
  full: {
    e: "🌕", l: "Наполнена", bg: "linear-gradient(165deg, #F2E4EE 0%, #F0EAE8 40%, #EEE0F0 100%)",
    card: "rgba(180,20,110,.08)", border: "rgba(180,20,110,.16)",
    accent: "#B81878", ar: "184,24,120",
    dim: "rgba(180,20,110,.1)", o1: "rgba(200,30,140,.22)", o2: "rgba(120,40,180,.12)",
    nav: "rgba(180,20,110,.08)", text: "#380620",
    gF: "#EAD8E8", gT: "#F2E4EE"
  },
  power: {
    e: "🔥", l: "В силе", bg: "linear-gradient(165deg, #F4ECE0 0%, #F0ECE4 40%, #F0E4D8 100%)",
    card: "rgba(210,100,20,.08)", border: "rgba(210,100,20,.16)",
    accent: "#D07018", ar: "208,112,24",
    dim: "rgba(210,100,20,.1)", o1: "rgba(220,100,20,.22)", o2: "rgba(140,40,100,.12)",
    nav: "rgba(210,100,20,.08)", text: "#381808",
    gF: "#EAE0D0", gT: "#F4ECE0"
  },
};

export function getThemes() { return NIGHT; }
export const THEMES = NIGHT;

export const ENERGY_LEVELS = [
  { min: 0, max: 25, l: { ru: "Критическое истощение", en: "Critical exhaustion" } },
  { min: 26, max: 45, l: { ru: "Низкий ресурс", en: "Low resource" } },
  { min: 46, max: 65, l: { ru: "Средний ресурс", en: "Moderate resource" } },
  { min: 66, max: 82, l: { ru: "Хороший ресурс", en: "Good resource" } },
  { min: 83, max: 100, l: { ru: "Высокий ресурс", en: "High resource" } },
];

export const getEnergyLevel = (s, lang = "ru") => {
  const lv = ENERGY_LEVELS.find((l) => s >= l.min && s <= l.max) || ENERGY_LEVELS[0];
  return { ...lv, l: typeof lv.l === "object" ? (lv.l[lang] || lv.l.ru) : lv.l };
};

// Theme labels (mood names)
export const THEME_LABELS = {
  empty: { ru: "Пустота", en: "Emptiness" },
  quiet: { ru: "Тихо", en: "Quiet" },
  full: { ru: "Наполнена", en: "Full" },
  power: { ru: "В силе", en: "In power" },
};
export const themeLabel = (key, lang = "ru") => (THEME_LABELS[key] && THEME_LABELS[key][lang]) || key;
