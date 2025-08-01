import React, { useState } from 'react';
import { usePaymentContext } from '../hooks/usePaymentContext';

const StartConversation = ({ onConversationStart }) => {
  const [showModal, setShowModal] = useState(false);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerCompany: '',
    topic: '',
    description: '',
    priority: 'medium'
  });
  
  const { createSession } = usePaymentContext();

  const topics = [
    { value: 'billing', label: 'Billing & Payments', agent: 'billing', icon: '💳' },
    { value: 'technical', label: 'Technical Support', agent: 'technical', icon: '🔧' },
    { value: 'product', label: 'Product Information', agent: 'product', icon: '📦' },
    { value: 'general', label: 'General Inquiry', agent: 'general', icon: '❓' }
  ];

  const handlePayment = async () => {
    setLoading(true);
    try {
      await createSession();
      setPaid(true);
    } catch (error) {
      alert('Payment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedTopic = topics.find(t => t.value === formData.topic);
    const newConversation = {
      id: Date.now().toString(),
      customerId: `cust_${Date.now()}`,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerCompany: formData.customerCompany,
      topic: selectedTopic?.label || formData.topic,
      agentType: selectedTopic?.agent || 'general',
      status: 'open',
      priority: formData.priority,
      startTime: new Date(),
      messages: [
        {
          id: 1,
          sender: 'customer',
          content: formData.description,
          timestamp: new Date()
        }
      ]
    };

    onConversationStart(newConversation);
    setShowModal(false);
    setPaid(false);
    setFormData({
      customerName: '',
      customerEmail: '',
      customerCompany: '',
      topic: '',
      description: '',
      priority: 'medium'
    });
  };

  const resetModal = () => {
    setShowModal(false);
    setPaid(false);
    setFormData({
      customerName: '',
      customerEmail: '',
      customerCompany: '',
      topic: '',
      description: '',
      priority: 'medium'
    });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary"
      >
        <span>💬</span>
        New Conversation
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Start New Conversation</h2>
                <button
                  onClick={resetModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {!paid ? (
                <div className="text-center">
                  <div className="text-4xl mb-4">💳</div>
                  <h3 className="text-lg font-medium mb-2">Pay for Conversation</h3>
                  <p className="text-gray-600 mb-6">
                    Each conversation costs $1 and includes unlimited back-and-forth 
                    with our AI agents until your issue is resolved.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-2">What's included:</h4>
                    <ul className="text-sm text-gray-700 text-left space-y-1">
                      <li>• Instant AI agent assignment</li>
                      <li>• Specialized expertise for your issue type</li>
                      <li>• Human escalation if needed</li>
                      <li>• Complete conversation history</li>
                    </ul>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="btn btn-primary w-full"
                  >
                    {loading ? (
                      <>
                        <div className="loading"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <span>💳</span>
                        Pay $1 to Start Conversation
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Customer Name *</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                      required
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Customer Email *</label>
                    <input
                      type="email"
                      className="input"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                      required
                      placeholder="customer@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      className="input"
                      value={formData.customerCompany}
                      onChange={(e) => setFormData({...formData, customerCompany: e.target.value})}
                      placeholder="Customer's company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Topic *</label>
                    <select
                      className="input"
                      value={formData.topic}
                      onChange={(e) => setFormData({...formData, topic: e.target.value})}
                      required
                    >
                      <option value="">Select a topic</option>
                      {topics.map(topic => (
                        <option key={topic.value} value={topic.value}>
                          {topic.icon} {topic.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      className="textarea"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      placeholder="Describe the customer's issue or question..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                      className="input"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetModal}
                      className="btn btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex-1"
                    >
                      Start Conversation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartConversation;