import React from 'react';
import { Menu, MessageSquare, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Conversation } from '@/types/chat';

interface ChatHeaderProps {
  conversation: Conversation | undefined;
  onOpenSidebar: () => void;
  sidebarOpen?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  conversation, 
  onOpenSidebar,
  sidebarOpen = true
}) => {
  return (
    <header className="flex items-center gap-4 px-4 py-3 border-b border-sky-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenSidebar}
        className="h-9 w-9 p-0 rounded-lg hover:bg-sky-100"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <Menu className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
      </Button>

      <div className="flex-1 flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-sky-200 flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 text-primary" />
        </div>
        
        <div className="min-w-0">
          <h1 className="text-sm font-semibold text-foreground truncate">
            {conversation?.title || 'New Conversation'}
          </h1>
          <p className="text-xs text-muted-foreground">
            {conversation ? `${conversation.messages.length} messages` : 'Start chatting with Synapse'}
          </p>
        </div>
      </div>
    </header>
  );
};
