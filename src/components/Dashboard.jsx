import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConversationList from './ConversationList';
import QuickStats from './QuickStats';
import StartConversation from './StartConversation';

const Dashboard = () => {
  const [conversations, setConversations] = useState([]);
  const [stats, setStats] = useState({
    totalConversations: 0,
    activeAgents: 0,
    avgResolutionTime: 0,
    customerSatisfaction: 0
  });

  useEffect(() => {
    // Load sample data
    const sampleConversations = [
      {
        id: '1',
        customerId: 'cust_001',
        customerName: 'John Smith',
        customerEmail: 'john@company.com',
        topic: 'Billing Issue',
        agentType: 'billing',
        status: 'open',
        startTime: new Date(Date.now() - 30 * 60 * 1000),
        messages: [
          { id: 1, sender: 'customer', content: 'I was charged twice for my subscription this month.', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
          { id: 2, sender: 'agent', content: 'I understand your concern about being charged twice. Let me review your account details and resolve this for you right away.', timestamp: new Date(Date.now() - 29 * 60 * 1000) }
        ]
      },
      {
        id: '2',
        customerId: 'cust_002',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@startup.com',
        topic: 'Technical Support',
        agentType: 'technical',
        status: 'resolved',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
        messages: [
          { id: 1, sender: 'customer', content: 'The API integration is not working properly.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
          { id: 2, sender: 'agent', content: 'I can help you with that API integration issue. Let me check the error logs and guide you through the solution.', timestamp: new Date(Date.now() - 119 * 60 * 1000) },
          { id: 3, sender: 'customer', content: 'Perfect, that fixed the issue. Thank you!', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) }
        ]
      }
    ];

    setConversations(sampleConversations);
    setStats({
      totalConversations: 24,
      activeAgents: 3,
      avgResolutionTime: 15,
      customerSatisfaction: 4.8
    });
  }, []);

  const addConversation = (newConversation) => {
    setConversations(prev => [newConversation, ...prev]);
    setStats(prev => ({
      ...prev,
      totalConversations: prev.totalConversations + 1
    }));
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your AI customer support team
          </p>
        </div>
        <div className="flex-shrink-0">
          <StartConversation onConversationStart={addConversation} />
        </div>
      </div>

      {/* Stats Section */}
      <QuickStats stats={stats} />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Conversations Section */}
        <div className="lg:col-span-2 space-y-6">
          <ConversationList conversations={conversations} />
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Active Agents Card */}
          <div className="card animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Active Agents
              </h3>
              <div className="flex items-center gap-2">
                <div className="status-dot status-online animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">All Online</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Billing Agent', type: 'billing', conversations: 3 },
                { name: 'Technical Agent', type: 'technical', conversations: 5 },
                { name: 'Product Agent', type: 'product', conversations: 2 }
              ].map((agent, index) => (
                <div 
                  key={agent.name}
                  className="flex items-center justify-between p-4 bg-success-50 dark:bg-success-900/20 rounded-xl border border-success-200 dark:border-success-800 hover:bg-success-100 dark:hover:bg-success-900/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="status-dot status-online"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-success-700 dark:group-hover:text-success-300 transition-colors">
                        {agent.name}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {agent.conversations} active conversations
                      </p>
                    </div>
                  </div>
                  <div className="badge badge-success">
                    Available
                  </div>
                </div>
              ))}
            </div>
            
            <Link 
              to="/agents" 
              className="flex items-center justify-center gap-2 mt-6 p-3 text-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-all duration-200 group"
            >
              <span>Manage Agents</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          {/* Recent Activity Card */}
          <div className="card animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recent Activity
              </h3>
              <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  type: 'conversation',
                  message: 'New conversation started',
                  time: '2 minutes ago',
                  color: 'primary',
                  icon: '💬'
                },
                {
                  type: 'resolution',
                  message: 'Issue resolved by Technical Agent',
                  time: '15 minutes ago',
                  color: 'success',
                  icon: '✅'
                },
                {
                  type: 'escalation',
                  message: 'Escalated to human supervisor',
                  time: '1 hour ago',
                  color: 'warning',
                  icon: '⚠️'
                },
                {
                  type: 'feedback',
                  message: 'Customer rated 5 stars',
                  time: '2 hours ago',
                  color: 'success',
                  icon: '⭐'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    activity.color === 'primary' ? 'bg-primary-100 dark:bg-primary-900/30' :
                    activity.color === 'success' ? 'bg-success-100 dark:bg-success-900/30' :
                    activity.color === 'warning' ? 'bg-warning-100 dark:bg-warning-900/30' :
                    'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
