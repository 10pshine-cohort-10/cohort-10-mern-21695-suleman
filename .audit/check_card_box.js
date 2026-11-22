const items = require('./all_containers.json');
const styles = require('./container_styles_map.json');

const appNote = items.find(i => i.name.includes('Machine Learning Revision') && i.name.startsWith('Note â€”'));
console.log('App note item:', appNote);
if (appNote) {
  console.log('Styles:', styles[appNote.name]);
}
