import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer,
  MapPin,
  Search,
  RefreshCw,
  Snowflake,
  CloudDrizzle
} from 'lucide-react';
import { APIService } from '../utils/api';
import { useTranslation } from '../hooks/useTranslation';

const Weather: React.FC = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState('Москва');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const loadWeather = async (cityName: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await APIService.getWeather(cityName);
      setWeatherData(data);
      setCity(cityName);
    } catch (error) {
      console.error('Error loading weather:', error);
      setError('Не удалось загрузить данные о погоде');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWeather(city);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      loadWeather(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const getWeatherIcon = (iconCode: string, size: string = 'w-full h-full') => {
    const iconMap: { [key: string]: JSX.Element } = {
      '01d': <Sun className={`${size} text-yellow-400`} />,
      '01n': <Sun className={`${size} text-yellow-300`} />,
      '02d': <Cloud className={`${size} text-gray-300`} />,
      '02n': <Cloud className={`${size} text-gray-400`} />,
      '03d': <Cloud className={`${size} text-gray-300`} />,
      '03n': <Cloud className={`${size} text-gray-400`} />,
      '04d': <Cloud className={`${size} text-gray-400`} />,
      '04n': <Cloud className={`${size} text-gray-500`} />,
      '09d': <CloudDrizzle className={`${size} text-blue-400`} />,
      '09n': <CloudDrizzle className={`${size} text-blue-500`} />,
      '10d': <CloudRain className={`${size} text-blue-400`} />,
      '10n': <CloudRain className={`${size} text-blue-500`} />,
      '13d': <Snowflake className={`${size} text-blue-200`} />,
      '13n': <Snowflake className={`${size} text-blue-300`} />
    };
    
    return iconMap[iconCode] || <Sun className={`${size} text-yellow-400`} />;
  };

  const popularCities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'London', 'Paris', 'Tokyo', 'New York', 'Bishkek'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {t('weatherTitle')}
        </h1>
        <p className="text-gray-300">
          {t('weatherDesc')}
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('enterCity')}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 rounded-lg font-semibold text-white transition-colors duration-200 flex items-center space-x-2"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            <span>{t('search')}</span>
          </button>
        </form>

        {/* Popular Cities */}
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">{t('popularCities')}</p>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((popularCity) => (
              <button
                key={popularCity}
                onClick={() => loadWeather(popularCity)}
                disabled={loading}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white transition-colors duration-200 disabled:opacity-50"
              >
                {popularCity}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center">
          {error}
        </div>
      )}

      {/* Weather Data */}
      {weatherData && !loading && (
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Main Weather Card */}
          <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-blue-400 mr-2" />
              <h2 className="text-2xl font-semibold text-white">{weatherData.name}</h2>
            </div>
            
            <div className="w-24 h-24 mx-auto mb-4">
              {getWeatherIcon(weatherData.weather[0].icon)}
            </div>
            
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              {weatherData.main.temp}°C
            </div>
            
            <p className="text-lg text-gray-300 capitalize mb-6">
              {weatherData.weather[0].description}
            </p>
            
            <div className="text-sm text-gray-400">
              {t('feelsLike')} {weatherData.main.feels_like}°C
            </div>
          </div>

          {/* Weather Details */}
          <div className="space-y-4">
            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Thermometer className="w-5 h-5 text-red-400 mr-2" />
                Температура
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Текущая:</span>
                  <div className="text-white font-semibold">{weatherData.main.temp}°C</div>
                </div>
                <div>
                  <span className="text-gray-400">Ощущается:</span>
                  <div className="text-white font-semibold">{weatherData.main.feels_like}°C</div>
                </div>
                <div>
                  <span className="text-gray-400">Минимум:</span>
                  <div className="text-white font-semibold">{weatherData.main.temp_min}°C</div>
                </div>
                <div>
                  <span className="text-gray-400">Максимум:</span>
                  <div className="text-white font-semibold">{weatherData.main.temp_max}°C</div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Droplets className="w-5 h-5 text-blue-400 mr-2" />
                {t('humidity')}
              </h3>
              <div className="text-2xl font-bold text-white">
                {weatherData.main.humidity}%
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${weatherData.main.humidity}%` }}
                />
              </div>
            </div>

            <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Wind className="w-5 h-5 text-green-400 mr-2" />
                Ветер
              </h3>
              <div className="text-2xl font-bold text-white">
                {weatherData.wind.speed} м/с
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {t('windSpeed')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mr-3" />
          <span className="text-white">{t('loading')}</span>
        </div>
      )}
    </div>
  );
};

export default Weather;