yarn run prod
rm -rf /opt/qwc2-docker/qwc-docker/volumes/qwc2/*
cp -R /opt/qwc2-giswater-app/prod/* /opt/qwc2-docker/qwc-docker/volumes/qwc2/
chown -R 33:33 /opt/qwc2-docker/qwc-docker/volumes/qwc2/assets
