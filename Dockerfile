FROM node:8-jessie
RUN apt-get update && apt-get install -y libsecret-1-dev

RUN mkdir /cli-core
WORKDIR /cli-core
COPY . .
RUN npm install ./cli-test
RUN npm install
CMD ["npm", "test"]
