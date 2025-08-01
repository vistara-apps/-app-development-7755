import OpenAI from 'openai';

export class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: "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",
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    });
  }

  async generateResponse(agentType, userMessage, conversationHistory = []) {
    try {
      const systemPrompt = this.getSystemPrompt(agentType);
      
      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.map(msg => ({
          role: msg.sender === 'customer' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await this.openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  getSystemPrompt(agentType) {
    const basePrompt = `You are a helpful AI customer support agent for AgentArmy. Always be professional, empathetic, and solution-focused. Keep responses concise but thorough.`;

    const agentPrompts = {
      billing: `${basePrompt} You specialize in billing and payment issues. You can help with:
- Refund requests and processing
- Billing cycle explanations
- Payment method updates
- Subscription changes
- Payment failure troubleshooting
Always ask for specific details about billing issues and provide clear next steps.`,

      technical: `${basePrompt} You specialize in technical support. You can help with:
- API integration issues
- Error code explanations
- Performance optimization
- Security best practices
- Troubleshooting technical problems
Always ask for error messages, logs, or specific symptoms to provide accurate solutions.`,

      product: `${basePrompt} You specialize in product information and guidance. You can help with:
- Feature explanations and demos
- Product recommendations
- Usage best practices
- Pricing information
- Upgrade guidance
Always focus on how features can solve the customer's specific needs.`,

      general: `${basePrompt} You handle general inquiries and can provide basic information about all aspects of the service. If the inquiry requires specialized knowledge, suggest the customer speak with a specialized agent.`
    };

    return agentPrompts[agentType] || agentPrompts.general;
  }
}