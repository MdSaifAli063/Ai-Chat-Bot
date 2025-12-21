import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Conversation } from '@/types/chat';
import { Logo } from '@/components/Logo';

interface ChatHeaderProps {
  conversation: Conversation | undefined;
  onOpenSidebar: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  conversation, 
  onOpenSidebar 
}) => {
  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenSidebar}
        className="md:hidden h-9 w-9 p-0"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className="hidden md:flex w-8 h-8 rounded-lg bg-primary/10 items-center justify-center">
          <Logo size="sm" className="w-5 h-5" />
        </div>
        
        <div className="min-w-0">
          <h1 className="text-sm font-medium text-foreground truncate">
            {conversation?.title || 'New Chat'}
          </h1>
          {conversation && (
            <p className="text-xs text-muted-foreground">
              {conversation.messages.length} messages
            </p>
          )}
        </div>
      </div>
    </header>
  );
};
