// ====== TES QUESTIONS (modifie les réponses selon tes vraies conditions) ======
const FAQ = [
  {
    q: { fr: "Combien de temps pour réaliser mon site ?", en: "How long does it take to build my website?" },
    a: {
      fr: "En général 5 à 7 jours pour un site vitrine, 10 à 14 jours pour une boutique en ligne. Pour une application ou un bot, on fixe le délai ensemble après avoir défini ton besoin. Le délai commence quand l'acompte est versé et que j'ai reçu tes contenus (textes, photos, logo).",
      en: "Usually 5 to 7 days for a showcase website and 10 to 14 days for an online store. For an app or a bot, we agree on the timeline after defining your needs. The clock starts once the deposit is paid and I have received your content (texts, photos, logo).",
    },
  },
  {
    q: { fr: "De quoi as-tu besoin de ma part ?", en: "What do you need from me?" },
    a: {
      fr: "Ton logo (si tu en as un), les textes de présentation, tes photos, et pour une boutique la liste des produits avec les prix. Si tu n'as pas tout, pas de souci : je t'aide à préparer une première version simple et on la complète ensuite.",
      en: "Your logo (if you have one), the presentation texts, your photos, and for a store the list of products with prices. If you don't have everything, no problem: I'll help you prepare a simple first version and we complete it later.",
    },
  },
  {
    q: { fr: "Comment se passe le paiement ?", en: "How does payment work?" },
    a: {
      fr: "Tu verses un acompte de 50 % au démarrage via Ultraner, et le solde à la livraison, avant la remise finale du projet. Les prix sont disponibles en franc burundais, en dollars et en euros. Je te confirme toujours le montant exact sur WhatsApp avant de commencer.",
      en: "You pay a 50% deposit at the start through Ultraner, and the balance on delivery, before the final handover. Prices are available in Burundian francs, dollars and euros. I always confirm the exact amount with you on WhatsApp before starting.",
    },
  },
  {
    q: { fr: "Puis-je demander des modifications ?", en: "Can I ask for changes?" },
    a: {
      fr: "Oui. Pendant la réalisation, tu peux demander des ajustements (couleurs, textes, images, organisation des pages) : 2 séries de modifications sont incluses. Les changements importants qui modifient le projet de départ font l'objet d'un petit devis supplémentaire.",
      en: "Yes. While I build it, you can ask for adjustments (colors, texts, images, page layout): 2 rounds of changes are included. Major changes that alter the original project get a small extra quote.",
    },
  },
  {
    q: { fr: "Où mon site sera-t-il hébergé ? Faut-il un nom de domaine ?", en: "Where will my site be hosted? Do I need a domain name?" },
    a: {
      fr: "Je mets ton site en ligne gratuitement, avec une adresse du type « ton-nom.github.io/site ». Si tu veux une adresse plus professionnelle (par exemple « tonsite.com »), tu peux acheter un nom de domaine, payé chaque année selon l'extension choisie. Je m'occupe de le configurer pour toi.",
      en: "I put your site online for free, with an address like “your-name.github.io/site”. If you want a more professional address (for example “yoursite.com”), you can buy a domain name, paid yearly depending on the extension. I take care of setting it up for you.",
    },
  },
  {
    q: { fr: "Mon site fonctionnera-t-il sur téléphone ?", en: "Will my site work on a phone?" },
    a: {
      fr: "Oui, tous mes sites sont conçus pour s'afficher correctement sur téléphone, tablette et ordinateur. Beaucoup de tes clients te visiteront depuis leur mobile, donc c'est la priorité.",
      en: "Yes, all my sites are designed to display correctly on phones, tablets and computers. Many of your customers will visit from their mobile, so it's the priority.",
    },
  },
  {
    q: { fr: "Un bot WhatsApp avec IA, ça coûte quoi en plus ?", en: "What does a WhatsApp bot with AI cost on top?" },
    a: {
      fr: "Mon tarif couvre la création et la mise en place du bot. L'utilisation de l'IA (OpenAI) et de l'API WhatsApp (Meta) est facturée directement par ces services, selon le nombre de messages. Je t'explique l'ordre de grandeur avant de commencer, pour qu'il n'y ait pas de surprise.",
      en: "My fee covers building and setting up the bot. Using AI (OpenAI) and the WhatsApp API (Meta) is billed directly by those services, depending on the number of messages. I explain the expected range before we start, so there are no surprises.",
    },
  },
  {
    q: { fr: "Y a-t-il un support après la livraison ?", en: "Is there support after delivery?" },
    a: {
      fr: "Oui. Si quelque chose ne marche pas à cause de mon travail, je le corrige gratuitement. La boutique en ligne inclut 1 mois de support. Après cette période, pour les mises à jour (nouveaux produits, nouvelles pages), on s'arrange simplement au cas par cas.",
      en: "Yes. If something doesn't work because of my work, I fix it for free. The online store includes 1 month of support. After that, for updates (new products, new pages), we simply agree case by case.",
    },
  },
  {
    q: { fr: "Le site m'appartient-il ?", en: "Does the site belong to me?" },
    a: {
      fr: "Oui. À la fin du projet, tu reçois tous les fichiers et l'accès à ton site. Tu n'es lié à moi par aucun abonnement : tu peux le faire évoluer toi-même ou avec quelqu'un d'autre.",
      en: "Yes. At the end of the project, you receive all the files and access to your site. You are not tied to me by any subscription: you can evolve it yourself or with someone else.",
    },
  },
  {
    q: { fr: "Comment démarrer ?", en: "How do we get started?" },
    a: {
      fr: "1) Tu m'écris sur WhatsApp et tu m'expliques ton projet. 2) Je te fais un devis gratuit. 3) Tu verses l'acompte. 4) Je réalise le projet et je te montre l'avancement. 5) Tu valides, tu paies le solde, et ton site est en ligne.",
      en: "1) Message me on WhatsApp and explain your project. 2) I send you a free quote. 3) You pay the deposit. 4) I build the project and show you the progress. 5) You approve, pay the balance, and your site goes live.",
    },
  },
];

