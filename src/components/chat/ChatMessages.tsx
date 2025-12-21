import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageSquare } from 'lucide-react';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Empty state
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <MessageSquare className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Welcome to AI Chat
        </h2>
        
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Start a conversation by typing a message below. I'm here to help with questions, 
          coding, creative ideas, and more!
        </p>

        <div className="grid gap-3 w-full max-w-md">
          {[
            "Help me write a function in TypeScript",
            "Explain how React hooks work",
            "Give me some creative project ideas",
          ].map((suggestion, index) => (
            <button
              key={index}
              className="p-4 rounded-xl border border-border bg-secondary/30 text-left
                         hover:bg-secondary/50 hover:border-primary/30 
                         transition-all duration-200 text-sm text-foreground"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 space-y-6"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </div>
  );
};
