sudo docker pull koretskyhub/front:nginx &&
sudo docker stop frontend
sudo docker run \
    --name 'frontend' \
    --publish 10080:80 \
    --publish 10443:443 \
    --network 'rpsarena-net' \
    --volume '/etc/letsencrypt':'/etc/letsencrypt' \
    --detach \
    --rm koretskyhub/front:nginx
