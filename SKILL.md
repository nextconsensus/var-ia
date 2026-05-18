---
name: refract
description: >-
  Analyze Wikipedia and MediaWiki revision histories. Track claims and
  citations across time. Emit deterministic provenance events with
  semantic enrichment. Use when the task involves Wikipedia edit
  analysis, claim tracking, citation history, knowledge-change
  observation, or building provenance-aware systems on public
  revision data. Do NOT use for healthcare-specific interpretation,
  clinical judgment, or domain-specific source weighting — those
  belong in downstream applications.
tags: [wikipedia, mediawiki, revision-history, claim-tracking, provenance, knowledge-change]
---

# Refract — Skill

Refract is an open-source, deterministic observation engine for knowledge
change. It ingests Wikipedia / MediaWiki revision histories, computes
structural and semantic diffs, and emits provenance-tagged events.

## Quick Start

```bash
# Guided onboarding
npx @refract-org/cli init

# Analyze any page
npx @refract-org/cli analyze "PageTitle" --depth brief

# Track a specific claim across revisions
npx @refract-org/cli claim "PageTitle" --text "exact claim text"

# Export as NDJSON for downstream consumption
npx @refract-org/cli export "PageTitle" --format ndjson > events.ndjson

# Start MCP server for agent tool access
npx @refract-org/cli mcp
```

## Event Types (26 Deterministic Types)

Refract emits 26 event types across 8 categories. Every event carries 6
deterministic enrichment fields (`editMagnitude`, `contentChange`,
`keyTerms`, `certaintyProfile`, `directionSignal`, `quantitativeFindings`).

| Category | Events |
|----------|--------|
| Appearance | `sentence_first_seen`, `sentence_removed`, `sentence_modified`, `sentence_reintroduced` |
| Citations | `citation_added`, `citation_removed`, `citation_replaced` |
| Templates | `template_added`, `template_removed`, `template_parameter_changed` |
| Sections | `section_reorganized`, `lead_promotion`, `lead_demotion` |
| Reverts | `revert_detected`, `edit_cluster_detected` |
| Links/Categories | `wikilink_added`, `wikilink_removed`, `category_added`, `category_removed` |
| Metadata | `page_moved`, `protection_changed` |
| Talk | `talk_page_correlated`, `talk_thread_opened`, `talk_thread_archived`, `talk_reply_added`, `talk_activity_spike` |

## MCP Tools

When running `refract mcp`, 5 tools are available to agents:

| Tool | Purpose |
|------|---------|
| `analyze` | Full page edit history with structured events |
| `claim` | Track a specific sentence's provenance across revisions |
| `export` | Export analysis as JSON, NDJSON, CSV, Parquet, or HTML |
| `cron` | One-shot re-observation for scheduled monitoring |
| `classify` | Model-assisted classification of one inference boundary |

## Using Refract in Code

```typescript
import { MediaWikiClient } from "@refract-org/ingestion";
import { sectionDiffer, citationTracker } from "@refract-org/analyzers";
import type { EvidenceEvent } from "@refract-org/evidence-graph";

const client = new MediaWikiClient();
const revisions = await client.fetchRevisions("Finerenone", { limit: 20 });
```

## Boundary

Refract is domain-neutral infrastructure. It observes what changed. It does
NOT judge whether a change matters clinically, commercially, or legally.
Domain-specific interpretation belongs in downstream applications.

## Design

Refract is deterministic infrastructure. Every event is byte-reproducible —
same input produces same output on every run. No model in the default
pipeline. No autonomous agents. No opaque reasoning.

This makes Refract:
- **Auditable**: trace every event to a specific revision, diff, and analyzer
- **Testable**: benchmark analyzer accuracy against known outcomes  
- **Composable**: build downstream systems on a stable event substrate
- **Trustworthy**: no black-box AI making claims about what changed
