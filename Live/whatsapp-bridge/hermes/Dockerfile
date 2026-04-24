FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

RUN python -m pip install --no-cache-dir --upgrade pip && \
    python -m pip install --no-cache-dir \
    "hermes-agent @ https://github.com/NousResearch/hermes-agent/archive/refs/heads/main.zip" \
    "aiohttp>=3.9,<4" \
    "qrcode>=7,<8"

# Hermes WhatsApp runtime expects bridge assets under site-packages/scripts/whatsapp-bridge.
# Vendor them explicitly and install Node dependencies at build time.
# npm install (not ci) with aggressive flags keeps the build under Render's 512MB build RAM.
ENV NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_PROGRESS=false \
    NPM_CONFIG_LOGLEVEL=warn \
    NODE_OPTIONS=--max-old-space-size=384
RUN BRIDGE_DIR="/usr/local/lib/python3.11/site-packages/scripts/whatsapp-bridge" && \
    mkdir -p "${BRIDGE_DIR}" && \
    curl -fsSL "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/whatsapp-bridge/bridge.js" -o "${BRIDGE_DIR}/bridge.js" && \
    curl -fsSL "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/whatsapp-bridge/allowlist.js" -o "${BRIDGE_DIR}/allowlist.js" && \
    curl -fsSL "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/whatsapp-bridge/package.json" -o "${BRIDGE_DIR}/package.json" && \
    cd "${BRIDGE_DIR}" && \
    npm install --omit=dev --omit=optional --ignore-scripts --no-package-lock --prefer-online && \
    npm cache clean --force

ENV PATH="/root/.local/bin:${PATH}"
ENV HERMES_HOME=/var/lib/hermes
ENV XDG_CONFIG_HOME=/var/lib/hermes/config
ENV PYTHONUNBUFFERED=1

WORKDIR /workspace

RUN mkdir -p /var/lib/hermes /workspace

COPY ./hermes/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
