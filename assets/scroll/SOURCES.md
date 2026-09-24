# Scroll-build film — footage sources & license manifest

Experiment: scroll-driven whole-house build (renofy-website-scroll).
All clips are **real stock footage** (no AI-generated video). Each clip is
720p H.264, muted, `+faststart`, keyframes ~every 0.5s.

## Clips in use (5)

| File | Source | Mixkit page | License signal (page JSON-LD `copyrightNotice`) |
|---|---|---|---|
| `01-framing.mp4` (9.0s) | Mixkit video 1459 — "Construction workers at a house under construction" | https://mixkit.co/free-stock-video/construction-workers-at-a-house-under-construction-1459/ | "Free" → Mixkit Video Free License (commercial OK, no attribution required) |
| `02-glazing.mp4` (10.3s) | Mixkit video 3090 — "Modern living room with wooden furniture" | https://mixkit.co/free-stock-video/modern-living-room-with-wooden-furniture-3090/ | "Free" → Mixkit Video Free License |
| `03-flooring.mp4` (8.0s) | Mixkit video 34496 — "Detailed tour of the surface of a wooden board" | https://mixkit.co/free-stock-video/detailed-tour-of-the-surface-of-a-wooden-board-34496/ | "Free" → Mixkit Video Free License |
| `04-millwork.mp4` (12.0s, trimmed from 27s) | Mixkit video 771 — "A carpenter working at his workshop" | https://mixkit.co/free-stock-video/a-carpenter-working-at-his-workshop-771/ | "Free" → Mixkit Video Free License |
| `05-dusk.mp4` (10.5s) | Mixkit video 3971 — "Sunset behind a building under construction" | https://mixkit.co/free-stock-video/sunset-behind-a-building-under-construction-3971/ | "Free" → Mixkit Video Free License |

Total weight: ~10.6 MB video + ~0.4 MB posters ≈ 11 MB (target was < 25 MB).

Mixkit's license (https://mixkit.co/license/): videos under the **Mixkit Video
Free License** may be used in commercial projects (YouTube, marketing, websites)
with no attribution required. Videos under the **Mixkit Video Restricted
License** are non-commercial only.

## IMPORTANT: clips rejected on license grounds (do NOT use)

The following visually-suitable clips carry `"copyrightNotice":"Mixkit
Restricted License"` in their page JSON-LD and were **excluded** — a business
website is commercial use:

- 14729 "Working with concrete" (foundation pour) — RESTRICTED
- 49024 "Plumber checking installations" (rough-ins) — RESTRICTED
- 8603 "Aerial view of manor house" (backyard reveal) — RESTRICTED
- 9686, 25480, 31450, 27543, 49188, 49192, 31473, 30431, 46753, 16056, 23696,
  23511, 32296, 47286, 32613, 22017, 23529 — all RESTRICTED

Note: each of these pages' JSON-LD also contains `"license":
"https://mixkit.co/license/#videoFree"`, which contradicts the
`copyrightNotice`. The explicit "Mixkit Restricted License" notice was treated
as governing (fail closed). **Worth re-verifying in a live browser**: if the
license badge next to the download button actually reads "Free License" for
14729 / 49024 / 8603, those three clips (foundation pour, plumber rough-in,
manor-house dusk aerial) would fill the biggest footage gaps below.

## Footage gaps (stages with weak coverage)

- Stage 5 Interior Rough-ins + Stage 6 Drywall & Plaster → currently share the
  wood-flooring clip (03). Want: real plumbing/electrical/drywall footage.
- Stage 9 Kitchen Installation → currently shares the carpenter clip (04).
  Want: real kitchen installation or stone kitchen (NO tile backsplash — brand rule).
- Stage 10 Bathroom Installations → currently shares the dusk clip (05).
  Want: real bathroom installation / stone bathroom.
- Stage 1 Foundation → shares the framing clip (01). The Mixkit 14729
  foundation-pour clip would be ideal if its license verifies as Free.
- Stage 11 Backyard Reveal → shares the dusk-construction clip (05). The
  Mixkit 8603 manor aerial would be ideal if its license verifies as Free.

Suggested Pexels replacements (Pexels License = free commercial use, no
Restricted tier; download via live browser — direct curl was Cloudflare/rate
limited during research):

- Foundation: https://www.pexels.com/video/concrete-pouring-at-construction-site-34289833/
  (21s, 1920×1080, workers pouring/levelling a concrete foundation)
- Framing (alt): https://www.pexels.com/video/skilled-workers-constructing-a-wooden-frame-house-31025072/
  (14s, 3840×2160, wood-frame house)
- Kitchen: https://www.pexels.com/video/modern-kitchen-installation-with-ladder-34572332/
  (6s, 3840×2160, kitchen under renovation — verify no tile backsplash)
- Bathroom / Backyard / Drywall: search pexels.com in a live browser
  ("modern bathroom interior stone", "luxury house backyard dusk",
  "drywall installation") and pick real, non-AI clips.

## Rejected for brand/content reasons

- Mixkit 43033 "Interior view of a spacious modern kitchen" — Free license, but
  shows a **subway-tile backsplash** → violates the Renofy stone-only rule.
- Mixkit 9686 / 25480 / 4010 / 42333 — commercial high-rise/steel construction,
  wrong scale for a detached luxury home.
- Coverr — video file URLs are JS-gated (curl only exposes AI-generated
  placeholder MP4s); skipped.
- Pexels `content.pexels.com/aigc-bundle/…` renditions — AI-generated, rejected
  per the no-AI rule.
