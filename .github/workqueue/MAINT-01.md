---
id: MAINT-01
status: ready
priority: medium
dependencies: []
packages: ["evidence-graph", "analyzers", "cli", "eval"]
layer: L1
effort: ongoing
---

# MAINT-01: Cross-repo compatibility audit

## What

Periodically verify that all 6 refract repos are compatible with the current `@refract-org/*` package versions. Check for stale event type references, outdated CLI flag usage, and schema drift.

## Why

As packages evolve, downstream repos (refract-labs, refract-ui, refract-py, refract-docs, refract-demo-data) can silently fall out of sync. Event type renames (e.g., `claim_first_seen` → `sentence_first_seen`) create type errors that only surface when someone runs `tsc --noEmit`.

## Context

- `COMPATIBILITY.md` in the refract root documents the full dependency chain and what breaks when
- The last audit found stale event type references in `refract-labs/enterprise-knowledge/probe.ts`
- refract-labs now has `bun run test` (typecheck + smoke test) which catches type errors
- refract-ui mirrors evidence-graph types locally and may be stale

## Implementation

1. Run `bun run typecheck` in refract-labs
2. Run `bun run build` in refract-ui
3. Check refract-py dataclasses against current EvidenceEvent schema
4. Check refract-docs schema.md event type list against evidence-graph source
5. Verify refract-demo-data JSONL files use valid event types
6. Update COMPATIBILITY.md if any version relationships changed

## Invariants

- Do not change event type names in probe code — the probes are experimental
- Do not add new dependencies
- Do not modify published package APIs

## Acceptance

- [ ] All 6 repos build/typecheck cleanly
- [ ] No stale event type references in downstream code
- [ ] COMPATIBILITY.md is current
- [ ] Any drift found is either fixed or documented as known
