yarn run dev
rm -rf /home/bgeoadmin/qwc-docker-dev/qwc-docker/volumes/qwc2/*
cp -R /home/bgeoadmin/qwc2-giswater-app/prod/* /home/bgeoadmin/qwc-docker-dev/qwc-docker/volumes/qwc2/
chown -R 33:33 /home/bgeoadmin/qwc-docker-dev/qwc-docker/volumes/qwc2/assets
