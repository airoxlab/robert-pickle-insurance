# Static site on nginx. Used by hosts that build from a Dockerfile (Railway, Fly, Render).
FROM nginx:alpine

COPY . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/package.json \
          /usr/share/nginx/html/server.js \
          /usr/share/nginx/html/vercel.json \
          /usr/share/nginx/html/README.md

# Hosts inject the port at runtime ($PORT), so the listen directive is
# templated at container start rather than baked in. Falls back to 8080.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
ENV PORT=3000
EXPOSE 3000

CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
