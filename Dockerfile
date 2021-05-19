FROM node:14.4.0
MAINTAINER Bichotas
ENV HOME /root
COPY ./app.js ./app.js
CMD node app.js