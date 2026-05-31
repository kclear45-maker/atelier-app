(() => {
  const body = document.body;
  const openBtn = document.getElementById("menu-toggle");
  const overlay = document.getElementById("drawer-overlay");
  const drawer = document.getElementById("drawer");

  function closeMenu() {
    body.classList.remove("menu-open");
    openBtn?.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    body.classList.add("menu-open");
    openBtn?.setAttribute("aria-expanded", "true");
  }

  openBtn?.addEventListener("click", () => {
    if (body.classList.contains("menu-open")) closeMenu();
    else openMenu();
  });

  overlay?.addEventListener("click", closeMenu);

  drawer?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
