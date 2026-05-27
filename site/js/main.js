/* Kincan Water Solution. Frontend JS.
   No frameworks. GSAP optional. Vanilla everything. */

(function(){
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ====== NAV ====== */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  function setNavScrolled(){
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', setNavScrolled, { passive:true });
  setNavScrolled();

  function closeMenu(){
    if (!toggle || !links) return;
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('open');
    document.body.classList.remove('nav-open');
  }
  function openMenu(){
    if (!toggle || !links) return;
    toggle.setAttribute('aria-expanded', 'true');
    links.classList.add('open');
    document.body.classList.add('nav-open');
  }
  if (toggle){
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      open ? closeMenu() : openMenu();
    });
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  /* ====== REVEAL ====== */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0, rootMargin:'0px 0px -50px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // 600ms catch-up: reveal anything within 2x viewport
  setTimeout(() => {
    const vh = window.innerHeight * 2;
    revealEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh) el.classList.add('in');
    });
  }, 600);

  // 3s force-reveal fallback so nothing can stay invisible
  setTimeout(() => {
    revealEls.forEach(el => el.classList.add('in'));
  }, 3000);

  /* ====== COUNT-UP ====== */
  const counters = document.querySelectorAll('[data-count]');
  function animateCounter(el){
    if (el.dataset.done === '1') return;
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const duration = 1400;
    const start = performance.now();
    function step(now){
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      el.textContent = v.toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
      else { el.textContent = Number.isInteger(target) ? Math.round(target).toString() : target.toString(); el.dataset.done = '1'; }
    }
    requestAnimationFrame(step);
  }
  if (counters.length){
    if ('IntersectionObserver' in window && !reduceMotion){
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold:0.4 });
      counters.forEach(el => cio.observe(el));
    } else {
      counters.forEach(el => { el.textContent = el.dataset.count; el.dataset.done = '1'; });
    }
    // 2s settle fallback
    setTimeout(() => {
      counters.forEach(el => {
        if (el.dataset.done !== '1'){
          el.textContent = el.dataset.count;
          el.dataset.done = '1';
        }
      });
    }, 2000);
  }

  /* ====== LIGHTBOX ====== */
  const tiles = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (tiles.length){
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <button class="close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      <button class="nav-btn prev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg></button>
      <button class="nav-btn next" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg></button>
      <img alt="" />
      <div class="caption"></div>
    `;
    document.body.appendChild(lb);

    const imgEl = lb.querySelector('img');
    const cap = lb.querySelector('.caption');
    let idx = 0;

    function open(i){
      idx = i;
      const t = tiles[idx];
      imgEl.src = t.dataset.full || t.querySelector('img').src;
      imgEl.alt = t.dataset.caption || '';
      cap.textContent = `${idx+1} / ${tiles.length} · ${t.dataset.caption || ''}`;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      // preload neighbors
      const next = (idx + 1) % tiles.length;
      const prev = (idx - 1 + tiles.length) % tiles.length;
      [next, prev].forEach(i2 => {
        const t2 = tiles[i2];
        const im = new Image();
        im.src = t2.dataset.full || t2.querySelector('img').src;
      });
    }
    function close(){
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
    function step(d){
      idx = (idx + d + tiles.length) % tiles.length;
      open(idx);
    }

    tiles.forEach((t, i) => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        open(i);
      });
    });
    lb.querySelector('.close').addEventListener('click', close);
    lb.querySelector('.prev').addEventListener('click', () => step(-1));
    lb.querySelector('.next').addEventListener('click', () => step(1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });

    // touch swipe
    let tx = 0;
    lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive:true });
    lb.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    });
  }

  /* ====== FORM (graceful mailto fallback) ====== */
  const form = document.querySelector('form.lead-form');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('New estimate request from ' + (data.get('first') || 'Kincan website'));
      const body = encodeURIComponent(
        `Name: ${data.get('first')||''}\n` +
        `Phone: ${data.get('phone')||''}\n` +
        `Email: ${data.get('email')||''}\n` +
        `Town: ${data.get('town')||''}\n` +
        `Service: ${data.get('service')||''}\n\n` +
        `${data.get('message')||''}`
      );
      // Open the user's mail client. Replace with a real endpoint (Formspree / Netlify Forms) before launch.
      window.location.href = `mailto:jleaks.justin@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ====== HERO PARALLAX (light touch) — disabled when scroll-canvas is active ====== */
  const heroVisual = document.querySelector('.hero-visual');
  const heroImg = document.querySelector('.hero-visual img');
  if (heroImg && !reduceMotion && !(heroVisual && heroVisual.classList.contains('has-3d'))){
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking){
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < 800) heroImg.style.transform = `translateY(${y * 0.06}px) scale(1.02)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive:true });
  }

  /* ====== HERO SCROLL-DRIVEN CANVAS ====== */
  const heroCanvas = document.querySelector('.hero-canvas');
  if (heroCanvas){
    const totalFrames = parseInt(heroCanvas.dataset.frames, 10) || 121;
    const framesPath = heroCanvas.dataset.framesPath || '/assets/hero-frames/';
    const ctx = heroCanvas.getContext('2d');
    const images = new Array(totalFrames);
    let imagesReady = 0;
    let currentIndex = -1;
    let ticking = false;

    function pad(n){ return String(n).padStart(4, '0'); }

    function sizeCanvas(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = heroCanvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      heroCanvas.width = Math.round(w * dpr);
      heroCanvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawFrame(idx){
      const img = images[idx];
      if (!img || !img.complete || !img.naturalWidth){
        // fall back to nearest already-loaded frame
        for (let off = 1; off < totalFrames; off++){
          const a = images[Math.max(0, idx - off)];
          const b = images[Math.min(totalFrames - 1, idx + off)];
          if (a && a.complete && a.naturalWidth){ return drawImageCover(a); }
          if (b && b.complete && b.naturalWidth){ return drawImageCover(b); }
        }
        return;
      }
      drawImageCover(img);
    }

    function drawImageCover(img){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = heroCanvas.width / dpr;
      const ch = heroCanvas.height / dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    // Animation auto-plays the moment the user begins scrolling. After it
    // finishes, the last frame stays put. If they return to the very top,
    // it resets so the trigger can fire again.
    const AUTO_PLAY_DURATION = 3000;
    let autoState = 'idle'; // 'idle' | 'playing' | 'done'
    let autoStart = 0;

    function update(){
      ticking = false;
      let idx;
      if (autoState === 'playing'){
        const t = Math.min(1, (performance.now() - autoStart) / AUTO_PLAY_DURATION);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        idx = Math.round(eased * (totalFrames - 1));
        if (t < 1) {
          requestAnimationFrame(update);
          ticking = true;
        } else {
          autoState = 'done';
        }
      } else if (autoState === 'done'){
        idx = totalFrames - 1;
      } else { // idle
        idx = 0;
      }
      if (idx !== currentIndex){
        currentIndex = idx;
        drawFrame(idx);
      }
    }
    function requestUpdate(){
      if (!ticking){
        requestAnimationFrame(update);
        ticking = true;
      }
    }
    function onScroll(){
      if (autoState === 'idle' && window.scrollY > 0){
        autoState = 'playing';
        autoStart = performance.now();
        requestUpdate();
      } else if (autoState === 'done' && window.scrollY <= 4){
        autoState = 'idle';
        requestUpdate();
      }
    }

    // Preload all frames
    for (let i = 0; i < totalFrames; i++){
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.onload = () => {
        imagesReady++;
        // Draw the first frame the moment it lands so there's never a blank canvas.
        if (i === 0 && currentIndex === -1){
          sizeCanvas();
          currentIndex = 0;
          drawFrame(0);
        }
        // Once every frame is in memory, do a fresh render in case scroll
        // moved while we were loading.
        if (imagesReady === totalFrames) requestUpdate();
      };
      img.onerror = () => { imagesReady++; };
      img.src = framesPath + 'frame_' + pad(i + 1) + '.jpg';
      images[i] = img;
    }

    sizeCanvas();
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('resize', () => {
      sizeCanvas();
      currentIndex = -1;
      requestUpdate();
    });
  }

})();
