import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enHome from './Local/EN/Home.json';
import arHome from './Local/AR/Home.json';
import asHome from './Local/AS/Home.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arHome,
      },
      en: {
        translation: enHome,
      },
      as: {
        translation: asHome,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
 
export default i18n;