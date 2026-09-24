# Scroll film — footage sources & license manifest

Experiment: scroll-driven house build + walkthrough (renofy-website-scroll), v7.

**All footage is original AI-generated photorealistic content produced
specifically for this experiment.** No third-party video, no stock footage, no
license concerns — nothing here can be a copyright violation.

## Single-anchor backward-derivation method (v7)

Chained forward generation drifts — each stage re-imagines the house, so
scrolling reads as *different* houses. This build uses a single-anchor method:
one master **anchor** image is generated per zone (the finished state), and
every construction stage is derived *backward* from that same anchor image,
locked to the same camera angle, same lot, same daylight. That makes all
clips unmistakably the SAME house / SAME room.

Anchors (finished states; per-clip stills in `assets/scroll/stage-stills/`):
- **Anchor A — finished exterior** (`04-exterior.jpg`): modern-minimal
  two-storey detached house — clean geometric volumes, flat roof, white
  stucco, light-wood accents, floor-to-ceiling black-framed glass. Locked
  wide 3/4 view of the full house and lot. Stages 1–3 derived backward
  from it (windows/doors → framing → foundation).
- **Anchor B — finished great room** (`13-living.jpg`): light-oak floors,
  white walls, black-framed windows, stone fireplace, minimal furnishings.
  Stages 5–8 derived backward (interior doors → flooring → drywall →
  rough-ins).
- **Anchor C — finished kitchen** (`14-kitchen.jpg`): handleless matte-white
  cabinetry, quartz waterfall island, full-height quartz backsplash (NEVER
  tile — brand rule: quartz, quartzite, or natural stone only), slim black
  pendants, teal vase accent. Stage 9 derived backward (mid-installation:
  cabinets partly fitted, island on dollies being positioned, drop cloths).
- **Anchor D — finished bathroom** (`17-bathroom.jpg`): honed grey stone
  walls (natural stone only), freestanding white tub, floating light-oak
  vanity with stone vessel sink, frameless glass shower, black fixtures.
  Stage 10 derived backward (mid-installation: worker setting the
  film-wrapped tub, stone panels partly mounted, tools).
- **Stage 11 — finished exterior at dusk**: Anchor A house at dusk — warm
  interior glow, restrained landscape lighting, minimal landscaping. Same
  house, same camera, evening.

## Walkthrough chapter (clips 12–17)

After construction, the film steps inside the same finished house in walking
order: entry/foyer → living room (Anchor B) → kitchen (Anchor C) → dining
area → primary bedroom → bathroom (Anchor D). The three new finished rooms
were generated as separate anchors matched to the same material language:
light-oak floors, white walls, black-framed windows, bright natural daylight,
minimal furnishings. Each walkthrough clip uses locked-camera motion with
only a very slow, subtle push-in — geometry stays stable while daylight,
leaves, and sheer curtains shift.

## Clips in use (17)

Each clip is 1920×1080 H.264 (sources were 1152×768, upscaled with lanczos
and center-cropped to 16:9), muted, `+faststart`, keyframes every 0.5s
(`-g 12` at 24fps) for smooth scroll scrubbing, CRF 20–24, up to ~8–13MB
each for the busiest construction clips. Posters are 1920×1080 jpgs.

| File | Chapter | Notes |
|---|---|---|
| `01-foundation.mp4` | Build | Excavated lot, concrete footings/foundation walls, excavator, crew — Anchor A viewpoint |
| `02-framing.mp4` | Build | Wood-frame skeleton on the identical footprint — same camera/lot as Anchor A |
| `03-windows-doors.mp4` | Build | Black-framed windows and doors fitted — same house |
| `04-exterior.mp4` | Build | **Anchor A**: finished modern-minimal two-storey house, daylight |
| `05-roughins.mp4` | Build | Exposed studs with electrical, plumbing, HVAC — Anchor B great room |
| `06-drywall.mp4` | Build | Drywall hung, taped, mudded, lift on site — same great room |
| `07-flooring.mp4` | Build | Light-oak flooring half-laid, worker — same great room |
| `08-interior-doors.mp4` | Build | Interior doors being fitted, protective paper — same great room |
| `09-kitchen.mp4` | Build | Mid-install: island on dollies, cabinetry partly fitted — Anchor C kitchen. Quartz/quartzite/stone only; no tile. |
| `10-bathroom.mp4` | Build | Mid-install: worker setting the tub, stone panels — Anchor D bathroom. Stone surfaces only; no tile. |
| `11-backyard.mp4` | Build | Anchor A house at dusk: warm interior glow, landscape lighting |
| `12-entry.mp4` | Walkthrough | Finished foyer: floating oak bench, round mirror, glass entry door |
| `13-living.mp4` | Walkthrough | **Anchor B** finished great room, subtle push-in |
| `14-kitchen.mp4` | Walkthrough | **Anchor C** finished kitchen, subtle push-in |
| `15-dining.mp4` | Walkthrough | Finished dining area: oak table, sculptural pendant, garden windows |
| `16-bedroom.mp4` | Walkthrough | Finished primary bedroom: platform bed, garden glazing |
| `17-bathroom.mp4` | Walkthrough | **Anchor D** finished bathroom, subtle push-in |

## Removed content

- v2 flipbook frame directory: deleted.
- v3 third-party Mixkit clips + posters (5 files): deleted — never ship
  third-party footage in this experiment.
- v4/v5 chained-generation clips: replaced by the v6 anchor-derived set.
- v6 clips/stills (the earlier house design): replaced by the v7
  modern-minimal anchor-derived set.

## Staging provenance

Raw generated stills and uncompressed animation masters live outside the repo
(workspace staging). The repo carries only the final re-encoded 1080p clips,
posters, and per-clip still jpgs. Every file in `assets/scroll/clips/` and
`assets/scroll/stage-stills/` is original AI-generated content for this
experiment.
