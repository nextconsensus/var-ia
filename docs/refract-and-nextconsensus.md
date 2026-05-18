# How Refract Relates to NextConsensus

Refract is the open observation layer for knowledge-change provenance. NextConsensus is a healthcare evidence-intelligence platform built on provenance principles.

## The Split

| | Refract | NextConsensus |
|---|---------|--------------|
| **Type** | Open infrastructure (AGPL-3.0) | Commercial healthcare platform |
| **Scope** | Generic source observation | Healthcare evidence monitoring |
| **Primitive** | Knowledge-state memory | Evidence operations |
| **Object** | Claim/citation/source event | Healthcare claim state |
| **Output** | Semantic change event | Review-ready decision record |
| **Question** | "What changed?" | "Does this claim remain usable here?" |
| **User** | Developer / AI system | Pharma / healthcare evidence team |
| **Moat** | Open substrate + ecosystem | Healthcare evidence graph + workflows |

## The Principle

Refract observes change. NextConsensus evaluates healthcare relevance.

Refract is domain-neutral. It works on Wikipedia, fan wikis, policy documents, regulatory feeds, and any versioned source. It does not know what a "clinical claim" or a "payer policy" is. It knows that a sentence appeared, a citation changed, a section moved, a dispute marker was added.

NextConsensus adds healthcare-specific source coverage, clinical ontologies, review workflows, and evidence-drift classification. It maps events to assets, indications, competitors, and regulatory contexts. It turns "a citation was removed" into "the evidence binding for this market-access claim may need review."

## Why the Boundary Matters

Refract is open to make the observation layer verifiable. Anyone can inspect, test, extend, or fork it. This builds trust in the underlying provenance.

NextConsensus is proprietary because it contains healthcare-specific source weights, labeled drift examples, customer annotations, and review workflows — assets that compound with use and are expensive to replicate.

The split also protects NextConsensus customers. A fund or pharma company using NextConsensus can verify that the underlying observation events are correct by inspecting Refract. They cannot access another customer's proprietary annotations or review decisions.

## What Refract Does Not Do

Refract is not a truth engine, fact-checker, medical device, investment model, or replacement for domain review. It observes and structures how knowledge changes. Domain-specific interpretation belongs in applications built on top of Refract — including NextConsensus.

## For Developers

If you want to build a provenance-aware system on top of Refract, start with the [README](../README.md) and [architecture docs](./ARCHITECTURE.md). The event schema is published. The analyzer pipeline is deterministic and byte-reproducible. The CLI, adapters, and replay primitives are documented.

If you want healthcare-specific evidence monitoring, claim substantiation, or evidence-drift detection, visit [nextconsensus.com](https://nextconsensus.com).
