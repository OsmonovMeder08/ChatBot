import { useApp } from '../contexts/AppContext';

const translations = {
  ru: {
    // Navigation
    home: 'Главная',
    weather: 'Погода',
    chat: 'AI Помощник',
    analytics: 'Аналитика',
    profile: 'Профиль',
    about: 'О проекте',
    
    // Common
    loading: 'Загрузка...',
    save: 'Сохранить',
    cancel: 'Отмена',
    search: 'Поиск',
    send: 'Отправить',
    
    // Home page
    welcome: 'Добро пожаловать в',
    welcomeDesc: 'Современная платформа с AI-помощником, прогнозом погоды и продвинутой аналитикой',
    startChat: 'Начать чат',
    checkWeather: 'Узнать погоду',
    
    // Weather
    weatherTitle: 'Прогноз погоды',
    weatherDesc: 'Актуальная информация о погоде в любом городе мира',
    enterCity: 'Введите название города...',
    popularCities: 'Популярные города:',
    feelsLike: 'Ощущается как',
    humidity: 'Влажность',
    windSpeed: 'Скорость ветра',
    
    // Chat
    chatTitle: 'AI Помощник',
    chatDesc: 'Умный чат-бот на базе OpenAI',
    enterMessage: 'Введите ваше сообщение...',
    typing: 'Печатает...',
    
    // Profile
    profileTitle: 'Профиль',
    profileDesc: 'Управление учетной записью и настройками',
    fullName: 'Полное имя',
    email: 'Email адрес',
    theme: 'Тема',
    language: 'Язык',
    notifications: 'Уведомления',
    autoSave: 'Автосохранение',
    saveChanges: 'Сохранить изменения',
    changesSaved: 'Изменения сохранены!',
    
    // Themes
    dark: 'Темная',
    light: 'Светлая',
    auto: 'Авто'
  },
  en: {
    // Navigation
    home: 'Home',
    weather: 'Weather',
    chat: 'AI Assistant',
    analytics: 'Analytics',
    profile: 'Profile',
    about: 'About',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    send: 'Send',
    
    // Home page
    welcome: 'Welcome to',
    welcomeDesc: 'Modern platform with AI assistant, weather forecast and advanced analytics',
    startChat: 'Start Chat',
    checkWeather: 'Check Weather',
    
    // Weather
    weatherTitle: 'Weather Forecast',
    weatherDesc: 'Real-time weather information for any city worldwide',
    enterCity: 'Enter city name...',
    popularCities: 'Popular cities:',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    
    // Chat
    chatTitle: 'AI Assistant',
    chatDesc: 'Smart chatbot powered by OpenAI',
    enterMessage: 'Enter your message...',
    typing: 'Typing...',
    
    // Profile
    profileTitle: 'Profile',
    profileDesc: 'Account and settings management',
    fullName: 'Full Name',
    email: 'Email Address',
    theme: 'Theme',
    language: 'Language',
    notifications: 'Notifications',
    autoSave: 'Auto Save',
    saveChanges: 'Save Changes',
    changesSaved: 'Changes saved!',
    
    // Themes
    dark: 'Dark',
    light: 'Light',
    auto: 'Auto'
  }
};

export const useTranslation = () => {
  const { state } = useApp();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[state.language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t, language: state.language };
};