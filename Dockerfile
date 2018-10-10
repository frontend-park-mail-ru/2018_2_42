FROM nginx:1-alpine

COPY './public' '/var/www/html'
COPY './nginx/nginx.conf' '/etc/nginx/nginx.conf'
COPY './nginx/mime.types' '/etc/nginx/mime.types'
# И тартует с коммандой nginx -с '/etc/nginx/nginx.conf' ;
