# Slike projekata (airports)

## Struktura

- **Glavna (hero) slika** – u root-u ovog foldera, po jedan fajl po projektu:
  - `{slug}.jpg` (npr. `kishinev.jpg`, `goma.jpg`)
  - ili custom ime ako je u `projectData` drugačije (npr. `Saint Louis Airport.jpg`)

- **Podslike za stranicu projekta** – jedan podfolder po projektu, ime = **slug** projekta (kao u URL-u `/projects/{slug}`):

```
airports/
  kishinev.jpg              ← hero (glavna na kartici i na vrhu stranice)
  kishinev/
    description.jpg         ← slika u sekciji „Description“
    gallery-1.jpg           ← prva slika u galeriji (polovina širine)
    gallery-2.jpg           ← druga slika u galeriji (polovina širine)
    gallery-3.jpg           ← treća slika u galeriji (puna širina)
  goma.jpg
  goma/
    description.jpg
    gallery-1.jpg
    gallery-2.jpg
    gallery-3.jpg
  saint-louis/
    description.jpg
    gallery-1.jpg
    gallery-2.jpg
    gallery-3.jpg
  … (isti obrazac za nis, belgrade, vrsac, krusevac, krusevac-rosulje,
     ouro-sogui, pancevo, lisiciji-jarak, kopaonik, mup, morava,
     matam, batajnica, ponikve, ladjevci, sombor, pristina)
```

## Slug-ovi projekata

Ovi slug-ovi odgovaraju folderima za podslike:  
`kishinev`, `goma`, `matam`, `saint-louis`, `nis`, `belgrade`, `vrsac`, `krusevac`, `krusevac-rosulje`, `ouro-sogui`, `pancevo`, `lisiciji-jarak`, `kopaonik`, `mup`, `morava`, `batajnica`, `ponikve`, `ladjevci`, `sombor`, `pristina`.

## Formati

- Dozvoljeni formati: `.jpg`, `.jpeg`, `.png`, `.webp`
- Ako koristiš drugačiju ekstenziju, promeni u `projectData.ts` putanju (npr. `description.png`).
