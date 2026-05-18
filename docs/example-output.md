# Example: Analyzing "Bitcoin"

This page shows the output of `refract analyze "Bitcoin" --depth brief` against
Wikipedia's live API (revision range: 2009–2010, 20 revisions). This is what Refract
produces — a structured event stream of everything that changed, when, and how.

> **Note:** The full output file linked below was generated with Refract v0.3.x and
> uses legacy event type names (e.g., `claim_reworded` instead of `sentence_modified`,
> `section_changed` instead of `section_reorganized`). The inline examples below use
> the current event types. Both files show the same observation — only the naming
> has changed.

Full CLI output: [bitcoin-quick-analysis.txt](./bitcoin-quick-analysis.txt) (330 events).

## Sample Event Timeline

```
Analysis of "Bitcoin" at depth brief found 330 events across 20 revisions.

[2009-03-08T16:41:44Z] wikilink_added (rev 275832581→275832690)
  Section: body
  • target: cryptography

[2009-03-08T16:41:44Z] section_reorganized (rev 275832581→275832690)
  Section: (lead)
  • change: modified

[2009-03-08T16:41:44Z] sentence_modified (rev 275832581→275832690)
  Section: (lead)
  • old_length=28 new_length=166

[2009-08-05T23:50:52Z] wikilink_added (rev 275850009→306304462)
  Section: body
  • target: proof-of-work

[2009-08-05T23:50:52Z] wikilink_added (rev 275850009→306304462)
  Section: body
  • target: hashcash

[2009-08-05T23:50:52Z] section_reorganized (rev 275850009→306304462)
  Section: Proof-of-work
  • change: added

[2009-12-10T14:15:09Z] citation_added (rev 308164432→308164529)
  Section: (lead)
  • ref: href=http://sourceforge.net/projects/bitcoin/

[2009-12-12T00:18:49Z] template_added (rev 308164529→308180771)
  Section: body
  • template: primarysources type=added
```

## Key Observations

- **Sentence lifecycle:** Lead section claims were reworded steadily across the first
  5 revisions — the page's elevator pitch evolved along with the project
- **Wikilinks added:** `cryptography`, `proof-of-work`, `hashcash` — the article
  linked into Wikipedia's broader topic network as it matured
- **Citation added:** The first source (`sourceforge.net/projects/bitcoin/`)
  appeared in Dec 2009, marking the page's transition from announcement to
  referenced article
- **Template changes:** Stub templates were replaced with more specific ones
  (`bank-stub` → `web-software-stub`) as the article grew

## What This Shows

Every event is **deterministic**: the same analysis on the same revision range
always produces the same output. No model involved. No interpretation. Just
structured, reproducible fact extraction from the Wikipedia API.

> **v0.5.0+**: Events now include 6 enrichment fields (`editMagnitude`, `contentChange`, `keyTerms`, `certaintyProfile`, `directionSignal`, `quantitativeFindings`). These are computed deterministically during the analyze pipeline. Example output below shows the base event format; enrichment fields are present on all events when using v0.5.0+.
