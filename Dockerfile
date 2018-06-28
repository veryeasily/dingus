FROM node:10.5.0-stretch
ENV APP_DIR="/app/dingus"
WORKDIR $APP_DIR
RUN "yarn"
EXPOSE 3000
EXPOSE 9222
CMD node --inspect=0.0.0.0:9222 index.js
