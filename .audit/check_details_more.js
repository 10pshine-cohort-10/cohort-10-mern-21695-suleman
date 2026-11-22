const styles = require('./container_styles_map.json');
const keys = Object.keys(styles).filter(k => 
  k.includes('Note 4') || 
  k.includes('Floating Tag') || 
  k.includes('Floating Cursor') ||
  k.includes('Capture') ||
  k.includes('Feature Card') ||
  k.includes('Organize') ||
  k.includes('Section — Product Preview') ||
  k.includes('Section — Final CTA')
);

keys.forEach(k => {
  console.log(`[${k}]: ${styles[k].join(' | ')}`);
});
