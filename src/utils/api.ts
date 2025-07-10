const WEATHER_API_KEY = '9f3417c99ab1a50c2cf3a0fcd44c615a';
const OPENROUTER_API_KEY = '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';

interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface WeatherData {
  name: string;
  main: WeatherMain;
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number };
}

export class APIService {
  static async getWeather(city: string): Promise<WeatherData> {
    try {
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
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENROUTER_API_KEY}`, // Важно: именно так должен передаваться ключ
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
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
        const errorText = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content;
      if (aiMessage) return aiMessage.trim();

      throw new Error('Empty response from OpenRouter');
    } catch (error) {
      console.error('Chat API error:', error);
      return 'Извините, произошла ошибка. Попробуйте еще раз.';
    }
  }

  private static generateSmartResponse(message: string): string[] {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('погода') || lowerMessage.includes('weather')) {
      return [
        'Для получения актуальной информации о погоде перейдите в раздел "Погода" в навигационном меню.',
        'Я могу помочь вам с погодой! Откройте раздел "Погода", чтобы увидеть температуру, ветер и влажность.',
        'Погода доступна в специальном разделе. Просто введите название города.',
      ];
    }

    if (lowerMessage.includes('meda') || lowerMessage.includes('меда')) {
      return [
        'MEDA — это умная платформа, объединяющая прогноз погоды и AI-помощника.',
        'В MEDA вы можете узнать погоду, получить совет от ИИ и многое другое!',
        'Добро пожаловать в MEDA — чем могу помочь?',
      ];
    }

    if (lowerMessage.includes('привет') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return [
        'Привет! Чем могу помочь?',
        'Здравствуйте! Я здесь, чтобы помочь вам.',
        'Добро пожаловать! Готов ответить на ваш вопрос.',
      ];
    }

    if (lowerMessage.includes('помощь') || lowerMessage.includes('help')) {
      return [
        'Вы можете спросить меня о погоде, ИИ-помощнике или платформе MEDA.',
        'Задайте вопрос — и я помогу!',
        'Помощь доступна всегда — просто напишите свой вопрос.',
      ];
    }

    return [
      `Вы спросили: "${message}". Расскажите подробнее — я помогу!`,
      `Интересно! "${message}" — расскажите чуть больше.`,
      `Я готов обсудить: "${message}". Что именно интересует?`,
    ];
  }
}