const FAQ_UI = {
  fr: {
    title: "Questions fréquentes",
    sub: "Les réponses aux questions que l'on me pose le plus avant de commencer un projet.",
    ctaText: "Tu as une autre question ?",
    ctaBtn: "Me la poser sur WhatsApp",
    wa: "Bonjour Lionel, j'ai une question avant de commencer un projet.",
  },
  en: {
    title: "Frequently asked questions",
    sub: "Answers to the questions I get asked the most before starting a project.",
    ctaText: "Have another question?",
    ctaBtn: "Ask me on WhatsApp",
    wa: "Hello Lionel, I have a question before starting a project.",
  },
};
const FAQ_WHATSAPP = "25776672387";

(function () {
  const list = document.getElementById("faq-list");
  const cta = document.getElementById("faq-cta");
  if (!list || !cta) return;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  function render() {
    const L = window.LANG === "en" ? "en" : "fr";
    const ui = FAQ_UI[L];

    // Garde en mémoire les questions ouvertes pendant le changement de langue
    const opened = new Set();
    list.querySelectorAll("details").forEach((d, i) => { if (d.open) opened.add(i); });

    document.getElementById("faq-title").textContent = ui.title;
    document.getElementById("faq-sub").textContent = ui.sub;

    list.innerHTML = "";
    FAQ.forEach((item, i) => {
      const d = document.createElement("details");
      d.className = "faq-item";
      if (opened.has(i)) d.open = true;
      d.appendChild(el("summary", "", item.q[L]));
      d.appendChild(el("p", "", item.a[L]));
      // Une seule question ouverte à la fois
      d.addEventListener("toggle", () => {
        if (!d.open) return;
        list.querySelectorAll("details").forEach((o) => { if (o !== d) o.open = false; });
      });
      list.appendChild(d);
    });

    cta.innerHTML = "";
    cta.appendChild(el("p", "", ui.ctaText));
    const a = el("a", "btn", ui.ctaBtn);
    a.href = "https://wa.me/" + FAQ_WHATSAPP + "?text=" + encodeURIComponent(ui.wa);
    a.target = "_blank"; a.rel = "noopener";
    cta.appendChild(a);
  }

  render();
  document.addEventListener("langchange", render);
})();