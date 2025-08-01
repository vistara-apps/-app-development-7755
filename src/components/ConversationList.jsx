import React from 'react';
import { Link } from 'react-router-dom';

const ConversationList = ({ conversations }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgentIcon = (agentType) => {
    switch (agentType) {
      case 'billing': return '💳';
      case 'technical': return '🔧';
      case 'product': return '📦';
      default: return '🤖';
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Conversations</h2>
        <span className="text-sm text-gray-500">{conversations.length} total</span>
      </div>

      <div className="space-y-4">
        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
            <p className="text-gray-500">Start your first customer support conversation to get started.</p>
          </div>
        ) : (
          conversations.map(conversation => (
            <Link
              key={conversation.id}
              to={`/conversation/${conversation.id}`}
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{getAgentIcon(conversation.agentType)}</span>
                    <h3 className="font-medium text-gray-900">{conversation.topic}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(conversation.status)}`}>
                      {conversation.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">{conversation.customerName}</span>
                    <span className="mx-2">•</span>
                    <span>{conversation.customerEmail}</span>
                  </div>

                  {conversation.messages && conversation.messages.length > 0 && (
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {conversation.messages[conversation.messages.length - 1].content}
                    </p>
                  )}
                </div>

                <div className="text-right text-sm text-gray-500 ml-4">
                  <p>{formatTime(conversation.startTime)}</p>
                  {conversation.messages && (
                    <p className="mt-1">{conversation.messages.length} messages</p>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;