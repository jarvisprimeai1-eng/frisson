import { useState, useEffect } from "react";
import { FONT_SERIF, FONT_SANS } from "../utils/helpers";
import { AXES, getPsycap, getOverallScore, getMonthlyDelta, getRecommendation, getScoreHistory, getEventsByDay, getLastAxisActivity, logWeeklyCheckin, MED_TAGS, LAYER_AXES } from "../data/psycap";

const EVENT_ICONS = {
  meditation: "◦",
  diary: "✎",
  orbit: "◈",
  test: "⚡",
  checkin: "✦",
};

const EVENT_LABELS = {
  meditation: "Медитация",
  diary: "Дневник",
  orbit: "Орбита",
  test: "Тест энергии",
  checkin: "Чекин",
};

function fmtDay(dayStr) {
  const d = new Date(dayStr);
  const day = d.getDate();
  const mon = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"][d.getMonth()];
  return `${day} ${mon}`;
}

function fmtTime(ts) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// ── OVERVIEW TAB ────────────────────────────────────────────────────────
function Overview({ T, data, score, delta, rec, goToScenario, setScreen, expandedAxis, setExpandedAxis }) {
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  return (
    <div>
      {/* Animated ring */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
        <div style={{ position: "relative", width: 160, height: 160 }}>
          <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(var(--txt),.07)" strokeWidth="8" />
            <circle cx="80" cy="80" r={radius} fill="none" stroke={T.accent} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1.4s ease" }} />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 48, fontWeight: 300, color: "rgba(var(--txt),.95)", lineHeight: 1 }}>{score}</div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(var(--txt),.4)", marginTop: 4 }}>из 100</div>
          </div>
        </div>
        {delta !== 0 && (
          <div style={{ fontFamily: FONT_SANS, fontSize: 11, marginTop: 10, color: delta > 0 ? "#4FAE92" : "#D4453C" }}>
            {delta > 0 ? "+" : ""}{delta} за месяц
          </div>
        )}
      </div>

      {/* 6 Axis bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        {AXES.map((a) => {
          const value = data.axes[a.id];
          const isExpanded = expandedAxis === a.id;
          const lastTs = getLastAxisActivity(a.id);
          const lastStr = lastTs ? `${Math.floor((Date.now() - lastTs) / 86400000)} дн назад` : "ещё не было";
          // Find meditations that feed this axis
          const meds = Object.entries(MED_TAGS).filter(([, axes]) => axes.includes(a.id)).map(([name]) => name);
          return (
            <div key={a.id}>
              <div onClick={() => setExpandedAxis(isExpanded ? null : a.id)} style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                  <span style={{ fontFamily: FONT_SERIF, fontSize: 14, color: "rgba(var(--txt),.88)" }}>{a.label}</span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 12, color: a.hex, fontWeight: 500 }}>{value}</span>
                </div>
                <div style={{ height: 7, borderRadius: 4, background: "rgba(var(--txt),.05)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${value}%`, background: `linear-gradient(90deg, ${a.hex}77, ${a.hex})`, borderRadius: 4, transition: "width 1.2s ease", boxShadow: `0 0 10px ${a.hex}55` }} />
                </div>
              </div>
              {isExpanded && (
                <div style={{ marginTop: 10, padding: "12px 14px", background: `${a.hex}0c`, border: `1px solid ${a.hex}28`, borderRadius: 12, animation: "fadeUp .25s ease both" }}>
                  <div style={{ fontFamily: FONT_SERIF, fontSize: 12, color: "rgba(var(--txt),.75)", lineHeight: 1.6, marginBottom: 8 }}>{a.desc}</div>
                  {meds.length > 0 && (
                    <>
                      <div style={{ fontFamily: FONT_SANS, fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: `${a.hex}aa`, marginBottom: 4 }}>Развивают:</div>
                      <div style={{ fontFamily: FONT_SERIF, fontSize: 11, color: "rgba(var(--txt),.6)", lineHeight: 1.5, marginBottom: 8 }}>
                        {meds.slice(0, 3).join(" · ")}
                      </div>
                    </>
                  )}
                  <div style={{ fontFamily: FONT_SANS, fontSize: 9, color: "rgba(var(--txt),.35)" }}>Последняя активность: {lastStr}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Smart recommendation */}
      <div style={{ padding: "16px 18px", background: `${rec.axis.hex}12`, border: `1px solid ${rec.axis.hex}30`, borderRadius: 16 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: rec.axis.hex, marginBottom: 6 }}>Сейчас рекомендуется →</div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 14, color: "rgba(var(--txt),.88)", lineHeight: 1.5, marginBottom: 10 }}>{rec.text}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div onClick={() => setScreen("library")} style={{ cursor: "pointer", padding: "7px 14px", borderRadius: 12, background: `${rec.axis.hex}22`, border: `1px solid ${rec.axis.hex}44`, fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: rec.axis.hex }}>В библиотеку</div>
          {goToScenario && <div onClick={() => goToScenario(rec.scenario)} style={{ cursor: "pointer", padding: "7px 14px", borderRadius: 12, background: `${rec.axis.hex}22`, border: `1px solid ${rec.axis.hex}44`, fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: rec.axis.hex }}>На орбиту</div>}
        </div>
      </div>
    </div>
  );
}

