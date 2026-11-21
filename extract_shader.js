const fs = require('fs');
const shared = fs.readFileSync('d:/NotesFlow/.audit/shared-lib.js', 'utf8');
const main = fs.readFileSync('d:/NotesFlow/.audit/main_component.js', 'utf8');

// Search for fragment shaders (gl_FragColor)
const shaders = [...shared.matchAll(/(?:precision\s+mediump\s+float;[\s\S]*?gl_FragColor[\s\S]*?\})/g)].map(m => m[0]);
console.log('Shaders found count:', shaders.length);
shaders.forEach((s, idx) => {
  console.log(`\n=== SHADER #${idx + 1} (${s.length} chars) ===\n`, s.slice(0, 400));
  fs.writeFileSync(`d:/NotesFlow/.audit/shader_${idx + 1}.glsl`, s, 'utf8');
});

// Search where Shader component is invoked in main_component.js
const shaderUsage = [...main.matchAll(/data-framer-name="Hero Gradient Shader"[\s\S]{0,800}/g)].map(m => m[0]);
console.log('\n=== SHADER USAGE IN MAIN ===\n');
shaderUsage.forEach(u => console.log(u));
