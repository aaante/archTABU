FROM node:21-alpine
WORKDIR /app/frontend
COPY package* .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 3000
