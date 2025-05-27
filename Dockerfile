FROM node:20-slim

# Create a non-root user for safety
RUN useradd -m runner
USER runner

WORKDIR /app

COPY runner.js .

# Install lightweight HTTP server if needed (not necessary with built-in http module)
CMD ["node", "runner.js"]