yarn run dev
rm -rf /home/bgeoadmin/qwc-docker-dev/qwc-docker/volumes/qwc2/dist/*
cp -R /home/bgeoadmin/qwc2-giswater-app/prod/dist/* /home/bgeoadmin/qwc-docker-dev/qwc-docker/volumes/qwc2/dist/
# chown -R 33:33 /home/bgeoadmin/qwc-docker-dev/qwc-docker/volumes/qwc2/assets
