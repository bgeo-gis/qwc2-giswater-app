FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Build
RUN yarn run prod

FROM alpine:3.19

RUN apk add --no-cache bash coreutils

WORKDIR /app

COPY --from=builder /app/prod /app/prod

# copy script
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