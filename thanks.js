// Redirige vers la page de remerciement quand le message a bien été envoyé
(function () {
  const status = document.getElementById("form-status");
  if (!status) return;
  let done = false;

  new MutationObserver(() => {
    if (done || !status.classList.contains("ok")) return;
    done = true;
    setTimeout(() => { location.href = "merci.html"; }, 800);
  }).observe(status, { attributes: true, attributeFilter: ["class"] });
})();