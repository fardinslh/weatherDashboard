import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "src/locales/en/translation.json";
import faTranslation from "src/locales/fa/translation.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: enTranslation },
    fa: { translation: faTranslation },
  },
});

export default i18n;
