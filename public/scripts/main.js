(function () {
  "use strict";

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Language init
  const saved = localStorage.getItem("lang") || "fa";
  window.i18n.setLanguage(saved);

  document.getElementById("langSwitch")?.addEventListener("click", () => {
    const next = window.i18n.currentLang() === "fa" ? "en" : "fa";
    window.i18n.setLanguage(next);
  });

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle?.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });
  mainNav?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Header scrolled state + Construction line
  const header = document.getElementById("header");
  const line = document.getElementById("constructionLine");
  function updateLine() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
    if (!line) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    line.style.height = `${progress * 100}%`;
  }
  window.addEventListener("scroll", updateLine, { passive: true });
  updateLine();

  // Header active nav
  const sections = document.querySelectorAll("section[id]");
  function updateActiveNav() {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    document.querySelectorAll(".main-nav a").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // Metric counters
  const metricsSection = document.getElementById("metrics");
  let counted = false;
  function animateCounters() {
    if (counted || !metricsSection) return;
    const rect = metricsSection.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.85) return;
    counted = true;
    document.querySelectorAll(".metric-value[data-count]").forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(tick);
    });
  }
  window.addEventListener("scroll", animateCounters, { passive: true });
  animateCounters();

  // Projects data (embedded for zero backend)
  const projects = [
    {
      id: "arsham",
      title: { en: "Arsham Building", fa: "ساختمان آرشام" },
      location: { en: "Shahid Babaei Highway, Tehran", fa: "بزرگراه شهید بابایی، تهران" },
      type: { en: "Large-scale Residential & Commercial", fa: "توسعه مسکونی و تجاری در مقیاس بزرگ" },
      area: { en: "260 Units", fa: "۲۶۰ واحد" },
      status: { en: "Suspended", fa: "متوقف‌شده", key: "suspended" },
      role: { en: "Mechanical MEP Site Supervisor", fa: "ناظر سایت مکانیکال MEP" },
      company: "ABRAH SAZAN",
      description: {
        en: "A large-scale residential and commercial development of 260 units. Direct supervision of mechanical MEP site operations, coordination of execution teams, contractors, progress monitoring and quality control.",
        fa: "توسعه مسکونی و تجاری در مقیاس بزرگ شامل ۲۶۰ واحد. نظارت مستقیم بر عملیات سایت مکانیکال MEP، هماهنگی تیم‌های اجرایی و پیمانکاران، پایش پیشرفت و کنترل کیفیت."
      }
    },
    {
      id: "palestine",
      title: { en: "Palestine Office Building", fa: "ساختمان اداری فلسطین" },
      location: { en: "Taleghani Street, Tehran", fa: "خیابان طالقانی، تهران" },
      type: { en: "Full Building Renovation / Design & Execution", fa: "بازسازی کامل / طراحی و اجرا" },
      area: { en: "~1,800 m² + 500 m² landscape", fa: "حدود ۱٬۸۰۰ م² + ۵۰۰ م² محوطه" },
      status: { en: "Completed", fa: "تکمیل‌شده", key: "completed" },
      role: { en: "Project Execution / Site Management", fa: "اجرای پروژه / مدیریت سایت" },
      company: "PAYA PAJOOH ARZHAN",
      description: {
        en: "Full-scale renovation and conversion of a four-floor building into a modern office complex including landscape, swimming pool and mechanical room renovation.",
        fa: "بازسازی کامل و تبدیل ساختمان چهارطبقه به مجموعه اداری مدرن شامل محوطه، استخر و بازسازی موتورخانه."
      }
    },
    {
      id: "exir-office",
      title: { en: "Exir Sanat Bakhtari Office Complex", fa: "مجتمع اداری اکسیر صنعت بختیاری" },
      location: { en: "Valiasr Square, Tehran", fa: "میدان ولیعصر، تهران" },
      type: { en: "Office Renovation & Fit-Out", fa: "بازسازی و فیت‌اوت اداری" },
      area: { en: "~2,040 m²", fa: "حدود ۲٬۰۴۰ م²" },
      status: { en: "Completed", fa: "تکمیل‌شده", key: "completed" },
      role: { en: "Project Management / Execution Coordination", fa: "مدیریت پروژه / هماهنگی اجرا" },
      company: "NESH STUDIO",
      description: {
        en: "Office renovation and fit-out of multiple units totaling approximately 2,040 m² with full material selection, procurement and quality control.",
        fa: "بازسازی و فیت‌اوت اداری چندین واحد با مجموع حدود ۲٬۰۴۰ مترمربع همراه با انتخاب مصالح، تهیه و کنترل کیفیت."
      }
    },
    {
      id: "exir-lobby",
      title: { en: "Exir Sanat Bakhtari Lobby", fa: "لابی اکسیر صنعت بختیاری" },
      location: { en: "Tehran", fa: "تهران" },
      type: { en: "Parking-to-Lobby Conversion", fa: "تبدیل پارکینگ به لابی" },
      area: { en: "~100 m²", fa: "حدود ۱۰۰ م²" },
      status: { en: "Completed", fa: "تکمیل‌شده", key: "completed" },
      role: { en: "Project Management / Execution Coordination", fa: "مدیریت پروژه / هماهنگی اجرا" },
      company: "NESH STUDIO",
      description: {
        en: "Conversion of an existing parking area into a professional office lobby.",
        fa: "تبدیل فضای پارکینگ موجود به لابی اداری حرفه‌ای."
      }
    },
    {
      id: "iranshahr",
      title: { en: "Iranshahr Residential Unit", fa: "واحد مسکونی ایرانشهر" },
      location: { en: "Iranshahr Street, Tehran", fa: "خیابان ایرانشهر، تهران" },
      type: { en: "Full Residential Renovation / Design & Build", fa: "بازسازی کامل مسکونی / طراحی و ساخت" },
      area: { en: "~145 m²", fa: "حدود ۱۴۵ م²" },
      status: { en: "Completed", fa: "تکمیل‌شده", key: "completed" },
      role: { en: "Project Management / Design & Execution", fa: "مدیریت پروژه / هماهنگی طراحی و اجرا" },
      company: "NESH STUDIO",
      description: {
        en: "Full renovation of a residential unit from assessment through execution, including MEP coordination and interior finishing.",
        fa: "بازسازی کامل واحد مسکونی از ارزیابی تا اجرا شامل هماهنگی MEP و نازک‌کاری داخلی."
      }
    },
    {
      id: "fereshteh",
      title: { en: "Fereshteh Space Conversion", fa: "تبدیل فضای فرشته" },
      location: { en: "Fereshteh Street, Tehran", fa: "خیابان فرشته، تهران" },
      type: { en: "Residential-to-Service Conversion", fa: "تبدیل مسکونی به خدماتی" },
      area: { en: "~70 m²", fa: "حدود ۷۰ م²" },
      status: { en: "Completed", fa: "تکمیل‌شده", key: "completed" },
      role: { en: "Project Management / Execution Coordination", fa: "مدیریت پروژه / هماهنگی اجرا" },
      company: "NESH STUDIO",
      description: {
        en: "Conversion of a residential unit into a specialized service space (hair salon & massage center).",
        fa: "تبدیل واحد مسکونی به فضای خدماتی تخصصی (سالن مو و مرکز ماساژ)."
      }
    },
    {
      id: "jewelry",
      title: { en: "Jewelry Retail – Ghaem Passage", fa: "فضای خرده‌فروشی طلا – پاساژ قائم" },
      location: { en: "Tajrish, Tehran", fa: "تجریش، تهران" },
      type: { en: "Luxury Retail Fit-Out", fa: "فیت‌اوت خرده‌فروشی لوکس" },
      area: { en: "~25 m²", fa: "حدود ۲۵ م²" },
      status: { en: "Completed", fa: "تکمیل‌شده", key: "completed" },
      role: { en: "Site Manager / Execution Coordinator", fa: "مدیر سایت / هماهنگ‌کننده اجرا" },
      company: "NESH STUDIO",
      description: {
        en: "Execution of a specialized jewelry retail space with premium craftsmanship and attention to detail.",
        fa: "اجرای فضای خرده‌فروشی تخصصی طلا و جواهر با کیفیت بالای اجرا و توجه به جزئیات."
      }
    },
    {
      id: "dastgheib",
      title: { en: "Shahid Dastgheib Residential", fa: "مسکونی شهید دستغیب" },
      location: { en: "Tehran", fa: "تهران" },
      type: { en: "Residential Renovation", fa: "بازسازی مسکونی" },
      area: { en: "—", fa: "—" },
      status: { en: "Completed & Handed Over", fa: "تکمیل و تحویل‌شده", key: "completed" },
      role: { en: "Project Management / Execution Coordination", fa: "مدیریت پروژه / هماهنگی اجرا" },
      company: "NESH STUDIO",
      description: {
        en: "Residential project completed and officially handed over to the client.",
        fa: "پروژه مسکونی تکمیل و رسماً به کارفرما تحویل داده شده است."
      }
    },
    {
      id: "cafe",
      title: { en: "Cafe Ketab Bagh", fa: "کافه کتاب باغ" },
      location: { en: "Azarshahr St., Iranshahr, Tehran", fa: "خیابان آذرشهر، ایرانشهر، تهران" },
      type: { en: "Café & Bookstore / Design & Execution", fa: "کافه و کتابفروشی / طراحی و اجرا" },
      area: { en: "Interior >430 m² + Courtyard ~110–120 m²", fa: "داخلی >۴۳۰ م² + حیاط ~۱۱۰–۱۲۰ م²" },
      status: { en: "In Progress", fa: "در حال اجرا", key: "progress" },
      role: { en: "Project Manager / Execution Coordination", fa: "مدیر پروژه / هماهنگی اجرا" },
      company: "NESH STUDIO",
      description: {
        en: "Ongoing commercial project for a café and bookstore with substantial indoor and outdoor spaces. Design by Harandi Engineering Company.",
        fa: "پروژه تجاری در حال اجرا برای کافه و کتابفروشی با فضاهای داخلی و خارجی قابل توجه. طراحی توسط شرکت مهندسی هرندی."
      }
    },
    {
      id: "amir",
      title: { en: "Amir Alley Residential", fa: "مسکونی کوچه امیر" },
      location: { en: "Amir Alley, Motahari St., Tehran", fa: "کوچه امیر، خیابان مطهری، تهران" },
      type: { en: "Residential Renovation / Full Interior", fa: "بازسازی مسکونی / اجرای کامل داخلی" },
      area: { en: "~95–96 m²", fa: "حدود ۹۵–۹۶ م²" },
      status: { en: "In Progress", fa: "در حال اجرا", key: "progress" },
      role: { en: "Project Manager / Design & Execution Coordination", fa: "مدیر پروژه / هماهنگی طراحی و اجرا" },
      company: "NESH STUDIO",
      description: {
        en: "Comprehensive interior renovation including electrical, mechanical, tiling, plaster modernization and full material selection. Design and execution managed by Mohammadali Nemati Nejad.",
        fa: "بازسازی جامع داخلی شامل تأسیسات برقی و مکانیکی، کاشی‌کاری، مدرن‌سازی گچ‌کاری و انتخاب مصالح کامل. مدیریت طراحی و اجرا توسط محمدعلی نعمتی‌نژاد."
      }
    }
  ];

  function statusClass(key) {
    if (key === "completed") return "status-completed";
    if (key === "progress") return "status-progress";
    return "status-suspended";
  }

  window.renderProjects = function () {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;
    const lang = window.i18n.currentLang();
    grid.innerHTML = projects.map(p => `
      <article class="project-card" data-id="${p.id}">
        <div class="project-card-media"></div>
        <div class="project-card-body">
          <span class="status ${statusClass(p.status.key)}">${p.status[lang]}</span>
          <h3>${p.title[lang]}</h3>
          <p class="project-meta">${p.location[lang]} · ${p.area[lang]}</p>
          <p>${p.description[lang].slice(0, 120)}…</p>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("click", () => openProject(card.dataset.id));
    });
  };

  function openProject(id) {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    const lang = window.i18n.currentLang();
    const body = document.getElementById("modalBody");
    body.innerHTML = `
      <span class="status ${statusClass(p.status.key)}">${p.status[lang]}</span>
      <h2>${p.title[lang]}</h2>
      <p class="meta">${p.location[lang]} · ${p.type[lang]} · ${p.area[lang]}</p>
      <p><strong>${lang === "fa" ? "نقش" : "Role"}:</strong> ${p.role[lang]}</p>
      <p><strong>${lang === "fa" ? "شرکت" : "Company"}:</strong> ${p.company}</p>
      <p>${p.description[lang]}</p>
      <div class="project-card-media" style="margin-top:1.5rem;aspect-ratio:16/9"></div>
      <p style="margin-top:1rem;font-size:0.8rem;opacity:0.5">${lang === "fa" ? "جایگاه تصویر — عکس‌های واقعی پروژه به‌زودی اضافه می‌شوند." : "Image placeholder — actual project photos will be added soon."}</p>
    `;
    document.getElementById("projectModal").classList.add("open");
    document.getElementById("projectModal").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    document.getElementById("projectModal").classList.remove("open");
    document.getElementById("projectModal").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // Initial render
  window.renderProjects();
  if (window.i18n) window.i18n.setLanguage(window.i18n.currentLang());
})();
