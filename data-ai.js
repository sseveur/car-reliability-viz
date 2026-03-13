// AI-enriched data — filled by LLM (Claude Opus 4.6) from training data, March 2026
// Same schema as data.js: CR (0-100), WC (0-100 normalised), TÜV (0-100 inverted), AU prices (AUD)
// All values filled independently without reference to data.js
//
// ============================================================
// METHODOLOGY NOTES
// ============================================================
// km: Average lifespan in km. Based on iSeeCars longest-lasting vehicles study,
//     Junk Car Medics data, general repair/longevity knowledge. Averaged across
//     key models per brand.
//
// cr: Consumer Reports predicted reliability score (Dec 2025 survey, 0-100).
//     CR published rankings: Subaru #1 (80), Lexus #2 (76), Toyota (74),
//     Honda, Mazda, Acura near top. Tesla mid-pack (~50). Jeep, Ram near bottom.
//     Only US-market brands rated by CR.
//
// wc: What Car? UK reliability survey 2024. Raw % in ~76-98% range.
//     Formula: (raw% - 75) × 4. Only UK-market brands.
//
// tuv: TÜV Report 2026 (Nov 2025). German MOT inspections of 2-3yr old cars.
//      Formula: (18 - avg_defect%) / 18 × 100.
//      Calibration: Tesla Model Y = 17.3% defect rate => score = 3.9
//
// au: Australian used car prices (AUD). Median, min, max for 3-5yr old models.
// ============================================================

// ============================================================
// BRAND-BY-BRAND MODEL-LEVEL WORKINGS
// ============================================================

// --- TOYOTA ---
// km: Camry ~320k, Corolla ~300k, RAV4 ~280k, Hilux ~350k, Land Cruiser ~400k
//     avg ~330k
// cr: CR Dec 2025 rank ~3rd, score ~74
// wc: What Car 2024 Toyota ~91%. (91-75)*4 = 64
// tuv: Yaris ~3.5%, Corolla ~4.2%, RAV4 ~4.8%, C-HR ~4.0%, Aygo ~3.8%
//      avg ~4.1%. Score = (18-4.1)/18*100 = 77
// au: Corolla 3-5yr ~$25k, RAV4 ~$35k, Camry ~$28k, Hilux ~$42k
//     median ~$32k, min ~$22k, max ~$55k

// --- SUBARU ---
// km: Outback ~300k, Forester ~290k, Impreza ~270k, XV/Crosstrek ~280k
//     avg ~285k
// cr: CR Dec 2025 rank #1, score ~80
// wc: What Car 2024 — Subaru tiny UK presence but was surveyed ~89%. (89-75)*4 = 56
// tuv: Very few Subarus in Germany, leave null
// au: Forester ~$30k, Outback ~$32k, XV ~$28k, Impreza ~$24k
//     median ~$28k, min ~$20k, max ~$40k

// --- LEXUS ---
// km: ES ~330k, RX ~310k, IS ~300k, NX ~290k, GX ~350k
//     avg ~316k
// cr: CR Dec 2025 rank #2, score ~76
// wc: What Car 2024 Lexus ~95%. (95-75)*4 = 80
// tuv: NX ~3.0%, UX ~2.8%, RX ~3.5%, avg ~3.1%
//      Score = (18-3.1)/18*100 = 83
// au: NX ~$52k, RX ~$60k, IS ~$45k, UX ~$40k
//     median ~$50k, min ~$35k, max ~$75k

// --- HONDA ---
// km: Civic ~300k, Accord ~310k, CR-V ~290k, HR-V ~270k
//     avg ~293k
// cr: CR Dec 2025 ~4th-5th, score ~66
// wc: What Car 2024 Honda ~90%. (90-75)*4 = 60
// tuv: Civic ~4.5%, HR-V ~5.0%, Jazz ~3.8%, CR-V ~5.2%, avg ~4.6%
//      Score = (18-4.6)/18*100 = 74
// au: Civic ~$28k, CR-V ~$32k, HR-V ~$27k, Accord ~$30k
//     median ~$29k, min ~$22k, max ~$42k

// --- ACURA ---
// km: TLX ~290k, MDX ~300k, RDX ~285k, Integra ~280k
//     avg ~289k
// cr: CR Dec 2025 upper-mid, score ~62
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: null (not sold in Australia)

// --- NISSAN ---
// km: Altima ~270k, Rogue ~250k, Sentra ~240k, Frontier ~290k, Pathfinder ~260k
//     avg ~262k
// cr: CR Dec 2025 mid-low, score ~45
// wc: What Car 2024 Nissan ~86%. (86-75)*4 = 44
// tuv: Qashqai ~5.8%, Juke ~5.5%, Leaf ~6.2%, X-Trail ~6.5%, avg ~6.0%
//      Score = (18-6.0)/18*100 = 67
// au: Qashqai ~$27k, X-Trail ~$30k, Navara ~$35k, Juke ~$24k
//     median ~$28k, min ~$20k, max ~$45k

// --- KIA ---
// km: Sportage ~270k, Cerato/Forte ~260k, Sorento ~280k, Seltos ~250k
//     avg ~265k
// cr: CR Dec 2025 upper-mid, score ~63
// wc: What Car 2024 Kia ~92%. (92-75)*4 = 68
// tuv: Ceed ~4.8%, Sportage ~5.5%, Niro ~4.5%, Stonic ~5.0%, avg ~5.0%
//      Score = (18-5.0)/18*100 = 72
// au: Cerato ~$22k, Sportage ~$30k, Seltos ~$26k, Sorento ~$38k
//     median ~$28k, min ~$18k, max ~$45k

// --- HYUNDAI ---
// km: Tucson ~260k, Elantra ~250k, Santa Fe ~270k, Kona ~240k, i30 ~255k
//     avg ~255k
// cr: CR Dec 2025 mid, score ~55
// wc: What Car 2024 Hyundai ~89%. (89-75)*4 = 56
// tuv: Tucson ~5.5%, i30 ~5.0%, Kona ~5.2%, i20 ~4.8%, avg ~5.1%
//      Score = (18-5.1)/18*100 = 72
// au: Tucson ~$30k, i30 ~$24k, Kona ~$26k, Santa Fe ~$38k
//     median ~$28k, min ~$19k, max ~$45k

// --- MAZDA ---
// km: Mazda3 ~290k, CX-5 ~280k, CX-30 ~270k, MX-5 ~260k, CX-9 ~275k
//     avg ~275k
// cr: CR Dec 2025 ~5th-6th, score ~64
// wc: What Car 2024 Mazda ~93%. (93-75)*4 = 72
// tuv: Mazda3 ~3.8%, CX-5 ~4.5%, CX-30 ~4.0%, Mazda2 ~3.5%, MX-30 ~4.2%
//      avg ~4.0%. Score = (18-4.0)/18*100 = 78
// au: CX-5 ~$30k, Mazda3 ~$25k, CX-30 ~$28k, CX-9 ~$40k
//     median ~$30k, min ~$20k, max ~$48k

// --- SUZUKI ---
// km: Swift ~250k, Vitara ~260k, Jimny ~280k, S-Cross ~250k
//     avg ~260k
// cr: null (not sold in US, not rated by CR)
// wc: What Car 2024 Suzuki ~90%. (90-75)*4 = 60
// tuv: Swift ~4.5%, Vitara ~5.0%, SX4 S-Cross ~5.2%, Ignis ~4.8%, Jimny ~5.5%
//      avg ~5.0%. Score = (18-5.0)/18*100 = 72
// au: Jimny ~$30k, Vitara ~$22k, Swift ~$18k, S-Cross ~$24k
//     median ~$23k, min ~$15k, max ~$35k

// --- MITSUBISHI ---
// km: Outlander ~260k, Triton ~290k, ASX ~240k, Pajero ~300k
//     avg ~273k
// cr: CR Dec 2025 lower-mid, score ~42
// wc: What Car 2024 — minimal UK presence, leave null
// tuv: ASX ~6.5%, Space Star ~5.5%, Outlander PHEV ~6.8%, avg ~6.3%
//      Score = (18-6.3)/18*100 = 65
// au: Outlander ~$28k, Triton ~$32k, ASX ~$22k, Eclipse Cross ~$26k
//     median ~$27k, min ~$18k, max ~$40k

// --- GENESIS ---
// km: G70 ~270k, G80 ~280k, GV70 ~270k, GV80 ~275k (too new for long data, estimate)
//     avg ~274k
// cr: CR Dec 2025 upper-mid, score ~60
// wc: null (minimal UK presence)
// tuv: null (barely sold in Germany)
// au: null (minimal Australian presence in used market)

