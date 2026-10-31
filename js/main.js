window.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("languageSwitcher");
  const whatsappLinks = ["whatsappLink", "ctaWhatsAppLink", "floatingWhatsApp"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const mainNav = document.getElementById("mainNav");

  if (!languageSwitcher) return;

  const STORAGE_KEY = "bella-pasta-language";
  const defaultLanguage = "en";

  const getTranslationValue = (language, key) => {
    const current = window.translations?.[language] || window.translations?.[defaultLanguage];
    if (!current) return "";
    return current[key] || "";
  };

  const updateWhatsAppLink = (linkElement, language) => {
    const message = {
      en: "Hello Bella Pasta, I would like to book a table.",
      it: "Ciao Bella Pasta, vorrei prenotare un tavolo.",
      es: "Hola Bella Pasta, me gustaría reservar una mesa.",
      pt: "Olá Bella Pasta, gostaria de reservar uma mesa."
    }[language] || {
      en: "Hello Bella Pasta, I would like to book a table.",
      it: "Ciao Bella Pasta, vorrei prenotare un tavolo.",
      es: "Hola Bella Pasta, me gustaría reservar una mesa.",
      pt: "Olá Bella Pasta, gostaria de reservar uma mesa."
    }[defaultLanguage];

    linkElement.href = `https://wa.me/39025550147?text=${encodeURIComponent(message)}`;
  };

  const saveLanguage = (language) => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore storage issues in restricted environments
    }
  };

  const readLanguage = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) || defaultLanguage;
    } catch {
      return defaultLanguage;
    }
  };

  const applyLanguage = (language) => {
    const normalizedLanguage = window.translations?.[language] ? language : defaultLanguage;

    document.documentElement.lang = normalizedLanguage;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const value = getTranslationValue(normalizedLanguage, key);

      if (value) {
        element.textContent = value;
      }
    });

    languageSwitcher.value = normalizedLanguage;
    saveLanguage(normalizedLanguage);

    whatsappLinks.forEach((linkElement) => updateWhatsAppLink(linkElement, normalizedLanguage));
  };

  const savedLanguage = readLanguage();
  languageSwitcher.value = savedLanguage;
  applyLanguage(savedLanguage);

  languageSwitcher.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });

  mainNav?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("show") && window.bootstrap?.Collapse) {
        window.bootstrap.Collapse.getOrCreateInstance(mainNav).hide();
      }
    });
  });
});
