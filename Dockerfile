FROM node:10.5.0-stretch
ENV APP_DIR="/app/dingus"
RUN apt-get update && apt-get install -y wget curl vim-nox \
  && mkdir -p /root/.vim/autoload /root/.vim/undo /root/.vim/backups /root/.vim/swaps \
  && mkdir -p /tmp/downloads \
  && cd /tmp/downloads \
  && wget https://github.com/BurntSushi/ripgrep/releases/download/0.8.1/ripgrep-0.8.1-x86_64-unknown-linux-musl.tar.gz \
  && tar -zxvf ripgrep-0.8.1-x86_64-unknown-linux-musl.tar.gz \
  && cd ripgrep-0.8.1-x86_64-unknown-linux-musl \
  && mv rg /usr/bin/rg && mv ./doc/rg.1 /usr/share/man/man1/rg.1 \
  && cd /tmp && rm -rf downloads \
  && npm install -g gatsby-cli

WORKDIR /root
ADD [".tools/.vimrc*", ".tools/.vim", ".tools/screen-256color.ti", "entry-point.sh", "/root/"]
RUN tic ./screen-256color.ti && rm screen-256color.ti \
  && vim +PlugInstall +qall

WORKDIR $APP_DIR

RUN "yarn"
EXPOSE 3000
EXPOSE 9222
CMD yarn start
