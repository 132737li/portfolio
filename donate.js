// ====== DON (modifie ici) ======
// Le lien de paiement sécurisé Ultraner. Plus aucun lien WhatsApp dans cette fenêtre.
const DONATE = {
  link: "https://ultraner.com/pay/pl_689b50192eb588b266fbed28c356dca7",
};

(function () {
  var TXT = {
    fr: {
      title: "Soutenir mon travail",
      text: "Si mes projets te plaisent ou t'aident, tu peux m'encourager par un don. Chaque contribution m'aide à continuer d'apprendre et à créer de nouveaux projets. Merci du fond du cœur !",
      pay: "Faire un don",
      note: "Paiement sécurisé sur Ultraner. Tu choisis le montant sur la page suivante.",
      close: "Fermer",
    },
    en: {
      title: "Support my work",
      text: "If you like my projects or they help you, you can encourage me with a donation. Every contribution helps me keep learning and building new projects. Thank you so much!",
      pay: "Make a donation",
      note: "Secure payment on Ultraner. You choose the amount on the next page.",
      close: "Close",
    },
  };

  var css =
    ".dn-back{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;" +
      "padding:20px;background:#000a;backdrop-filter:blur(4px)}" +
    ".dn-back.open{display:flex;animation:dnfade .25s ease both}" +
    ".dn-box{position:relative;width:100%;max-width:440px;padding:34px 28px 26px;border-radius:22px;text-align:center;" +
      "background:var(--bg2,#17171b);color:var(--text,#fff);border:1px solid var(--border,#ffffff33);" +
      "box-shadow:0 24px 70px #000a;animation:dnrise .3s ease both}" +
    ".dn-ico{font-size:38px;line-height:1;margin-bottom:10px}" +
    ".dn-box h3{font-size:22px;margin:0 0 10px}" +
    ".dn-box p.dn-text{font-size:14px;line-height:1.75;opacity:.88;margin:0 0 22px}" +
    ".dn-pay{display:inline-block;padding:13px 30px;border-radius:40px;background:var(--accent,#ffb02e);color:#111;" +
      "font-weight:600;font-size:14px;text-decoration:none;border:1px solid var(--accent,#ffb02e);transition:transform .2s}" +
    ".dn-pay:hover{transform:translateY(-2px)}" +
    ".dn-note{font-size:11px;opacity:.65;margin:14px 0 0}" +
    ".dn-x{position:absolute;top:10px;right:12px;width:34px;height:34px;border-radius:50%;border:0;cursor:pointer;" +
      "background:transparent;color:inherit;font-size:22px;line-height:1;opacity:.7}" +
    ".dn-x:hover{opacity:1;background:#ffffff18}" +
    "@keyframes dnfade{from{opacity:0}to{opacity:1}}" +
    "@keyframes dnrise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}" +
    "@media (prefers-reduced-motion:reduce){.dn-back.open,.dn-box{animation:none}.dn-pay{transition:none}}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var back = document.createElement("div");
  back.className = "dn-back";
  back.innerHTML =
    '<div class="dn-box" role="dialog" aria-modal="true" aria-labelledby="dn-title">' +
    '<button type="button" class="dn-x" id="dn-close">&times;</button>' +
    '<div class="dn-ico" aria-hidden="true">☕</div>' +
    '<h3 id="dn-title"></h3><p class="dn-text" id="dn-text"></p>' +
    '<a class="dn-pay" id="dn-pay" target="_blank" rel="noopener noreferrer"></a>' +
    '<p class="dn-note" id="dn-note"></p></div>';
  document.body.appendChild(back);

  var $ = function (s) { return back.querySelector(s); };
  var lastFocus = null;

  function fill() {
    var t = TXT[document.documentElement.lang === "en" ? "en" : "fr"];
    $("#dn-title").textContent = t.title;
    $("#dn-text").textContent = t.text;
    $("#dn-pay").textContent = t.pay;
    $("#dn-pay").href = DONATE.link;
    $("#dn-note").textContent = t.note;
    $("#dn-close").setAttribute("aria-label", t.close);
  }

  function open() {
    fill();
    lastFocus = document.activeElement;
    back.classList.add("open");
    document.body.style.overflow = "hidden";
    $("#dn-pay").focus();
  }
  function close() {
    back.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // Tous les boutons « don » de la page (accueil, pied de page...)
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-donate]");
    if (b) { e.preventDefault(); open(); }
  });
  $("#dn-close").addEventListener("click", close);
  back.addEventListener("click", function (e) { if (e.target === back) close(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && back.classList.contains("open")) close();
  });
  document.addEventListener("langchange", fill);
  fill();
})();