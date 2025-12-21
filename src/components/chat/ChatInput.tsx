import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  isLoading, 
  disabled = false 
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !isLoading && !disabled) {
      onSend(input);
      setInput('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = input.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="max-w-3xl mx-auto">
        <div 
          className={cn(
            "flex items-end gap-3 p-3 rounded-2xl border border-border",
            "bg-secondary/30 transition-all duration-200",
            "focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
          )}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading || disabled}
            rows={1}
            className={cn(
              "flex-1 bg-transparent resize-none border-none",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-0",
              "min-h-[24px] max-h-[200px] py-1.5",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Message input"
          />

          <Button
            onClick={handleSubmit}
            disabled={!canSend}
            size="sm"
            className={cn(
              "rounded-xl h-10 w-10 p-0 flex-shrink-0",
              "transition-all duration-200",
              canSend && "glow-primary"
            )}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-2">
          Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-mono">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
};
