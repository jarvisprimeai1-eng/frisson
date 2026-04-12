export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Plus+Jakarta+Sans:wght@200;300;400;500&display=swap');

      *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
      html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}
      body{background:#060208;overflow:hidden}
      ::-webkit-scrollbar{display:none}

      :root{
        --vh:1dvh;
        --txt:242,232,226;
        --txt-inv:20,16,12;
        --orb-bg:6,2,8;
      }

      /* ─── Animations (kept minimal) ─── */
      @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes breathe{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.06);opacity:1}}
      @keyframes driftY{0%{transform:translate(0,0)}50%{transform:translate(4px,-8px)}100%{transform:translate(0,0)}}
      @keyframes screenFade{from{opacity:0}to{opacity:1}}
      @keyframes shimmer{0%,100%{opacity:.12}50%{opacity:.4}}
      @keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-36px) scale(1.1)}}
      @keyframes gemGlow{0%,100%{text-shadow:0 0 6px currentColor}50%{text-shadow:0 0 14px currentColor,0 0 28px currentColor}}
      @keyframes moonHalo{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.25);opacity:.5}}
      @keyframes pulseGlow{0%,100%{box-shadow:0 0 4px var(--glow-color,rgba(176,32,160,.25))}50%{box-shadow:0 0 12px var(--glow-color,rgba(176,32,160,.4))}}

      /* ─── Staggered fade-in classes ─── */
      .fu1{animation:fadeUp .4s .05s ease both}
      .fu2{animation:fadeUp .4s .1s ease both}
      .fu3{animation:fadeUp .4s .15s ease both}
      .fu4{animation:fadeUp .4s .2s ease both}
      .fu5{animation:fadeUp .4s .25s ease both}

      /* ─── Interaction utilities ─── */
      .pc{transition:transform .15s cubic-bezier(.2,.8,.4,1)}.pc:active{transform:scale(.96)}
      .press-card{transition:transform .15s cubic-bezier(.2,.8,.4,1)}.press-card:active{transform:scale(.97)}

      /* ─── Applied animation classes ─── */
      .screen-in{animation:screenFade .3s ease both}
      .moon-halo{animation:moonHalo 4s ease-in-out infinite}
      .ambient-dot{animation:driftY 10s ease-in-out infinite}
      .pulse-glow{animation:pulseGlow 3s ease-in-out infinite}
    `}</style>
  );
}
