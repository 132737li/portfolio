// ====== TES TÉMOIGNAGES ======
// N'ajoute que de VRAIS avis, avec l'accord de la personne.
// Tant que la liste est vide, la section « Avis clients » reste cachée.
//
// Exemple de format (supprime les // pour l'activer) :
//
// {
//   name: "Nom du client",
//   role: "Gérante, Berlly Boutique",
//   project: "Berlly Boutique",
//   rating: 5,                               // optionnel, de 1 à 5
//   text: {
//     fr: "Le message exact du client, tel qu'il l'a écrit.",
//     en: "English translation of the message.",
//   },
// },
const TESTIMONIALS = [
];

(function () {
  const section = document.getElementById("reviews");
  const grid = document.getElementById("reviews-grid");
  if (!section || !grid) return;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  function render() {
    const L = window.LANG === "en" ? "en" : "fr";
    grid.innerHTML = "";
    if (!TESTIMONIALS.length) { section.hidden = true; return; }
    section.hidden = false;

    TESTIMONIALS.forEach((t) => {
      const card = el("figure", "review");
      if (t.rating) card.appendChild(el("div", "stars", "★".repeat(t.rating) + "☆".repeat(5 - t.rating)));
      const txt = typeof t.text === "string" ? t.text : (t.text[L] || t.text.fr);
      card.appendChild(el("blockquote", "", txt));

      const who = el("figcaption", "who");
      who.appendChild(el("b", "", t.name));
      if (t.role) who.appendChild(el("span", "", t.role));
      if (t.project) who.appendChild(el("em", "", t.project));
      card.appendChild(who);
      grid.appendChild(card);
    });
  }

  render();
  document.addEventListener("langchange", render);
})();