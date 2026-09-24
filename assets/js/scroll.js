/* ============ Renofy scroll film v8 ============
   TWO-PINNED-CHAPTER SCROLL-DRIVEN VIDEO.
   Chapter 1 — BUILD (~550vh pin, 11 clips): the v6 luxury two-storey
   (charcoal siding, brick accents, standing-seam metal roof), foundation →
   finished exterior, upscaled to 1080p.
   Chapter 2 — WALKTHROUGH (~300vh pin, 6 clips): step inside the same house —
   entry → living → kitchen → dining → bedroom → bathroom.
   All footage is original AI-generated photorealistic content produced for
   this experiment — no third-party video, no autoplay, no background
   playback: each clip stays paused and only its currentTime is scrubbed by
   scroll position. Pinned sticky sections; opacity crossfades between clips.
   SINGLE-ANCHOR METHOD: one master image per zone; every construction
   stage and walkthrough room derived from its anchor so all 17 clips show
   unmistakably the SAME house (see assets/scroll/SOURCES.md).
   MINIMAL UI: stage names only (no numbers, no counters), no cards, no
   descriptions, no text over the film beyond the name — plus one thin
   teal→copper progress bar, continuous across both chapters.
   FULL SCREEN: pinned video is 100vw x 100dvh, object-fit:cover —
   edge-to-edge on desktop and phone, zero black bars. The transparent
   fixed site header renders over the film; nothing shrinks the video area.
   STATS COUNT UP: the "by the numbers" strip animates 0 → final value once
   when it scrolls into view (ease-out, lands exactly on the final number).
   3. Subtle hero parallax (3 depth layers)
   4. Blur-to-sharp image reveals
   5. Stat count-up animation
   Dark-only. Native scroll, no hijacking. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rafQueued = false;
  var lastKey = '';

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function smooth(t) { t = clamp01(t); return t * t * (3 - 2 * t); }

  /* ================= 1. SCROLL-DRIVEN FILM (two chapters) ================= */
  // 17 clips — names are shown as a single minimal label, never numbered.
  var CLIPS = [
    { file: '01-foundation.mp4',     poster: '01-foundation.jpg',     name: 'Foundation' },
    { file: '02-framing.mp4',        poster: '02-framing.jpg',        name: 'Framing' },
    { file: '03-windows-doors.mp4',  poster: '03-windows-doors.jpg',  name: 'Windows & Doors' },
    { file: '04-exterior.mp4',       poster: '04-exterior.jpg',       name: 'Exterior' },
    { file: '05-roughins.mp4',       poster: '05-roughins.jpg',       name: 'Rough-Ins' },
    { file: '06-drywall.mp4',        poster: '06-drywall.jpg',        name: 'Drywall' },
    { file: '07-flooring.mp4',       poster: '07-flooring.jpg',       name: 'Flooring' },
    { file: '08-interior-doors.mp4', poster: '08-interior-doors.jpg', name: 'Interior Doors' },
    { file: '09-kitchen.mp4',        poster: '09-kitchen.jpg',        name: 'Kitchen' },
    { file: '10-bathroom.mp4',       poster: '10-bathroom.jpg',       name: 'Bathroom' },
    { file: '11-backyard.mp4',       poster: '11-backyard.jpg',       name: 'Backyard' },
    { file: '12-entry.mp4',          poster: '12-entry.jpg',          name: 'Entry' },
    { file: '13-living.mp4',         poster: '13-living.jpg',         name: 'Living Room' },
    { file: '14-kitchen.mp4',        poster: '14-kitchen.jpg',        name: 'Kitchen' },
    { file: '15-dining.mp4',         poster: '15-dining.jpg',         name: 'Dining Room' },
    { file: '16-bedroom.mp4',        poster: '16-bedroom.jpg',        name: 'Bedroom' },
    { file: '17-bathroom.mp4',       poster: '17-bathroom.jpg',       name: 'Bathroom' }
  ];
  var BUILD_N = 11;                  // chapter 1: clips 0..10
  var WALK_N = CLIPS.length - BUILD_N; // chapter 2: clips 11..16
  var CLIP_DIR = 'assets/scroll/clips/';
  var FADE = 0.05; // crossfade width in chapter-progress units

  var buildSec = document.getElementById('film-build');
  var walkSec = document.getElementById('film-walk');
  var buildFrames = document.getElementById('framesBuild');
  var walkFrames = document.getElementById('framesWalk');
  var bar = document.getElementById('filmProgress');
  var barFill = document.getElementById('filmProgressFill');
  var nameEl = document.getElementById('filmName');
  var lastName = '';

  var videos = [];   // HTMLVideoElement per clip (src set lazily), global index 0..16
  var currentClip = -1;

  function buildVideos() {
    var chapters = [
      { el: buildFrames, base: 0, n: BUILD_N },
      { el: walkFrames, base: BUILD_N, n: WALK_N }
    ];
    chapters.forEach(function (ch) {
      for (var i = 0; i < ch.n; i++) {
        (function (idx) {
          var v = document.createElement('video');
          v.muted = true;
          v.setAttribute('muted', '');
          v.setAttribute('playsinline', '');
          v.setAttribute('webkit-playsinline', '');
          v.preload = 'metadata';
          v.disablePictureInPicture = true;
          v.setAttribute('disablepictureinpicture', '');
          v.setAttribute('aria-hidden', 'true');
          v.tabIndex = -1;
          v.poster = CLIP_DIR + CLIPS[idx].poster;
          v.dataset.src = CLIP_DIR + CLIPS[idx].file;
          // never play on its own — this film moves only with scroll
          v.addEventListener('play', function () { v.pause(); });
          ch.el.appendChild(v);
          videos[idx] = v;
        })(ch.base + i);
      }
    });
  }

  // progressive loading: only the active clip and its neighbours hold data
  function ensureSrc(i) {
    if (i < 0 || i >= CLIPS.length) return;
    var v = videos[i];
    if (v && !v.getAttribute('src')) {
      v.src = v.dataset.src;
      v.preload = 'auto';
      v.load();
    }
  }
  function releaseFarClips(a) {
    for (var i = 0; i < CLIPS.length; i++) {
      if (Math.abs(i - a) > 1 && videos[i] && videos[i].getAttribute('src')) {
        videos[i].removeAttribute('src');
        videos[i].preload = 'metadata';
        videos[i].load();
      }
    }
  }

  function setActive(a) {
    if (a === currentClip) return;
    currentClip = a;
    ensureSrc(a - 1);
    ensureSrc(a);
    ensureSrc(a + 1);
    releaseFarClips(a);
  }

  function chapterProgress(sec) {
    if (!sec) return 0;
    var vh = window.innerHeight;
    var top = sec.offsetTop;
    var scrollable = sec.offsetHeight - vh;
    return scrollable > 0 ? clamp01((window.scrollY - top) / scrollable) : 0;
  }

  function scrubTo(v, t) {
    if (!v || !v.duration || isNaN(v.duration)) return;
    t = Math.min(Math.max(t, 0), Math.max(v.duration - 0.05, 0));
    if (Math.abs((v.currentTime || 0) - t) > 1 / 30) {
      try { v.currentTime = t; } catch (e) { /* not ready yet */ }
    }
  }

  // Opacity comes purely from each clip's scroll window. Windows overlap by
  // FADE centred on each boundary, so one clip ramps out while the next
  // ramps in — a true crossfade with no state machine and no pops.
  function updateChapter(p, base, n) {
    for (var i = 0; i < n; i++) {
      var v = videos[base + i];
      if (!v) continue;
      var start = i / n;
      var end = (i + 1) / n;
      var half = FADE / 2;
      var wStart = (i === 0) ? start : start - half;
      var wEnd = (i === n - 1) ? end : end + half;
      var op = 0;
      if (p >= wStart && p <= wEnd) {
        op = 1;
        // fade in across the overlap with the previous clip (not on clip 0)
        if (i > 0 && p < start + half) op = smooth((p - wStart) / FADE);
        // fade out across the overlap with the next clip (not on last clip)
        else if (i < n - 1 && p > end - half) op = 1 - smooth((p - (end - half)) / FADE);
      }
      v.style.opacity = op.toFixed(3);
      // scrub every clip that holds data and could be visible; the poster
      // frame covers the moment before data arrives
      if (op > 0.001 && v.getAttribute('src') && v.readyState >= 1) {
        scrubTo(v, clamp01((p - start) / (end - start)) * v.duration);
      }
    }
  }

  function updateFilm() {
    if (!buildSec || !walkSec) return;
    var p1 = chapterProgress(buildSec);
    var p2 = chapterProgress(walkSec);
    var key = p1.toFixed(4) + '|' + p2.toFixed(4);
    if (key === lastKey) return;
    lastKey = key;

    updateChapter(p1, 0, BUILD_N);
    updateChapter(p2, BUILD_N, WALK_N);

    // the walkthrough owns the viewport once its section starts
    var inWalk = (window.scrollY + window.innerHeight / 2) >= walkSec.offsetTop;
    var a = inWalk
      ? BUILD_N + Math.min(WALK_N - 1, Math.floor(p2 * WALK_N))
      : Math.min(BUILD_N - 1, Math.floor(p1 * BUILD_N));
    setActive(a);

    // one continuous progress bar across both chapters
    var g = (p1 * BUILD_N + p2 * WALK_N) / CLIPS.length;
    if (barFill) barFill.style.width = (g * 100).toFixed(2) + '%';
    // current stage/room name — minimal label, never numbered
    var nm = CLIPS[a] ? CLIPS[a].name : '';
    if (nm !== lastName) {
      lastName = nm;
      if (nameEl) nameEl.textContent = nm;
    }
    if (bar) {
      var y = window.scrollY;
      var vh = window.innerHeight;
      var on = y > buildSec.offsetTop - vh &&
               y < walkSec.offsetTop + walkSec.offsetHeight;
      bar.classList.toggle('on', on);
      if (nameEl) nameEl.classList.toggle('on', on);
    }
  }

  /* ================= 3. HERO PARALLAX (subtle, 3 layers) ================= */
  var hero = document.querySelector('.hero');
  var heroBg = document.querySelector('.hero-bg');
  var heroInner = document.querySelector('.hero-inner');
  var heroCtas = document.querySelector('.hero-ctas');

  function updateParallax() {
    if (!hero || reduceMotion) return;
    var y = window.scrollY;
    var limit = hero.offsetHeight;
    if (y < 0 || y > limit * 1.2) return;
    if (heroBg) heroBg.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)';
    if (heroInner) heroInner.style.transform = 'translate3d(0,' + (y * 0.1).toFixed(1) + 'px,0)';
    if (heroCtas) heroCtas.style.transform = 'translate3d(0,' + (y * 0.06).toFixed(1) + 'px,0)';
  }

  /* ================= 4. BLUR-TO-SHARP ================= */
  function initBlurSharp() {
    var imgs = document.querySelectorAll('.ph img, .svc-hero-img img');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      return; // leave images sharp
    }
    imgs.forEach(function (img) { img.classList.add('b2s'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('inview');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    imgs.forEach(function (img) { io.observe(img); });
  }

  /* ================= 5. STAT COUNT-UP (once, ease-out, exact final) ================= */
  function initStatCount() {
    var nums = document.querySelectorAll('.stat-num');
    if (!nums.length || reduceMotion || !('IntersectionObserver' in window)) return;
    var items = [];
    nums.forEach(function (el) {
      var m = el.textContent.trim().match(/^([\d.]+)(.*)$/);
      if (!m) return;
      var dec = (m[1].split('.')[1] || '').length;
      var it = { el: el, val: parseFloat(m[1]), dec: dec, suffix: m[2] || '' };
      it.el.textContent = (0).toFixed(dec) + it.suffix;
      items.push(it);
    });
    if (!items.length) return;
    var started = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || started) return;
        started = true;
        io.disconnect();
        var DUR = 1600;
        var t0 = performance.now();
        (function tick(now) {
          var t = Math.min((now - t0) / DUR, 1);
          var ez = 1 - Math.pow(1 - t, 3);
          items.forEach(function (p) {
            p.el.textContent = (t >= 1 ? p.val : p.val * ez).toFixed(p.dec) + p.suffix;
          });
          if (t < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.4 });
    io.observe(nums[0].closest('.stats-grid') || nums[0]);
  }

  /* ================= main loop ================= */
  // Plain rAF-throttled scroll handling. (requestVideoFrameCallback was tried
  // and dropped: it does not fire reliably for paused videos, which stalled
  // the first scrolls.)
  function onScroll() {
    if (rafQueued) return;
    rafQueued = true;
    window.requestAnimationFrame(function () {
      rafQueued = false;
      updateFilm();
      updateParallax();
    });
  }

  function init() {
    initBlurSharp();
    initStatCount();
    if (reduceMotion) {
      // static: the final finished room, full-bleed, no scrubbing
      if (walkFrames) {
        var img = document.createElement('img');
        img.src = CLIP_DIR + CLIPS[CLIPS.length - 1].poster;
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.style.cssText = 'position:absolute;inset:0;width:100vw;height:100vh;height:100svh;height:100dvh;max-width:none;object-fit:cover;display:block;margin:0;padding:0';
        walkFrames.appendChild(img);
      }
      if (barFill) barFill.style.width = '100%';
      if (bar) bar.classList.add('on');
      if (nameEl) {
        nameEl.textContent = CLIPS[CLIPS.length - 1].name;
        nameEl.classList.add('on');
      }
      return;
    }
    if (!buildSec || !walkSec || !buildFrames || !walkFrames) return;
    buildVideos();
    setActive(0);
    lastKey = '';
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
