import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { ChatApp } from '@/components/ChatApp';
import { useAuth } from '@/hooks/useAuth';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Chat - NovaAI</title>
        <meta
          name="description"
          content="Chat with NovaAI - Your intelligent AI assistant for coding, creativity, and more."
        />
      </Helmet>
      <ChatApp />
    </>
  );
};

export default Chat;
