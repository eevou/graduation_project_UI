import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enHome from './Local/EN/Home.json';
import enCollege from "./Local/EN/College.json"
import enContact from "./Local/EN/Contact.json"

import arHome from './Local/AR/Home.json';
import arCollege from "./Local/AR/College.json"
import arContact from "./Local/AR/Contact.json"

import asHome from './Local/AS/Home.json';
import asCollege from "./Local/AS/College.json"
import asContact from "./Local/AS/Contact.json"


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arHome,
        Contact: arContact,
        College: arCollege,
      },
      en: {
        translation: enHome,
        Contact: enContact,
        College: enCollege,
      },
      as: {
        translation: asHome,
        Contact: asContact,
        College: asCollege,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });
 
export default i18n;