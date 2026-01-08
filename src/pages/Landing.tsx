import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageSquare, 
  Zap, 
  Shield, 
  Brain, 
  Code2, 
  Lightbulb,
  Globe,
  Lock,
  Cpu,
  ChevronRight,
  Star,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const features = [
  {
    icon: Brain,
    title: 'Intelligent Understanding',
    description: 'Context-aware AI that remembers your conversation flow and understands nuance.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'Lightning-fast replies powered by cutting-edge neural networks.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Code2,
    title: 'Code Assistance',
    description: 'Get help debugging, writing, and optimizing code in any language.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'End-to-end encryption keeps your conversations completely private.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Lightbulb,
    title: 'Creative Partner',
    description: 'Brainstorm ideas, write content, and explore creative possibilities.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Globe,
    title: 'Always Available',
    description: 'Access your AI assistant anytime, anywhere, on any device.',
    gradient: 'from-indigo-500 to-violet-600',
  },
];

const stats = [
  { value: '99.9%', label: 'Uptime', icon: Zap },
  { value: '<1s', label: 'Response Time', icon: MessageSquare },
  { value: '50+', label: 'Languages', icon: Globe },
  { value: '24/7', label: 'Available', icon: Star },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Synapse - Intelligent AI Conversations</title>
        <meta
          name="description"
          content="Experience the future of AI chat. Get instant, intelligent responses for coding, creativity, and more with Synapse AI."
        />
      </Helmet>

      <div className="min-h-screen bg-background overflow-hidden relative">
        {/* Animated background */}
        <div className="fixed inset-0 -z-10">
          {/* Main gradient mesh */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-80" />
          
          {/* Aurora effect */}
          <div className="absolute inset-0 bg-aurora opacity-60" />
          
          {/* Floating orbs */}
          <div 
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl animate-float-slow"
            style={{ 
              top: '10%', 
              left: '20%',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` 
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent blur-3xl animate-float-slow"
            style={{ 
              bottom: '10%', 
              right: '10%',
              animationDelay: '2s',
              transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)` 
            }}
          />
          <div 
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gradient-mid/15 to-transparent blur-3xl animate-morph"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-noise" />
        </div>

        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5' 
            : 'bg-transparent'
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
                  className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/auth?mode=signup')}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/30 border-0"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-8 opacity-0 animate-fade-down group hover:border-primary/50 transition-colors cursor-default"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
              <span className="text-gradient-primary font-semibold">Next-Gen AI Technology</span>
            </div>
            
            {/* Main heading */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              Think Faster with
              <span className="block mt-2 text-gradient animate-gradient-shift bg-[length:200%_auto]">Synapse AI</span>
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
                className="group w-full sm:w-auto bg-gradient-to-r from-primary via-gradient-mid to-accent hover:opacity-90 text-primary-foreground px-8 py-6 text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 border-0 glow-primary"
              >
                <Wand2 className="mr-2 w-5 h-5" />
                Start Free Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="w-full sm:w-auto px-8 py-6 text-lg glass hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                <Lock className="mr-2 w-4 h-4" />
                Sign In
              </Button>
            </div>

            {/* Stats */}
            <div 
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto opacity-0 animate-fade-up"
              style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="group relative p-5 rounded-2xl glass hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">{stat.value}</p>
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-gradient-mid/20 to-accent/30 blur-3xl -z-10 transform scale-95 animate-pulse-glow" />
              
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent z-10 pointer-events-none" />
              
              <div className="rounded-3xl gradient-border overflow-hidden shadow-2xl shadow-primary/10">
                <div className="bg-card/90 backdrop-blur-xl">
                  {/* Window header */}
                  <div className="bg-secondary/50 px-4 py-3 border-b border-border/50 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive/70 hover:bg-destructive transition-colors cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/70 hover:bg-amber-500 transition-colors cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/70 hover:bg-emerald-500 transition-colors cursor-pointer" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-background/50 border border-border/50">
                        <Cpu className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">Synapse Chat</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat preview */}
                  <div className="p-6 space-y-5">
                    {/* User message */}
                    <div className="flex gap-3 justify-end animate-fade-left" style={{ animationDelay: '1.2s' }}>
                      <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 max-w-[75%] shadow-lg shadow-primary/20">
                        <p className="text-sm">Can you help me optimize this React component for better performance?</p>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shrink-0 ring-2 ring-background shadow-lg">
                        <span className="text-xs font-bold text-accent-foreground">U</span>
                      </div>
                    </div>
                    
                    {/* AI message */}
                    <div className="flex gap-3 animate-fade-right" style={{ animationDelay: '1.4s' }}>
                      <Logo size="sm" iconOnly className="shrink-0 ring-2 ring-background shadow-lg glow-primary" />
                      <div className="bg-secondary/70 rounded-2xl rounded-tl-md px-4 py-3 max-w-[75%] border border-border/50">
                        <p className="text-sm text-foreground">
                          Absolutely! I'll analyze your component and suggest optimizations using React.memo, useMemo, and useCallback where appropriate. Let me show you the improvements...
                        </p>
                      </div>
                    </div>

                    {/* Typing indicator */}
                    <div className="flex gap-3 animate-fade-right" style={{ animationDelay: '1.6s' }}>
                      <Logo size="sm" iconOnly className="shrink-0 ring-2 ring-background shadow-lg" />
                      <div className="bg-secondary/70 rounded-2xl rounded-tl-md px-4 py-3 border border-border/50">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-primary animate-typing" />
                          <div className="w-2 h-2 rounded-full bg-gradient-mid animate-typing" style={{ animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 rounded-full bg-accent animate-typing" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
          
          <div className="container mx-auto max-w-6xl relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
                <Zap className="w-3.5 h-3.5" />
                Capabilities
              </div>
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
                  className="group relative p-6 rounded-2xl glass hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="relative font-display font-semibold text-xl mb-3 group-hover:text-gradient transition-colors duration-300">{feature.title}</h3>
                  <p className="relative text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <MessageSquare className="w-3.5 h-3.5" />
                Simple Process
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
                Get Started in <span className="text-gradient">Seconds</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Create Account', desc: 'Sign up with just your email in under 30 seconds.', color: 'from-violet-500 to-purple-600' },
                { step: '02', title: 'Start Chatting', desc: 'Ask anything - coding, writing, brainstorming, or just chat.', color: 'from-cyan-500 to-blue-600' },
                { step: '03', title: 'Get Results', desc: 'Receive intelligent, contextual responses instantly.', color: 'from-emerald-500 to-teal-600' },
              ].map((item, index) => (
                <div key={item.step} className="relative text-center group">
                  <div className={`inline-flex text-6xl font-display font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.step}
                  </div>
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-gradient-mid/10 to-accent/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse-glow" />
          
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <Logo size="xl" iconOnly className="mx-auto mb-8 animate-float" />
            
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
              className="group bg-gradient-to-r from-primary via-gradient-mid to-accent hover:opacity-90 text-primary-foreground px-12 py-7 text-lg shadow-2xl shadow-primary/40 hover:shadow-primary/50 transition-all duration-300 border-0"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">No credit card required</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-4 border-t border-border/50 bg-background/50 backdrop-blur-xl">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Synapse AI. Crafted with intelligence.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;