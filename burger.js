(function () {
  const header = document.getElementById("nav");
  const btn = document.getElementById("burger");
  const menu = document.getElementById("main-nav");
  if (!header || !btn || !menu) return;

  const MQ = matchMedia("(max-width: 768px)");

  function setOpen(open) {
    menu.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    btn.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("no-scroll", open && MQ.matches);
    updateLabel();
  }

  function updateLabel() {
    const en = window.LANG === "en";
    const open = menu.classList.contains("open");
    btn.setAttribute("aria-label", en ? (open ? "Close menu" : "Open menu") : (open ? "Fermer le menu" : "Ouvrir le menu"));
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!menu.classList.contains("open"));
  });

  // Ferme le menu après un clic sur un lien, un clic à l'extérieur, ou la touche Échap
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("click", (e) => {
    if (menu.classList.contains("open") && !header.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  MQ.addEventListener("change", () => setOpen(false));
  document.addEventListener("langchange", updateLabel);

  // Surbrillance du lien de la section visible
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href")));

  function spy() {
    const y = window.scrollY + 140;
    let current = null;
    sections.forEach((s) => { if (s && s.offsetTop <= y) current = s.id; });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  }
  addEventListener("scroll", spy, { passive: true });
  addEventListener("resize", spy);
  spy();
  updateLabel();
})();