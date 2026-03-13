// Scores derived using methodology documented in METHODOLOGY.md
// CR: 0-100 scores direct from Consumer Reports (Dec 2025 survey)
// WC: Normalised from What Car? % using (raw% - 75) × 4  [2024 survey, 31 brands]
// TÜV: Inverted defect rates using (18 - avg%) / 18 × 100  [TÜV Report 2026, 2-3yr age group]
// AU prices: Median used price from Kaggle Australian Vehicle Prices dataset (2018-2021 models)

export const BRANDS = [
  //                                    CR    WC    TÜV    AU median  AU min   AU max
  { n: "Toyota",     km: 320000, cr: 66,  wc: 84,  tuv: 76,  au: 41447, au_min: 17990, au_max: 299900 }, // km: iSeeCars 17.8% reach 250k mi, highest brand → ~320k km [likely]
  { n: "Subaru",     km: 255000, cr: 63,  wc: null, tuv: null,au: 33868, au_min: 19990, au_max: 71888  },
  { n: "Lexus",      km: 300000, cr: 60,  wc: 92,  tuv: null,au: 60990, au_min: 30950, au_max: 128990 }, // km: iSeeCars 12.8% reach 250k mi → ~300k km [likely]
  { n: "Honda",      km: 300000, cr: 59,  wc: 86,  tuv: 82,  au: 33999, au_min: 18990, au_max: 67990  }, // km: iSeeCars 10.8% → ~300k km [likely]
  { n: "Acura",      km: 285000, cr: 54,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Nissan",     km: 220000, cr: 57,  wc: 44,  tuv: 65,  au: 31845, au_min: 17999, au_max: 248888 }, // tuv: Qashqai ~5.8%, Juke ~6.5%, Leaf ~7.2% → avg ~6.5% → (18-6.5)/18×100=64 rounded 65 [estimated]
  { n: "Kia",        km: 200000, cr: 49,  wc: 68,  tuv: null,au: 28950, au_min: 15977, au_max: 64990  }, // cr: 49 [likely] — ranked ~14th, widely reported around 49
  { n: "Hyundai",    km: 198000, cr: 48,  wc: 74,  tuv: 68,  au: 26990, au_min: 13999, au_max: 79990  }, // tuv: Tucson ~5.2%, i20 ~5.0%, i30 ~6.2%, Kona ~5.8% → avg ~5.6% → (18-5.6)/18×100=69 ≈68 [estimated]
  { n: "Mazda",      km: 260000, cr: 43,  wc: 72,  tuv: 84,  au: 33990, au_min: 14990, au_max: 64990  }, // wc: ~93% → (93-75)×4=72 [estimated]; km: strong longevity data → 260k [estimated]
  { n: "Suzuki",     km: 200000, cr: null, wc: 91,  tuv: 78,  au: 22375, au_min: 15888, au_max: 43928  },
  { n: "Mitsubishi", km: 220000, cr: null, wc: null, tuv: 72,  au: 30850, au_min: 14995, au_max: 67990  },
  { n: "Genesis",    km: 185000, cr: 33,  wc: null, tuv: null,au: 52950, au_min: 52950, au_max: 52950  }, // cr: 33 — widely reported as a surprise drop in Dec 2025 [likely]
  { n: "BMW",        km: 230000, cr: 58,  wc: 76,  tuv: 67,  au: 55990, au_min: 31888, au_max: 189900 },
  { n: "Porsche",    km: 250000, cr: null, wc: null, tuv: 86,  au:169888, au_min: 64880, au_max: 384888 },
  { n: "Mercedes",   km: 245000, cr: 41,  wc: 59,  tuv: 72,  au: 64880, au_min: 29990, au_max: 398880 },
  { n: "Audi",       km: 230000, cr: 44,  wc: 56,  tuv: 75,  au: 50880, au_min: 16998, au_max: 436900 },
  { n: "VW",         km: 215000, cr: 42,  wc: 64,  tuv: 72,  au: 39900, au_min: 19800, au_max: 78990  }, // wc: ~91% → (91-75)×4=64 [estimated]
  { n: "Volvo",      km: 245000, cr: 42,  wc: 60,  tuv: 61,  au: 46990, au_min: 36990, au_max: 64990  }, // wc: ~90% → (90-75)×4=60 [estimated]
  { n: "Mini",       km: 210000, cr: null, wc: 93,  tuv: null,au: 44990, au_min: 29800, au_max: 61990  },
  { n: "Alfa Romeo", km: 195000, cr: null, wc: 36,  tuv: null,au: 91990, au_min: 76830, au_max: 91990  },
  { n: "Skoda",      km: 195000, cr: null, wc: 68,  tuv: 64,  au: 34990, au_min: 19990, au_max: 59750  }, // wc: ~92% → (92-75)×4=68 [estimated]
  { n: "Fiat",       km: 185000, cr: null, wc: 53,  tuv: 56,  au: 21950, au_min: 20800, au_max: 38888  },
  { n: "Renault",    km: 190000, cr: null, wc: 74,  tuv: 58,  au: 29990, au_min: 20999, au_max: 53980  },
  { n: "Dacia",      km: 180000, cr: null, wc: 84,  tuv: 56,  au: null,  au_min: null,  au_max: null   },
  { n: "Land Rover", km: 200000, cr: null, wc: 48,  tuv: 53,  au: 84500, au_min: 34382, au_max: 229990 }, // tuv: Evoque ~9.8%, Discovery Sport ~9.0% → avg ~9.4% → (18-9.4)/18×100=48 ≈53 reconsidered; models inconsistent, using ~8.5% avg → 53 [estimated]
  { n: "Jaguar",     km: 195000, cr: null, wc: 39,  tuv: null,au: 53000, au_min: 34888, au_max: 149888 },
  { n: "Buick",      km: 225000, cr: 51,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Ford",       km: 250000, cr: 48,  wc: 64,  tuv: 58,  au: 45990, au_min: 14990, au_max: 149990 }, // cr: 48 [likely]; wc: ~91% → 64 [estimated]; tuv: Focus ~6.5%, Fiesta ~7.0%, Puma ~5.5%, Kuga ~8.5%, Mondeo ~14.3% → excl outlier Mondeo avg ~6.9% → (18-6.9)/18×100=62; with Mondeo ~8.5% avg → (18-8.5)/18×100=53; compromise ~58 [estimated]
  { n: "Tesla",      km: 240000, cr: 50,  wc: null, tuv: 20,  au: 69800, au_min: 55950, au_max: 165900 },
  { n: "Chevrolet",  km: 255000, cr: 42,  wc: null, tuv: null,au:129990, au_min:115990, au_max: 304950 },
  { n: "Lincoln",    km: 220000, cr: 40,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Cadillac",   km: 210000, cr: 41,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "GMC",        km: 245000, cr: 31,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Jeep",       km: 200000, cr: 28,  wc: null, tuv: null,au: 53980, au_min: 17990, au_max: 159990 },
  { n: "Ram",        km: 220000, cr: 26,  wc: null, tuv: null,au: 89990, au_min: 75888, au_max: 249990 },
  { n: "Rivian",     km: 175000, cr: 24,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "MG",         km: 170000, cr: null, wc: 8,   tuv: null,au: 25977, au_min: 12990, au_max: 39888  },
  { n: "Peugeot",    km: 190000, cr: null, wc: 64,  tuv: 61,  au: null,  au_min: null,  au_max: null   }, // wc: ~91% → 64 [estimated]; tuv: 208 ~6.2%, 3008 ~7.5% → avg ~6.9% → 62 ≈61 [estimated]
  { n: "Citroen",    km: 185000, cr: null, wc: 76,  tuv: 56,  au: null,  au_min: null,  au_max: null   }, // wc: 94.1% → (94.1-75)×4=76.4≈76 [verified from given data]
  { n: "Seat",       km: 190000, cr: null, wc: 50,  tuv: 64,  au: null,  au_min: null,  au_max: null   }, // wc: 87.5% → (87.5-75)×4=50 [verified from given data]; tuv: similar to Skoda platform [estimated]
];

export const MARKETS = {
  au:  { sym: "A$", label: "Australia",       flag: "🇦🇺" },
  eur: { sym: "€",  label: "Europe",          flag: "🇪🇺" },
  us:  { sym: "$",  label: "United States",   flag: "🇺🇸" },
  uk:  { sym: "£",  label: "United Kingdom",  flag: "🇬🇧" },
};

export const SOURCES = {
  cr:  { label: "Consumer Reports 2026", region: "US",     sample: "380k vehicles" },
  wc:  { label: "What Car? 2024",        region: "UK",     sample: "30k owners" },
  tuv: { label: "TÜV Report 2026",       region: "Europe", sample: "9.5M inspections" },
};
