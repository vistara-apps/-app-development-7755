import React, { useState } from 'react';

const AgentManagement = () => {
  const [agents] = useState([
    {
      id: 'billing',
      name: 'Billing Agent',
      icon: '💳',
      expertise: 'Billing & Payments',
      description: 'Handles billing inquiries, payment issues, subscription management, and refund requests.',
      status: 'active',
      conversationsHandled: 156,
      avgResponseTime: '2.3m',
      satisfactionRate: 4.7,
      capabilities: [
        'Process refund requests',
        'Explain billing cycles',
        'Update payment methods',
        'Handle subscription changes',
        'Resolve payment failures'
      ]
    },
    {
      id: 'technical',
      name: 'Technical Agent',
      icon: '🔧',
      expertise: 'Technical Support',
      description: 'Resolves technical issues, API problems, integration guidance, and troubleshooting.',
      status: 'active',
      conversationsHandled: 89,
      avgResponseTime: '3.1m',
      satisfactionRate: 4.8,
      capabilities: [
        'API troubleshooting',
        'Integration guidance',
        'Error code resolution',
        'Performance optimization',
        'Security best practices'
      ]
    },
    {
      id: 'product',
      name: 'Product Agent',
      icon: '📦',
      expertise: 'Product Information',
      description: 'Provides product details, feature explanations, usage guidance, and recommendations.',
      status: 'active',
      conversationsHandled: 203,
      avgResponseTime: '1.8m',
      satisfactionRate: 4.6,
      capabilities: [
        'Feature explanations',
        'Product recommendations',
        'Usage best practices',
        'Pricing information',
        'Upgrade guidance'
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
        <p className="text-gray-600 mt-1">Monitor and manage your AI customer support agents</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Agents</h3>
          <p className="text-3xl font-bold text-blue-600">{agents.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Conversations Handled</h3>
          <p className="text-3xl font-bold text-green-600">
            {agents.reduce((sum, agent) => sum + agent.conversationsHandled, 0)}
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Avg Satisfaction</h3>
          <p className="text-3xl font-bold text-purple-600">
            {(agents.reduce((sum, agent) => sum + agent.satisfactionRate, 0) / agents.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid gap-6">
        {agents.map(agent => (
          <div key={agent.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{agent.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold">{agent.name}</h3>
                  <p className="text-gray-600">{agent.expertise}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${getStatusColor(agent.status)}`}>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <button className="btn btn-primary">
                Configure
              </button>
            </div>

            <p className="text-gray-700 mb-6">{agent.description}</p>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">Conversations</h4>
                <p className="text-2xl font-bold text-blue-600">{agent.conversationsHandled}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">Avg Response Time</h4>
                <p className="text-2xl font-bold text-green-600">{agent.avgResponseTime}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">Satisfaction Rate</h4>
                <p className="text-2xl font-bold text-purple-600">{agent.satisfactionRate}/5</p>
              </div>
            </div>

            {/* Capabilities */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Key Capabilities</h4>
              <div className="flex flex-wrap gap-2">
                {agent.capabilities.map((capability, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Agent */}
      <div className="card border-2 border-dashed border-gray-300 text-center">
        <div className="py-8">
          <div className="text-4xl mb-4">➕</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Agent</h3>
          <p className="text-gray-600 mb-4">
            Create a specialized AI agent for specific customer support scenarios
          </p>
          <button className="btn btn-primary">
            Create New Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentManagement;