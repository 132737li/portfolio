// ====== RÉGLAGES ======
const MY_EMAIL = "lirakoze602@gmail.com";
const FORMSPREE_ID = "moeekjwo";

// ====== TES PROJETS ======
// Remplace "bg" par une image : "url('images/mon-projet.jpg') center/cover"
// locked: true = projet « accès sur demande » (pastille cadenas + demande WhatsApp)
const data = [
  {
    category: "Application de gestion",
    title: "Isoko AI",
    desc: "Application web (PWA) de gestion de stock et de ventes pour commerçants : fonctionne sans internet, en BIF, avec publicités générées par IA.",
    bg: "linear-gradient(135deg,#042f2e,#0f766e 60%,#5eead4)",
    link: "https://isokoai-woad.vercel.app/",
    locked: true, // accès sur demande (page de code)
    // Traduction anglaise (affichée quand le site est en EN). Les autres projets sont traduits par i18n.js.
    en: {
      category: "Management app",
      desc: "Web app (PWA) for stock and sales management for shopkeepers: works offline, in BIF, with AI-generated ads.",
    },
  },
  {
    category: "Boutique en ligne",
    title: "Berlly Boutique",
    desc: "Boutique e-commerce avec backend Node.js / Express : catalogue, panier et commandes.",
    bg: "url(images/berlly.webp)",
    link: "https://132737li.github.io/Berlly_Boutique/",
  },
  {
    category: "Site vitrine",
    title: "Flower Shop",
    desc: "Site de fleurs en HTML, CSS et JavaScript avec panier et commande via WhatsApp.",
    bg: "url(images/flower-shop.webp)",
    link: "#",
  },
  {
    category: "Commerce local",
    title: "Bar Kumunyinya",
    desc: "Site de la boutique Brarudi à Gasenyi, Bujumbura : produits, contacts et paiements.",
    bg: "linear-gradient(135deg,#f7971e,#ffd200 50%,#7b4a00)",
    link: "#",
  },
  {
    category: "Application mobile",
    title: "SmartAlarm",
    desc: "Application Android en Kotlin / Jetpack Compose, avec une version web mobile.",
    bg: "linear-gradient(135deg,#0f2027,#2c5364 60%,#00c6ff)",
    link: "#",
  },
  {
    category: "Assistant desktop",
    title: "JARVIS",
    desc: "Assistant Windows en Python / PySide6 : commandes vocales et sécurité.",
    bg: "linear-gradient(135deg,#141e30,#243b55 60%,#7f00ff)",
    link: "#",
    locked: true,
  },
  {
    category: "Automatisation",
    title: "WhatsApp Bot",
    desc: "Bot WhatsApp connecté à OpenAI via l'API Meta et un webhook.",
    bg: "linear-gradient(135deg,#0b3d2e,#11998e 60%,#38ef7d)",
    link: "#",
  },
  {
    category: "Site romantique",
    title: "Ltn",
    desc: "Un site romantique pensé comme un cadeau numérique.",
    bg: "url(images/ltn.webp)",
    link: "https://132737li.github.io/Ltn/",
    locked: true,
  },
  {
    category: "Intelligence artificielle",
    title: "LionFlow AI",
    desc: "Projet autour de l'IA et de l'automatisation.",
    bg: "url(images/lionflow-ai.webp)",
    link: "https://132737li.github.io/lionflow-ai/",
    locked: true,
  },
];

const WHATSAPP = "25776672387"; // ton numéro (pour le bouton « demander l'accès »)
const DURATION = 6; // secondes entre chaque slide
const $ = (s) => document.querySelector(s);
const pad = (n) => String(n + 1).padStart(2, "0");
// Texte d'un projet dans la langue du site (si une traduction "en" existe, sinon le français)
const tr = (d, k) => (window.LANG === "en" && d.en && d.en[k]) || d[k];