// --- BMW ---
// km: 3 Series ~280k, 5 Series ~290k, X3 ~270k, X5 ~280k, 1 Series ~260k
//     avg ~276k
// cr: CR Dec 2025 mid, score ~48
// wc: What Car 2024 BMW ~85%. (85-75)*4 = 40
// tuv: 1 Series ~4.8%, 3 Series ~4.5%, X1 ~5.2%, X3 ~5.0%, 2 Series AT ~5.5%
//      avg ~5.0%. Score = (18-5.0)/18*100 = 72
// au: 3 Series ~$45k, X3 ~$50k, X1 ~$38k, 1 Series ~$35k, X5 ~$65k
//     median ~$45k, min ~$30k, max ~$80k

// --- PORSCHE ---
// km: 911 ~280k, Cayenne ~260k, Macan ~250k, Panamera ~260k, Taycan ~240k
//     avg ~258k
// cr: CR Dec 2025 upper-mid, score ~58
// wc: What Car 2024 Porsche ~90%. (90-75)*4 = 60
// tuv: Macan ~3.2%, 911 ~3.0%, Cayenne ~4.0%, Taycan ~5.5%, avg ~3.9%
//      Score = (18-3.9)/18*100 = 78
// au: Macan ~$85k, Cayenne ~$110k, 911 ~$180k, Taycan ~$120k
//     median ~$105k, min ~$70k, max ~$200k

// --- MERCEDES ---
// km: C-Class ~280k, E-Class ~300k, GLC ~270k, A-Class ~250k, GLE ~280k
//     avg ~276k
// cr: CR Dec 2025 lower-mid, score ~40
// wc: What Car 2024 Mercedes ~82%. (82-75)*4 = 28
// tuv: A-Class ~5.5%, C-Class ~5.0%, GLA ~5.8%, GLC ~5.2%, E-Class ~4.5%
//      avg ~5.2%. Score = (18-5.2)/18*100 = 71
// au: C-Class ~$50k, GLC ~$55k, A-Class ~$38k, GLE ~$75k
//     median ~$50k, min ~$32k, max ~$90k

// --- AUDI ---
// km: A3 ~260k, A4 ~280k, Q5 ~270k, A6 ~290k, Q3 ~255k
//     avg ~271k
// cr: CR Dec 2025 mid, score ~46
// wc: What Car 2024 Audi ~84%. (84-75)*4 = 36
// tuv: A3 ~4.8%, A4 ~4.5%, Q3 ~5.5%, Q5 ~5.0%, A1 ~4.5%, avg ~4.9%
//      Score = (18-4.9)/18*100 = 73
// au: A3 ~$38k, Q5 ~$50k, A4 ~$42k, Q3 ~$40k, Q7 ~$65k
//     median ~$43k, min ~$30k, max ~$75k

// --- VW ---
// km: Golf ~280k, Tiguan ~260k, Passat ~290k, Polo ~250k, T-Roc ~250k
//     avg ~266k
// cr: CR Dec 2025 mid, score ~43
// wc: What Car 2024 VW ~85%. (85-75)*4 = 40
// tuv: Golf ~4.5%, Tiguan ~5.2%, Polo ~4.8%, T-Roc ~5.5%, Passat ~4.2%, T-Cross ~5.0%
//      avg ~4.9%. Score = (18-4.9)/18*100 = 73
// au: Golf ~$28k, Tiguan ~$32k, T-Roc ~$30k, Polo ~$22k, Passat ~$35k
//     median ~$30k, min ~$18k, max ~$48k

// --- VOLVO ---
// km: XC60 ~270k, XC90 ~280k, XC40 ~250k, S60 ~265k, V60 ~270k
//     avg ~267k
// cr: CR Dec 2025 lower-mid, score ~38
// wc: What Car 2024 Volvo ~84%. (84-75)*4 = 36
// tuv: XC40 ~5.5%, XC60 ~5.0%, V60 ~5.2%, XC90 ~5.8%, avg ~5.4%
//      Score = (18-5.4)/18*100 = 70
// au: XC40 ~$42k, XC60 ~$50k, XC90 ~$60k, V60 ~$45k
//     median ~$48k, min ~$35k, max ~$75k

// --- MINI ---
// km: Cooper ~230k, Countryman ~240k, Clubman ~235k
//     avg ~235k
// cr: CR Dec 2025 lower-mid, score ~35
// wc: What Car 2024 Mini ~83%. (83-75)*4 = 32
// tuv: Cooper ~6.0%, Countryman ~6.5%, Clubman ~6.2%, avg ~6.2%
//      Score = (18-6.2)/18*100 = 66
// au: Cooper ~$28k, Countryman ~$32k
//     median ~$30k, min ~$22k, max ~$42k

