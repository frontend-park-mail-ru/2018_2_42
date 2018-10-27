FROM nginx:1-alpine

# Копируем всю статику проекта: ["/css/*", "/fonts/*", "/images/*", "/js/*", "/index.html"].
COPY './public' '/var/www/html'

# Перезатираем nginx конфиг, заставляя отдавать статические файлы проекта
# и проксировать на сервер авторизации и на сервер игры.
COPY './nginx/nginx.conf' '/etc/nginx/nginx.conf'

# Перезатираем конфиг, что бы модули .mjs отдавались как javascript файлы.  
COPY './nginx/mime.types' '/etc/nginx/mime.types'

# Генерируем json список файлов, которые будут кешировать service worker'ы в браузере.
# Он доступен по '/js/CachedProjectFiles.json', всегда актуален.
RUN apk update && \
    apk add jq && \
    find '/var/www/html' -type f | \
    jq 'sub("\n$"; "") | gsub("/var/www/html/"; "/") | split("\n")' \
        --raw-input --slurp --monochrome-output > \
        '/var/www/html/js/CachedProjectFiles.json';

# Стартуем с коммандой nginx -с '/etc/nginx/nginx.conf' .

