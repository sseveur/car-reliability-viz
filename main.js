import { getScore, buildPoints, buildChartConfig } from './chart.js';
import { BRANDS, MARKETS, SOURCES } from './data.js';

let chartInstance = null;
let currentMode = 'default';
let currentMarket = 'au';
const DEFAULT_RADIUS = 9;

function updateMarketButtons() {
  const visibleBrands = BRANDS.filter(b => getScore(b, currentMode) != null);
  document.querySelectorAll('[data-market]').forEach(btn => {
    const m = btn.dataset.market;
    const hasData = visibleBrands.some(b => b[m] != null);
    btn.disabled = !hasData;
    if (!hasData && btn.classList.contains('active')) {
      btn.classList.remove('active');
      currentMarket = null;
    }
  });
}

function render() {
  updateMarketButtons();
  const pts = buildPoints(currentMode, currentMarket);
  const cfg = buildChartConfig(pts, currentMarket, currentMarket ? undefined : DEFAULT_RADIUS);

  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(document.getElementById('scatter'), cfg);

  updatePriceLegend(pts);
}

function updatePriceLegend(pts) {
  const el = document.getElementById('price-legend');
  if (!currentMarket) {
    el.textContent = 'Click a market to enable price-based bubble sizing.';
    return;
  }
  const sym = MARKETS[currentMarket].sym;
  const prices = pts.map(p => p.price).filter(p => p != null);
  if (!prices.length) {
    el.textContent = 'No price data for this market yet.';
    return;
  }
  const min = Math.round(Math.min(...prices) / 1000);
  const max = Math.round(Math.max(...prices) / 1000);
  el.innerHTML = `Bubble size = avg used price (3–5 yr) · <strong>${sym}${min}k–${sym}${max}k</strong> range · <em>estimates based on Carsales / AutoTrader listing data</em>`;
}

function initSourceButtons() {
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.mode;
      render();
    });
  });
}

function initMarketButtons() {
  document.querySelectorAll('[data-market]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        currentMarket = null;
      } else {
        document.querySelectorAll('[data-market]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMarket = btn.dataset.market;
      }
      render();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSourceButtons();
  initMarketButtons();
  render();
});
