import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Router from './Router';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

// 初始化国际化库
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    zh: { translation: zhTranslation }
  },
  lng: 'en', // 设置默认语言
  fallbackLng: 'en', // 设置fallback语言
  interpolation: { escapeValue: false }
});

ReactDOM.render(
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
    <Router />
  </React.StrictMode>
  </PersistGate>
</Provider>,
  document.getElementById('root')
);

