#!/usr/bin/env bash
set -euo pipefail

export PATH="/root/.local/bin:${PATH}"
export HERMES_HOME="${HERMES_HOME:-/var/lib/hermes}"
export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-/var/lib/hermes/config}"

mkdir -p "${HERMES_HOME}" "${XDG_CONFIG_HOME}"

if ! command -v hermes >/dev/null 2>&1; then
  echo "hermes CLI not found in PATH"
  exit 1
fi

echo "Starting Hermes gateway..."
exec hermes gateway start
