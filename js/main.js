const restaurantConfig = {
  whatsappNumber: "5511999999999",
  phone: "+39 02 555 0147",
  whatsappMessage: {
    en: "Hello Bella Pasta, I would like to book a table.",
    it: "Ciao Bella Pasta, vorrei prenotare un tavolo.",
    es: "Hola Bella Pasta, me gustaría reservar una mesa.",
    pt: "Olá Bella Pasta, gostaria de reservar uma mesa."
  }
};

const STORAGE_KEY = "bella-pasta-language";
const defaultLanguage = "en";

(function () {
  const languageSwitcher = document.getElementById("languageSwitcher");
  const whatsappLink = document.getElementById("whatsappLink");
  const floatingWhatsapp = document.getElementById("floatingWhatsApp");

  if (!languageSwitcher) {
    return;
  }

  const savedLanguage = localStorage.getItem(STORAGE_KEY) || defaultLanguage;
  languageSwitcher.value = savedLanguage;

  function applyLanguage(language) {
    const normalizedLanguage = translations && translations[language] ? language : defaultLanguage;

    document.documentElement.lang = normalizedLanguage;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const value = getTranslationValue(normalizedLanguage, key);

      if (value) {
        element.textContent = value;
      }
    });

    languageSwitcher.value = normalizedLanguage;
    localStorage.setItem(STORAGE_KEY, normalizedLanguage);

    if (whatsappLink) {
      updateWhatsAppLink(whatsappLink, normalizedLanguage);
    }

    if (floatingWhatsapp) {
      updateWhatsAppLink(floatingWhatsapp, normalizedLanguage);
    }
  }

  function getTranslationValue(language, key) {
    const keys = key.split(".");
    let value = translations && translations[language] ? translations[language] : {};

    for (const part of keys) {
      if (!value || typeof value !== "object") {
        return "";
      }
      value = value[part];
    }

    return typeof value === "string" ? value : "";
  }

  function updateWhatsAppLink(linkElement, language) {
    const message =
      restaurantConfig.whatsappMessage[language] ||
      restaurantConfig.whatsappMessage[defaultLanguage];

    const url = `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    linkElement.href = url;
  }

  applyLanguage(savedLanguage);

  languageSwitcher.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });

  if (whatsappLink) {
    updateWhatsAppLink(whatsappLink, savedLanguage);
  }

  if (floatingWhatsapp) {
    updateWhatsAppLink(floatingWhatsapp, savedLanguage);
  }
})();
