/* Bundles the site into one self-contained HTML file for publishing as an
   Artifact. The Artifact host supplies <!doctype>, <html>, <head> and <body>,
   so this emits page content only. The webfont host is not on the Artifact CSP
   allowlist, so the link is dropped and the Helvetica fallback stack applies. */

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const read = f => fs.readFileSync(path.join(dir, f), 'utf8');

const html = read('index.html');
const css = read('styles.css');
const data = read('data.js');
const app = read('app.js');

// body inner markup from index.html
const body = html.split('<body>')[1].split('</body>')[0]
  .replace(/\s*<script src="[^"]+"><\/script>/g, '')
  .trim();

const out = `<title>Venta Normandía 301</title>
<style>
${css}
</style>

${body}

<script>
${data}
</script>
<script>
${app}
</script>
`;

fs.writeFileSync(path.join(dir, 'dist', 'artifact.html'), out);
console.log('dist/artifact.html  ' + (out.length / 1024).toFixed(1) + ' KB');
