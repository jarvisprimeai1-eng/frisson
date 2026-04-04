export default function Orb({ style = {}, color, opacity = 0.15, w = 200, h = 200, delay = 0 }) {
  return (
    <div style={{
      position: "absolute",
      width: w,
      height: h,
      borderRadius: "50%",
      background: `radial-gradient(circle,${color},transparent 70%)`,
      filter: "blur(70px)",
      opacity,
      animation: `breathe 8s ${delay}s ease-in-out infinite`,
      pointerEvents: "none",
      ...style,
    }} />
  );
}
