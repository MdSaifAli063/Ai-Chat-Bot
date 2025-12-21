import React from 'react';
import { Helmet } from 'react-helmet';
import { ChatApp } from '@/components/ChatApp';

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Chat - Intelligent Conversations</title>
        <meta 
          name="description" 
          content="Experience intelligent AI-powered conversations with our advanced chatbot. Get help with coding, creative ideas, and more." 
        />
      </Helmet>
      <ChatApp />
    </>
  );
};

export default Index;
