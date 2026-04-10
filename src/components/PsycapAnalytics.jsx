import { getPsycapStats } from "../data/psycap";
import { FONT_SERIF, FONT_SANS } from "../utils/helpers";

export default function PsycapAnalytics({ T, setScreen }) {
  const stats = getPsycapStats();
  const { dims, avg, weeklyGrowth, strongest, weakest, recommendation, sessionsThisWeek } = stats;
  const trendIcon = weeklyGrowth > 0 ? "↑" : weeklyGrowth < 0 ? "↓" : "→";
  const trendColor = weeklyGrowth > 0 ? "#4FAE92" : weeklyGrowth < 0 ? "#D4453C" : `rgba(var(--txt),.4)`;

  return (
    <div style={{ margin: "0 24px 18px", padding: "20px 18px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, position: "relative", zIndex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: `rgba(var(--txt),.4)` }}>Психологический капитал</div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 9, color: trendColor }}>{trendIcon} {weeklyGrowth > 0 ? "+" : ""}{weeklyGrowth}/нед</div>
      </div>
      <div style={{ fontFamily: FONT_SERIF, fontSize: 18, color: `rgba(var(--txt),.9)`, marginBottom: 14 }}>HERO · {avg}/100</div>

      {/* Bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {dims.map((d) => (
          <div key={d.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <span style={{ fontFamily: FONT_SERIF, fontSize: 13, color: `rgba(var(--txt),.85)` }}>{d.label}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: d.hex }}>{d.value}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,.05)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${d.value}%`, background: `linear-gradient(90deg, ${d.hex}66, ${d.hex})`, borderRadius: 3, transition: "width 1.2s ease", boxShadow: `0 0 8px ${d.hex}44` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div style={{ padding: "12px 14px", background: `${strongest.hex}10`, border: `1px solid ${strongest.hex}30`, borderRadius: 12, marginBottom: 8 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: strongest.hex, marginBottom: 4 }}>Ваша сила</div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 13, color: `rgba(var(--txt),.85)`, lineHeight: 1.4 }}>{strongest.label} — ваша опора. {strongest.desc.toLowerCase()}.</div>
      </div>

      <div style={{ padding: "12px 14px", background: `${weakest.hex}10`, border: `1px solid ${weakest.hex}30`, borderRadius: 12, marginBottom: 10 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: weakest.hex, marginBottom: 4 }}>Что развивать</div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 13, color: `rgba(var(--txt),.85)`, lineHeight: 1.5, marginBottom: 6 }}>{recommendation.text}</div>
        <div onClick={() => setScreen && setScreen("orbit")} style={{ display: "inline-block", padding: "6px 12px", borderRadius: 10, background: `${weakest.hex}22`, border: `1px solid ${weakest.hex}44`, fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: weakest.hex, cursor: "pointer" }}>На орбиту →</div>
      </div>

      <div style={{ fontFamily: FONT_SANS, fontSize: 9, color: `rgba(var(--txt),.35)`, textAlign: "center" }}>Сессий за неделю: {sessionsThisWeek}</div>
    </div>
  );
}
