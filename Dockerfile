FROM hocgin/docker-ssr:0.0.1
ARG DIST_DIR=dist/*
ARG MANIFEST_FILE=dist/manifest.json

COPY ${DIST_DIR} /usr/web/app/public/
COPY ${MANIFEST_FILE} /usr/web/config/manifest.json
