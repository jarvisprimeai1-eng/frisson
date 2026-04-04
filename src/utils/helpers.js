import { useState, useEffect } from "react";

export function getMoon() {
  const d = new Date() - new Date(2000, 0, 6, 18, 14, 0);
  const p = ((d / 86400000 % 29.53) + 29.53) % 29.53;
  if (p < 1.85) return { e: "🌑", n: "Новолуние" };
  if (p < 7.38) return { e: "🌒", n: "Растущий серп" };
  if (p < 9.22) return { e: "🌓", n: "Первая четверть" };
  if (p < 14.77) return { e: "🌔", n: "Растущая луна" };
  if (p < 16.61) return { e: "🌕", n: "Полнолуние" };
  if (p < 22.15) return { e: "🌖", n: "Убывающая луна" };
  if (p < 23.99) return { e: "🌗", n: "Последняя четверть" };
  return { e: "🌘", n: "Убывающий серп" };
}

export function useGreeting() {
  const g = () => {
    const h = new Date().getHours();
    return h >= 5 && h < 12 ? "Доброе утро" : h >= 12 && h < 17 ? "Добрый день" : h >= 17 && h < 23 ? "Добрый вечер" : "Доброй ночи";
  };
  const [v, sv] = useState(g);
  useEffect(() => {
    const id = setInterval(() => sv(g()), 60000);
    return () => clearInterval(id);
  }, []);
  return v;
}

export const FONT_SERIF = "'Cormorant','Cormorant Garamond',Georgia,serif";
export const FONT_SANS = "'Plus Jakarta Sans',system-ui,sans-serif";
