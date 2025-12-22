import React from 'react';
import { Menu, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Conversation } from '@/types/chat';

interface ChatHeaderProps {
  conversation: Conversation | undefined;
  onOpenSidebar: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  conversation, 
  onOpenSidebar 
}) => {
  return (
    <header className="flex items-center gap-4 px-4 py-3 border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-10">
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenSidebar}
        className="md:hidden h-9 w-9 p-0 rounded-lg hover:bg-accent"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 text-primary" />
        </div>
        
        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-foreground truncate">
            {conversation?.title || 'New Conversation'}
          </h1>
          <p className="text-xs text-muted-foreground">
            {conversation ? `${conversation.messages.length} messages` : 'Start chatting with NovaAI'}
          </p>
        </div>
      </div>
    </header>
  );
};
