// Вместо жесткого импорта ключей, берем из переменных окружения Vite
const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

interface Wind {
  speed: number;
}

export interface WeatherData {
  name: string;
  main: WeatherMain;
  weather: WeatherCondition[];
  wind: Wind;
}

export class APIService {
  static async getWeather(city: string): Promise<WeatherData> {
    try {
      if (WEATHER_API_KEY) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`
        );

        if (!response.ok) {
          throw new Error(`OpenWeather API error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
          ...data,
          main: {
            ...data.main,
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            temp_min: Math.round(data.main.temp_min),
            temp_max: Math.round(data.main.temp_max),
          },
        };
      }

      return this.getDemoWeather(city);
    } catch (error) {
      console.error('Weather API error:', error);
      return this.getDemoWeather(city);
    }
  }

  private static getDemoWeather(city: string): WeatherData {
    const demoTemps: Record<string, { temp: number; desc: string; icon: string }> = {
      москва: { temp: -5, desc: 'облачно с прояснениями', icon: '02d' },
      'санкт-петербург': { temp: -8, desc: 'снег', icon: '13d' },
      новосибирск: { temp: -15, desc: 'ясно', icon: '01d' },
      екатеринбург: { temp: -12, desc: 'облачно', icon: '03d' },
      казань: { temp: -7, desc: 'небольшой снег', icon: '13d' },
      london: { temp: 8, desc: 'дождь', icon: '10d' },
      paris: { temp: 12, desc: 'ясно', icon: '01d' },
      tokyo: { temp: 15, desc: 'облачно', icon: '03d' },
      'new york': { temp: 5, desc: 'снег', icon: '13d' },
    };

    const cityLower = city.toLowerCase();
    const weatherData = demoTemps[cityLower] || { temp: 20, desc: 'ясно', icon: '01d' };

    return {
      name: city,
      main: {
        temp: weatherData.temp,
        feels_like: weatherData.temp - 2,
        temp_min: weatherData.temp - 3,
        temp_max: weatherData.temp + 2,
        humidity: Math.floor(Math.random() * 40) + 40,
      },
      weather: [
        {
          main: 'Clear',
          description: weatherData.desc,
          icon: weatherData.icon,
        },
      ],
      wind: {
        speed: Math.floor(Math.random() * 10) + 1,
      },
    };
  }

  static async sendChatMessage(message: string): Promise<string> {
    try {
      if (OPENAI_API_KEY) {
        const response = await fetch('https://openrouter.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini', // или другой, поддерживаемый openrouter
            messages: [
              {
                role: 'system',
                content:
                  'Ты — дружелюбный AI-помощник, говорящий по-русски. Помогай пользователю с ответами, учитывай контекст.',
              },
              { role: 'user', content: message },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${text}`);
        }

        const data = await response.json();

        const aiMessage = data.choices?.[0]?.message?.content;
        if (aiMessage) {
          return aiMessage.trim();
        }
        throw new Error('Empty response from OpenRouter');
      }

      const fallbackResponses = this.generateSmartResponse(message);
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    } catch (error) {
      console.error('Chat API error:', error);
      return 'Извините, произошла ошибка. Попробуйте еще раз.';
    }
  }

  private static generateSmartResponse(message: string): string[] {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('погода') || lowerMessage.includes('weather')) {
      return [
        'Для получения актуальной информации о погоде перейдите в раздел "Погода" в навигационном меню. Там вы сможете узнать прогноз для любого города мира!',
        'Я могу помочь вам с информацией о погоде! Воспользуйтесь разделом "Погода" для получения точных данных о температуре, влажности и ветре.',
        'Хотите узнать погоду? В разделе "Погода" доступна информация по всему миру с актуальными данными!',
      ];
    }

    if (lowerMessage.includes('meda') || lowerMessage.includes('меда')) {
      return [
        'MEDA - это современная платформа, которая объединяет AI-помощника, прогноз погоды и аналитику. Я здесь, чтобы помочь вам с любыми вопросами!',
        'Добро пожаловать в MEDA! Это многофункциональная платформа с искусственным интеллектом. Чем могу помочь?',
        'MEDA предоставляет множество возможностей: от общения с AI до получения данных о погоде. Исследуйте все разделы!',
      ];
    }

    if (lowerMessage.includes('привет') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return [
        'Привет! Я AI-помощник MEDA. Готов помочь вам с любыми вопросами. О чем хотите поговорить?',
        'Здравствуйте! Рад вас видеть в MEDA. Чем могу быть полезен?',
        'Привет! Добро пожаловать! Я здесь, чтобы помочь вам. Задавайте любые вопросы!',
      ];
    }

    if (lowerMessage.includes('помощь') || lowerMessage.includes('help')) {
      return [
        'Конечно, помогу! Вы можете спросить меня о возможностях MEDA, попросить совет, узнать о погоде или просто поболтать. Что вас интересует?',
        'Я готов помочь! Могу рассказать о функциях платформы, дать советы или ответить на вопросы. О чем хотите узнать?',
        'С удовольствием помогу! Доступны разделы: погода, аналитика, профиль. Также могу просто поговорить с вами!',
      ];
    }

    return [
      `Интересный вопрос о "${message}"! Я AI-помощник MEDA и готов обсудить это с вами. Расскажите больше деталей.`,
      `Спасибо за ваше сообщение: "${message}". Как AI-помощник, я стараюсь быть максимально полезным. Чем еще могу помочь?`,
      `Понимаю, что вы имеете в виду касательно "${message}". В MEDA есть много возможностей - исследуйте разделы или задавайте вопросы!`,
      `Отличная тема для обсуждения! "${message}" - это то, о чем можно поговорить. Что конкретно вас интересует?`,
    ];
  }
}
