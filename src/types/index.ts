import "i18next";
import en from "src/locales/en/translation.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof en;
    };
  }
}

export type ThemeMode = "light" | "dark";
