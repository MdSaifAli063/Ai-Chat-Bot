import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Code, Lightbulb, Zap } from 'lucide-react';
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
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="flex justify-center">
          <Logo size="lg" iconOnly className="sm:scale-110 md:scale-125" />
        </div>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-foreground mb-2 sm:mb-3 mt-4 sm:mt-6 text-center">
          Hi, I'm <span className="text-gradient">Synapse</span>
        </h2>
        
        <p className="text-sm sm:text-base text-muted-foreground text-center max-w-xs sm:max-w-md mb-6 sm:mb-8 md:mb-10 px-2">
          Your intelligent assistant for coding, creativity, and problem-solving. 
          How can I help you today?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-2xl px-2 sm:px-4">
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
              className="p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-border bg-card/50 text-left
                         hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5
                         transition-all duration-300 group active:scale-[0.98]"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <p className="font-semibold text-sm sm:text-base text-foreground mb-0.5 sm:mb-1">{item.title}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 overflow-y-auto scrollbar-thin p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </div>
  );
};