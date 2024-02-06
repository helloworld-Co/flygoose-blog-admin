FROM node:18.19-alpine3.18 as builder

COPY . /hellworld-blog

WORKDIR /hellworld-blog

RUN npm install -g pnpm --registry=https://registry.npm.taobao.org

RUN pnpm install --no-frozen-lockfile --registry=https://registry.npm.taobao.org

RUN pnpm run build

# deploy flygoose web
FROM node:18.19-alpine3.18

RUN adduser -D -u 6666 www

#copy flygoose web
COPY --from=builder /hellworld-blog/dist /apps/hellworld-blog-admin/


WORKDIR /apps/hellworld-blog-admin/

RUN chown -R www /apps/hellworld-blog-admin/

USER www

EXPOSE 58081

CMD ["sh", "-c", "pm2 start pm2.config.js"]