FROM node:14.4.0
RUN mkdir -p /home/Documentos/proyecto/app && chown -R node:node /home/Documentos/proyecto
WORKDIR /home/Documentos/proyecto
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 8888
CMD ["node","app.js"]