import React from 'react';
import { Plus, Trash2, Moon, Sun, X, LogOut } from 'lucide-react';
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
          "w-72 flex flex-col bg-sidebar border-r border-sidebar-border",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        aria-label="Chat history"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <Logo size="sm" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="md:hidden h-8 w-8 p-0"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* New chat button */}
        <div className="px-3 pb-3">
          <Button
            onClick={() => {
              onNewConversation();
              onClose();
            }}
            className="w-full gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            variant="default"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
          {conversations.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-accent mx-auto flex items-center justify-center mb-3">
                <Logo size="sm" className="w-6 h-6" />
              </div>
              <p className="text-sm text-muted-foreground">
                No conversations yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Start a new chat to begin
              </p>
            </div>
          ) : (
            conversations.map((conversation) => (
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
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          {/* User info */}
          {user && (
            <div className="px-2 py-2 mb-1">
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                Dark Mode
              </>
            )}
          </Button>

          {conversations.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Clear All Chats
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
};
