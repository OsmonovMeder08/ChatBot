import React from 'react';
import { 
  Info, 
  Github, 
  Mail, 
  Globe, 
  Star,
  Code,
  Database,
  Zap,
  Shield,
  Users,
  Heart,
  MessageCircleIcon,
  MessageSquareMoreIcon,
  Moon
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Высокая производительность',
      description: 'Оптимизированная архитектура для быстрой работы'
    },
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Современные методы защиты данных пользователей'
    },
    {
      icon: Code,
      title: 'Современные технологии',
      description: 'React, TypeScript, Tailwind CSS, Supabase'
    },
    {
      icon: Database,
      title: 'Надежная база данных',
      description: 'Supabase для надежного хранения данных'
    }
  ];

  const technologies = [
    { name: 'React 18', category: 'Frontend', color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', category: 'Language', color: 'from-blue-600 to-blue-800' },
    { name: 'Tailwind CSS', category: 'Styling', color: 'from-teal-500 to-green-500' },
    { name: 'Supabase', category: 'Backend', color: 'from-green-500 to-emerald-500' },
    { name: 'OpenAI API', category: 'AI', color: 'from-purple-500 to-pink-500' },
    { name: 'Vite', category: 'Build Tool', color: 'from-yellow-500 to-orange-500' }
  ];

  const stats = [
    { label: 'Активных пользователей', value: '1,200+' },
    { label: 'Обработано запросов', value: '50K+' },
    { label: 'Время работы', value: '99.9%' },
    { label: 'Средняя оценка', value: '4.3/5' }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-float">
          <span className="text-3xl font-bold text-white">M</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="gradient-text">MedaX</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A modern platform that combines artificial intelligence, 
            weather forecasting and advanced analytics for maximum user convenience.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="glass-card p-6 text-center animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="glass-card p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Moon className="w-10 h-10 text-red" />
          </div>
          
          <h2 className="text-3xl font-bold text-white">Our Mission</h2>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            We are building MEDA to provide users with a single platform for solving everyday problems. 
            Our AI assistant is ready to answer any questions, the weather forecast system provides accurate information, 
            and the analytics module helps track activity and productivity.
          </p>
          
          <p className="text-gray-400">
            We believe in the power of technology to improve people's lives and strive to create products,
            that are not only functional but also enjoyable to use.
          </p>
        </div>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Key Features
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card p-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Tech stack
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="glass-card p-6 text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${tech.color} flex items-center justify-center`}>
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {tech.name}
              </h3>
              <p className="text-sm text-gray-400">
                {tech.category}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="glass-card p-8">
        <div className="text-center space-y-6">
          <Users className="w-16 h-16 mx-auto text-blue-400" />
          
          <h2 className="text-3xl font-bold text-white">
            Development team
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto">
            MEDA is built by a team of experienced developers, 
            designers and engineers who are committed to creating the best user experience.
          </p>
          
          <div className="flex justify-center space-x-4 pt-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 from-blue-400 from-yellow-300 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="glass-card p-8">
        <div className="text-center space-y-6">
          <MessageSquareMoreIcon className="w-16 h-16 mx-auto text-red-500" />
          
          <h2 className="text-4xl font-bold text-green">
            Contact Me
          </h2>
          
          <p className="text-gray-300">
            Есть вопросы или предложения? Мы всегда рады обратной связи!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@meda.app"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <Mail size={20} />
              <span>hello@meda.app</span>
            </a>
            
            <a
              href="https://github.com/meda-app"
              className="flex items-center space-x-2 px-6 py-3 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/30 rounded-lg text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            
            <a
              href="https://meda.app"
              className="flex items-center space-x-2 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 hover:text-green-300 transition-colors duration-200"
            >
              <Globe size={20} />
              <span>meda.app</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="text-center">
        <div className="flex justify-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-gray-300">
          Средняя оценка пользователей: <span className="text-white font-semibold">4.3/5</span>
        </p>
      </div>
    </div>
  );
};

export default About;