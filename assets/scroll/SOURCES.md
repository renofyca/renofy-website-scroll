# Scroll-build film — footage sources & license manifest

Experiment: scroll-driven whole-house build (renofy-website-scroll), v6.

**All footage is original AI-generated photorealistic content produced
specifically for this experiment.** No third-party video, no stock footage, no
license concerns — nothing here can be a copyright violation.

## Single-anchor backward-derivation method (v6)

v4/v5's chained forward generation drifted — each stage re-imagined the house,
so scrolling read as *different* houses. v6 fixes this with a single-anchor
method: one master **anchor** image is generated per zone (the finished state),
and every construction stage is derived *backward* from that same anchor image,
locked to the same camera angle, same lot, same daylight. That makes all stages
unmistakably the SAME house / SAME room.

Anchors (in `assets/scroll/stage-stills/` sources; jpgs kept per stage):
- **Anchor A — finished exterior** (`stage4-exterior.jpg`): modern luxury
  two-storey detached house, locked 3/4 street view. Stages 1–3 derived
  backward from it (finished → windows/doors → framing → foundation).
- **Anchor B — finished great room**: hardwood floors, stone fireplace,
  black-framed windows and French doors, coffered ceiling. Stages 5–8 derived
  backward from it (doors/trim → flooring → drywall → rough-ins).
- **Anchor C — finished kitchen**: dark charcoal shaker cabinetry, quartz
  waterfall island, full-height quartz backsplash (NEVER tile — brand rule),
  copper pendants, teal accents. Stage 9 derived backward (mid-installation:
  cabinets partly fitted, island being positioned on dollies, drop cloths).
- **Anchor D — finished bathroom**: spa-grade natural-stone surfaces, glass
  shower, freestanding tub. Stage 10 derived backward (mid-installation:
  worker setting the tub, vanities partly fitted, protective sheeting).
- **Stage 11 — backyard reveal**: Anchor A viewpoint at dusk — finished
  landscaping, stone patio, landscape lighting, house glowing from inside.
  Same house, same camera, evening.

Each stage still was then animated into a ~10s clip with subtle locked-camera
time-lapse motion (workers moving, clouds drifting, dust, light shifting —
camera does not move), photorealistic documentary style, no CGI look.

## Clips in use (11)

Each clip is 1280×720 H.264, muted, `+faststart`, keyframes every 0.5s
(`-g 12` at 24fps) for smooth scroll scrubbing, ~3.1–3.4MB each.
Total: ~36MB video + ~1.5MB posters.

| File | Duration | Stage | Notes |
|---|---|---|---|
| `01-foundation.mp4` | 10s | 1 Foundation | Excavated lot, concrete footings/foundation walls, excavator, crew — Anchor A viewpoint |
| `02-framing.mp4` | 10s | 2 Framing | Wood-frame skeleton on the identical footprint — same camera/lot as Anchor A |
| `03-windows-doors.mp4` | 10s | 3 Windows & Doors | Windows and entry door fitted, house wrap — same house |
| `04-exterior.mp4` | 10s | 4 Exterior Finish | **Anchor A**: finished modern luxury two-storey detached house, landscaping |
| `05-roughins.mp4` | 10s | 5 Interior Rough-ins | Exposed studs with electrical, plumbing, HVAC — Anchor B great room |
| `06-drywall.mp4` | 10s | 6 Drywall & Plaster | Drywall hung, taped, mudded, sanding in progress — same great room |
| `07-flooring.mp4` | 10s | 7 Flooring | Wide-plank hardwood half-laid, worker — same great room |
| `08-interior-doors.mp4` | 10s | 8 Interior Doors | Doors hung with crisp trim and casing — same great room |
| `09-kitchen.mp4` | 10s | 9 Kitchen Installation | Mid-install: island on dollies being positioned, dark cabinetry, full-height quartz backsplash, copper pendants, teal chairs — Anchor C kitchen. Quartz/quartzite/stone only; no tile. |
| `10-bathroom.mp4` | 10s | 10 Bathroom Installations | Mid-install: worker setting the tub, stone vanities, glass shower, drop cloths — Anchor D bathroom. Stone surfaces only; no tile. |
| `11-backyard.mp4` | 10s | 11 Backyard Reveal | Anchor A house at dusk: stone patio, landscape lighting, warm interior glow — the finished home, revealed. |

## Removed content

- v2 flipbook frame directory: deleted.
- v3 third-party Mixkit clips + posters (5 files): deleted — never ship
  third-party footage in this experiment.
- v4/v5 chained-generation clips: replaced by the v6 anchor-derived set.

## Staging provenance

Raw generated stills and uncompressed animation masters live outside the repo
(workspace staging). The repo carries only the final re-encoded 720p clips,
posters, and per-stage still jpgs. Every file in `assets/scroll/clips/` and
`assets/scroll/stage-stills/` is original AI-generated content for this
experiment.
