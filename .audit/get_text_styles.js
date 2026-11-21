const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

const regex = /<([a-z0-9]+)[^>]*class="[^"]*framer-text[^"]*"[^>]*style="([^"]*)"[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
const texts = [];
while ((m = regex.exec(html)) !== null) {
  const tag = m[1];
  const style = m[2];
  const content = m[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (content.length > 0 && content.length < 200) {
    texts.push({ tag, content, style });
  }
}

console.log('Found styled texts:', texts.length);
texts.slice(0, 30).forEach(t => {
  // Extract key CSS vars from style
  const vars = t.style.match(/--(?:font-size|font-weight|letter-spacing|line-height|text-color|framer-text-color):[^;]+/g);
  console.log(`[${t.tag}] "${t.content}" -> ${vars ? vars.join(', ') : t.style.slice(0, 100)}`);
});
