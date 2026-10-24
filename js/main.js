window.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("languageSwitcher");
  const whatsappLink = document.getElementById("whatsappLink");
  const floatingWhatsapp = document.getElementById("floatingWhatsApp");

  if (!languageSwitcher) return;

  const STORAGE_KEY = "bella-pasta-language";
  const defaultLanguage = "en";

  const getTranslationValue = (language, key) => {
    const keys = key.split(".");
    let value = window.translations && window.translations[language]
      ? window.translations[language]
      : {};

    for (const part of keys) {
      if (!value || typeof value !== "object") {
        return "";
      }
      value = value[part];
    }

    return typeof value === "string" ? value : "";
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

    linkElement.href = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
  };

  const applyLanguage = (language) => {
    const normalizedLanguage = window.translations && window.translations[language]
      ? language
      : defaultLanguage;

    document.documentElement.lang = normalizedLanguage;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const text = getTranslationValue(normalizedLanguage, key);

      if (text) {
        element.textContent = text;
      }
    });

    languageSwitcher.value = normalizedLanguage;
    localStorage.setItem(STORAGE_KEY, normalizedLanguage);

    if (whatsappLink) updateWhatsAppLink(whatsappLink, normalizedLanguage);
    if (floatingWhatsapp) updateWhatsAppLink(floatingWhatsapp, normalizedLanguage);
  };

  const savedLanguage = localStorage.getItem(STORAGE_KEY) || defaultLanguage;
  languageSwitcher.value = savedLanguage;
  applyLanguage(savedLanguage);

  languageSwitcher.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
});
