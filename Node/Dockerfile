FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
VOLUME /images
CMD node server.js
EXPOSE 4000