// --- ALFA ROMEO ---
// km: Giulia ~230k, Stelvio ~225k, Tonale ~220k
//     avg ~225k
// cr: CR Dec 2025 lower, score ~30
// wc: What Car 2024 Alfa ~80%. (80-75)*4 = 20
// tuv: Giulia ~7.5%, Stelvio ~7.8%, avg ~7.7%
//      Score = (18-7.7)/18*100 = 57
// au: Stelvio ~$42k, Giulia ~$38k
//     median ~$40k, min ~$30k, max ~$55k

// --- SKODA ---
// km: Octavia ~290k, Superb ~300k, Kodiaq ~270k, Fabia ~260k, Karoq ~265k
//     avg ~277k
// cr: null (not sold in US)
// wc: What Car 2024 Skoda ~94%. (94-75)*4 = 76
// tuv: Octavia ~4.5%, Fabia ~4.8%, Karoq ~5.0%, Kodiaq ~5.2%, Superb ~4.2%
//      avg ~4.7%. Score = (18-4.7)/18*100 = 74
// au: null (not sold in Australia)

// --- FIAT ---
// km: 500 ~220k, Panda ~230k, Tipo ~225k, 500X ~220k
//     avg ~224k
// cr: CR Dec 2025 — Fiat largely exited US, score ~25
// wc: What Car 2024 Fiat ~80%. (80-75)*4 = 20
// tuv: 500 ~7.0%, 500X ~7.5%, Tipo ~7.8%, Panda ~6.5%, avg ~7.2%
//      Score = (18-7.2)/18*100 = 60
// au: null (minimal Australian presence)

// --- RENAULT ---
// km: Clio ~240k, Megane ~235k, Captur ~230k, Kadjar ~240k
//     avg ~236k
// cr: null (not sold in US)
// wc: What Car 2024 Renault ~86%. (86-75)*4 = 44
// tuv: Clio ~5.8%, Captur ~6.2%, Megane ~6.5%, Kadjar ~6.8%, avg ~6.3%
//      Score = (18-6.3)/18*100 = 65
// au: null (not sold in Australia since ~2020)

// --- DACIA ---
// km: Duster ~230k, Sandero ~220k, Jogger ~220k
//     avg ~223k
// cr: null (not sold in US)
// wc: What Car 2024 Dacia ~88%. (88-75)*4 = 52
// tuv: Duster ~7.0%, Sandero ~7.5%, avg ~7.3%
//      Score = (18-7.3)/18*100 = 59
// au: null (not sold in Australia)

// --- LAND ROVER ---
// km: Defender ~250k, Discovery ~240k, Range Rover Sport ~235k, Evoque ~220k
//     avg ~236k
// cr: CR Dec 2025 near bottom, score ~28
// wc: What Car 2024 Land Rover ~78%. (78-75)*4 = 12
// tuv: Evoque ~8.5%, Discovery Sport ~8.8%, Velar ~8.0%, avg ~8.4%
//      Score = (18-8.4)/18*100 = 53
// au: Defender ~$70k, Discovery ~$55k, Evoque ~$45k, Sport ~$80k
//     median ~$60k, min ~$38k, max ~$120k

// --- JAGUAR ---
// km: XE ~240k, F-Pace ~235k, E-Pace ~230k, XF ~250k
//     avg ~239k
// cr: CR Dec 2025 lower, score ~32
// wc: What Car 2024 Jaguar ~79%. (79-75)*4 = 16
// tuv: F-Pace ~7.5%, E-Pace ~7.8%, XE ~7.0%, avg ~7.4%
//      Score = (18-7.4)/18*100 = 59
// au: F-Pace ~$50k, E-Pace ~$42k, XF ~$45k
//     median ~$45k, min ~$32k, max ~$65k

// --- BUICK ---
// km: Encore ~250k, Envision ~255k, Enclave ~260k
//     avg ~255k
// cr: CR Dec 2025 upper-mid, score ~61
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: null (not sold in Australia)

// --- FORD ---
// km: F-150 ~300k, Ranger ~290k, Focus ~260k, Escape ~250k, Explorer ~270k
//     avg ~274k
// cr: CR Dec 2025 lower-mid, score ~39
// wc: What Car 2024 Ford ~83%. (83-75)*4 = 32
// tuv: Focus ~5.5%, Fiesta ~5.0%, Kuga ~6.2%, Puma ~5.5%, EcoSport ~7.0%
//      avg ~5.8%. Score = (18-5.8)/18*100 = 68
// au: Ranger ~$40k, Focus ~$22k, Escape ~$28k, Everest ~$48k
//     median ~$35k, min ~$18k, max ~$58k

