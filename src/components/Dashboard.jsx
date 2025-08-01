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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your AI customer support team</p>
        </div>
        <StartConversation onConversationStart={addConversation} />
      </div>

      <QuickStats stats={stats} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ConversationList conversations={conversations} />
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Active Agents</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Billing Agent</span>
                </div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Technical Agent</span>
                </div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Product Agent</span>
                </div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
            </div>
            <Link to="/agents" className="block mt-4 text-center text-blue-600 hover:text-blue-800 font-medium">
              Manage Agents →
            </Link>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-900">New conversation started</p>
                  <p className="text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-900">Issue resolved by Technical Agent</p>
                  <p className="text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-900">Escalated to human supervisor</p>
                  <p className="text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;