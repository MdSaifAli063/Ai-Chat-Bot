import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquare, Zap, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const features = [
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Chat naturally with AI that understands context and nuance.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get instant responses powered by advanced AI technology.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your conversations are encrypted and never shared.',
  },
  {
    icon: Sparkles,
    title: 'Smart Assistance',
    description: 'From coding help to creative ideas, get expert assistance.',
  },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>NovaAI - Intelligent AI Conversations</title>
        <meta
          name="description"
          content="Experience the future of AI chat. Get instant, intelligent responses for coding, creativity, and more."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Logo size="sm" />
              
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Powered by Advanced AI
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Your Intelligent
                <span className="text-gradient block mt-2">AI Companion</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Experience seamless AI conversations. Get help with coding, brainstorm creative ideas, 
                or just have a meaningful chat. Nova is here to assist you 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/auth?mode=signup')}
                  className="group w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                >
                  Start Chatting Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/auth')}
                  className="w-full sm:w-auto px-8 py-6 text-lg border-border hover:bg-accent"
                >
                  Sign In
                </Button>
              </div>
            </div>
            
            {/* Hero Image/Preview */}
            <div className="mt-16 relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
              <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
                <div className="bg-secondary/50 px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">NovaAI Chat</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-accent-foreground">U</span>
                    </div>
                    <div className="bg-secondary rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-foreground">Can you help me write a React component?</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Logo size="sm" className="w-5 h-5" />
                    </div>
                    <div className="bg-accent rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%]">
                      <p className="text-sm text-foreground">
                        Of course! I'd be happy to help you write a React component. What kind of component would you like to create?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why Choose <span className="text-primary">NovaAI</span>?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with cutting-edge technology to provide you with the best AI chat experience.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of users who are already experiencing the future of AI conversations.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/auth?mode=signup')}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg"
            >
              Start Free Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NovaAI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
