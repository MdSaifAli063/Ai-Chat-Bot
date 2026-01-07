import React from 'react';
import { Plus, Trash2, Moon, Sun, X, LogOut, Sparkles } from 'lucide-react';
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
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onClearAll,
  theme,
  onToggleTheme,
  isOpen,
  onClose,
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
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50",
          "w-72 flex flex-col bg-white/80 backdrop-blur-xl border-r border-sky-200/50 shadow-xl shadow-sky-100/50",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        aria-label="Chat history"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sky-200/50">
          <Logo size="sm" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="md:hidden h-8 w-8 p-0 hover:bg-sidebar-accent"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* New chat button */}
        <div className="p-4">
          <Button
            onClick={() => {
              onNewConversation();
              onClose();
            }}
            className="w-full gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
            variant="default"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-3 space-y-1">
          {conversations.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent mx-auto flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
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
                    onClose();
                  }}
                  onDelete={() => onDeleteConversation(conversation.id)}
                />
              ))}
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-sky-200/50 space-y-3 bg-white/50 backdrop-blur-sm">
          {/* User info */}
          {user && (
            <div className="px-3 py-2 rounded-lg bg-sidebar-accent/50">
              <p className="text-xs font-medium text-foreground truncate">
                {user.email?.split('@')[0]}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="justify-start gap-2 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent rounded-lg"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="text-xs">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4" />
                  <span className="text-xs">Dark</span>
                </>
              )}
            </Button>

            {conversations.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-xs">Clear</span>
              </Button>
            )}
          </div>

          <Separator className="bg-sidebar-border" />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
};
