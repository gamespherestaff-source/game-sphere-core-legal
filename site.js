/* Aggiornare qui la data legale mostrata in tutte le pagine. */
const LEGAL_LAST_UPDATED = Object.freeze({
  iso: "2026-08-07",
  label: "7 agosto 2026",
});

document.documentElement.classList.add("js");

document.querySelectorAll("[data-legal-date]").forEach((element) => {
  element.textContent = LEGAL_LAST_UPDATED.label;
  if (element.tagName === "TIME") {
    element.dateTime = LEGAL_LAST_UPDATED.iso;
  }
});

const progress = document.querySelector("[data-reading-progress]");
if (progress) {
  let scheduled = false;
  const updateProgress = () => {
    const root = document.documentElement;
    const available = Math.max(1, root.scrollHeight - root.clientHeight);
    progress.style.setProperty("--reading-progress", `${Math.min(100, (root.scrollTop / available) * 100)}%`);
    scheduled = false;
  };
  const scheduleProgress = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateProgress);
    }
  };
  updateProgress();
  document.addEventListener("scroll", scheduleProgress, { passive: true });
  window.addEventListener("resize", scheduleProgress);
}

document.querySelectorAll(".toc-toggle").forEach((toggle) => {
  const list = document.getElementById(toggle.getAttribute("aria-controls"));
  if (!list) return;

  const label = toggle.querySelector("span");
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  const setExpanded = (expanded) => {
    toggle.setAttribute("aria-expanded", String(expanded));
    list.hidden = !expanded;
    if (label) label.textContent = expanded ? "Nascondi indice" : "Mostra indice";
  };

  const adaptToViewport = (event) => setExpanded(!event.matches);
  adaptToViewport(mobileQuery);
  mobileQuery.addEventListener("change", adaptToViewport);
  toggle.addEventListener("click", () => setExpanded(toggle.getAttribute("aria-expanded") !== "true"));
});

const tocLinks = [...document.querySelectorAll(".toc a[href^='#']")];
if (tocLinks.length && "IntersectionObserver" in window) {
  const linksById = new Map(tocLinks.map((link) => [decodeURIComponent(link.hash.slice(1)), link]));
  const sections = [...document.querySelectorAll(".legal-document section[id]")];
  const activate = (id) => {
    tocLinks.forEach((link) => link.removeAttribute("aria-current"));
    linksById.get(id)?.setAttribute("aria-current", "location");
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) activate(visible[0].target.id);
  }, { rootMargin: "-16% 0px -68% 0px", threshold: [0, 0.1] });

  sections.forEach((section) => observer.observe(section));
  if (sections[0]) activate(sections[0].id);
}
