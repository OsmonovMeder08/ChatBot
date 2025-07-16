import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface AppState {
  theme: 'light' | 'dark';
  language: 'ru' | 'en';
  user: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  notifications: boolean;
  autoSave: boolean;
}

type AppAction = 
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: 'ru' | 'en' }
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'SET_NOTIFICATIONS'; payload: boolean }
  | { type: 'SET_AUTO_SAVE'; payload: boolean }
  | { type: 'LOAD_SETTINGS'; payload: Partial<AppState> };

const initialState: AppState = {
  theme: 'dark',
  language: 'ru',
  user: {
    name: 'Osmonov Meder',
    email: 'mrmedaea08@gmail.com'
  },
  notifications: true,
  autoSave: true
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'SET_AUTO_SAVE':
      return { ...state, autoSave: action.payload };
    case 'LOAD_SETTINGS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('meda-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        dispatch({ type: 'LOAD_SETTINGS', payload: settings });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('meda-settings', JSON.stringify(state));
    
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};