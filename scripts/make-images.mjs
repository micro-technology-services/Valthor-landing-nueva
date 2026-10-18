// Generates the static images in public/: share image (Open Graph), favicon,
// Apple touch icon and the logo used in the Organization JSON-LD.
// Usage: node scripts/make-images.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const icon = 'src/assets/brand/valthor-icon.png';
const full = 'src/assets/brand/valthor-full.png';
mkdirSync('public/og', { recursive: true });

const bg = (w, h) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <radialGradient id="a" cx="0.72" cy="-0.05" r="0.9"><stop offset="0" stop-color="#8B5CF6" stop-opacity=".45"/><stop offset=".6" stop-color="#8B5CF6" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="0.1" cy="0.4" r="0.6"><stop offset="0" stop-color="#D946EF" stop-opacity=".22"/><stop offset="1" stop-color="#D946EF" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0E0A1A"/><rect width="100%" height="100%" fill="url(#a)"/><rect width="100%" height="100%" fill="url(#b)"/>
</svg>`);

// 1200x630 share image
const logo = await sharp(full).resize({ width: 380 }).toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#A78BFA"/><stop offset="1" stop-color="#E879F9"/></linearGradient></defs>
  <text x="560" y="250" font-family="Inter Display, Inter, sans-serif" font-weight="700" font-size="54" fill="#fff">Tu equipo comercial</text>
  <text x="560" y="315" font-family="Inter Display, Inter, sans-serif" font-weight="700" font-size="54" fill="#fff">con IA en WhatsApp</text>
  <text x="560" y="390" font-family="Inter, sans-serif" font-weight="600" font-size="30" fill="url(#g)">Atiende, vende, cobra y agenda.</text>
  <text x="560" y="470" font-family="Inter, sans-serif" font-weight="500" font-size="22" letter-spacing="3" fill="#C4B5FD">VALTHOR.APP · MTS GROUP</text>
</svg>`);
await sharp(bg(1200, 630))
  .composite([
    { input: logo, left: 110, top: Math.round((630 - (380 * 762) / 1226) / 2) },
    { input: text, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og/valthor.png');

// Square icons on the dark brand background
for (const [size, out, pad] of [
  [64, 'public/favicon.png', 6],
  [180, 'public/apple-touch-icon.png', 26],
  [512, 'public/valthor-logo.png', 70],
]) {
  const mark = await sharp(icon).resize({ height: size - pad * 2, width: size - pad * 2, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp(bg(size, size)).composite([{ input: mark, gravity: 'center' }]).png().toFile(out);
}
console.log('Images written to public/');
