import i18n from 'i18next';

export const BaseSetting = {
  defaultLanguage: 'fr',
  defaultDesign: 'basic',
  language: i18n.language,
  languageSupport: ['en', 'fr'],

  resourcesLanguage: {
    en: {
      translation: require('./en.json'),
    },

    fr: {
      translation: require('./fr.json'),
    },
  },
};