FROM node:14.4.0

ENV HOME /root
COPY /proyecto2 /proyecto2
CMD node app.js