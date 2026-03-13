// Scores derived using methodology documented in METHODOLOGY.md
// CR: 0-100 scores direct from Consumer Reports (Dec 2025 survey)
// WC: Normalised from What Car? % using (raw% - 75) × 4  [2024 survey, 31 brands]
// TÜV: Inverted defect rates using (18 - avg%) / 18 × 100  [TÜV Report 2026, 2-3yr age group]
// AU prices: Median used price from Kaggle Australian Vehicle Prices dataset (2018-2021 models)

export const BRANDS = [
  //                                    CR    WC    TÜV    AU median  AU min   AU max
  { n: "Toyota",     r:"jp", km: 310000, cr: 66,  wc: 84,  tuv: 76,  au: 41447, au_min: 17990, au_max: 299900 },
  { n: "Subaru",     r:"jp", km: 255000, cr: 63,  wc: null, tuv: null,au: 33868, au_min: 19990, au_max: 71888  },
  { n: "Lexus",      r:"jp", km: 295000, cr: 60,  wc: 92,  tuv: null,au: 60990, au_min: 30950, au_max: 128990 },
  { n: "Honda",      r:"jp", km: 290000, cr: 59,  wc: 86,  tuv: 82,  au: 33999, au_min: 18990, au_max: 67990  },
  { n: "Acura",      r:"jp", km: 285000, cr: 54,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Nissan",     r:"jp", km: 220000, cr: 57,  wc: 44,  tuv: null,au: 31845, au_min: 17999, au_max: 248888 },
  { n: "Kia",        r:"kr", km: 200000, cr: 49,  wc: 68,  tuv: null,au: 28950, au_min: 15977, au_max: 64990  },
  { n: "Hyundai",    r:"kr", km: 198000, cr: 48,  wc: 74,  tuv: null,au: 26990, au_min: 13999, au_max: 79990  },
  { n: "Mazda",      r:"jp", km: 240000, cr: 43,  wc: null, tuv: 84,  au: 33990, au_min: 14999, au_max: 64990  },
  { n: "Suzuki",     r:"jp", km: 200000, cr: null, wc: 91,  tuv: 78,  au: 22375, au_min: 15888, au_max: 43928  },
  { n: "Mitsubishi", r:"jp", km: 220000, cr: null, wc: null, tuv: 72,  au: 30850, au_min: 14995, au_max: 67990  },
  { n: "Genesis",    r:"kr", km: 185000, cr: 33,  wc: null, tuv: null,au: 52950, au_min: 52950, au_max: 52950  },
  { n: "BMW",        r:"eu", km: 230000, cr: 58,  wc: 76,  tuv: 67,  au: 55990, au_min: 31888, au_max: 189900 },
  { n: "Porsche",    r:"eu", km: 250000, cr: null, wc: null, tuv: 86,  au:169888, au_min: 64880, au_max: 384888 },
  { n: "Mercedes",   r:"eu", km: 245000, cr: 41,  wc: 59,  tuv: 72,  au: 64880, au_min: 29990, au_max: 398880 },
  { n: "Audi",       r:"eu", km: 230000, cr: 44,  wc: 56,  tuv: 75,  au: 50880, au_min: 16998, au_max: 436900 },
  { n: "VW",         r:"eu", km: 215000, cr: 42,  wc: null, tuv: 72,  au: 39900, au_min: 19800, au_max: 78990  },
  { n: "Volvo",      r:"eu", km: 245000, cr: 42,  wc: null, tuv: 61,  au: 46990, au_min: 36990, au_max: 64990  },
  { n: "Mini",       r:"eu", km: 210000, cr: null, wc: 93,  tuv: null,au: 44990, au_min: 29800, au_max: 61990  },
  { n: "Alfa Romeo", r:"eu", km: 195000, cr: null, wc: 36,  tuv: null,au: 91990, au_min: 76830, au_max: 91990  },
  { n: "Skoda",      r:"eu", km: 195000, cr: null, wc: null, tuv: 64,  au: 34990, au_min: 19990, au_max: 59750  },
  { n: "Fiat",       r:"eu", km: 185000, cr: null, wc: 53,  tuv: 56,  au: 21950, au_min: 20800, au_max: 38888  },
  { n: "Renault",    r:"eu", km: 190000, cr: null, wc: 74,  tuv: 58,  au: 29990, au_min: 20999, au_max: 53980  },
  { n: "Dacia",      r:"eu", km: 180000, cr: null, wc: 84,  tuv: 56,  au: null,  au_min: null,  au_max: null   },
  { n: "Land Rover", r:"eu", km: 200000, cr: null, wc: 48,  tuv: null,au: 84500, au_min: 34382, au_max: 229990 },
  { n: "Jaguar",     r:"eu", km: 195000, cr: null, wc: 39,  tuv: null,au: 53000, au_min: 34888, au_max: 149888 },
  { n: "Buick",      r:"us", km: 225000, cr: 51,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Ford",       r:"us", km: 250000, cr: 48,  wc: null, tuv: null,au: 45990, au_min: 14990, au_max: 149990 },
  { n: "Tesla",      r:"us", km: 240000, cr: 50,  wc: null, tuv: 4,   au: 69800, au_min: 55950, au_max: 165900 }, // tuv: Model Y 17.3% → (18-17.3)/18×100=3.89≈4
  { n: "Chevrolet",  r:"us", km: 255000, cr: 42,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   }, // au: nulled — only Silverados/Corvettes in AU, misleading median
  { n: "Lincoln",    r:"us", km: 220000, cr: 40,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Cadillac",   r:"us", km: 210000, cr: 41,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "GMC",        r:"us", km: 245000, cr: 31,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Jeep",       r:"us", km: 200000, cr: 28,  wc: null, tuv: null,au: 53980, au_min: 17990, au_max: 159990 },
  { n: "Ram",        r:"us", km: 220000, cr: 26,  wc: null, tuv: null,au: 89990, au_min: 75888, au_max: 249990 },
  { n: "Rivian",     r:"us", km: 175000, cr: 24,  wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "MG",         r:"cn", km: 170000, cr: null, wc: 8,   tuv: null,au: 25977, au_min: 12990, au_max: 39888  },
  { n: "Peugeot",    r:"eu", km: 190000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Citroen",    r:"eu", km: 185000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Seat",       r:"eu", km: 190000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Opel",       r:"eu", km: 195000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "DS",         r:"eu", km: 185000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Maserati",   r:"eu", km: 200000, cr: null, wc: null, tuv: null,au: 91990, au_min: 78990, au_max: 179990 },
  { n: "Cupra",      r:"eu", km: 190000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Isuzu",      r:"jp", km: 280000, cr: null, wc: null, tuv: null,au: 42499, au_min: 17800, au_max: 67990  },
  { n: "Infiniti",   r:"jp", km: 250000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "Chrysler",   r:"us", km: 220000, cr: null, wc: null, tuv: null,au: 64880, au_min: 48888, au_max: 74888  },
  { n: "Dodge",      r:"us", km: 230000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "BYD",        r:"cn", km: 200000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "GWM",        r:"cn", km: 200000, cr: null, wc: null, tuv: null,au: 35990, au_min: 17990, au_max: 40888  },
  { n: "Polestar",   r:"eu", km: 210000, cr: null, wc: null, tuv: null,au: null,  au_min: null,  au_max: null   },
  { n: "SsangYong",  r:"kr", km: 210000, cr: null, wc: null, tuv: null,au: 34777, au_min: 27970, au_max: 38490  },
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
