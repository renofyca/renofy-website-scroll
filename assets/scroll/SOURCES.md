# Scroll film — footage sources & license manifest

Experiment: scroll-driven house build + walkthrough (renofy-website-scroll), v8.

**All footage is original AI-generated photorealistic content produced
specifically for this experiment.** No third-party video, no stock footage, no
license concerns — nothing here can be a copyright violation.

## v8: the v6 house is back

Per Varun's direction, v8 restores the **v6 modern-luxury two-storey house**
(charcoal siding, brick accents, standing-seam metal roof) for the 11-stage
build film, keeping the v7 treatment: 1080p, minimal UI (no stage numbers,
names, cards, or captions — only the thin teal→copper progress bar),
full-bleed full-screen video (100vw × 100dvh, object-fit:cover, zero black
bars on desktop and phone), native scroll-driven scrubbing, crossfades,
progressive loading, and a reduced-motion static fallback.

The 11 build clips are the original v6 anchor-consistent clips
(`01-foundation` → `11-backyard`), upscaled from 1280×720 to 1920×1080
(H.264, CRF 20, `-g 12`, `+faststart`, no audio). Single-anchor method: one
master anchor image per zone (finished exterior, great room, kitchen,
bathroom); every construction stage was derived backward from its anchor,
locked to the same camera angle, same lot, same daylight — all 11 clips show
unmistakably the SAME house.

Anchors (finished states, v6):
- **Anchor A — finished exterior** (`04-exterior.jpg`): modern-luxury
  two-storey detached house — charcoal siding, brick accents, standing-seam
  metal roof, black-framed windows. Locked wide 3/4 view of the full house
  and lot.
- **Anchor B — finished great room** (`13-living.jpg`): light-oak floors,
  white walls, black-framed windows and French doors, stone fireplace,
  coffered ceiling, teal/copper accents.
- **Anchor C — finished kitchen** (`14-kitchen.jpg`): dark charcoal shaker
  cabinetry, quartz waterfall island, full-height QUARTZ backsplash (NEVER
  tile — brand rule: quartz, quartzite, or natural stone only), copper
  pendants, teal stools.
- **Anchor D — finished bathroom** (`17-bathroom.jpg`): stone spa surfaces
  (natural stone only — no tile), freestanding tub, floating oak vanity,
  frameless glass shower, brass fixtures, garden glazing.
- **Stage 11 — finished exterior at dusk**: Anchor A house at dusk — warm
  interior glow, landscape lighting. Same house, same camera, evening.

## Walkthrough chapter (clips 12–17) — new for v8

After construction, the film steps inside the SAME finished v6 house in
walking order: entry/foyer → living room (Anchor B) → kitchen (Anchor C) →
dining area → primary bedroom → bathroom (Anchor D). The three new rooms
(entry, dining, bedroom) were generated as fresh anchors matched to the v6
material language: light-oak floors, white walls, black-framed glass,
coffered ceiling, stone fireplace glimpses, teal/copper accents, bright
natural daylight. Each walkthrough clip uses locked-camera motion with only
a very slow, subtle push-in — geometry stays stable, photorealistic, no
warping, no CGI look. Midframes were spot-checked for consistency before
encoding.

## Clips in use (17)

Build chapter (~550vh pin): 11 clips. Walkthrough chapter (~300vh pin):
6 clips. Every clip is 1920×1080 H.264, 24fps, 10s, CRF 20, keyframes every
0.5s (`-g 12`) for smooth scroll scrubbing, `+faststart`, no audio. Posters
are 1920×1080 jpgs pulled from each clip's midframe.

| File | Chapter | Notes |
|---|---|---|
| `01-foundation.mp4` | Build | Excavated lot, concrete footings/foundation walls, excavator, crew — v6 house viewpoint |
| `02-framing.mp4` | Build | Wood-frame skeleton on the identical footprint — same camera/lot |
| `03-windows-doors.mp4` | Build | Black-framed windows and doors fitted — same house |
| `04-exterior.mp4` | Build | **Anchor A**: finished v6 luxury two-storey, daylight |
| `05-roughins.mp4` | Build | Exposed studs with electrical, plumbing, HVAC — Anchor B great room |
| `06-drywall.mp4` | Build | Drywall hung, taped, mudded, lift on site — same great room |
| `07-flooring.mp4` | Build | Light-oak flooring half-laid, worker — same great room |
| `08-interior-doors.mp4` | Build | Interior doors being fitted, protective paper — same great room |
| `09-kitchen.mp4` | Build | Finished v6 kitchen — Anchor C. Quartz/quartzite/stone only; no tile. |
| `10-bathroom.mp4` | Build | Finished v6 bathroom — Anchor D. Stone surfaces only; no tile. |
| `11-backyard.mp4` | Build | Anchor A house at dusk: warm interior glow, landscape lighting |
| `12-entry.mp4` | Walkthrough | Finished foyer: black-framed glass double door, coffered ceiling, glimpse of stone fireplace great room |
| `13-living.mp4` | Walkthrough | **Anchor B** finished great room, subtle push-in |
| `14-kitchen.mp4` | Walkthrough | **Anchor C** finished kitchen, subtle push-in |
| `15-dining.mp4` | Walkthrough | Finished dining area: oak table, teal chairs, copper pendant, garden windows, fireplace view |
| `16-bedroom.mp4` | Walkthrough | Finished primary bedroom: black-framed balcony doors, teal throw, copper lamps |
| `17-bathroom.mp4` | Walkthrough | **Anchor D** finished bathroom, subtle push-in |

## Full-screen & UI notes (v8)

- Pinned video is `100vw × 100dvh` (`object-fit:cover`), pin height targets
  `100dvh` with `100svh`/`100vh` fallbacks — edge-to-edge on desktop and
  phone (iOS Safari: `100vh` includes the toolbar, so `100dvh` is the real
  target). Zero padding/margin/max-width on the chapter, pin, and frames;
  `body{overflow-x:hidden}` prevents any horizontal overflow from `100vw`.
- The transparent fixed site header renders OVER the film; header, toast,
  and back-to-top are fixed overlays that never shrink the video area.
- Minimal UI: no stage numbers, counters, names, cards, or captions over
  the film — only the thin teal→copper progress bar.
- The "Renofy by the numbers" stat strip is now STATIC text
  (250+ projects completed · 12 years crafting homes · 4.9★ average rating,
  read from the old `data-count` targets). The scroll-driven speedometer
  counters were removed — they showed shifting/nonsense mid-scroll values
  (e.g. "2.3★ average rating").

## Removed content

- v2 flipbook frame directory: deleted.
- v3 third-party Mixkit clips + posters (5 files): deleted — never ship
  third-party footage in this experiment.
- v4/v5 chained-generation clips: replaced by the v6 anchor-derived set.
- v7 build + walkthrough clips (the modern-minimal house): replaced by the
  v8 set (v6 house restored, new v6-identity walkthrough). The v7 minimal
  house was rejected by Varun: "Previous one is better let's switch back."

## Staging provenance

Raw generated stills and uncompressed animation masters live outside the repo
(workspace staging). The repo carries only the final re-encoded 1080p clips
and posters. Every file in `assets/scroll/clips/` is original AI-generated
content for this experiment.
