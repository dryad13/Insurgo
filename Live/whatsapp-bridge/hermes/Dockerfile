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
    "hermes-agent[messaging,cron,cli,pty] @ https://github.com/NousResearch/hermes-agent/archive/refs/heads/main.zip"

# Hermes WhatsApp runtime expects bridge assets under site-packages/scripts/whatsapp-bridge.
# The slim GitHub source install does not always place these runtime JS files there, so we
# vendor them explicitly and install their Node dependencies at image build time.
RUN BRIDGE_DIR="$(python - <<'PY'\nimport sysconfig\nprint(sysconfig.get_paths()['purelib'] + '/scripts/whatsapp-bridge')\nPY\n)" && \
    mkdir -p "${BRIDGE_DIR}" && \
    curl -fsSL "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/whatsapp-bridge/bridge.js" -o "${BRIDGE_DIR}/bridge.js" && \
    curl -fsSL "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/whatsapp-bridge/allowlist.js" -o "${BRIDGE_DIR}/allowlist.js" && \
    curl -fsSL "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/whatsapp-bridge/package.json" -o "${BRIDGE_DIR}/package.json" && \
    curl -fsSL "https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/whatsapp-bridge/package-lock.json" -o "${BRIDGE_DIR}/package-lock.json" && \
    cd "${BRIDGE_DIR}" && npm ci --omit=dev

ENV PATH="/root/.local/bin:${PATH}"
ENV HERMES_HOME=/var/lib/hermes
ENV XDG_CONFIG_HOME=/var/lib/hermes/config
ENV PYTHONUNBUFFERED=1

WORKDIR /workspace

RUN mkdir -p /var/lib/hermes /workspace

COPY ./hermes/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
