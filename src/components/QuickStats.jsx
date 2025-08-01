import React from 'react';

const QuickStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Conversations',
      value: stats.totalConversations,
      icon: '💬',
      color: 'blue'
    },
    {
      label: 'Active Agents',
      value: stats.activeAgents,
      icon: '🤖',
      color: 'green'
    },
    {
      label: 'Avg Resolution Time',
      value: `${stats.avgResolutionTime}m`,
      icon: '⏱️',
      color: 'purple'
    },
    {
      label: 'Customer Satisfaction',
      value: `${stats.customerSatisfaction}/5`,
      icon: '⭐',
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700',
      green: 'bg-green-50 text-green-700',
      purple: 'bg-purple-50 text-purple-700',
      orange: 'bg-orange-50 text-orange-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((stat, index) => (
        <div key={index} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;