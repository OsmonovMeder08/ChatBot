import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cloud, 
  MessageCircle, 
  BarChart3, 
  Users, 
  Activity,
  TrendingUp,
  Zap,
  Globe
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalChats: 0,
    weatherRequests: 0,
    uptime: 0
  });

  useEffect(() => {
    // Animate stats loading
    const timer = setTimeout(() => {
      setStats({
        activeUsers: 1247,
        totalChats: 15683,
        weatherRequests: 8924,
        uptime: 99.9
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Cloud,
      title: t('weather'),
      description: 'Точные данные о погоде в реальном времени для любого города',
      href: '/weather',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageCircle,
      title: t('chat'),
      description: 'Умный чат-бот на базе OpenAI для решения ваших задач',
      href: '/chat',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: t('analytics'),
      description: 'Подробная статистика использования и производительности',
      href: '/analytics',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const quickStats = [
    { label: 'Активные пользователи', value: stats.activeUsers, icon: Users },
    { label: 'Всего чатов', value: stats.totalChats, icon: MessageCircle },
    { label: 'Запросов погоды', value: stats.weatherRequests, icon: Cloud },
    { label: 'Время работы', value: `${stats.uptime}%`, icon: Activity }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            {t('welcome')}{' '}
            <span className="gradient-text">MedaX</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('welcomeDesc')}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/chat"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-200 flex items-center space-x-2"
          >
            <Zap size={20} />
            <span>{t('startChat')}</span>
          </Link>
          <Link
            to="/weather"
            className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-semibold text-white hover:bg-white/20 transition-colors duration-200 flex items-center space-x-2"
          >
            <Globe size={20} />
            <span>{t('checkWeather')}</span>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass-card p-6 text-center animate-slide-up hover:scale-105 transition-transform duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-2xl font-bold text-white mb-1">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.href}
              className="group glass-card p-8 hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-blue-400 group-hover:text-blue-300">
                <span className="text-sm font-medium">Перейти</span>
                <TrendingUp size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Activity className="mr-3 text-blue-400" />
          Последняя активность
        </h2>
        <div className="space-y-4">
          {[
            { action: 'Новый чат создан', time: '2 минуты назад', type: 'chat' },
            { action: 'Запрос погоды для Москвы', time: '5 минут назад', type: 'weather' },
            { action: 'Обновлена аналитика', time: '10 минут назад', type: 'analytics' },
            { action: 'Пользователь зарегистрирован', time: '15 минут назад', type: 'user' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0 hover:bg-white/5 rounded-lg px-2 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'chat' ? 'bg-purple-500' :
                  activity.type === 'weather' ? 'bg-blue-500' :
                  activity.type === 'analytics' ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                <span className="text-white">{activity.action}</span>
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;