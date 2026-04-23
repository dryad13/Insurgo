FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN python -m pip install --no-cache-dir --upgrade pip && \
    python -m pip install --no-cache-dir \
    "hermes-agent[messaging,cron,cli,pty] @ https://github.com/NousResearch/hermes-agent/archive/refs/heads/main.zip"

ENV PATH="/root/.local/bin:${PATH}"
ENV HERMES_HOME=/var/lib/hermes
ENV XDG_CONFIG_HOME=/var/lib/hermes/config
ENV PYTHONUNBUFFERED=1

WORKDIR /workspace

RUN mkdir -p /var/lib/hermes /workspace

COPY ./hermes/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
