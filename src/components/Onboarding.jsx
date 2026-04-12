import { useState } from "react";
import { PERSONAL_CONTENT } from "../data/content";
import { FONT_SERIF, FONT_SANS, TYPE, SP, RAD, OP, EASE, tx, label, body, heading } from "../utils/design";
import { VERSION } from "../App";

export default function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [agreed, setAgreed] = useState(false);

  const steps = [
    { type: "splash" },
    { type: "info", ey: "женский капитал", hl: "Это то,\nиз чего\nвы живёте", body: "То, как вы любите, выбираете,\nчувствуете и создаёте реальность" },
    { type: "info", ey: "когда он растёт", hl: "Меняется\nне состояние.\nМеняется жизнь", body: "Отношения. Опора. Способность\nпринимать и создавать свою норму" },
    { type: "info", ey: "для чего Frisson", hl: "Укреплять\nкапитал\nкаждый день", body: "Медитации, практики, дневник\nи трекинг состояния", tags: ["Опору", "Спокойствие", "Наполненность", "Женственность", "Силу", "Выход из тревоги"] },
    { type: "info", ey: "добро пожаловать", hl: "Ваше внутреннее\nстановится\nосновой\nновой жизни", body: "Создано Магистром Клинической Психологии\nАнастасией Званок" },
    { type: "q", q: "Как ты себя чувствуешь прямо сейчас?", opts: ["Я устала — нужна тишина и восполнение", "Я ищу себя и хочу вспомнить свою силу", "Я в тревоге — хочу обрести покой", "Я готова расцветать и идти дальше"], key: "f" },
    { type: "q", q: "Что привело тебя сюда?", opts: ["Хочу лучше понять себя и свои желания", "Хочу восстановить энергию и ресурс", "Хочу почувствовать свою ценность", "Хочу раскрыть свою женственность и притяжение"], key: "r" },
    { type: "personal" },
    { type: "consent" },
  ];

  const cur = steps[step];
  const isLast = step === steps.length - 1;
  const canNext = (cur.type !== "q" || (cur.key && ans[cur.key])) && (cur.type !== "consent" || agreed);

  return (
    <div style={{ width: "100%", height: "100dvh", background: "linear-gradient(165deg, #1a0418 0%, #2a1408 50%, #0c0820 100%)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: "78%", height: "78%", top: "-18%", left: "-18%", borderRadius: "50%", background: "radial-gradient(circle,rgba(230,77,168,.8),rgba(159,123,216,.5) 55%,transparent 72%)", filter: "blur(55px)", animation: "breathe 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "65%", height: "65%", bottom: "-12%", right: "-10%", borderRadius: "50%", background: "radial-gradient(circle,rgba(240,136,56,.7),rgba(208,128,176,.5) 55%,transparent 72%)", filter: "blur(50px)", animation: "breathe 22s 4s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: "40%", height: "40%", top: "28%", left: "32%", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,175,50,.55),rgba(159,123,216,.3) 55%,transparent 72%)", filter: "blur(44px)", animation: "breathe 14s 7s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 45%,transparent 18%,rgba(8,4,16,.78) 100%)" }} />
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            width: 0.8,
            height: 0.8,
            borderRadius: "50%",
            background: `rgba(255,255,255,${0.1 + 0.18 * (i % 5) / 5})`,
            animation: `shimmer ${3 + i % 5}s ${i % 7}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: `40px ${SP.xxl - 4}px 0`, position: "relative", zIndex: 2 }}>
        {step > 0 && (
          <div style={{ display: "flex", gap: 6, marginBottom: 36, animation: "fadeUp .3s ease both" }}>
            {steps.slice(1).map((_, i) => (
              <div key={i} style={{ height: SP.xs, borderRadius: 2, transition: EASE.slow, width: step - 1 === i ? SP.xxl - 4 : SP.xs, background: step - 1 === i ? "rgba(180,150,165,.8)" : `rgba(255,255,255,${OP.disabled})` }} />
            ))}
          </div>
        )}

        {cur.type === "splash" && (
          <div style={{ textAlign: "center", width: "100%", animation: "fadeUp 1s ease both" }}>
            <div style={{ ...label(TYPE.xs), color: "rgba(180,150,165,.5)", letterSpacing: ".35em", marginBottom: SP.xxl - 4 }}>✦ пространство состояния ✦</div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 80, fontWeight: 300, lineHeight: 0.9, color: "#fff", textShadow: "0 0 60px rgba(230,77,168,.75), 0 0 100px rgba(240,136,56,.4)", marginBottom: SP.lg + 2 }}>Frisson</div>
            <div style={{ ...body(TYPE.lg), color: `rgba(220,205,215,${OP.secondary})`, letterSpacing: ".04em", marginBottom: SP.md }}>пространство, где вы раскрываете<br/>свой женский внутренний капитал</div>
            <div style={{ ...label(TYPE.xs), color: `rgba(180,150,165,${OP.tertiary})`, letterSpacing: ".14em", marginBottom: SP.xxl - 4 }}>v{VERSION}</div>
          </div>
        )}

        {cur.type === "info" && (
          <div style={{ textAlign: "center", width: "100%", animation: "fadeUp .45s ease both" }}>
            <div style={{ ...label(TYPE.xs), color: "rgba(180,150,165,.45)", letterSpacing: ".32em", marginBottom: SP.xxl - 4 }}>{cur.ey}</div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 46, fontWeight: 300, lineHeight: 1.08, color: `rgba(245,235,230,${OP.primary})`, letterSpacing: ".01em", marginBottom: 26, whiteSpace: "pre-line" }}>{cur.hl}</div>
            <div style={{ fontFamily: FONT_SANS, fontSize: TYPE.sm + 1, fontWeight: 300, lineHeight: 1.85, color: `rgba(215,200,210,${OP.secondary})`, maxWidth: 270, margin: "0 auto", whiteSpace: "pre-line", marginBottom: cur.tags ? SP.xl : 0 }}>{cur.body}</div>
            {cur.tags && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", maxWidth: 280, margin: "0 auto" }}>
                {cur.tags.map((w) => (
                  <div key={w} style={{ padding: `5px ${SP.md + 1}px`, borderRadius: RAD.lg, background: "rgba(92,14,28,.25)", border: "1px solid rgba(150,80,100,.25)", fontFamily: FONT_SANS, fontSize: TYPE.sm - 1, fontWeight: 300, color: "rgba(220,200,210,.7)" }}>{w}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {cur.type === "q" && (
          <div style={{ width: "100%", animation: "fadeUp .5s ease both" }}>
            <div style={{ ...heading(TYPE.xl + 2), color: `rgba(240,232,235,${OP.primary})`, textAlign: "center", lineHeight: 1.5, marginBottom: SP.xxl }}>{cur.q}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {cur.opts.map((opt, oi) => (
                <div key={opt} onClick={() => setAns((a) => ({ ...a, [cur.key]: opt }))} style={{
                  padding: `${SP.lg - 1}px ${SP.page}px`, borderRadius: RAD.md + 2, textAlign: "center", cursor: "pointer",
                  background: ans[cur.key] === opt ? "rgba(92,14,28,.3)" : "rgba(0,0,0,.25)",
                  border: `1px solid ${ans[cur.key] === opt ? "rgba(200,160,180,.45)" : "rgba(255,255,255,.1)"}`,
                  fontFamily: FONT_SANS, fontSize: TYPE.base, fontWeight: 300,
                  color: ans[cur.key] === opt ? "#fff" : "rgba(255,235,225,.72)",
                  transition: EASE.normal, animation: `fadeUp .4s ${oi * 0.08}s ease both`,
                }}>{opt}</div>
              ))}
            </div>
          </div>
        )}

        {cur.type === "personal" && ans.r && PERSONAL_CONTENT[ans.r] && (() => {
          const c = PERSONAL_CONTENT[ans.r];
          return (
            <div style={{ width: "100%", animation: "fadeUp .6s ease both" }}>
              <div style={{ ...label(TYPE.xs), color: `rgba(180,150,165,${OP.secondary})`, letterSpacing: ".28em", textAlign: "center", marginBottom: SP.xl - 2 }}>только для тебя</div>
              {[{ l: "я слышу тебя", t: c.v }, { l: "что изменится", t: c.s }, { l: "от анастасии", t: c.a }].map((x) => (
                <div key={x.l} style={{ padding: SP.lg + 2, background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,230,215,.15)", backdropFilter: "blur(14px)", borderRadius: RAD.lg - 2, marginBottom: SP.sm + 2 }}>
                  <div style={{ ...label(TYPE.xs), color: "rgba(181,200,212,.65)", letterSpacing: ".2em", marginBottom: SP.sm }}>{x.l}</div>
                  <div style={{ ...body(TYPE.base + 1), color: "rgba(255,238,228,.88)" }}>{x.t}</div>
                </div>
              ))}
              <div style={{ padding: SP.lg, background: "rgba(0,0,0,.2)", border: "1px solid rgba(255,230,215,.1)", backdropFilter: "blur(10px)", borderRadius: RAD.md + 2 }}>
                <div style={{ ...label(TYPE.xs), color: "rgba(181,200,212,.65)", letterSpacing: ".2em", marginBottom: SP.sm + 2 }}>с чего начать</div>
                {c.p.map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: SP.sm + 2, marginBottom: SP.sm, paddingBottom: SP.sm, borderBottom: `1px solid rgba(255,255,255,${OP.bgSubtle})` }}>
                    <div style={{ width: SP.xs, height: SP.xs, borderRadius: RAD.full, background: "rgba(200,160,180,.6)", flexShrink: 0 }} />
                    <div style={{ ...body(TYPE.base), color: "rgba(255,235,225,.88)" }}>{p}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {cur.type === "consent" && (
          <div style={{ width: "100%", animation: "fadeUp .6s ease both" }}>
            <div style={{ ...label(TYPE.xs), color: "rgba(180,150,165,.5)", letterSpacing: ".3em", textAlign: "center", marginBottom: SP.xxl - 4 }}>последний шаг</div>
            <div style={{ ...heading(TYPE.xxl + 4), color: `rgba(245,235,230,${OP.primary})`, textAlign: "center", marginBottom: SP.xxl - 4 }}>Frisson</div>
            {[
              "Сервис Frisson — образовательная платформа. Не является медицинским учреждением и не заменяет работу с лицензированным специалистом.",
              "Обработка данных осуществляется согласно Регламенту ЕС 2016/679 (GDPR). Данные хранятся на защищённых серверах в пределах ЕС.",
              "Записи дневника и результаты тестов доступны исключительно вам. Не используются в коммерческих целях без вашего согласия.",
              "Вы вправе в любой момент запросить выгрузку, исправление или удаление своих данных согласно ст. 17 GDPR.",
            ].map((txt, i) => (
              <div key={i} style={{ display: "flex", gap: SP.md, padding: `${SP.md + 1}px ${SP.lg}px`, background: "rgba(0,0,0,.25)", border: "1px solid rgba(255,255,255,.08)", borderRadius: RAD.md, marginBottom: SP.sm + 2 }}>
                <div style={{ fontFamily: FONT_SERIF, fontSize: SP.lg, color: "rgba(200,160,180,.5)", flexShrink: 0, lineHeight: 1.4 }}>◦</div>
                <div style={{ fontFamily: FONT_SANS, fontSize: TYPE.sm + 1, fontWeight: 300, color: "rgba(220,205,215,.72)", lineHeight: 1.65 }}>{txt}</div>
              </div>
            ))}
            <div onClick={() => setAgreed((a) => !a)} style={{ display: "flex", alignItems: "flex-start", gap: SP.md + 2, padding: `${SP.lg}px ${SP.lg + 2}px`, background: agreed ? "rgba(92,14,28,.25)" : "rgba(0,0,0,.2)", border: `1px solid ${agreed ? "rgba(200,160,180,.4)" : "rgba(255,255,255,.1)"}`, borderRadius: RAD.md + 2, cursor: "pointer", transition: EASE.normal, marginTop: SP.sm }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `1.5px solid ${agreed ? "rgba(200,160,180,.7)" : "rgba(255,255,255,.25)"}`, background: agreed ? "rgba(92,14,28,.4)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: EASE.normal }}>{agreed && <div style={{ fontSize: TYPE.sm, color: "rgba(230,210,220,.9)" }}>✓</div>}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: TYPE.sm + 1, fontWeight: 300, lineHeight: 1.65, color: "rgba(220,205,215,.8)" }}>Я ознакомилась и принимаю <span style={{ color: "rgba(200,160,180,.85)", textDecoration: "underline" }}>Пользовательское соглашение</span> и <span style={{ color: "rgba(200,160,180,.85)", textDecoration: "underline" }}>Политику конфиденциальности</span>. Мне исполнилось 18 лет.</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: `${SP.lg}px ${SP.xxl - 4}px`, paddingBottom: `max(${SP.xl}px, env(safe-area-inset-bottom, ${SP.xl}px))`, position: "relative", zIndex: 2, flexShrink: 0 }}>
        <div onClick={() => canNext && (isLast ? onDone() : setStep((s) => s + 1))} style={{
          width: "100%", padding: SP.lg, borderRadius: RAD.xxl || 28, textAlign: "center",
          cursor: canNext ? "pointer" : "default",
          background: canNext ? "linear-gradient(135deg, rgba(230,77,168,.6), rgba(240,136,56,.5))" : "rgba(255,255,255,.03)",
          border: `1.5px solid ${canNext ? "rgba(240,136,56,.7)" : "rgba(255,255,255,.07)"}`,
          backdropFilter: "blur(16px)",
          boxShadow: canNext ? "0 0 32px rgba(230,77,168,.45), 0 0 60px rgba(240,136,56,.25)" : "none",
          ...label(TYPE.xs), fontWeight: 400, letterSpacing: ".28em",
          color: canNext ? "rgba(245,228,233,.96)" : `rgba(230,218,225,${OP.disabled})`,
          opacity: canNext ? 1 : 0.4, transition: EASE.normal,
        }}>{isLast ? "Войти в своё пространство →" : cur.type === "splash" ? "Войти →" : "Дальше →"}</div>
      </div>
    </div>
  );
}
