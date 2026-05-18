# Model Evaluation Leaderboard

Submit your results via PR to `benchmarks/submissions/`. See [BENCHMARK.md](../BENCHMARK.md) for the full specification and reproducibility requirements.

## Temporal Leakage

Lower is better. Zero is ideal.

| Rank | Model | Cutoff | Leakage Rate | Submitted | Refract Version |
|---|---|---|---|---|---|
| — | *No submissions yet* | — | — | — | — |

## Retrieval Quality (Stability)

Higher mean stability is better. Fewer contested retrievals is better.

| Rank | System | Mean Stability | Contested Rate | Submitted | Refract Version |
|---|---|---|---|---|---|
| — | *No submissions yet* | — | — | — | — |

## Provenance Hallucination

Lower hallucination rate is better.

| Rank | Model | Verified | Outdated | Hallucinated | Rate | Submitted |
|---|---|---|---|---|---|---|
| — | *No submissions yet* | — | — | — | — | — |

## Submitting

1. Run the benchmark against your model using the [standard 10 pages](../BENCHMARK.md#standard-benchmark-pages)
2. Format your results according to the [submission format](../BENCHMARK.md#temporal-leakage-benchmark)
3. Place your submission in `benchmarks/submissions/<model-name>-<date>.json`
4. Open a PR. Include the Refract version, benchmark commit hash, and reproduction steps
5. The PR will be verified by running the same commands against the same pages

All submissions must be reproducible. A reviewer will run your exact commands and verify
the SHA-256 hashes match.
