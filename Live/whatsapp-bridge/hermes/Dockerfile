FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    xz-utils \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

ENV PATH="/root/.local/bin:${PATH}"
ENV HERMES_HOME=/var/lib/hermes
ENV XDG_CONFIG_HOME=/var/lib/hermes/config
ENV PYTHONUNBUFFERED=1

WORKDIR /workspace

RUN mkdir -p /var/lib/hermes /workspace

COPY ./hermes/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
