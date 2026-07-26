function hexToRgb(hex) {
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function srgbToLinear(c) {
  c = c / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const [r,g,b] = hexToRgb(hex);
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(hex1, hex2) {
  const L1 = luminance(hex1);
  const L2 = luminance(hex2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

const tokens = {
  lightBg: '#fbf8ff',
  lightText: '#0b0b0b',
  lightSecondary: '#6b7280',
  accent: '#7c3aed',
  darkBg: '#000000',
  darkText: '#ffffff',
  darkSecondary: '#9aa0b4',
  accentDark: '#5b21a9'
};

const tests = [
  { a: 'lightText', b: 'lightBg', purpose: 'body text on background (light)' },
  { a: 'accent', b: 'lightBg', purpose: 'accent text on background (light)' },
  { a: 'darkText', b: 'accent', purpose: 'white text on accent (light sidebar)' },
  { a: 'lightText', b: 'accent', purpose: 'black text on accent (if used)' },

  { a: 'darkText', b: 'darkBg', purpose: 'body text on background (dark)' },
  { a: 'accentDark', b: 'darkBg', purpose: 'accent on dark background' },
  { a: 'darkText', b: 'accentDark', purpose: 'white text on accent (dark sidebar)' },
  { a: 'darkSecondary', b: 'darkBg', purpose: 'secondary on dark bg' },
  { a: 'lightSecondary', b: 'lightBg', purpose: 'secondary on light bg' },
];

console.log('Contrast checks for theme tokens:');
console.log('---------------------------------');

for (const t of tests) {
  const ca = tokens[t.a];
  const cb = tokens[t.b];
  const ratio = contrast(ca, cb);
  const ratioStr = ratio.toFixed(2);
  const passText = ratio >= 4.5 ? 'PASS (>=4.5)' : ratio >= 3 ? 'AA Large (>=3.0)' : 'FAIL';
  console.log(`${t.purpose}: ${t.a} (${ca}) on ${t.b} (${cb}) -> ${ratioStr} : ${passText}`);
}

// Also list computed luminances for debugging
console.log('\nToken luminances:');
for (const k of Object.keys(tokens)) {
  console.log(`${k} (${tokens[k]}): ${luminance(tokens[k]).toFixed(4)}`);
}

// Suggest candidate accentDark colors that meet contrast >= 4.5 against white
const candidates = ['#5b21a9', '#4c1d95', '#4b0082', '#5f259a', '#57238a', '#3b0f5f'];
console.log('\nCandidate accentDark checks (vs white):');
for (const c of candidates) {
  const r = contrast('#ffffff', c);
  console.log(`${c} -> contrast white on ${c}: ${r.toFixed(2)} ${r>=4.5 ? 'OK' : 'TOO LOW'}`);
}
