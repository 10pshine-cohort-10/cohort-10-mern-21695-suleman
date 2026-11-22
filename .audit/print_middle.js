const results = require('./text_styles_extracted.json');
results.slice(41, 65).forEach((r, idx) => {
  console.log(`${idx + 42}. [${r.tag}] "${r.text}" -> size:${r.vars['font-size']}, weight:${r.vars['font-weight']}, color:${r.vars['text-color']}`);
});
