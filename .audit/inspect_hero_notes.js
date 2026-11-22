const fs = require('fs');
const styles = require('./container_styles_map.json');

const targets = [
  'Hero Section',
  'Hero Left',
  'Hero Label Wrapper',
  'Hero Headline',
  'Hero Subtitle',
  'Primary CTA',
  'Secondary CTA',
  'Hero Right — Notes Scene',
  'Main Note',
  'Note 2',
  'Note 3',
  'Note 4 — Small',
  'Floating Tag',
  'Floating Cursor',
  'Trusted Strip',
  'Ticker Inner',
  'Section — Capture',
  'Feature Cards',
  'Section — Organize',
  'Organize Visual',
  'Organize Text',
  'App Shell',
  'App Sidebar',
  'App Main',
  'Notes Grid',
  'Section — Final CTA',
  'Footer'
];

targets.forEach(t => {
  // Find key that matches or includes t
  const found = Object.keys(styles).filter(k => k.includes(t) || t.includes(k));
  console.log(`\n================== ${t} ==================`);
  found.forEach(k => {
    console.log(`[${k}]:`, styles[k].join(' | '));
  });
});
