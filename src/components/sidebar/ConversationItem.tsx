import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
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
        "group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer",
        "transition-all duration-200",
        isActive 
          ? "bg-primary/10 text-foreground" 
          : "hover:bg-secondary text-muted-foreground hover:text-foreground"
      )}
      aria-selected={isActive}
      aria-label={`Conversation: ${conversation.title}`}
    >
      <MessageSquare 
        className={cn(
          "w-4 h-4 flex-shrink-0",
          isActive ? "text-primary" : "text-muted-foreground"
        )} 
        aria-hidden="true"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {conversation.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatTimestamp(conversation.updatedAt)}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className={cn(
          "h-7 w-7 p-0 opacity-0 group-hover:opacity-100",
          "transition-opacity duration-200",
          "hover:bg-destructive/10 hover:text-destructive"
        )}
        aria-label="Delete conversation"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