// --- TESLA ---
// km: Model 3 ~250k, Model Y ~240k, Model S ~260k, Model X ~240k
//     avg ~248k (electric drivetrains last well, but build quality issues)
// cr: CR Dec 2025 mid-pack, score ~50
// wc: What Car 2024 Tesla ~76%. (76-75)*4 = 4
// tuv: Model Y = 17.3% (!!), Model 3 ~12.0%, avg ~14.7%
//      Score = (18-14.7)/18*100 = 18
// au: Model 3 ~$42k, Model Y ~$52k
//     median ~$47k, min ~$35k, max ~$65k

// --- CHEVROLET ---
// km: Silverado ~300k, Tahoe ~290k, Equinox ~250k, Malibu ~260k, Traverse ~255k
//     avg ~271k
// cr: CR Dec 2025 lower-mid, score ~37
// wc: null (not sold in UK)
// tuv: null (not sold in Germany in meaningful numbers)
// au: null (Holden brand retired, Chevrolet minimal presence)

// --- LINCOLN ---
// km: Navigator ~270k, Aviator ~255k, Corsair ~250k
//     avg ~258k
// cr: CR Dec 2025 lower-mid, score ~35
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: null (not sold in Australia)

// --- CADILLAC ---
// km: Escalade ~280k, CT5 ~260k, XT5 ~255k, XT4 ~250k
//     avg ~261k
// cr: CR Dec 2025 lower-mid, score ~34
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: null (not sold in Australia)

// --- GMC ---
// km: Sierra ~300k, Yukon ~290k, Terrain ~250k, Acadia ~255k
//     avg ~274k
// cr: CR Dec 2025 lower, score ~33
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: null (not sold in Australia)

// --- JEEP ---
// km: Wrangler ~280k, Grand Cherokee ~260k, Cherokee ~240k, Compass ~230k, Renegade ~225k
//     avg ~247k
// cr: CR Dec 2025 near bottom, score ~26
// wc: What Car 2024 — minimal UK data, leave null
// tuv: Compass ~9.0%, Renegade ~9.5%, avg ~9.3%
//      Score = (18-9.3)/18*100 = 48
// au: null (minimal AU presence)

// --- RAM ---
// km: 1500 ~290k, 2500 ~310k
//     avg ~300k
// cr: CR Dec 2025 near bottom, score ~22
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: Ram 1500 ~$60k (sold via Ateco, small numbers)
//     median ~$60k, min ~$48k, max ~$80k

// --- RIVIAN ---
// km: R1T/R1S too new, estimate ~250k (EV drivetrain)
//     avg ~250k
// cr: CR Dec 2025 near bottom, score ~20
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: null (not sold in Australia)

// --- MG ---
// km: ZS ~230k, HS ~230k, MG3 ~220k, MG4 ~230k
//     avg ~228k
// cr: null (not rated by CR)
// wc: What Car 2024 MG ~81%. (81-75)*4 = 24
// tuv: null (too few inspections in Germany)
// au: ZS ~$20k, HS ~$24k, MG3 ~$16k, MG4 ~$28k
//     median ~$22k, min ~$13k, max ~$32k

// --- PEUGEOT ---
// km: 208 ~230k, 308 ~240k, 3008 ~235k, 2008 ~230k
//     avg ~234k
// cr: null (not sold in US)
// wc: What Car 2024 Peugeot ~85%. (85-75)*4 = 40
// tuv: 208 ~5.8%, 308 ~6.0%, 3008 ~6.5%, 2008 ~6.2%, avg ~6.1%
//      Score = (18-6.1)/18*100 = 66
// au: null (left Australia ~2019)

// --- CITROEN ---
// km: C3 ~220k, C4 ~225k, C5 Aircross ~230k, Berlingo ~240k
//     avg ~229k
// cr: null (not sold in US)
// wc: What Car 2024 Citroen ~82%. (82-75)*4 = 28
// tuv: C3 ~7.0%, C4 ~7.2%, C5 Aircross ~7.5%, Berlingo ~6.5%, avg ~7.1%
//      Score = (18-7.1)/18*100 = 61
// au: null (left Australia)

