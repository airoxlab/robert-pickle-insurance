/* Minimal static file server - no dependencies, Node 18+.
   Only needed because some hosts refuse to deploy a project without a
   package.json or Dockerfile. On a real static host (Cloudflare Pages,
   Netlify, GitHub Pages) this file is unused and can be ignored. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(body);
}

http.createServer((req, res) => {
  // Strip the query string, decode, and resolve inside ROOT only.
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';
  if (!path.extname(rel)) rel += '.html';

  const file = path.join(ROOT, path.normalize(rel));
  if (!file.startsWith(ROOT)) return send(res, 403, 'Forbidden');

  fs.readFile(file, (err, data) => {
    if (err) {
      // Unknown path: fall back to the home page rather than a bare 404.
      return fs.readFile(path.join(ROOT, 'index.html'), (e, home) =>
        e ? send(res, 404, 'Not found') : send(res, 404, home, TYPES['.html'])
      );
    }
    send(res, 200, data, TYPES[path.extname(file)] || 'application/octet-stream');
  });
}).listen(PORT, () => console.log('Serving ' + ROOT + ' on port ' + PORT));
