// ====== TES PROJETS (modifie ici) ======
// type : "web" | "mobile" | "ia"
// demo / code : laisse "" s'il n'y a pas encore de lien
// img : chemin d'une capture à toi (ex: "images/berlly.jpg"). Si vide et qu'il y a une démo,
//       une capture automatique du site est utilisée.
const PROJECTS = [
  {
    title: "Berlly Boutique", type: "web",
    desc: {
      fr: "Boutique de produits de beauté : catégories, panier, pages produits et contact. Backend Node.js / Express.",
      en: "Beauty products store: categories, cart, product pages and contact. Node.js / Express backend.",
    },
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    demo: "https://132737li.github.io/Berlly_Boutique/",
    code: "https://github.com/132737li/Berlly_Boutique",
    img: "", bg: "linear-gradient(135deg,#1d2b64,#f8cdda)",
  },
  {
    title: "Ltn", type: "web",
    desc: {
      fr: "Site romantique, pensé comme un cadeau numérique : design soigné et animations douces.",
      en: "A romantic website designed as a digital gift: careful design and gentle animations.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://132737li.github.io/Ltn/",
    code: "https://github.com/132737li/Ltn",
    img: "", bg: "linear-gradient(135deg,#ff758c,#c2185b)",
  },
  {
    title: "LionFlow AI", type: "ia",
    desc: {
      fr: "Projet autour de l'intelligence artificielle et de l'automatisation, lié à mon assistant JARVIS.",
      en: "A project around artificial intelligence and automation, linked to my JARVIS assistant.",
    },
    tech: ["JavaScript", "IA"],
    demo: "https://132737li.github.io/lionflow-ai/",
    code: "https://github.com/132737li/lionflow-ai",
    img: "", bg: "linear-gradient(135deg,#141e30,#243b55 60%,#7f00ff)",
  },
  {
    title: "Flower Shop", type: "web",
    desc: {
      fr: "Site de fleurs avec panier et commande directe via WhatsApp.",
      en: "Flower shop website with a cart and direct ordering via WhatsApp.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "", code: "",
    img: "", bg: "linear-gradient(135deg,#ff758c,#ff7eb3 50%,#7a1f4d)",
  },
  {
    title: "Bar Kumunyinya", type: "web",
    desc: {
      fr: "Site de la boutique Brarudi à Gasenyi, Bujumbura : produits, contacts et modes de paiement.",
      en: "Website for the Brarudi shop in Gasenyi, Bujumbura: products, contacts and payment methods.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "", code: "",
    img: "", bg: "linear-gradient(135deg,#f7971e,#ffd200 50%,#7b4a00)",
  },
  {
    title: "SmartAlarm", type: "mobile",
    desc: {
      fr: "Application Android d'alarme intelligente, avec une version web mobile.",
      en: "Smart alarm Android app, with a mobile web version.",
    },
    tech: ["Kotlin", "Jetpack Compose", "Tailwind"],
    demo: "", code: "",
    img: "", bg: "linear-gradient(135deg,#0f2027,#2c5364 60%,#00c6ff)",
  },
  {
    title: "JARVIS", type: "ia",
    desc: {
      fr: "Assistant desktop Windows : commandes vocales, interface moderne et sécurité.",
      en: "Windows desktop assistant: voice commands, modern interface and security.",
    },
    tech: ["Python", "PySide6"],
    demo: "", code: "",
    img: "", bg: "linear-gradient(135deg,#0b1a3a,#0a3d91 60%,#00b4ff)",
  },
  {
    title: "WhatsApp Bot", type: "ia",
    desc: {
      fr: "Bot WhatsApp connecté à OpenAI via l'API Meta et un webhook.",
      en: "WhatsApp bot connected to OpenAI through the Meta API and a webhook.",
    },
    tech: ["Node.js", "OpenAI", "Meta API"],
    demo: "", code: "",
    img: "", bg: "linear-gradient(135deg,#0b3d2e,#11998e 60%,#38ef7d)",
  },
];

const UI = {
  fr: {
    filters: { all: "Tous", web: "Sites web", mobile: "Mobile", ia: "IA & Automatisation" },
    types: { web: "Site web", mobile: "Mobile", ia: "IA" },
    demo: "Démo", code: "Code", soon: "Bientôt en ligne", alt: "Aperçu du projet ",
  },
  en: {
    filters: { all: "All", web: "Websites", mobile: "Mobile", ia: "AI & Automation" },
    types: { web: "Website", mobile: "Mobile", ia: "AI" },
    demo: "Demo", code: "Code", soon: "Coming soon", alt: "Preview of the project ",
  },
};

// ====== CAPTURES AUTOMATIQUES ======
// Les services sont essayés dans l'ordre. Le 1er renvoie d'abord une image d'attente (petite)
// tant qu'il n'a pas photographié le site : on réessaie alors quelques fois.
// minWidth : largeur minimale pour considérer que c'est une vraie capture.
const SHOT_PROVIDERS = [
  {
    url: (u, n) => "https://s.wordpress.com/mshots/v1/" + encodeURIComponent(u) + "?w=800&h=500&r=" + n,
    minWidth: 700, retries: 5, delay: 4000,
  },
  {
    url: (u) => "https://api.microlink.io/?url=" + encodeURIComponent(u) + "&screenshot=true&meta=false&embed=screenshot.url",
    minWidth: 300, retries: 0, delay: 0,
  },
];

const SHOT_PROMISES = {}; // une seule recherche par site, même si on change de langue
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// "good" = vraie capture, "small" = image d'attente, "error" = service indisponible
function probe(src, minWidth) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth >= minWidth ? "good" : "small");
    img.onerror = () => resolve("error");
    img.src = src;
  });
}

