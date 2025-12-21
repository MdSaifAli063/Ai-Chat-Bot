import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-4 animate-message-in" role="status" aria-label="AI is typing">
      {/* AI Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Bot className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>

      {/* Typing dots */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-chat-ai">
        <div className="flex gap-1.5">
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-dot" 
            aria-hidden="true"
          />
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-dot" 
            aria-hidden="true"
          />
          <span 
            className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-dot" 
            aria-hidden="true"
          />
        </div>
        <span className="sr-only">AI is thinking...</span>
      </div>
    </div>
  );
};
