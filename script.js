/* ============================================================
   SM Roadlines — script.js
   ============================================================ */

/* ── FLEET DATA & RENDERER ── */
const fleets = [
  {
    num: '01',
    tag: 'For urgent international deliveries',
    title: 'Cargo Planes',
    img: 'TruckImage/Plane1.png',
    desc: 'When time is critical, air freight is the fastest way to move goods across borders. Priority handling and global air cargo partnerships ensure your products arrive on schedule.',
    specs: [
      { val: '180t',  key: 'Max Payload' },
      { val: '24h',   key: 'Express SLA' },
      { val: '190+',  key: 'Destinations' }
    ]
  },
  {
    num: '02',
    tag: 'For global sea freight',
    title: 'Container Ships',
    img: 'TruckImage/Ship1.png',
    desc: 'Ideal for bulk goods and long-distance trade. Our container ship network connects major ports worldwide with reliable, cost-effective ocean freight and full customs support.',
    specs: [
      { val: '20k+',    key: 'TEU Capacity' },
      { val: 'FCL/LCL', key: 'Load Options' },
      { val: '80+',     key: 'Port Network' }
    ]
  },
  {
    num: '03',
    tag: 'For regional & long-distance transport',
    title: 'Heavy Trucks',
    img: 'TruckImage/Truck20.png',
    desc: 'Our fleet of heavy-duty trucks ensures smooth domestic and cross-border deliveries. FTL and LTL options handle everything from industrial cargo to retail distribution.',
    specs: [
      { val: '100t',     key: 'Max Load' },
      { val: 'FTL/LTL', key: 'Load Types' },
      { val: '48h',     key: 'Avg Transit' }
    ]
  },
  {
    num: '04',
    tag: 'For fast last-mile service',
    title: 'Delivery Vans',
    img: 'TruckImage/Truck13.png',
    desc: 'Speed and precision in the final leg. Our agile delivery vans provide efficient last-mile transport — ideal for eCommerce, urban logistics, and time-sensitive packages.',
    specs: [
      { val: '10t',     key: 'Max Load' },
      { val: 'Same-Day', key: 'Express Option' },
      { val: 'Urban+',   key: 'Coverage' }
    ]
  }
];

/* ── Truck Cursor ── */
const truck = document.querySelector('.truck-cursor');
if (truck) {
  document.addEventListener('mousemove', (e) => {
    truck.style.left = e.clientX + 'px';
    truck.style.top = e.clientY + 'px';
  });
}



/**
 * Render a fleet entry into #fleetContent and mark the active tab.
 * @param {number} index - Index into the fleets array.
 * @param {HTMLElement} btn - The clicked tab button.
 */
function showFleet(index, btn) {
  document.querySelectorAll('.fleet-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const f = fleets[index];
  const specsHTML = f.specs
    .map(s => `<div><div class="spec-val">${s.val}</div><div class="spec-key">${s.key}</div></div>`)
    .join('');

  document.getElementById('fleetContent').innerHTML = `
    <div class="fleet-img">
      <img src="${f.img}" alt="${f.title}">
      <div class="fleet-num">${f.num}</div>
    </div>
    <div class="fleet-info">
      <span class="tag">${f.tag}</span>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
      <div class="fleet-specs">${specsHTML}</div>
      <a href="#quote" class="btn-primary">Request This Service</a>
    </div>
  `;
}

/* ── FAQ ACCORDION ── */
/**
 * Toggle an FAQ item open/closed.
 * @param {HTMLElement} el - The clicked .faq-q element.
 */
function toggleFaq(el) {
  el.parentElement.classList.toggle('open');
}

/* ── ANIMATED COUNTERS (triggered on scroll into view) ── */
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = Number(el.dataset.target);
    let current = 0;
    const step = target / 60;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      }
    }, 24);
  });
}

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const counterObserver = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  counterObserver.observe(statsBar);
}

/* ── SCROLL-TO-TOP BUTTON ── */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTop');
  if (btn) btn.classList.toggle('show', window.scrollY > 500);
});

/* ── QUOTE FORM FEEDBACK ── */
/**
 * Briefly confirm the inquiry was "sent".
 * @param {HTMLElement} btn - The submit button.
 */
function submitForm(btn) {
  btn.textContent = '✓ Inquiry Sent!';
  btn.style.background = '#2a9d5c';
  setTimeout(() => {
    btn.textContent = 'Send Inquiry →';
    btn.style.background = '';
  }, 3000);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  // Render first fleet tab on load
  const firstTab = document.querySelector('.fleet-tab');
  if (firstTab) showFleet(0, firstTab);
});


const container = document.getElementById('particles');

if (container) {
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    // random horizontal position across hero
    p.style.left = Math.random() * 100 + '%';

    // start particles in the lower half
    p.style.top = (40 + Math.random() * 60) + '%';

    // random sideways drift via CSS variable
    p.style.setProperty('--dx',
      (Math.random() * 40 - 20) + 'px');

    // random size between 1–3px
    const size = 1 + Math.random() * 2;
    p.style.width = p.style.height = size + 'px';

    // random speed: 4s–10s per loop
    p.style.animationDuration =
      (4 + Math.random() * 6) + 's';

    // stagger start times so they don't
    // all appear at the same moment
    p.style.animationDelay =
      (Math.random() * 8) + 's';

    container.appendChild(p);
  }
}


/* ── Responsive Form ── */
const quoteForm = document.getElementById("quoteFormm");
if (quoteForm) {
  quoteForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const btn = document.querySelector(".form-submit");
    if (!btn) return;

    btn.disabled = true;
    btn.textContent = "Sending...";

    const formData = new FormData(this);

    fetch("contact.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.text())
      .then(data => {

        if (data.trim() === "success") {

          btn.textContent = "✓ Inquiry Sent!";
          btn.style.background = "#2a9d5c";
          this.reset();

        } else {

          btn.textContent = "Failed!";
          btn.style.background = "red";
        }

        setTimeout(() => {
          btn.textContent = "Send Inquiry →";
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);

      })
      .catch(() => {
        btn.textContent = "Network Error";
        btn.style.background = "red";
        setTimeout(() => {
          btn.textContent = "Send Inquiry →";
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);
      });

  });
}

/* ── Gallery Page ── */
const images = document.querySelectorAll(".gallery-card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = document.querySelector(".close");

if (images.length && lightbox && lightboxImg && close) {
  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  close.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}


// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}