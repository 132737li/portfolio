// ====== RÉGLAGES DU DON ======
const DONATE = {
  link: "https://ultraner.com/pay/pl_689b50192eb588b266fbed28c356dca7",
  name: "Ultraner",
  whatsapp: "25776672387",
};

const DONATE_UI = {
  fr: {
    hero: "☕ Faire un don",
    footer: "Soutenir mon travail",
    title: "Soutenir mon travail",
    text: "Ce portfolio et mes projets sont faits avec passion. Si mon travail t'a plu ou t'a été utile, tu peux m'encourager avec un petit don. C'est totalement libre : chaque geste m'aide à continuer à apprendre et à créer.",
    give: "Faire un don via ",
    wa: "Me contacter sur WhatsApp",
    waDonate: "Faire un don : me contacter sur WhatsApp",
    waMsg: "Bonjour Lionel, j'aimerais soutenir ton travail par un don. Comment faire ?",
    note: "Un don est un geste volontaire, il ne donne pas droit à un service. Pour un projet, ",
    noteLink: "voir mes tarifs",
    close: "Fermer",
  },
  en: {
    hero: "☕ Support me",
    footer: "Support my work",
    title: "Support my work",
    text: "This portfolio and my projects are made with passion. If you liked my work or found it useful, you can encourage me with a small donation. It's completely optional: every gesture helps me keep learning and creating.",
    give: "Donate via ",
    wa: "Message me on WhatsApp",
    waDonate: "Donate: message me on WhatsApp",
    waMsg: "Hello Lionel, I'd like to support your work with a donation. How can I do it?",
    note: "A donation is a voluntary gesture and doesn't entitle you to a service. For a project, ",
    noteLink: "see my pricing",
    close: "Close",
  },
};

(function () {
  const triggers = document.querySelectorAll("[data-donate]");
  if (!triggers.length) return;

  let lastFocus = null;

  // Construction de la fenêtre
  const overlay = document.createElement("div");
  overlay.className = "d-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML =
    '<div class="d-modal" role="dialog" aria-modal="true" aria-labelledby="d-title" tabindex="-1">' +
      '<button type="button" class="d-close" id="d-close">×</button>' +
      '<div class="d-heart" aria-hidden="true">❤️</div>' +
      '<h3 id="d-title"></h3>' +
      '<p id="d-text"></p>' +
      '<div class="d-actions" id="d-actions"></div>' +
      '<p class="d-note" id="d-note"></p>' +
    "</div>";
  document.body.appendChild(overlay);

  const modal = overlay.querySelector(".d-modal");
  const closeBtn = overlay.querySelector("#d-close");

  const link = (cls, text, href) => {
    const a = document.createElement("a");
    a.className = cls; a.textContent = text; a.href = href;
    a.target = "_blank"; a.rel = "noopener";
    return a;
  };

  function render() {
    const L = window.LANG === "en" ? "en" : "fr";
    const ui = DONATE_UI[L];
    const waHref = "https://wa.me/" + DONATE.whatsapp + "?text=" + encodeURIComponent(ui.waMsg);

    triggers.forEach((t) => { t.textContent = ui[t.dataset.donate] || ui.hero; });
    closeBtn.setAttribute("aria-label", ui.close);
    overlay.querySelector("#d-title").textContent = ui.title;
    overlay.querySelector("#d-text").textContent = ui.text;

    const actions = overlay.querySelector("#d-actions");
    actions.innerHTML = "";
    if (DONATE.link) {
      actions.appendChild(link("btn", ui.give + DONATE.name, DONATE.link));
      actions.appendChild(link("btn ghost dark-text", ui.wa, waHref));
    } else {
      actions.appendChild(link("btn wa", ui.waDonate, waHref));
    }

    const note = overlay.querySelector("#d-note");
    note.textContent = ui.note;
    const a = document.createElement("a");
    a.href = "#pricing"; a.textContent = ui.noteLink;
    a.addEventListener("click", close);
    note.appendChild(a);
    note.appendChild(document.createTextNode("."));
  }

  function open() {
    lastFocus = document.activeElement;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn.focus();
  }
  function close() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  triggers.forEach((t) => t.addEventListener("click", open));
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") { close(); return; }
    // Garde le focus à l'intérieur de la fenêtre (touche Tab)
    if (e.key === "Tab") {
      const f = modal.querySelectorAll("a[href], button");
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  render();
  document.addEventListener("langchange", render);
})();