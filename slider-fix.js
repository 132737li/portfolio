/* Glisser les cartes du slider (souris, doigt, trackpad, clavier).
   Il ne touche pas à ta logique : il appelle simplement tes boutons #prev / #next. */
(function () {
  var stage = document.getElementById("home");
  var next = document.getElementById("next");
  var prev = document.getElementById("prev");
  if (!stage || !next || !prev) return;

  var THRESH = 45;           // distance minimale (px) pour compter comme un glissement
  var sx = 0, sy = 0, active = false, moved = false, suppress = false, locked = 0;

  function fire(dir) {
    var now = Date.now();
    if (now - locked < 450) return;     // évite les doubles déclenchements
    locked = now;
    (dir > 0 ? next : prev).click();
  }

  function onDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    // on ne démarre pas un glissement sur les boutons, liens et barre de contrôle
    if (e.target.closest("a, button, .controls, input, textarea")) return;
    active = true; moved = false; sx = e.clientX; sy = e.clientY;
  }
  function onMove(e) {
    if (!active) return;
    var dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      moved = true; stage.classList.add("dragging");
    }
  }
  function onUp(e) {
    if (!active) return;
    active = false; stage.classList.remove("dragging");
    var dx = e.clientX - sx, dy = e.clientY - sy;
    var swipe = Math.abs(dx) > THRESH && Math.abs(dx) > Math.abs(dy) * 1.2;
    // un vrai glissement ne doit pas ouvrir la carte sous le doigt
    suppress = moved; moved = false;
    setTimeout(function () { suppress = false; }, 60);
    if (swipe) fire(dx < 0 ? 1 : -1);  // glisser vers la gauche = carte suivante
  }
  function onCancel() { active = false; stage.classList.remove("dragging"); }

  stage.addEventListener("pointerdown", onDown);
  window.addEventListener("pointermove", onMove);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointercancel", onCancel);

  // Après un glissement, on bloque le clic « fantôme » sur la carte
  stage.addEventListener("click", function (e) {
    if (suppress && e.isTrusted && !e.target.closest(".controls")) { e.stopPropagation(); e.preventDefault(); }
  }, true);

  // Trackpad : balayage horizontal à deux doigts
  var acc = 0, t = 0;
  stage.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    e.preventDefault();
    acc += e.deltaX; clearTimeout(t); t = setTimeout(function () { acc = 0; }, 160);
    if (Math.abs(acc) > 60) { fire(acc > 0 ? 1 : -1); acc = 0; }
  }, { passive: false });

  // Clavier : flèches gauche/droite (sauf dans un champ de saisie)
  document.addEventListener("keydown", function (e) {
    if (/INPUT|TEXTAREA|SELECT/.test((e.target.tagName || ""))) return;
    var r = stage.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;   // seulement quand le slider est visible
    if (e.key === "ArrowRight") fire(1);
    else if (e.key === "ArrowLeft") fire(-1);
  });
})();