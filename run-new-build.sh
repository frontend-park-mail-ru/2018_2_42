sudo docker pull koretskyhub/front:nginx &&
sudo docker stop frontend
sudo docker run \
    --name 'frontend' \
    --publish 10080:80 \
    --publish 100443:443 \
    --network 'rpsarena-net' \
    --volume '/etc/letsencrypt':'/etc/letsencrypt' \
    --volume '/home/ubuntu/presentation':'/var/www/presentation' \
    --detach \
    --rm koretskyhub/front:nginx