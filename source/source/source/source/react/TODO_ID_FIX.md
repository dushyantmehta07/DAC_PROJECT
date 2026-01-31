# Product ID Fix - TODO List

## Task
Assign unique sequential IDs to each product across all categories without overlapping.

## Category ID Ranges
| Category | File | ID Range | Status |
|----------|------|----------|--------|
| Kurta (Women) | `src/Data/Kurta/kurta.js` | 1-50 | Pending |
| Dress | `src/Data/dress/page1.js` | 51-150 | Pending |
| Shoes | `src/Data/shoes.js` | 151-250 | Pending |
| Women Dress JSON | `src/Data/Women/women_dress.json` | 251-350 | Pending |
| Saree | `src/Data/Saree/page1.js` | 351-450 | Pending |
| Lehenga Choli | `src/Data/Saree/lenghaCholiPage2.js` | 451-550 | Pending |
| Lehengas | `src/Data/Women/Lehengas.js` | 551-600 | Pending |
| Women Top | `src/Data/Women/women_top.json` | 601-700 | Pending |
| NightSuits/Gowns | `src/Data/NightSuits/nightsuits.js` | 701-800 | Pending |
| Men Pants | `src/Data/pants/men_page1.js` | 801-900 | Pending |
| Men Kurta | `src/Data/Men/mensKurta.json` | 901-1000 | Pending |

## Steps Completed
- [x] Analyzed all product data files
- [x] Created ID range plan for each category
- [x] Got user confirmation to proceed

## Steps In Progress
- [ ] Update Kurta (Women) - kurta.js (1-50)
- [ ] Update Dress - page1.js (51-150)
- [ ] Update Shoes - shoes.js (151-250)
- [ ] Update Women Dress JSON - women_dress.json (251-350)
- [ ] Update Saree - page1.js (351-450)
- [ ] Update Lehenga Choli - lenghaCholiPage2.js (451-550)
- [ ] Update Lehengas - Lehengas.js (551-600)
- [ ] Update Women Top - women_top.json (601-700)
- [ ] Update NightSuits - nightsuits.js (701-800)
- [ ] Update Men Pants - men_page1.js (801-900)
- [ ] Update Men Kurta - mensKurta.json (901-1000)

## Notes
- Each product gets a unique sequential ID within its category
- No duplicate IDs across categories
- Fix invalid double "id" property issue in some files

