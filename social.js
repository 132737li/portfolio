// ====== TES RÉSEAUX SOCIAUX (modifie les liens ici) ======
// L'ordre ci-dessous est l'ordre d'affichage. Un lien vide ("") masque l'icône,
// sauf "freelance" : vide = il mène à la section Tarifs de ton portfolio.
// Pour "freelance", tu peux aussi coller ton profil Fiverr, Upwork, Malt, etc.
const SOCIALS = [
  { id: "instagram", url: "https://www.instagram.com/leoncorazon_26?srtk=MWI5YzRpeXZkNWUzZw==" },
  { id: "facebook",  url: "https://www.facebook.com/share/19WbWMrzqH/" },
  { id: "whatsapp",  url: "https://wa.me/25776672387" },
    { id: "fiverr",    url: "https://www.fiverr.com/leoncorazon26" },
  { id: "x",         url: "https://x.com/IrakozeL2526" },
  { id: "tiktok",    url: "https://www.tiktok.com/@leoncorazon_26" },
  { id: "github",    url: "https://github.com/132737li" },
];

(function () {
  var slot = document.getElementById("socials");
  if (!slot) return;

  // ---------- Icônes (Simple Icons, remplies ; "freelance" = mallette, en traits) ----------
  var ICONS = {
    instagram: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
    facebook: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
    whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
    fiverr: "M23.6 9.5h-5.2v10.1h-3.2V9.5h-6v10.1H6V9.5H2.8v-3h3.3V5.1C6.1 2.6 7.7 1 10.3 1h2.1v3h-1.7c-1.1 0-1.5.5-1.5 1.5v1h8.5c2.6 0 3.9 1.3 3.9 3.9v9.2h-3.2V9.5zM4.4 2.5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8z",
    x: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
    tiktok: "M19.589 6.686a4.793 4.793 0 0 1-4.2-4.7V1h-3.5v13.4a2.9 2.9 0 1 1-2-2.8V8.1a6.4 6.4 0 1 0 5.5 6.3V7.5a8.2 8.2 0 0 0 4.8 1.5V5.5a4.8 4.8 0 0 1-.6-.1z",
    github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  };
  var BRIEFCASE =
    '<svg class="stroke" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>';

  function svg(id) {
    if (id === "freelance") return BRIEFCASE;
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICONS[id] + '"/></svg>';
  }

  // ---------- Noms affichés (infobulle + lecteurs d'écran) ----------
  var NAMES = {
    fr: { instagram: "Instagram", facebook: "Facebook", whatsapp: "WhatsApp",
          fiverr: "Fiverr", tiktok: "TikTok", x: "X (Twitter)", github: "GitHub",
          group: "Mes réseaux sociaux" },
    en: { instagram: "Instagram", facebook: "Facebook", whatsapp: "WhatsApp",
           fiverr: "Fiverr", tiktok: "TikTok", x: "X (Twitter)", github: "GitHub",
          group: "My social networks" },
  };

  // ---------- Style (couleurs de marque au survol) ----------
  var css =
    "footer.site-footer{opacity:1;padding:34px 5vw 26px}" +
    "footer.site-footer .copy{opacity:.65;margin:0}" +
    ".socials{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin:0 0 20px}" +
    ".socials a{position:relative;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;" +
      "color:var(--text,#e6e8ee);background:transparent;text-decoration:none;" +
      "border:1px solid var(--border,#ffffff33);" +
      "transition:background .25s,color .25s,border-color .25s,transform .25s,box-shadow .25s}" +
    ".socials svg{width:20px;height:20px;fill:currentColor;display:block}" +
    ".socials svg.stroke{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}" +
    ".socials a:hover,.socials a:focus-visible{transform:translateY(-4px);color:#fff;border-color:transparent;" +
      "box-shadow:0 10px 20px #0005;outline:none}" +
    ".socials a:focus-visible{box-shadow:0 0 0 3px #ffb02e99,0 10px 20px #0005}" +
    ".socials .s-instagram:hover,.socials .s-instagram:focus-visible{" +
      "background:linear-gradient(45deg,#f09433,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888)}" +
    ".socials .s-facebook:hover,.socials .s-facebook:focus-visible{background:#1877f2}" +
    ".socials .s-whatsapp:hover,.socials .s-whatsapp:focus-visible{background:#25d366}" +
    ".socials .s-fiverr:hover,.socials .s-fiverr:focus-visible{background:#1dbf73}" +
    ".socials .s-tiktok:hover,.socials .s-tiktok:focus-visible{background:#000;border-color:#ffffff55}" +
    ".socials .s-x:hover,.socials .s-x:focus-visible,.socials .s-github:hover,.socials .s-github:focus-visible{" +
      "background:#000;border-color:#ffffff55}" +
    // infobulle
    ".socials a::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 12px);left:50%;" +
      "transform:translate(-50%,4px);padding:5px 11px;border-radius:8px;background:#111;color:#fff;" +
      "border:1px solid #ffffff33;font:500 11px/1.3 system-ui,sans-serif;white-space:nowrap;" +
      "opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:5}" +
    ".socials a:hover::after,.socials a:focus-visible::after{opacity:1;transform:translate(-50%,0)}" +
    "@media (max-width:480px){.socials{gap:10px}.socials a{width:42px;height:42px}}" +
    "@media (prefers-reduced-motion:reduce){.socials a,.socials a::after{transition:none}" +
      ".socials a:hover,.socials a:focus-visible{transform:none}}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  // ---------- Affichage ----------
  function render() {
    var L = document.documentElement.lang === "en" ? "en" : "fr";
    var n = NAMES[L];
    var html = "";
    SOCIALS.forEach(function (s) {
      var url = s.url;
      var external = true;
      if (s.id === "freelance" && !url) {
        url = document.getElementById("pricing") ? "#pricing" : "index.html#pricing";
        external = false;
      }
      if (!url) return;
      html +=
        '<a class="s-' + s.id + '" href="' + url + '" aria-label="' + n[s.id] + '" data-tip="' + n[s.id] + '"' +
        (external ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + svg(s.id) + "</a>";
    });
    slot.innerHTML = '<nav class="socials" aria-label="' + n.group + '">' + html + "</nav>";
  }

  render();
  document.addEventListener("langchange", render);
})();