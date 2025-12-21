import { useState, useCallback, useEffect } from 'react';
import { Message, Conversation, ChatState } from '@/types/chat';
import { sendMessage } from '@/services/api';
import { saveConversations, loadConversations } from '@/utils/storage';
import { generateId, generateTitle } from '@/utils/helpers';
import { useToast } from '@/hooks/use-toast';

export const useChat = () => {
  const { toast } = useToast();
  const [state, setState] = useState<ChatState>({
    conversations: [],
    activeConversationId: null,
    isLoading: false,
    error: null,
  });

  // Load conversations from localStorage on mount
  useEffect(() => {
    const saved = loadConversations();
    if (saved.length > 0) {
      setState(prev => ({
        ...prev,
        conversations: saved,
        activeConversationId: saved[0].id,
      }));
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (state.conversations.length > 0) {
      saveConversations(state.conversations);
    }
  }, [state.conversations]);

  // Get the active conversation
  const activeConversation = state.conversations.find(
    c => c.id === state.activeConversationId
  );

  // Create a new conversation
  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      conversations: [newConversation, ...prev.conversations],
      activeConversationId: newConversation.id,
    }));

    return newConversation.id;
  }, []);

  // Set active conversation
  const setActiveConversation = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      activeConversationId: id,
    }));
  }, []);

  // Send a message
  const sendUserMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.isLoading) return;

    let conversationId = state.activeConversationId;

    // Create new conversation if none exists
    if (!conversationId) {
      conversationId = createConversation();
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    // Add user message to conversation
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      conversations: prev.conversations.map(conv => {
        if (conv.id === conversationId) {
          const isFirstMessage = conv.messages.length === 0;
          return {
            ...conv,
            title: isFirstMessage ? generateTitle(content) : conv.title,
            messages: [...conv.messages, userMessage],
            updatedAt: new Date(),
          };
        }
        return conv;
      }),
    }));

    try {
      // Get all messages for context
      const currentConv = state.conversations.find(c => c.id === conversationId);
      const allMessages = currentConv ? [...currentConv.messages, userMessage] : [userMessage];

      // Get AI response
      const response = await sendMessage(allMessages);

      if (response.error) {
        throw new Error(response.error);
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };

      // Add assistant message to conversation
      setState(prev => ({
        ...prev,
        isLoading: false,
        conversations: prev.conversations.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              messages: [...conv.messages, assistantMessage],
              updatedAt: new Date(),
            };
          }
          return conv;
        }),
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response';
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }, [state.activeConversationId, state.isLoading, state.conversations, createConversation, toast]);

  // Delete a conversation
  const deleteConversation = useCallback((id: string) => {
    setState(prev => {
      const filtered = prev.conversations.filter(c => c.id !== id);
      const newActiveId = prev.activeConversationId === id
        ? (filtered[0]?.id || null)
        : prev.activeConversationId;

      return {
        ...prev,
        conversations: filtered,
        activeConversationId: newActiveId,
      };
    });

    toast({
      title: 'Chat deleted',
      description: 'The conversation has been removed.',
    });
  }, [toast]);

  // Clear all conversations
  const clearAllChats = useCallback(() => {
    setState({
      conversations: [],
      activeConversationId: null,
      isLoading: false,
      error: null,
    });
    saveConversations([]);

    toast({
      title: 'All chats cleared',
      description: 'All conversations have been removed.',
    });
  }, [toast]);

  return {
    ...state,
    activeConversation,
    createConversation,
    setActiveConversation,
    sendUserMessage,
    deleteConversation,
    clearAllChats,
  };
};
