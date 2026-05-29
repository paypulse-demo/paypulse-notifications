# Multi-stage build for smaller production image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Production stage
FROM node:20-alpine AS production

# Run as non-root user (security best practice)
RUN addgroup -S paypulse && adduser -S paypulse -G paypulse

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder --chown=paypulse:paypulse /app/node_modules ./node_modules

# Copy application code
COPY --chown=paypulse:paypulse src/ ./src/
COPY --chown=paypulse:paypulse package.json ./

USER paypulse

EXPOSE 3000

# Use exec form for proper signal handling (important for graceful shutdown)
CMD ["node", "src/server.js"]