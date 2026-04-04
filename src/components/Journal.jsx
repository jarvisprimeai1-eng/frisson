import { useState } from "react";
import { THEMES } from "../data/themes";
import { FONT_SERIF, FONT_SANS } from "../utils/helpers";

export default function Journal({ theme }) {
  const T = THEMES[theme] || THEMES.full;
  const [tab, setTab] = useState("intent");
  const [goals, setGoals] = useState([{ t: "Пройти медитацию «Внутренняя опора» 4 раза", done: false, c: 2 }, { t: "Начать вести дневник каждый день", done: true, c: 3 }]);
  const [iText, setIText] = useState("");
  const [ints, setInts] = useState(["Я наполненная, спокойная, счастливая женщина.", "Я живу в своём доме мечты — красивом, тёплом и своём."]);
  const [gText, setGText] = useState("");
  const [grats, setGrats] = useState(["Я благодарна себе за то, что сегодня выбрала себя.", "Я благодарна себе за свою силу в усталости."]);
  const [rText, setRText] = useState("");
  const [crystals, setCrystals] = useState([]);

  const pop = () => { const id = Date.now(); setCrystals((p) => [...p, { id, x: Math.random() * 60 + 20 }]); setTimeout(() => setCrystals((p) => p.filter((x) => x.id !== id)), 1200); };
  const addI = () => { if (iText.trim()) { setInts((p) => [...p, iText.trim()]); setIText(""); pop(); } };
  const addG = () => { if (gText.trim()) { setGrats((p) => [...p, gText.trim()]); setGText(""); pop(); } };

  const TA = ({ val, set, ph }) => (
    <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 8 }}>
      <textarea value={val} onChange={(e) => set(e.target.value)} placeholder={ph} style={{ width: "100%", minHeight: 72, background: "transparent", border: "none", outline: "none", resize: "none", padding: "14px 16px", fontFamily: FONT_SERIF, fontSize: 15, color: "rgba(242,232,226,.85)", lineHeight: 1.65 }} />
      <div style={{ padding: "8px 12px", display: "flex", justifyContent: "flex-end", borderTop: `1px solid ${T.border}` }}>
        <div onClick={tab === "reflect" ? () => { if (rText.trim()) setRText(""); pop(); } : tab === "intent" ? addI : addG} style={{ padding: "7px 18px", borderRadius: 20, background: val.trim() ? T.dim : "rgba(255,255,255,.04)", border: `1px solid ${val.trim() ? T.accent : "rgba(255,255,255,.08)"}`, fontFamily: FONT_SANS, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: val.trim() ? "rgba(242,232,226,.82)" : "rgba(242,232,226,.25)", cursor: val.trim() ? "pointer" : "default", transition: "all .2s" }}>Сохранить →</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100%", background: T.bg, paddingBottom: 20, position: "relative", transition: "background .6s" }}>
      {crystals.map((cr) => (
        <div key={cr.id} style={{ position: "fixed", bottom: 120, left: `${cr.x}%`, zIndex: 999, pointerEvents: "none", animation: "floatUp 1.1s ease forwards", fontFamily: FONT_SERIF, fontSize: 22, color: T.accent, textShadow: `0 0 12px rgba(${T.ar},.8)` }}>+1 ⟡</div>
      ))}
      <div style={{ padding: "50px 24px 18px", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".25em", textTransform: "uppercase", color: T.accent, marginBottom: 6 }}>21 марта 2026</div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 32, fontWeight: 300, lineHeight: 1.15, color: "rgba(242,232,226,.95)", marginBottom: 20 }}>Дневник</div>
        <div style={{ display: "flex", background: T.card, border: `1px solid ${T.border}`, borderRadius: 13, padding: 3 }}>
          {[{ id: "intent", l: "Намерения" }, { id: "grat", l: "Благодарность" }, { id: "goals", l: "Цели ✦" }, { id: "reflect", l: "Рефлексия" }].map((t) => (
            <div key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 4px", textAlign: "center", fontSize: 10, letterSpacing: ".04em", textTransform: "uppercase", fontFamily: FONT_SANS, borderRadius: 11, cursor: "pointer", background: tab === t.id ? T.dim : "transparent", color: tab === t.id ? "rgba(242,232,226,.88)" : "rgba(242,232,226,.38)", transition: "all .3s", minHeight: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.l}</div>
          ))}
        </div>
      </div>

      <div style={{ margin: "0 24px 18px", padding: "17px 20px", background: T.dim, border: `1px solid ${T.border}`, borderRadius: 18, position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 }}>✦ Вопрос дня</div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 17, lineHeight: 1.65, color: "rgba(242,232,226,.82)" }}>
          {tab === "intent" && "«Каким я хочу быть сегодня? Пишу в настоящем времени.»"}
          {tab === "grat" && "«За что ты благодарна сегодня — себе и миру?»"}
          {tab === "goals" && "«Что я создаю в своей жизни прямо сейчас?»"}
          {tab === "reflect" && "«Что происходило внутри меня после практики?»"}
        </div>
      </div>

      <div style={{ padding: "0 24px", position: "relative", zIndex: 1 }}>
        {tab === "intent" && <>
          <div style={{ padding: "14px 18px", marginBottom: 14, background: `linear-gradient(135deg,${T.dim},rgba(255,255,255,.02))`, border: `1px solid ${T.border}`, borderRadius: 18 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: T.accent, marginBottom: 8 }}>✦ Формат намерения</div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 14, lineHeight: 1.75, color: "rgba(242,232,226,.75)" }}>Пишите в настоящем времени: <span style={{ color: T.accent }}>"Я есть", "У меня уже есть"</span>. Это фиксирует образ желаемого состояния.</div>
          </div>
          {ints.map((txt, i) => (
            <div key={i} style={{ display: "flex", gap: 13, padding: "14px 16px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 15, marginBottom: 8 }}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 22, color: `${T.accent}66`, lineHeight: 1, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 15, lineHeight: 1.65, color: "rgba(230,218,210,.85)", flex: 1 }}>{txt}</div>
            </div>
          ))}
          <TA val={iText} set={setIText} ph="Я есть... / У меня уже есть... / Я наполненная..." />
        </>}

        {tab === "grat" && <>
          {grats.map((txt, i) => (
            <div key={i} style={{ display: "flex", gap: 13, padding: "14px 16px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 15, marginBottom: 8 }}>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 22, color: "rgba(160,138,65,.45)", lineHeight: 1, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 15, lineHeight: 1.65, color: "rgba(230,218,210,.85)", flex: 1 }}>{txt}</div>
            </div>
          ))}
          <TA val={gText} set={setGText} ph="Я благодарна себе за... / Я благодарна жизни за..." />
        </>}

        {tab === "goals" && <>
          <div style={{ padding: "16px 18px", marginBottom: 14, background: `linear-gradient(135deg,${T.dim},rgba(255,255,255,.02))`, border: `1px solid ${T.border}`, borderRadius: 18 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>✦ Перед тем как писать цели</div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 16, color: "rgba(242,232,226,.9)", marginBottom: 4 }}>Мои истинные цели</div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 11, color: "rgba(242,232,226,.45)", lineHeight: 1.55, marginBottom: 14 }}>Послушайте эту практику перед тем, как ставить цели.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.dim, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 15, color: T.accent }}>▶</div>
              <div><div style={{ fontFamily: FONT_SANS, fontSize: 10, color: "rgba(242,232,226,.6)" }}>18 мин · Бесплатно</div><div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(242,232,226,.3)" }}>Медитация</div></div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(242,232,226,.4)" }}>Цели на месяц</div>
            <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: T.accent, cursor: "pointer", padding: "5px 12px", background: T.dim, border: `1px solid ${T.border}`, borderRadius: 20, fontFamily: FONT_SANS }}>+ Добавить</div>
          </div>
          {goals.map((g, i) => (
            <div key={i} onClick={() => { const n = [...goals]; n[i] = { ...n[i], done: !n[i].done }; setGoals(n); }} style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", cursor: "pointer", background: g.done ? T.dim : T.card, border: `1px solid ${T.border}`, borderRadius: 14, marginBottom: 8, transition: "all .3s" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: g.done ? T.dim : "rgba(255,255,255,.05)", border: `1.5px solid ${g.done ? T.accent : "rgba(255,255,255,.15)"}`, fontSize: 13, color: "rgba(242,232,226,.9)" }}>{g.done ? "✦" : "○"}</div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 13, color: "rgba(230,218,210,.88)", flex: 1, lineHeight: 1.35, textDecoration: g.done ? "line-through" : "none", opacity: g.done ? 0.5 : 1 }}>{g.t}</div>
              {g.done && <div style={{ fontSize: 11, color: T.accent, background: T.dim, padding: "3px 8px", borderRadius: 10, flexShrink: 0 }}>+{g.c} ⟡</div>}
            </div>
          ))}
        </>}

        {tab === "reflect" && <>
          <div style={{ padding: 18, background: T.card, border: `1px solid ${T.border}`, borderRadius: 18, marginBottom: 14 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(242,232,226,.38)", marginBottom: 12 }}>Состояние после практики</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {[["🌑", "Пусто"], ["🌒", "Тихо"], ["🌕", "Полна"], ["🔥", "В силе"]].map((pr, i) => (
                <div key={i} style={{ textAlign: "center", cursor: "pointer", opacity: 0.55 }}>
                  <div style={{ fontSize: 26 }}>{pr[0]}</div>
                  <div style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(242,232,226,.35)", fontFamily: FONT_SANS, marginTop: 5 }}>{pr[1]}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(242,232,226,.4)", marginBottom: 8 }}>✦ Инсайты, мысли, идеи</div>
          <TA val={rText} set={setRText} ph="Что я почувствовала во время практики? Какие образы, мысли, идеи пришли?" />
        </>}

        <div style={{ marginTop: 20 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(242,232,226,.38)", marginBottom: 14 }}>История записей</div>
          {[["20 мар", "Благодарна за возможность выбирать...", "3 ✦"], ["19 мар", "Сегодня я почувствовала себя собой...", "3 ✦"], ["18 мар", "Моё тело — мой дом...", "3 ✦"]].map((row, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 14px", background: T.card, border: `1px solid ${T.border}`, borderRadius: 13, marginBottom: 7, cursor: "pointer" }}>
              <div style={{ fontSize: 10, color: "rgba(242,232,226,.4)", whiteSpace: "nowrap", minWidth: 38, fontFamily: FONT_SANS }}>{row[0]}</div>
              <div style={{ fontFamily: FONT_SERIF, fontSize: 13, color: "rgba(230,218,210,.65)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row[1]}</div>
              <div style={{ fontSize: 11, color: "rgba(160,138,65,.5)", flexShrink: 0 }}>{row[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