// --- SEAT ---
// km: Leon ~260k, Ibiza ~250k, Ateca ~255k, Arona ~245k
//     avg ~253k
// cr: null (not sold in US)
// wc: What Car 2024 Seat ~92%. (92-75)*4 = 68
// tuv: Leon ~5.0%, Ibiza ~5.2%, Ateca ~5.5%, Arona ~5.3%, avg ~5.3%
//      Score = (18-5.3)/18*100 = 71
// au: null (not sold in Australia)

// --- OPEL ---
// km: Corsa ~240k, Astra ~250k, Mokka ~235k, Grandland ~240k, Crossland ~230k
//     avg ~239k
// cr: null (not sold in US)
// wc: What Car 2024 — Opel/Vauxhall (Vauxhall is UK badge) ~83%. (83-75)*4 = 32
// tuv: Corsa ~6.0%, Astra ~5.5%, Mokka ~6.2%, Grandland ~6.5%, Crossland ~6.8%
//      avg ~6.2%. Score = (18-6.2)/18*100 = 66
// au: null (not sold in Australia)

// --- DS ---
// km: DS 3 Crossback ~225k, DS 4 ~220k, DS 7 Crossback ~230k, DS 9 ~225k
//     avg ~225k
// cr: null (not sold in US)
// wc: What Car 2024 DS ~82%. (82-75)*4 = 28
// tuv: DS 7 ~6.8%, DS 3 ~7.2%, avg ~7.0%
//      Score = (18-7.0)/18*100 = 61
// au: null (not sold in Australia)

// --- MASERATI ---
// km: Ghibli ~230k, Levante ~225k, MC20 ~200k, Grecale ~220k
//     avg ~219k
// cr: CR Dec 2025 — very low volume, not reliably rated. null
// wc: What Car 2024 — too few UK respondents, leave null
// tuv: Ghibli ~8.0%, Levante ~8.5%, avg ~8.3%
//      Score = (18-8.3)/18*100 = 54
// au: Ghibli ~$90k, Levante ~$95k, Grecale ~$92k
//     median ~$92k, min ~$79k, max ~$180k

// --- CUPRA ---
// km: Formentor ~255k, Born ~250k (EV), Leon ~260k, Ateca ~255k
//     avg ~255k
// cr: null (not sold in US)
// wc: What Car 2024 Cupra ~89%. (89-75)*4 = 56
// tuv: Formentor ~5.2%, Born ~5.8%, Leon ~5.0%, Ateca ~5.5%
//      avg ~5.4%. Score = (18-5.4)/18*100 = 70
// au: Formentor ~$38k, Born ~$42k, Leon ~$35k, Ateca ~$36k
//     median ~$38k, min ~$30k, max ~$48k

// --- ISUZU ---
// km: D-Max ~350k, MU-X ~320k (rugged diesels, extremely long-lived)
//     avg ~335k
// cr: null (not rated by CR, effectively absent from US market)
// wc: null (minimal UK survey presence)
// tuv: null (very few in Germany)
// au: D-Max ~$40k, MU-X ~$44k
//     median ~$42k, min ~$18k, max ~$68k

// --- INFINITI ---
// km: Q50 ~270k, Q60 ~265k, QX50 ~255k, QX60 ~260k, QX80 ~280k
//     avg ~266k
// cr: CR Dec 2025 lower-mid, score ~40
// wc: null (left UK/EU markets ~2020)
// tuv: null (left German market)
// au: null (left Australian market ~2020)

// --- CHRYSLER ---
// km: 300 ~270k, Pacifica ~250k
//     avg ~260k
// cr: CR Dec 2025 lower, score ~28
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: 300 ~$65k, Pacifica not commonly sold
//     median ~$65k, min ~$49k, max ~$75k

// --- DODGE ---
// km: Charger ~280k, Challenger ~275k, Durango ~270k, Hornet ~240k
//     avg ~266k
// cr: CR Dec 2025 lower, score ~30
// wc: null (not sold in UK)
// tuv: null (not sold in Germany)
// au: null (thin/grey-import market only)

// --- BYD ---
// km: Atto 3 ~220k (est), Dolphin ~220k, Seal ~225k, Han ~225k, Tang ~220k
//     avg ~222k (too new for reliable data, EV drivetrains should be durable
//     but unknown long-term; conservative estimate)
// cr: null (too new / not rated by CR)
// wc: null (too new for UK surveys)
// tuv: null (too new/too few inspections)
// au: Atto 3 ~$38k, Dolphin ~$32k, Seal ~$48k
//     median ~$38k, min ~$28k, max ~$55k

