import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AIService } from '../services/aiService';

const ConversationView = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [needsEscalation, setNeedsEscalation] = useState(false);
  const messagesEndRef = useRef(null);
  const aiService = new AIService();

  useEffect(() => {
    // Load conversation data (in real app, this would come from API)
    const sampleConversation = {
      id: id,
      customerId: 'cust_001',
      customerName: 'John Smith',
      customerEmail: 'john@company.com',
      topic: 'Billing Issue',
      agentType: 'billing',
      status: 'open',
      startTime: new Date(Date.now() - 30 * 60 * 1000),
    };

    const sampleMessages = [
      {
        id: 1,
        sender: 'customer',
        content: 'I was charged twice for my subscription this month.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 2,
        sender: 'agent',
        content: 'I understand your concern about being charged twice. Let me review your account details and resolve this for you right away.',
        timestamp: new Date(Date.now() - 29 * 60 * 1000)
      }
    ];

    setConversation(sampleConversation);
    setMessages(sampleMessages);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'customer',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      // Generate AI response
      const aiResponse = await aiService.generateResponse(
        conversation.agentType,
        newMessage,
        messages
      );

      const agentMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
      
      // Check if escalation is needed (simple heuristic)
      if (newMessage.toLowerCase().includes('manager') || 
          newMessage.toLowerCase().includes('escalate') ||
          messages.length > 10) {
        setNeedsEscalation(true);
      }
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        content: 'I apologize, but I\'m having trouble responding right now. Let me connect you with a human agent who can assist you better.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setNeedsEscalation(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEscalation = () => {
    const escalationMessage = {
      id: Date.now(),
      sender: 'system',
      content: 'This conversation has been escalated to a human supervisor. A team member will join shortly.',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, escalationMessage]);
    setNeedsEscalation(false);
    
    // Update conversation status
    setConversation(prev => ({ ...prev, status: 'escalated' }));
  };

  const resolveConversation = () => {
    const resolutionMessage = {
      id: Date.now(),
      sender: 'system',
      content: 'This conversation has been marked as resolved. Thank you for using AgentArmy!',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, resolutionMessage]);
    setConversation(prev => ({ ...prev, status: 'resolved', endTime: new Date() }));
  };

  const getAgentIcon = (agentType) => {
    switch (agentType) {
      case 'billing': return '💳';
      case 'technical': return '🔧';
      case 'product': return '📦';
      default: return '🤖';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              ← Back to Dashboard
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center space-x-2">
                <span>{getAgentIcon(conversation.agentType)}</span>
                <span>{conversation.topic}</span>
              </h1>
              <p className="text-gray-600">
                {conversation.customerName} • {conversation.customerEmail}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {needsEscalation && conversation.status === 'open' && (
              <button
                onClick={handleEscalation}
                className="btn btn-secondary"
              >
                🚨 Escalate to Human
              </button>
            )}
            
            {conversation.status === 'open' && (
              <button
                onClick={resolveConversation}
                className="btn btn-success"
              >
                ✅ Mark Resolved
              </button>
            )}
            
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              conversation.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
              conversation.status === 'resolved' ? 'bg-green-100 text-green-800' :
              conversation.status === 'escalated' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="card h-[600px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'customer' 
                  ? 'bg-blue-600 text-white' 
                  : message.sender === 'system'
                  ? 'bg-gray-100 text-gray-800 border border-gray-300'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'agent' && (
                    <span className="text-lg">{getAgentIcon(conversation.agentType)}</span>
                  )}
                  {message.sender === 'system' && (
                    <span>ℹ️</span>
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'customer' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span>{getAgentIcon(conversation.agentType)}</span>
                  <div className="loading"></div>
                  <span className="text-sm text-gray-600">Agent is typing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {conversation.status === 'open' && (
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 input"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || isLoading}
                className="btn btn-primary"
              >
                Send
              </button>
            </form>
          </div>
        )}
        
        {conversation.status === 'resolved' && (
          <div className="border-t border-gray-200 p-4 bg-green-50">
            <div className="text-center text-green-800">
              <p className="font-medium">✅ This conversation has been resolved</p>
              <p className="text-sm mt-1">
                Resolved on {new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                }).format(conversation.endTime || new Date())}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationView;