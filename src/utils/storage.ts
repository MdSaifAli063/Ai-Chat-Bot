import { Conversation } from '@/types/chat';

const STORAGE_KEY = 'ai-chatbot-conversations';

export const saveConversations = (conversations: Conversation[]): void => {
  try {
    const data = JSON.stringify(conversations);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error('Failed to save conversations:', error);
  }
};

export const loadConversations = (): Conversation[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    // Convert date strings back to Date objects
    return parsed.map((conv: any) => ({
      ...conv,
      createdAt: new Date(conv.createdAt),
      updatedAt: new Date(conv.updatedAt),
      messages: conv.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }));
  } catch (error) {
    console.error('Failed to load conversations:', error);
    return [];
  }
};

export const clearAllConversations = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear conversations:', error);
  }
};