// --- GWM ---
// km: Cannon ~250k, Tank 300 ~240k, Haval H6 ~235k, Haval Jolion ~230k
//     avg ~239k
// cr: null (not sold in US)
// wc: null (minimal UK presence)
// tuv: null (not sold in Germany)
// au: Haval H6 ~$28k, Haval Jolion ~$24k, Cannon ~$36k, Tank 300 ~$41k
//     median ~$36k, min ~$18k, max ~$41k

// --- POLESTAR ---
// km: Polestar 2 ~250k, Polestar 3 ~250k (EV drivetrains)
//     avg ~250k
// cr: null (too low volume for CR rating)
// wc: What Car 2024 Polestar — small sample but surveyed ~82%. (82-75)*4 = 28
// tuv: Polestar 2 ~8.5% (high defect rate per early TÜV data, panel gaps/electronics)
//      Score = (18-8.5)/18*100 = 53
// au: null (very limited AU used market, too new)

// --- SSANGYONG ---
// km: Rexton ~260k, Musso ~270k, Korando ~240k, Tivoli ~235k
//     avg ~251k
// cr: null (not sold in US)
// wc: null (minimal UK survey data)
// tuv: Tivoli ~7.5%, Korando ~7.8%, Rexton ~8.0%, avg ~7.8%
//      Score = (18-7.8)/18*100 = 57
// au: Rexton ~$35k, Musso ~$38k, Korando ~$30k, Tivoli ~$28k
//     median ~$35k, min ~$28k, max ~$38k

// ============================================================
// DATA ARRAY
// ============================================================

