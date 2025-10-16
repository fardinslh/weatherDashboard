import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enTranslation from "src/locales/en/translation.json";
import faTranslation from "src/locales/fa/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "fa"],
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: enTranslation },
      fa: { translation: faTranslation },
    },
  });

i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.dir = lng.startsWith("fa") ? "rtl" : "ltr";
  }
});

if (typeof document !== "undefined") {
  document.documentElement.dir = i18n.language.startsWith("fa") ? "rtl" : "ltr";
}

export default i18n;
