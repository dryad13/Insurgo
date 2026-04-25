#!/usr/bin/env bash
set -euo pipefail

export PATH="/root/.local/bin:${PATH}"
export HERMES_HOME="${HERMES_HOME:-/var/lib/hermes}"
export XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-/var/lib/hermes/config}"
export HERMES_PAUSE_START="${HERMES_PAUSE_START:-false}"
export HERMES_ONE_OFF_COMMAND="${HERMES_ONE_OFF_COMMAND:-}"

mkdir -p "${HERMES_HOME}" "${XDG_CONFIG_HOME}"

if ! command -v hermes >/dev/null 2>&1; then
  echo "hermes CLI not found in PATH"
  exit 1
fi

if [ -n "${HERMES_ONE_OFF_COMMAND}" ]; then
  echo "Running one-off command: ${HERMES_ONE_OFF_COMMAND}"
  exec bash -lc "${HERMES_ONE_OFF_COMMAND}"
fi

if [ "${HERMES_PAUSE_START}" = "true" ]; then
  echo "HERMES_PAUSE_START=true; keeping container alive for manual shell actions."
  exec sleep infinity
fi

echo "Starting Hermes gateway..."
exec hermes gateway
