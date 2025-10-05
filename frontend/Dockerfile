FROM node:18
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps --no-audit
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]