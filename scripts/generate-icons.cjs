// Generate App Store icon (1024x1024) and splash (2732x2732)
// Uses a simple canvas approach — run: node scripts/generate-icons.js

const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

function generateIcon(size, outPath) {
  const c = createCanvas(size, size);
  const ctx = c.getContext("2d");

  // Background: deep wine-purple gradient
  const bg = ctx.createLinearGradient(0, 0, size, size);
  bg.addColorStop(0, "#1a0418");
  bg.addColorStop(0.5, "#2a0a14");
  bg.addColorStop(1, "#0a0820");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  // Subtle radial glow in center
  const glow = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size * 0.45);
  glow.addColorStop(0, "rgba(230,77,168,0.3)");
  glow.addColorStop(0.5, "rgba(159,123,216,0.15)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  // Orbiting particles (decorative dots in a spiral)
  const cx = size / 2, cy = size / 2;
  for (let i = 0; i < 120; i++) {
    const angle = (i / 120) * Math.PI * 6;
    const r = (i / 120) * size * 0.32 + size * 0.05;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    const dotSize = (1 - i / 120) * size * 0.012 + size * 0.003;
    const alpha = (1 - i / 120) * 0.8 + 0.1;
    const hue = 300 + (i / 120) * 60; // magenta → purple shift
    ctx.beginPath();
    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 70%, 65%, ${alpha})`;
    ctx.fill();
  }

  // Central "F" letter
  const fontSize = size * 0.38;
  ctx.font = `300 ${fontSize}px "Georgia", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Text glow
  ctx.shadowColor = "rgba(230,77,168,0.6)";
  ctx.shadowBlur = size * 0.06;
  ctx.fillStyle = "#fff";
  ctx.fillText("F", cx, cy + size * 0.02);

  // Reset shadow and add subtle subtitle
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  const subSize = size * 0.055;
  ctx.font = `400 ${subSize}px "Arial", sans-serif`;
  ctx.fillStyle = "rgba(240,210,178,0.5)";
  ctx.letterSpacing = `${size * 0.015}px`;
  ctx.fillText("FRISSON", cx, cy + fontSize * 0.42);

  const buf = c.toBuffer("image/png");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  console.log(`Generated: ${outPath} (${size}x${size})`);
}

function generateSplash(w, h, outPath) {
  const c = createCanvas(w, h);
  const ctx = c.getContext("2d");

  // Background matching app
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#0a0820");
  bg.addColorStop(0.5, "#1a0418");
  bg.addColorStop(1, "#060208");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Central glow
  const glow = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, Math.min(w, h) * 0.35);
  glow.addColorStop(0, "rgba(159,123,216,0.2)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // "F" in center
  const fontSize = Math.min(w, h) * 0.15;
  ctx.font = `300 ${fontSize}px "Georgia", serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(230,77,168,0.5)";
  ctx.shadowBlur = 30;
  ctx.fillStyle = "#fff";
  ctx.fillText("F", w / 2, h / 2);

  const buf = c.toBuffer("image/png");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  console.log(`Generated: ${outPath} (${w}x${h})`);
}

// Capacitor asset sources
generateIcon(1024, "resources/icon.png");
generateSplash(2732, 2732, "resources/splash.png");

// Also generate dark splash variant
generateSplash(2732, 2732, "resources/splash-dark.png");

console.log("\nDone! Now run: npx capacitor-assets generate");
