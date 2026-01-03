# Serve the exported web game from `www/` using nginx
FROM nginx:stable-alpine

# Copy static site into nginx html folder
COPY www /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
