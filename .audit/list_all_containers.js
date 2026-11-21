const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

const containerRegex = /<([a-z0-9]+)[^>]*data-framer-name="([^"]*)"([^>]*)>/g;
let cm;
const items = [];
while ((cm = containerRegex.exec(html)) !== null) {
  const tag = cm[1];
  const name = cm[2];
  const attrs = cm[3];
  
  // Extract style if present
  const styleMatch = attrs.match(/style="([^"]*)"/);
  const classMatch = attrs.match(/class="([^"]*)"/);
  
  items.push({
    tag,
    name,
    className: classMatch ? classMatch[1] : '',
    style: styleMatch ? styleMatch[1] : ''
  });
}

console.log('Total identified containers:', items.length);
fs.writeFileSync('d:/NotesFlow/all_containers.json', JSON.stringify(items, null, 2), 'utf8');

// Let's print out all unique names
console.log(items.map(i => i.name));
