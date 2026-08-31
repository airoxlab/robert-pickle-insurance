# Static site on nginx. Used by hosts that build from a Dockerfile.
FROM nginx:alpine
COPY . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/package.json \
          /usr/share/nginx/html/server.js \
          /usr/share/nginx/html/README.md
EXPOSE 80