// ── GROWTH TAB ──────────────────────────────────────────────────────────
function Growth({ T }) {
  const [range, setRange] = useState("month");
  const ranges = {
    week: { ms: 7 * 86400000, label: "Неделя" },
    month: { ms: 30 * 86400000, label: "Месяц" },
    all: { ms: 365 * 86400000, label: "Всё время" },
  };
  const [selectedPt, setSelectedPt] = useState(null);
  const history = getScoreHistory(ranges[range].ms);

  const W = 320, H = 140, pad = 10;
  const minScore = Math.min(...history.map((p) => p.score), 0);
  const maxScore = Math.max(...history.map((p) => p.score), 100);
  const scale = (v) => H - pad - ((v - minScore) / Math.max(1, maxScore - minScore)) * (H - pad * 2);
  const pts = history.map((p, i) => ({
    x: pad + (i / Math.max(1, history.length - 1)) * (W - pad * 2),
    y: scale(p.score),
    ...p,
  }));
  const line = "M" + pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("L");
  const area = line + `L${pts[pts.length - 1]?.x || W - pad},${H - pad}L${pts[0]?.x || pad},${H - pad}Z`;

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", background: "rgba(var(--txt),.04)", border: `1px solid ${T.border}`, borderRadius: 12, padding: 3, marginBottom: 16 }}>
        {Object.entries(ranges).map(([k, v]) => (
          <div key={k} onClick={() => setRange(k)} style={{ flex: 1, padding: "9px 0", textAlign: "center", fontFamily: FONT_SANS, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", borderRadius: 9, cursor: "pointer", background: range === k ? T.accent + "22" : "transparent", color: range === k ? T.accent : "rgba(var(--txt),.5)", transition: "all .2s" }}>{v.label}</div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ padding: "16px 10px", background: "rgba(var(--txt),.03)", border: `1px solid ${T.border}`, borderRadius: 16, marginBottom: 16 }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ display: "block" }}>
          <defs>
            <linearGradient id="pchart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={T.accent} stopOpacity="0.4" />
              <stop offset="100%" stopColor={T.accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {history.length >= 2 && (
            <>
              <path d={area} fill="url(#pchart)" />
              <path d={line} fill="none" stroke={T.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {pts.map((p, i) => p.event && (
                <circle key={i} cx={p.x} cy={p.y} r={4} fill={T.accent} style={{ cursor: "pointer" }} onClick={() => setSelectedPt(p)} />
              ))}
            </>
          )}
          {history.length < 2 && (
            <text x={W / 2} y={H / 2} textAnchor="middle" fill="rgba(200,175,158,.4)" fontSize="12" fontFamily={FONT_SERIF}>Ещё нет данных</text>
          )}
        </svg>
      </div>

      {/* Selected point details */}
      {selectedPt?.event && (
        <div style={{ padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, marginBottom: 12 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: T.accent, marginBottom: 4 }}>{EVENT_LABELS[selectedPt.event.type]}</div>
          <div style={{ fontFamily: FONT_SERIF, fontSize: 14, color: "rgba(var(--txt),.88)", marginBottom: 4 }}>{selectedPt.event.name}</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 10, color: "rgba(var(--txt),.45)" }}>+{selectedPt.event.points} · {fmtTime(selectedPt.event.ts)}</div>
        </div>
      )}

      <div style={{ fontFamily: FONT_SERIF, fontSize: 12, color: "rgba(var(--txt),.5)", lineHeight: 1.6, textAlign: "center", fontStyle: "italic" }}>
        Точки на графике — это события. Нажмите, чтобы увидеть, что произошло.
      </div>
    </div>
  );
}

// ── FEED TAB ────────────────────────────────────────────────────────────
function Feed({ T }) {
  const days = getEventsByDay();
  if (days.length === 0) {
    return (
      <div style={{ padding: 32, textAlign: "center", fontFamily: FONT_SERIF, fontSize: 14, color: "rgba(var(--txt),.4)", fontStyle: "italic" }}>
        История практик появится здесь после первой активности
      </div>
    );
  }
  return (
    <div>
      {days.slice(0, 30).map(({ day, events }) => (
        <div key={day} style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(var(--txt),.4)", marginBottom: 8 }}>{fmtDay(day)}</div>
          {events.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 13, marginBottom: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${T.accent}18`, border: `1px solid ${T.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: T.accent, flexShrink: 0 }}>{EVENT_ICONS[e.type] || "·"}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                  <span style={{ fontFamily: FONT_SERIF, fontSize: 13, color: "rgba(var(--txt),.88)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{e.name}</span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 9, color: "rgba(var(--txt),.35)", flexShrink: 0, marginLeft: 8 }}>{fmtTime(e.ts)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(var(--txt),.35)" }}>{EVENT_LABELS[e.type]}</span>
                  {e.points > 0 && <span style={{ fontFamily: FONT_SANS, fontSize: 9, color: T.accent }}>+{e.points}</span>}
                  {e.axes.slice(0, 3).map((axId) => {
                    const ax = AXES.find((a) => a.id === axId);
                    return ax ? <span key={axId} style={{ fontFamily: FONT_SANS, fontSize: 8, padding: "2px 6px", borderRadius: 6, background: `${ax.hex}15`, color: ax.hex }}>{ax.short}</span> : null;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── WEEKLY CHECK-IN MODAL ───────────────────────────────────────────────
function WeeklyCheckin({ T, onClose }) {
  const [values, setValues] = useState({ safety: 50, worth: 50, feminine: 50, trust: 50 });
  const sliderAxes = AXES.filter((a) => ["safety", "worth", "feminine", "trust"].includes(a.id));

  const save = () => {
    logWeeklyCheckin(values);
    localStorage.setItem("frisson_checkin_last", String(Date.now()));
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(6,2,8,.88)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 380, background: "#14102a", border: `1px solid ${T.border}`, borderRadius: 20, padding: 24 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: T.accent, marginBottom: 6, textAlign: "center" }}>Еженедельный чекин</div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 20, color: "rgba(var(--txt),.95)", marginBottom: 6, textAlign: "center" }}>Как вы сейчас?</div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 12, color: "rgba(var(--txt),.5)", marginBottom: 24, textAlign: "center", fontStyle: "italic" }}>30 секунд на 4 шкалы</div>

        {sliderAxes.map((a) => (
          <div key={a.id} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: FONT_SERIF, fontSize: 13, color: "rgba(var(--txt),.85)" }}>{a.short}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 11, color: a.hex }}>{values[a.id]}</span>
            </div>
            <input
              type="range" min="0" max="100" value={values[a.id]}
              onChange={(e) => setValues((v) => ({ ...v, [a.id]: parseInt(e.target.value) }))}
              style={{ width: "100%", accentColor: a.hex }}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} type="button" style={{ flex: 1, padding: 14, background: "rgba(var(--txt),.05)", border: "1px solid rgba(var(--txt),.1)", borderRadius: 12, fontFamily: FONT_SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(var(--txt),.5)", cursor: "pointer" }}>Позже</button>
          <button onClick={save} type="button" style={{ flex: 2, padding: 14, background: T.accent + "44", border: `1px solid ${T.accent}`, borderRadius: 12, fontFamily: FONT_SANS, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "#fff", cursor: "pointer" }}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──────────────────────────────────────────────────────
export default function PsycapTracker({ T, setScreen, goToScenario }) {
  const [tab, setTab] = useState("overview");
  const [data, setData] = useState(getPsycap);
  const [expandedAxis, setExpandedAxis] = useState(null);
  const [showCheckin, setShowCheckin] = useState(false);

  // Check if weekly checkin is due
  const lastCheckin = parseInt(localStorage.getItem("frisson_checkin_last")) || 0;
  const checkinDue = Date.now() - lastCheckin > 7 * 86400000;

  useEffect(() => {
    // Refresh data when switching tabs
    setData(getPsycap());
  }, [tab]);

  const score = getOverallScore();
  const delta = getMonthlyDelta();
  const rec = getRecommendation();

  return (
    <div style={{ margin: "0 24px 18px", padding: "20px 18px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 20, position: "relative", zIndex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(var(--txt),.4)" }}>Психологический капитал</div>
        {checkinDue && (
          <div onClick={() => setShowCheckin(true)} style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: T.accent, cursor: "pointer", padding: "4px 10px", borderRadius: 10, background: `${T.accent}18`, border: `1px solid ${T.accent}33` }}>Чекин →</div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "rgba(var(--txt),.04)", border: `1px solid ${T.border}`, borderRadius: 12, padding: 3, marginBottom: 18 }}>
        {[{ id: "overview", l: "Обзор" }, { id: "growth", l: "Рост" }, { id: "feed", l: "Лента" }].map((t) => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "9px 0", textAlign: "center", fontFamily: FONT_SANS, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", borderRadius: 9, cursor: "pointer", background: tab === t.id ? T.accent + "22" : "transparent", color: tab === t.id ? T.accent : "rgba(var(--txt),.5)", transition: "all .2s" }}>{t.l}</div>
        ))}
      </div>

      {/* Content */}
      {tab === "overview" && <Overview T={T} data={data} score={score} delta={delta} rec={rec} goToScenario={goToScenario} setScreen={setScreen} expandedAxis={expandedAxis} setExpandedAxis={setExpandedAxis} />}
      {tab === "growth" && <Growth T={T} />}
      {tab === "feed" && <Feed T={T} />}

      {/* Weekly check-in modal */}
      {showCheckin && <WeeklyCheckin T={T} onClose={() => setShowCheckin(false)} />}
    </div>
  );
}
