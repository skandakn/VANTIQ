// generate-icons.mjs
// Generates PNG icons for the VANTIQ PWA at all required sizes using Canvas API
// Run: node generate-icons.mjs

import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const OUT = join(process.cwd(), 'public', 'icons');

mkdirSync(OUT, { recursive: true });

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size * 0.18; // border radius factor

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, size, size);
  bg.addColorStop(0, '#050914');
  bg.addColorStop(1, '#0a1124');
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, r);
  ctx.fill();

  // Outer glow ring
  const glowGrad = ctx.createRadialGradient(size / 2, size / 2, size * 0.2, size / 2, size / 2, size * 0.55);
  glowGrad.addColorStop(0, 'rgba(6,182,212,0.35)');
  glowGrad.addColorStop(1, 'rgba(6,182,212,0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, r);
  ctx.fill();

  // Inner badge circle
  const circleR = size * 0.35;
  const cx = size / 2, cy = size / 2;
  const circleGrad = ctx.createLinearGradient(cx - circleR, cy - circleR, cx + circleR, cy + circleR);
  circleGrad.addColorStop(0, '#0284c7');
  circleGrad.addColorStop(0.5, '#06b6d4');
  circleGrad.addColorStop(1, '#8b5cf6');
  ctx.fillStyle = circleGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, circleR, 0, Math.PI * 2);
  ctx.fill();

  // Shield icon (simplified path scaled to size)
  const s = size * 0.28;
  const sx = cx - s / 2, sy = cy - s / 2;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(sx + s * 0.5, sy);
  ctx.lineTo(sx + s, sy + s * 0.2);
  ctx.lineTo(sx + s, sy + s * 0.55);
  ctx.quadraticCurveTo(sx + s, sy + s, sx + s * 0.5, sy + s);
  ctx.quadraticCurveTo(sx, sy + s, sx, sy + s * 0.55);
  ctx.lineTo(sx, sy + s * 0.2);
  ctx.closePath();
  ctx.fill();

  // "V" letter for VANTIQ
  ctx.fillStyle = '#06b6d4';
  ctx.font = `900 ${size * 0.18}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('V', cx, cy + size * 0.005);

  return canvas.toBuffer('image/png');
}

SIZES.forEach((size) => {
  const buf = drawIcon(size);
  const path = join(OUT, `icon-${size}.png`);
  writeFileSync(path, buf);
  console.log(`✓ icon-${size}.png`);
});

console.log('All icons generated in public/icons/');
