export const THEMES = {
  empty: {
    e: "🌑", l: "Пустота", bg: "#08080e",
    card: "rgba(160,212,228,.06)", border: "rgba(160,212,228,.14)",
    accent: "#7EC8DC", ar: "126,200,220",
    dim: "rgba(160,212,228,.1)", o1: "rgba(100,180,210,.6)", o2: "rgba(138,36,85,.35)",
    nav: "rgba(126,200,220,.2)", text: "#d8f0f6",
    gF: "#0c1418", gT: "#08080e"
  },
  quiet: {
    e: "🌒", l: "Тихо", bg: "#0a0810",
    card: "rgba(138,36,85,.06)", border: "rgba(138,36,85,.16)",
    accent: "#A84878", ar: "168,72,120",
    dim: "rgba(138,36,85,.1)", o1: "rgba(138,36,85,.55)", o2: "rgba(160,212,228,.3)",
    nav: "rgba(138,36,85,.22)", text: "#f4e0ec",
    gF: "#180c14", gT: "#0a0810"
  },
  full: {
    e: "🌕", l: "Наполнена", bg: "#0e0610",
    card: "rgba(200,60,120,.06)", border: "rgba(200,60,120,.18)",
    accent: "#D43878", ar: "212,56,120",
    dim: "rgba(200,60,120,.1)", o1: "rgba(200,60,120,.6)", o2: "rgba(160,212,228,.4)",
    nav: "rgba(200,60,120,.25)", text: "#fce4f0",
    gF: "#220818", gT: "#0e0610"
  },
  power: {
    e: "🔥", l: "В силе", bg: "#100808",
    card: "rgba(200,120,64,.07)", border: "rgba(200,120,64,.18)",
    accent: "#D08040", ar: "208,128,64",
    dim: "rgba(200,120,64,.12)", o1: "rgba(200,120,64,.6)", o2: "rgba(138,36,85,.45)",
    nav: "rgba(200,120,64,.25)", text: "#fcf0e4",
    gF: "#201008", gT: "#100808"
  },
};

export const ENERGY_LEVELS = [
  { min: 0, max: 25, l: "Критическое истощение" },
  { min: 26, max: 45, l: "Низкий ресурс" },
  { min: 46, max: 65, l: "Средний ресурс" },
  { min: 66, max: 82, l: "Хороший ресурс" },
  { min: 83, max: 100, l: "Высокий ресурс" },
];

export const getEnergyLevel = (s) =>
  ENERGY_LEVELS.find((l) => s >= l.min && s <= l.max) || ENERGY_LEVELS[0];
