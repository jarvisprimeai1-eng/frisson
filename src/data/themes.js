// Night themes (original dark)
const NIGHT = {
  empty: {
    e: "🌑", l: "Пустота", bg: "#070818",
    card: "rgba(40,44,100,.1)", border: "rgba(50,55,130,.18)",
    accent: "#6060C0", ar: "96,96,192",
    dim: "rgba(40,44,100,.14)", o1: "rgba(30,30,110,.8)", o2: "rgba(60,30,150,.45)",
    nav: "rgba(50,55,130,.28)", text: "#dde0f8",
    gF: "#0e0f28", gT: "#070818"
  },
  quiet: {
    e: "🌒", l: "Тихо", bg: "#090c14",
    card: "rgba(96,112,180,.06)", border: "rgba(96,112,180,.15)",
    accent: "#8090C0", ar: "128,144,192",
    dim: "rgba(96,112,180,.1)", o1: "rgba(96,112,180,.55)", o2: "rgba(180,100,40,.35)",
    nav: "rgba(96,112,180,.22)", text: "#eaecf8",
    gF: "#10142a", gT: "#090c14"
  },
  full: {
    e: "🌕", l: "Наполнена", bg: "#0d0614",
    card: "rgba(148,38,148,.07)", border: "rgba(180,20,120,.2)",
    accent: "#B020A0", ar: "176,32,160",
    dim: "rgba(148,38,148,.12)", o1: "rgba(180,20,120,.7)", o2: "rgba(80,30,180,.5)",
    nav: "rgba(148,38,148,.3)", text: "#fce8ff",
    gF: "#2a0428", gT: "#0d0614"
  },
  power: {
    e: "🔥", l: "В силе", bg: "#100806",
    card: "rgba(180,60,20,.07)", border: "rgba(180,60,20,.18)",
    accent: "#C04818", ar: "192,72,24",
    dim: "rgba(138,40,16,.14)", o1: "rgba(180,60,10,.7)", o2: "rgba(100,80,160,.4)",
    nav: "rgba(180,60,20,.3)", text: "#fceee8",
    gF: "#2c1008", gT: "#100806"
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

export function getThemes(mode) { return mode === "day" ? DAY : NIGHT; }
export const THEMES = NIGHT; // default export for backward compat

export const ENERGY_LEVELS = [
  { min: 0, max: 25, l: "Критическое истощение" },
  { min: 26, max: 45, l: "Низкий ресурс" },
  { min: 46, max: 65, l: "Средний ресурс" },
  { min: 66, max: 82, l: "Хороший ресурс" },
  { min: 83, max: 100, l: "Высокий ресурс" },
];

export const getEnergyLevel = (s) =>
  ENERGY_LEVELS.find((l) => s >= l.min && s <= l.max) || ENERGY_LEVELS[0];
