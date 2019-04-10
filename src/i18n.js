import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(Backend)
    .init({
        backend: {
            // for all available options read the backend's repository readme file
            loadPath: '/locale/{{lng}}.json'
        },
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        }
    });
export default i18n;