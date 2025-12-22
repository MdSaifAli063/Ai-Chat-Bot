import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Sparkles, Code, Lightbulb, Zap } from 'lucide-react';
import { Logo } from '@/components/Logo';

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
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center mb-6 shadow-lg shadow-primary/10">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Hi, I'm <span className="text-gradient">NovaAI</span>
        </h2>
        
        <p className="text-muted-foreground text-center max-w-md mb-10">
          Your intelligent assistant for coding, creativity, and problem-solving. 
          How can I help you today?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl px-4">
          {[
            { 
              icon: Code, 
              title: "Write Code",
              desc: "Help me build a React component"
            },
            { 
              icon: Lightbulb, 
              title: "Explain Concepts",
              desc: "How do async functions work?"
            },
            { 
              icon: Zap, 
              title: "Quick Help",
              desc: "Debug my code or find errors"
            },
          ].map((item, index) => (
            <button
              key={index}
              className="p-5 rounded-2xl border border-border bg-card/50 text-left
                         hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
                         transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-semibold text-foreground mb-1">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
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
