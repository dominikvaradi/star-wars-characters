FROM node:20.11-alpine3.18 as base

FROM base as deps

RUN apk add --no-cache libc6-compat
WORKDIR /opt

COPY package.json package-lock.json ./

RUN npm ci

FROM base as builder

WORKDIR /opt

COPY --from=deps /opt/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_SWAPI_BASE_URL=${NEXT_PUBLIC_SWAPI_BASE_URL}
ENV NEXT_PUBLIC_SWAPI_BASE_URL=${NEXT_PUBLIC_SWAPI_BASE_URL}

ARG NEXT_PUBLIC_STAR_WARS_ASSETS_BASE_URL=${NEXT_PUBLIC_STAR_WARS_ASSETS_BASE_URL}
ENV NEXT_PUBLIC_STAR_WARS_ASSETS_BASE_URL=${NEXT_PUBLIC_STAR_WARS_ASSETS_BASE_URL}

RUN npm run build

FROM base as runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /opt/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /opt/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /opt/.next/static ./.next/static

USER nextjs

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

EXPOSE 3000

CMD ["node", "server.js"]
