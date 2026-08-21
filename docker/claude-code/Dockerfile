FROM node:20-alpine

RUN apk add --no-cache git bash ca-certificates curl python3 py3-pip docker-cli docker-cli-compose

RUN pip install --no-cache-dir --break-system-packages "fastmcp>=2.0.0"

USER node
WORKDIR /workspace

# Instalador nativo: deja el binario bajo /home/node/.local, propiedad de
# `node`, evitando el global de npm (root-owned) que rompe el auto-update.
ENV PATH="/home/node/.local/bin:${PATH}"
RUN curl -fsSL https://claude.ai/install.sh | bash

CMD ["sleep", "infinity"]
