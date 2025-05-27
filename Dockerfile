FROM node:20-slim

RUN useradd -m runner
USER runner

WORKDIR /app

COPY runner.js .

RUN npm install vm2

CMD ["node", "runner.js"]
