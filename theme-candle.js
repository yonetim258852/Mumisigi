/* ============================================================
 * Mum Işığı Atölyesi — Tema + Mum Animasyonu
 * Tek dosya: her sayfada <script src="theme-candle.js" defer></script>
 * Otomatik: nav-brand'in başına mum, nav-links sonuna tema toggle ekler.
 * Tercih localStorage'da saklanır.
 * ============================================================ */
(function () {
  'use strict';

  /* ---------- CSS (sayfaya inject) ---------- */
  const css = `
    /* ============ DARK TEMA — sıcak mum atölyesi koyusu ============ */
    :root.dark {
      --cream:        #1a1208;
      --cream-deep:   #241910;
      --gold:         #d4a574;
      --gold-bright:  #e0b888;
      --gold-glow:    #e8a447;
      --sage:         #b4c2a0;
      --dark:         #f0e6d2;
      --mid:          #c9b896;
      --soft:         #a8957d;
    }
    :root.dark body { background: var(--cream); color: var(--dark); }
    :root.dark nav { background: rgba(26, 18, 8, 0.92) !important; border-bottom-color: rgba(212, 165, 116, 0.15) !important; }
    /* Sayfa içi tüm beyaz/krem kart ve bölümler için yumuşak ters çevirme */
    :root.dark section, :root.dark .card, :root.dark .panel, :root.dark .compare-row,
    :root.dark .values-grid > *, :root.dark footer { background-color: transparent; }
    :root.dark img:not(.no-dim):not(.nav-candle):not(.theme-toggle *) {
      filter: brightness(0.88) contrast(1.02);
      transition: filter 0.4s ease;
    }
    html { transition: background-color 0.5s ease; }
    body { transition: background-color 0.5s ease, color 0.5s ease; }

    /* ============ MUM (nav-brand'in başına) ============ */
    .nav-candle {
      display: inline-block;
      vertical-align: -6px;
      margin-right: 6px;
      width: 30px;
      height: 36px;
      color: var(--gold);
      overflow: visible;
      transition: color 0.5s ease;
    }
    .nav-candle .candle-jar { transition: opacity 0.4s ease; }
    .nav-candle .candle-wick { transition: stroke 0.4s ease; }

    /* Alev grubu */
    .nav-candle .candle-flame {
      transform-origin: 16px 12px;
      transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      animation: navFlameFlicker 2.8s ease-in-out infinite;
    }
    .nav-candle .candle-glow {
      transform-origin: 16px 8px;
      transition: opacity 0.6s ease, transform 0.6s ease;
      animation: navFlameGlow 2.8s ease-in-out infinite;
    }

    /* Alev titreşimi (light mode) */
    @keyframes navFlameFlicker {
      0%, 100% { transform: scale(1, 1)        translateY(0)   rotate(0deg); }
      20%      { transform: scale(0.96, 1.04)  translateY(-0.4px) rotate(-1.5deg); }
      40%      { transform: scale(1.04, 0.98)  translateY(0.3px)  rotate(1deg); }
      60%      { transform: scale(0.98, 1.03)  translateY(-0.2px) rotate(-0.8deg); }
      80%      { transform: scale(1.02, 0.99)  translateY(0.2px)  rotate(0.6deg); }
    }
    @keyframes navFlameGlow {
      0%, 100% { opacity: 0.55; transform: scale(1); }
      50%      { opacity: 0.85; transform: scale(1.12); }
    }

    /* DARK MODE — alev üflenip söndü */
    :root.dark .nav-candle .candle-flame {
      opacity: 0;
      transform: scale(0.3) translateY(10px) rotate(-12deg);
      animation: none;
    }
    :root.dark .nav-candle .candle-glow {
      opacity: 0;
      transform: scale(0.4);
      animation: none;
    }
    :root.dark .nav-candle .candle-wick { stroke: var(--mid); }
    /* Sönüp tüten ufak duman ipucu (sadece dark) */
    :root.dark .nav-candle .candle-smoke {
      opacity: 0.35;
      animation: navSmokeRise 4s ease-out infinite;
    }
    .nav-candle .candle-smoke { opacity: 0; }
    @keyframes navSmokeRise {
      0%   { opacity: 0;    transform: translateY(0)   scaleX(1); }
      30%  { opacity: 0.35; transform: translateY(-3px) scaleX(1.1); }
      100% { opacity: 0;    transform: translateY(-9px) scaleX(0.6); }
    }

    /* nav-brand içinde flex hizalama */
    .nav-brand {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0 !important;
      white-space: nowrap !important;
    }

    /* ============ TEMA TOGGLE BUTONU ============ */
    .theme-toggle {
      background: transparent;
      border: 1px solid rgba(184, 148, 90, 0.3);
      width: 34px;
      height: 34px;
      border-radius: 50%;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--gold);
      margin-left: 8px;
      padding: 0;
      transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, color 0.5s ease;
      flex-shrink: 0;
      position: relative;
    }
    .theme-toggle:hover {
      background: rgba(184, 148, 90, 0.1);
      border-color: var(--gold);
      transform: scale(1.05);
    }
    .theme-toggle svg {
      width: 16px;
      height: 16px;
      transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      position: absolute;
    }
    /* Light mode → hilal göster (basınca dark'a geç) */
    .theme-toggle .ico-moon { opacity: 1; transform: rotate(0deg) scale(1); }
    .theme-toggle .ico-flame { opacity: 0; transform: rotate(-90deg) scale(0.5); }
    /* Dark mode → alev göster (basınca light'a geç) */
    :root.dark .theme-toggle .ico-moon  { opacity: 0; transform: rotate(90deg) scale(0.5); }
    :root.dark .theme-toggle .ico-flame { opacity: 1; transform: rotate(0deg) scale(1); }
    :root.dark .theme-toggle { border-color: rgba(212, 165, 116, 0.35); }

    /* ============ MOBİL ============ */
    @media (max-width: 768px) {
      .nav-candle { width: 24px; height: 28px; margin-right: 4px; vertical-align: -5px; }
      .theme-toggle { width: 30px; height: 30px; margin-left: 6px; }
      .theme-toggle svg { width: 14px; height: 14px; }
    }
    @media (max-width: 480px) {
      .nav-candle { width: 22px; height: 26px; }
    }
  `;

  /* ---------- Mum SVG ---------- */
  // viewBox 32x36 — fitil 11'de, alev fitilden yukarı 11→1, kavanoz 14→32
  const candleSVG = `
    <svg class="nav-candle" viewBox="0 0 32 36" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="navCandleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stop-color="#e8a447" stop-opacity="0.65"/>
          <stop offset="60%"  stop-color="#e8a447" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#e8a447" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="navFlameGrad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"  stop-color="#fdecbf"/>
          <stop offset="55%" stop-color="#e8a447"/>
          <stop offset="100%" stop-color="#b8945a"/>
        </linearGradient>
      </defs>

      <!-- Alev arkası glow (light mode'da görünür) -->
      <ellipse class="candle-glow" cx="16" cy="7" rx="8" ry="9" fill="url(#navCandleGlow)"/>

      <!-- Duman (sadece dark mode'da görünür) -->
      <path class="candle-smoke" d="M14 11 Q15 9, 16 10 Q17 8, 16 6" fill="none"
            stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.4"/>

      <!-- Cam kavanoz -->
      <g class="candle-jar">
        <!-- kavanoz dış -->
        <rect x="6" y="14" width="20" height="20" rx="2.5"
              fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.85"/>
        <!-- ağız çizgisi -->
        <line x1="6" y1="17" x2="26" y2="17"
              stroke="currentColor" stroke-width="0.9" opacity="0.5"/>
        <!-- iç mum dolgu -->
        <rect x="8.5" y="19" width="15" height="13" rx="1"
              fill="currentColor" opacity="0.13"/>
        <!-- cam parıltısı -->
        <line x1="9" y1="20" x2="9" y2="30"
              stroke="currentColor" stroke-width="0.7" opacity="0.4" stroke-linecap="round"/>
      </g>

      <!-- Fitil -->
      <line class="candle-wick" x1="16" y1="14.5" x2="16" y2="11.5"
            stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>

      <!-- Alev (light mode'da görünür) -->
      <g class="candle-flame">
        <!-- dış alev -->
        <path d="M16 11.5
                 Q12.5 8, 13 4.5
                 Q13.5 1.8, 16 0.8
                 Q18.5 1.8, 19 4.5
                 Q19.5 8, 16 11.5 Z"
              fill="url(#navFlameGrad)"/>
        <!-- iç parlak çekirdek -->
        <ellipse cx="16" cy="7" rx="1.3" ry="2.8" fill="#fdecbf" opacity="0.95"/>
      </g>
    </svg>
  `;

  /* ---------- Tema toggle butonu ---------- */
  const toggleBtn = `
    <button class="theme-toggle" type="button" aria-label="Karanlık moda geç" title="Tema değiştir">
      <svg class="ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>
      </svg>
      <svg class="ico-flame" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4-1 3 2 4 2 1 0-2-2-3 0-5Z"/>
        <path d="M7.5 14a4.5 4.5 0 1 0 9 0c0 3-2 8-4.5 8S7.5 17 7.5 14Z"/>
      </svg>
    </button>
  `;

  /* ---------- localStorage'dan tema yükle (FOUC önlemek için erken) ---------- */
  try {
    if (localStorage.getItem('mi-theme') === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) { /* private mode vs. */ }

  /* ---------- CSS'i inject et (head'e) ---------- */
  function injectCSS() {
    if (document.getElementById('mi-theme-candle-css')) return;
    const style = document.createElement('style');
    style.id = 'mi-theme-candle-css';
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }
  injectCSS();

  /* ---------- DOM hazır olunca öğeleri enjekte et ---------- */
  function init() {
    // Mum: nav-brand'in en başına
    const brand = document.querySelector('.nav-brand');
    if (brand && !brand.querySelector('.nav-candle')) {
      brand.insertAdjacentHTML('afterbegin', candleSVG);
    }

    // Toggle: nav-links'in hemen sonuna
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && !document.querySelector('.theme-toggle')) {
      navLinks.insertAdjacentHTML('afterend', toggleBtn);
      const btn = document.querySelector('.theme-toggle');
      btn.addEventListener('click', toggleTheme);
      updateAriaLabel(btn);
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('mi-theme', isDark ? 'dark' : 'light'); } catch (e) {}
    const btn = document.querySelector('.theme-toggle');
    if (btn) updateAriaLabel(btn);
  }

  function updateAriaLabel(btn) {
    const isDark = document.documentElement.classList.contains('dark');
    btn.setAttribute('aria-label', isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç');
    btn.setAttribute('title', isDark ? 'Mumu yak' : 'Mumu söndür');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
