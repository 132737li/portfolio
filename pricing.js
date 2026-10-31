// ====== RÉGLAGES DE PAIEMENT ======
const PAYMENT = {
  name: "Ultraner",   // nom affiché
  link: "https://ultraner.com/pay/pl_fee2f2acd1a74b73f646019c19592431",
  account: "",        // optionnel : numéro ou identifiant de compte à afficher aux clients
  deposit: 50,        // acompte en %, versé au démarrage
};
const WHATSAPP = "25776672387";

// ====== TES FORFAITS (modifie les prix ici) ======
// Les prix sont écrits à la main dans chaque devise : tu contrôles chaque montant.
const PACKAGES = [
  {
    id: "vitrine", icon: "🌐", popular: false, from: false,
    price: { usd: 60, eur: 55, fbu: 180000 },
    days: { fr: "5 à 7 jours", en: "5 to 7 days" },
    title: { fr: "Site vitrine", en: "Showcase website" },
    desc: {
      fr: "Idéal pour présenter ton activité et être trouvé en ligne.",
      en: "Ideal to present your business and be found online.",
    },
    features: {
      fr: ["Jusqu'à 5 pages", "Design adapté au mobile", "Formulaire de contact", "Boutons WhatsApp et appel", "Mise en ligne incluse"],
      en: ["Up to 5 pages", "Mobile-friendly design", "Contact form", "WhatsApp and call buttons", "Hosting setup included"],
    },
  },
  {
    id: "boutique", icon: "🛍️", popular: true, from: false,
    price: { usd: 150, eur: 140, fbu: 450000 },
    days: { fr: "10 à 14 jours", en: "10 to 14 days" },
    title: { fr: "Boutique en ligne", en: "Online store" },
    desc: {
      fr: "Pour vendre tes produits avec panier et commandes.",
      en: "To sell your products with a cart and orders.",
    },
    features: {
      fr: ["Catalogue de produits et catégories", "Panier et commande WhatsApp", "Design adapté au mobile", "Page contact et à propos", "Mise en ligne incluse", "1 mois de support"],
      en: ["Product catalog and categories", "Cart and WhatsApp ordering", "Mobile-friendly design", "Contact and about pages", "Hosting setup included", "1 month of support"],
    },
  },
  {
    id: "sur-mesure", icon: "🚀", popular: false, from: true,
    price: { usd: 300, eur: 280, fbu: 900000 },
    days: { fr: "selon le projet", en: "depending on the project" },
    title: { fr: "Application ou bot", en: "App or bot" },
    desc: {
      fr: "Application Android, bot WhatsApp avec IA ou outil sur mesure.",
      en: "Android app, WhatsApp bot with AI or a custom tool.",
    },
    features: {
      fr: ["Analyse de ton besoin", "Application Android ou bot WhatsApp", "Fonctionnalités sur mesure", "Tests et corrections", "Support après livraison"],
      en: ["Analysis of your needs", "Android app or WhatsApp bot", "Custom features", "Testing and fixes", "Support after delivery"],
    },
  },
];

const PRICE_UI = {
  fr: {
    nav: "Tarifs", title: "Tarifs",
    sub: "Des forfaits clairs, à payer dans la devise qui t'arrange. Prix indicatifs : chaque projet a un devis gratuit.",
    from: "à partir de", delivery: "Délai", popular: "Le plus demandé",
    order: "Commander ce forfait",
    wa: (t, p) => "Bonjour Léon, je suis intéressé par le forfait « " + t + " » (" + p + "). Peux-tu me donner plus de détails ?",
    payTitle: (n) => "Paiement via " + n,
    payText: (d) => "Un acompte de " + d + " % est versé au démarrage du projet, le solde à la livraison. Je te confirme tout sur WhatsApp avant de commencer.",
    payBtn: (n) => "Payer l'acompte sur " + n,
    account: "Compte :",
    cur: { usd: "Dollar $", eur: "Euro €", fbu: "Franc BU" },
  },
  en: {
    nav: "Pricing", title: "Pricing",
    sub: "Clear packages, payable in the currency that suits you. Prices are indicative: every project gets a free quote.",
    from: "from", delivery: "Delivery", popular: "Most popular",
    order: "Order this package",
    wa: (t, p) => "Hello Léon, I'm interested in the “" + t + "” package (" + p + "). Can you give me more details?",
    payTitle: (n) => "Payment via " + n,
    payText: (d) => "A " + d + "% deposit is paid when the project starts, the balance on delivery. I confirm everything with you on WhatsApp before starting.",
    payBtn: (n) => "Pay the deposit on " + n,
    account: "Account:",
    cur: { usd: "Dollar $", eur: "Euro €", fbu: "BU Franc" },
  },
};

