import React from 'react';
import { MessageSquare, Trash2, MoreHorizontal } from 'lucide-react';
import { Conversation } from '@/types/chat';
import { formatTimestamp } from '@/utils/helpers';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
  onDelete,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={cn(
        "group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer",
        "transition-all duration-200",
        isActive 
          ? "bg-gradient-to-r from-primary/15 to-primary/5 text-foreground border border-primary/20 shadow-sm" 
          : "hover:bg-sidebar-accent text-muted-foreground hover:text-foreground border border-transparent"
      )}
      aria-selected={isActive}
      aria-label={`Conversation: ${conversation.title}`}
    >
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
        isActive ? "bg-primary/20" : "bg-sidebar-accent group-hover:bg-primary/10"
      )}>
        <MessageSquare 
          className={cn(
            "w-4 h-4",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
          )} 
          aria-hidden="true"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm font-medium truncate",
          isActive && "text-foreground"
        )}>
          {conversation.title}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {formatTimestamp(conversation.updatedAt)}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className={cn(
          "h-7 w-7 p-0 opacity-0 group-hover:opacity-100 shrink-0",
          "transition-all duration-200 rounded-lg",
          "hover:bg-destructive/10 hover:text-destructive"
        )}
        aria-label="Delete conversation"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};
