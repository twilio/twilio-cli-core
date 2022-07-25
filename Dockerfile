FROM node:14.18.1
RUN apt-get update && apt-get install -y libsecret-1-dev

RUN mkdir /cli-core
WORKDIR /cli-core
COPY . .
RUN npm install
CMD ["npm", "test"]
