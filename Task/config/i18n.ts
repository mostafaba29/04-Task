import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/enTranslation.json';
import arTranslation from '../locales/arTranslation.json';

export const formatToArabicNumber = (number:number)=>{
    return new Intl.NumberFormat('ar-EG').format(number);
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources:{
            en:{translation:enTranslation},
            ar:{translation:arTranslation},
        },
        lng: 'ar',
        fallbackLng:'en',
        interpolation: {
            escapeValue: false,
            format: (value, format) => {
              if (format === 'number' || typeof value === 'number') {
                return formatToArabicNumber(value);
              }
              return value;
            }}
    });

export const useArabicNumber = () => {
  return {
    formatNumber: formatToArabicNumber
  };
};
   
export default i18n;