async function findShot(demo) {
  for (const prov of SHOT_PROVIDERS) {
    for (let n = 0; n <= prov.retries; n++) {
      const src = prov.url(demo, n);
      const res = await probe(src, prov.minWidth);
      if (res === "good") return src;
      if (res === "error") break;                    // service en panne : on passe au suivant
      if (n < prov.retries) await sleep(prov.delay); // pas encore prête : on patiente
    }
  }
  return null; // aucune capture : on garde le dégradé
}

function getShot(demo) {
  if (!SHOT_PROMISES[demo]) SHOT_PROMISES[demo] = findShot(demo);
  return SHOT_PROMISES[demo];
}

// Petit style pour l'apparition en fondu et l'effet d'attente
(function () {
  const s = document.createElement("style");
  s.textContent =
    ".p-thumb img{opacity:0;transition:opacity .6s}" +
    ".p-thumb img.ok{opacity:1}" +
    ".p-thumb.wait::before{content:'';position:absolute;inset:0;z-index:1;" +
    "background:linear-gradient(110deg,transparent 30%,#ffffff33 50%,transparent 70%);" +
    "background-size:200% 100%;animation:shotwait 1.4s linear infinite}" +
    "@keyframes shotwait{to{background-position:-200% 0}}" +
    "@media (prefers-reduced-motion:reduce){.p-thumb img{transition:none}.p-thumb.wait::before{animation:none}}";
  document.head.appendChild(s);
})();

(function () {
  const grid = document.getElementById("grid");
  const filtersEl = document.getElementById("filters");
  if (!grid || !filtersEl) return;

  let current = "all";

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  function addImg(thumb, src, alt) {
    const img = document.createElement("img");
    img.alt = alt;
    img.decoding = "async";
    img.addEventListener("load", () => img.classList.add("ok"));
    img.addEventListener("error", () => img.remove());
    img.src = src;
    thumb.insertBefore(img, thumb.firstChild);
  }

  function render(animate) {
    const L = window.LANG === "en" ? "en" : "fr";
    const ui = UI[L];
    filtersEl.innerHTML = "";
    grid.innerHTML = "";

    // Filtres
    Object.keys(ui.filters).forEach((id) => {
      const b = el("button", id === current ? "active" : "", ui.filters[id]);
      b.addEventListener("click", () => {
        current = id;
        filtersEl.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        grid.querySelectorAll(".p-card").forEach((c) => {
          c.classList.toggle("hide", id !== "all" && c.dataset.type !== id);
        });
      });
      filtersEl.appendChild(b);
    });

    // Cartes
    PROJECTS.forEach((p) => {
      const card = el("article", "p-card" + (animate ? " reveal" : ""));
      card.dataset.type = p.type;
      if (current !== "all" && p.type !== current) card.classList.add("hide");

      const thumb = el("div", "p-thumb");
      thumb.style.background = p.bg;
      const alt = ui.alt + p.title;

      if (p.img) {
        addImg(thumb, p.img, alt);                   // ta propre capture
      } else if (p.demo) {
        thumb.classList.add("wait");                 // capture automatique
        getShot(p.demo).then((src) => {
          thumb.classList.remove("wait");
          if (src) addImg(thumb, src, alt);
        });
      }
      thumb.appendChild(el("span", "p-type", ui.types[p.type] || p.type));

      const body = el("div", "p-body");
      body.appendChild(el("h3", "", p.title));
      body.appendChild(el("p", "", p.desc[L] || p.desc.fr));

      const tech = el("div", "p-tech");
      p.tech.forEach((t) => tech.appendChild(el("span", "", t)));
      body.appendChild(tech);

      const actions = el("div", "p-actions");
      if (p.demo) {
        const a = el("a", "btn", ui.demo);
        a.href = p.demo; a.target = "_blank"; a.rel = "noopener";
        actions.appendChild(a);
      }
      if (p.code) {
        const a = el("a", "btn ghost dark-text", ui.code);
        a.href = p.code; a.target = "_blank"; a.rel = "noopener";
        actions.appendChild(a);
      }
      if (!p.demo && !p.code) actions.appendChild(el("span", "soon", ui.soon));
      body.appendChild(actions);

      card.append(thumb, body);
      grid.appendChild(card);
    });

    if (animate) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      grid.querySelectorAll(".p-card").forEach((c) => io.observe(c));
    }
  }

  render(true);
  // Changement de langue : on redessine sans animation (les captures déjà trouvées sont réutilisées)
  document.addEventListener("langchange", () => render(false));
})();