(function () {
  const plans = document.getElementById("plans");
  const sw = document.getElementById("cur-switch");
  const payBox = document.getElementById("pay-box");
  if (!plans || !sw || !payBox) return;

  let currency = "fbu";
  try { currency = localStorage.getItem("currency") || "fbu"; } catch (e) {}

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  function fmt(cur, n, L) {
    const loc = L === "en" ? "en-US" : "fr-FR";
    const num = n.toLocaleString(loc);
    if (cur === "usd") return "$" + num;
    if (cur === "eur") return L === "en" ? "€" + num : num + " €";
    return num + " FBu";
  }

  function render() {
    const L = window.LANG === "en" ? "en" : "fr";
    const ui = PRICE_UI[L];

    // Textes de la section
    document.getElementById("pr-title").textContent = ui.title;
    document.getElementById("pr-sub").textContent = ui.sub;
    const navLink = document.getElementById("nav-pricing");
    if (navLink) navLink.textContent = ui.nav;

    // Sélecteur de devise
    sw.innerHTML = "";
    ["fbu", "usd", "eur"].forEach((c) => {
      const b = el("button", c === currency ? "active" : "", ui.cur[c]);
      b.addEventListener("click", () => {
        currency = c;
        try { localStorage.setItem("currency", c); } catch (e) {}
        render();
      });
      sw.appendChild(b);
    });

    // Forfaits
    plans.innerHTML = "";
    PACKAGES.forEach((p) => {
      const card = el("article", "plan" + (p.popular ? " popular" : ""));
      if (p.popular) card.appendChild(el("span", "plan-tag", ui.popular));

      card.appendChild(el("div", "plan-icon", p.icon));
      card.appendChild(el("h3", "", p.title[L]));
      card.appendChild(el("p", "plan-desc", p.desc[L]));

      const priceBox = el("div", "plan-price");
      if (p.from) priceBox.appendChild(el("small", "", ui.from));
      const priceText = fmt(currency, p.price[currency], L);
      priceBox.appendChild(el("strong", "", priceText));
      card.appendChild(priceBox);

      card.appendChild(el("p", "plan-days", "⏱ " + ui.delivery + " : " + p.days[L]));

      const ul = el("ul", "plan-list");
      p.features[L].forEach((f) => ul.appendChild(el("li", "", f)));
      card.appendChild(ul);

      const a = el("a", "btn", ui.order);
      const label = (p.from ? ui.from + " " : "") + priceText;
      a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(ui.wa(p.title[L], label));
      a.target = "_blank"; a.rel = "noopener";
      card.appendChild(a);

      plans.appendChild(card);
    });

    // Bloc paiement
    payBox.innerHTML = "";
    payBox.appendChild(el("h3", "", "💳 " + ui.payTitle(PAYMENT.name)));
    payBox.appendChild(el("p", "", ui.payText(PAYMENT.deposit)));
    if (PAYMENT.account) payBox.appendChild(el("p", "pay-account", ui.account + " " + PAYMENT.account));
    if (PAYMENT.link) {
      const a = el("a", "btn", ui.payBtn(PAYMENT.name));
      a.href = PAYMENT.link; a.target = "_blank"; a.rel = "noopener";
      payBox.appendChild(a);
    }
  }

  render();
  document.addEventListener("langchange", render);
})();