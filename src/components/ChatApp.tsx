import React, { useState } from 'react';
import { ChatSidebar } from './sidebar/ChatSidebar';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessages } from './chat/ChatMessages';
import { ChatInput } from './chat/ChatInput';
import { useChat } from '@/hooks/useChat';
import { useTheme } from '@/hooks/useTheme';

export const ChatApp: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  
  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    createConversation,
    setActiveConversation,
    sendUserMessage,
    deleteConversation,
    clearAllChats,
  } = useChat();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversation}
        onNewConversation={createConversation}
        onDeleteConversation={deleteConversation}
        onClearAll={clearAllChats}
        theme={resolvedTheme}
        onToggleTheme={toggleTheme}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader 
          conversation={activeConversation}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <ChatMessages 
          messages={activeConversation?.messages || []}
          isLoading={isLoading}
        />

        <ChatInput 
          onSend={sendUserMessage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};
