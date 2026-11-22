const items = require('./all_containers.json');
items.filter(i => i.name.includes('Note')).forEach(i => {
  console.log(i.name);
});
