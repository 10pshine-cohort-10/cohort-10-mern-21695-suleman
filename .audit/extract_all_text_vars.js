const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

// Find all elements with `style="...--framer..."`
const regex = /<([a-z0-9]+)[^>]*style="([^"]*--framer-[^"]*)"[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
const results = [];
while ((m = regex.exec(html)) !== null) {
  const tag = m[1];
  const style = m[2];
  const innerHtml = m[3];
  const text = innerHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (text.length > 0) {
    // Extract CSS variables
    const vars = {};
    const varMatches = [...style.matchAll(/--framer-([a-zA-Z0-9-]+):\s*([^;]+)/g)];
    varMatches.forEach(vm => {
      vars[vm[1]] = vm[2].replace(/&quot;/g, '"');
    });
    results.push({ tag, text, vars });
  }
}

console.log('Total text elements with Framer vars:', results.length);
fs.writeFileSync('d:/NotesFlow/text_styles_extracted.json', JSON.stringify(results, null, 2), 'utf8');

results.forEach((r, idx) => {
  console.log(`${idx + 1}. [${r.tag}] "${r.text.slice(0, 50)}" -> size:${r.vars['font-size']}, weight:${r.vars['font-weight']}, color:${r.vars['text-color']}, tracking:${r.vars['letter-spacing']}, lineH:${r.vars['line-height']}`);
});
