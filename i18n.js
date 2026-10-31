(function () {
  const $ = (s) => document.querySelector(s);

  // ===== TEXTES DE LA PAGE =====
  const DICT = {
    fr: {
      "nav.home": "Accueil", "nav.projects": "Projets", "nav.about": "À propos",
      "nav.skills": "Compétences", "nav.contact": "Contact",
      "hero.view": "Voir le projet", "hero.contact": "Me contacter",
      "proj.title": "Projets",
      "proj.sub": "Une sélection de ce que j'ai construit. Clique sur « Démo » pour voir le site en ligne.",
      "about.title": "À propos",
      "about.badge": "Disponible en freelance",
      "about.p1": "Je suis <strong>Léon Corazón</strong>, développeur web basé au Burundi. Je crée des sites modernes, des boutiques en ligne, des applications mobiles et des bots WhatsApp pour les commerces et les particuliers qui veulent être visibles et vendre en ligne.",
      "about.p2": "J'apprends et je progresse chaque jour en construisant des projets concrets, de l'idée jusqu'à la mise en ligne. Mon objectif : te livrer un site propre, rapide et facile à utiliser sur téléphone.",
      "about.s1": "projets réalisés", "about.s2": "domaines : web, mobile, IA", "about.s3": "adapté au mobile",
      "about.cv": "Télécharger mon CV", "about.contact": "Me contacter",
      "about.offer": "Ce que je peux faire pour toi",
      "svc1.t": "Boutique en ligne", "svc1.d": "Catalogue, panier et commande par WhatsApp ou en ligne.",
      "svc2.t": "Site vitrine", "svc2.d": "Un site professionnel pour présenter ton activité.",
      "svc3.t": "Application mobile", "svc3.d": "Applications Android en Kotlin et versions web mobiles.",
      "svc4.t": "Bot et automatisation", "svc4.d": "Bots WhatsApp avec IA et outils qui te font gagner du temps.",
      "skills.title": "Compétences",
      "rev.title": "Avis clients", "rev.sub": "Ce que disent les personnes avec qui j'ai travaillé.",
      "contact.title": "Contact",
      "contact.sub": "Un projet en tête ? Écris-moi sur WhatsApp ou envoie-moi un message ci-dessous.",
      "c.call": "Appeler", "c.linkedin": "Voir mon profil",
      "ph.name": "Ton nom complet","ph.phone": "Ton numéro de téléphone", "ph.email": "Ton email", "ph.msg": "Décris ton projet",
      "form.btn": "Envoyer le message",
      "footer.rights": "Tous droits réservés",
      "meta.title": "Léon Corazón — Développeur Web Freelance",
      "meta.desc": "Léon Corazón, développeur web freelance au Burundi : sites vitrines, boutiques en ligne, applications mobiles et bots WhatsApp. Disponible pour de nouveaux projets.",
      "wa.msg": "Bonjour Léon, j'ai vu ton portfolio et j'ai un projet pour toi.",
      "lang.btn": "EN", "lang.aria": "Switch to English",
    },
    en: {
      "nav.home": "Home", "nav.projects": "Projects", "nav.about": "About",
      "nav.skills": "Skills", "nav.contact": "Contact",
      "hero.view": "View project", "hero.contact": "Contact me",
      "proj.title": "Projects",
      "proj.sub": "A selection of what I have built. Click “Demo” to see the live site.",
      "about.title": "About me",
      "about.badge": "Available for freelance",
      "about.p1": "I'm <strong>Léon Corazón</strong>, a web developer based in Burundi. I build modern websites, online stores, mobile apps and WhatsApp bots for businesses and individuals who want to be visible and sell online.",
      "about.p2": "I learn and improve every day by building real projects, from the idea to going live. My goal: deliver a clean, fast website that is easy to use on a phone.",
      "about.s1": "projects completed", "about.s2": "fields: web, mobile, AI", "about.s3": "mobile-friendly",
      "about.cv": "Download my CV", "about.contact": "Contact me",
      "about.offer": "What I can do for you",
      "svc1.t": "Online store", "svc1.d": "Catalog, cart and ordering via WhatsApp or online.",
      "svc2.t": "Showcase website", "svc2.d": "A professional website to present your business.",
      "svc3.t": "Mobile app", "svc3.d": "Android apps in Kotlin and mobile web versions.",
      "svc4.t": "Bots & automation", "svc4.d": "WhatsApp bots with AI and tools that save you time.",
      "skills.title": "Skills",
      "rev.title": "Client reviews", "rev.sub": "What the people I worked with say.",
      "contact.title": "Contact",
      "contact.sub": "Got a project in mind? Message me on WhatsApp or send me a message below.",
      "c.call": "Call", "c.linkedin": "View my profile",
      "ph.name": "Your complete name","ph.phone": "Your phone number", "ph.email": "Your email", "ph.msg": "Describe your project",
      "form.btn": "Send message",
      "footer.rights": "All rights reserved",
      "meta.title": "Léon Corazón — Freelance Web Developer",
      "meta.desc": "Léon Corazón, freelance web developer in Burundi: showcase websites, online stores, mobile apps and WhatsApp bots. Available for new projects.",
      "wa.msg": "Hello Léon, I saw your portfolio and I have a project for you.",
      "lang.btn": "FR", "lang.aria": "Passer en français",
    },
  };

  // ===== TEXTES DYNAMIQUES (slider + formulaire) : [français, anglais] =====
  const PAIRS = [
    ["Boutique en ligne", "Online store"],
    ["Site vitrine", "Showcase website"],
    ["Commerce local", "Local business"],
    ["Application mobile", "Mobile app"],
    ["Assistant desktop", "Desktop assistant"],
    ["Automatisation", "Automation"],
    ["Site romantique", "Romantic website"],
    ["Intelligence artificielle", "Artificial intelligence"],
    ["Boutique e-commerce avec backend Node.js / Express : catalogue, panier et commandes.", "E-commerce store with a Node.js / Express backend: catalog, cart and orders."],
    ["Site de fleurs en HTML, CSS et JavaScript avec panier et commande via WhatsApp.", "Flower shop website in HTML, CSS and JavaScript with a cart and ordering via WhatsApp."],
    ["Site de la boutique Brarudi à Gasenyi, Bujumbura : produits, contacts et paiements.", "Website for the Brarudi shop in Gasenyi, Bujumbura: products, contacts and payments."],
    ["Application Android en Kotlin / Jetpack Compose, avec une version web mobile.", "Android app in Kotlin / Jetpack Compose, with a mobile web version."],
    ["Assistant Windows en Python / PySide6 : commandes vocales et sécurité.", "Windows assistant in Python / PySide6: voice commands and security."],
    ["Bot WhatsApp connecté à OpenAI via l'API Meta et un webhook.", "WhatsApp bot connected to OpenAI through the Meta API and a webhook."],
    ["Un site romantique pensé comme un cadeau numérique.", "A romantic website designed as a digital gift."],
    ["Projet autour de l'IA et de l'automatisation.", "A project around AI and automation."],
    ["Merci de remplir correctement tous les champs.", "Please fill in all the fields correctly."],
    ["Message envoyé, merci ! Je te réponds vite.", "Message sent, thank you! I'll reply soon."],
    ["Échec de l'envoi. Réessaie dans un instant.", "Sending failed. Please try again in a moment."],
    ["Connexion impossible. Ouverture de ton application mail...", "Connection failed. Opening your mail app..."],
    ["Envoyer le message", "Send message"],
    ["Envoi en cours...", "Sending..."],
  ];
  const FR2EN = {}, EN2FR = {};
  PAIRS.forEach(([f, e]) => { FR2EN[f] = e; EN2FR[e] = f; });

  let lang = "fr";

  function trNode(el) {
    if (!el) return;
    const t = el.textContent.trim();
    const map = lang === "en" ? FR2EN : EN2FR;
    if (map[t] && el.textContent !== map[t]) el.textContent = map[t];
  }
  function trDynamic() {
    ["#d-cat", "#d-desc", "#form-status", "#form-btn"].forEach((s) => trNode($(s)));
    document.querySelectorAll("#cards small").forEach(trNode);
  }

  // Le slider (script.js) réécrit ses textes en français : on les retraduit à chaque changement
  const obs = new MutationObserver(trDynamic);
  ["#d-cat", "#d-desc", "#cards", "#form-status", "#form-btn"].forEach((s) => {
    const el = $(s);
    if (el) obs.observe(el, { childList: true, subtree: true, characterData: true });
  });

  function apply(l) {
    lang = l;
    window.LANG = l;
    const d = DICT[l];
    document.documentElement.lang = l;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = d[el.dataset.i18n];
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const v = d[el.dataset.i18nPh];
      if (v !== undefined) el.placeholder = v;
    });

    document.title = d["meta.title"];
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", d["meta.desc"]);

    const wa = $("#wa-link");
    if (wa) wa.href = "https://wa.me/25776672387?text=" + encodeURIComponent(d["wa.msg"]);

    const btn = $("#lang-toggle");
    if (btn) { btn.textContent = d["lang.btn"]; btn.setAttribute("aria-label", d["lang.aria"]); }

    try { localStorage.setItem("lang", l); } catch (e) {}
    trDynamic();
    document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
  }

  const toggle = $("#lang-toggle");
  if (toggle) toggle.addEventListener("click", () => apply(lang === "fr" ? "en" : "fr"));

  // Langue au démarrage : choix mémorisé, sinon langue du navigateur
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  const initial = saved || ((navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en");
  window.LANG = initial;
  apply(initial);
})();