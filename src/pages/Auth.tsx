import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, ArrowLeft, Mail, Lock, Zap, Brain, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';

const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, isAuthenticated, loading } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/chat');
    }
  }, [isAuthenticated, loading, navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    if (isSignUp) {
      const { error } = await signUp(email, password);
      if (!error) {
        navigate('/chat');
      }
    } else {
      const { error } = await signIn(email, password);
      if (!error) {
        navigate('/chat');
      }
    }
    
    setIsSubmitting(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="flex flex-col items-center gap-4 relative z-10">
          <Logo size="lg" iconOnly className="animate-pulse" />
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isSignUp ? 'Sign Up' : 'Sign In'} - Synapse AI</title>
        <meta name="description" content="Sign in or create an account to start chatting with Synapse AI." />
      </Helmet>

      <div className="min-h-screen flex bg-background relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
          <div className="absolute inset-0 bg-noise" />
        </div>

        {/* Left side - Brand */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative">
          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
          
          {/* Floating shapes */}
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary rounded-full animate-float opacity-60" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-gradient-mid rounded-full animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="max-w-lg text-center relative z-10">
            <div className="mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Logo size="xl" className="justify-center" />
            </div>
            
            <h1 className="text-4xl font-display font-bold mb-6 leading-tight animate-fade-up" style={{ animationDelay: '0.3s' }}>
              Welcome to the Future of 
              <span className="text-gradient block mt-1"> AI Conversations</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              Experience intelligent conversations, get instant coding help, 
              brainstorm creative ideas, and unlock your productivity with Synapse.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
              {[
                { icon: Brain, label: 'Smart', desc: 'Context-aware', color: 'from-violet-500 to-purple-600' },
                { icon: Zap, label: 'Fast', desc: 'Instant responses', color: 'from-amber-500 to-orange-600' },
                { icon: Shield, label: 'Secure', desc: 'Private chats', color: 'from-emerald-500 to-teal-600' },
              ].map((item) => (
                <div key={item.label} className="group p-4 rounded-2xl glass hover:border-primary/30 transition-all duration-300">
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {/* Back button */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to home
            </button>

            {/* Mobile logo */}
            <div className="lg:hidden mb-8 text-center">
              <Logo size="lg" className="justify-center" />
            </div>

            <div className="gradient-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <div className="bg-card/95 backdrop-blur-xl p-8">
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <Logo size="lg" iconOnly />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {isSignUp ? 'Create your account' : 'Welcome back'}
                  </h2>
                  <p className="text-muted-foreground">
                    {isSignUp
                      ? 'Start your AI journey today'
                      : 'Sign in to continue your conversations'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 h-12 rounded-xl bg-background/50 border-input focus:border-primary focus:ring-primary/20 ${errors.email ? 'border-destructive focus:ring-destructive/20' : ''}`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 pr-10 h-12 rounded-xl bg-background/50 border-input focus:border-primary focus:ring-primary/20 ${errors.password ? 'border-destructive focus:ring-destructive/20' : ''}`}
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-destructive mt-1">{errors.password}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-primary via-gradient-mid to-accent hover:opacity-90 text-primary-foreground font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-200 border-0"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {isSignUp ? 'Creating account...' : 'Signing in...'}
                      </>
                    ) : (
                      isSignUp ? 'Create Account' : 'Sign In'
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      onClick={toggleMode}
                      className="text-gradient font-semibold hover:opacity-80 transition-opacity"
                    >
                      {isSignUp ? 'Sign in' : 'Sign up'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;