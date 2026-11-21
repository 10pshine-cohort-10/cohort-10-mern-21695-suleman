const styles = require('./container_styles_map.json');
Object.keys(styles).filter(k => k.includes('Note â€” Machine') || k.includes('Note Card') || k.includes('Note Tag')).forEach(k => {
  console.log(`[${k}]: ${styles[k].join(' | ')}`);
});
