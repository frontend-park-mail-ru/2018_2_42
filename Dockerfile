FROM nginx:alpine

# устанавливаем npm, что бы запустить webpack
RUN apk update && apk add npm;

# Перезатираем nginx конфиг, заставляя отдавать статические файлы проекта
# и проксировать на сервер авторизации и на сервер игры.
COPY './nginx/nginx.conf' '/etc/nginx/nginx.conf'

# Копируем проект для сборки.
COPY '.' '/tmp/project'

# Собираем проект webpack, подкладываем результат сборки nginx.
RUN (cd '/tmp/project' && \
    npm install) && \
    mkdir --parent '/var/www/html/' && \
    mv -v '/tmp/project/dist'/* '/var/www/html/' && \
    rm -rf '/tmp/project';

# Стартуем с коммандой nginx -с '/etc/nginx/nginx.conf'
