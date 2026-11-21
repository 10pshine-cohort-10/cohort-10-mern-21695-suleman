const fs = require('fs');

const files = ['main_component.js', 'shared-lib.js', 'script_main.js', 'augiA20Il.js'];

files.forEach(file => {
  const p = `d:/NotesFlow/.audit/${file}`;
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    // Search for glsl, fragment, vertex, vec2, vec3, vec4, void main
    const glslMatches = [...content.matchAll(/(?:void\s+main|precision\s+mediump|gl_FragColor|createShader|shaderType|uniform\s+float|vec[234]\b)/g)].map(m => m[0]);
    console.log(`File: ${file}, GLSL keywords found:`, glslMatches.length);
    
    // Check if there are image urls or textures or webgl shaders
    const textures = [...new Set(content.match(/https:\/\/[^"'\s)]+(?:\.png|\.jpg|\.webp|\.svg)/gi))];
    console.log(`File: ${file}, image textures:`, textures);
  }
});
