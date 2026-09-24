/* ============ Renofy scroll-effects experiment v4 ============
   SCROLL-DRIVEN VIDEO. All footage is original AI-generated photorealistic
   content produced for this experiment — no third-party video, no autoplay,
   no background playback: each clip stays paused and only its currentTime is
   scrubbed by scroll position. Pinned sticky section; opacity crossfades
   between clips so the whole pin reads as one continuous build.
   2. Scroll-driven stat counters (speedometer-style)
   3. Subtle hero parallax (3 depth layers)
   4. Blur-to-sharp image reveals
   Dark-only. Native scroll, no hijacking. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rafQueued = false;
  var lastP = -1;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function smooth(t) { t = clamp01(t); return t * t * (3 - 2 * t); }

  /* ================= 1. SCROLL-DRIVEN BUILD FILM ================= */
  // 6 stages, one original AI-generated photorealistic clip each, chained so
  // the same house evolves continuously. Stages 7-11 (flooring, interior
  // doors, kitchen, bathrooms, backyard) are ungenerated — the video pipeline
  // went down after stage 6; see assets/scroll/SOURCES.md for the resume
  // snapshot so the chain can be continued exactly where it stopped.
  var STAGES = [
    'Foundation|Excavation, footings and foundation walls — where every Renofy home begins.',
    'Framing|The full wood-frame skeleton of a two-storey detached home rises.',
    'Windows & Doors|Every opening filled — the envelope takes shape.',
    'Exterior Finish|Siding, brick accents and a complete roof. Modern luxury curb appeal.',
    'Interior Rough-ins|Inside the studs: electrical, plumbing and HVAC run with precision.',
    'Drywall & Plaster|Walls go up — hung, taped, mudded and sanded perfectly smooth.'
  ];
  // first/last = stage indices this clip covers (1:1 here). All footage is
  // original AI-generated content for this experiment — see SOURCES.md.
  var CLIPS = [
    { file: '01-foundation.mp4',   poster: '01-foundation.jpg',   first: 0, last: 0 },
    { file: '02-framing.mp4',      poster: '02-framing.jpg',      first: 1, last: 1 },
    { file: '03-windows-doors.mp4', poster: '03-windows-doors.jpg', first: 2, last: 2 },
    { file: '04-exterior.mp4',     poster: '04-exterior.jpg',     first: 3, last: 3 },
    { file: '05-roughins.mp4',     poster: '05-roughins.jpg',     first: 4, last: 4 },
    { file: '06-drywall.mp4',      poster: '06-drywall.jpg',      first: 5, last: 5 }
  ];
  var CLIP_DIR = 'assets/scroll/clips/';
  var NCLIP = CLIPS.length;
  var NSTAGE = STAGES.length;
  var FADE_P = 0.05; // crossfade width in pin-progress units (~half a stage)

  var fbSection = document.getElementById('renovation-flipbook');
  var fbFrames = document.getElementById('fbFrames');
  var fbNum = document.getElementById('fbNum');
  var fbBar = document.getElementById('fbBar');
  var fbStageNum = document.getElementById('fbStageNum');
  var fbStageName = document.getElementById('fbStageName');
  var fbStageDesc = document.getElementById('fbStageDesc');

  var videos = [];   // HTMLVideoElement per clip (src set lazily)
  var currentStage = -1;

  function clipForStage(s) {
    for (var c = 0; c < NCLIP; c++) {
      if (s >= CLIPS[c].first && s <= CLIPS[c].last) return c;
    }
    return NCLIP - 1;
  }

  function buildVideos() {
    for (var i = 0; i < NCLIP; i++) {
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
        v.style.opacity = '0';
        v.dataset.src = CLIP_DIR + CLIPS[idx].file;
        // never play on its own — this film moves only with scroll
        v.addEventListener('play', function () { v.pause(); });
        fbFrames.appendChild(v);
        videos[idx] = v;
      })(i);
    }
  }

  // progressive loading: only the active clip and its neighbours hold data
  function ensureSrc(i) {
    if (i < 0 || i >= NCLIP) return;
    var v = videos[i];
    if (!v.getAttribute('src')) {
      v.src = v.dataset.src;
      v.preload = 'auto';
      v.load();
    }
  }
  function releaseFarClips(a) {
    for (var i = 0; i < NCLIP; i++) {
      if (Math.abs(i - a) > 1 && videos[i].getAttribute('src')) {
        videos[i].removeAttribute('src');
        videos[i].preload = 'metadata';
        videos[i].load();
      }
    }
  }

  function setStage(s) {
    if (s === currentStage) return;
    currentStage = s;
    var parts = STAGES[s].split('|');
    if (fbNum) fbNum.textContent = pad2(s + 1);
    if (fbStageNum) fbStageNum.textContent = (s + 1);
    if (fbStageName) {
      fbStageName.style.opacity = 0;
      window.setTimeout(function () {
        fbStageName.textContent = parts[0];
        fbStageName.style.opacity = 1;
      }, 120);
    }
    if (fbStageDesc) fbStageDesc.textContent = parts[1];
    var c = clipForStage(s);
    ensureSrc(c - 1);
    ensureSrc(c);
    ensureSrc(c + 1);
    releaseFarClips(c);
  }

  function progress() {
    if (!fbSection) return 0;
    var vh = window.innerHeight;
    var top = fbSection.offsetTop;
    var scrollable = fbSection.offsetHeight - vh;
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
  // FADE_P centred on each boundary, so one clip ramps out while the next
  // ramps in — a true crossfade with no state machine and no pops.
  function updateFilm() {
    if (!fbSection || !fbFrames) return;
    var p = progress();
    if (p === lastP) return;
    lastP = p;

    var s = Math.min(NSTAGE - 1, Math.floor(p * NSTAGE));
    setStage(s);

    for (var c = 0; c < NCLIP; c++) {
      var v = videos[c];
      var start = CLIPS[c].first / NSTAGE;
      var end = (CLIPS[c].last + 1) / NSTAGE;
      var half = FADE_P / 2;
      var wStart = (c === 0) ? start : start - half;
      var wEnd = (c === NCLIP - 1) ? end : end + half;
      var op = 0;
      if (p >= wStart && p <= wEnd) {
        op = 1;
        // fade in across the overlap with the previous clip (not on clip 0)
        if (c > 0 && p < start + half) op = smooth((p - wStart) / FADE_P);
        // fade out across the overlap with the next clip (not on last clip)
        else if (c < NCLIP - 1 && p > end - half) op = 1 - smooth((p - (end - half)) / FADE_P);
      }
      v.style.opacity = op.toFixed(3);
      // scrub every clip that holds data and could be visible; the poster
      // frame covers the moment before data arrives
      if (op > 0.001 && v.getAttribute('src') && v.readyState >= 1) {
        scrubTo(v, clamp01((p - start) / (end - start)) * v.duration);
      }
    }

    if (fbBar) fbBar.style.width = (4 + p * 96).toFixed(1) + '%';
  }

  /* ================= 2. SCROLL-DRIVEN COUNTERS ================= */
  var counters = Array.prototype.slice.call(document.querySelectorAll('.stat-num[data-count]'));

  function updateCounters() {
    if (!counters.length) return;
    var vh = window.innerHeight;
    counters.forEach(function (el) {
      var band = el.closest('.stat-band') || el;
      var r = band.getBoundingClientRect();
      var p = clamp01((vh - r.top) / (vh + r.height));
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = (target * p).toFixed(decimals) + suffix;
    });
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
      updateCounters();
      updateParallax();
    });
  }

  function init() {
    initBlurSharp();
    if (reduceMotion) {
      // static: the dusk frame, no scrubbing
      if (fbFrames) {
        var img = document.createElement('img');
        img.src = CLIP_DIR + CLIPS[NCLIP - 1].poster;
        img.alt = 'Renofy home mid-build — drywalled interior';
        img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
        fbFrames.appendChild(img);
      }
      setStage(NSTAGE - 1);
      if (fbBar) fbBar.style.width = '100%';
      counters.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        el.textContent = target.toFixed(decimals) + (el.getAttribute('data-suffix') || '');
      });
      return;
    }
    if (!fbSection || !fbFrames) return;
    buildVideos();
    setStage(0);
    lastP = -1;
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
