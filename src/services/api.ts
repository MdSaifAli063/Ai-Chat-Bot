import { Message, AIResponse } from '@/types/chat';

// Simulated AI responses for demo purposes
// In production, replace with actual API call
const DEMO_RESPONSES = [
  "I understand your question. Let me provide a helpful response.",
  "That's an interesting topic! Here's what I know about it...",
  "Great question! I'll do my best to help you with that.",
  "Let me think about this carefully and provide you with a comprehensive answer.",
];

// Simulated delay to mimic API response time
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Demo AI service - simulates API responses
export const sendMessage = async (
  messages: Message[]
): Promise<AIResponse> => {
  try {
    // Simulate network delay (1-2 seconds)
    await simulateDelay(1000 + Math.random() * 1000);
    
    const lastMessage = messages[messages.length - 1];
    
    // Generate a contextual demo response
    let response = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
    
    // Add some contextual responses based on keywords
    if (lastMessage.content.toLowerCase().includes('code')) {
      response = `Here's an example code snippet:

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Usage
const message = greet('World');
console.log(message); // Output: Hello, World!
\`\`\`

This demonstrates a simple TypeScript function with type annotations.`;
    } else if (lastMessage.content.toLowerCase().includes('help')) {
      response = `I'm here to help! Here are some things I can assist with:

- **Answering questions** about various topics
- **Explaining concepts** in simple terms
- **Providing code examples** and solutions
- **Brainstorming ideas** for your projects

Just ask me anything, and I'll do my best to provide a helpful response!`;
    } else if (lastMessage.content.toLowerCase().includes('hello') || 
               lastMessage.content.toLowerCase().includes('hi')) {
      response = `Hello! 👋 I'm your AI assistant. How can I help you today?

Feel free to ask me anything - whether it's about coding, general knowledge, or creative ideas. I'm here to assist!`;
    } else if (lastMessage.content.toLowerCase().includes('list')) {
      response = `Here's an organized list for you:

1. **First item** - Important details here
2. **Second item** - More information
3. **Third item** - Additional context
4. **Fourth item** - Final thoughts

Would you like me to expand on any of these points?`;
    }
    
    return { content: response };
  } catch (error) {
    console.error('API Error:', error);
    return {
      content: '',
      error: 'Failed to get response. Please try again.',
    };
  }
};

// Production API call (commented out for demo)
/*
export const sendMessageToAPI = async (
  messages: Message[],
  config: APIConfig
): Promise<AIResponse> => {
  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment.');
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return { content: data.choices[0].message.content };
  } catch (error) {
    console.error('API Error:', error);
    return {
      content: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
*/
