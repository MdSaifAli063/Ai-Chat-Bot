import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '@/types/chat';
import { MarkdownRenderer } from './MarkdownRenderer';
import { formatTimestamp } from '@/utils/helpers';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div 
      className={cn(
        "flex gap-4 animate-message-in",
        isUser && "flex-row-reverse"
      )}
      role="article"
      aria-label={`${isUser ? 'Your' : 'AI'} message`}
    >
      {/* Avatar */}
      <div 
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
          isUser 
            ? "bg-primary" 
            : "bg-primary/10"
        )}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="w-5 h-5 text-primary-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-primary" />
        )}
      </div>

      {/* Message content */}
      <div 
        className={cn(
          "flex flex-col gap-1 max-w-[80%]",
          isUser && "items-end"
        )}
      >
        <div 
          className={cn(
            "px-4 py-3 rounded-2xl",
            isUser 
              ? "bg-chat-user text-chat-user-foreground rounded-tr-md" 
              : "bg-chat-ai text-chat-ai-foreground rounded-tl-md"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        {/* Timestamp */}
        <span 
          className="text-xs text-muted-foreground px-1"
          aria-label={`Sent ${formatTimestamp(message.timestamp)}`}
        >
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </div>
  );
};
