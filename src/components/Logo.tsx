import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg',
        sizeClasses[size]
      )}>
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-transparent" />
        
        {/* Logo symbol - abstract AI brain/neural network */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="w-3/5 h-3/5 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central node */}
          <circle cx="20" cy="20" r="4" fill="currentColor" className="text-primary-foreground" />
          
          {/* Outer nodes */}
          <circle cx="8" cy="12" r="2.5" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="32" cy="12" r="2.5" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="8" cy="28" r="2.5" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="32" cy="28" r="2.5" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="20" cy="6" r="2" fill="currentColor" className="text-primary-foreground/80" />
          <circle cx="20" cy="34" r="2" fill="currentColor" className="text-primary-foreground/80" />
          
          {/* Connecting lines */}
          <path
            d="M20 16 L10 13 M20 16 L30 13 M20 24 L10 27 M20 24 L30 27 M20 16 L20 8 M20 24 L20 32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-primary-foreground/70"
          />
          
          {/* Orbital ring */}
          <ellipse
            cx="20"
            cy="20"
            rx="12"
            ry="6"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 3"
            className="text-primary-foreground/50"
            transform="rotate(-30 20 20)"
          />
        </svg>
      </div>
      
      <span className={cn(
        'font-semibold tracking-tight',
        textSizes[size]
      )}>
        <span className="text-foreground">Nova</span>
        <span className="text-primary">AI</span>
      </span>
    </div>
  );
};
