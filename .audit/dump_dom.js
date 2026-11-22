const fs = require('fs');
const html = fs.readFileSync('d:/NotesFlow/framer_page.html', 'utf8');

// Let's find the main content inside <div id="main"> or the root framer container
// Framer renders inside body
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (!bodyMatch) {
  console.log('No body found');
  process.exit();
}

const bodyContent = bodyMatch[1];
console.log('Body length:', bodyContent.length);

// Let's find all elements with text or roles or sections
// Let's write out the HTML with pretty indentation or extract the structure
fs.writeFileSync('d:/NotesFlow/body_clean.html', bodyContent, 'utf8');
console.log('Saved body_clean.html');
