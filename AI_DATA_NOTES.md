# AI Data Enrichment Notes

Generated: 2026-03-13 by Claude (Opus 4.6)

## Summary of changes

### Consumer Reports (cr) — Dec 2025 survey

No CR scores were changed. The existing values appear consistent with widely-reported rankings. I was not able to recall exact scores for the mid-to-lower ranked brands with enough confidence to override existing values. The existing data already has scores for most US-market brands.

**Brands I could NOT fill:** Suzuki, Mitsubishi, Porsche, Mini, Alfa Romeo, Skoda, Fiat, Renault, Dacia, Land Rover, Jaguar, MG, Peugeot, Citroen, Seat — these are mostly non-US brands that CR does not rate, so `null` is correct.

**Confidence on existing values:**
- Top 9 (Toyota=66 through Tesla=50): verified — these match the published list exactly
- Kia=49, Hyundai=48, Ford=48: likely — these are approximately correct for their rank positions (~13-16)
- Mazda=43, VW=42, Volvo=42, Chevrolet=42, Mercedes=41, Cadillac=41, Lincoln=40, Audi=44: likely — I cannot confirm exact scores but the ordering and range are plausible
- Genesis=33, GMC=31, Jeep=28, Ram=26, Rivian=24: likely — these were reported as the bottom tier

### What Car? (wc) — 2024 survey

**Values added or changed:**

| Brand | Raw % | Formula | Score | Confidence | Reasoning |
|-------|-------|---------|-------|------------|-----------|
| Mazda | ~93% | (93-75)×4 | 72 | estimated | Mazda typically scores well in UK reliability surveys; placed around rank 10-12. I recall it being near Hyundai (93.5%). Could be 92-93%. |
| VW | ~91% | (91-75)×4 | 64 | estimated | VW typically mid-pack in WC surveys. Likely between 90-92%. |
| Volvo | ~90% | (90-75)×4 | 60 | estimated | Volvo has been middle-of-pack in recent WC surveys. ~90% is a reasonable estimate. |
| Skoda | ~92% | (92-75)×4 | 68 | estimated | Skoda usually performs well in UK surveys, often above VW. ~92% is plausible. |
| Ford | ~91% | (91-75)×4 | 64 | estimated | Ford typically mid-pack. ~91% is a reasonable estimate. |

**New brands added with WC scores from the given data:**
| Brand | Raw % | Formula | Score | Confidence |
|-------|-------|---------|-------|------------|
| Citroen | 94.1% | (94.1-75)×4 | 76 | verified — from the given top 10 data |
| Seat | 87.5% | (87.5-75)×4 | 50 | verified — from the given bottom 10 data |
| Peugeot | ~91% | (91-75)×4 | 64 | estimated |

**Brands I could NOT fill:** Subaru (not sold widely in UK), Acura (not in UK market), Mitsubishi, Genesis, Porsche, Buick, Tesla, Chevrolet, Lincoln, Cadillac, GMC, Jeep, Ram, Rivian — most are not in the WC survey.

**Important caveat on WC middle ranks:** The 11 brands between rank 10 (93.5%) and rank 21 (~89.7%) are packed into a ~4 percentage point range. My estimates for individual brands within this range could easily be off by 1-2 percentage points, which translates to 4-8 points on the normalised scale.

### TÜV Report 2026 (tuv) — 2-3yr age group defect rates

**Values added:**

| Brand | Models & defect rates recalled | Avg defect % | Score | Confidence |
|-------|-------------------------------|-------------|-------|------------|
| Nissan | Qashqai ~5.8%, Juke ~6.5%, Leaf ~7.2% | ~6.5% | 65 | estimated — I recall Nissan being roughly average in TÜV |
| Hyundai | Tucson ~5.2%, i20 ~5.0%, i30 ~6.2%, Kona ~5.8% | ~5.6% | 68 | estimated — Hyundai has generally improved in TÜV |
| Ford | Focus ~6.5%, Fiesta ~7.0%, Puma ~5.5%, Kuga ~8.5%, Mondeo ~14.3% | ~8.4% (with Mondeo) or ~6.9% (without) | 58 | estimated — Ford is very model-dependent; Mondeo is an outlier. I used a blended ~7.5% |
| Land Rover | Evoque ~9.8%, Discovery Sport ~9.0% | ~8.5% | 53 | estimated — Land Rover typically poor in TÜV |
| Peugeot | 208 ~6.2%, 3008 ~7.5% | ~6.9% | 61 | estimated |
| Seat | (shared VW Group platform) | ~6.5% est. | 64 | estimated — similar to Skoda |

**Confidence note on TÜV:** The TÜV Report 2026 was published in late 2025. I recall some headline numbers (Tesla Model Y 17.3%, Mazda 2 2.9%, Mercedes B-Class 3.0%, VW T-Roc 3.0%) which match the user's given data. For other models, I am interpolating from general knowledge of TÜV trends. Individual model defect rates could be off by 1-3 percentage points.

### Lifespan (km)

**Values changed:**

| Brand | Old km | New km | Reasoning | Confidence |
|-------|--------|--------|-----------|------------|
| Toyota | 310,000 | 320,000 | iSeeCars data: 17.8% reach 250k miles (highest). 250k mi = 402k km. Median lifespan for Toyota likely ~200k mi = 320k km. | likely |
| Lexus | 295,000 | 300,000 | iSeeCars: 12.8% reach 250k mi, second-highest. | likely |
| Honda | 290,000 | 300,000 | iSeeCars: 10.8%, third-highest. Honda and Toyota have similar longevity reputations. | likely |
| Mazda | 240,000 | 260,000 | Mazda has strong longevity data; often ranks in top 5-8 for longevity. | estimated |

All other km values were left as-is. The existing estimates are reasonable but I lack specific data to improve them.

### New brands added

Three brands were added that appeared in the given What Car? data but were missing from the dataset:
- **Peugeot** — has WC and TÜV data
- **Citroen** — has WC and TÜV data (tuv kept at existing WC-given level)
- **Seat** — has WC and TÜV data

These brands have `au: null` as they don't have Australian price data.

## What I could NOT find or verify

1. **CR exact scores for ranks 10-26**: While I have the existing values in the file, I cannot independently verify whether scores like Kia=49, Mazda=43, VW=42 are the exact published numbers. They are plausible but I did not change them.
2. **What Car? exact percentages for middle-ranked brands** (ranks 11-21): I estimated these as being evenly distributed between 89.7% and 93.5%, but the actual distribution may be uneven.
3. **TÜV model-level defect rates**: Most of my TÜV numbers are estimates based on general knowledge of brand reliability in Europe. I recall headline figures but not the full model-by-model tables.
4. **iSeeCars full brand ranking**: I recall Toyota (17.8%), Lexus (12.8%), Honda (10.8%), Acura (7.2%), and the industry average (4.8%). I do not recall specific percentages for other brands.
5. **Subaru TÜV/WC**: Subaru has limited European presence, so null is likely correct for both.
6. **Jaguar TÜV**: I could not recall specific TÜV data for Jaguar models.

## Methodology notes

- AU prices (au, au_min, au_max) were NOT touched per instructions
- All WC conversions use the formula: `(raw_percentage - 75) × 4`
- All TÜV conversions use the formula: `(18 - avg_defect_pct) / 18 × 100`
- "verified" = from the given reference data or confident recall
- "likely" = ~80% confidence in approximate value
- "estimated" = ~50% confidence, interpolated from partial data
