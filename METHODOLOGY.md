# Data Methodology

This document describes how raw source data is converted into the 0–100 normalised scores used in the visualisation.

## Principle

Every score shown is derived from **published source data** using a transparent, repeatable formula. Where the original source already uses a 0–100 scale, minimal transformation is applied. Where it does not, this document explains the conversion.

---

## AI-Assisted Data Enrichment (experimental branch)

Some data gaps were filled using an LLM (Claude) recalling information from its training data. This approach was used to:
- Estimate What Car? percentages for mid-table brands (ranks 11–21) where scores aren't publicly available
- Estimate TÜV defect rates for brands where only a few models' rates are publicly known
- Adjust km lifespan values based on recalled iSeeCars data
- Add 3 European brands (Peugeot, Citroen, Seat) that appeared in source surveys but were missing from the dataset

### Why use AI for this?

Many data points sit behind paywalls or are spread across dozens of articles in different languages. An LLM trained on web data can recall approximate values from sources it encountered during training — not perfectly, but often directionally correct. This is explicitly a **stopgap** until real source data replaces it.

### How AI-generated values are marked

Every AI-estimated value is tagged with a confidence level in the source code comments and in [AI_DATA_NOTES.md](AI_DATA_NOTES.md):

- **verified** — the AI recalled a specific published figure that matches known reference data
- **likely** (~80% confidence) — the AI is fairly confident in the approximate value
- **estimated** (~50% confidence) — the AI is interpolating from partial knowledge; value could be off significantly

### Limitations of AI-generated data

- LLM recall is **not citeable** — it cannot link back to the specific article or table it learned from
- Values may reflect older survey editions (2023/2024) rather than the latest
- The model may conflate similar-sounding statistics (e.g., mixing up defect rates from different age groups)
- There is no way to verify AI-recalled values without checking the original source

### Goal

Every AI-estimated value should eventually be replaced with a verified figure from the original source. The AI values exist to make the visualisation more complete while community contributions fill in the gaps. See [AI_DATA_NOTES.md](AI_DATA_NOTES.md) for the full changelog.

---

## 1. Consumer Reports (CR) — Predicted Reliability Score

**Source data format:** CR publishes brand-level predicted reliability scores on a 0–100 scale, based on survey responses from 380,000+ vehicle owners across 20 trouble areas.

**Conversion:** None required — CR's scores are already 0–100.

**Data availability:** The top ~10 scores are publicly reported in press coverage. The full 26-brand list is behind CR's paywall. Brands not covered by CR (mostly non-US-market brands) are marked `null`.

**Scores used (from 2026 survey, published Dec 2025):**

| Brand | CR Score | Source |
|-------|----------|--------|
| Toyota | 66 | Public press coverage |
| Subaru | 63 | Public press coverage |
| Lexus | 60 | Public press coverage |
| Honda | 59 | Public press coverage |
| BMW | 58 | Public press coverage |
| Nissan | 57 | Public press coverage |
| Acura | 54 | Public press coverage |
| Buick | 51 | Public press coverage |
| Tesla | 50 | Public press coverage |
| Kia | 49 | Estimated from ranking position |
| Hyundai | 48 | Estimated from ranking position |
| Ford | 48 | Estimated from ranking position |

Brands ranked below Tesla (~rank 10) have scores estimated by interpolating between the last known public score (Tesla = 50) and the bottom of the scale, using CR's published rank order. These estimates are marked with ⚠️ in the data.

**Status:** ✅ Top scores verified from public sources. ⚠️ Lower-ranked scores estimated from rank position.

---

## 2. What Car? (WC) — Reliability Survey

**Source data format:** What Car? publishes brand reliability as a **percentage score** (e.g., "Mini 98.3%"), based on owner surveys covering cars made in the last 5 years.

**Conversion formula:**
```
wc_score = (wc_percentage - 75) × 4
```

This maps the observed range (~77%–98%) to a 0–100 scale:
- 75% → 0 (floor)
- 100% → 100 (ceiling)
- 98.3% → 93
- 76.9% → 8

**Rationale:** The raw percentages cluster between 77–98%, making differences hard to see on a 0–100 chart. The linear rescaling preserves relative differences while using the full visual range. The floor of 75% was chosen because no brand in any recent survey has scored below 76%.

**Scores used (from 2024 survey, 31 brands — most complete public dataset):**

| Brand | WC Raw % | WC Score (normalised) | Source |
|-------|----------|-----------------------|--------|
| Mini | 98.3% | 93 | Public |
| Lexus | 97.9% | 92 | Public |
| Suzuki | 97.7% | 91 | Public |
| Honda | 96.6% | 86 | Public |
| Toyota | 96.1% | 84 | Public |
| Dacia | 96.0% | 84 | Public |
| BMW | 94.0% | 76 | Public |
| Renault | 93.6% | 74 | Public |
| Hyundai | 93.5% | 74 | Public |
| Kia | ~92% | 68 | Estimated (mid-table) |
| Mercedes | 89.7% | 59 | Public |
| Audi | 89.0% | 56 | Public |
| Fiat | 88.2% | 53 | Public |
| Land Rover | 87.1% | 48 | Public |
| Nissan | 85.9% | 44 | Public |
| Jaguar | 84.7% | 39 | Public (listed as Vauxhall rank) |
| Alfa Romeo | 84.1% | 36 | Public |
| MG | 76.9% | 8 | Public |

**Status:** ✅ Top 10 and bottom 10 verified. ⚠️ Mid-table brands (ranks 11-21) estimated.

---

## 3. TÜV Report — HU Inspection Defect Rates

**Source data format:** TÜV publishes **per-model defect rates** (% of vehicles failing Germany's mandatory inspection) across 6 age groups. There is **no brand-level aggregate** — we must compute it.

**Conversion methodology:**

1. **Collect** publicly available model-level defect rates for the 2–3 year age group (newest cars, most comparable across brands)
2. **Average** defect rates across all available models per brand
3. **Convert** to a 0–100 score using inverted linear scaling:

```
tuv_score = max(0, min(100, (18 - avg_defect_rate) / 18 × 100))
```

Where 18% is the ceiling (worst observed brand average). This means:
- 0% defect rate → score 100
- 9% defect rate → score 50
- 18% defect rate → score 0

**Example:** If Brand X has 3 models with defect rates of 3.5%, 5.2%, and 4.1%, the brand average is 4.27%, giving a score of `(18 - 4.27) / 18 × 100 = 76`.

**Data limitation:** Only top/bottom ~10 models per age group are publicly available. The full ~246 model list is in the paid AutoBild TÜV Report magazine. Brands with fewer than 2 publicly available model scores are marked as low-confidence.

**Status:** ⚠️ All scores are computed aggregates from partial public data. Full model coverage requires the paid report.

---

## 4. Lifespan (km) — X-Axis

**Source data:** Two sources combined:
- **iSeeCars:** Publishes "% of vehicles predicted to reach 250,000 miles" per brand (174M+ vehicles analysed)
- **Junk Car Medics:** Publishes average mileage at time of junking per model (50,000+ junked vehicles, 2024)

**Conversion methodology:**

For brands with iSeeCars data:
```
est_lifespan_miles = 150000 + (pct_reaching_250k / 20) × 100000
```

This maps the range:
- 0% reaching 250k → ~150,000 miles (~241,000 km)
- 5% (average) → ~175,000 miles (~282,000 km)
- 17.8% (Toyota, best) → ~239,000 miles (~385,000 km)

For brands with Junk Car Medics model data: average across available models.

Final values converted to km: `km = miles × 1.609`

**Data limitation:** iSeeCars only has full data for US-market brands. European-only brands (Dacia, Skoda, Renault, etc.) use estimates based on TÜV age-group defect rate progression as a proxy for longevity.

**Status:** ⚠️ All km values are estimates derived from probabilistic/end-of-life data, not direct measurements of average lifespan.

---

## 5. Used Car Prices (AU) — Bubble Size

**Source:** [Australian Vehicle Prices dataset](https://www.kaggle.com/datasets/nelgiriyewithana/australian-vehicle-prices) (Kaggle, ~16,800 listings scraped from Australian marketplaces)

**Methodology:**
1. Filter to USED vehicles only
2. Filter to model years 2018–2021 (3–5 years old relative to dataset date)
3. Exclude outliers below A$2,000 and above A$500,000
4. Compute **median price** per brand (more robust than mean for skewed distributions)
5. Also store min and max for the price range slicer

**Status:** ✅ Real data. Note: dataset is from late 2023, so prices reflect that market. Sample sizes vary (Toyota: 1,063 listings vs Genesis: 1 listing).

---

## Confidence Levels

Each data point in the visualisation carries an implicit confidence level:

- ✅ **Verified:** Directly from published source data with minimal/no transformation
- ⚠️ **Estimated:** Derived from partial public data using the methodology above
- ❌ **Insufficient data:** Marked as `null` (brand not shown for that source)

### Per-component summary

| Component | Verified | Estimated | Notes |
|---|---|---|---|
| CR scores (top 9) | ✅ 9 brands | — | Publicly reported in press coverage |
| CR scores (ranks 10-26) | — | ⚠️ ~17 brands | Rank order is public but actual scores are paywalled. Numbers are interpolated guesses, could be off by 5-10 pts |
| WC scores (top 10 + bottom 10) | ✅ ~20 brands | — | Real percentages, transparent formula |
| WC scores (mid-table) | — | ⚠️ ~5 brands | Percentages not publicly available |
| TÜV scores | — | ⚠️ All ~15 brands | Built from partial model data (2-3 public models per brand out of potentially 10+) |
| km lifespan | — | ⚠️ All 37 brands | Derived from tangentially related data (survival probability, end-of-life mileage). No source directly measures average brand lifespan |
| AU prices (major brands) | ✅ ~25 brands | — | Median from real Kaggle dataset, good sample sizes |
| AU prices (thin sample) | — | ⚠️ ~5 brands | Genesis: 1 listing, Alfa Romeo: 2, Fiat: 3 |
| EUR/US/UK prices | ❌ None | — | No data yet |

**The X-axis (km lifespan) is the weakest part of the visualisation.** Every value is an estimate — no public source directly provides "average lifespan in km by brand." Treat these as rough directional indicators, not precise measurements.

---

## Known Limitations

- **Scores are not directly comparable across sources.** A CR score of 60 and a WC score of 60 do not mean the same thing — they measure different aspects of reliability using different methodologies in different markets. The normalisation to 0-100 creates visual comparability but not statistical equivalence.
- **TÜV data is model-level, not brand-level.** Averaging 2-3 publicly known model defect rates to represent a brand with 15+ models introduces significant sampling bias. The publicly available models tend to be the best and worst performers, skewing the average.
- **The AU price dataset is from late 2023.** Prices have shifted since then. The dataset also skews towards the Sydney/NSW market.
- **iSeeCars longevity data is US-centric.** European and Asian-market brands (Dacia, Skoda, Renault, etc.) have no direct longevity data — their km values are rougher estimates.

---

## How to Improve This Data

This is an open-source project and the data can always be better. If you have access to better sources or spot an error, please contribute.

### What would help most

1. **CR scores (ranks 10-26):** If you have a Consumer Reports subscription, the full 26-brand score list would replace ~17 estimated values with verified ones
2. **What Car? mid-table (ranks 11-21):** A What Car? subscription would fill in ~5 missing brand percentages
3. **TÜV full model list:** The AutoBild TÜV Report annual edition (~5 EUR) contains all ~246 model defect rates, which would make the brand aggregates much more robust
4. **iSeeCars full brand list:** Their study page shows top brands but the full ranking may be available by contacting their research team
5. **Used car prices for other markets:** Kaggle datasets or scrapes from AutoScout24 (EUR), Cars.com (US), or AutoTrader (UK) would enable the other market buttons
6. **Better longevity data:** Any source that directly measures average vehicle lifespan by brand would be a major improvement over the current estimates

### How to contribute

- Open an issue or PR on [GitHub](https://github.com/sseveur/car-reliability-viz)
- All brand data lives in `data.js` (and duplicated inline in `index.html`)
- If submitting new data, please include: the source URL, the raw values before conversion, and which methodology formula was applied
- Even partial improvements help — fixing one brand's score is better than none
