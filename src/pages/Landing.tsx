import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Shield, 
  Sparkles, 
  Brain, 
  Code2, 
  Lightbulb,
  Globe,
  Lock,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const features = [
  {
    icon: Brain,
    title: 'Intelligent Understanding',
    description: 'Context-aware AI that remembers your conversation flow and understands nuance.',
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'Lightning-fast replies powered by cutting-edge neural networks.',
  },
  {
    icon: Code2,
    title: 'Code Assistance',
    description: 'Get help debugging, writing, and optimizing code in any language.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'End-to-end encryption keeps your conversations completely private.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Partner',
    description: 'Brainstorm ideas, write content, and explore creative possibilities.',
  },
  {
    icon: Globe,
    title: 'Always Available',
    description: 'Access your AI assistant anytime, anywhere, on any device.',
  },
];

const stats = [
  { value: '99.9%', label: 'Uptime' },
  { value: '<1s', label: 'Response Time' },
  { value: '50+', label: 'Languages' },
  { value: '24/7', label: 'Available' },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Synapse - Intelligent AI Conversations</title>
        <meta
          name="description"
          content="Experience the future of AI chat. Get instant, intelligent responses for coding, creativity, and more with Synapse AI."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="min-h-screen bg-background overflow-hidden">
        {/* Animated background gradients */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl animate-pulse-glow"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: '1s', transform: `translateY(${-scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent"
          />
        </div>

        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-background/90 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="opacity-0 animate-fade-right" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <Logo size="sm" />
              </div>
              
              <div className="flex items-center gap-3 opacity-0 animate-fade-left" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/auth')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="container mx-auto text-center max-w-5xl">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 opacity-0 animate-fade-down"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <Sparkles className="w-4 h-4" />
              Next-Gen AI Technology
              <ChevronRight className="w-4 h-4" />
            </div>
            
            {/* Main heading */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              Think Faster with
              <span className="block mt-2 text-gradient">Synapse AI</span>
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              Your neural connection to intelligence. Code faster, create better, 
              and unlock your potential with an AI that truly understands you.
            </p>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/auth?mode=signup')}
                className="group w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
              >
                Start Free Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="w-full sm:w-auto px-8 py-6 text-lg border-border hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
              >
                <Lock className="mr-2 w-4 h-4" />
                Sign In
              </Button>
            </div>

            {/* Stats */}
            <div 
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto opacity-0 animate-fade-up"
              style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center p-4"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <p className="text-2xl sm:text-3xl font-display font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* Hero Preview */}
            <div 
              className="mt-20 relative opacity-0 animate-slide-up"
              style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}
            >
              {/* Glow effect behind card */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 blur-3xl -z-10 transform scale-95" />
              
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
              
              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden">
                {/* Window header */}
                <div className="bg-secondary/80 px-4 py-3 border-b border-border flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/70 hover:bg-destructive transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-background/50 border border-border/50">
                      <Cpu className="w-3 h-3 text-primary" />
                      <span className="text-xs text-muted-foreground">Synapse Chat</span>
                    </div>
                  </div>
                </div>
                
                {/* Chat preview */}
                <div className="p-6 space-y-5">
                  {/* User message */}
                  <div className="flex gap-3 justify-end animate-fade-left" style={{ animationDelay: '1.2s' }}>
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 max-w-[75%] shadow-lg">
                      <p className="text-sm">Can you help me optimize this React component for better performance?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 ring-2 ring-background">
                      <span className="text-xs font-semibold text-accent-foreground">U</span>
                    </div>
                  </div>
                  
                  {/* AI message */}
                  <div className="flex gap-3 animate-fade-right" style={{ animationDelay: '1.4s' }}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0 ring-2 ring-background shadow-lg">
                      <Logo size="sm" iconOnly className="w-4 h-4" />
                    </div>
                    <div className="bg-secondary/70 rounded-2xl rounded-tl-md px-4 py-3 max-w-[75%] border border-border/50">
                      <p className="text-sm text-foreground">
                        Absolutely! I'll analyze your component and suggest optimizations using React.memo, useMemo, and useCallback where appropriate. Let me show you the improvements...
                      </p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex gap-3 animate-fade-right" style={{ animationDelay: '1.6s' }}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0 ring-2 ring-background shadow-lg">
                      <Logo size="sm" iconOnly className="w-4 h-4" />
                    </div>
                    <div className="bg-secondary/70 rounded-2xl rounded-tl-md px-4 py-3 border border-border/50">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary animate-typing" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm">Capabilities</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                Why Choose <span className="text-gradient">Synapse</span>?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Built with cutting-edge neural technology to provide you with the most intelligent AI experience.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <p className="text-primary font-medium mb-3 tracking-wide uppercase text-sm">Simple Process</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                Get Started in <span className="text-gradient">Seconds</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Create Account', desc: 'Sign up with just your email in under 30 seconds.' },
                { step: '02', title: 'Start Chatting', desc: 'Ask anything - coding, writing, brainstorming, or just chat.' },
                { step: '03', title: 'Get Results', desc: 'Receive intelligent, contextual responses instantly.' },
              ].map((item, index) => (
                <div key={item.step} className="relative text-center">
                  <div className="text-6xl font-display font-bold text-primary/10 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 -right-4 w-8">
                      <ChevronRight className="w-6 h-6 text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-accent/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary/70 mb-8 shadow-2xl shadow-primary/30 animate-float">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Unlock Your Potential?
            </h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg">
              Join thousands of creators, developers, and thinkers who are already 
              experiencing the future of AI conversations.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/auth?mode=signup')}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">No credit card required</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-4 border-t border-border bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Synapse AI. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
