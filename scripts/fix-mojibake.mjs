// One-shot mojibake fix for Clients.tsx
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'src/pages/Clients.tsx';
const text = readFileSync(path, 'utf8');

const mojibake = '\u00E2\u20AC\u201D'; // a-circumflex, euro, right double quote (3 JS chars)
const emDash = '\u2014';

let count = 0;
let updated = '';
let i = 0;
while (i < text.length) {
  if (text.substring(i, i + 3) === mojibake) {
    updated += emDash;
    i += 3;
    count++;
  } else {
    updated += text[i];
    i++;
  }
}
writeFileSync(path, updated, 'utf8');
console.log(`Replaced ${count} occurrences.`);
