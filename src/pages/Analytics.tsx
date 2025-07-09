import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Cloud,
  Activity,
  Calendar,
  Clock
} from 'lucide-react';
import { APIService } from '../utils/api';

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('week');

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const data = await APIService.getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error loading analytics:', error);
      }
      setLoading(false);
    };

    loadAnalytics();
  }, [timeframe]);

  const metrics = [
    {
      title: 'Использование чата',
      value: analytics?.chatUsage || 0,
      change: '+12%',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      description: 'сообщений за неделю'
    },
    {
      title: 'Запросы погоды',
      value: analytics?.weatherRequests || 0,
      change: '+8%',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      description: 'запросов за неделю'
    },
    {
      title: 'Всего сессий',
      value: analytics?.totalSessions || 0,
      change: '+15%',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      description: 'уникальных сессий'
    },
    {
      title: 'Среднее время',
      value: `${analytics?.avgSessionTime || 0} мин`,
      change: '+3%',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      description: 'время сессии'
    }
  ];

  const chartData = [
    { day: 'Пн', chats: 45, weather: 23 },
    { day: 'Вт', chats: 52, weather: 31 },
    { day: 'Ср', chats: 38, weather: 28 },
    { day: 'Чт', chats: 61, weather: 35 },
    { day: 'Пт', chats: 49, weather: 29 },
    { day: 'Сб', chats: 33, weather: 18 },
    { day: 'Вс', chats: 27, weather: 15 }
  ];

  const maxValue = Math.max(...chartData.map(d => Math.max(d.chats, d.weather)));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Аналитика</h1>
          <p className="text-gray-300 mt-2">Подробная статистика использования платформы</p>
        </div>
        
        <div className="flex space-x-2">
          {['day', 'week', 'month'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                timeframe === period
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {period === 'day' ? 'День' : period === 'week' ? 'Неделя' : 'Месяц'}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="glass-card p-6 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} p-3`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{metric.change}</span>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-gray-400 text-sm">{metric.title}</h3>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <p className="text-gray-500 text-xs">{metric.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <BarChart3 className="mr-3 text-blue-400" />
            Активность по дням
          </h2>
          
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={data.day} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{data.day}</span>
                  <div className="flex space-x-4">
                    <span className="text-purple-400">Чаты: {data.chats}</span>
                    <span className="text-blue-400">Погода: {data.weather}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 h-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(data.chats / maxValue) * 100}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(data.weather / maxValue) * 100}%`,
                      animationDelay: `${index * 0.1 + 0.05}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trends */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="mr-3 text-green-400" />
            Тренды
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-white">Рост активности</span>
              </div>
              <span className="text-green-400 font-semibold">+24%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-white">Новые пользователи</span>
              </div>
              <span className="text-blue-400 font-semibold">+18%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-white">Время сессии</span>
              </div>
              <span className="text-purple-400 font-semibold">+12%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-white">Возвращения</span>
              </div>
              <span className="text-orange-400 font-semibold">+8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Activity className="mr-3 text-blue-400" />
          Recent Activity
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-gray-400">Время</th>
                <th className="text-left py-3 text-gray-400">Действие</th>
                <th className="text-left py-3 text-gray-400">Пользователь</th>
                <th className="text-left py-3 text-gray-400">Статус</th>
              </tr>
            </thead>
            <tbody className="space-y-2">
              {[
                { time: '14:32', action: 'Запрос погоды', user: 'user_001', status: 'success' },
                { time: '14:28', action: 'Новый чат', user: 'user_002', status: 'success' },
                { time: '14:25', action: 'Просмотр аналитики', user: 'user_001', status: 'success' },
                { time: '14:20', action: 'Запрос погоды', user: 'user_003', status: 'error' },
                { time: '14:18', action: 'Обновление профиля', user: 'user_002', status: 'success' }
              ].map((activity, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                  <td className="py-3 text-gray-300">{activity.time}</td>
                  <td className="py-3 text-white">{activity.action}</td>
                  <td className="py-3 text-gray-300">{activity.user}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activity.status === 'success' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {activity.status === 'success' ? 'Успешно' : 'Ошибка'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;