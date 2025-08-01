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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-success-200/30 dark:bg-success-800/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-lg w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-large mb-6 animate-scale-in">
            <span className="text-4xl animate-pulse">⚔️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-balance">
            Welcome to AgentArmy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-balance">
            Let's set up your AI customer support team
          </p>
        </div>

        {/* Main Card */}
        <div className="card shadow-large animate-slide-up" style={{ animationDelay: '200ms' }}>
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Step {step} of 4
              </span>
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {Math.round((step / 4) * 100)}% Complete
              </span>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out relative"
                  style={{ width: `${(step / 4) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              {/* Step indicators */}
              <div className="flex justify-between mt-2">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      stepNum <= step
                        ? 'bg-primary-500 text-white shadow-medium'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {stepNum <= step ? '✓' : stepNum}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Company Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your company to customize your experience
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter your company name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Industry *
                  </label>
                  <select
                    className="input"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    required
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Company Size *
                  </label>
                  <select
                    className="input"
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    required
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

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            {step > 1 ? (
              <button 
                onClick={prevStep} 
                className="btn btn-outline flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
                Previous
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 4 ? (
              <button 
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.companyName || !formData.industry || !formData.companySize)) ||
                  (step === 3 && !formData.supportVolume)
                }
                className="btn btn-primary flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
            ) : (
              <button 
                onClick={handleComplete} 
                className="btn btn-success flex items-center gap-2 group gradient-success"
              >
                <span>🚀</span>
                Launch AgentArmy
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOnboarding;
