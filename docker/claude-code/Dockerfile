FROM node:20-alpine

RUN apk add --no-cache git bash ca-certificates curl python3 py3-pip docker-cli docker-cli-compose

RUN pip install --no-cache-dir --break-system-packages "fastmcp>=2.0.0"

RUN npm install -g @anthropic-ai/claude-code

USER node
WORKDIR /workspace

CMD ["sleep", "infinity"]
