const styles = require('./container_styles_map.json');
Object.keys(styles).filter(k => k.includes('Mini') || k.includes('Line') || k.includes('Dot')).forEach(k => {
  console.log(`[${k}]: ${styles[k].join(' | ')}`);
});
