FROM node:14
WORKDIR /app
COPY package.json ./
ADD src ./
RUN npm install
COPY . .
CMD ["node","src/app.js"]