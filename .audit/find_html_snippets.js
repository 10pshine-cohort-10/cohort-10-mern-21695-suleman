const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

// Find all elements containing text like "Your thoughts", "Capture", etc.
const phrases = [
  'YOUR PERSONAL DIGITAL NOTEBOOK',
  'Your thoughts.',
  'Beautifully organized.',
  'A calm, intelligent space',
  'Machine Learning Revision',
  'Project Ideas',
  'Weekend Plans',
  'Things to Remember',
  '48 notes synced',
  'Instant capture',
  'Every thought',
  'From scattered ideas',
  'A personal workspace built to think in.',
  'Make space for your next idea.'
];

phrases.forEach(p => {
  const idx = html.indexOf(p);
  if (idx !== -1) {
    const start = Math.max(0, idx - 150);
    const end = Math.min(html.length, idx + p.length + 150);
    console.log(`\n=== FOUND "${p}" ===`);
    console.log(html.substring(start, end));
  } else {
    console.log(`\n=== NOT FOUND: "${p}" ===`);
  }
});
