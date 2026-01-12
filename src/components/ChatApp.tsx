import React, { useState } from 'react';
import { ChatSidebar } from './sidebar/ChatSidebar';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessages } from './chat/ChatMessages';
import { ChatInput } from './chat/ChatInput';
import { useChat } from '@/hooks/useChat';

export const ChatApp: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
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

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden relative">
      {/* Sky blue gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-sky-200/30" />
        <div className="absolute top-0 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversation}
        onNewConversation={createConversation}
        onDeleteConversation={deleteConversation}
        onClearAll={clearAllChats}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main chat area */}
      <main className="flex-1 flex flex-col min-w-0 w-full bg-white/60 backdrop-blur-sm">
        <ChatHeader 
          conversation={activeConversation}
          onOpenSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
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