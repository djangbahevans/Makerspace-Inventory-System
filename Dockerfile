FROM node:latest

WORKDIR /usr/mis

COPY package*.json /usr/mis/

RUN npm install 

COPY . /usr/mis 

RUN npm run build-prod

EXPOSE 8080 

ENV PORT 8080

CMD [ "npm", "start" ] 

