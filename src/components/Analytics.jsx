import React, { useState } from 'react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const analyticsData = {
    overview: {
      totalConversations: 248,
      resolvedConversations: 231,
      avgResolutionTime: 14.5,
      customerSatisfaction: 4.7,
      escalationRate: 8.5
    },
    trends: [
      { date: '2024-01-01', conversations: 32, resolved: 30, avgTime: 15.2 },
      { date: '2024-01-02', conversations: 41, resolved: 38, avgTime: 13.8 },
      { date: '2024-01-03', conversations: 35, resolved: 33, avgTime: 16.1 },
      { date: '2024-01-04', conversations: 29, resolved: 27, avgTime: 12.9 },
      { date: '2024-01-05', conversations: 38, resolved: 36, avgTime: 14.7 },
      { date: '2024-01-06', conversations: 42, resolved: 40, avgTime: 13.2 },
      { date: '2024-01-07', conversations: 31, resolved: 27, avgTime: 15.8 }
    ],
    topicsBreakdown: [
      { topic: 'Billing Issues', count: 89, percentage: 35.9, icon: '💳' },
      { topic: 'Technical Support', count: 67, percentage: 27.0, icon: '🔧' },
      { topic: 'Product Information', count: 52, percentage: 21.0, icon: '📦' },
      { topic: 'General Inquiries', count: 40, percentage: 16.1, icon: '❓' }
    ],
    agentPerformance: [
      { agent: 'Billing Agent', conversations: 89, satisfaction: 4.8, avgTime: '12.5m' },
      { agent: 'Technical Agent', conversations: 67, satisfaction: 4.7, avgTime: '16.2m' },
      { agent: 'Product Agent', conversations: 52, satisfaction: 4.6, avgTime: '11.8m' }
    ],
    predictions: {
      nextWeekVolume: 285,
      peakHours: ['10:00 AM', '2:00 PM', '4:00 PM'],
      anticipatedIssues: [
        'Potential increase in billing inquiries due to month-end processing',
        'API rate limit questions expected from new developer signups',
        'Product feature requests may spike after recent announcement'
      ]
    }
  };

  const timeRanges = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  const getPerformanceColor = (value, type) => {
    if (type === 'satisfaction') {
      return value >= 4.5 ? 'text-green-600' : value >= 4.0 ? 'text-yellow-600' : 'text-red-600';
    }
    if (type === 'escalation') {
      return value <= 10 ? 'text-green-600' : value <= 15 ? 'text-yellow-600' : 'text-red-600';
    }
    return 'text-gray-900';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
          <p className="text-gray-600 mt-1">Monitor performance and predict customer needs</p>
        </div>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="input max-w-xs"
        >
          {timeRanges.map(range => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Conversations</h3>
          <p className="text-2xl font-bold text-blue-600">{analyticsData.overview.totalConversations}</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Resolution Rate</h3>
          <p className="text-2xl font-bold text-green-600">
            {Math.round((analyticsData.overview.resolvedConversations / analyticsData.overview.totalConversations) * 100)}%
          </p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Resolution Time</h3>
          <p className="text-2xl font-bold text-purple-600">{analyticsData.overview.avgResolutionTime}m</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Satisfaction Score</h3>
          <p className={`text-2xl font-bold ${getPerformanceColor(analyticsData.overview.customerSatisfaction, 'satisfaction')}`}>
            {analyticsData.overview.customerSatisfaction}/5
          </p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Escalation Rate</h3>
          <p className={`text-2xl font-bold ${getPerformanceColor(analyticsData.overview.escalationRate, 'escalation')}`}>
            {analyticsData.overview.escalationRate}%
          </p>
        </div>
      </div>

      {/* Conversation Topics Breakdown */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Conversation Topics</h2>
        <div className="space-y-4">
          {analyticsData.topicsBreakdown.map((topic, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{topic.icon}</span>
                <span className="font-medium">{topic.topic}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12">{topic.percentage}%</span>
                <span className="font-medium text-gray-900 w-8">{topic.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Performance */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Agent Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2">Agent</th>
                <th className="text-right py-3 px-2">Conversations</th>
                <th className="text-right py-3 px-2">Satisfaction</th>
                <th className="text-right py-3 px-2">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.agentPerformance.map((agent, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium">{agent.agent}</td>
                  <td className="py-3 px-2 text-right">{agent.conversations}</td>
                  <td className={`py-3 px-2 text-right font-medium ${getPerformanceColor(agent.satisfaction, 'satisfaction')}`}>
                    {agent.satisfaction}/5
                  </td>
                  <td className="py-3 px-2 text-right">{agent.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">🔮 Predictive Insights</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Next Week Forecast</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 mb-1">{analyticsData.predictions.nextWeekVolume}</p>
              <p className="text-sm text-blue-700">Expected conversations (+15% from this week)</p>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-3 mt-6">Peak Hours</h3>
            <div className="flex space-x-2">
              {analyticsData.predictions.peakHours.map((hour, index) => (
                <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                  {hour}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Anticipated Issues</h3>
            <div className="space-y-3">
              {analyticsData.predictions.anticipatedIssues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <h2 className="text-xl font-semibold mb-4">💡 AI Recommendations</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✓</span>
            <p className="text-gray-700">
              <strong>Optimize billing agent:</strong> Consider adding automated refund processing capabilities to reduce average resolution time by 20%.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-500">→</span>
            <p className="text-gray-700">
              <strong>Proactive support:</strong> Set up automated alerts for customers who may experience API rate limits based on usage patterns.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-orange-500">⚠</span>
            <p className="text-gray-700">
              <strong>Capacity planning:</strong> Consider adding a fourth specialized agent for account management inquiries during peak hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;