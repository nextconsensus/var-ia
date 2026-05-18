# Refract — Claude Code Instructions

> **This project uses AGENTS.md as its primary instruction file.**
> Read `AGENTS.md` for full project instructions, commands, architecture,
> and repository boundary rules.

## Quick Start for Claude Code

```bash
# Analyze any Wikipedia page
refract analyze "PageTitle" --depth forensic --json

# Track a claim across revisions
refract claim "PageTitle" --text "exact claim text"

# Export as structured data
refract export "PageTitle" --format ndjson > events.ndjson

# Start MCP server for tool access
refract mcp
```

## Key Commands

```bash
bun run build      # tsc -b
bun run test       # vitest run
bun run typecheck  # tsc --noEmit
bun run lint       # biome lint packages/
```

## Repository Boundary

Refract is domain-neutral infrastructure. Do NOT add healthcare-specific logic,
clinical judgment, drug names, or domain-specific source weighting. Those
belong in NextConsensus. See `docs/repository-boundary.md`.
