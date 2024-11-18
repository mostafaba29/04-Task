import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/enTranslation.json';
import arTranslation from '../locales/arTranslation.json';


i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources:{
            en:{translation:enTranslation},
            ar:{translation:arTranslation},
        },
        fallbackLng:'en',
    });

export default i18n;