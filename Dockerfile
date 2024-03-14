FROM node:18-alpine as builder
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/next.config.mjs ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
# COPY --from=builder /usr/src/app/.next/standalone ./
# COPY --from=builder /usr/src/app/.next/static ./.next/static

EXPOSE 3000

ENTRYPOINT ["npm", "run","start"]
# ENTRYPOINT ["node","server.js"]
