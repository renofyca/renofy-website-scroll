# Scroll-build film — footage sources & license manifest

Experiment: scroll-driven whole-house build (renofy-website-scroll), v4.

**All footage is original AI-generated photorealistic content produced
specifically for this experiment.** No third-party video, no stock footage, no
license concerns — nothing here can be a copyright violation.

## Clips in use (6)

Each clip is 720p H.264, muted, `+faststart`, keyframes every 0.5s (for smooth
scroll scrubbing), ~2.7–3.9MB each. Total: ~20MB video + ~1MB posters.

| File | Duration | Stage | Notes |
|---|---|---|---|
| `01-foundation.mp4` | 10s | 1 Foundation | Excavated lot, concrete footings/foundation walls being poured and levelled, mixer truck, workers |
| `02-framing.mp4` | 10s | 2 Framing | Wood-frame skeleton of the two-storey house rising from the foundation, framing crew |
| `03-windows-doors.mp4` | 10s | 3 Windows & Doors | Windows and entry door fitted into framed openings, house wrap going up |
| `04-exterior.mp4` | 10s | 4 Exterior Finish | Siding, brick accents, complete roof, landscaping in progress — modern luxury curb appeal |
| `05-roughins.mp4` | 10s | 5 Interior Rough-ins | Camera glides through the front entry; exposed studs with electrical, plumbing, HVAC |
| `06-drywall.mp4` | 10s | 6 Drywall & Plaster | Drywall hung, taped, mudded and sanded smooth |
| `07-flooring.mp4` | 10s | 7 Flooring | Wide-plank hardwood laid across the main floor |
| `08-interior-doors.mp4` | 10s | 8 Interior Doors | Doors hung with trim and casing |

Continuity: stage 1 was generated first; each subsequent stage was chained from
the previous stage's generation snapshot so the same house evolves with a
consistent viewpoint. Stages 1–4 share the locked exterior 3/4 view; stage 5
moves through the front entry into the interior.

## Ungenerated stages (9–11)

Kitchen Installation, Bathroom Installations, and Backyard Reveal were NOT
generated: the video generation pipeline became unavailable after stage 8
(2026-09-24). The chain can be resumed exactly where it stopped — pass this
snapshot id to continue from the stage-8 generation context:

`62f09ccf-1fcf-47a7-8d60-457d2fea0d46:zbqbgp`

Brand rules for when stages 9–10 are generated: kitchen and bathroom surfaces
are quartz/quartzite/natural stone ONLY — never tile backsplashes.

## Removed

- v3's 5 Mixkit stock clips (01-framing, 02-glazing, 03-flooring, 04-millwork,
  05-dusk, mp4 + jpg) — deleted 2026-09-24 per the no-third-party-video rule.
- v2's AI frame sequence (assets/scroll/frames/) — deleted 2026-09-24, dead weight.
