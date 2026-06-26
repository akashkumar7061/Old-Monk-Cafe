FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app source
COPY . .

# Create non-root user for better container security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN mkdir -p logs uploads && chown -R appuser:appgroup /usr/src/app
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "require('http').get('http://localhost:5000/', r => process.exit(r.statusCode===200?0:1)).on('error', () => process.exit(1))"

CMD ["node", "server.js"]
