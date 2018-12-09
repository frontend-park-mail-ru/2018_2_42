FROM nginx:1-alpine

RUN apk update && \
    apk add jq;

# Копируем всю статику проекта: ["/css/*", "/fonts/*", "/images/*", "/js/*", "/index.html"].
COPY './public' '/var/www/html'

# Перезатираем nginx конфиг, заставляя отдавать статические файлы проекта
# и проксировать на сервер авторизации и на сервер игры.
COPY './build/nginx.conf' '/etc/nginx/nginx.conf'

# Перезатираем конфиг, что бы модули .mjs отдавались как javascript файлы.  
COPY './build/mime.types' '/etc/nginx/mime.types'

# Копируем собранный из 'https://github.com/google/zopfli' архиватор
# Он собран только под alpine, так как требует динамически подключаемую стандартную библиотеку,
# не gnu, как в debian based дистрибутивах, а от авторов alpine.
COPY "./build/zopfli_alpine_amd64" '/usr/local/bin/zopfli'

# Генерируем json список файлов, которые будут кешировать service worker'ы в браузере.
# Он доступен по '/js/CachedProjectFiles.json', всегда актуален.
RUN find '/var/www/html' -type f | \
    jq 'sub("\n$"; "") | gsub("/var/www/html/"; "/") | split("\n")' \
        --raw-input --slurp --monochrome-output > \
        '/var/www/html/js/CachedProjectFiles.json';

# Всю статику проекта жмём до 60% и сохраняем рядом *.gz .
RUN find '/var/www/html' -exec '/usr/local/bin/zopfli' -v --i200 {} \;

# Стартуем с коммандой nginx -с '/etc/nginx/nginx.conf' .
