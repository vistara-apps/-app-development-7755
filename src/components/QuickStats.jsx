import React from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  CpuChipIcon, 
  ClockIcon, 
  StarIcon 
} from '@heroicons/react/24/outline';

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Conversations',
      value: stats.totalConversations,
      icon: ChatBubbleLeftRightIcon,
      emoji: '💬',
      color: 'primary',
      trend: '+12%',
      trendUp: true
    },
    {
      label: 'Active Agents',
      value: stats.activeAgents,
      icon: CpuChipIcon,
      emoji: '🤖',
      color: 'success',
      trend: '+2',
      trendUp: true
    },
    {
      label: 'Avg Resolution Time',
      value: `${stats.avgResolutionTime}m`,
      icon: ClockIcon,
      emoji: '⏱️',
      color: 'warning',
      trend: '-3m',
      trendUp: true
    },
    {
      label: 'Customer Satisfaction',
      value: `${stats.customerSatisfaction}/5`,
      icon: StarIcon,
      emoji: '⭐',
      color: 'success',
      trend: '+0.2',
      trendUp: true
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50 dark:bg-primary-900/20',
        text: 'text-primary-600 dark:text-primary-400',
        icon: 'text-primary-500 dark:text-primary-400'
      },
      success: {
        bg: 'bg-success-50 dark:bg-success-900/20',
        text: 'text-success-600 dark:text-success-400',
        icon: 'text-success-500 dark:text-success-400'
      },
      warning: {
        bg: 'bg-warning-50 dark:bg-warning-900/20',
        text: 'text-warning-600 dark:text-warning-400',
        icon: 'text-warning-500 dark:text-warning-400'
      },
      error: {
        bg: 'bg-error-50 dark:bg-error-900/20',
        text: 'text-error-600 dark:text-error-400',
        icon: 'text-error-500 dark:text-error-400'
      }
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statItems.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        const IconComponent = stat.icon;
        
        return (
          <div 
            key={index} 
            className="card card-hover group cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  {stat.trend && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      stat.trendUp 
                        ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-300' 
                        : 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-300'
                    }`}>
                      {stat.trendUp ? '↗' : '↘'} {stat.trend}
                    </span>
                  )}
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:scale-105 transition-transform duration-200">
                  {stat.value}
                </p>
              </div>
              
              <div className={`relative p-3 rounded-xl ${colorClasses.bg} group-hover:scale-110 transition-transform duration-200`}>
                <IconComponent className={`w-6 h-6 ${colorClasses.icon}`} />
                <div className="absolute -top-1 -right-1 text-lg opacity-80">
                  {stat.emoji}
                </div>
              </div>
            </div>
            
            {/* Progress bar for visual appeal */}
            <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${colorClasses.text.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ease-out`}
                style={{ 
                  width: `${Math.min(100, (stat.value / (stat.label.includes('Satisfaction') ? 5 : 50)) * 100)}%`,
                  animationDelay: `${index * 200 + 500}ms`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuickStats;
