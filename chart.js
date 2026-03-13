import { BRANDS, MARKETS } from './data.js';

export function getScore(brand, mode) {
  if (mode === 'default') {
    if (brand.tuv != null) return { score: brand.tuv, src: 'tuv' };
    if (brand.wc  != null) return { score: brand.wc,  src: 'wc'  };
    if (brand.cr  != null) return { score: brand.cr,  src: 'cr'  };
    return null;
  }
  if (brand[mode] == null) return null;
  return { score: brand[mode], src: mode };
}

export function scoreToColor(v, alpha = 1) {
  const stops = [
    [0,   [226, 75,  74 ]],
    [30,  [216, 90,  48 ]],
    [50,  [239, 159, 39 ]],
    [70,  [29,  158, 117]],
    [100, [99,  153, 34 ]],
  ];
  v = Math.max(0, Math.min(100, v));
  let i = 0;
  while (i < stops.length - 1 && stops[i + 1][0] <= v) i++;
  if (i >= stops.length - 1) {
    const [,c] = stops[stops.length - 1];
    return `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
  }
  const [ta, ca] = stops[i], [tb, cb] = stops[i + 1];
  const t = (v - ta) / (tb - ta);
  return `rgba(${Math.round(ca[0] + t*(cb[0]-ca[0]))},${Math.round(ca[1] + t*(cb[1]-ca[1]))},${Math.round(ca[2] + t*(cb[2]-ca[2]))},${alpha})`;
}

export function priceToRadius(price, allPrices, minR = 6, maxR = 22) {
  if (price == null) return minR;
  const valid = allPrices.filter(p => p != null);
  const mn = Math.min(...valid), mx = Math.max(...valid);
  if (mx === mn) return (minR + maxR) / 2;
  return minR + ((price - mn) / (mx - mn)) * (maxR - minR);
}

export function buildPoints(mode, market) {
  const pts = BRANDS.map(b => {
    const result = getScore(b, mode);
    if (!result) return null;
    return {
      x: b.km,
      y: result.score,
      label: b.n,
      src: result.src,
      price: b[market] ?? null,
    };
  }).filter(Boolean);

  const allPrices = pts.map(p => p.price);
  return pts.map(p => ({ ...p, r: priceToRadius(p.price, allPrices) }));
}

export const LABEL_PLUGIN = {
  id: 'brandLabels',
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.font = '500 10px system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    const ds = chart.data.datasets[0];
    if (!ds) return;
    const meta = chart.getDatasetMeta(0);
    meta.data.forEach((el, i) => {
      const pt = ds.data[i];
      if (!pt) return;
      const { x, y } = el.getProps(['x', 'y'], true);
      const r = Array.isArray(ds.pointRadius) ? ds.pointRadius[i] : (pt.r || 9);
      ctx.fillStyle = scoreToColor(pt.y, 0.92);
      ctx.fillText(pt.label, x + r + 3, y);
    });
    ctx.restore();
  },
};

export function buildChartConfig(pts, market, uniformRadius) {
  const sym = MARKETS[market]?.sym ?? '$';
  const radii = uniformRadius != null ? pts.map(() => uniformRadius) : pts.map(p => p.r);

  return {
    type: 'bubble',
    data: {
      datasets: [{
        data: pts,
        pointStyle: ctx => {
          const p = ctx.dataset.data[ctx.dataIndex];
          if (!p) return 'circle';
          return p.src === 'cr' ? 'circle' : p.src === 'wc' ? 'triangle' : 'rectRot';
        },
        pointRadius: radii,
        pointHoverRadius: radii.map(r => r + 2),
        backgroundColor: ctx => {
          const p = ctx.dataset.data[ctx.dataIndex];
          return p ? scoreToColor(p.y, 0.75) : 'rgba(136,135,128,0.4)';
        },
        borderColor: ctx => {
          const p = ctx.dataset.data[ctx.dataIndex];
          return p ? scoreToColor(p.y, 1) : '#888780';
        },
        borderWidth: 1.5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { right: 80, top: 10 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) {
              const p = ctx.raw;
              const srcName = { cr: 'Consumer Reports', wc: 'What Car?', tuv: 'TÜV' }[p.src] ?? p.src;
              const priceStr = p.price != null
                ? `  ·  ~${sym}${Math.round(p.price / 1000)}k avg used`
                : '  ·  no price data';
              return ` ${p.label}  ·  ${Math.round(p.x / 1000)}k km  ·  score ${p.y}  [${srcName}]${priceStr}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: { display: true, text: 'Avg lifespan (km)', color: '#888780', font: { size: 12 } },
          min: 155000, max: 325000,
          ticks: { callback: v => Math.round(v / 1000) + 'k', color: '#888780', font: { size: 11 } },
          grid: { color: 'rgba(136,135,128,0.12)' },
        },
        y: {
          title: { display: true, text: 'Reliability score (0–100)', color: '#888780', font: { size: 12 } },
          min: 0, max: 100,
          ticks: { color: '#888780', font: { size: 11 } },
          grid: { color: 'rgba(136,135,128,0.12)' },
        },
      },
    },
    plugins: [LABEL_PLUGIN],
  };
}