// Lien WhatsApp « Bonjour, je voudrais accéder au projet X »
function askLink(d) {
  const en = window.LANG === "en";
  const msg = en
    ? `Hello Lionel, I would like access to the project "${d.title}". Could you give me the entry code? Thank you.`
    : `Bonjour Lionel, je souhaite accéder au projet « ${d.title} ». Peux-tu me donner le code d'entrée ? Merci.`;
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
}

// Style des pastilles « accès sur demande » (slider)
(function () {
  const st = document.createElement("style");
  st.textContent =
    ".lock-badge{display:inline-flex;align-items:center;gap:6px;margin:0 0 14px;padding:6px 14px;border-radius:30px;" +
    "background:#0007;border:1px solid #ffb02e99;color:#ffd27a;font-size:12px;font-weight:500;text-decoration:none;" +
    "backdrop-filter:blur(4px);transition:background .2s,color .2s}" +
    ".lock-badge:hover{background:#ffb02e;color:#111}" +
    ".lock-badge[hidden]{display:none!important}" +
    ".card-lock{display:inline-block;margin:0 0 6px;padding:2px 9px;border-radius:20px;background:#000a;" +
    "border:1px solid #ffffff55;color:#fff;font-size:10px;font-weight:500;letter-spacing:.3px}";
  document.head.appendChild(st);
})();

const stage = $("#home"), bg = $("#bg"), cardsEl = $("#cards"), details = $("#details");
const bar = $("#bar");
let order = data.map((_, i) => i);
let busy = false;
let timer;

/* ================= SLIDER ================= */
function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, { ...properties, duration, onComplete: resolve });
  });
}

function renderCards() {
  cardsEl.innerHTML = order
    .slice(1)
    .map((i) => `
      <div class="card" data-i="${i}" style="background:${data[i].bg}">
        <div class="card-info">${data[i].locked ? `<span class="card-lock">🔒 ${window.LANG === "en" ? "On request" : "Sur demande"}</span><br>` : ""}<small>${tr(data[i], "category")}</small><h4>${data[i].title}</h4></div>
      </div>`)
    .join("");
}

// Pastille « accès sur demande » sous la catégorie du projet affiché
const lockEl = document.createElement("a");
lockEl.className = "lock-badge";
lockEl.target = "_blank";
lockEl.rel = "noopener noreferrer";
lockEl.hidden = true;
$("#d-cat").insertAdjacentElement("afterend", lockEl);

function setDetails(i) {
  const d = data[i];
  $("#d-cat").textContent = tr(d, "category");
  $("#d-title").textContent = d.title;
  $("#d-desc").textContent = tr(d, "desc");
  // Projet verrouillé sans lien en ligne : le bouton ouvre la demande d'accès WhatsApp
  $("#d-link").href = d.locked && d.link === "#" ? askLink(d) : d.link;
  lockEl.hidden = !d.locked;
  if (d.locked) {
    lockEl.href = askLink(d);
    lockEl.textContent = window.LANG === "en" ? "🔒 Access on request · ask for the code" : "🔒 Accès sur demande · demander le code";
  }
  $("#num").textContent = pad(i);
}

function startTimer() {
  timer && timer.kill();
  timer = gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: DURATION, ease: "none", onComplete: next });
}

