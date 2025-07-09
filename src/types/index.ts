export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: 'ru' | 'en';
    notifications: boolean;
  };
}

export interface AnalyticsData {
  chatUsage: number;
  weatherRequests: number;
  totalSessions: number;
  avgSessionTime: number;
}