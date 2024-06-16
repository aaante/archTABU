FROM node:21-alpine
WORKDIR /app/backend
COPY package* .
RUN npm install
COPY . .
CMD ["npm", "test"]
EXPOSE 3001
