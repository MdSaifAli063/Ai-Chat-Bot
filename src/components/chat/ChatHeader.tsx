import React from 'react';
import { MessageSquare, PanelLeft } from 'lucide-react';
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
    <header className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 border-b border-sky-200/50 bg-white/80 backdrop-blur-md sticky top-0 z-10 safe-area-top">
      {/* Only show toggle when sidebar is closed */}
      {!sidebarOpen && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenSidebar}
          className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg hover:bg-sky-100"
          aria-label="Open sidebar"
        >
          <PanelLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      )}

      <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-sky-200 flex items-center justify-center shrink-0">
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
        </div>
        
        <div className="min-w-0 flex-1">
          <h1 className="text-xs sm:text-sm font-semibold text-foreground truncate">
            {conversation?.title || 'New Conversation'}
          </h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
            {conversation ? `${conversation.messages.length} messages` : 'Start chatting with Synapse'}
          </p>
        </div>
      </div>
    </header>
  );
};