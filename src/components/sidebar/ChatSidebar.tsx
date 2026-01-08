import React from 'react';
import { Plus, Trash2, X, LogOut, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Conversation } from '@/types/chat';
import { ConversationItem } from './ConversationItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onClearAll,
  isOpen,
  onToggle,
}) => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50",
          "flex flex-col bg-white/90 backdrop-blur-xl",
          "transition-all duration-300 ease-in-out",
          isOpen && "border-r border-sky-200/50 shadow-xl shadow-sky-100/50",
          isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full pointer-events-none"
        )}
        aria-label="Chat history"
      >
        {/* Header */}
        <div className={cn(
          "flex items-center p-4 border-b border-sky-200/50",
          isOpen ? "justify-between" : "justify-center"
        )}>
          {isOpen && <Logo size="sm" />}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 hover:bg-sky-100"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* New chat button */}
        <div className="p-3">
          <Button
            onClick={() => {
              onNewConversation();
              if (window.innerWidth < 768) onToggle();
            }}
            className={cn(
              "gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200",
              isOpen ? "w-full" : "w-10 h-10 p-0"
            )}
            variant="default"
          >
            <Plus className="w-4 h-4" />
            {isOpen && "New Chat"}
          </Button>
        </div>

        {/* Conversation list - only show when open */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3 space-y-1">
            {conversations.length === 0 ? (
              <div className="text-center py-12 px-4">
                <Logo size="lg" iconOnly className="mx-auto mb-4" />
                <p className="text-sm font-medium text-foreground mb-1">
                  No conversations yet
                </p>
                <p className="text-xs text-muted-foreground">
                  Start a new chat to begin exploring
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 pt-2 pb-3">
                  Recent Chats
                </p>
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === activeConversationId}
                    onClick={() => {
                      onSelectConversation(conversation.id);
                      if (window.innerWidth < 768) onToggle();
                    }}
                    onDelete={() => onDeleteConversation(conversation.id)}
                  />
                ))}
              </>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className={cn(
          "p-3 border-t border-sky-200/50 space-y-2 bg-white/50 backdrop-blur-sm",
          !isOpen && "hidden md:block"
        )}>
          {/* User info */}
          {user && isOpen && (
            <div className="px-3 py-2 rounded-lg bg-sky-50">
              <p className="text-xs font-medium text-foreground truncate">
                {user.email?.split('@')[0]}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          )}

          {isOpen && conversations.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-xs">Clear All Chats</span>
            </Button>
          )}

          {isOpen && <Separator className="bg-sky-200/50" />}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className={cn(
              "gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg",
              isOpen ? "w-full justify-start" : "w-10 h-10 p-0 justify-center"
            )}
          >
            <LogOut className="w-4 h-4" />
            {isOpen && "Sign Out"}
          </Button>
        </div>
      </aside>
    </>
  );
};
