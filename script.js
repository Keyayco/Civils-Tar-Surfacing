(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const form = document.querySelector("#quote-form");
  const errorMessage = document.querySelector("#form-error");
  const year = document.querySelector("#copyright-year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      navigation.classList.remove("is-open");
    };
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navigation.classList.toggle("is-open", !isOpen);
    });
    navigation.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (menuButton.getAttribute("aria-expanded") !== "true") return;
      if (event.target instanceof Node && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  if (form) {
    const phoneField = form.querySelector("#phone");
    if (phoneField instanceof HTMLInputElement) {
      phoneField.addEventListener("input", () => phoneField.setCustomValidity(""));
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const projectType = String(data.get("projectType") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !phone || !projectType || !message) {
        if (errorMessage) errorMessage.textContent = "Please complete all required fields before continuing.";
        return;
      }
      if (phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15) {
        if (phoneField instanceof HTMLInputElement) {
          phoneField.setCustomValidity("Enter a phone number with 7 to 15 digits.");
          phoneField.reportValidity();
        }
        return;
      }
      if (errorMessage) errorMessage.textContent = "";

      const enquiry = [
        "Project enquiry — Civils Tar Surfacing Contractors Polokwane",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Project type: ${projectType}`,
        `Details: ${message}`,
        "",
        "Sent from the independent Devign Digital demo website."
      ].join("\n");

      const whatsappUrl = `https://wa.me/27739593914?text=${encodeURIComponent(enquiry)}`;
      window.location.assign(whatsappUrl);
    });

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = false;
  }
})();