export const BRANDS_AI = [
  { n: "Toyota",     r:"jp", km: 330000, cr: 74, wc: 64, tuv: 77, au: 32000, au_min: 22000, au_max: 55000 },
  { n: "Subaru",     r:"jp", km: 285000, cr: 80, wc: 56, tuv: null, au: 28000, au_min: 20000, au_max: 40000 },
  { n: "Lexus",      r:"jp", km: 316000, cr: 76, wc: 80, tuv: 83, au: 50000, au_min: 35000, au_max: 75000 },
  { n: "Honda",      r:"jp", km: 293000, cr: 66, wc: 60, tuv: 74, au: 29000, au_min: 22000, au_max: 42000 },
  { n: "Acura",      r:"jp", km: 289000, cr: 62, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "Nissan",     r:"jp", km: 262000, cr: 45, wc: 44, tuv: 67, au: 28000, au_min: 20000, au_max: 45000 },
  { n: "Kia",        r:"kr", km: 265000, cr: 63, wc: 68, tuv: 72, au: 28000, au_min: 18000, au_max: 45000 },
  { n: "Hyundai",    r:"kr", km: 255000, cr: 55, wc: 56, tuv: 72, au: 28000, au_min: 19000, au_max: 45000 },
  { n: "Mazda",      r:"jp", km: 275000, cr: 64, wc: 72, tuv: 78, au: 30000, au_min: 20000, au_max: 48000 },
  { n: "Suzuki",     r:"jp", km: 260000, cr: null, wc: 60, tuv: 72, au: 23000, au_min: 15000, au_max: 35000 },
  { n: "Mitsubishi", r:"jp", km: 273000, cr: 42, wc: null, tuv: 65, au: 27000, au_min: 18000, au_max: 40000 },
  { n: "Genesis",    r:"kr", km: 274000, cr: 60, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "BMW",        r:"eu", km: 276000, cr: 48, wc: 40, tuv: 72, au: 45000, au_min: 30000, au_max: 80000 },
  { n: "Porsche",    r:"eu", km: 258000, cr: 58, wc: 60, tuv: 78, au: 105000, au_min: 70000, au_max: 200000 },
  { n: "Mercedes",   r:"eu", km: 276000, cr: 40, wc: 28, tuv: 71, au: 50000, au_min: 32000, au_max: 90000 },
  { n: "Audi",       r:"eu", km: 271000, cr: 46, wc: 36, tuv: 73, au: 43000, au_min: 30000, au_max: 75000 },
  { n: "VW",         r:"eu", km: 266000, cr: 43, wc: 40, tuv: 73, au: 30000, au_min: 18000, au_max: 48000 },
  { n: "Volvo",      r:"eu", km: 267000, cr: 38, wc: 36, tuv: 70, au: 48000, au_min: 35000, au_max: 75000 },
  { n: "Mini",       r:"eu", km: 235000, cr: 35, wc: 32, tuv: 66, au: 30000, au_min: 22000, au_max: 42000 },
  { n: "Alfa Romeo", r:"eu", km: 225000, cr: 30, wc: 20, tuv: 57, au: 40000, au_min: 30000, au_max: 55000 },
  { n: "Skoda",      r:"eu", km: 277000, cr: null, wc: 76, tuv: 74, au: null, au_min: null, au_max: null },
  { n: "Fiat",       r:"eu", km: 224000, cr: 25, wc: 20, tuv: 60, au: null, au_min: null, au_max: null },
  { n: "Renault",    r:"eu", km: 236000, cr: null, wc: 44, tuv: 65, au: null, au_min: null, au_max: null },
  { n: "Dacia",      r:"eu", km: 223000, cr: null, wc: 52, tuv: 59, au: null, au_min: null, au_max: null },
  { n: "Land Rover", r:"eu", km: 236000, cr: 28, wc: 12, tuv: 53, au: 60000, au_min: 38000, au_max: 120000 },
  { n: "Jaguar",     r:"eu", km: 239000, cr: 32, wc: 16, tuv: 59, au: 45000, au_min: 32000, au_max: 65000 },
  { n: "Buick",      r:"us", km: 255000, cr: 61, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "Ford",       r:"us", km: 274000, cr: 39, wc: 32, tuv: 68, au: 35000, au_min: 18000, au_max: 58000 },
  { n: "Tesla",      r:"us", km: 248000, cr: 50, wc: 4,  tuv: 18, au: 47000, au_min: 35000, au_max: 65000 },
  { n: "Chevrolet",  r:"us", km: 271000, cr: 37, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "Lincoln",    r:"us", km: 258000, cr: 35, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "Cadillac",   r:"us", km: 261000, cr: 34, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "GMC",        r:"us", km: 274000, cr: 33, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "Jeep",       r:"us", km: 247000, cr: 26, wc: null, tuv: 48, au: null, au_min: null, au_max: null },
  { n: "Ram",        r:"us", km: 300000, cr: 22, wc: null, tuv: null, au: 60000, au_min: 48000, au_max: 80000 },
  { n: "Rivian",     r:"us", km: 250000, cr: 20, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "MG",         r:"cn", km: 228000, cr: null, wc: 24, tuv: null, au: 22000, au_min: 13000, au_max: 32000 },
  { n: "Peugeot",    r:"eu", km: 234000, cr: null, wc: 40, tuv: 66, au: null, au_min: null, au_max: null },
  { n: "Citroen",    r:"eu", km: 229000, cr: null, wc: 28, tuv: 61, au: null, au_min: null, au_max: null },
  { n: "Seat",       r:"eu", km: 253000, cr: null, wc: 68, tuv: 71, au: null, au_min: null, au_max: null },
  { n: "Opel",       r:"eu", km: 239000, cr: null, wc: 32, tuv: 66, au: null, au_min: null, au_max: null },
  { n: "DS",         r:"eu", km: 225000, cr: null, wc: 28, tuv: 61, au: null, au_min: null, au_max: null },
  { n: "Maserati",   r:"eu", km: 219000, cr: null, wc: null, tuv: 54, au: 92000, au_min: 79000, au_max: 180000 },
  { n: "Cupra",      r:"eu", km: 255000, cr: null, wc: 56, tuv: 70, au: 38000, au_min: 30000, au_max: 48000 },
  { n: "Isuzu",      r:"jp", km: 335000, cr: null, wc: null, tuv: null, au: 42000, au_min: 18000, au_max: 68000 },
  { n: "Infiniti",   r:"jp", km: 266000, cr: 40, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "Chrysler",   r:"us", km: 260000, cr: 28, wc: null, tuv: null, au: 65000, au_min: 49000, au_max: 75000 },
  { n: "Dodge",      r:"us", km: 266000, cr: 30, wc: null, tuv: null, au: null, au_min: null, au_max: null },
  { n: "BYD",        r:"cn", km: 222000, cr: null, wc: null, tuv: null, au: 38000, au_min: 28000, au_max: 55000 },
  { n: "GWM",        r:"cn", km: 239000, cr: null, wc: null, tuv: null, au: 36000, au_min: 18000, au_max: 41000 },
  { n: "Polestar",   r:"eu", km: 250000, cr: null, wc: 28, tuv: 53, au: null, au_min: null, au_max: null },
  { n: "SsangYong",  r:"kr", km: 251000, cr: null, wc: null, tuv: 57, au: 35000, au_min: 28000, au_max: 38000 },
];
