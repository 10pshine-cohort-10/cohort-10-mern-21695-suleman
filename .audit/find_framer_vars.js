const fs = require('fs');
const css = fs.readFileSync('d:/NotesFlow/extracted_styles.css', 'utf8');
const js = fs.readFileSync('d:/NotesFlow/main_component.js', 'utf8');

const cssVars = [...new Set(css.match(/--framer-font-size:\s*[^;]+/g))];
console.log('CSS font-size vars:', cssVars);

const jsVars = [...new Set(js.match(/--framer-font-size[^"';,}]+/g))];
console.log('JS font-size vars:', jsVars);

// Check all --framer- vars in css
const allFramerVars = [...new Set(css.match(/--framer-[a-zA-Z0-9-]+:\s*[^;]+/g))];
console.log('\nAll unique Framer vars in CSS (sample):', allFramerVars.slice(0, 30));
