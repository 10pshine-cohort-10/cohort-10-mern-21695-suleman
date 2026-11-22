const items = require('./all_containers.json');
console.log('=== ITEMS 95-223 ===');
items.slice(95).forEach((item, idx) => {
  console.log(`${idx + 95}: ${item.name} (${item.tag})`);
});
