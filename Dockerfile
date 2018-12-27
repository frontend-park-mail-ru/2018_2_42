FROM nginx:alpine

# Перезатираем nginx конфиг, заставляя отдавать статические файлы проекта
# и проксировать на сервер авторизации и на сервер игры.
COPY './nginx/nginx.conf' '/etc/nginx/nginx.conf'

# Копируем проект для сборки.
COPY './dist'  '/var/www/html/'

# Собираем проект webpack, подкладываем результат сборки nginx.
# RUN cd '/tmp/project' && \
#     mkdir --parent '/var/www/html/' && \
#     mv -v '/tmp/project/dist'/* '/var/www/html/' && \
#     mv -v '/tmp/project/images/' '/var/www/html/' && \
#     rm -rf '/tmp/project';

# Стартуем с коммандой nginx -с '/etc/nginx/nginx.conf'
