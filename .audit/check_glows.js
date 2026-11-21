const styles = require('./container_styles_map.json');
const keys = Object.keys(styles).filter(k => 
  k.includes('Glow') || 
  k.includes('Shader') || 
  k.includes('Fade') ||
  k.includes('Divider')
);

keys.forEach(k => {
  console.log(`[${k}]: ${styles[k].join(' | ')}`);
});
