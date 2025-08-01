import React, { useState } from 'react';

const CustomerOnboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    currentTools: [],
    supportVolume: ''
  });

  const industries = [
    'Technology', 'E-commerce', 'Healthcare', 'Finance', 'Education',
    'Manufacturing', 'Retail', 'Services', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-1000 employees', '1000+ employees'
  ];

  const tools = [
    'Zendesk', 'Freshdesk', 'Intercom', 'Salesforce', 'HubSpot',
    'Slack', 'Microsoft Teams', 'Custom CRM', 'None'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToolToggle = (tool) => {
    setFormData(prev => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter(t => t !== tool)
        : [...prev.currentTools, tool]
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleComplete = () => {
    // Store onboarding data
    localStorage.setItem('agentArmy_onboarding', JSON.stringify(formData));
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">⚔️</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to AgentArmy</h1>
          <p className="text-gray-600">Let's set up your AI customer support team</p>
        </div>

        <div className="card">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Step {step} of 4</span>
              <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <select
                    className="input"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Size</label>
                  <select
                    className="input"
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                  >
                    <option value="">Select company size</option>
                    {companySizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Current Tools</h2>
              <p className="text-gray-600 mb-4">Which customer support tools do you currently use?</p>
              <div className="grid grid-cols-2 gap-3">
                {tools.map(tool => (
                  <label key={tool} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.currentTools.includes(tool)}
                      onChange={() => handleToolToggle(tool)}
                      className="rounded"
                    />
                    <span className="text-sm">{tool}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Support Volume</h2>
              <p className="text-gray-600 mb-4">How many customer inquiries do you handle per month?</p>
              <div className="space-y-3">
                {['Less than 100', '100-500', '500-1,000', '1,000-5,000', '5,000+'].map(volume => (
                  <label key={volume} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="supportVolume"
                      value={volume}
                      checked={formData.supportVolume === volume}
                      onChange={(e) => handleInputChange('supportVolume', e.target.value)}
                    />
                    <span>{volume}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">You're All Set! 🎉</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Your AgentArmy Setup:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Company: {formData.companyName}</li>
                  <li>• Industry: {formData.industry}</li>
                  <li>• Size: {formData.companySize}</li>
                  <li>• Monthly Volume: {formData.supportVolume}</li>
                </ul>
              </div>
              <p className="text-gray-600 mb-4">
                Your AI agents are being configured based on your industry and needs. 
                You'll be ready to start handling customer inquiries in seconds!
              </p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button onClick={prevStep} className="btn btn-secondary">
                Previous
              </button>
            )}
            
            {step < 4 ? (
              <button 
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.companyName || !formData.industry || !formData.companySize)) ||
                  (step === 3 && !formData.supportVolume)
                }
                className="btn btn-primary ml-auto"
              >
                Next
              </button>
            ) : (
              <button onClick={handleComplete} className="btn btn-success ml-auto">
                Launch AgentArmy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOnboarding;