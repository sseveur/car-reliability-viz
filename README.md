# Car Reliability vs Longevity — Global Data Explorer

An interactive scatter plot comparing car brand reliability scores across three independent global surveys, plotted against average vehicle lifespan and used car prices across markets.

**[View live demo →](https://sseveur.github.io/car-reliability-viz)**

![Preview](preview.png)

---

## What it shows

- **X axis** — Average vehicle lifespan (km), from iSeeCars Longest-Lasting Brands study & Junk Car Medics 2024 data
- **Y axis** — Reliability score (0–100), sourced from one of three surveys
- **Color** — Encodes the reliability score (red → amber → green)
- **Shape** — Encodes the data source (circle = CR, triangle = What Car?, diamond = TÜV)
- **Bubble size** — Average used car price (3–5 year old vehicle) in the selected market

---

## Data sources

| Source | Region | Sample | Year |
|--------|--------|--------|------|
| [Consumer Reports Annual Auto Reliability Survey](https://www.consumerreports.org) | US | ~380,000 vehicles | Dec 2025 |
| [What Car? Reliability Survey](https://www.whatcar.com) | UK | ~30,000 owners, 31 brands | Oct 2025 |
| [AutoBild TÜV Report](https://www.tuvsud.com) | Europe | 9.5M German MOT inspections | Nov 2025 |
| [iSeeCars Longest-Lasting Cars Study](https://www.iseecars.com) | US | 400M+ vehicles | 2025 |
| [Junk Car Medics End-of-Life Study](https://www.junkcarmedics.com) | US | 50k junked cars | 2024 |

Used car price estimates are based on Carsales/RedBook (AU), AutoTrader (UK), and Cars.com (US) listing patterns for 3–5 year old vehicles. No single public brand-level dataset exists — these are market estimates.

---

## Default source priority

When "Default" mode is selected, the chart uses:
1. **TÜV** first (largest dataset, most independent)
2. **What Car?** if no TÜV data for that brand
3. **Consumer Reports** as fallback

This provides the widest brand coverage and prioritises the largest dataset.

---

## Project structure

```
car-reliability-viz/
├── index.html          # Self-contained website (GitHub Pages entry point)
├── src/
│   ├── data.js         # Brand data & market definitions (ES modules)
│   ├── chart.js        # Chart.js config, color helpers, label plugin
│   └── main.js         # App entrypoint — wires up controls & renders
├── README.md
└── .github/
    └── workflows/
        └── pages.yml   # GitHub Actions for auto-deploy to Pages
```

The `index.html` is fully self-contained (no build step needed) — all logic is inlined. The `src/` files are the modular version for development.

---

## Updating the data

All brand data lives in `src/data.js` (and duplicated inline in `index.html`). Each brand entry looks like:

```js
{ n: "Toyota", km: 310000, cr: 66, wc: 84, tuv: 68, au: 35000, uk: 18000, us: 22000 }
```

| Field | Description |
|-------|-------------|
| `n`   | Brand name |
| `km`  | Avg lifespan in kilometres |
| `cr`  | Consumer Reports score (0–100), or `null` |
| `wc`  | What Car? score (0–100), or `null` |
| `tuv` | TÜV score (0–100), or `null` |
| `au`  | Avg used price in AUD, or `null` |
| `uk`  | Avg used price in GBP, or `null` |
| `us`  | Avg used price in USD, or `null` |

---

## License

MIT — data is from public sources credited above. Chart built with [Chart.js](https://www.chartjs.org).
