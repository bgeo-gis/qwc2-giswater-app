FROM node:24-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

# Copy dependency manifests first so `yarn install` can be cached
COPY package.json yarn.lock ./
COPY qwc2/package.json qwc2/package.json
COPY qwc2-giswater/package.json qwc2-giswater/package.json
COPY qwc2/scripts/ qwc2/scripts/

# Install dependencies (cached as long as manifests are unchanged)
RUN yarn install --frozen-lockfile

# Copy the rest of the sources only after dependencies are resolved
COPY . .
RUN yarn run prod

# Runtime stage - minimal Alpine
FROM alpine:3.19

RUN apk add --no-cache bash coreutils


WORKDIR /app

COPY --from=builder /app/prod /app/prod

# Deploy script (runs as non-root)
RUN printf '%s\n' \
'#!/usr/bin/env bash' \
'set -e' \
'echo "Limpiando destino..."' \
'rm -rf /target/dist/*' \
'rm -rf /target/assets/css/*' \
'rm -rf /target/translations/*' \
'echo "Copiando build..."' \
'cp -R /app/prod/dist/* /target/dist/' \
'cp -R /app/prod/assets/css/* /target/assets/css/' \
'cp -R /app/prod/translations/* /target/translations/' \
'echo "Deploy completado."' \
> /copy_build.sh && chmod +x /copy_build.sh

ENTRYPOINT ["/copy_build.sh"]
