FROM node:18
WORKDIR /app
COPY . .
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --no-audit
RUN npm install @csstools/normalize.css
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
