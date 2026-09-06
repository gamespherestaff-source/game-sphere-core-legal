/* Data dell'ultimo aggiornamento del portale legale.
   Serve a identificare la versione corrente dei documenti. */
const LEGAL_LAST_UPDATED = Object.freeze({
  iso: "2026-09-06",
  label: "6 settembre 2026",
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

    progress.style.setProperty(
      "--reading-progress",
      `${Math.min(100, (root.scrollTop / available) * 100)}%`
    );

    scheduled = false;
  };

  const scheduleProgress = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(updateProgress);
    }
  };

  updateProgress();

  document.addEventListener("scroll", scheduleProgress, {
    passive: true,
  });

  window.addEventListener("resize", scheduleProgress);
}

document.querySelectorAll(".toc-toggle").forEach((toggle) => {
  const list = document.getElementById(
    toggle.getAttribute("aria-controls")
  );

  if (!list) return;

  const label = toggle.querySelector("span");
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  const setExpanded = (expanded) => {
    toggle.setAttribute("aria-expanded", String(expanded));
    list.hidden = !expanded;

    if (label) {
      label.textContent = expanded
        ? "Nascondi indice"
        : "Mostra indice";
    }
  };

  const adaptToViewport = (event) => {
    setExpanded(!event.matches);
  };

  adaptToViewport(mobileQuery);

  mobileQuery.addEventListener("change", adaptToViewport);

  toggle.addEventListener("click", () => {
    setExpanded(
      toggle.getAttribute("aria-expanded") !== "true"
    );
  });
});

const tocLinks = [
  ...document.querySelectorAll(".toc a[href^='#']")
];

if (tocLinks.length && "IntersectionObserver" in window) {
  const linksById = new Map(
    tocLinks.map((link) => [
      decodeURIComponent(link.hash.slice(1)),
      link,
    ])
  );

  const sections = [
    ...document.querySelectorAll(
      ".legal-document section[id]"
    ),
  ];

  const activate = (id) => {
    tocLinks.forEach((link) => {
      link.removeAttribute("aria-current");
    });

    linksById
      .get(id)
      ?.setAttribute("aria-current", "location");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top -
            b.boundingClientRect.top
        );

      if (visible[0]) {
        activate(visible[0].target.id);
      }
    },
    {
      rootMargin: "-16% 0px -68% 0px",
      threshold: [0, 0.1],
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  if (sections[0]) {
    activate(sections[0].id);
  }
});

/* FAQ accordion:
   i pulsanti nativi mantengono l'interazione
   accessibile anche da tastiera. */
const faqButtons = [
  ...document.querySelectorAll(
    ".faq-item button[aria-controls^='faq-answer-']"
  ),
];

const setFaqExpanded = (button, expanded) => {
  const answer = document.getElementById(
    button.getAttribute("aria-controls")
  );

  if (!answer) return;

  button.setAttribute(
    "aria-expanded",
    String(expanded)
  );

  answer.setAttribute(
    "aria-hidden",
    String(!expanded)
  );

  answer.inert = !expanded;

  button
    .closest(".faq-item")
    ?.classList.toggle("is-open", expanded);
};

faqButtons.forEach((button) => {
  setFaqExpanded(button, false);

  button.addEventListener("click", () => {
    const shouldExpand =
      button.getAttribute("aria-expanded") !== "true";

    faqButtons.forEach((otherButton) => {
      if (otherButton !== button) {
        setFaqExpanded(otherButton, false);
      }
    });

    setFaqExpanded(button, shouldExpand);
  });
});

/* Progressive reveal per i contenuti esistenti.
   Disattivato quando l'utente richiede
   la riduzione delle animazioni. */
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const revealTargets = [
  ...document.querySelectorAll(
    [
      ".home-section > .section-heading",
      ".legal-entry-card",
      ".capability-card",
      ".security-grid article",
      ".faq-item",
      ".staff-access-card",
      ".contact-band",
      ".legal-document section",
    ].join(",")
  ),
];

if (
  !reducedMotion &&
  revealTargets.length &&
  "IntersectionObserver" in window
) {
  document.documentElement.classList.add(
    "reveal-ready"
  );

  revealTargets.forEach((element) => {
    element.classList.add("scroll-reveal");

    if (
      element.matches(
        ".section-heading, .contact-band"
      )
    ) {
      element.classList.add("reveal-soft");
    }

    const peers = [
      ...element.parentElement.children,
    ].filter((child) =>
      revealTargets.includes(child)
    );

    const peerIndex = Math.max(
      0,
      peers.indexOf(element)
    );

    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(peerIndex, 3) * 135}ms`
    );
  });

  const revealObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          revealObserver.unobserve(
            entry.target
          );
        });
      },
      {
        rootMargin: "0px 0px -9% 0px",
        threshold: 0.08,
      }
    );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
}
