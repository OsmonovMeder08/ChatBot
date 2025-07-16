import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Globe,
  Shield,
  Save,
  Camera,
  Check
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';

const Profile: React.FC = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || ''
  });

  const handleSave = () => {
    // Update user data
    dispatch({ 
      type: 'SET_USER', 
      payload: { 
        ...state.user, 
        name: formData.name, 
        email: formData.email 
      } 
    });

    // Show success message
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const handleLanguageChange = (language: 'ru' | 'en') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const handleNotificationsChange = (enabled: boolean) => {
    dispatch({ type: 'SET_NOTIFICATIONS', payload: enabled });
  };

  const handleAutoSaveChange = (enabled: boolean) => {
    dispatch({ type: 'SET_AUTO_SAVE', payload: enabled });
  };

  const tabs = [
    { id: 'profile', name: t('profile'), icon: User },
    { id: 'settings', name: t('settings'), icon: Settings },
    { id: 'notifications', name: t('notifications'), icon: Bell },
    { id: 'security', name: 'Безопасность', icon: Shield }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">{t('profileTitle')}</h1>
        <p className="text-gray-300">{t('profileDesc')}</p>
      </div>

      {/* Success Message */}
      {showSaveMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-400 flex items-center space-x-2 animate-slide-up">
          <Check size={20} />
          <span>{t('changesSaved')}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="glass-card p-2">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="glass-card p-8">
          <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors duration-200">
                  <Camera size={16} />
                </button>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-colors duration-200">
                Изменить фото
              </button>
            </div>

            {/* Profile Form */}
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Роль
                  </label>
                  <input
                    type="text"
                    value="Администратор"
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Дата регистрации
                  </label>
                  <input
                    type="text"
                    value="15 января 2024"
                    disabled
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Основные настройки</h2>
            
            <div className="space-y-6">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {state.theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  )}
                  <div>
                    <div className="text-white font-medium">{t('theme')}</div>
                    <div className="text-gray-400 text-sm">Выберите тему интерфейса</div>
                  </div>
                </div>
                <select
                  value={state.theme}
                  onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dark">{t('dark')}</option>
                  <option value="light">{t('light')}</option>
                </select>
              </div>

              {/* Language */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">{t('language')}</div>
                    <div className="text-gray-400 text-sm">Язык интерфейса</div>
                  </div>
                </div>
                <select
                  value={state.language}
                  onChange={(e) => handleLanguageChange(e.target.value as 'ru' | 'en')}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>

              {/* Auto Save */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Save className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">{t('autoSave')}</div>
                    <div className="text-gray-400 text-sm">Автоматически сохранять изменения</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.autoSave}
                    onChange={(e) => handleAutoSaveChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Настройки уведомлений</h2>
          
          <div className="space-y-6">
            {[
              { title: 'Push уведомления', desc: 'Получать уведомления в браузере', checked: state.notifications },
              { title: 'Email уведомления', desc: 'Получать уведомления на email', checked: true },
              { title: 'Уведомления о чатах', desc: 'Уведомления о новых сообщениях', checked: true },
              { title: 'Уведомления о погоде', desc: 'Предупреждения о погодных условиях', checked: false }
            ].map((notification, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{notification.title}</div>
                  <div className="text-gray-400 text-sm">{notification.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={notification.checked}
                    onChange={(e) => index === 0 && handleNotificationsChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Безопасность</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Изменить пароль</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Текущий пароль"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Новый пароль"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Подтвердить новый пароль"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white transition-colors duration-200">
                    Обновить пароль
                  </button>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium text-white mb-4">Активные сессии</h3>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome на Windows', location: 'Бишкек, Кыргызстан', current: true },
                    { device: 'Safari на MacBook', location: 'Кызыл-Токой, Кыргызстан', current: false },
                    { device: 'Mobile App', location: 'Ош, Кыргызстан', current: false }
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{session.device}</div>
                        <div className="text-gray-400 text-sm">{session.location}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {session.current && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Текущая
                          </span>
                        )}
                        {!session.current && (
                          <button className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200">
                            Завершить
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-center">
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-white transition-all duration-200 flex items-center space-x-2"
        >
          <Save size={20} />
          <span>{t('saveChanges')}</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;