function showDetails() {
  gsap.fromTo(details, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
  gsap.from(cardsEl.children, { opacity: 0, x: 60, duration: 0.6, stagger: 0.1, ease: "power3.out" });
}

async function next() {
  if (busy) return;
  busy = true;
  timer && timer.kill();

  const nextIdx = order[1];
  const cardEl = cardsEl.firstElementChild;
  const r = cardEl.getBoundingClientRect();
  const W = innerWidth, H = innerHeight;

  // Le calque part de la position exacte de la carte, puis s'ouvre en plein écran
  const layer = document.createElement("div");
  layer.className = "bg-layer";
  layer.style.background = data[nextIdx].bg;
  layer.style.clipPath = `inset(${r.top}px ${W - r.right}px ${H - r.bottom}px ${r.left}px round 16px)`;
  stage.insertBefore(layer, bg.nextSibling);

  gsap.to(details, { opacity: 0, y: -20, duration: 0.3 });
  await animate(layer, 0.9, { clipPath: `inset(0px 0px 0px 0px round 0px)`, ease: "power3.inOut" });

  order.push(order.shift());
  bg.style.background = data[nextIdx].bg;
  layer.remove();
  renderCards();
  setDetails(nextIdx);
  showDetails();
  startTimer();
  busy = false;
}

async function prev() {
  if (busy) return;
  busy = true;
  timer && timer.kill();

  order.unshift(order.pop());
  const idx = order[0];

  const layer = document.createElement("div");
  layer.className = "bg-layer";
  layer.style.background = data[idx].bg;
  layer.style.opacity = 0;
  stage.insertBefore(layer, bg.nextSibling);

  gsap.to(details, { opacity: 0, duration: 0.25 });
  await animate(layer, 0.6, { opacity: 1, ease: "power2.inOut" });

  bg.style.background = data[idx].bg;
  layer.remove();
  renderCards();
  setDetails(idx);
  showDetails();
  startTimer();
  busy = false;
}

// Clic sur une carte = aller à ce projet
cardsEl.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const target = Number(card.dataset.i);
  while (order[1] !== target) order.push(order.shift());
  next();
});

$("#next").addEventListener("click", next);
$("#prev").addEventListener("click", prev);

/* ================= THÈME CLAIR / SOMBRE ================= */
const themeBtn = $("#theme-toggle");

function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  themeBtn.textContent = t === "light" ? "☀" : "☾";
  try { localStorage.setItem("theme", t); } catch (e) { }
}

(function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { }
  const preferred = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  applyTheme(preferred);
})();

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "light" ? "dark" : "light");
});

/* ================= NAV AU SCROLL ================= */
const nav = $("#nav");
function onScroll() {
  nav.classList.toggle("scrolled", scrollY > innerHeight - 90);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ================= FORMULAIRE DE CONTACT (Formspree) ================= */
const form = $("#contact-form");
const statusEl = $("#form-status");
const formBtn = $("#form-btn");

function setStatus(msg, type) {
  statusEl.textContent = msg;
  statusEl.className = "form-status " + (type || "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);

  // Anti-spam : un robot a rempli le champ caché
  if (fd.get("website")) return;

  const name = (fd.get("name") || "").trim();
  const email = (fd.get("email") || "").trim();
  const message = (fd.get("message") || "").trim();

  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    setStatus("Merci de remplir correctement tous les champs.", "err");
    return;
  }

  formBtn.disabled = true;
  formBtn.textContent = "Envoi en cours...";
  setStatus("", "");

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Contact portfolio — ${name}`,
      }),
    });

    if (res.ok) {
      form.reset();
      setStatus("Message envoyé, merci ! Je te réponds vite.", "ok");
    } else {
      const result = await res.json().catch(() => ({}));
      const detail = result.errors && result.errors.map((er) => er.message).join(", ");
      setStatus(detail || "Échec de l'envoi. Réessaie dans un instant.", "err");
    }
  } catch (err) {
    // Plan B : ouvre l'application mail avec le message prêt
    const subject = encodeURIComponent("Contact portfolio — " + name);
    const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
    setStatus("Connexion impossible. Ouverture de ton application mail...", "err");
    location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  } finally {
    formBtn.disabled = false;
    formBtn.textContent = "Envoyer le message";
  }
});

/* ================= INIT ================= */
// Changement de langue : on réécrit les textes du slider (carte, catégorie, description, pastille)
document.addEventListener("langchange", () => {
  renderCards();
  setDetails(order[0]);
});

$("#total").textContent = String(data.length).padStart(2, "0");
$("#year").textContent = new Date().getFullYear();
bg.style.background = data[order[0]].bg;
renderCards();
setDetails(order[0]);
showDetails();
startTimer();