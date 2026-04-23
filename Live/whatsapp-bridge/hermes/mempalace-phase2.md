# Phase 2: MemPalace Integration Runbook

Only start this after Phase 1 acceptance is complete.

## Goal

Add MemPalace as a memory layer to improve retrieval and continuity without
changing transport.

## Step 1: Install MemPalace runtime

Inside the Hermes runtime environment:

```bash
pip install mempalace
```

Initialize storage:

```bash
mempalace init /var/lib/hermes/mempalace
```

## Step 2: Start with retrieval-only usage

Use only safe read-heavy operations first:

- Search historical memory for context recall
- Load wake-up/context for new sessions
- Validate relevance and leakage boundaries

Do not enable broad write/mutation automation yet.

## Step 3: Connect MemPalace into Hermes workflow

Use Hermes MCP/tool integration to register MemPalace server/tools, then expose
retrieval commands in the active toolset.

Recommended initial scope:

- Search (`mempalace search`-equivalent tool usage)
- Wake-up/context restore
- Wing-scoped retrieval by domain or project

## Step 4: Controlled write enablement

After retrieval quality passes:

- Enable diary/session persistence writes
- Keep writes scoped by role/context
- Add retention and cleanup cadence

## Step 5: Governance and operations

- Define backup schedule for `/var/lib/hermes/mempalace`
- Run backup + restore drill
- Record rollback steps (disable MemPalace tools, continue core chat)

## Phase 2 acceptance gates

- Recall quality measurably improves on real conversations
- Latency regression remains within agreed threshold
- No cross-user/cross-project leakage
- Backup/restore drill succeeds
