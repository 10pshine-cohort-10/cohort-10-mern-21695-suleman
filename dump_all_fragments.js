const fs = require('fs');
const shared = fs.readFileSync('d:/NotesFlow/.audit/shared-lib.js', 'utf8');

// Find all fragment: `...`
const fragments = [...shared.matchAll(/fragment:\s*`([\s\S]*?)`/g)].map(m => m[1]);
console.log('Total fragment shaders found:', fragments.length);

fragments.forEach((f, idx) => {
  console.log(`\n=== FRAGMENT SHADER #${idx + 1} (${f.length} chars) ===`);
  console.log(f.slice(0, 300));
  fs.writeFileSync(`d:/NotesFlow/.audit/shader_frag_${idx + 1}.glsl`, f, 'utf8');
});
