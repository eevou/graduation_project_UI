import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enHome from './local/EN/Home.json';
import arHome from './local/AR/Home.json';
import asHome from './local/AS/Home.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        home: arHome,
      },
      en: {
        home: enHome,
      },
      as: {
        home: asHome,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
 
export default i18n;