import React,{ useEffect } from 'react';
import ChatList from './ChatList';
import AppBar from './AppBar';
import { useTranslation } from 'react-i18next';
function App() {
  const { i18n } = useTranslation();
  const cleanwhat = 'all';
  useEffect(() => {
    const systemLanguage = navigator.language; // 获取系统语言
    i18n.changeLanguage(systemLanguage);
    document.title = i18n.t('app'); // 设置应用的标题

  }, []);

  return (
    <div>
	<AppBar cleanwhat={cleanwhat} />
	<ChatList/>
    </div>
  )
}

export default App;
